# Cloud Deployment Guide

This guide covers deploying the HRM Backend to various cloud platforms with automatic database setup.

## Prerequisites

- Git repository with your code
- Database service (PostgreSQL)
- Environment variables configured

## Platform-Specific Deployment

### 1. Heroku

#### Setup

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-hrm-app

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set RUN_MIGRATIONS=true
heroku config:set RUN_SEEDS=true
heroku config:set JWT_SECRET=your-secure-secret
heroku config:set FRONTEND_URL=https://your-frontend.herokuapp.com
```

#### Deploy

```bash
# Deploy to Heroku
git push heroku main

# Run migrations and seeds
heroku run npm run db:setup
```

### 2. Railway

#### Setup

1. Connect your GitHub repository
2. Add PostgreSQL service
3. Set environment variables in Railway dashboard:
   ```
   NODE_ENV=production
   RUN_MIGRATIONS=true
   RUN_SEEDS=true
   JWT_SECRET=your-secure-secret
   FRONTEND_URL=https://your-frontend.railway.app
   ```

#### Deploy

- Railway automatically deploys on git push
- Migrations and seeds run automatically on startup

### 3. Render

#### Setup

1. Connect your GitHub repository
2. Create a new Web Service
3. Set build command: `npm install && npm run build`
4. Set start command: `npm run start:prod`
5. Add PostgreSQL service
6. Set environment variables in Render dashboard

#### Environment Variables

```
NODE_ENV=production
RUN_MIGRATIONS=true
RUN_SEEDS=true
JWT_SECRET=your-secure-secret
FRONTEND_URL=https://your-frontend.onrender.com
```

### 4. AWS (EC2)

#### Setup

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js and PostgreSQL
sudo apt update
sudo apt install nodejs npm postgresql postgresql-contrib

# Clone your repository
git clone your-repo-url
cd hrm-backend

# Install dependencies
npm install

# Create .env file
cp env.example .env
# Edit .env with your database credentials
```

#### Deploy

```bash
# Build the application
npm run build

# Run deployment script
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### 5. DigitalOcean App Platform

#### Setup

1. Connect your GitHub repository
2. Create a new App
3. Add PostgreSQL database
4. Set environment variables in App Platform dashboard

#### Environment Variables

```
NODE_ENV=production
RUN_MIGRATIONS=true
RUN_SEEDS=true
JWT_SECRET=your-secure-secret
FRONTEND_URL=https://your-frontend.ondigitalocean.app
```

### 6. Google Cloud Platform

#### Setup with Cloud Run

```bash
# Install gcloud CLI
# Authenticate
gcloud auth login

# Set project
gcloud config set project your-project-id

# Build and deploy
gcloud run deploy hrm-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,RUN_MIGRATIONS=true,RUN_SEEDS=true
```

### 7. Azure

#### Setup with App Service

```bash
# Install Azure CLI
# Login to Azure
az login

# Create resource group
az group create --name hrm-rg --location eastus

# Create App Service plan
az appservice plan create --name hrm-plan --resource-group hrm-rg --sku B1

# Create web app
az webapp create --name hrm-backend --resource-group hrm-rg --plan hrm-plan --runtime "NODE|18-lts"

# Deploy
az webapp deployment source config --name hrm-backend --resource-group hrm-rg --repo-url your-repo-url --branch main
```

## Environment Variables Reference

### Required Variables

```env
# Database
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_DATABASE=your-db-name

# Application
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-frontend-domain.com

# Security
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRES_IN=24h
```

### Optional Variables

```env
# Database Setup
RUN_MIGRATIONS=true          # Run migrations on startup
RUN_SEEDS=true              # Run seeds on startup
WAIT_FOR_DB=true           # Wait for database to be ready

# SSL Configuration
SSL_REQUIRED=true
SSL_REJECT_UNAUTHORIZED=false
```

## Database Setup

### Cloud Database Services

#### 1. Heroku Postgres

- Automatically configured when you add the addon
- Environment variables are automatically set

#### 2. Railway Postgres

- Automatically configured when you add the service
- Connection string available in Railway dashboard

#### 3. Render Postgres

- Create PostgreSQL service in Render dashboard
- Connection details available in service settings

#### 4. AWS RDS

```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier hrm-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password your-password \
  --allocated-storage 20
```

#### 5. Google Cloud SQL

```bash
# Create Cloud SQL instance
gcloud sql instances create hrm-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1
```

## Monitoring and Health Checks

### Health Check Endpoint

```
GET /health
```

### Monitoring Setup

#### 1. Application Monitoring

- Set up logging to stdout/stderr
- Use platform-specific monitoring (Heroku logs, Railway logs, etc.)

#### 2. Database Monitoring

- Monitor database connections
- Set up alerts for high CPU/memory usage

#### 3. Custom Health Checks

```bash
# Test health endpoint
curl https://your-app.herokuapp.com/health

# Expected response
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed

- Check environment variables
- Verify database is running
- Check network connectivity
- Verify SSL configuration

#### 2. Migrations Failed

- Check database permissions
- Verify migration files
- Check for conflicting migrations

#### 3. Seeds Failed

- Ensure migrations completed first
- Check foreign key relationships
- Verify seed file syntax

#### 4. Application Won't Start

- Check environment variables
- Verify port configuration
- Check application logs

### Debug Commands

```bash
# Check environment variables
heroku config

# View application logs
heroku logs --tail

# Run database commands
heroku run npm run db:migrate
heroku run npm run db:seed

# SSH into container (if supported)
heroku run bash
```

## Security Best Practices

1. **Environment Variables**
   - Never commit secrets to git
   - Use platform-specific secret management
   - Rotate secrets regularly

2. **Database Security**
   - Use SSL connections
   - Restrict database access
   - Use strong passwords

3. **Application Security**
   - Enable CORS properly
   - Use HTTPS in production
   - Implement rate limiting

4. **Monitoring**
   - Set up alerts for errors
   - Monitor resource usage
   - Log security events
