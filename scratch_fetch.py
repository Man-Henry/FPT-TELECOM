import urllib.request
from bs4 import BeautifulSoup

url = "https://fpt.vn/internet?aff_sid=am_a7815718fabb4580be12323e32d3354e&utm_source=amtracking"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        html = response.read()

    soup = BeautifulSoup(html, 'html.parser')
    
    # Try to find the main sections
    main = soup.find('main')
    if not main:
        main = soup

    print("--- HEADINGS ---")
    for tag in ['h1', 'h2']:
        for el in main.find_all(tag):
            print(f"[{tag.upper()}] {el.text.strip()}")
            
    print("\n--- CONTENT BLOCKS ---")
    sections = main.find_all('section')
    if not sections:
        sections = main.find_all('div', class_=lambda x: x and ('section' in x or 'block' in x))
        
    for i, sec in enumerate(sections[:10]):
        print(f"\nSECTION {i+1}:")
        h2 = sec.find('h2')
        if h2:
            print(f"Title: {h2.text.strip()}")
            
        packages = sec.find_all('div', class_=lambda x: x and 'package' in x)
        for pkg in packages[:3]:
            name = pkg.find(['h3', 'h4', 'div'], class_=lambda x: x and ('name' in x or 'title' in x))
            price = pkg.find(class_=lambda x: x and 'price' in x)
            if name:
                print(f" - Package: {name.text.strip()} | {price.text.strip() if price else 'N/A'}")
                
except Exception as e:
    print(f"Error: {e}")
