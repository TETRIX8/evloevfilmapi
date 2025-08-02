import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API Proxy endpoint
app.all('/api/*', async (req, res) => {
  try {
    // Get the path after /api/
    const apiPath = req.path.replace(/^\/api\//, '');
    
    // Construct target URL
    const targetUrl = `https://api.bhcesh.me/${apiPath}${req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : ''}`;
    
    console.log(`Proxying request to: ${targetUrl}`);
    console.log(`Method: ${req.method}`);
    
    // Prepare request options
    const requestOptions = {
      method: req.method,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'EvloevFilm-API-Proxy/1.0',
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      timeout: 30000, // 30 seconds timeout
    };
    
    // Add body for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      requestOptions.body = JSON.stringify(req.body);
    }
    
    // Make request to target API
    const response = await fetch(targetUrl, requestOptions);
    
    // Get response data
    const contentType = response.headers.get('content-type');
    const responseText = await response.text();
    
    // Set response headers
    res.set('Content-Type', contentType || 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Send response
    res.status(response.status).send(responseText);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'EvloevFilm API Proxy'
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server',
    timestamp: new Date().toISOString()
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 EvloevFilm API Proxy server running on port ${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/*`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  });
}

// Export for Vercel
export default app; 