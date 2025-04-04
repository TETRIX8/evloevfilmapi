
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type MovieSearchResultsProps = {
  loading: boolean;
  error: string | null;
  response: string;
  isJsonResponse: boolean;
  copyToClipboard: (text: string) => void;
};

const MovieSearchResults = ({
  loading,
  error,
  response,
  isJsonResponse,
  copyToClipboard
}: MovieSearchResultsProps) => {
  const { toast } = useToast();

  // Функция для отображения карточек фильмов, если есть результаты
  const renderMovieCards = () => {
    try {
      if (!isJsonResponse || !response) return null;
      
      const data = JSON.parse(response);
      
      // Проверяем, что в ответе есть results
      if (data.results && Array.isArray(data.results)) {
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Найденные фильмы и сериалы:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.results.map((movie: any) => (
                <Card key={movie.id} className="overflow-hidden">
                  <div className="aspect-[2/3] relative bg-slate-200">
                    {movie.poster && (
                      <img 
                        src={movie.poster} 
                        alt={movie.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <CardHeader className="p-4">
                    <h4 className="text-lg font-bold line-clamp-2">{movie.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      {movie.origin_name && (
                        <p className="italic">{movie.origin_name}</p>
                      )}
                      <p className="mt-1">
                        {movie.year && <span className="mr-2">{movie.year}</span>}
                        {movie.type && (
                          <span className="mr-2">
                            {movie.type === 'film' ? 'Фильм' : 
                             movie.type === 'serial' ? 'Сериал' : 
                             movie.type}
                          </span>
                        )}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {movie.genre && Object.values(movie.genre).length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {Object.values(movie.genre).map((genre: any, index: number) => (
                          <span 
                            key={index} 
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      {movie.imdb && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-medium">
                          IMDB: {movie.imdb}
                        </span>
                      )}
                      {movie.kinopoisk && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-medium">
                          КП: {movie.kinopoisk}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {data.total > 0 && (
              <p className="mt-4 text-muted-foreground">
                Всего найдено: {data.total}
              </p>
            )}
          </div>
        );
      }
      
      return null;
    } catch (err) {
      return null;
    }
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Результаты поиска</h2>
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
        
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="visual">Визуально</TabsTrigger>
            <TabsTrigger value="pretty">JSON</TabsTrigger>
            <TabsTrigger value="raw">Исходный код</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual">
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
                <p className="font-semibold">Ошибка</p>
                <p>{error}</p>
              </div>
            ) : loading ? (
              <div className="h-60 flex items-center justify-center bg-slate-50 rounded-md">
                <div className="flex flex-col items-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                  <p>Загрузка результатов...</p>
                </div>
              </div>
            ) : response ? (
              renderMovieCards() || (
                <div className="bg-slate-50 p-4 rounded-md">
                  <p className="text-center text-slate-600">Нет данных для визуального отображения</p>
                </div>
              )
            ) : (
              <div className="h-60 flex items-center justify-center bg-slate-50 rounded-md">
                <div className="text-center">
                  <p className="mb-2">Введите параметры поиска и нажмите "Выполнить поиск"</p>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pretty">
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
                <p>{error}</p>
              </div>
            ) : loading ? (
              <div className="h-60 flex items-center justify-center bg-slate-50 rounded-md">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : response ? (
              isJsonResponse ? (
                <pre className="bg-slate-800 text-white p-4 rounded-md overflow-auto h-96">
                  {response}
                </pre>
              ) : (
                <div className="bg-slate-800 text-white p-4 rounded-md overflow-auto h-96">
                  <p className="mb-2 text-yellow-300">Ответ не в формате JSON:</p>
                  <div className="font-mono whitespace-pre-wrap">{response}</div>
                </div>
              )
            ) : (
              <div className="h-60 flex items-center justify-center bg-slate-50 rounded-md">
                <p className="text-slate-500">Пока нет результатов</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="raw">
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
                <p>{error}</p>
              </div>
            ) : loading ? (
              <div className="h-60 flex items-center justify-center bg-slate-50 rounded-md">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : response ? (
              <div className="bg-slate-800 font-mono text-white p-4 rounded-md overflow-auto h-96">
                <code>{isJsonResponse ? response.replace(/\n\s*/g, '') : response}</code>
              </div>
            ) : (
              <div className="h-60 flex items-center justify-center bg-slate-50 rounded-md">
                <p className="text-slate-500">Пока нет результатов</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MovieSearchResults;
