
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Ошибка: Пользователь попытался получить доступ к несуществующему маршруту:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-6">
          Страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Button asChild className="mb-6">
          <Link to="/">
            Вернуться на главную
          </Link>
        </Button>
        <p className="text-sm text-slate-500">
          Если вы считаете, что это ошибка, пожалуйста, проверьте URL или обратитесь в службу поддержки.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
