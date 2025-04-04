
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Copy, ExternalLink, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ApiTester = () => {
  const { toast } = useToast();
  const [endpoint, setEndpoint] = useState('list');
  const [token, setToken] = useState('3794a7638b5863cc60d7b2b9274fa32e');
  const [params, setParams] = useState('type=serials&limit=100&genre=drama');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}/api/${endpoint}?token=${token}${params ? `&${params}` : ''}`;
  
  const handleTest = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(fullUrl);
      const data = await res.json();
      
      setResponse(JSON.stringify(data, null, 2));
      
      toast({
        title: "Запрос успешен",
        description: "Запрос API успешно выполнен.",
      });
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при выполнении запроса.');
      toast({
        variant: "destructive",
        title: "Запрос не выполнен",
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
      <h1 className="text-3xl font-bold mb-6">Тестер запросов API</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Request builder */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Конструктор запросов</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="endpoint">Конечная точка</Label>
                <Input
                  id="endpoint"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="например, list, search и т.д."
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
                <Label htmlFor="params">Дополнительные параметры</Label>
                <Input
                  id="params"
                  value={params}
                  onChange={(e) => setParams(e.target.value)}
                  placeholder="например, type=serials&limit=100&genre=drama"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Формат: param1=value1&param2=value2
                </p>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Полный URL запроса</CardTitle>
              <CardDescription>
                Это полный URL, который будет использоваться для вашего запроса API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 p-3 rounded-md font-mono text-sm break-all">
                {fullUrl}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(fullUrl)}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" /> Копировать URL
              </Button>
              <Button 
                onClick={handleTest}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <>Обработка...</>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4" /> Тестировать API
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Распространенные примеры использования API</h2>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setEndpoint('list');
                  setParams('type=serials&limit=100&genre=drama');
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" /> 
                Получить список драматических сериалов
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setEndpoint('list');
                  setParams('type=movies&limit=20&genre=action');
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" /> 
                Получить список экшн-фильмов
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setEndpoint('search');
                  setParams('query=avengers');
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" /> 
                Поиск по запросу "Мстители"
              </Button>
            </div>
          </div>
        </div>
        
        {/* Response viewer */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ответ</h2>
              {response && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(response)}
                >
                  <Copy className="h-4 w-4 mr-1" /> Копировать
                </Button>
              )}
            </div>
            
            <Tabs defaultValue="pretty" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="pretty">Форматированный</TabsTrigger>
                <TabsTrigger value="raw">Сырой</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pretty">
                {error ? (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
                    <p className="font-semibold">Ошибка</p>
                    <p>{error}</p>
                  </div>
                ) : loading ? (
                  <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                      <p>Загрузка ответа...</p>
                    </div>
                  </div>
                ) : response ? (
                  <pre className="bg-slate-800 text-white p-4 rounded-md overflow-auto h-96">
                    {response}
                  </pre>
                ) : (
                  <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="text-center">
                      <p className="mb-2">Нажмите "Тестировать API", чтобы увидеть ответ</p>
                      <PlayCircle className="mx-auto h-12 w-12 text-slate-400" />
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="raw">
                {error ? (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
                    <p>{error}</p>
                  </div>
                ) : loading ? (
                  <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : response ? (
                  <div className="bg-slate-800 font-mono text-white p-4 rounded-md overflow-auto h-96">
                    <code>{response.replace(/\n\s*/g, '')}</code>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md">
                    <p className="text-slate-500">Пока нет ответа</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              Использование в вашем приложении
            </h3>
            <p className="text-blue-800 mb-3">
              После тестирования вашего запроса API вы можете использовать его в своем приложении с помощью следующего кода:
            </p>
            <div className="code-block mb-2">
              <code>{`
fetch("${fullUrl}")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Ошибка:", error));
              `}</code>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-100"
              onClick={() => copyToClipboard(`
fetch("${fullUrl}")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Ошибка:", error));
              `)}
            >
              <Copy className="h-4 w-4 mr-1" /> Копировать код
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
