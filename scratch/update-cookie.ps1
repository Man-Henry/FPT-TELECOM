$files = @(Get-ChildItem -Path ".\" -Filter "*.html" | Where-Object { $_.Name -ne "privacy.html" -and $_.Name -ne "terms.html" })
$files += Get-ChildItem -Path ".\pages" -Filter "*.html" | Where-Object { $_.Name -ne "privacy.html" -and $_.Name -ne "terms.html" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    $privacyLink = if ($file.Directory.Name -eq "pages") { "privacy.html" } else { "pages/privacy.html" }

    # The new banner string with JS logic
    $newBanner = @"
  <!-- Cookie Consent Banner -->
  <div id="cookie-banner" style="position: fixed; bottom: 0; left: 0; right: 0; background: #0f172a; color: white; padding: 15px 24px; display: none; justify-content: space-between; align-items: center; z-index: 9999; font-size: 14px; box-shadow: 0 -4px 10px rgba(0,0,0,0.1);">
    <div style="flex: 1; margin-right: 20px;">
      Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn trên trang web này. Bằng cách tiếp tục duyệt web, bạn đồng ý với <a href="$privacyLink" style="color: #0665f5; text-decoration: underline;">Chính sách bảo mật</a> của chúng tôi.
    </div>
    <div>
      <button onclick="localStorage.setItem('cookieConsent', 'true'); document.getElementById('cookie-banner').style.display='none';" style="background: #0665f5; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">Đồng ý</button>
    </div>
  </div>
  <script>
    if (!localStorage.getItem('cookieConsent')) {
      document.getElementById('cookie-banner').style.display = 'flex';
    }
  </script>
"@

    # Remove the old banner (we can use Regex to remove everything from <!-- Cookie Consent Banner --> to the </div> before </body>)
    $content = $content -replace '(?s)<!-- Cookie Consent Banner -->.*?</div>\s*</div>', ""

    # Also remove any trailing script if we accidentally run it twice
    $content = $content -replace "(?s)  <script>`r?`n    if \(!localStorage.getItem\('cookieConsent'\)\) \{`r?`n      document.getElementById\('cookie-banner'\).style.display = 'flex';`r?`n    \}`r?`n  </script>", ""

    # Now add the new banner before </body>
    if ($content -notmatch 'id="cookie-banner"') {
        $content = $content -replace '</body>', "$newBanner`n</body>"
    }

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}
