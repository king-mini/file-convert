@echo off
echo ===================================
echo Deploying Lokit to Cloudflare Pages...
echo ===================================
call npx wrangler pages deploy dist --project-name=file-convert
echo.
echo Deployment completed!
pause


