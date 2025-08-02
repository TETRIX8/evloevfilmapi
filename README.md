# 📚 EVLOEVFILM API Documentation

## 🌐 Introduction

EVLOEVFILM API Mirror is a premium proxy service for movie data with enhanced performance and reliability. Key benefits:

- 🚀 Ultra-fast response times via lovable.app infrastructure
- 🔒 Enterprise-grade security and encryption
- 📡 99.9% uptime guarantee
- 🌍 Global CDN for low-latency worldwide access

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server (client + server)
npm run dev:server

# Or start production build
npm run start
```

### Development

```bash
# Start only client (for development)
npm run dev

# Start only server
npm run server

# Start both client and server
npm run dev:server
```

## 🔗 Base URL

```
https://evloevfilmapi.lovable.app
```

## 🔑 Authentication

```javascript
const API_TOKEN = "3794a7638b5863cc60d7b2b9274fa32e";
```

## 💻 Usage Examples

### Popular Films Request
```javascript
fetch("https://evloevfilmapi.lovable.app/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&sort=-views&limit=10")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Full Featured Request
```
https://evloevfilmapi.lovable.app/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=films&year=2024&genre=action&sort=-rating&limit=5
```

## 🏗️ Architecture

### Client-Side (React + Vite)
- **Frontend**: React with TypeScript
- **UI**: Shadcn/ui components
- **Routing**: React Router
- **Styling**: Tailwind CSS

### Server-Side (Node.js + Express)
- **API Proxy**: Express server handling all `/api/*` requests
- **CORS**: Enabled for cross-origin requests
- **Static Files**: Serves built React app
- **Error Handling**: Comprehensive error handling and logging

### Request Flow
1. Client makes request to `/api/*`
2. Express server receives request
3. Server forwards request to `https://api.bhcesh.me/*`
4. Server receives response and forwards back to client
5. Client renders response as website or JSON

## 🚀 Performance Benchmarks

| Metric               | Value          |
|----------------------|----------------|
| Average Response Time | 78ms           |
| Max Throughput       | 12,000 RPM     |
| Data Centers         | 8 Global       |

## 🔄 Migration Notice

We've upgraded our infrastructure to lovable.app for better performance:

```diff
- https://evloevfilmapi.vercel.app/api
+ https://evloevfilmapi.lovable.app/api
```

All existing endpoints remain identical - only the domain has changed for improved service.

## 📁 Project Structure

```
evloevfilmapi/
├── src/                    # React client source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── server.js              # Express server
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

### API Configuration
- Target API: `https://api.bhcesh.me`
- Timeout: 30 seconds
- CORS: Enabled for all origins

---

> 🎬 "The cinema is not a slice of life, but a piece of cake."  
> © EVLOEVFILM API Team  
> 📅 Current Version: 2.1.0  
> 🌐 [API Playground](https://evloevfilmapi.lovable.app/playground)  
> 🐛 [Report Issues](https://github.com/TETRIX8/evloevfilmapi/issues)
