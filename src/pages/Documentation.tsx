
import React, { useState } from 'react';
import { Copy, BookOpen, Code, Zap, Shield, Globe, Database, Search, Film, Clapperboard, Star, Calendar, Users, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const Documentation = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано в буфер обмена",
      description: "URL конечной точки API скопирован в буфер обмена.",
    });
  };

  const baseUrl = window.location.origin;
  const exampleUrl = `${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=100&genre=drama`;

  const apiExamples = [
    {
      title: "Поиск по названию",
      description: "Найти фильмы по названию",
      url: `${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&name=крик`,
      method: "GET"
    },
    {
      title: "Фильмы по жанру",
      description: "Список боевиков",
      url: `${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&genre=action&limit=10`,
      method: "GET"
    },
    {
      title: "Сериалы 2024 года",
      description: "Сериалы за 2024 год",
      url: `${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&year=2024&limit=20`,
      method: "GET"
    },
    {
      title: "Популярные фильмы",
      description: "Топ фильмов по просмотрам",
      url: `${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&sort=-views&limit=15`,
      method: "GET"
    }
  ];

  const codeExamples = {
    fetch: `fetch("${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=10")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    
    axios: `axios.get("${baseUrl}/api/list", {
  params: {
    token: "3794a7638b5863cc60d7b2b9274fa32e",
    type: "serials",
    limit: 10
  }
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));`,
    
    curl: `curl "${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=10"`,
    
    javascript: `const API_TOKEN = "3794a7638b5863cc60d7b2b9274fa32e";
const BASE_URL = "${baseUrl}/api";

async function searchMovies(query) {
  const response = await fetch(\`\${BASE_URL}/list?token=\${API_TOKEN}&name=\${query}\`);
  return await response.json();
}`,
    
    python: `import requests

API_TOKEN = "3794a7638b5863cc60d7b2b9274fa32e"
BASE_URL = "${baseUrl}/api"

def search_movies(query):
    response = requests.get(f"{BASE_URL}/list", params={
        "token": API_TOKEN,
        "name": query
    })
    return response.json()`
  };

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
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Документация API
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Полное руководство по использованию EvloevFilm API
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="endpoints">Эндпоинты</TabsTrigger>
            <TabsTrigger value="examples">Примеры</TabsTrigger>
            <TabsTrigger value="reference">Справочник</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="mr-2 h-5 w-5" />
                      Быстрый старт
                    </CardTitle>
                    <CardDescription>
                      Начните использовать API за несколько минут
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Базовый URL</label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-slate-100 p-2 rounded text-sm">
                          {baseUrl}/api
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(`${baseUrl}/api`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">API Токен</label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-slate-100 p-2 rounded text-sm">
                          3794a7638b5863cc60d7b2b9274fa32e
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard('3794a7638b5863cc60d7b2b9274fa32e')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Простой пример</label>
                      <div className="bg-slate-900 text-green-400 p-3 rounded text-sm">
                        <div>GET {baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&name=крик</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Возможности API
                    </CardTitle>
                    <CardDescription>
                      Что вы можете делать с нашим API
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Search className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Быстрый поиск</div>
                          <div className="text-sm text-slate-500">По названию, жанру, году</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Database className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Богатая база данных</div>
                          <div className="text-sm text-slate-500">50K+ фильмов и сериалов</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium">Глобальный доступ</div>
                          <div className="text-sm text-slate-500">Низкая задержка по всему миру</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-medium">Простая интеграция</div>
                          <div className="text-sm text-slate-500">RESTful API с JSON</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Эндпоинты API
                </CardTitle>
                <CardDescription>
                  Доступные эндпоинты и их параметры
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">GET /api/list</h3>
                    <p className="text-slate-600 mb-4">Основной эндпоинт для поиска фильмов и сериалов</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Обязательные параметры</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <code className="text-sm">token</code>
                            <Badge variant="destructive">Обязательный</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Опциональные параметры</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <code>name</code>
                            <span>Поиск по названию</span>
                          </div>
                          <div className="flex justify-between">
                            <code>type</code>
                            <span>films, serials, cartoon</span>
                          </div>
                          <div className="flex justify-between">
                            <code>genre</code>
                            <span>Фильтр по жанру</span>
                          </div>
                          <div className="flex justify-between">
                            <code>year</code>
                            <span>Фильтр по году</span>
                          </div>
                          <div className="flex justify-between">
                            <code>limit</code>
                            <span>Количество результатов</span>
                          </div>
                          <div className="flex justify-between">
                            <code>sort</code>
                            <span>Сортировка результатов</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Film className="mr-2 h-5 w-5" />
                    Примеры запросов
                  </CardTitle>
                  <CardDescription>
                    Готовые примеры для различных сценариев использования
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {apiExamples.map((example, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{example.title}</h4>
                          <Badge variant="outline">{example.method}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{example.description}</p>
                        <div className="bg-slate-900 text-green-400 p-3 rounded text-sm font-mono break-all">
                          {example.url}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(example.url)}
                          className="mt-2"
                        >
                          <Copy className="mr-2 h-3 w-3" />
                          Копировать
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5" />
                    Примеры кода
                  </CardTitle>
                  <CardDescription>
                    Интеграция с различными языками программирования
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="fetch">
                    <TabsList>
                      <TabsTrigger value="fetch">JavaScript (Fetch)</TabsTrigger>
                      <TabsTrigger value="axios">JavaScript (Axios)</TabsTrigger>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript (Class)</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="fetch" className="mt-4">
                      <div className="bg-slate-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                        <pre>{codeExamples.fetch}</pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="axios" className="mt-4">
                      <div className="bg-slate-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                        <pre>{codeExamples.axios}</pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="curl" className="mt-4">
                      <div className="bg-slate-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                        <pre>{codeExamples.curl}</pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="javascript" className="mt-4">
                      <div className="bg-slate-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                        <pre>{codeExamples.javascript}</pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="python" className="mt-4">
                      <div className="bg-slate-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                        <pre>{codeExamples.python}</pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reference" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Справочник параметров
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Параметр</th>
                          <th className="text-left p-3 font-medium">Тип</th>
                          <th className="text-left p-3 font-medium">Описание</th>
                          <th className="text-left p-3 font-medium">Пример</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-mono">token</td>
                          <td className="p-3">string</td>
                          <td className="p-3">API ключ для авторизации</td>
                          <td className="p-3 font-mono">3794a7638b5863cc60d7b2b9274fa32e</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono">name</td>
                          <td className="p-3">string</td>
                          <td className="p-3">Поиск по названию</td>
                          <td className="p-3 font-mono">крик</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono">type</td>
                          <td className="p-3">string</td>
                          <td className="p-3">Тип контента</td>
                          <td className="p-3 font-mono">films, serials, cartoon</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono">genre</td>
                          <td className="p-3">string</td>
                          <td className="p-3">Фильтр по жанру</td>
                          <td className="p-3 font-mono">action, drama, comedy</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono">year</td>
                          <td className="p-3">number</td>
                          <td className="p-3">Фильтр по году</td>
                          <td className="p-3 font-mono">2024</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono">limit</td>
                          <td className="p-3">number</td>
                          <td className="p-3">Количество результатов</td>
                          <td className="p-3 font-mono">10</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono">sort</td>
                          <td className="p-3">string</td>
                          <td className="p-3">Сортировка результатов</td>
                          <td className="p-3 font-mono">-views, -rating</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Коды ответов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="font-mono font-medium">200</span>
                      </div>
                      <span>Успешный запрос</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                        <span className="font-mono font-medium">400</span>
                      </div>
                      <span>Некорректный запрос</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span className="font-mono font-medium">401</span>
                      </div>
                      <span>Неавторизовано</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span className="font-mono font-medium">500</span>
                      </div>
                      <span>Внутренняя ошибка сервера</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
