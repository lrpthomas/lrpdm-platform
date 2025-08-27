# VPS Setup Guide for LRPDM Platform

## Prerequisites
- Ubuntu 20.04+ or similar Linux distribution
- Root or sudo access
- Domain name pointing to your VPS
- Basic familiarity with command line

## Step 1: Initial Server Setup

### Update system packages
```bash
sudo apt update && sudo apt upgrade -y
```

### Install required packages
```bash
sudo apt install -y curl wget git nginx postgresql postgresql-contrib
```

### Install Node.js (version 18+)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Verify installations
```bash
node --version  # Should be 18+
npm --version
git --version
nginx -v
psql --version
```

## Step 2: Database Setup

### Configure PostgreSQL
```bash
# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
```

In PostgreSQL shell:
```sql
CREATE USER lrpdm_user WITH PASSWORD 'your_secure_password';
CREATE DATABASE lrpdm_platform OWNER lrpdm_user;
GRANT ALL PRIVILEGES ON DATABASE lrpdm_platform TO lrpdm_user;
\q
```

## Step 3: Application Deployment

### Clone the repository
```bash
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/lrpthomas/lrpdm-platform.git
sudo chown -R $USER:$USER lrpdm-platform
cd lrpdm-platform
```

### Install dependencies
```bash
npm ci --only=production
```

### Configure environment
```bash
cp .env.production .env
nano .env  # Edit with your production values
```

Update `.env` with:
```env
DATABASE_URL="postgresql://lrpdm_user:your_secure_password@localhost:5432/lrpdm_platform"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-a-secure-32-character-secret"
```

### Set up database
```bash
npx prisma generate
npx prisma migrate deploy
```

### Build the application
```bash
npm run build
```

## Step 4: System Service Setup

### Copy service file
```bash
sudo cp lrpdm-platform.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable lrpdm-platform
sudo systemctl start lrpdm-platform
```

### Check service status
```bash
sudo systemctl status lrpdm-platform
```

## Step 5: NGINX Configuration

### Copy NGINX config
```bash
sudo cp nginx.conf /etc/nginx/sites-available/lrpdm-platform
sudo ln -s /etc/nginx/sites-available/lrpdm-platform /etc/nginx/sites-enabled/
```

### Update domain in config
```bash
sudo nano /etc/nginx/sites-available/lrpdm-platform
# Replace "your-domain.com" with your actual domain
```

### Test and reload NGINX
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Step 6: SSL Certificate (Let's Encrypt)

### Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Get SSL certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Test auto-renewal
```bash
sudo certbot renew --dry-run
```

## Step 7: Firewall Configuration

### Configure UFW
```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

## Step 8: Automated Deployment

### Make deploy script executable
```bash
chmod +x deploy.sh
```

### Set up deployment key (for GitHub)
```bash
ssh-keygen -t ed25519 -C "deploy@your-domain.com"
cat ~/.ssh/id_ed25519.pub
# Add this key to your GitHub repository as a deploy key
```

### Test deployment
```bash
./deploy.sh
```

## Step 9: Monitoring & Logs

### View application logs
```bash
sudo journalctl -u lrpdm-platform -f
```

### View NGINX logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Check system resources
```bash
htop
df -h
free -m
```

## Step 10: Security Hardening

### Disable root SSH login
```bash
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart sshd
```

### Set up fail2ban
```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### Regular updates
```bash
# Add to crontab
sudo crontab -e
# Add: 0 2 * * * apt update && apt upgrade -y
```

## Troubleshooting

### Application won't start
```bash
# Check logs
sudo journalctl -u lrpdm-platform -n 50

# Check Node.js process
ps aux | grep node

# Restart service
sudo systemctl restart lrpdm-platform
```

### Database connection issues
```bash
# Test connection
psql -h localhost -U lrpdm_user -d lrpdm_platform

# Check PostgreSQL status
sudo systemctl status postgresql
```

### NGINX issues
```bash
# Test configuration
sudo nginx -t

# Check status
sudo systemctl status nginx

# Reload configuration
sudo systemctl reload nginx
```

## Maintenance

### Regular backups
```bash
# Database backup
pg_dump -h localhost -U lrpdm_user lrpdm_platform > backup_$(date +%Y%m%d).sql

# Application backup
tar -czf app_backup_$(date +%Y%m%d).tar.gz /var/www/lrpdm-platform
```

### Update deployment
```bash
cd /var/www/lrpdm-platform
./deploy.sh
```

Your LRPDM Platform should now be running at https://your-domain.com! 🚀