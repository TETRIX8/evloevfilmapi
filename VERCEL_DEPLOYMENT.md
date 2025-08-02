# 🚀 Vercel Deployment Guide

## Quick Deploy

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy to Vercel
```bash
vercel
```

### 3. Follow the prompts
- Link to existing project or create new
- Set project name (e.g., `evloevfilm-api-proxy`)
- Confirm deployment

## Manual Deployment

### 1. Build the project
```bash
npm install
npm run build
```

### 2. Deploy
```bash
vercel --prod
```

## Project Structure for Vercel

```
evloevfilmapi/
├── api/                    # Vercel API routes
│   ├── index.js           # Main API handler
│   └── [...path].js       # Catch-all route
├── src/                    # React source
├── dist/                   # Built React app
├── server.js              # Express server
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies
```

## Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.js"
    },
    {
      "src": "/health",
      "dest": "/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

## Environment Variables

Set these in Vercel dashboard:

```env
NODE_ENV=production
```

## API Endpoints

### Health Check
```
GET /health
```

### API Proxy
```
GET /api/*
POST /api/*
PUT /api/*
DELETE /api/*
```

## Testing

### Local Testing
```bash
# Install Vercel CLI
npm i -g vercel

# Run locally
vercel dev

# Test API
curl http://localhost:3000/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&limit=1
```

### Production Testing
```bash
# Deploy
vercel --prod

# Test health check
curl https://your-project.vercel.app/health

# Test API
curl "https://your-project.vercel.app/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&limit=1"
```

## Troubleshooting

### Common Issues

1. **Build fails**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

2. **API not working**
- Check Vercel function logs
- Verify API routes are correct
- Test locally first

3. **Static files not serving**
- Ensure `dist` directory exists
- Check `vercel.json` routes
- Verify build completed successfully

### Debug Commands

```bash
# View function logs
vercel logs

# View deployment info
vercel ls

# Remove deployment
vercel remove
```

## Performance Optimization

### Vercel Settings

1. **Function timeout**: 30 seconds (max)
2. **Memory**: 1024MB (default)
3. **Regions**: Auto (or specify)

### Caching

Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=300"
        }
      ]
    }
  ]
}
```

## Monitoring

### Vercel Analytics
- Enable in dashboard
- View performance metrics
- Monitor API usage

### Logs
```bash
# View real-time logs
vercel logs --follow

# View specific function
vercel logs api/index.js
```

## Custom Domain

1. **Add domain in Vercel dashboard**
2. **Configure DNS records**
3. **Wait for propagation**

## SSL/HTTPS
- Automatic with Vercel
- No additional configuration needed

## Scaling
- Automatic scaling
- Serverless functions
- Global CDN

## Cost Optimization

### Free Tier Limits
- 100GB bandwidth/month
- 1000 serverless function invocations/day
- 100GB storage

### Paid Plans
- Pro: $20/month
- Enterprise: Custom pricing

## Security

### Environment Variables
- Set sensitive data in Vercel dashboard
- Never commit secrets to git

### CORS
- Configured for all origins
- Can be restricted if needed

### Rate Limiting
- Consider implementing rate limiting
- Monitor usage in dashboard

## Updates

### Deploy Updates
```bash
# Pull latest changes
git pull origin main

# Deploy
vercel --prod
```

### Rollback
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback <deployment-id>
```

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Community**: https://github.com/vercel/vercel/discussions
- **Status**: https://vercel-status.com 