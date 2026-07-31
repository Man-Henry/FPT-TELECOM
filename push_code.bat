@echo off
echo Dang tao sitemap tu dong...
node scratch\generate-sitemap.js
echo Dang khoi tao git va them code moi...
git init
git add .
git commit -m "Push new code"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/Man-Henry/FPT_TELECOM.git
echo Dang day code len GitHub va ghi de code cu...
git push -u -f origin main
echo Hoan thanh!
pause

