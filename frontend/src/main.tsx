// Entry point of our frontend application

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom'; // Adds routeing to react
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from 'react-hot-toast'; // Gives "console.log" notifications to users
import axios from 'axios'; // Send API requests/tokens between frontend and backend

axios.defaults.baseURL = "http://localhost:3000/api/v1"; // URL to access the backend
axios.defaults.withCredentials = true; // Exchanges cookies from backend to frontend
// With every request these lines of code are attached

const theme = createTheme({
  typography: {
    fontFamily: "Work Sans, sans-serif",
    allVariants: { color: 'white'}    
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right"/>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);

// Hierarchy of react components, children will inherit data from parents