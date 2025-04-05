
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, PlayCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  // Add the missing properties
  httpMethod: string;
  setHttpMethod: (value: string) => void;
  manualUrl: string;
  setManualUrl: (value: string) => void;
  handleManualRequest: () => Promise<void>;
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
  const {
    toast
  } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано в буфер обмена",
      description: "Текст был скопирован в буфер обмена."
    });
  };
  
  const searchExamples = [{
    title: "Поиск фильмов Крик",
    query: "name=крик"
  }, {
    title: "Поиск боевиков",
    query: "type=movies&genre=action"
  }, {
    title: "Поиск драматических сериалов",
    query: "type=serials&genre=drama"
  }];
  
  return <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Поиск фильмов и сериалов</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="endpoint">Тип запроса</Label>
            <Input id="endpoint" value={endpoint} onChange={e => setEndpoint(e.target.value)} placeholder="например, list, search" />
          </div>
          
          <div>
            <Label htmlFor="token">Токен</Label>
            <Input id="token" value={token} onChange={e => setToken(e.target.value)} placeholder="Ваш токен API" />
          </div>
          
          <div>
            <Label htmlFor="searchQuery">Поисковый запрос</Label>
            <Input id="searchQuery" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="например, name=крик или type=serials&genre=drama" />
            <p className="text-xs text-muted-foreground mt-1">
              Формат: param1=value1&param2=value2
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">URL запроса</h2>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(fullUrl)} className="flex items-center gap-2">
            <Copy className="h-4 w-4" /> Копировать
          </Button>
        </div>
        <div className="bg-slate-100 p-3 rounded-md font-mono text-sm break-all">
          {fullUrl}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button onClick={handleTest} disabled={loading} className="flex items-center gap-2">
            {loading ? <>Загрузка...</> : <>
                <PlayCircle className="h-4 w-4" /> Выполнить поиск
              </>}
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">URL запроса   (Временно не работает попробуете ставить в браузер )</h2>
        <div className="space-y-3">
          {searchExamples.map((example, index) => <Button key={index} variant="outline" className="w-full justify-start" onClick={() => setSearchQuery(example.query)}>
              <PlayCircle className="h-4 w-4 mr-2" /> 
              {example.title}
            </Button>)}
        </div>
      </div>

      {/* Add UI for manual request - This section is new */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Ручной запрос</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="httpMethod">HTTP метод</Label>
            <div className="flex space-x-2 mt-1">
              {['GET', 'POST', 'PUT', 'DELETE'].map(method => (
                <Button 
                  key={method}
                  type="button"
                  variant={httpMethod === method ? "default" : "outline"}
                  onClick={() => setHttpMethod(method)}
                  className="flex-1"
                >
                  {method}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="manualUrl">URL запроса</Label>
            <div className="flex space-x-2">
              <Input 
                id="manualUrl" 
                value={manualUrl} 
                onChange={e => setManualUrl(e.target.value)} 
                placeholder="https://api.example.com/endpoint?param=value" 
                className="flex-1"
              />
              <Button variant="outline" size="icon" onClick={() => setManualUrl(fullUrl)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleManualRequest}
              disabled={loading || !manualUrl}
              className="flex items-center gap-2"
            >
              {loading ? 'Загрузка...' : 'Выполнить запрос'}
            </Button>
          </div>
        </div>
      </div>
    </div>;
};

export default MovieSearchForm;
