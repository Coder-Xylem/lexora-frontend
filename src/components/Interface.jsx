import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { emojify } from 'node-emoji';
import axios from '../axiosConfig';

const socket = io('https://testb-phi.vercel.app/', {
  transports: ['websocket'],
  withCredentials: true,
});

function ChatInterface({ contact, onBack, lexusId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (contact && lexusId) {
      const sortedRoomId = [lexusId, contact.lexusId].sort().join('-');
      setRoomId(sortedRoomId);

      const fetchMessages = async () => {
        try {
          const { data } = await axios.get(`/chat/${lexusId}/${contact.lexusId}`);
          setMessages(data.messages || []);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();

      socket.emit('joinRoom', sortedRoomId);

      const handleNewMessage = (message) => {
        if (message) {
          setMessages((prev) => [...prev, message]);
        }
      };

      socket.on('message', handleNewMessage);

      return () => {
        socket.off('message', handleNewMessage);
        socket.emit('leaveRoom', sortedRoomId);
      };
    }
  }, [contact, lexusId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageWithEmoji = emojify(newMessage.trim());
    const messageData = {
      senderLexusId: lexusId,
      receiverLexusId: contact.lexusId,
      message: messageWithEmoji,
      mediaUrl: null,
    };

    socket.emit('chatMessage', messageData);

    setMessages((prev) => [
      ...prev,
      { senderLexusId: lexusId, message: messageWithEmoji },
    ]);
    setNewMessage('');

    try {
      await axios.post('/chat/send', messageData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="flex items-center p-4 bg-gray-800 text-white">
        <button onClick={onBack} className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold">
          {contact?.lexusId === 'Lexora' ? 'Your Notes' : `Chat with ${contact?.lexusId}`}
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto mb-20">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.senderLexusId === lexusId
                ? 'self-end text-right'
                : 'self-start text-left'
            }`}
          >
            <span
              className={`inline-block p-3 rounded-lg ${
                message.senderLexusId === lexusId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {message.message}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="p-4 bg-gray-800 flex items-center fixed w-full bottom-0">
        <input
          type="text"
          className="w-full p-2 rounded-lg text-black mr-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;
