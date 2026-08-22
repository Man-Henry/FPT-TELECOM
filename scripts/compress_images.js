/**
 * Compress images >300KB using sharp (WebP re-encoding at quality 75)
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGES_DIR = path.join(__dirname, "..", "assets", "images");
const SIZE_THRESHOLD = 300 * 1024; // 300KB

async function compressImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let totalSaved = 0;
  let count = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const result = await compressImages(fullPath);
      totalSaved += result.saved;
      count += result.count;
      continue;
    }

    if (!entry.name.endsWith(".webp")) continue;

    const stat = fs.statSync(fullPath);
    if (stat.size < SIZE_THRESHOLD) continue;

    const originalSize = stat.size;
    const tempPath = fullPath + ".tmp";

    try {
      await sharp(fullPath).webp({ quality: 72, effort: 6 }).toFile(tempPath);

      const newStat = fs.statSync(tempPath);
      if (newStat.size < originalSize * 0.85) {
        fs.unlinkSync(fullPath);
        fs.renameSync(tempPath, fullPath);
        const saved = originalSize - newStat.size;
        totalSaved += saved;
        count++;
        console.log(
          `✅ ${path.relative(IMAGES_DIR, fullPath)}: ${(originalSize / 1024).toFixed(0)}KB → ${(newStat.size / 1024).toFixed(0)}KB (saved ${(saved / 1024).toFixed(0)}KB)`,
        );
      } else {
        fs.unlinkSync(tempPath);
        console.log(
          `⏩ ${path.relative(IMAGES_DIR, fullPath)}: already optimal (${(originalSize / 1024).toFixed(0)}KB)`,
        );
      }
    } catch (err) {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      console.error(`❌ ${entry.name}: ${err.message}`);
    }
  }

  return { saved: totalSaved, count };
}

async function main() {
  console.log("🖼️  Compressing images >300KB...\n");
  const result = await compressImages(IMAGES_DIR);
  console.log(
    `\n🎉 Done! Compressed ${result.count} images, saved ${(result.saved / 1024 / 1024).toFixed(2)}MB total.`,
  );
}

main();
