
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ApiProxy = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const proxyRequest = async () => {
      try {
        setIsLoading(true);
        // Get the path after /api/ and the query parameters
        const path = location.pathname.replace(/^\/api\//, '');
        // Use the base URL without revealing it to end-users
        const targetUrl = `https://api.bhcesh.me/${path}${location.search}`;
        
        console.log(`Обработка API запроса...`);
        
        // Make request to the target API
        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
          },
        });
        
        // Get response data
        const contentType = response.headers.get('content-type');
        
        if (!response.ok) {
          throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
        }
        
        // Create a new document content
        let content = '';
        
        // Handle response based on content type
        if (contentType && contentType.includes('application/json')) {
          // Handle JSON response
          const jsonData = await response.json();
          content = JSON.stringify(jsonData, null, 2);
          
          // Set proper content type
          document.querySelector('html')?.setAttribute('content-type', 'application/json');
        } else {
          // Handle text response
          content = await response.text();
        }
        
        // Clear document and write response
        document.open();
        document.write(content);
        document.close();
      } catch (err: any) {
        console.error('Ошибка проксирования API запроса:', err);
        
        // Return error in desired format
        const errorContent = JSON.stringify({ 
          error: true, 
          message: err.message || 'Ошибка проксирования API запроса' 
        }, null, 2);
        
        document.open();
        document.write(errorContent);
        document.close();
      } finally {
        setIsLoading(false);
      }
    };

    proxyRequest();
  }, [location.pathname, location.search]);

  // Display loading if request is in progress
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4 mx-auto"></div>
          <p className="text-lg">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  // Return null after content is written to document
  return null;
};

export default ApiProxy;
