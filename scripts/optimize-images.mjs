import sharp from "sharp";
import { rename, stat, unlink } from "node:fs/promises";

const targets = [
  {
    path: "public/services/hair-women.jpg",
    width: 1400,
    quality: 74,
  },
  {
    path: "public/team/hero-bg.jpg",
    width: 1600,
    quality: 76,
  },
  {
    path: "public/team/hakan-shahin.png",
    width: 900,
    quality: 82,
  },
  {
    path: "public/team/yulia-chepel.png",
    width: 900,
    quality: 82,
  },
];

const toKb = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const img of targets) {
  const before = await stat(img.path);
  const pipeline = sharp(img.path).rotate().resize({ width: img.width, withoutEnlargement: true });

  const isJpg = img.path.endsWith(".jpg") || img.path.endsWith(".jpeg");
  const tmpPath = isJpg ? `${img.path}.optimized.jpg` : `${img.path}.optimized.png`;

  if (isJpg) {
    await pipeline.jpeg({ quality: img.quality, mozjpeg: true }).toFile(tmpPath);
  } else if (img.path.endsWith(".png")) {
    await pipeline.png({ quality: img.quality, compressionLevel: 9, palette: true }).toFile(tmpPath);
  }

  await unlink(img.path);
  await rename(tmpPath, img.path);
  const after = await stat(img.path);
  console.log(`${img.path}: ${toKb(before.size)} -> ${toKb(after.size)}`);
}
