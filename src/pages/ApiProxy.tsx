
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ApiProxy = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const proxyRequest = async () => {
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
        
        // Get response data
        const contentType = response.headers.get('content-type');
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        // Get the raw text response
        const textResponse = await response.text();
        
        // Check if the response is JSON (either by content-type or by looking at the content)
        const isJson = contentType && contentType.includes('application/json');
        const looksLikeJson = textResponse.trim().startsWith('{') || textResponse.trim().startsWith('[');
        
        let responseData = textResponse;
        let jsonData = null;
        
        if (isJson || looksLikeJson) {
          try {
            // Try to parse as JSON to validate it
            jsonData = JSON.parse(textResponse);
            responseData = textResponse;
          } catch (e) {
            responseData = JSON.stringify({ error: true, message: "Invalid JSON response from API" });
            jsonData = { error: true, message: "Invalid JSON response from API" };
          }
        } else {
          // Not JSON, convert to JSON format
          responseData = JSON.stringify({ data: textResponse, type: 'text' });
          jsonData = { data: textResponse, type: 'text' };
        }
        
        // Clear the current document and create a formatted HTML response
        document.documentElement.innerHTML = '';
        
        // Create the new HTML structure
        const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>EvloevFilm API - Результаты</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              max-width: 1200px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9fafb;
              color: #1f2937;
            }
            header {
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 1px solid #e5e7eb;
            }
            h1 {
              margin-top: 0;
              font-size: 24px;
              font-weight: 700;
            }
            .content {
              background-color: white;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .movie-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 20px;
            }
            .movie-card {
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              background-color: white;
              transition: transform 0.2s;
            }
            .movie-card:hover {
              transform: translateY(-4px);
            }
            .movie-poster {
              width: 100%;
              aspect-ratio: 2/3;
              object-fit: cover;
              background-color: #e5e7eb;
            }
            .movie-info {
              padding: 12px;
            }
            .movie-title {
              font-weight: 600;
              margin: 0 0 8px 0;
              font-size: 16px;
            }
            .movie-meta {
              color: #6b7280;
              font-size: 14px;
            }
            .tag {
              display: inline-block;
              padding: 2px 8px;
              border-radius: 9999px;
              font-size: 12px;
              margin-right: 4px;
              margin-bottom: 4px;
              background-color: #e5e7eb;
              color: #4b5563;
            }
            .rating {
              display: inline-block;
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
              margin-right: 8px;
            }
            .imdb {
              background-color: #fef3c7;
              color: #92400e;
            }
            .kp {
              background-color: #fee2e2;
              color: #b91c1c;
            }
            pre {
              background-color: #f3f4f6;
              padding: 16px;
              border-radius: 8px;
              overflow: auto;
              font-size: 14px;
            }
            .error {
              background-color: #fee2e2;
              border: 1px solid #fecaca;
              color: #b91c1c;
              padding: 16px;
              border-radius: 8px;
            }
            .pagination {
              display: flex;
              justify-content: center;
              margin-top: 20px;
            }
            .pagination a {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-width: 36px;
              height: 36px;
              margin: 0 4px;
              padding: 0 8px;
              border-radius: 6px;
              font-size: 14px;
              text-decoration: none;
              background-color: white;
              color: #4b5563;
              border: 1px solid #e5e7eb;
            }
            .pagination a:hover {
              background-color: #f3f4f6;
            }
            .pagination a.active {
              background-color: #3b82f6;
              color: white;
              border-color: #3b82f6;
            }
          </style>
        </head>
        <body>
          <header>
            <h1>EvloevFilm API - Результаты</h1>
          </header>
          <div class="content" id="content">
            <!-- Content will be injected here -->
          </div>
        </body>
        </html>
        `;
        
        document.open();
        document.write(htmlTemplate);
        document.close();
        
        const contentElement = document.getElementById('content');
        
        // Handle error responses
        if (jsonData && jsonData.error) {
          if (contentElement) {
            contentElement.innerHTML = `
              <div class="error">
                <h2>Ошибка</h2>
                <p>${jsonData.message || 'Неизвестная ошибка'}</p>
              </div>
            `;
          }
          return;
        }
        
        // If results are available, display them
        if (jsonData && jsonData.results && Array.isArray(jsonData.results)) {
          let resultsHtml = `
            <h2>Найдено фильмов: ${jsonData.total || jsonData.results.length}</h2>
            <div class="movie-grid">
          `;
          
          jsonData.results.forEach((movie: any) => {
            const posterUrl = movie.poster || '';
            const genres = movie.genre && typeof movie.genre === 'object' 
              ? Object.values(movie.genre).map((g: any) => `<span class="tag">${g}</span>`).join('') 
              : '';
            
            resultsHtml += `
              <div class="movie-card">
                <img class="movie-poster" src="${posterUrl}" alt="${movie.name || 'Movie poster'}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\' viewBox=\\'0 0 100 150\\'%3E%3Crect width=\\'100%\\' height=\\'100%\\' fill=\\'%23e5e7eb\\' /%3E%3Ctext x=\\'50%\\' y=\\'50%\\' font-family=\\'sans-serif\\' font-size=\\'12\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\' fill=\\'%236b7280\\'%3EНет изображения%3C/text%3E%3C/svg%3E'">
                <div class="movie-info">
                  <h3 class="movie-title">${movie.name || 'Без названия'}</h3>
                  ${movie.origin_name ? `<div class="movie-meta">${movie.origin_name}</div>` : ''}
                  <div class="movie-meta">
                    ${movie.year ? movie.year + ' · ' : ''}
                    ${movie.type ? (movie.type === 'film' ? 'Фильм' : movie.type === 'serial' ? 'Сериал' : movie.type) : ''}
                  </div>
                  <div class="genres">
                    ${genres}
                  </div>
                  <div style="margin-top: 8px;">
                    ${movie.imdb ? `<span class="rating imdb">IMDb: ${movie.imdb}</span>` : ''}
                    ${movie.kinopoisk ? `<span class="rating kp">КП: ${movie.kinopoisk}</span>` : ''}
                  </div>
                </div>
              </div>
            `;
          });
          
          resultsHtml += `</div>`;
          
          // Add pagination if available
          if (jsonData.page && jsonData.total_pages) {
            resultsHtml += `<div class="pagination">`;
            
            const currentPage = parseInt(jsonData.page);
            const totalPages = parseInt(jsonData.total_pages);
            
            // Previous page
            if (currentPage > 1) {
              const prevUrl = location.pathname + location.search.replace(/page=\d+/, `page=${currentPage - 1}`);
              resultsHtml += `<a href="${prevUrl}">Назад</a>`;
            }
            
            // Page numbers
            for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
              const pageUrl = location.pathname + location.search.replace(/page=\d+/, `page=${i}`);
              resultsHtml += `<a href="${pageUrl}" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
            }
            
            // Next page
            if (currentPage < totalPages) {
              const nextUrl = location.pathname + location.search.replace(/page=\d+/, `page=${currentPage + 1}`);
              resultsHtml += `<a href="${nextUrl}">Вперед</a>`;
            }
            
            resultsHtml += `</div>`;
          }
          
          if (contentElement) {
            contentElement.innerHTML = resultsHtml;
          }
        } else {
          // Display raw JSON data if no results array
          if (contentElement) {
            contentElement.innerHTML = `
              <h2>Ответ от API</h2>
              <pre>${JSON.stringify(jsonData, null, 2)}</pre>
            `;
          }
        }
        
      } catch (err: any) {
        console.error('API proxy error:', err);
        
        // Create error HTML page
        document.documentElement.innerHTML = '';
        document.open();
        document.write(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>EvloevFilm API - Ошибка</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9fafb;
              color: #1f2937;
            }
            .error-container {
              background-color: white;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              margin-top: 40px;
            }
            h1 {
              margin-top: 0;
              color: #b91c1c;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1>Ошибка при обработке запроса</h1>
            <p>${err.message || 'Неизвестная ошибка'}</p>
            <p>Пожалуйста, проверьте параметры запроса и повторите попытку.</p>
          </div>
        </body>
        </html>
        `);
        document.close();
        
        setError(err.message || 'API proxy error');
      } finally {
        setIsLoading(false);
      }
    };

    proxyRequest();
  }, [location.pathname, location.search]);

  // This is just a fallback - the API should return HTML directly
  return null;
};

export default ApiProxy;
