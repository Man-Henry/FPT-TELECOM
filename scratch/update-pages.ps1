$pagesDir = "pages"
$files = Get-ChildItem -Path $pagesDir -Filter "*.html" | Where-Object { $_.Name -ne "privacy.html" -and $_.Name -ne "terms.html" }

$cookieBanner = @"
  <!-- Cookie Consent Banner -->
  <div id="cookie-banner" style="position: fixed; bottom: 0; left: 0; right: 0; background: #0f172a; color: white; padding: 15px 24px; display: flex; justify-content: space-between; align-items: center; z-index: 9999; font-size: 14px; box-shadow: 0 -4px 10px rgba(0,0,0,0.1);">
    <div style="flex: 1; margin-right: 20px;">
      Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn trên trang web này. Bằng cách tiếp tục duyệt web, bạn đồng ý với <a href="privacy.html" style="color: #0665f5; text-decoration: underline;">Chính sách bảo mật</a> của chúng tôi.
    </div>
    <div>
      <button onclick="document.getElementById('cookie-banner').style.display='none';" style="background: #0665f5; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">Đồng ý</button>
    </div>
  </div>
</body>
"@

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # Update Footer Links
    $content = $content -replace '<a href="chinh-sach\.html"([^>]*)>Chính sách bảo mật</a>', '<a href="https://www.facebook.com/FptTelecom/" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="privacy.html"$1>Chính sách bảo mật</a>'
        
    $content = $content -replace '<a href="chinh-sach\.html"([^>]*)>Điều khoản sử dụng</a>', '<a href="terms.html"$1>Điều khoản sử dụng</a>'

    # Update form aria-label
    $content = $content -replace '<textarea id="chat-input" placeholder="Nhập câu hỏi của bạn\.\.\." rows="1" autocomplete="off"></textarea>', '<textarea id="chat-input" aria-label="Nhập câu hỏi chat" placeholder="Nhập câu hỏi của bạn..." rows="1" autocomplete="off"></textarea>'

    # Add cookie banner
    if ($content -notmatch 'id="cookie-banner"') {
        $content = $content -replace '</body>', $cookieBanner
    }

    # Articles specific updates
    if (("news.html", "khuyen-mai-fpt-thang-7-2026.html", "ngoai-hang-anh-2026-27-fpt-play.html", "lich-thi-dau-asean-cup-2026.html") -contains $file.Name) {
        if ($content -notmatch 'Tác giả: FPT Telecom') {
            $content = $content -replace '(?i)(<h1[^>]*>.*?</h1>)', "`$1`n      <p style=`"color: #64748b; font-size: 14px; margin-bottom: 20px;`">Tác giả: FPT Telecom | Cập nhật: Tháng 7/2026</p>"
        }
        $content = $content -replace '"@type":\s*"Article",', '"@type": "Article",
        "author": {"@type": "Organization", "name": "FPT Telecom"},
        "datePublished": "2026-07-01T08:00:00+07:00",
        "dateModified": "2026-07-29T08:00:00+07:00",'
    }

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}
