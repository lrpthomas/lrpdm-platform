#!/bin/bash

# LRPDM Platform Deployment Script
# Run this on your VPS to deploy the application

set -e

echo "🚀 Starting LRPDM Platform deployment..."

# Variables
APP_DIR="/var/www/lrpdm-platform"
BACKUP_DIR="/var/backups/lrpdm-platform"
SERVICE_NAME="lrpdm-platform"

# Create backup of current deployment
if [ -d "$APP_DIR" ]; then
    echo "📦 Creating backup..."
    sudo mkdir -p "$BACKUP_DIR"
    sudo cp -r "$APP_DIR" "$BACKUP_DIR/backup-$(date +%Y%m%d_%H%M%S)"
fi

# Create application directory
sudo mkdir -p "$APP_DIR"
cd "$APP_DIR"

# Pull latest code from GitHub
echo "📥 Pulling latest code..."
if [ -d ".git" ]; then
    git pull origin main
else
    git clone https://github.com/lrpthomas/lrpdm-platform.git .
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Set up environment
if [ ! -f ".env" ]; then
    echo "⚙️ Setting up production environment..."
    cp .env.production .env
    echo "⚠️  Please update .env with your production values!"
fi

# Database setup
echo "🗄️ Setting up database..."
npx prisma generate
npx prisma migrate deploy

# Build application
echo "🔨 Building application..."
npm run build

# Set permissions
sudo chown -R www-data:www-data "$APP_DIR"
sudo chmod -R 755 "$APP_DIR"

# Restart services
echo "🔄 Restarting services..."
if systemctl is-active --quiet "$SERVICE_NAME"; then
    sudo systemctl restart "$SERVICE_NAME"
else
    echo "⚠️  Service $SERVICE_NAME not found. Please set up systemd service."
fi

# Restart nginx
if systemctl is-active --quiet nginx; then
    sudo systemctl reload nginx
fi

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at your domain"
echo "📝 Don't forget to:"
echo "   - Update .env with production values"
echo "   - Set up SSL certificates"
echo "   - Configure your domain DNS"