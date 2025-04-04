
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, PlayCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

type MovieSearchFormProps = {
  endpoint: string;
  setEndpoint: (value: string) => void;
  token: string;
  setToken: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleTest: () => void;
  loading: boolean;
  fullUrl: string;
  httpMethod: string;
  setHttpMethod: (value: string) => void;
  manualUrl: string;
  setManualUrl: (value: string) => void;
  handleManualRequest: () => void;
};

const MovieSearchForm = ({
  endpoint,
  setEndpoint,
  token,
  setToken,
  searchQuery,
  setSearchQuery,
  handleTest,
  loading,
  fullUrl,
  httpMethod,
  setHttpMethod,
  manualUrl,
  setManualUrl,
  handleManualRequest
}: MovieSearchFormProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано в буфер обмена",
      description: "Текст был скопирован в буфер обмена.",
    });
  };

  const searchExamples = [
    { title: "Поиск фильмов Крик", query: "name=крик" },
    { title: "Поиск боевиков", query: "type=movies&genre=action" },
    { title: "Поиск драматических сериалов", query: "type=serials&genre=drama" }
  ];

  const requestExamples = [
    { title: "Новые фильмы 2024", url: `${window.location.origin}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&year=2024` },
    { title: "Популярные фильмы", url: `${window.location.origin}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&sort=-views&limit=10` },
    { title: "Поиск по названию 'Крик'", url: `${window.location.origin}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&name=крик` },
    { title: "Сериалы жанра драма", url: `${window.location.origin}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&genre=drama` },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Конструктор запросов</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="endpoint">Тип запроса</Label>
            <Input
              id="endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="например, list, search"
            />
          </div>
          
          <div>
            <Label htmlFor="token">Токен</Label>
            <Input
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Ваш токен API"
            />
          </div>
          
          <div>
            <Label htmlFor="searchQuery">Поисковый запрос</Label>
            <Input
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="например, name=крик или type=serials&genre=drama"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Формат: param1=value1&param2=value2
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">URL запроса</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => copyToClipboard(fullUrl)}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" /> Копировать
          </Button>
        </div>
        <div className="bg-slate-100 p-3 rounded-md font-mono text-sm break-all">
          {fullUrl}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={handleTest}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>Загрузка...</>
            ) : (
              <>
                <PlayCircle className="h-4 w-4" /> Собрать запрос
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Ручной запрос</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="w-24">
              <Label htmlFor="httpMethod">Метод</Label>
              <select 
                id="httpMethod"
                value={httpMethod}
                onChange={(e) => setHttpMethod(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>
            </div>
            <div className="flex-1">
              <Label htmlFor="manualUrl">URL запроса</Label>
              <Input
                id="manualUrl"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                placeholder="Введите полный URL запроса"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleManualRequest}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <>Загрузка...</>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" /> Выполнить запрос
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Примеры запросов</h2>
        <div className="space-y-3">
          {requestExamples.map((example, index) => (
            <div key={index} className="space-y-2 pb-2 border-b last:border-0">
              <p className="font-medium">{example.title}</p>
              <div className="flex items-center gap-2">
                <div className="bg-slate-100 p-2 rounded text-xs font-mono flex-1 break-all">
                  {example.url}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setManualUrl(example.url);
                    setHttpMethod("GET");
                  }}
                >
                  Использовать
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Популярные фильтры</h2>
        <div className="space-y-3">
          {searchExamples.map((example, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setSearchQuery(example.query)}
            >
              <PlayCircle className="h-4 w-4 mr-2" /> 
              {example.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSearchForm;
