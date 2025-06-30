@echo off
echo ========================================
echo Azure DevOps MCP Server - DEBUG Installer
echo ========================================
echo.
echo This will show you exactly what's happening...
echo.

echo Current directory: %CD%
echo.

echo Checking for package.json...
if exist package.json (
    echo [FOUND] package.json exists
) else (
    echo [ERROR] package.json NOT found - wrong directory?
    echo.
    echo You need to run this from inside the ADOMCPLocalServer folder
    pause
    exit
)

echo.
echo Checking for Node.js...
where node
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found in PATH
    pause
    exit
)

echo.
echo Checking for npm...
where npm
if %errorlevel% neq 0 (
    echo [ERROR] npm not found in PATH
    pause
    exit
)

echo.
echo Node version:
node --version

echo.
echo NPM version:
npm --version

echo.
echo Everything looks good! Ready to install.
echo.
echo Press any key to run: npm install
pause

npm install

echo.
echo npm install finished with exit code: %errorlevel%
echo.
echo Press any key to run: npm run build
pause

npm run build

echo.
echo npm run build finished with exit code: %errorlevel%
echo.
echo Installation complete!
echo.
pause 