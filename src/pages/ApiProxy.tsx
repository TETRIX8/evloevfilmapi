
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
        
        console.log(`Обработка API запроса...`);
        
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
          throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
        }
        
        // First get the text response
        const textResponse = await response.text();
        
        // Create a new document content
        let content = '';
        
        // Check if the response is JSON (either by content-type or by looking at the content)
        const isJson = contentType && contentType.includes('application/json');
        const looksLikeJson = textResponse.trim().startsWith('{') || textResponse.trim().startsWith('[');
        
        if (isJson || looksLikeJson) {
          try {
            // Try to parse as JSON
            const parsedJson = JSON.parse(textResponse);
            content = JSON.stringify(parsedJson, null, 2);
            
            // Set proper content type
            document.querySelector('html')?.setAttribute('content-type', 'application/json');
          } catch (e) {
            // If parsing fails, return the raw text
            content = textResponse;
          }
        } else {
          // Handle text response
          content = textResponse;
        }
        
        // Clear document and write response
        document.open();
        document.write(content);
        document.close();
      } catch (err: any) {
        console.error('Ошибка проксирования API запроса:', err);
        setError(err.message || 'Ошибка проксирования API запроса');
        
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

  // Display error if something went wrong
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-lg text-red-800 font-semibold mb-2">Ошибка запроса</p>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  // Return null after content is written to document
  return null;
};

export default ApiProxy;
