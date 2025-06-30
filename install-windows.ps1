# Azure DevOps MCP Server for Cursor - Easy Installer
# This script will install everything needed to run the Azure DevOps MCP Server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Azure DevOps MCP Server - Easy Installer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if running as administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Check if Node.js is installed
function Test-NodeInstalled {
    try {
        $nodeVersion = node --version 2>$null
        if ($nodeVersion) {
            Write-Host "✓ Node.js is installed (version $nodeVersion)" -ForegroundColor Green
            return $true
        }
    } catch {
        return $false
    }
    return $false
}

# Install Node.js if not present
function Install-NodeJS {
    Write-Host "Node.js is not installed. Installing now..." -ForegroundColor Yellow
    
    # Download Node.js installer
    $nodeUrl = "https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi"
    $installerPath = "$env:TEMP\node-installer.msi"
    
    Write-Host "Downloading Node.js..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $nodeUrl -OutFile $installerPath
    
    Write-Host "Installing Node.js (this may take a moment)..." -ForegroundColor Yellow
    Start-Process msiexec.exe -Wait -ArgumentList "/i", $installerPath, "/quiet", "/norestart"
    
    # Refresh PATH
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    Remove-Item $installerPath -Force
    Write-Host "✓ Node.js installed successfully!" -ForegroundColor Green
}

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

if (-not (Test-NodeInstalled)) {
    if (-not (Test-Administrator)) {
        Write-Host "ERROR: Node.js is not installed and this script needs administrator privileges to install it." -ForegroundColor Red
        Write-Host "Please run this script as Administrator or install Node.js manually from https://nodejs.org" -ForegroundColor Red
        Write-Host ""
        Write-Host "Press any key to exit..."
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        exit 1
    }
    Install-NodeJS
}

# Get installation directory
Write-Host ""
Write-Host "Where would you like to install the Azure DevOps MCP Server?" -ForegroundColor Cyan
Write-Host "Default: C:\azure-devops-mcp-server" -ForegroundColor Gray
$installPath = Read-Host "Press Enter for default or type a different path"

if ([string]::IsNullOrWhiteSpace($installPath)) {
    $installPath = "C:\azure-devops-mcp-server"
}

# Create directory if it doesn't exist
if (-not (Test-Path $installPath)) {
    New-Item -ItemType Directory -Path $installPath -Force | Out-Null
    Write-Host "✓ Created installation directory" -ForegroundColor Green
}

# Change to installation directory
Set-Location $installPath

# Download the server files
Write-Host ""
Write-Host "Downloading Azure DevOps MCP Server files..." -ForegroundColor Yellow

# Create package.json
$packageJson = @'
{
  "name": "azure-devops-mcp-cursor",
  "version": "3.0.0",
  "description": "Azure DevOps MCP Server for Cursor IDE",
  "main": "dist/index.js",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc && node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0",
    "axios": "^1.6.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.2"
  }
}
'@

$packageJson | Out-File -FilePath "package.json" -Encoding UTF8

Write-Host "✓ Created package.json" -ForegroundColor Green

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
npm install --no-fund --no-audit

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green

# Download source files from GitHub (you would host these)
Write-Host ""
Write-Host "Downloading source files..." -ForegroundColor Yellow

# For now, we'll create a simple notice file
$noticeContent = @"
The source files need to be downloaded from your GitHub repository.

Please:
1. Download the source files from your repository
2. Extract them to this directory: $installPath
3. Run 'npm run build' to compile the TypeScript files
4. Configure your PAT token as shown below
"@

$noticeContent | Out-File -FilePath "SETUP_NOTICE.txt" -Encoding UTF8

# Setup configuration
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configuration Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "To use this server, you need an Azure DevOps Personal Access Token (PAT)" -ForegroundColor Yellow
Write-Host "You can create one at: https://dev.azure.com/YOUR_ORG/_usersSettings/tokens" -ForegroundColor Gray
Write-Host ""

$organization = Read-Host "Enter your Azure DevOps organization name"
$patToken = Read-Host "Enter your Personal Access Token (PAT)" -AsSecureString

# Convert secure string to plain text
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($patToken)
$patTokenPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Create .env file
$envContent = @"
AZURE_DEVOPS_ORG=$organization
AZURE_DEVOPS_PAT=$patTokenPlain
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8
Write-Host "✓ Configuration saved" -ForegroundColor Green

# Create Cursor configuration helper
$cursorConfig = @'
{
  "azure-devops": {
    "command": "node",
    "args": ["C:\\azure-devops-mcp-server\\dist\\index.js"]
  }
}
'@

$cursorConfig = $cursorConfig.Replace("C:\\azure-devops-mcp-server", $installPath)
$configPath = "$installPath\cursor-config.json"
$cursorConfig | Out-File -FilePath $configPath -Encoding UTF8

# Final instructions
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Download the source files from the repository" -ForegroundColor White
Write-Host "2. Extract them to: $installPath" -ForegroundColor White
Write-Host "3. Run 'npm run build' in that directory" -ForegroundColor White
Write-Host "4. Add this to your Cursor settings:" -ForegroundColor White
Write-Host ""
Write-Host "The configuration has been saved to:" -ForegroundColor Yellow
Write-Host $configPath -ForegroundColor Gray
Write-Host ""
Write-Host "Copy the contents of that file to your Cursor MCP settings." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 