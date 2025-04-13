
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ApiProxy from './pages/ApiProxy.tsx'
import React from 'react'

// Check if the URL is an API request
const isApiRequest = window.location.pathname.startsWith('/api/');

// For API requests, render only the ApiProxy component
if (isApiRequest) {
  createRoot(document.getElementById("root")!).render(<ApiProxy />);
} else {
  // Normal app initialization
  createRoot(document.getElementById("root")!).render(<App />);
}
