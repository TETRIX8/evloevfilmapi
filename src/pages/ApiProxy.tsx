
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ApiProxy = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [checkInterval, setCheckInterval] = useState<number | null>(null);

  // Handle payment button click
  const handlePaymentClick = () => {
    // Generate unique payment ID
    const newPaymentId = 'vpn-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setPaymentId(newPaymentId);
    
    // Open YooMoney payment page
    const paymentUrl = `https://yoomoney.ru/quickpay/confirm.xml?receiver=4100118336080745&quickpay-form=shop&targets=VPN&paymentType=AC&sum=2&label=${newPaymentId}`;
    window.open(paymentUrl, '_blank');
    
    // Start checking payment status
    const intervalId = window.setInterval(() => {
      checkPaymentStatus(newPaymentId);
    }, 10000); // Check every 10 seconds
    
    setCheckInterval(intervalId);
    
    // Set timeout to stop checking after 15 minutes
    setTimeout(() => {
      if (checkInterval) {
        clearInterval(checkInterval);
        setCheckInterval(null);
        
        // If still not paid after timeout
        if (!isPaid) {
          const statusElement = document.getElementById('payment-status');
          if (statusElement) {
            statusElement.className = 'error';
            statusElement.textContent = 'Время ожидания платежа истекло.';
            statusElement.style.display = 'block';
          }
        }
      }
    }, 900000); // 15 minutes
  };

  // Check payment status (mock implementation)
  const checkPaymentStatus = (id: string) => {
    // This is a mock implementation
    // In a real scenario, you would make an API call to your backend
    // which would check the payment status with YooMoney API
    
    // For demo purposes, we'll randomly succeed after a few checks
    const mockResponses = ['pending', 'pending', 'success'];
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    const statusElement = document.getElementById('payment-status');
    if (statusElement) {
      statusElement.style.display = 'block';
      
      if (randomResponse === 'success') {
        if (checkInterval) {
          clearInterval(checkInterval);
          setCheckInterval(null);
        }
        
        statusElement.className = 'success';
        statusElement.textContent = 'Оплата прошла успешно! Перенаправление на сайт...';
        
        // Set payment as complete and load the content
        setIsPaid(true);
        setTimeout(() => {
          loadApiContent();
        }, 2000); // Wait 2 seconds before loading content
      } else if (randomResponse === 'rejected') {
        if (checkInterval) {
          clearInterval(checkInterval);
          setCheckInterval(null);
        }
        
        statusElement.className = 'error';
        statusElement.textContent = 'Оплата не прошла. Пожалуйста, попробуйте еще раз.';
      } else {
        statusElement.className = 'pending';
        statusElement.textContent = 'Ожидание оплаты...';
      }
    }
  };

  // Load the actual API content after payment
  const loadApiContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get the path after /api/ and the query parameters
      const path = location.pathname.replace(/^\/api\//, '');
      // Use the base URL without revealing it to end-users
      const targetUrl = `https://api.bhcesh.me/${path}${location.search}`;
      
      console.log(`Processing API request...`);
      
      // Make request to the target API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      // Get the data from the response
      const contentType = response.headers.get('content-type');
      const textResponse = await response.text();
      
      // Check if it's JSON
      const isJson = contentType && contentType.includes('application/json');
      const looksLikeJson = textResponse.trim().startsWith('{') || textResponse.trim().startsWith('[');
      
      let data;
      if (isJson || looksLikeJson) {
        try {
          data = JSON.parse(textResponse);
        } catch (e) {
          throw new Error("Invalid JSON response from API");
        }
      } else {
        data = { data: textResponse, type: 'text' };
      }
      
      // Render the data as a website
      renderMovieWebsite(data);
      
    } catch (err: any) {
      console.error('API proxy error:', err);
      renderErrorPage(err.message || 'API proxy error');
      setError(err.message || 'API proxy error');
    } finally {
      setIsLoading(false);
    }
  };

  // Render a website displaying movie results
  const renderMovieWebsite = (data: any) => {
    // Clear document content
    document.documentElement.innerHTML = '';
    
    // Create a new HTML structure
    const html = document.createElement('html');
    html.lang = 'ru';
    
    // Create head
    const head = document.createElement('head');
    
    // Meta tags
    const meta1 = document.createElement('meta');
    meta1.charset = 'UTF-8';
    const meta2 = document.createElement('meta');
    meta2.name = 'viewport';
    meta2.content = 'width=device-width, initial-scale=1.0';
    
    // Title
    const title = document.createElement('title');
    title.textContent = 'EvloevFilm - Результаты поиска';
    
    // CSS styles
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      header {
        background-color: #1a1a2e;
        color: white;
        padding: 15px 0;
        text-align: center;
      }
      h1 {
        margin: 0;
      }
      .movie-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      .movie-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: transform 0.3s;
      }
      .movie-card:hover {
        transform: translateY(-5px);
      }
      .movie-poster {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }
      .movie-info {
        padding: 12px;
      }
      .movie-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 6px;
      }
      .movie-rating {
        color: #ff9800;
        font-weight: bold;
      }
      .movie-year {
        color: #666;
        font-size: 14px;
      }
      .pagination {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        gap: 10px;
      }
      .pagination button {
        padding: 8px 15px;
        background: #1a1a2e;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .pagination button:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      .no-results {
        text-align: center;
        margin-top: 50px;
        color: #666;
      }
    `;
    
    // Append elements to head
    head.appendChild(meta1);
    head.appendChild(meta2);
    head.appendChild(title);
    head.appendChild(style);
    html.appendChild(head);
    
    // Create body
    const body = document.createElement('body');
    
    // Header
    const header = document.createElement('header');
    const headerTitle = document.createElement('h1');
    headerTitle.textContent = 'EvloevFilm';
    header.appendChild(headerTitle);
    body.appendChild(header);
    
    // Container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Process the data
    if (data && data.docs && Array.isArray(data.docs)) {
      // Movies found
      const h2 = document.createElement('h2');
      h2.textContent = `Найдено фильмов: ${data.total || data.docs.length}`;
      container.appendChild(h2);
      
      // Movie grid
      const movieGrid = document.createElement('div');
      movieGrid.className = 'movie-grid';
      
      // Create a card for each movie
      data.docs.forEach((movie: any) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        // Movie poster
        const poster = document.createElement('img');
        poster.className = 'movie-poster';
        poster.src = movie.poster?.url || movie.poster?.previewUrl || 'https://via.placeholder.com/300x450?text=Нет+изображения';
        poster.alt = movie.name || 'Movie poster';
        card.appendChild(poster);
        
        // Movie info
        const info = document.createElement('div');
        info.className = 'movie-info';
        
        const title = document.createElement('div');
        title.className = 'movie-title';
        title.textContent = movie.name || movie.alternativeName || 'Без названия';
        info.appendChild(title);
        
        if (movie.rating && movie.rating.kp) {
          const rating = document.createElement('div');
          rating.className = 'movie-rating';
          rating.textContent = `Рейтинг: ${movie.rating.kp.toFixed(1)}`;
          info.appendChild(rating);
        }
        
        if (movie.year) {
          const year = document.createElement('div');
          year.className = 'movie-year';
          year.textContent = `Год: ${movie.year}`;
          info.appendChild(year);
        }
        
        card.appendChild(info);
        movieGrid.appendChild(card);
      });
      
      container.appendChild(movieGrid);
      
      // Pagination if available
      if (data.pages && data.pages > 1) {
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Предыдущая';
        prevButton.disabled = data.page <= 1;
        
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Следующая';
        nextButton.disabled = data.page >= data.pages;
        
        pagination.appendChild(prevButton);
        pagination.appendChild(nextButton);
        container.appendChild(pagination);
      }
    } else {
      // No results or different data format
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.textContent = 'Не найдено подходящих результатов.';
      container.appendChild(noResults);
    }
    
    body.appendChild(container);
    html.appendChild(body);
    
    // Replace document
    document.replaceChild(html, document.documentElement);
  };

  // Render error page
  const renderErrorPage = (message: string) => {
    // Clear document content
    document.documentElement.innerHTML = '';
    
    // Create a new HTML structure
    const html = document.createElement('html');
    html.lang = 'ru';
    
    // Create head
    const head = document.createElement('head');
    
    // Meta tags
    const meta1 = document.createElement('meta');
    meta1.charset = 'UTF-8';
    const meta2 = document.createElement('meta');
    meta2.name = 'viewport';
    meta2.content = 'width=device-width, initial-scale=1.0';
    
    // Title
    const title = document.createElement('title');
    title.textContent = 'EvloevFilm - Ошибка';
    
    // CSS styles
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
      }
      .error-container {
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 15px rgba(0,0,0,0.1);
        max-width: 500px;
      }
      h1 {
        color: #e74c3c;
        margin-bottom: 20px;
      }
      p {
        color: #555;
        margin-bottom: 25px;
      }
      button {
        padding: 10px 20px;
        background: #1a1a2e;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `;
    
    // Append elements to head
    head.appendChild(meta1);
    head.appendChild(meta2);
    head.appendChild(title);
    head.appendChild(style);
    html.appendChild(head);
    
    // Create body
    const body = document.createElement('body');
    
    // Error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    
    const h1 = document.createElement('h1');
    h1.textContent = 'Ошибка';
    errorContainer.appendChild(h1);
    
    const p = document.createElement('p');
    p.textContent = message;
    errorContainer.appendChild(p);
    
    const button = document.createElement('button');
    button.textContent = 'Вернуться на главную';
    button.onclick = () => window.location.href = '/';
    errorContainer.appendChild(button);
    
    body.appendChild(errorContainer);
    html.appendChild(body);
    
    // Replace document
    document.replaceChild(html, document.documentElement);
  };

  // When component mounts, show payment page instead of immediately loading API content
  useEffect(() => {
    // Create payment page
    document.documentElement.innerHTML = '';
    
    // Create a new HTML structure
    const html = document.createElement('html');
    html.lang = 'ru';
    
    // Create head
    const head = document.createElement('head');
    
    // Meta tags
    const meta1 = document.createElement('meta');
    meta1.charset = 'UTF-8';
    const meta2 = document.createElement('meta');
    meta2.name = 'viewport';
    meta2.content = 'width=device-width, initial-scale=1.0';
    
    // Title
    const title = document.createElement('title');
    title.textContent = 'Оплата VPN';
    
    // CSS styles
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }
      .payment-form {
        margin: 30px 0;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
      button {
        background-color: #FFDB4D;
        color: #000;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
      }
      button:hover {
        background-color: #f0cc3d;
      }
      #payment-status {
        margin: 20px 0;
        padding: 15px;
        border-radius: 4px;
        display: none;
      }
      .success {
        background-color: #d4edda;
        color: #155724;
      }
      .pending {
        background-color: #fff3cd;
        color: #856404;
      }
      .error {
        background-color: #f8d7da;
        color: #721c24;
      }
    `;
    
    // Append elements to head
    head.appendChild(meta1);
    head.appendChild(meta2);
    head.appendChild(title);
    head.appendChild(style);
    html.appendChild(head);
    
    // Create body
    const body = document.createElement('body');
    
    // Page content
    const h1 = document.createElement('h1');
    h1.textContent = 'Оплата VPN';
    body.appendChild(h1);
    
    const paymentForm = document.createElement('div');
    paymentForm.className = 'payment-form';
    
    const p = document.createElement('p');
    p.innerHTML = 'Сумма к оплате: <strong>2 руб.</strong>';
    paymentForm.appendChild(p);
    
    const button = document.createElement('button');
    button.id = 'payment-button';
    button.textContent = 'Перейти к оплате';
    paymentForm.appendChild(button);
    
    body.appendChild(paymentForm);
    
    const statusDiv = document.createElement('div');
    statusDiv.id = 'payment-status';
    body.appendChild(statusDiv);
    
    html.appendChild(body);
    
    // Replace document
    document.replaceChild(html, document.documentElement);
    
    // Add event listener to payment button
    document.getElementById('payment-button')?.addEventListener('click', handlePaymentClick);
    
    // Cleanup on unmount
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, []);

  // This component doesn't render anything in the React way
  // It directly manipulates the DOM
  return null;
};

export default ApiProxy;
