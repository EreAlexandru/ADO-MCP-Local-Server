@echo off
cls
echo ========================================
echo     Azure DevOps MCP Setup for Cursor
echo ========================================
echo.
echo This will create your .env file in the CORRECT location!
echo.
echo Current folder: %CD%
echo.
echo 📁 Your .env file will be created HERE (in the root folder)
echo    NOT in src/ or dist/ subfolders!
echo.
echo ========================================
echo.

REM Check if .env already exists
if exist .env (
    echo ⚠️  WARNING: .env file already exists!
    echo.
    set /p OVERWRITE="Do you want to overwrite it? (y/n): "
    if /i not "%OVERWRITE%"=="y" (
        echo.
        echo Setup cancelled. Your existing .env file was not changed.
        pause
        exit /b
    )
    echo.
)

echo 📍 Step 1: Find your Azure DevOps organization name
echo.
echo Look at your Azure DevOps URL:
echo   - If it's: https://dev.azure.com/contoso/
echo   - Your org name is: contoso
echo.
set /p ORG="Enter your organization name (e.g., contoso): "

echo.
echo 🔑 Step 2: Enter your Personal Access Token
echo.
echo If you don't have one:
echo   1. Go to: https://dev.azure.com/%ORG%/_usersSettings/tokens
echo   2. Create a new token with the required permissions
echo   3. Copy the ENTIRE token
echo.
set /p PAT="Paste your PAT token here: "

REM Create the .env file
echo AZURE_DEVOPS_ORG=%ORG%> .env
echo AZURE_DEVOPS_PAT=%PAT%>> .env

echo.
echo ========================================
echo ✅ SUCCESS! .env file created!
echo ========================================
echo.
echo 📄 File location: %CD%\.env
echo.
echo Your credentials have been saved.
echo.
echo ========================================
echo 🔌 Next: Add to Cursor Settings
echo ========================================
echo.
echo 1. Open Cursor
echo 2. Go to: File → Preferences → Cursor Settings
echo 3. Find: Tools ^& Integration
echo 4. Click: New MCP Server
echo 5. DELETE everything and paste this:
echo.
echo {
echo   "mcpServers": {
echo     "azure-devops": {
echo       "command": "node",
echo       "args": ["%CD:\=/%/dist/index.js"]
echo     }
echo   }
echo }
echo.
echo 6. IMPORTANT: Restart Cursor after adding!
echo.
echo ========================================
echo 🧪 To test your connection later, run:
echo    node test-connection.js
echo ========================================
echo.
pause 