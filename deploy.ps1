# Windows Deployment Script for LRPDM Platform
param(
    [string]$Branch = "main"
)

Write-Host "🚀 Starting LRPDM Platform deployment..." -ForegroundColor Green
Write-Host "📍 Branch: $Branch" -ForegroundColor Cyan

# Variables
$AppDir = "C:\inetpub\lrpdm-platform"
$BackupDir = "C:\Backups\lrpdm-platform"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))
{
    Write-Host "⚠️ This script requires Administrator privileges!" -ForegroundColor Red
    exit 1
}

# Import IIS module
try {
    Import-Module WebAdministration -ErrorAction Stop
} catch {
    Write-Host "⚠️ IIS module not found. Please ensure IIS is installed." -ForegroundColor Red
    exit 1
}

# Stop IIS site if it exists
$siteName = "lrpdm-platform"
if (Get-Website -Name $siteName -ErrorAction SilentlyContinue) {
    Write-Host "📦 Stopping IIS site..." -ForegroundColor Yellow
    Stop-WebSite -Name $siteName
    Stop-WebAppPool -Name $siteName -ErrorAction SilentlyContinue
}

# Create backup of current deployment
if (Test-Path $AppDir) {
    Write-Host "📦 Creating backup..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
    $BackupPath = "$BackupDir\backup_$Timestamp"
    Copy-Item -Path $AppDir -Destination $BackupPath -Recurse
    Write-Host "✅ Backup created at: $BackupPath" -ForegroundColor Green
}

# Create application directory if it doesn't exist
if (-not (Test-Path $AppDir)) {
    Write-Host "📁 Creating application directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $AppDir | Out-Null
}

Set-Location $AppDir

# Clone or update repository
if (Test-Path ".git") {
    Write-Host "📥 Pulling latest code..." -ForegroundColor Yellow
    git fetch origin
    git reset --hard origin/$Branch
    git pull origin $Branch
} else {
    Write-Host "📥 Cloning repository..." -ForegroundColor Yellow
    git clone https://github.com/lrpthomas/lrpdm-platform.git .
    git checkout $Branch
}

# Check Node.js installation
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci --only=production

# Setup environment file
if (-not (Test-Path ".env")) {
    if (Test-Path ".env.production") {
        Write-Host "⚙️ Setting up production environment..." -ForegroundColor Yellow
        Copy-Item .env.production .env
        Write-Host "⚠️ Please update .env with your production values!" -ForegroundColor Yellow
    } else {
        Write-Host "⚠️ No .env file found. Please create one!" -ForegroundColor Red
    }
}

# Generate Prisma client
Write-Host "🗄️ Setting up database..." -ForegroundColor Yellow
npx prisma generate

# Run database migrations (optional, comment out if not ready)
# npx prisma migrate deploy

# Build application
Write-Host "🔨 Building application..." -ForegroundColor Yellow
npm run build

# Set permissions
Write-Host "🔐 Setting permissions..." -ForegroundColor Yellow
icacls $AppDir /grant "IIS_IUSRS:(OI)(CI)F" /T /Q
icacls $AppDir /grant "IUSR:(OI)(CI)F" /T /Q

# Create or update IIS site
if (-not (Get-Website -Name $siteName -ErrorAction SilentlyContinue)) {
    Write-Host "🌐 Creating IIS site..." -ForegroundColor Yellow
    
    # Create application pool
    New-WebAppPool -Name $siteName
    Set-ItemProperty -Path "IIS:\AppPools\$siteName" -Name processIdentity.identityType -Value ApplicationPoolIdentity
    Set-ItemProperty -Path "IIS:\AppPools\$siteName" -Name enable32BitAppOnWin64 -Value $false
    
    # Create website
    New-Website -Name $siteName -Port 80 -PhysicalPath $AppDir -ApplicationPool $siteName
}

# Start IIS site
Write-Host "🔄 Starting IIS site..." -ForegroundColor Yellow
Start-WebAppPool -Name $siteName
Start-WebSite -Name $siteName

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your app should be available at http://localhost" -ForegroundColor Cyan
Write-Host "" -ForegroundColor White
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Update .env with production database credentials" -ForegroundColor White
Write-Host "   2. Configure your domain in IIS bindings" -ForegroundColor White
Write-Host "   3. Install SSL certificate" -ForegroundColor White
Write-Host "   4. Test the application" -ForegroundColor White