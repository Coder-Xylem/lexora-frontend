import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { emojify } from 'node-emoji';
import axios from '../axiosConfig';

const socket = io('https://testb-phi.vercel.app'); // Connects to backend server

function ChatInterface({ contact, onBack, lexusId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState(null);
  const messagesEndRef = useRef(null); // Ref for scrolling

  useEffect(() => {
    if (contact && lexusId) {
      const sortedRoomId = [lexusId, contact.lexusId].sort().join('-');
      setRoomId(sortedRoomId);

      const fetchMessages = async () => {
        try {
          const response = await axios.get(`/chat/${lexusId}/${contact.lexusId}`);
          setMessages(response.data.messages || []);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
      socket.emit('joinRoom', sortedRoomId, lexusId, contact.lexusId);

      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off('message');
        socket.emit('leaveRoom', sortedRoomId);
      };
    }
  }, [contact, lexusId]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageWithEmoji = emojify(newMessage.trim());
      const messageData = {
        senderLexusId: lexusId,
        receiverLexusId: contact.lexusId,
        message: messageWithEmoji,
        mediaUrl: null,
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        { senderLexusId: lexusId, message: messageWithEmoji }
      ]);
      setNewMessage('');

      try {
        await axios.post(`/chat/send`, messageData);
        socket.emit('chatMessage', messageData);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="flex items-center p-4 bg-gray-800 text-white">
        <button onClick={onBack} className="mr-4 text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold">
          {contact?.lexusId === 'Lexora' ? 'Your Notes' : `Chat with ${contact?.lexusId}`}
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto mb-20"> {/* Add margin to avoid overlap */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.senderLexusId === lexusId ? 'self-end text-right' : 'self-start text-left'}`}
          >
            <span
              className={`inline-block p-3 rounded-lg ${
                message.senderLexusId === lexusId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
              }`}
            >
              {message.message}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Reference for scrolling */}
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


