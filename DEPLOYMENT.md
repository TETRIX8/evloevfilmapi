# 🚀 Deployment Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build and Start
```bash
# Development
npm run dev:server

# Production
npm run start

# Or use the script
./start.sh
```

## Production Deployment

### Using PM2 (Recommended)

1. **Install PM2 globally**
```bash
npm install -g pm2
```

2. **Build the application**
```bash
npm run build
```

3. **Start with PM2**
```bash
npm run pm2:start
```

4. **Monitor the application**
```bash
npm run pm2:monit
```

### PM2 Commands

```bash
# Start the application
npm run pm2:start

# Stop the application
npm run pm2:stop

# Restart the application
npm run pm2:restart

# View logs
npm run pm2:logs

# Monitor processes
npm run pm2:monit

# Delete the application
npm run pm2:delete
```

### Using Docker

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "server"]
```

2. **Build and run**
```bash
docker build -t evloevfilm-api-proxy .
docker run -p 3001:3001 evloevfilm-api-proxy
```

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=production
PORT=3001
```

## Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL Configuration

### Using Let's Encrypt

1. **Install Certbot**
```bash
sudo apt install certbot python3-certbot-nginx
```

2. **Get SSL certificate**
```bash
sudo certbot --nginx -d your-domain.com
```

3. **Auto-renewal**
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring

### Health Check
```bash
curl http://localhost:3001/health
```

### API Test
```bash
curl "http://localhost:3001/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&limit=1"
```

## Troubleshooting

### Common Issues

1. **Port already in use**
```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>
```

2. **Permission denied**
```bash
# Make start script executable
chmod +x start.sh
```

3. **Build errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Logs

- **PM2 logs**: `npm run pm2:logs`
- **Application logs**: `./logs/combined.log`
- **Error logs**: `./logs/err.log`
- **Output logs**: `./logs/out.log`

## Performance Optimization

### Server Configuration

1. **Increase file descriptor limit**
```bash
ulimit -n 65536
```

2. **Enable gzip compression**
```bash
npm install compression
```

3. **Add to server.js**
```javascript
import compression from 'compression';
app.use(compression());
```

### Caching

1. **Add Redis for caching**
```bash
npm install redis
```

2. **Configure caching in server.js**
```javascript
import Redis from 'redis';
const redis = Redis.createClient();

// Cache API responses
app.all('/api/*', async (req, res) => {
  const cacheKey = `api:${req.url}`;
  
  // Try to get from cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  // ... existing code ...
  
  // Cache the response
  await redis.setex(cacheKey, 300, JSON.stringify(data));
});
```

## Security

### Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### Helmet for Security Headers

```bash
npm install helmet
```

```javascript
import helmet from 'helmet';
app.use(helmet());
```

## Backup

### Database Backup (if using)
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
mkdir -p $BACKUP_DIR

# Backup database
pg_dump your_database > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

## Updates

### Update Process

1. **Pull latest changes**
```bash
git pull origin main
```

2. **Install dependencies**
```bash
npm install
```

3. **Build application**
```bash
npm run build
```

4. **Restart application**
```bash
npm run pm2:restart
```

### Rollback

```bash
# Revert to previous version
git reset --hard HEAD~1

# Rebuild and restart
npm run build
npm run pm2:restart
``` 