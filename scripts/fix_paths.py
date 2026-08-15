import os
import glob
import re

def get_depth(filepath):
    # Calculate depth relative to root directory
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    rel_path = os.path.relpath(filepath, root_dir)
    depth = rel_path.count(os.sep)
    return depth

def get_prefix(depth):
    if depth == 0:
        return ""
    else:
        return "../" * depth

def fix_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    depth = get_depth(filepath)
    prefix = get_prefix(depth)

    # 1. Fix script.js path
    # Match any <script defer src=".../js/script.js..."></script>
    script_pattern = re.compile(r'<script defer src="[^"]*?js/script\.js[^"]*"></script>')
    new_script = f'<script defer src="{prefix}js/script.js?v=26"></script>'
    content = script_pattern.sub(new_script, content)

    # 2. Fix Legal Links
    content = content.replace('href="/FPT-TELECOM/pages/privacy.html"', f'href="{prefix}pages/privacy.html"')
    content = content.replace('href="/FPT-TELECOM/pages/terms.html"', f'href="{prefix}pages/terms.html"')

    # 3. Remove Policy Modal Popup
    # Match the entire modal div
    # <div class="policy-modal-overlay" id="policy-modal" ...>...</div></div>
    modal_regex = re.compile(r'<div class="policy-modal-overlay" id="policy-modal".*?</div>\s*</div>', re.DOTALL)
    content = modal_regex.sub('', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

if __name__ == "__main__":
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    html_files = glob.glob(os.path.join(root_dir, '**', '*.html'), recursive=True)
    
    count = 0
    for f in html_files:
        if "node_modules" in f or ".git" in f:
            continue
        fix_html_file(f)
        count += 1
    
    print(f"Fixed {count} HTML files.")
