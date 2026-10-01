import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public", "images");

async function optimizeFolder(folderPath, maxWidth, quality = 75) {
  if (!fs.existsSync(folderPath)) return;
  const files = await fsp.readdir(folderPath);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
    // Don't reprocess if it's logo or already webp
    const fullPath = path.join(folderPath, file);
    const baseName = path.basename(file, ext);
    const targetWebp = path.join(folderPath, `${baseName}.webp`);

    try {
      const image = sharp(fullPath);
      const meta = await image.metadata();

      let pipeline = image;
      if (meta.width && meta.width > maxWidth) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality, effort: 6 })
        .toFile(targetWebp);

      const stat = await fsp.stat(targetWebp);
      console.log(`✓ Optimized ${file} -> ${baseName}.webp (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`✗ Error optimizing ${file}:`, err.message);
    }
  }
}

async function main() {
  console.log("=========================================");
  console.log("RECARUH Image Optimizer");
  console.log("=========================================\n");

  // Hero: max 1600px wide, quality 72 (crisp & under 150KB)
  console.log("Optimizing Hero images (max 1600px)...");
  await optimizeFolder(path.join(publicDir, "hero"), 1600, 72);

  // Services: max 900px wide, quality 75
  console.log("\nOptimizing Service images (max 900px)...");
  await optimizeFolder(path.join(publicDir, "services"), 900, 75);

  // About: max 1200px wide, quality 75
  console.log("\nOptimizing About images (max 1200px)...");
  await optimizeFolder(path.join(publicDir, "about"), 1200, 75);

  console.log("\n=========================================");
  console.log("Image optimization complete!");
  console.log("=========================================");
}

main().catch(console.error);
