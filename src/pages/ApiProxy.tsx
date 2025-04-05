
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ApiProxy = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const proxyRequest = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get the path after /api/ and the query parameters
        const path = location.pathname.replace(/^\/api\//, '');
        // Use the base URL without revealing it to end-users
        const targetUrl = `https://api.bhcesh.me/${path}${location.search}`;
        
        console.log(`Processing API request...`);
        
        // Make request to the target API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Get response data
        const contentType = response.headers.get('content-type');
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        // Get the raw text response
        const textResponse = await response.text();
        
        // Check if the response is JSON (either by content-type or by looking at the content)
        const isJson = contentType && contentType.includes('application/json');
        const looksLikeJson = textResponse.trim().startsWith('{') || textResponse.trim().startsWith('[');
        
        let responseData = textResponse;
        if (isJson || looksLikeJson) {
          try {
            // Try to parse as JSON to validate it
            JSON.parse(textResponse);
            responseData = textResponse;
          } catch (e) {
            responseData = JSON.stringify({ error: true, message: "Invalid JSON response from API" });
          }
        } else {
          // Not JSON, convert to JSON format
          responseData = JSON.stringify({ data: textResponse, type: 'text' });
        }
        
        // Set content type to application/json
        document.documentElement.innerHTML = '';
        document.open();
        document.write(responseData);
        document.close();
        
        // Set the correct content type header for the response
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Type';
        meta.content = 'application/json';
        document.head.appendChild(meta);
        
      } catch (err: any) {
        console.error('API proxy error:', err);
        
        // Return error in JSON format
        const errorResponse = JSON.stringify({ 
          error: true, 
          message: err.message || 'API proxy error' 
        });
        
        document.documentElement.innerHTML = '';
        document.open();
        document.write(errorResponse);
        document.close();
        
        // Set error content type
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Type';
        meta.content = 'application/json';
        document.head.appendChild(meta);
        
        setError(err.message || 'API proxy error');
      } finally {
        setIsLoading(false);
      }
    };

    proxyRequest();
  }, [location.pathname, location.search]);

  // This is just a fallback - the API should return raw JSON without rendering this component
  return null;
};

export default ApiProxy;
