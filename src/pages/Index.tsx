
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, ExternalLink, Repeat } from 'lucide-react';

const Index = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">API Зеркало</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto">
            Мощный прокси-сервис для зеркалирования запросов внешних API через ваш домен
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/documentation">
                Начать <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/api-tester">
                Тестировать API <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Простая интеграция</h3>
              <p className="text-slate-600">
                Просто замените оригинальный домен API нашим и сохраните все остальные параметры без изменений.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Repeat className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Прозрачный прокси</h3>
              <p className="text-slate-600">
                Мы перенаправляем ваш запрос на оригинальный API и возвращаем ответ в точности как получено.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ExternalLink className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Множество конечных точек</h3>
              <p className="text-slate-600">
                Поддержка всех конечных точек API с совместимой передачей параметров.
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
              <h3 className="text-lg font-semibold mb-3">Оригинальный запрос API:</h3>
              <div className="code-block">
                <code>https://api.bhcesh.me/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=100&genre=drama</code>
              </div>
            </div>
            
            <div className="flex items-center justify-center my-6">
              <ArrowRight className="h-8 w-8 text-primary" />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-lg font-semibold mb-3">Ваш запрос через API Зеркало:</h3>
              <div className="code-block">
                <code>https://yourdomain.com/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=100&genre=drama</code>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/documentation">
                Посмотреть полную документацию
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
