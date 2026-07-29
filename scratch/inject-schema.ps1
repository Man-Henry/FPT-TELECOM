$pagesDir = "pages"
$articleFiles = @("news.html", "khuyen-mai-fpt-thang-7-2026.html", "ngoai-hang-anh-2026-27-fpt-play.html", "lich-thi-dau-asean-cup-2026.html")

$schemaTemplate = @"
  <!-- Article Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Tin Tức & Khuyến Mãi FPT",
    "author": {
      "@type": "Organization",
      "name": "FPT Telecom"
    },
    "datePublished": "2026-07-01T08:00:00+07:00",
    "dateModified": "2026-07-29T08:00:00+07:00"
  }
  </script>
</head>
"@

foreach ($file in $articleFiles) {
    $filePath = "$pagesDir\$file"
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        if ($content -notmatch 'application/ld\+json.*?Article') {
            $content = $content -replace '</head>', $schemaTemplate
            Set-Content -Path $filePath -Value $content -Encoding UTF8
            Write-Host "Injected Article schema into $file"
        }
    }
}
