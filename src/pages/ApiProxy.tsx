
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ApiProxy = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load the actual API content immediately
  const loadApiContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get the path after /api/ and the query parameters
      const path = location.pathname.replace(/^\/api\//, '');
      // Use the same origin for API calls (works with Vercel)
      const targetUrl = `${window.location.origin}/api/${path}${location.search}`;
      
      console.log(`Processing API request to: ${targetUrl}`);
      
      // Make request to the API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'User-Agent': 'EvloevFilm-API-Proxy/1.0',
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
    meta1.setAttribute('charset', 'UTF-8');
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
      .loading {
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
    meta1.setAttribute('charset', 'UTF-8');
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

  // When component mounts, immediately load API content
  useEffect(() => {
    loadApiContent();
  }, [location.pathname, location.search]);

  // This component doesn't render anything in the React way
  // It directly manipulates the DOM
  return null;
};

export default ApiProxy;
