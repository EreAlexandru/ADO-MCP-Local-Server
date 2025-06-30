@echo off
echo ========================================
echo Checking Azure DevOps Environment Setup
echo ========================================
echo.

echo Checking for environment variables...
echo.

if defined AZURE_DEVOPS_ORG (
    echo ✓ AZURE_DEVOPS_ORG is set to: %AZURE_DEVOPS_ORG%
) else (
    echo ✗ AZURE_DEVOPS_ORG is NOT set
)

if defined AZURE_DEVOPS_PAT (
    echo ✓ AZURE_DEVOPS_PAT is set (hidden for security)
) else (
    echo ✗ AZURE_DEVOPS_PAT is NOT set
)

echo.
echo Checking for .env file...
if exist .env (
    echo ✓ .env file found
) else (
    echo ✗ .env file NOT found
)

echo.
echo Checking for build output...
if exist dist\index.js (
    echo ✓ dist\index.js found (project is built)
) else (
    echo ✗ dist\index.js NOT found (run: npm run build)
)

echo.
echo ========================================
echo Summary:
echo ========================================

if defined AZURE_DEVOPS_ORG if defined AZURE_DEVOPS_PAT (
    echo ✓ Environment variables are set - should work!
    goto :end
)

if exist .env (
    echo ✓ .env file exists - should work!
    goto :end
)

echo ✗ No credentials found!
echo   Please either:
echo   1. Run setup.bat to create .env file
echo   2. Set environment variables manually

:end
echo.
pause 