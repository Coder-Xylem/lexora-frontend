// src/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const ThemeContext = createContext();

// Create a custom hook for using the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
