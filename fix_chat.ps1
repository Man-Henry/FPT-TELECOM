$css = @"
    /* Floating Actions & Chat Widget */
    .floating-actions { position: fixed; bottom: 20px; right: 20px; z-index: 100; display: flex; flex-direction: column; gap: 12px; }
    .floating-call, .chat-toggle-btn { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s, background 0.2s; }
    .floating-call { background: #16a34a; text-decoration: none; }
    .floating-call span { display: none; }
    .chat-toggle-btn { background: #2563eb; }
    .chat-toggle-btn:hover, .floating-call:hover { transform: scale(1.05); }
    
    .chat-widget { position: fixed; bottom: 85px; right: 20px; width: 340px; background: #fff; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.12); z-index: 100; display: flex; flex-direction: column; overflow: hidden; opacity: 0; pointer-events: none; transform: translateY(20px); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .chat-widget.open { opacity: 1; pointer-events: auto; transform: translateY(0); }
    .chat-widget-header { background: #2563eb; color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; }
    .chat-widget-brand { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 15px; }
    .chat-widget-controls { display: flex; gap: 8px; }
    .chat-ctrl-btn { background: none; border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px; opacity: 0.8; transition: opacity 0.2s; font-size: 20px; }
    .chat-ctrl-btn:hover { opacity: 1; }
    .chat-widget-body { position: relative; height: 350px; display: flex; flex-direction: column; background: #f8fafc; }
    .chat-messages { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
    .chat-msg { max-width: 85%; font-size: 14px; line-height: 1.5; }
    .bot-msg { align-self: flex-start; }
    .bot-msg .msg-bubble { background: white; border: 1px solid #e2e8f0; border-radius: 12px 12px 12px 2px; padding: 10px 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); color: #334155; }
    .user-msg { align-self: flex-end; }
    .user-msg .msg-bubble { background: #2563eb; color: white; border-radius: 12px 12px 2px 12px; padding: 10px 14px; box-shadow: 0 2px 4px rgba(37,99,235,0.2); }
    .chat-input-area { padding: 12px; background: white; border-top: 1px solid #e2e8f0; display: flex; gap: 8px; align-items: center; }
    #chat-input { flex: 1; border: 1px solid #cbd5e1; border-radius: 20px; padding: 8px 12px; font-size: 14px; outline: none; resize: none; transition: border-color 0.2s; font-family: inherit; }
    #chat-input:focus { border-color: #2563eb; }
    #chat-send-btn { background: #2563eb; color: white; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
    #chat-send-btn:hover { background: #1d4ed8; }
    .chat-online-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; border: 2px solid #2563eb; box-shadow: 0 0 0 1px #fff; }
    
    @media (max-width: 640px) {
      .chat-widget { bottom: 0; right: 0; width: 100%; height: 100%; border-radius: 0; z-index: 1000; }
      .chat-widget-body { height: calc(100vh - 60px); }
    }
"@

$htmlFiles = Get-ChildItem -Path . -Recurse -Filter *.html
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $modified = $false

    # Check if CSS is missing
    if ($content -notmatch "\.chat-widget \{ position: fixed;") {
        # Inject CSS before first </style>
        $content = $content -replace "(?si)(.*?)(</style>)(.*)", "`$1$css`n`$2`$3"
        $modified = $true
    }

    $pattern = '(?s)      <div class="chat-input-area">\s*<textarea id="chat-input".*?</svg>\s*</button>\s*</div>\s*</div>\s*</div>\s*<div class="chat-input-area">\s*<textarea id="chat-input".*?</svg>\s*</button>\s*</div>\s*</div>\s*</div>'
    $replacement = @"
      <div class="chat-input-area">
        <textarea id="chat-input" aria-label="Nhập câu hỏi chat" placeholder="Nhập câu hỏi của bạn..." rows="1"
          autocomplete="off"></textarea>
        <button id="chat-send-btn" aria-label="Gửi tin nhắn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
"@
    
    if ($content -match $pattern) {
        $content = $content -replace $pattern, $replacement
        $modified = $true
    }

    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Modified $($file.FullName)"
    }
}
Write-Host "Done!"
