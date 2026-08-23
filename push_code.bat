@echo off
echo Dang kiem tra va chuan bi day code len GitHub...
git add .
git commit -m "Cap nhat bang gia, chinh sach thang 8, toi uu WebP va dong bo duong dan"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/Man-Henry/FPT-TELECOM.git
echo Dang day code len GitHub...
git push -u -f origin main
echo Hoan thanh day code!
pause



