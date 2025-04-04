
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Documentation = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано в буфер обмена",
      description: "URL конечной точки API скопирован в буфер обмена.",
    });
  };

  const baseUrl = window.location.origin;
  const exampleUrl = `${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=100&genre=drama`;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Документация API Зеркала</h1>
      
      <div className="space-y-12">
        {/* Introduction */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Введение</h2>
          <p className="mb-4">
            API Зеркало - это прокси-сервис, который предоставляет доступ к API фильмов через наш домен.
            Это позволяет:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Использовать API без необходимости работы с внешними сервисами</li>
            <li>Получить стабильный и надежный доступ к данным</li>
            <li>Избегать проблем с CORS при использовании в веб-приложениях</li>
          </ul>
          <p>
            Запросы обрабатываются прозрачно для пользователя и возвращают полные данные без изменений.
          </p>
        </section>
        
        {/* Base URL */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Базовый URL</h2>
          <p className="mb-4">
            Все запросы API должны быть отправлены на следующий базовый URL:
          </p>
          <div className="flex items-center gap-2 mb-4">
            <code className="api-endpoint flex-1">
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
        </section>
        
        {/* API Parameters */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Параметры API</h2>
          <p className="mb-4">
            API для получения фильмов поддерживает следующие параметры запроса:
          </p>
          
          <div className="space-y-4">
            <div className="border rounded p-4">
              <h3 className="font-semibold">Базовые настройки API</h3>
              <div className="code-block mt-2">
                <code>const API_TOKEN = "3794a7638b5863cc60d7b2b9274fa32e";</code>
              </div>
            </div>
            
            <table className="min-w-full mt-4 border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 border">Параметр</th>
                  <th className="text-left p-3 border">Описание</th>
                  <th className="text-left p-3 border">Пример</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-mono">token</td>
                  <td className="p-3 border">API-ключ для авторизации запросов (обязательный)</td>
                  <td className="p-3 border font-mono">token=3794a7638b5863cc60d7b2b9274fa32e</td>
                </tr>
                <tr>
                  <td className="p-3 border font-mono">sort</td>
                  <td className="p-3 border">Сортировка результатов</td>
                  <td className="p-3 border font-mono">sort=-views (по просмотрам)</td>
                </tr>
                <tr>
                  <td className="p-3 border font-mono">type</td>
                  <td className="p-3 border">Тип контента</td>
                  <td className="p-3 border font-mono">type=films, serials, cartoon</td>
                </tr>
                <tr>
                  <td className="p-3 border font-mono">limit</td>
                  <td className="p-3 border">Ограничение количества результатов</td>
                  <td className="p-3 border font-mono">limit=50 (по умолчанию)</td>
                </tr>
                <tr>
                  <td className="p-3 border font-mono">year</td>
                  <td className="p-3 border">Фильтрация по году</td>
                  <td className="p-3 border font-mono">year=2024</td>
                </tr>
                <tr>
                  <td className="p-3 border font-mono">name</td>
                  <td className="p-3 border">Поиск по названию</td>
                  <td className="p-3 border font-mono">name=крик</td>
                </tr>
                <tr>
                  <td className="p-3 border font-mono">join_seasons</td>
                  <td className="p-3 border">Объединение сезонов (для сериалов)</td>
                  <td className="p-3 border font-mono">join_seasons=false</td>
                </tr>
                <tr>
                  <td className="p-3 border font-mono">genre</td>
                  <td className="p-3 border">Фильтрация по жанру</td>
                  <td className="p-3 border font-mono">genre=drama</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-lg font-semibold mt-8 mb-4">Возвращаемые поля для фильмов</h3>
          <div className="code-block">
            <pre>
{`{
  id: number;
  name: string;
  poster: string;
  iframe_url: string;
  description?: string;
  year?: number;
  rating?: number;
  genres?: string[];
  kinopoisk_id?: string;
  trailer?: string;
}`}
            </pre>
          </div>
        </section>
        
        {/* How to Use */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Как использовать</h2>
          <p className="mb-4">
            Для использования API Зеркала просто отправьте HTTP-запрос на наш эндпоинт с нужными параметрами запроса.
            Вся обработка происходит прозрачно для пользователя, вам не нужно беспокоиться о внутренней реализации.
          </p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Пример:</h3>
          
          <Tabs defaultValue="fetch">
            <TabsList className="mb-4">
              <TabsTrigger value="fetch">Fetch API</TabsTrigger>
              <TabsTrigger value="axios">Axios</TabsTrigger>
            </TabsList>
            <TabsContent value="fetch">
              <div className="code-block">
                <pre>
{`fetch("${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=10")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="axios">
              <div className="code-block">
                <pre>
{`axios.get("${baseUrl}/api/list", {
  params: {
    token: "3794a7638b5863cc60d7b2b9274fa32e",
    type: "serials",
    limit: 10
  }
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4">
            <div className="flex flex-col gap-2">
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="font-semibold">Полный URL примера:</p>
                <code className="block mt-1 break-all">{exampleUrl}</code>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(exampleUrl)}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" /> Копировать URL
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Example Requests */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Примеры запросов</h2>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Получение новых фильмов за определенный год</h3>
              <code className="api-endpoint block mb-2">
                {baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&year=2024
              </code>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(`${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&year=2024`)}
                className="flex items-center gap-1"
              >
                <Copy className="h-3 w-3" /> Копировать
              </Button>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Получение популярных фильмов с ограничением</h3>
              <code className="api-endpoint block mb-2">
                {baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&sort=-views&limit=10
              </code>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(`${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&sort=-views&limit=10`)}
                className="flex items-center gap-1"
              >
                <Copy className="h-3 w-3" /> Копировать
              </Button>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Поиск фильма по названию</h3>
              <code className="api-endpoint block mb-2">
                {baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&name=крик
              </code>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(`${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&name=крик`)}
                className="flex items-center gap-1"
              >
                <Copy className="h-3 w-3" /> Копировать
              </Button>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Получение сериалов определенного жанра</h3>
              <code className="api-endpoint block mb-2">
                {baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&genre=drama
              </code>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(`${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&genre=drama`)}
                className="flex items-center gap-1"
              >
                <Copy className="h-3 w-3" /> Копировать
              </Button>
            </div>
          </div>
        </section>
        
        {/* Error Handling */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Обработка ошибок</h2>
          <p className="mb-4">
            API может вернуть различные ответы в зависимости от успешности запроса. Распространенные коды состояния HTTP включают:
          </p>
          
          <div className="space-y-2">
            <div className="flex">
              <span className="w-16 font-mono font-medium">200</span>
              <span>Успешный запрос</span>
            </div>
            <div className="flex">
              <span className="w-16 font-mono font-medium">400</span>
              <span>Некорректный запрос - проверьте ваши параметры</span>
            </div>
            <div className="flex">
              <span className="w-16 font-mono font-medium">401</span>
              <span>Неавторизовано - недействительный токен</span>
            </div>
            <div className="flex">
              <span className="w-16 font-mono font-medium">404</span>
              <span>Ресурс не найден</span>
            </div>
            <div className="flex">
              <span className="w-16 font-mono font-medium">500</span>
              <span>Внутренняя ошибка сервера</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
