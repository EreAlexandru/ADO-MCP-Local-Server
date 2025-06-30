@echo off
echo ========================================
echo Azure DevOps MCP Server - Easy Installer
echo ========================================
echo.

REM Check if we're in the right directory
if not exist package.json (
    echo ERROR: package.json not found!
    echo.
    echo Make sure you run this from the ADOMCPLocalServer folder
    echo Current folder: %CD%
    echo.
    pause
    exit /b 1
)

REM Check if npm is installed
echo Checking for Node.js/npm...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Node.js/npm is not installed!
    echo.
    echo Please install Node.js from https://nodejs.org first
    echo Download from: https://nodejs.org
    echo.
    pause
    exit /b 1
)
echo [OK] Node.js/npm found!

echo Installing Azure DevOps MCP Server...
echo.

REM Install dependencies
echo.
echo Step 1: Installing dependencies (this may take a minute)...
echo.
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo.
    echo Common causes:
    echo - No internet connection
    echo - npm registry is down
    echo - Antivirus blocking npm
    echo.
    echo Try running manually: npm install
    echo.
    pause
    exit /b 1
)
echo [OK] Dependencies installed!

echo.
echo Step 2: Building the project...
echo.
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to build project!
    echo.
    echo This usually means TypeScript compilation failed.
    echo Check for error messages above.
    echo.
    echo Try running manually: npm run build
    echo.
    pause
    exit /b 1
)
echo [OK] Project built successfully!

echo.
echo ========================================
echo INSTALLATION COMPLETE!
echo ========================================
echo.
echo Now you need to:
echo.
echo 1. Create a .env file in this folder with:
echo    AZURE_DEVOPS_ORG=your-org-name
echo    AZURE_DEVOPS_PAT=your-token
echo.
echo 2. In Cursor: Tools ^& Integration ^> New MCP Server ^> Paste this:
echo    {
echo      "mcpServers": {
echo        "azure-devops": {
echo          "command": "node",
echo          "args": ["%CD:\=/%/dist/index.js"]
echo        }
echo      }
echo    }
echo.
echo 3. Restart Cursor
echo.
pause 