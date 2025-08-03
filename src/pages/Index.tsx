
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, 
  ExternalLink, 
  Search, 
  Film, 
  Clapperboard, 
  Zap, 
  Globe, 
  Shield, 
  Code, 
  Play,
  Star,
  Calendar,
  Users,
  TrendingUp,
  Database
} from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('demo');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&name=${encodeURIComponent(searchQuery)}&limit=6`);
      const data = await response.json();
      setSearchResults(data.docs || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-20 md:py-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Film className="h-8 w-8 text-white mr-3" />
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              EvloevFilm API
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Мощный API для поиска фильмов и сериалов с богатой базой данных и быстрым доступом
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button asChild size="lg" className="rounded-full bg-white text-blue-600 hover:bg-blue-50">
              <Link to="/api-tester">
                <Search className="mr-2 h-5 w-5" />
                Попробовать поиск
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10">
              <Link to="/documentation">
                Документация <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-blue-200 text-sm">Фильмов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-200 text-sm">Сериалов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-200 text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">&lt;100ms</div>
              <div className="text-blue-200 text-sm">Время ответа</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Интерактивная демонстрация</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Попробуйте наш API прямо сейчас. Найдите любой фильм или сериал по названию
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="demo">Демо поиска</TabsTrigger>
              <TabsTrigger value="api">API примеры</TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="mr-2 h-5 w-5" />
                    Поиск фильмов
                  </CardTitle>
                  <CardDescription>
                    Введите название фильма или сериала для поиска
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-6">
                    <Input
                      placeholder="Например: крик, матрица, друзья..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSearch} disabled={isSearching}>
                      {isSearching ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {searchResults.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.map((movie: any, index: number) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="aspect-[2/3] bg-slate-200 rounded-lg mb-3 flex items-center justify-center">
                              {movie.poster?.url ? (
                                <img 
                                  src={movie.poster.url} 
                                  alt={movie.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <Film className="h-8 w-8 text-slate-400" />
                              )}
                            </div>
                            <h3 className="font-semibold text-sm mb-2 line-clamp-2">{movie.name}</h3>
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span>{movie.year}</span>
                              {movie.rating?.kp && (
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                  {movie.rating.kp.toFixed(1)}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {searchResults.length === 0 && !isSearching && searchQuery && (
                    <div className="text-center py-8 text-slate-500">
                      Ничего не найдено. Попробуйте другой запрос.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="mr-2 h-5 w-5" />
                      Поиск по названию
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <div>GET /api/list?token=3794a7638b5863cc60d7b2b9274fa32e&name=крик</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Film className="mr-2 h-5 w-5" />
                      Поиск фильмов по жанру
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <div>GET /api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&genre=action&limit=10</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clapperboard className="mr-2 h-5 w-5" />
                      Поиск сериалов
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <div>GET /api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=20</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Возможности API</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Мощные инструменты для разработчиков и интеграторов
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Быстрый поиск</CardTitle>
                <CardDescription>
                  Мгновенный поиск по названию, жанру, году и другим параметрам
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Богатая база данных</CardTitle>
                <CardDescription>
                  Десятки тысяч фильмов и сериалов со всего мира
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Глобальный доступ</CardTitle>
                <CardDescription>
                  API доступен по всему миру с низкой задержкой
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Безопасность</CardTitle>
                <CardDescription>
                  Защищенные запросы с токеном авторизации
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Высокая производительность</CardTitle>
                <CardDescription>
                  Оптимизированные запросы с кэшированием
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Простая интеграция</CardTitle>
                <CardDescription>
                  RESTful API с понятной документацией
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Готовы начать?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Интегрируйте наш API в ваше приложение уже сегодня
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link to="/api-tester">
                <Play className="mr-2 h-5 w-5" />
                Попробовать API
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/documentation">
                <Code className="mr-2 h-5 w-5" />
                Документация
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
