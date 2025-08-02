# 🚀 Deploy to Vercel

## Quick Start

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy
```bash
vercel
```

### 3. Follow prompts
- Link to existing project or create new
- Set project name: `evloevfilm-api-proxy`
- Confirm deployment

## What's Included

✅ **Full-stack application** - React frontend + Express backend  
✅ **API Proxy** - All `/api/*` requests proxied to external API  
✅ **Static hosting** - React app served from `/dist`  
✅ **Serverless functions** - Backend runs on Vercel Edge  
✅ **Automatic HTTPS** - SSL certificates included  
✅ **Global CDN** - Fast worldwide access  

## Project Structure

```
├── api/                    # Vercel API routes
│   ├── index.js           # Main API handler
│   └── [...path].js       # Catch-all route
├── src/                    # React source
├── dist/                   # Built React app
├── server.js              # Express server
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies
```

## API Endpoints

- `GET /health` - Health check
- `GET /api/*` - API proxy
- `POST /api/*` - API proxy
- `PUT /api/*` - API proxy
- `DELETE /api/*` - API proxy

## Testing

### Local Testing
```bash
vercel dev
curl http://localhost:3000/health
```

### Production Testing
```bash
# After deployment
curl https://your-project.vercel.app/health
curl "https://your-project.vercel.app/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&limit=1"
```

## Environment Variables

Set in Vercel dashboard:
```env
NODE_ENV=production
```

## Monitoring

- **Logs**: `vercel logs`
- **Analytics**: Vercel dashboard
- **Performance**: Built-in monitoring

## Updates

```bash
# Deploy updates
vercel --prod

# Rollback
vercel rollback <deployment-id>
```

## Support

- **Documentation**: https://vercel.com/docs
- **Status**: https://vercel-status.com
- **Community**: https://github.com/vercel/vercel/discussions

---

🎉 **Ready to deploy!** Run `vercel` to get started. 