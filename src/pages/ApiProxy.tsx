
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ApiProxy = () => {
  const location = useLocation();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const proxyRequest = async () => {
      try {
        // Get the path after /api/ and the query parameters
        const path = location.pathname.replace(/^\/api\//, '');
        const targetUrl = `https://api.bhcesh.me/${path}${location.search}`;
        
        console.log(`Proxying request to: ${targetUrl}`);
        
        // Make request to the target API
        const response = await fetch(targetUrl);
        
        // Get response data
        const contentType = response.headers.get('content-type');
        let responseData;
        
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json();
        } else {
          responseData = await response.text();
        }
        
        // Set the data in state (although we'll return it directly in the response)
        setData(responseData);
        
        // Send the response data directly
        document.open();
        
        if (contentType && contentType.includes('application/json')) {
          document.write(JSON.stringify(responseData));
          document.close();
        } else {
          document.write(responseData);
          document.close();
        }
      } catch (err: any) {
        console.error('Error proxying API request:', err);
        setError(err.message || 'Error proxying API request');
        
        document.open();
        document.write(JSON.stringify({ error: err.message || 'Error proxying API request' }));
        document.close();
      }
    };

    proxyRequest();
  }, [location.pathname, location.search]);

  // This component doesn't actually render anything visible
  // The response is written directly to the document
  return null;
};

export default ApiProxy;
