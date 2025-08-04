@echo off
echo 🚀 Starting deployment process...

echo 📦 Building project...
npm run build

echo 🌐 Deploying to GitHub Pages...
npm run deploy

echo ✅ Deployment completed!
echo 🌍 Your site should be available in a few minutes at:
echo    https://YOUR_USERNAME.github.io/REPO_NAME
pause 