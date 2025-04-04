
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
  const baseApiUrl = "https://api.bhcesh.me";

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Документация API Зеркала</h1>
      
      <div className="space-y-12">
        {/* Introduction */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Введение</h2>
          <p className="mb-4">
            API Зеркало - это прокси-сервис, который позволяет отправлять запросы к внешним API через наш домен.
            Это может быть полезно для:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Обхода ограничений CORS в клиентских приложениях</li>
            <li>Маскировки исходной конечной точки API для дополнительной приватности</li>
            <li>Настройки стабильной конечной точки API для ваших приложений</li>
          </ul>
          <p>
            Шлюз перенаправляет все запросы к оригинальному API и возвращает ответы без изменений.
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
          <p className="text-sm text-muted-foreground">
            Это будет проксировать запросы на: <code className="px-1 py-0.5 bg-gray-100 rounded">{baseApiUrl}</code>
          </p>
        </section>
        
        {/* How to Use */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Как использовать</h2>
          <p className="mb-4">
            Для использования API Зеркала замените оригинальный домен API на URL нашего шлюза, сохраняя все остальные параметры без изменений.
          </p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Пример:</h3>
          
          <Tabs defaultValue="original">
            <TabsList className="mb-4">
              <TabsTrigger value="original">Оригинальный API</TabsTrigger>
              <TabsTrigger value="mirror">API Зеркало</TabsTrigger>
            </TabsList>
            <TabsContent value="original">
              <div className="code-block">
                <code>https://api.bhcesh.me/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=100&genre=drama</code>
              </div>
            </TabsContent>
            <TabsContent value="mirror">
              <div className="flex flex-col gap-2">
                <div className="code-block">
                  <code>{exampleUrl}</code>
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
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Available Endpoints */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Доступные конечные точки</h2>
          <p className="mb-6">
            API Зеркало поддерживает все конечные точки, доступные в оригинальном API. Вот некоторые распространенные примеры:
          </p>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Конечная точка списка</h3>
              <code className="api-endpoint block mb-2">
                {baseUrl}/api/list?token=TOKEN&type=TYPE&limit=LIMIT&genre=GENRE
              </code>
              <p className="text-sm text-slate-600">
                Возвращает список элементов в соответствии с указанным типом, лимитом и жанром.
              </p>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Конечная точка поиска</h3>
              <code className="api-endpoint block mb-2">
                {baseUrl}/api/search?token=TOKEN&query=QUERY
              </code>
              <p className="text-sm text-slate-600">
                Ищет элементы, соответствующие указанному запросу.
              </p>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Пользовательские конечные точки</h3>
              <p className="text-sm text-slate-600">
                Любая другая конечная точка, доступная в оригинальном API, может быть доступна путем замены домена на URL нашего шлюза.
              </p>
            </div>
          </div>
        </section>
        
        {/* Error Handling */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Обработка ошибок</h2>
          <p className="mb-4">
            API Зеркало вернет те же ответы с ошибками, что и оригинальный API. Распространенные коды состояния HTTP включают:
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
              <span>Ошибка сервера от исходного API</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
