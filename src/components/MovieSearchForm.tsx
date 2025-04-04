
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, PlayCircle, Code, Link, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="space-y-8">
      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
        <Card className="card-hover overflow-hidden border-slate-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="text-xl">Конструктор запросов</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="endpoint">Тип запроса</Label>
              <Input
                id="endpoint"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="например, list, search"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div>
              <Label htmlFor="token">Токен</Label>
              <Input
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Ваш токен API"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div>
              <Label htmlFor="searchQuery">Поисковый запрос</Label>
              <Input
                id="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="например, name=крик или type=serials&genre=drama"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Формат: param1=value1&param2=value2
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
        <Card className="card-hover overflow-hidden border-slate-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">URL запроса</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(fullUrl)}
                className="copy-button flex items-center gap-2"
              >
                <Copy className="h-4 w-4" /> Копировать
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-slate-100 p-3 rounded-md font-mono text-sm break-all">
              {fullUrl}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={handleTest}
                disabled={loading}
                className="button-hover flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
              >
                {loading ? (
                  <div className="flex space-x-1 items-center">
                    <span className="loading-dot h-2 w-2 rounded-full bg-white"></span>
                    <span className="loading-dot h-2 w-2 rounded-full bg-white"></span>
                    <span className="loading-dot h-2 w-2 rounded-full bg-white"></span>
                    <span className="ml-2">Загрузка...</span>
                  </div>
                ) : (
                  <>
                    <Code className="h-4 w-4" /> Собрать запрос
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
        <Card className="card-hover overflow-hidden border-slate-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="text-xl">Ручной запрос</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-2">
              <div className="w-24">
                <Label htmlFor="httpMethod">Метод</Label>
                <select 
                  id="httpMethod"
                  value={httpMethod}
                  onChange={(e) => setHttpMethod(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
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
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleManualRequest}
                disabled={loading}
                className="button-hover flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
              >
                {loading ? (
                  <div className="flex space-x-1 items-center">
                    <span className="loading-dot h-2 w-2 rounded-full bg-white"></span>
                    <span className="loading-dot h-2 w-2 rounded-full bg-white"></span>
                    <span className="loading-dot h-2 w-2 rounded-full bg-white"></span>
                    <span className="ml-2">Загрузка...</span>
                  </div>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4" /> Выполнить запрос
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
        <Card className="card-hover overflow-hidden border-slate-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="text-xl">Примеры запросов</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {requestExamples.map((example, index) => (
                <motion.div 
                  key={index} 
                  className="example-item space-y-2 pb-3 border-b last:border-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <p className="font-medium flex items-center">
                    <Link className="h-4 w-4 mr-2 text-primary" /> 
                    {example.title}
                  </p>
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
                      className="copy-button"
                    >
                      Использовать
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
        <Card className="card-hover overflow-hidden border-slate-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="text-xl">Популярные фильтры</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {searchExamples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full justify-start example-item"
                    onClick={() => setSearchQuery(example.query)}
                  >
                    <Bookmark className="h-4 w-4 mr-2 text-primary" /> 
                    {example.title}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MovieSearchForm;
