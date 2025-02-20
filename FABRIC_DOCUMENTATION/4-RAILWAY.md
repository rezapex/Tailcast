 ~/Fabric │ main ⇡1 !1  railway status                                                                                                       ✔ 
Project: fabric-api
Environment: production
Service: fabric-api
 ~/Fabric │ main ⇡1 !1  railway variables                                                                                                    ✔ 
╔══════════════════════════ Variables for fabric-api ══════════════════════════╗
║ DEFAULT_MODEL                            │ gemini-2.0-flash-exp              ║
║──────────────────────────────────────────────────────────────────────────────║
║ DEFAULT_MODEL_CONTEXT_LENGTH             │ 128K                              ║
║──────────────────────────────────────────────────────────────────────────────║
║ DEFAULT_VENDOR                           │ OpenRouter                        ║
║──────────────────────────────────────────────────────────────────────────────║
║ JINA_AI_API_KEY                          │ jina_57                           ║
║──────────────────────────────────────────────────────────────────────────────║
║ OPENROUTER_API_BASE_URL                  │ https://openrouter.ai/api/v1      ║
║──────────────────────────────────────────────────────────────────────────────║
║ OPENROUTER_API_KEY                       │ sk-or-v1-                         ║
║                                          │ 3253f9028735b3402e2a0092cacf007d9 ║
║                                          │ 4ae6f8be6750d00cd39abcf65a2c466   ║
║──────────────────────────────────────────────────────────────────────────────║
║ PATTERNS_LOADER_GIT_REPO_PATTERNS_FOLDER │ patterns                          ║
║──────────────────────────────────────────────────────────────────────────────║
║ PATTERNS_LOADER_GIT_REPO_URL             │ https://github.com/               ║
║                                          │ danielmiessler/fabric.git         ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_ENVIRONMENT                      │ production                        ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_ENVIRONMENT_ID                   │ d7f2001f-6ca2-4512-902b-          ║
║                                          │ 3dd989e14f54                      ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_ENVIRONMENT_NAME                 │ production                        ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_PRIVATE_DOMAIN                   │ fabric-api.railway.internal       ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_PROJECT_ID                       │ 6cfc2860-eeda-49cc-a68e-          ║
║                                          │ 8fa4ac713bb7                      ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_PROJECT_NAME                     │ fabric-api                        ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_PUBLIC_DOMAIN                    │ fabric-api-                       ║
║                                          │ production.up.railway.app         ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_SERVICE_FABRIC_API_URL           │ fabric-api-                       ║
║                                          │ production.up.railway.app         ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_SERVICE_ID                       │ d37b98e0-82f5-4b78-95ff-          ║
║                                          │ 6d3f73470268                      ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_SERVICE_NAME                     │ fabric-api                        ║
║──────────────────────────────────────────────────────────────────────────────║
║ RAILWAY_STATIC_URL                       │ fabric-api-                       ║
║                                          │ production.up.railway.app         ║
║──────────────────────────────────────────────────────────────────────────────║
║ YOUTUBE_API_KEY                          │ AIzaSyAKdQU3ZjhmHUcuvtf759MtMS01F ║
║                                          │ kMwD8M                            ║
╚═════════════════════════════════════════════════════════════════════════════

# Fabric API Deployment Guide

## Railway Deployment

### Prerequisites

1. Railway CLI installed

```bash
brew install railway
```

2. Railway account and logged in

```bash
railway login
```

### Initial Setup

1. Initialize Railway project

```bash
railway init
```

2. Link your project

```bash
railway link
```

### Environment Variables

Required environment variables for the service:

```bash
# Core Configuration
DEFAULT_VENDOR=OpenRouter
DEFAULT_MODEL=gemini-2.0-flash-exp
DEFAULT_MODEL_CONTEXT_LENGTH=128K

# Pattern Loading
PATTERNS_LOADER_GIT_REPO_URL=https://github.com/danielmiessler/fabric.git
PATTERNS_LOADER_GIT_REPO_PATTERNS_FOLDER=patterns

# API Keys
OPENROUTER_API_KEY=your-key-here
OPENROUTER_API_BASE_URL=https://openrouter.ai/api/v1
```

Set variables using:

```bash
railway variables --set "KEY=VALUE"
```

### Deployment

1. Deploy the application:

```bash
railway up
```

2. Get the deployment URL:

```bash
railway domain
```

### Monitoring

1. View logs:

```bash
railway logs
```

2. Check service status:

```bash
railway status
```

### Maintenance

1. Redeploy service:

```bash
railway up
```

2. Update environment variables:

```bash
railway variables --set "KEY=NEW_VALUE"
```

## Docker Configuration

### Dockerfile

The service uses a multi-stage build:

1. Builder stage: Golang build environment
2. Final stage: Alpine Linux runtime

Key configurations:

- Go version: 1.23.3-alpine
- Exposed port: 8080
- Health check endpoint: /health

### Docker Compose

Development environment setup:

```yaml
version: '3.8'
services:
  fabric-api:
    build: .
    ports:
      - "8080:8080"
    volumes:
      - ./ENV:/root/.config/fabric/.env:ro
    environment:
      - GIN_MODE=release
```

## File Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── railway.toml          # Railway configuration
├── .railwayignore       # Railway deployment ignore patterns
├── restapi/             # API implementation
│   ├── serve.go         # Main server setup
│   ├── chat.go         # Chat endpoint
│   └── ...
└── ENV                  # Environment variables template
```

## Troubleshooting

### Common Issues

1. Deployment Fails

- Check Railway logs: `railway logs`
- Verify environment variables
- Ensure Docker build succeeds locally

2. API Key Issues

- Verify environment variables are set
- Check API key permissions
- Confirm vendor service status

3. Large File Upload Issues

- Check .railwayignore configuration
- Remove unnecessary large files
- Compress assets if needed

### Health Checks

The service includes a health check endpoint at `/health` that returns:

- Service status
- Request reference ID
- Timestamp

Monitor using:

```bash
curl https://your-service-url/health
```

## Security Considerations

1. API Keys

- Never commit API keys to version control
- Use Railway environment variables
- Rotate keys periodically

2. CORS Configuration

- Currently allows all origins
- Modify in `serve.go` if restriction needed

3. Rate Limiting

- Implemented through vendor APIs
- Consider adding service-level rate limiting if needed

## Backup and Recovery

1. Environment Variables

- Keep secure backup of all API keys
- Document all configuration values

2. Deployment History

- Railway maintains deployment history
- Can rollback using Railway dashboard

## Updating the Service

1. Code Updates

```bash
git pull origin main
railway up
```

2. Configuration Updates

```bash
railway variables --set "KEY=VALUE"
```

3. Verify Update

```bash
curl https://your-service-url/health
```
