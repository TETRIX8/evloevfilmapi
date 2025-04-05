
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, PlayCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
      
      {/* Add manual request section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Ручной URL запрос</h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="w-1/4">
              <Label htmlFor="httpMethod">Метод</Label>
              <Select value={httpMethod} onValueChange={setHttpMethod}>
                <SelectTrigger id="httpMethod">
                  <SelectValue placeholder="Выберите метод" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="manualUrl">URL</Label>
              <Input 
                id="manualUrl" 
                value={manualUrl} 
                onChange={e => setManualUrl(e.target.value)} 
                placeholder="Введите полный URL запроса"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleManualRequest} disabled={loading} className="flex items-center gap-2">
              {loading ? <>Загрузка...</> : <>
                <PlayCircle className="h-4 w-4" /> Отправить запрос
              </>}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">URL запроса (Временно не работает попробуете ставить в браузер)</h2>
        <div className="space-y-3">
          {searchExamples.map((example, index) => <Button key={index} variant="outline" className="w-full justify-start" onClick={() => setSearchQuery(example.query)}>
              <PlayCircle className="h-4 w-4 mr-2" /> 
              {example.title}
            </Button>)}
        </div>
      </div>
    </div>;
};

export default MovieSearchForm;
