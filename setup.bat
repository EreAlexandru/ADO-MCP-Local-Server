@echo off
echo ========================================
echo Azure DevOps Setup Helper
echo ========================================
echo.

set /p ORG="Enter your Azure DevOps organization name: "
set /p PAT="Enter your Personal Access Token (PAT): "

echo AZURE_DEVOPS_ORG=%ORG%> .env
echo AZURE_DEVOPS_PAT=%PAT%>> .env

echo.
echo ✓ Created .env file!
echo.
echo Now in Cursor: Tools ^& Integration ^> New MCP Server ^> Paste this:
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
echo Remember to restart Cursor!
echo.
pause 