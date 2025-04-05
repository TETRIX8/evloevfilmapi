
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ApiProxy = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const proxyRequest = async () => {
      try {
        // Get the path after /api/ and the query parameters
        const path = location.pathname.replace(/^\/api\//, '');
        // Use the base URL without revealing it to end-users
        const targetUrl = `https://api.bhcesh.me/${path}${location.search}`;
        
        console.log(`Processing API request to: ${targetUrl}`);
        
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
          const errorResponse = {
            error: true,
            status: response.status,
            message: `API Error: ${response.status} ${response.statusText}`
          };

          // Send only JSON without HTML wrapper
          const jsonResponse = JSON.stringify(errorResponse);
          writeJsonResponse(jsonResponse);
          return;
        }
        
        // Get the text response
        const textResponse = await response.text();
        
        // Check if the response is JSON (either by content-type or by looking at the content)
        const isJson = contentType && contentType.includes('application/json');
        const looksLikeJson = textResponse.trim().startsWith('{') || textResponse.trim().startsWith('[');
        
        if (isJson || looksLikeJson) {
          try {
            // Try to parse as JSON
            const parsedJson = JSON.parse(textResponse);
            
            // Return only the JSON data without any HTML
            const jsonResponse = JSON.stringify(parsedJson);
            writeJsonResponse(jsonResponse);
          } catch (e) {
            // If parsing fails, return error as JSON
            const errorResponse = {
              error: true,
              message: "Invalid JSON response received"
            };
            const jsonResponse = JSON.stringify(errorResponse);
            writeJsonResponse(jsonResponse);
          }
        } else {
          // Handle non-JSON by converting to JSON error response
          const errorResponse = {
            error: true,
            message: "Non-JSON response received",
            data: textResponse.substring(0, 200) + (textResponse.length > 200 ? '...' : '')
          };
          const jsonResponse = JSON.stringify(errorResponse);
          writeJsonResponse(jsonResponse);
        }
      } catch (err: any) {
        console.error('API proxy error:', err);
        
        // Return error as JSON
        const errorResponse = {
          error: true,
          message: err.message || 'API proxy error'
        };
        
        const jsonResponse = JSON.stringify(errorResponse);
        writeJsonResponse(jsonResponse);
      } finally {
        setIsLoading(false);
      }
    };

    // Function to write JSON response and set proper headers
    const writeJsonResponse = (jsonStr: string) => {
      // Clear any existing content
      document.open();
      
      // Set content type to JSON
      document.write(`<plaintext>${jsonStr}</plaintext>`);
      
      // Create a custom script to properly handle the response as pure JSON
      const script = document.createElement('script');
      script.innerHTML = `
        // Remove all HTML elements
        document.documentElement.innerHTML = '';
        
        // Create proper JSON response
        document.write(${JSON.stringify(jsonStr)});
        
        // Override content type to application/json
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Type';
        meta.content = 'application/json; charset=utf-8';
        document.head.appendChild(meta);
      `;
      
      // Execute the script and close the document
      document.body.appendChild(script);
      document.close();
    };

    proxyRequest();
  }, [location.pathname, location.search]);

  // This component doesn't render anything visible
  // It only writes the API response directly to the document
  return null;
};

export default ApiProxy;
