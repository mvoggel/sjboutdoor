import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { BRAND_NAME, PHONE_DISPLAY, EMAIL, SITE_URL } from "@/lib/site";
import type { DesignResponseMessage } from "@/lib/design-bridge";

// Brand palette (mirrors the site's gold / ink tokens).
const GOLD = rgb(184 / 255, 146 / 255, 74 / 255);
const INK = rgb(0.13, 0.13, 0.13);
const MUTED = rgb(0.42, 0.42, 0.42);
const HAIRLINE = rgb(0.85, 0.83, 0.78);

const PAGE = { w: 612, h: 792 }; // US Letter, points
const MARGIN = 54;

/**
 * Builds a branded, single-page PDF of the user's visualizer selections — a 3D
 * snapshot plus a spec table. Runs entirely in the browser (pdf-lib has no
 * native deps). Returns raw PDF bytes ready to wrap in a Blob for download.
 *
 * If `snapshot` is null (capture failed / timed out) the image block is skipped
 * and the spec sheet still generates, so the download never dead-ends.
 */
export async function buildDesignPdf(
  payload: DesignResponseMessage,
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([PAGE.w, PAGE.h]);
  const body = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let y = PAGE.h - MARGIN;

  // ── Header: wordmark + product title ──────────────────────────────────────
  page.drawText(BRAND_NAME.toUpperCase(), {
    x: MARGIN,
    y,
    size: 16,
    font: bold,
    color: INK,
  });
  y -= 16;
  page.drawText("YOUR CUSTOM DESIGN", {
    x: MARGIN,
    y,
    size: 8,
    font: body,
    color: GOLD,
  });
  // Gold rule under the header.
  y -= 12;
  page.drawRectangle({ x: MARGIN, y, width: PAGE.w - MARGIN * 2, height: 1.5, color: GOLD });
  y -= 26;

  page.drawText(payload.title, { x: MARGIN, y, size: 22, font: bold, color: INK });
  y -= 30;

  // ── Snapshot ──────────────────────────────────────────────────────────────
  if (payload.snapshot) {
    try {
      const png = await doc.embedPng(payload.snapshot);
      const maxW = PAGE.w - MARGIN * 2;
      const maxH = 300;
      const scale = Math.min(maxW / png.width, maxH / png.height);
      const w = png.width * scale;
      const h = png.height * scale;
      const x = MARGIN + (maxW - w) / 2;
      page.drawImage(png, { x, y: y - h, width: w, height: h });
      // Hairline frame around the render.
      page.drawRectangle({
        x,
        y: y - h,
        width: w,
        height: h,
        borderColor: HAIRLINE,
        borderWidth: 1,
      });
      y -= h + 26;
    } catch {
      // Corrupt/oversized image — fall through to the spec table only.
    }
  }

  // ── Spec table ─────────────────────────────────────────────────────────────
  page.drawText("SELECTIONS", { x: MARGIN, y, size: 9, font: bold, color: GOLD });
  y -= 16;

  const labelX = MARGIN;
  const valueX = MARGIN + 150;
  for (const row of payload.summary) {
    page.drawText(row.label, { x: labelX, y, size: 10, font: bold, color: MUTED });
    drawWrapped(page, row.value, valueX, y, PAGE.w - valueX - MARGIN, body, 10, INK);
    y -= 22;
    page.drawLine({
      start: { x: MARGIN, y: y + 6 },
      end: { x: PAGE.w - MARGIN, y: y + 6 },
      thickness: 0.5,
      color: HAIRLINE,
    });
  }

  // ── Footer: contact + CTA ───────────────────────────────────────────────────
  const footY = MARGIN + 8;
  page.drawRectangle({ x: MARGIN, y: footY + 30, width: PAGE.w - MARGIN * 2, height: 1, color: HAIRLINE });
  page.drawText("Ready to make it real?", { x: MARGIN, y: footY + 14, size: 10, font: bold, color: INK });
  page.drawText(`${PHONE_DISPLAY}   ·   ${EMAIL}   ·   ${SITE_URL.replace(/^https?:\/\//, "")}`, {
    x: MARGIN,
    y: footY,
    size: 9,
    font: body,
    color: MUTED,
  });

  return doc.save();
}

/** Wrap a value string to a max width, drawing extra lines below the baseline. */
function drawWrapped(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  maxW: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
) {
  const words = text.split(/\s+/);
  let line = "";
  let cursorY = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxW && line) {
      page.drawText(line, { x, y: cursorY, size, font, color });
      line = word;
      cursorY -= size + 3;
    } else {
      line = test;
    }
  }
  if (line) page.drawText(line, { x, y: cursorY, size, font, color });
}
