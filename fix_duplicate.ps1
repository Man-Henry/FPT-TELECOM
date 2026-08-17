$content = Get-Content -Raw "c:\Users\ManHenry\source\repos\fpttelecomvn\bang-gia\index.html"
$startIndex = $content.IndexOf("      <footer class=`"footer`">")
$endIndex = $content.IndexOf("  <script defer src=`"https://cdnjs.cloudflare.com")

if ($startIndex -ge 0 -and $endIndex -ge 0 -and $endIndex -gt $startIndex) {
    $substring = $content.Substring($startIndex, $endIndex - $startIndex)
    $content = $content.Replace($substring, "")
    Set-Content -Path "c:\Users\ManHenry\source\repos\fpttelecomvn\bang-gia\index.html" -Value $content -Encoding UTF8
    Write-Host "Removed duplicate block successfully!"
} else {
    Write-Host "Could not find start or end index. Start: $startIndex, End: $endIndex"
}
