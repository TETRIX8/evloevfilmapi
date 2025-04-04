
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Search, Film, Clapperboard } from 'lucide-react';

const Index = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">EvloevFilm API</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto">
            Удобный сервис для поиска информации о фильмах и сериалах  Creati by A-K project
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/documentation">
                Начать <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/api-tester">
                Поиск фильмов <Search className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Возможности сервиса</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрый поиск</h3>
              <p className="text-slate-600">
                Моментально находите фильмы и сериалы по названию, жанру, году выпуска и другим параметрам.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Подробная информация</h3>
              <p className="text-slate-600">
                Получайте детальную информацию о фильмах, включая рейтинги, жанры, страны производства и многое другое.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clapperboard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Фильмы и сериалы</h3>
              <p className="text-slate-600">
                Доступ к огромной базе данных фильмов и сериалов со всего мира.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example usage section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Пример использования</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
              <h3 className="text-lg font-semibold mb-3">URL для поиска фильмов:</h3>
              <div className="code-block">
                <code>/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&name=крик</code>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/api-tester">
                  Попробовать поиск фильмов
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
