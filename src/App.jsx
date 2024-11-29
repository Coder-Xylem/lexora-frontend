import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Features from './components/Features';
import SignInSignUp from './components/Sign';
import ContactList from './components/List';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token on initial load
  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem('token')));
  }, []);

  // Update authentication status when token changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem('token')));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Features />} />

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/contacts" /> : <SignInSignUp />}
        />
        <Route
          path="/contacts"
          element={<ContactList />}
        />
      </Routes>
    </Router>
  );
}

export default App;
