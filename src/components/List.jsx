import React, { useState, useEffect } from 'react';
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
        
        // Update contacts if there are new friends
        setContacts((prevContacts) => {
          // Check if the contacts list has changed
          if (JSON.stringify(prevContacts) !== JSON.stringify(updatedContacts)) {
            localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // Save updated contacts in localStorage
            return updatedContacts;
          }
          return prevContacts; // No update if no change
        });
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    // Fetch contacts initially
    if (username) {
      fetchContacts();
    }

    // Set up polling every 2 seconds
    const intervalId = setInterval(() => {
      if (username) {
        fetchContacts();
      }
    }, 2000); // Poll every 2 seconds

    // Cleanup the interval when the component unmounts
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
        <div className="w-full h-full bg-gray-900 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Welcome, {username} ❤🙌</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search by Lexus ID"
                className="p-2 rounded-md text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleAddFriend} className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-md">
                Add Friend
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
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
        </div>
      ) : (
        <ChatInterface contact={selectedContact} onBack={() => setIsChatOpen(false)} lexusId={username} />
      )}
    </div>
  );
}

export default ContactList;
