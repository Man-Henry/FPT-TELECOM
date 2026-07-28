const fs = require('fs');
const path = require('path');

const domain = 'https://fpttelecomvn.click';
const sitemapPath = path.join(__dirname, 'sitemap.xml');
const pagesDir = path.join(__dirname, 'pages');

const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' }
];

// Scan pages directory
const files = fs.readdirSync(pagesDir);
files.forEach(file => {
    if (file.endsWith('.html')) {
        let priority = 0.8;
        let changefreq = 'monthly';
        
        if (file === 'news.html') {
            priority = 0.9;
            changefreq = 'weekly';
        }

        staticPages.push({
            url: `/pages/${file}`,
            priority,
            changefreq
        });
    }
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const today = new Date().toISOString().split('T')[0];

staticPages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${domain}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority.toFixed(1)}</priority>\n`;
    xml += `  </url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log('Sitemap generated successfully at', sitemapPath);
