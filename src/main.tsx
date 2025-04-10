
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if the URL is an API request
const isApiRequest = window.location.pathname.startsWith('/api/');

// For API requests, don't render the React app
if (isApiRequest) {
  // Don't initialize React for API requests
  // The ApiProxy component will handle setting the response
} else {
  // Normal app initialization
  createRoot(document.getElementById("root")!).render(<App />);
}
