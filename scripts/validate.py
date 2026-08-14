import os

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def find_html_files(dir_path):
    html_files = []
    for root, dirs, files in os.walk(dir_path):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
        if '.venv' in dirs:
            dirs.remove('.venv')
        if '.agents' in dirs:
            dirs.remove('.agents')
        
        for file in files:
            if file.endswith('.html') and not file.startswith('google'):
                html_files.append(os.path.join(root, file))
    return html_files

html_files = find_html_files(root_dir)
errors = 0

print(f"Found {len(html_files)} HTML files. Starting validation...")

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    rel_path = os.path.relpath(file, root_dir)
    
    if '<title>' not in content or '</title>' not in content:
        print(f"[Error] Missing <title> tag in {rel_path}")
        errors += 1
        
    if '<meta name="description"' not in content:
        print(f"[Error] Missing meta description in {rel_path}")
        errors += 1
        
    if '<h1' not in content or '</h1>' not in content:
        print(f"[Error] Missing <h1> tag in {rel_path}")
        errors += 1
        
    if '<link rel="canonical"' not in content:
        print(f"[Error] Missing canonical link in {rel_path}")
        errors += 1

if errors == 0:
    print("✅ SEO Validation passed. No errors found.")
else:
    print(f"❌ SEO Validation failed with {errors} errors.")
    exit(1)
