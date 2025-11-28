@echo off
echo ===================================
echo Deploying Lokit to Cloudflare Pages...
echo ===================================
call Build.bat
if errorlevel 1 (
    echo.
    echo Build failed!
    exit /b 1
)
echo.
echo Build completed!
echo.
call npx wrangler pages deploy dist --project-name=file-convert
if errorlevel 1 (
    echo.
    echo Deployment failed!
    exit /b 1
)
echo.
echo Deployment completed!
exit /b 0
