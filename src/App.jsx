import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Features from './components/Features';
import SignInSignUp from './components/Sign';
import ContactList from './components/List';
// import ChatInterface from './components/Interface';


import { useState, useEffect } from 'react';
// ... (rest of imports)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    // Check for token in local storage on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false);
    }
  }, []); 

  // Update isAuthenticated when token changes
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(Boolean(token)); // Update state based on token
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Features />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <SignInSignUp /> : <Navigate to="/contacts" />}
        />
        <Route
          path="/contacts"
          element={isAuthenticated ? <ContactList /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;