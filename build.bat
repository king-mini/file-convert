@echo off
echo ===================================
echo Building Lokit...
echo ===================================
call npm run build
if errorlevel 1 (
    echo.
    echo Build failed!
    pause
    exit /b 1
)
echo.
echo Build completed!
exit /b 0
