import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { emojify } from 'node-emoji';
import axios from '../axiosConfig';
import PropTypes from 'prop-types';

const socket = io('wss://lexora-backend-3mod.onrender.com', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});


socket.on('connect_error', (err) => {
  console.error('Connection error:', err);
});

socket.io.on('error', (error) => {
  console.error('Socket.io error:', error);
});

socket.on('connect', () => {
  console.log('Successfully connected to WebSocket');
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
          // console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();

      socket.emit('joinRoom', { roomId: sortedRoomId, senderId: lexusId, receiverId: contact.lexusId });

      socket.on('message', (message) => {
        if (message.senderLexusId !== lexusId) {
          setMessages((prev) => [...prev, message]);
        }
      });

      return () => {
        socket.emit('leaveRoom', { roomId: sortedRoomId, clientId: lexusId });
        socket.off('message'); // Clean up the listener
      };
    }
  }, [contact, lexusId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const messageWithEmoji = emojify(newMessage.trim());

    const messageData = {
      senderId: lexusId,
      receiverId: contact.lexusId,
      message: messageWithEmoji,
    };

    socket.emit('chatMessage', messageData);
    setMessages((prev) => [...prev, { senderLexusId: lexusId, message: messageWithEmoji }]);
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

 


ChatInterface.propTypes = {
  contact: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  lexusId: PropTypes.string.isRequired,
};


  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
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

      <div className="flex-1 p-4 overflow-y-auto mb-20">
      {messages.map((message, index) => (
  message?.message?.trim() ? (  
    <div
      key={index}
      className={`mb-4 ${message.senderLexusId === lexusId ? 'self-end text-right' : 'self-start text-left'}`}
    >
      <span
        className={`inline-block p-3 rounded-lg ${message.senderLexusId === lexusId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
      >
        {message.message}
      </span>
    </div>
  ) : null
))}

        <div ref={messagesEndRef} />
      </div>

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