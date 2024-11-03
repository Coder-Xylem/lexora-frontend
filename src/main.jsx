// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { ThemeProvider } from './Hooks/ThemeContext.jsx'; // Import the ThemeProvider
import './index.css'; // Your global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
  // <React.StrictMode>
  //   {/* <ThemeProvider> */}
  //     <App />
  //   {/* </ThemeProvider> */}
  // </React.StrictMode>
  // <React.StrictMode>
  //   <ThemeProvider>
  //     <App />
  //   </ThemeProvider>
  // </React.StrictMode>
);
