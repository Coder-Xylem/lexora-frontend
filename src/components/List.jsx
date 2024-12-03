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
  const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const lexoraContact = { lexusId: 'lexora', name: 'Lexora', lastMessage: 'Secure conversations await you!' };
    if (!savedContacts.some(contact => contact?.id === 'lexora')) {
      savedContacts.unshift(lexoraContact);
    }
    return savedContacts;
  });

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
        const lexoraContact = { id: 'lexora', lexusId: 'Lexora', lastMessage: 'Secure conversations await you!' };
        
        const updatedContacts = [lexoraContact, ...friendsFromDB.filter(contact => contact?.id !== 'lexora')];
        
        setContacts(updatedContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    if (username) {
      fetchContacts();
    }

 
    const intervalId = setInterval(() => {
      if (username) {
        fetchContacts();
      }
    }, 2000); 

    return () => {
      clearInterval(intervalId);
    };
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
      const newContact = { id: user._id, name: user.lexusId, lastMessage: 'Start chatting!' };

      setContacts((prevContacts) => {
        const updatedContacts = [newContact, ...prevContacts];
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        return updatedContacts;
      });
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('Error finding user.', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {!isChatOpen ? (
        <div className="w-full h-full bg-black text-white p-4 flex flex-col">
          {/* Home Button, Welcome, and Search */}
          <div className="flex items-center mb-4 space-x-3 ">
            {/* Home button before welcome */}
            <Link to="/" className="text-sm text-gray-00 hover:text-white">
              <button className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-gray-900 rounded-md">Home</button>
            </Link>

      
            <h2 className="text-xl font-semibold flex items-center space-x-2 md:content-between">
              <span>Welcome,</span>
              <span className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
                {username}
              </span>
              <span>🌹</span>
            </h2>
          </div>

          
          <div className="flex space-x-2 items-center md: mb-4">
            <input
              type="text"
              placeholder="Search Friend 😇"
              className="px-4 py-3 bg-white rounded-md text-gray-900 w-full sm:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleAddFriend} className="px-4 py-1 md:py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-md">
              Add Friend
            </button>
          </div>

          {/*  list */}
          <div className="flex flex-col space-y-2 flex-1 overflow-auto">
            {contacts.map((contact, index) => (
              contact && (
                <div
                  key={contact.id || index}
                  className="flex items-center p-3 bg-gray-800 rounded-md cursor-pointer hover:bg-gray-700"
                  onClick={() => handleOpenChat(contact)}
                >
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {contact.lexusId ? contact.lexusId[0].toUpperCase() : '?'}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold">{contact.lexusId}</h3>
                  </div>
                </div>
              )
            ))}
          </div>
          
          {/*bottom */}
          <div className="text-sm text-gray-300 mt-4 flex items-center space-x-2">
            <FaExclamationCircle className="text-yellow-400" />
            <p>
              Do not refresh the page. If you do it accidentally, clear history of the last 15 minutes and then reopen this app.
              <a href="/" className="text-blue-400 hover:underline ml-1">Click here to reopen</a>
            </p>
          </div>
        </div>
      ) : (
        <ChatInterface contact={selectedContact} onBack={() => setIsChatOpen(false)} lexusId={username} />
      )}
    </div>
  );
}

export default ContactList;
