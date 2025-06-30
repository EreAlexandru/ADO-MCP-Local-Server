@echo off
echo ========================================
echo Azure DevOps MCP Server - Easy Installer
echo ========================================
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js/npm is not installed!
    echo Please install Node.js from https://nodejs.org first
    echo.
    pause
    exit /b 1
)

echo Installing Azure DevOps MCP Server...
echo.

REM Install dependencies
echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Failed to build project
    pause
    exit /b 1
)

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
echo Press any key to exit...
pause >nul 