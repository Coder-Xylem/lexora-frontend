import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import ChatInterface from './Interface';
import axios from '../axiosConfig';

function ContactList() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const lexusId = localStorage.getItem('lexusId');
    if (lexusId) {
      setUsername(lexusId);
    }
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`/user/contacts/${encodeURIComponent(username)}`);
        const friendsFromDB = response.data.contacts || [];

        const lexoraContact = {
          id: 'lexora',
          lexusId: 'Lexora',
          lastMessage: 'Secure conversations await you!'
        };

        const updatedContacts = [
          lexoraContact,
          ...friendsFromDB.filter(contact => contact?.id !== 'lexora')
        ];

        setContacts(updatedContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    if (username) {
      fetchContacts();
      const intervalId = setInterval(fetchContacts, 2000);
      return () => clearInterval(intervalId);
    }
  }, [username]);

  const handleOpenChat = (contact) => {
    setSelectedContact(contact);
    setIsChatOpen(true);
  };

  const handleAddFriend = async () => {
    if (searchQuery.trim() === '') return;

    try {
      const response = await axios.post(
        `/user/add-friend/${encodeURIComponent(searchQuery)}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );

      const user = response.data;
      const newContact = {
        id: user._id,
        lexusId: user.lexusId,
        lastMessage: 'Start chatting!'
      };

      setContacts((prev) => {
        const updated = [newContact, ...prev.filter(c => c.id !== user._id)];
        localStorage.setItem('contacts', JSON.stringify(updated));
        return updated;
      });

      setSearchQuery('');
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('User not found or already added.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {!isChatOpen ? (
        <div className="w-full h-full bg-black text-white p-4 flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center mb-4 space-x-3">
            <Link to="/" className="text-sm">
              <button className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-md">Home</button>
            </Link>
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <span>Welcome,</span>
              <span className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
                {username}
              </span>
              <span>🌹</span>
            </h2>
          </div>

          {/* Search Bar */}
          <div className="flex space-x-2 items-center mb-4">
            <input
              type="text"
              placeholder="Search Friend 😇"
              className="px-4 py-3 bg-white rounded-md text-gray-900 w-full sm:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleAddFriend}
              className="px-4 py-1 md:py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-md"
            >
              Add Friend
            </button>
          </div>

          {/* Contact List */}
          <div className="flex flex-col space-y-2 flex-1 overflow-auto">
            {contacts.map((contact, index) => (
              contact && (
                <div
                  key={contact.id || index}
                  className="flex items-center p-3 bg-gray-800 rounded-md cursor-pointer hover:bg-gray-700"
                  onClick={() => handleOpenChat(contact)}
                >
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {contact.lexusId?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold">{contact.lexusId}</h3>
                  </div>
                </div>
              )
            ))}

            {/* Sign Out */}
            <div className="text-sm text-gray-300 mt-4 flex items-center space-x-2">
              <FaExclamationCircle className="text-yellow-400" />
              <p>
                Click Here to Sign-Out. (Remember your Lexus ID and Password to Sign-in again.)
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                  }}
                  className="text-blue-400 hover:underline ml-1"
                >
                  Signout
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <ChatInterface contact={selectedContact} onBack={() => setIsChatOpen(false)} lexusId={username} />
      )}
    </div>
  );
}

export default ContactList;
