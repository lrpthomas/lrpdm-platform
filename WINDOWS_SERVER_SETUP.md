# Windows Server Deployment Guide for LRPDM Platform

## Prerequisites
- Windows Server 2016+ (Your version: 10.0.17763)
- Administrator access
- IIS with URL Rewrite module
- Node.js 18+
- Git for Windows
- PostgreSQL or SQL Server

## Step 1: Install Required Software

### 1.1 Install Chocolatey (Package Manager)
Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### 1.2 Install Node.js and Git
```powershell
choco install nodejs-lts git -y
refreshenv
```

### 1.3 Install IIS and URL Rewrite
```powershell
# Install IIS
Enable-WindowsFeature -Name IIS-WebServerRole, IIS-WebServer, IIS-CommonHttpFeatures, IIS-HttpErrors, IIS-HttpRedirect, IIS-ApplicationDevelopment, IIS-HealthAndDiagnostics, IIS-HttpLogging, IIS-Security, IIS-RequestFiltering, IIS-Performance, IIS-WebServerManagementTools, IIS-ManagementConsole -IncludeManagementTools

# Install URL Rewrite Module
choco install urlrewrite -y
```

### 1.4 Install PostgreSQL (or SQL Server)
```powershell
# Option 1: PostgreSQL
choco install postgresql14 -y

# Option 2: SQL Server Express
choco install sql-server-express -y
```

## Step 2: Clone and Setup Application

### 2.1 Create Application Directory
```powershell
mkdir C:\inetpub\lrpdm-platform
cd C:\inetpub\lrpdm-platform
```

### 2.2 Clone Repository
```powershell
git clone https://github.com/lrpthomas/lrpdm-platform.git .
```

### 2.3 Install Dependencies
```powershell
npm install
```

### 2.4 Configure Environment
Create `.env` file:
```powershell
Copy-Item .env.production .env
notepad .env
```

Update with your values:
```env
DATABASE_URL="postgresql://postgres:YourPassword@localhost:5432/lrpdm_platform"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-secure-32-character-secret"
NODE_ENV="production"
```

### 2.5 Setup Database
```powershell
# For PostgreSQL
npx prisma generate
npx prisma migrate deploy

# For SQL Server, update prisma/schema.prisma first:
# provider = "sqlserver"
# url = "sqlserver://localhost:1433;database=lrpdm_platform;user=sa;password=YourPassword;encrypt=true;trustServerCertificate=true"
```

### 2.6 Build Application
```powershell
npm run build
```

## Step 3: Configure IIS

### 3.1 Install iisnode
Download and install from: https://github.com/Azure/iisnode/releases

### 3.2 Create IIS Site
1. Open IIS Manager
2. Right-click "Sites" → "Add Website"
3. Site name: `lrpdm-platform`
4. Physical path: `C:\inetpub\lrpdm-platform`
5. Port: 80 (or 443 for HTTPS)
6. Hostname: your-domain.com

### 3.3 Create web.config
Create `C:\inetpub\lrpdm-platform\web.config`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>
    
    <rewrite>
      <rules>
        <rule name="NextJS" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="server.js" />
        </rule>
      </rules>
    </rewrite>
    
    <security>
      <requestFiltering>
        <hiddenSegments>
          <add segment="node_modules" />
          <add segment=".env" />
          <add segment=".git" />
        </hiddenSegments>
      </requestFiltering>
    </security>
    
    <iisnode 
      node_env="production"
      nodeProcessCommandLine="C:\Program Files\nodejs\node.exe"
      loggingEnabled="true"
      logDirectory="iisnode"
      debuggingEnabled="false"
      maxConcurrentRequestsPerProcess="1024"
      maxNamedPipeConnectionRetry="24"
      namedPipeConnectionRetryDelay="250"
    />
    
    <httpErrors existingResponse="PassThrough" />
  </system.webServer>
</configuration>
```

### 3.4 Create server.js for IIS
Create `C:\inetpub\lrpdm-platform\server.js`:
```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
```

## Step 4: Set Permissions

```powershell
# Give IIS_IUSRS permissions
icacls "C:\inetpub\lrpdm-platform" /grant "IIS_IUSRS:(OI)(CI)F" /T
icacls "C:\inetpub\lrpdm-platform" /grant "IUSR:(OI)(CI)F" /T
```

## Step 5: Configure Windows Firewall

```powershell
# Allow HTTP and HTTPS
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
```

## Step 6: SSL Certificate (Optional)

### Using Let's Encrypt on Windows:
```powershell
# Install win-acme
choco install win-acme -y

# Run certificate wizard
wacs
# Follow prompts to configure SSL for your IIS site
```

## Step 7: Create Deployment Script

Create `C:\inetpub\lrpdm-platform\deploy.ps1`:
```powershell
# Windows Deployment Script for LRPDM Platform
param(
    [string]$Branch = "main"
)

Write-Host "🚀 Starting LRPDM Platform deployment..." -ForegroundColor Green

# Stop IIS site
Write-Host "📦 Stopping IIS site..." -ForegroundColor Yellow
Import-Module WebAdministration
Stop-WebSite -Name "lrpdm-platform"

# Backup current deployment
$BackupDir = "C:\Backups\lrpdm-platform"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
if (Test-Path "C:\inetpub\lrpdm-platform") {
    Write-Host "📦 Creating backup..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
    Copy-Item -Path "C:\inetpub\lrpdm-platform" -Destination "$BackupDir\backup_$Timestamp" -Recurse
}

# Pull latest code
Write-Host "📥 Pulling latest code..." -ForegroundColor Yellow
Set-Location "C:\inetpub\lrpdm-platform"
git pull origin $Branch

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci --only=production

# Generate Prisma client
Write-Host "🗄️ Setting up database..." -ForegroundColor Yellow
npx prisma generate
npx prisma migrate deploy

# Build application
Write-Host "🔨 Building application..." -ForegroundColor Yellow
npm run build

# Start IIS site
Write-Host "🔄 Starting IIS site..." -ForegroundColor Yellow
Start-WebSite -Name "lrpdm-platform"

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your app should be available at your domain" -ForegroundColor Cyan
```

## Step 8: Automated Deployment

### 8.1 Create Scheduled Task for Auto-Deploy
```powershell
# Create scheduled task to check for updates every hour
$Action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-ExecutionPolicy Bypass -File C:\inetpub\lrpdm-platform\deploy.ps1"
$Trigger = New-ScheduledTaskTrigger -Daily -DaysInterval 1 -At "12:00AM" -RepetitionInterval (New-TimeSpan -Hours 1)
$Principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest
Register-ScheduledTask -TaskName "LRPDM Platform Auto Deploy" -Action $Action -Trigger $Trigger -Principal $Principal
```

### 8.2 Or Use GitHub Webhook
Install GitHub webhook receiver for automatic deployment on push.

## Step 9: Monitoring

### View Application Logs
```powershell
# IIS logs
Get-Content C:\inetpub\lrpdm-platform\iisnode\*.txt -Tail 50

# Event viewer
eventvwr
```

### Performance Monitor
```powershell
perfmon
# Add counters for Node.js process, IIS, and SQL
```

## Troubleshooting

### Application won't start
```powershell
# Check Node.js installation
node --version
npm --version

# Test application directly
cd C:\inetpub\lrpdm-platform
npm start

# Check IIS logs
Get-Content C:\inetpub\logs\LogFiles\W3SVC1\*.log -Tail 50
```

### Database connection issues
```powershell
# Test PostgreSQL
psql -U postgres -h localhost

# Test SQL Server
sqlcmd -S localhost -U sa -P YourPassword
```

### Permission issues
```powershell
# Reset permissions
icacls "C:\inetpub\lrpdm-platform" /reset /T
icacls "C:\inetpub\lrpdm-platform" /grant "IIS_IUSRS:(OI)(CI)F" /T
```

## Maintenance

### Regular Updates
```powershell
# Run deployment script
C:\inetpub\lrpdm-platform\deploy.ps1
```

### Database Backup
```powershell
# PostgreSQL backup
pg_dump -U postgres -h localhost lrpdm_platform > "C:\Backups\db_$(Get-Date -Format 'yyyyMMdd').sql"

# SQL Server backup
sqlcmd -S localhost -U sa -Q "BACKUP DATABASE lrpdm_platform TO DISK='C:\Backups\db_$(Get-Date -Format 'yyyyMMdd').bak'"
```

Your LRPDM Platform is now running on Windows Server with IIS! 🚀