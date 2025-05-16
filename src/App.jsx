import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Features from './components/Features';
import SignInSignUp from './components/Sign';
import ContactList from './components/List';
import About from './components/About';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem('token')));
  }, []);

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
      
        <Route path="/" element={<Features />} />

        
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/contacts" /> : <SignInSignUp />}
          />
        <Route
          path="/about"
          element={<About />}
          />

        <Route
          path="/contacts"
          element={isAuthenticated ? <ContactList to="/contacts" /> : <SignInSignUp />}
        />
      </Routes>
    </Router>
  );
}

export default App;
