/**
 * ==============================================================================
 * SMART ASSET COMPRESSION & OPTIMIZATION SCRIPT
 * Nén và tối ưu hóa toàn bộ hình ảnh trong assets/ (WebP & PNG)
 * Sử dụng Buffer trong bộ nhớ để tương thích 100% với Windows (tránh lỗi EBUSY)
 * ==============================================================================
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Tắt bộ nhớ cache của libvips để giải phóng bộ nhớ và file lock tức thì
sharp.cache(false);

const ASSETS_DIR = path.resolve(__dirname, "..", "assets");

async function optimizeImagesInDir(dir, maxWidth = 850, quality = 80) {
  if (!fs.existsSync(dir)) return { saved: 0, count: 0 };
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let totalSaved = 0;
  let count = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subResult = await optimizeImagesInDir(fullPath, maxWidth, quality);
      totalSaved += subResult.saved;
      count += subResult.count;
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (ext !== ".webp" && ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      continue;
    }

    const originalBuffer = fs.readFileSync(fullPath);
    const originalSize = originalBuffer.length;
    if (originalSize < 10 * 1024) continue; // Bỏ qua file < 10KB

    try {
      let pipeline = sharp(originalBuffer);
      const meta = await pipeline.metadata();

      let outputBuffer;
      if (ext === ".webp") {
        if (meta.width && meta.width > maxWidth) {
          pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
        }
        outputBuffer = await pipeline.webp({ quality: quality, effort: 6 }).toBuffer();
      } else if (ext === ".png") {
        outputBuffer = await pipeline.png({ quality: 85, compressionLevel: 9, palette: true }).toBuffer();
      } else if (ext === ".jpg" || ext === ".jpeg") {
        if (meta.width && meta.width > maxWidth) {
          pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
        }
        outputBuffer = await pipeline.jpeg({ quality: quality, mozjpeg: true }).toBuffer();
      }

      if (outputBuffer && outputBuffer.length < originalSize * 0.95) {
        fs.writeFileSync(fullPath, outputBuffer);
        const saved = originalSize - outputBuffer.length;
        totalSaved += saved;
        count++;
        console.log(
          `✅ ${path.relative(ASSETS_DIR, fullPath)}: ${(originalSize / 1024).toFixed(0)}KB → ${(outputBuffer.length / 1024).toFixed(0)}KB (giảm ${((saved / originalSize) * 100).toFixed(1)}%)`,
        );
      } else {
        console.log(
          `⏩ ${path.relative(ASSETS_DIR, fullPath)}: đã tối ưu (${(originalSize / 1024).toFixed(0)}KB)`,
        );
      }
    } catch (err) {
      console.error(`❌ ${entry.name}: ${err.message}`);
    }
  }

  return { saved: totalSaved, count };
}

async function main() {
  console.log("==========================================================");
  console.log("🚀 BẮT ĐẦU TỐI ƯU HÓA HÌNH ẢNH & TÀI NGUYÊN (ASSETS)");
  console.log("==========================================================\n");

  const startTime = Date.now();

  // 1. Tối ưu ảnh gói cước (main cards) - max width 850px, quality 80
  console.log("📦 1. Tối ưu ảnh gói cước (assets/images/main)...");
  const resMain = await optimizeImagesInDir(path.join(ASSETS_DIR, "images", "main"), 850, 80);

  // 2. Tối ưu ảnh bài viết (posts) - max width 1000px, quality 80
  console.log("\n📰 2. Tối ưu ảnh bài viết (assets/images/posts)...");
  const resPosts = await optimizeImagesInDir(path.join(ASSETS_DIR, "images", "posts"), 1000, 80);

  // 3. Tối ưu ảnh features - max width 800px, quality 80
  console.log("\n✨ 3. Tối ưu ảnh tính năng (assets/images/features)...");
  const resFeatures = await optimizeImagesInDir(path.join(ASSETS_DIR, "images", "features"), 800, 80);

  // 4. Tối ưu icon PNG (assets/icons)
  console.log("\n📱 4. Tối ưu icons (assets/icons)...");
  const resIcons = await optimizeImagesInDir(path.join(ASSETS_DIR, "icons"), 512, 85);

  const totalSaved = resMain.saved + resPosts.saved + resFeatures.saved + resIcons.saved;
  const totalCount = resMain.count + resPosts.count + resFeatures.count + resIcons.count;
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n==========================================================");
  console.log(`🎉 TỔNG KẾT TỐI ƯU:`);
  console.log(`- Đã nén thành công: ${totalCount} tệp hình ảnh`);
  console.log(`- Dung lượng tiết kiệm được: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`- Thời gian xử lý: ${elapsed}s`);
  console.log("==========================================================");
}

main().catch((e) => console.error("Lỗi:", e));
