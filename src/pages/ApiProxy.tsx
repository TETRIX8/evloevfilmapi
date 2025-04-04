
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
        
        // Set appropriate content type for the document
        if (contentType) {
          document.querySelector('html')?.setAttribute('content-type', contentType);
        }
        
        if (!response.ok) {
          throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
        }
        
        try {
          // Try parsing as JSON first
          if (contentType && contentType.includes('application/json')) {
            const jsonData = await response.json();
            setData(jsonData);
            
            document.open();
            document.write(JSON.stringify(jsonData, null, 2));
            document.close();
          } else {
            // Handle as text if not JSON
            const textData = await response.text();
            setData(textData);
            
            document.open();
            document.write(textData);
            document.close();
          }
        } catch (parseError: any) {
          console.error('Ошибка при обработке ответа:', parseError);
          
          // Fallback to text if JSON parsing fails
          const textData = await response.text();
          setData(textData);
          
          document.open();
          document.write(textData);
          document.close();
        }
      } catch (err: any) {
        console.error('Ошибка проксирования API запроса:', err);
        setError(err.message || 'Ошибка проксирования API запроса');
        
        document.open();
        document.write(JSON.stringify({ error: err.message || 'Ошибка проксирования API запроса' }));
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
