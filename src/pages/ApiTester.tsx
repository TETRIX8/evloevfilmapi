
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import MovieSearchForm from '@/components/MovieSearchForm';
import MovieSearchResults from '@/components/MovieSearchResults';
import { motion } from 'framer-motion';

const ApiTester = () => {
  const { toast } = useToast();
  const [endpoint, setEndpoint] = useState('list');
  const [token, setToken] = useState('3794a7638b5863cc60d7b2b9274fa32e');
  const [searchQuery, setSearchQuery] = useState('name=крик');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [isJsonResponse, setIsJsonResponse] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New states for manual request
  const [httpMethod, setHttpMethod] = useState('GET');
  const [manualUrl, setManualUrl] = useState('');
  
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}/api/${endpoint}?token=${token}${searchQuery ? `&${searchQuery}` : ''}`;
  
  // This just builds the URL but doesn't send the request
  const handleTest = () => {
    setManualUrl(fullUrl);
    toast({
      title: "URL сформирован",
      description: "URL запроса сформирован и готов к отправке.",
    });
  };
  
  // This handles the actual request - either from the builder or manual URL
  const handleManualRequest = async () => {
    try {
      setLoading(true);
      setError(null);
      setResponse('');
      
      if (!manualUrl) {
        throw new Error('URL запроса не может быть пустым');
      }
      
      // Use fetch with proper error handling and timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const res = await fetch(manualUrl, {
        method: httpMethod,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json, text/plain, */*',
        }
      });
      
      clearTimeout(timeoutId);
      
      const contentType = res.headers.get('content-type');
      let responseData: string;
      
      if (!res.ok) {
        throw new Error(`Ошибка API: ${res.status} ${res.statusText}`);
      }
      
      // First get the text of the response
      responseData = await res.text();
      
      // Then try to parse as JSON if it's indicated as JSON
      const isJson = contentType && contentType.includes('application/json');
      
      // Also check if the response looks like JSON regardless of content-type
      const looksLikeJson = responseData.trim().startsWith('{') || responseData.trim().startsWith('[');
      
      if (isJson || looksLikeJson) {
        try {
          // Validate it's actually JSON by parsing it
          JSON.parse(responseData);
          setIsJsonResponse(true);
          
          // Format the JSON string for readability
          setResponse(JSON.stringify(JSON.parse(responseData), null, 2));
        } catch (e) {
          // If it fails to parse as JSON, treat as text
          setIsJsonResponse(false);
          setResponse(responseData);
        }
      } else {
        // Not JSON, treat as text
        setIsJsonResponse(false);
        setResponse(responseData);
      }
      
      toast({
        title: "Запрос выполнен",
        description: "Результаты запроса получены успешно.",
        variant: "default",
      });
    } catch (err: any) {
      console.error("API request error:", err);
      
      if (err.name === 'AbortError') {
        setError('Запрос превысил время ожидания. Пожалуйста, попробуйте снова.');
      } else {
        setError(err.message || 'Произошла ошибка при выполнении запроса.');
      }
      
      toast({
        variant: "destructive",
        title: "Ошибка запроса",
        description: err.message || 'Произошла ошибка при выполнении запроса.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано в буфер обмена",
      description: "Текст был скопирован в буфер обмена.",
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center gradient-text">API Тестер</h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Создавайте, тестируйте и исследуйте API запросы с помощью удобного интерфейса
        </p>
      </motion.div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Search form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MovieSearchForm 
            endpoint={endpoint}
            setEndpoint={setEndpoint}
            token={token}
            setToken={setToken}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleTest={handleTest}
            loading={loading}
            fullUrl={fullUrl}
            httpMethod={httpMethod}
            setHttpMethod={setHttpMethod}
            manualUrl={manualUrl}
            setManualUrl={setManualUrl}
            handleManualRequest={handleManualRequest}
          />
        </motion.div>
        
        {/* Response viewer */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MovieSearchResults
            loading={loading}
            error={error}
            response={response}
            isJsonResponse={isJsonResponse}
            copyToClipboard={copyToClipboard}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ApiTester;
