@echo off
echo ===================================
echo Deploying to Cloudflare Pages...
echo ===================================
call npx wrangler pages deploy dist --project-name=pdf-converter
echo.
echo Deployment completed!
pause


