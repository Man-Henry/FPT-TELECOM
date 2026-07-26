const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = './assets/images';
fs.readdirSync(dir)
  .filter(f => f.endsWith('.png'))
  .forEach(f => {
    const input = path.join(dir, f);
    const output = path.join(dir, f.replace('.png', '.webp'));
    sharp(input).webp({ quality: 82 }).toFile(output)
      .then(info => console.log(`✓ ${f} → ${(info.size/1024).toFixed(0)}KB`))
      .catch(err => console.error(`✗ ${f} failed:`, err.message));
  });
