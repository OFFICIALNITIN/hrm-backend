#!/bin/bash

# HRM Backend Deployment Script
# This script handles database setup and application deployment

set -e

echo "🚀 Starting HRM Backend deployment..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Set default values
NODE_ENV=${NODE_ENV:-production}
RUN_MIGRATIONS=${RUN_MIGRATIONS:-true}
RUN_SEEDS=${RUN_SEEDS:-true}

echo "📋 Environment Configuration:"
echo "  NODE_ENV: $NODE_ENV"
echo "  RUN_MIGRATIONS: $RUN_MIGRATIONS"
echo "  RUN_SEEDS: $RUN_SEEDS"

# Build the application
echo "🔨 Building application..."
npm run build

# Database setup
echo "🗄️  Setting up database..."

# Wait for database to be ready (useful for containerized deployments)
if [ "$WAIT_FOR_DB" = "true" ]; then
    echo "⏳ Waiting for database to be ready..."
    until npx sequelize-cli db:version > /dev/null 2>&1; do
        echo "Database not ready, waiting..."
        sleep 5
    done
    echo "✅ Database is ready!"
fi

# Run migrations
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "🔄 Running database migrations..."
    npx sequelize-cli db:migrate
    echo "✅ Migrations completed"
else
    echo "⏭️  Skipping migrations"
fi

# Run seeds
if [ "$RUN_SEEDS" = "true" ]; then
    echo "🌱 Running database seeds..."
    npx sequelize-cli db:seed:all
    echo "✅ Seeds completed"
else
    echo "⏭️  Skipping seeds"
fi

# Start the application
echo "🚀 Starting application..."
if [ "$NODE_ENV" = "production" ]; then
    npm run start:prod
else
    npm run start
fi 