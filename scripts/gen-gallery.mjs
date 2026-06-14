// Scans public/img/gallery/<category>/ and writes lib/gallery-manifest.json.
//
// Run automatically via the `predev` / `prebuild` npm scripts, or by hand:
//   node scripts/gen-gallery.mjs
//
// Filename → caption convention: "City-Name__whatever.jpg" yields caption
// "City Name". A file with no "__" gets no caption. See the README in
// public/img/gallery for details.

import { readdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const GALLERY_DIR = join(ROOT, "public", "img", "gallery");
const MANIFEST_PATH = join(ROOT, "lib", "gallery-manifest.json");
const CATEGORIES_PATH = join(ROOT, "lib", "gallery-categories.ts");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

/** Pull the ordered category slugs out of gallery-categories.ts. */
async function readCategorySlugs() {
  const src = await readFile(CATEGORIES_PATH, "utf8");
  return [...src.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((m) => m[1])
    .filter((slug) => slug !== "all");
}

/** "Fort-Myers__evening-3.jpg" -> "Fort Myers"; no "__" -> undefined. */
function captionFromFilename(file) {
  const name = basename(file, extname(file));
  const sep = name.indexOf("__");
  if (sep === -1) return undefined;
  const city = name.slice(0, sep).replace(/-/g, " ").trim();
  return city || undefined;
}

async function main() {
  const slugs = await readCategorySlugs();
  const manifest = {};

  for (const slug of slugs) {
    const dir = join(GALLERY_DIR, slug);
    let files = [];
    if (existsSync(dir)) {
      files = (await readdir(dir))
        .filter((f) => IMAGE_EXT.has(extname(f).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    }
    manifest[slug] = files.map((file) => ({
      src: `/img/gallery/${slug}/${file}`,
      caption: captionFromFilename(file),
    }));
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  const total = Object.values(manifest).reduce((n, arr) => n + arr.length, 0);
  console.log(
    `[gen-gallery] wrote ${total} photo(s) across ${slugs.length} categories → lib/gallery-manifest.json`,
  );
}

main().catch((err) => {
  console.error("[gen-gallery] failed:", err);
  process.exit(1);
});
