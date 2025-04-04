
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import MovieSearchForm from '@/components/MovieSearchForm';
import MovieSearchResults from '@/components/MovieSearchResults';

const ApiTester = () => {
  const { toast } = useToast();
  const [endpoint, setEndpoint] = useState('list');
  const [token, setToken] = useState('3794a7638b5863cc60d7b2b9274fa32e');
  const [searchQuery, setSearchQuery] = useState('name=крик');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [isJsonResponse, setIsJsonResponse] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}/api/${endpoint}?token=${token}${searchQuery ? `&${searchQuery}` : ''}`;
  
  const handleTest = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use fetch with proper error handling and timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const res = await fetch(fullUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json, text/plain, */*',
        }
      });
      
      clearTimeout(timeoutId);
      
      const contentType = res.headers.get('content-type');
      
      if (!res.ok) {
        throw new Error(`Ошибка API: ${res.status} ${res.statusText}`);
      }
      
      if (contentType && contentType.includes('application/json')) {
        // Handle JSON response
        setIsJsonResponse(true);
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        // Handle non-JSON response
        setIsJsonResponse(false);
        const text = await res.text();
        setResponse(text);
      }
      
      toast({
        title: "Поиск выполнен",
        description: "Результаты поиска получены успешно.",
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
      <h1 className="text-3xl font-bold mb-6">Поиск фильмов и сериалов</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Search form */}
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
        />
        
        {/* Response viewer */}
        <MovieSearchResults
          loading={loading}
          error={error}
          response={response}
          isJsonResponse={isJsonResponse}
          copyToClipboard={copyToClipboard}
        />
      </div>
    </div>
  );
};

export default ApiTester;
