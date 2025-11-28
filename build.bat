@echo off
echo ===================================
echo Building Lokit...
echo ===================================
call npm run build
if errorlevel 1 (
    echo.
    echo Build failed!
    exit /b 1
)
echo.
echo Build completed!
exit /b 0
