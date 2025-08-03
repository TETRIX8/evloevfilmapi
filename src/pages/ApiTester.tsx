
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Code, 
  Copy, 
  Play, 
  Zap, 
  Film, 
  Clapperboard, 
  Star,
  Calendar,
  Globe,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('builder');
  
  // New states for manual request
  const [httpMethod, setHttpMethod] = useState('GET');
  const [manualUrl, setManualUrl] = useState('');
  const [requestHistory, setRequestHistory] = useState<Array<{
    url: string;
    method: string;
    timestamp: Date;
    success: boolean;
  }>>([]);
  
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}/api/${endpoint}?token=${token}${searchQuery ? `&${searchQuery}` : ''}`;
  
  const handleTest = () => {
    setManualUrl(fullUrl);
    toast({
      title: "URL сформирован",
      description: "URL запроса сформирован и готов к отправке.",
    });
  };
  
  const handleManualRequest = async () => {
    try {
      setLoading(true);
      setError(null);
      setResponse('');
      
      if (!manualUrl) {
        throw new Error('URL запроса не может быть пустым');
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const startTime = Date.now();
      const res = await fetch(manualUrl, {
        method: httpMethod,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json, text/plain, */*',
        }
      });
      
      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;
      
      const contentType = res.headers.get('content-type');
      let responseData: string;
      
      if (!res.ok) {
        throw new Error(`Ошибка API: ${res.status} ${res.statusText}`);
      }
      
      responseData = await res.text();
      
      const isJson = contentType && contentType.includes('application/json');
      const looksLikeJson = responseData.trim().startsWith('{') || responseData.trim().startsWith('[');
      
      if (isJson || looksLikeJson) {
        try {
          JSON.parse(responseData);
          setIsJsonResponse(true);
          setResponse(JSON.stringify(JSON.parse(responseData), null, 2));
        } catch (e) {
          setIsJsonResponse(false);
          setResponse(responseData);
        }
      } else {
        setIsJsonResponse(false);
        setResponse(responseData);
      }
      
      // Add to history
      setRequestHistory(prev => [{
        url: manualUrl,
        method: httpMethod,
        timestamp: new Date(),
        success: true
      }, ...prev.slice(0, 9)]);
      
      toast({
        title: "Запрос выполнен",
        description: `Ответ получен за ${responseTime}ms`,
        variant: "default",
      });
    } catch (err: any) {
      console.error("API request error:", err);
      
      if (err.name === 'AbortError') {
        setError('Запрос превысил время ожидания. Пожалуйста, попробуйте снова.');
      } else {
        setError(err.message || 'Произошла ошибка при выполнении запроса.');
      }
      
      // Add failed request to history
      setRequestHistory(prev => [{
        url: manualUrl,
        method: httpMethod,
        timestamp: new Date(),
        success: false
      }, ...prev.slice(0, 9)]);
      
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

  const quickExamples = [
    {
      name: "Поиск по названию",
      query: "name=крик",
      description: "Найти фильмы по названию"
    },
    {
      name: "Фильмы по жанру",
      query: "type=films&genre=action&limit=10",
      description: "Список боевиков"
    },
    {
      name: "Сериалы",
      query: "type=serials&limit=20",
      description: "Список сериалов"
    },
    {
      name: "По году",
      query: "year=2024&limit=15",
      description: "Фильмы 2024 года"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Code className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              API Тестер
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Создавайте, тестируйте и исследуйте API запросы с помощью удобного интерфейса
          </p>
        </motion.div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="builder">Конструктор запросов</TabsTrigger>
            <TabsTrigger value="manual">Ручной ввод</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Request Builder */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="mr-2 h-5 w-5" />
                      Конструктор запросов
                    </CardTitle>
                    <CardDescription>
                      Создайте API запрос с помощью удобного интерфейса
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Endpoint</label>
                      <Select value={endpoint} onValueChange={setEndpoint}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="list">list - Поиск фильмов</SelectItem>
                          <SelectItem value="movie">movie - Детали фильма</SelectItem>
                          <SelectItem value="search">search - Расширенный поиск</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Токен</label>
                      <Input
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Введите токен API"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Параметры запроса</label>
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="name=крик&limit=10"
                      />
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleTest} className="w-full">
                        <Code className="mr-2 h-4 w-4" />
                        Сформировать URL
                      </Button>
                    </div>

                    {fullUrl && (
                      <div className="mt-4">
                        <label className="text-sm font-medium mb-2 block">Сформированный URL</label>
                        <div className="bg-slate-100 p-3 rounded-lg text-sm font-mono break-all">
                          {fullUrl}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(fullUrl)}
                          className="mt-2"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Копировать
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Examples */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Film className="mr-2 h-5 w-5" />
                      Быстрые примеры
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {quickExamples.map((example, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setSearchQuery(example.query);
                            toast({
                              title: "Пример загружен",
                              description: example.description,
                            });
                          }}
                        >
                          <div className="font-medium text-sm">{example.name}</div>
                          <div className="text-xs text-slate-500 mt-1">{example.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Response Viewer */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="mr-2 h-5 w-5" />
                      Результат запроса
                    </CardTitle>
                    <CardDescription>
                      Отправьте запрос и посмотрите результат
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">HTTP метод</label>
                        <Select value={httpMethod} onValueChange={setHttpMethod}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">URL запроса</label>
                        <Input
                          value={manualUrl}
                          onChange={(e) => setManualUrl(e.target.value)}
                          placeholder="https://api.example.com/endpoint"
                        />
                      </div>

                      <Button 
                        onClick={handleManualRequest} 
                        disabled={loading || !manualUrl}
                        className="w-full"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Выполняется...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Отправить запрос
                          </>
                        )}
                      </Button>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                            <span className="text-red-700 text-sm">{error}</span>
                          </div>
                        </div>
                      )}

                      {response && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium">Ответ</label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(response)}
                            >
                              <Copy className="mr-2 h-3 w-3" />
                              Копировать
                            </Button>
                          </div>
                          <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
                            <pre>{response}</pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Ручной ввод запроса
                </CardTitle>
                <CardDescription>
                  Введите полный URL запроса вручную
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">HTTP метод</label>
                    <Select value={httpMethod} onValueChange={setHttpMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">URL запроса</label>
                    <Input
                      value={manualUrl}
                      onChange={(e) => setManualUrl(e.target.value)}
                      placeholder="https://evloevfilmapi.vercel.app/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&name=крик"
                    />
                  </div>

                  <Button 
                    onClick={handleManualRequest} 
                    disabled={loading || !manualUrl}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Выполняется...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Отправить запрос
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  История запросов
                </CardTitle>
                <CardDescription>
                  Последние 10 выполненных запросов
                </CardDescription>
              </CardHeader>
              <CardContent>
                {requestHistory.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    История запросов пуста. Выполните первый запрос.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {requestHistory.map((request, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setManualUrl(request.url);
                          setHttpMethod(request.method);
                          setActiveTab('manual');
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {request.success ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            <Badge variant="outline">{request.method}</Badge>
                            <span className="text-sm font-mono truncate flex-1">
                              {request.url}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {request.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApiTester;
