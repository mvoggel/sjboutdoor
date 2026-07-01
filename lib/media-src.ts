/**
 * Source resolver for large media (background videos).
 *
 * Cloudflare Pages caps every deployed file at 25 MiB, and the fullscreen
 * background videos far exceed that, so in production they're served from R2
 * (Cloudflare object storage) instead of being bundled into the site. Set
 * NEXT_PUBLIC_MEDIA_BASE to the R2 public URL (e.g. https://media.sjboutdoors.com)
 * in the Cloudflare Pages env.
 *
 * When NEXT_PUBLIC_MEDIA_BASE is unset (local `next dev`), this falls back to
 * serving from the app origin — the files still live in public/video on disk —
 * so local development is unchanged. Images and other small assets keep using
 * assetPath(); only video render sites use this.
 */
export const mediaSrc = (path: string): string => {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE;
  if (base) {
    // The R2 bucket stores every video FLAT at the root (filename only — the
    // upload flattened the /video, /about, /our-process folders away), so map
    // /video/<any>/name.ext -> <base>/name.ext. This relies on video filenames
    // being unique across the site (they are). If more videos are added, upload
    // them to the bucket root and keep the filename unique.
    const file = p.slice(p.lastIndexOf("/") + 1);
    return `${base.replace(/\/$/, "")}/${file}`;
  }
  // Local dev: files live in public/video (with their real subfolders) on disk.
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;
};
