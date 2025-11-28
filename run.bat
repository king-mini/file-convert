@echo off
echo ===================================
echo Starting Lokit Dev Server...
echo ===================================
echo.
echo Press Ctrl+C to stop the server
echo.
call build.bat
if %errorlevel% neq 0 (
    echo Build failed. Exiting.
    exit /b %errorlevel%
)
call npm run dev
