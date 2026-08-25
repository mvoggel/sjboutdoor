"use client";

/**
 * ShadeExplodeScroll — scroll-linked exploded-view of a motorized roll screen.
 *
 * NOT pinned: the section scrolls normally and the animation is a pure function
 * of scroll depth (the frame advances as the shade travels up through the
 * viewport). The whole thing — fast roll-up + break-apart — plays in roughly a
 * single swipe, then the user keeps scrolling to the next content.
 *
 * The canvas is intentionally LARGER than its column and overflows it, so the
 * exploded parts fly beyond the box and up into the page above. Frames are a
 * transparent WebP sequence rendered by
 * blender-experiments/shade-explode/build_explode.py.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { assetPath } from "@/lib/asset-path";

const FRAME_COUNT = 90;
const STILL_FRAME = 0; // closed, fully assembled — reduced-motion / initial paint

// Render frame geometry (fractions of the 1100×1600 frame), used to align the
// assembled shade inside the column. Measured from the closed render.
const IMG_ASPECT = 1100 / 1600;
const SHADE_FW = 0.8; // assembled shade width as fraction of frame
const SHADE_CX = 0.51; // shade centre x in frame
const SHADE_CY = 0.62; // shade centre y in frame
const TARGET_W = 0.98; // shade width as fraction of the column (stage) width
const STAGE_ANCHOR_X = 0.5; // where shade centre sits in the stage (x)
const STAGE_ANCHOR_Y = 0.54; // where shade centre sits in the stage (y)

// Scroll mapping (fractions of viewport height): closed while the shade centre
// is below TRIGGER; fully exploded after it has risen DRIVE further up.
const TRIGGER = 0.6;
const DRIVE = 0.55;

const frameSrc = (i: number) =>
  assetPath(
    `/experiments/shade-explode/frames/frame_${String(i).padStart(4, "0")}.webp`,
  );

export function ShadeExplodeScroll() {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const boxRef = useRef({ w: 0, h: 0 }); // canvas client size in px
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  // ── preload the frame sequence ───────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    imagesRef.current = new Array(FRAME_COUNT).fill(null);
    let done = 0;

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!cancelled) imagesRef.current[i] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameSrc(i);
      });

    (async () => {
      await load(STILL_FRAME);
      if (!cancelled) {
        setLoaded(1);
        setReady(true);
      }
      const queue = Array.from({ length: FRAME_COUNT }, (_, i) => i).filter(
        (i) => i !== STILL_FRAME,
      );
      const CONCURRENCY = 6;
      let cursor = 0;
      const worker = async () => {
        while (cursor < queue.length && !cancelled) {
          await load(queue[cursor++]);
          done += 1;
          if (!cancelled) setLoaded(done + 1);
        }
      };
      await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // ── size + position the oversized, overflowing canvas over the stage ──────
  const layout = useCallback(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const sw = stage.clientWidth;
    const sh = stage.clientHeight;
    if (!sw || !sh) return;

    // Make canvas client aspect == image aspect (no distortion when we fill it).
    const cw = (TARGET_W * sw) / SHADE_FW; // canvas client width (px)
    const ch = cw / IMG_ASPECT; // canvas client height (px)
    // Place so the shade's centre lands on the stage anchor.
    const left = STAGE_ANCHOR_X * sw - SHADE_CX * cw;
    const top = STAGE_ANCHOR_Y * sh - SHADE_CY * ch;

    canvas.style.position = "absolute";
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;
    canvas.style.left = `${left}px`;
    canvas.style.top = `${top}px`;
    canvas.style.pointerEvents = "none";

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    boxRef.current = { w: cw, h: ch };

    if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── draw a frame (fills the canvas; falls back to nearest loaded) ─────────
  const drawFrame = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frame];
    if (!img) {
      for (let d = 1; d < FRAME_COUNT; d++) {
        img = imagesRef.current[frame - d] || imagesRef.current[frame + d];
        if (img) break;
      }
    }
    if (!img) return;

    const { w, h } = boxRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h); // aspect matches → no distortion
  }, []);

  // ── scroll → frame ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    layout();

    if (prefersReducedMotion) {
      currentFrameRef.current = STILL_FRAME;
      drawFrame(STILL_FRAME);
      return;
    }

    const update = () => {
      rafRef.current = null;
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2;
      const progress = Math.min(
        1,
        Math.max(0, (TRIGGER * vh - center) / (DRIVE * vh)),
      );
      const frame = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(progress * (FRAME_COUNT - 1))),
      );
      if (frame !== currentFrameRef.current) {
        currentFrameRef.current = frame;
        drawFrame(frame);
      }
    };

    const onScroll = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
    };
    const onResize = () => {
      layout();
      update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, prefersReducedMotion, layout, drawFrame]);

  // redraw as more frames stream in
  useEffect(() => {
    if (ready && currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
  }, [loaded, ready, drawFrame]);

  return (
    <section
      aria-label="Anatomy of a motorized roll screen"
      style={{
        position: "relative",
        overflow: "visible",
        minHeight: "86vh",
        display: "flex",
        alignItems: "center",
        background: "var(--near-black)",
        borderTop: "1px solid rgba(184,146,74,0.18)",
        borderBottom: "1px solid rgba(184,146,74,0.18)",
      }}
    >
      <div
        className="shade-explode-grid"
        style={{
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "clamp(3rem,8vh,6rem) clamp(1.25rem,4vw,3rem)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(1.5rem, 4vw, 4rem)",
          alignItems: "center",
          overflow: "visible",
        }}
      >
        {/* ── Left: copy ──────────────────────────────────────────────── */}
        <div style={{ maxWidth: "30rem", position: "relative", zIndex: 2 }}>
          <p
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(184,146,74,0.7)",
              marginBottom: "0.9rem",
            }}
          >
            Engineered, not assembled
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.7rem, 3.4vw, 3rem)",
              fontWeight: 550,
              color: "rgba(252,251,247,0.96)",
              letterSpacing: "0.01em",
              lineHeight: 1.1,
              marginBottom: "1.1rem",
            }}
          >
            Down to the last gear.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(252,251,247,0.6)",
              maxWidth: "46ch",
              lineHeight: 1.8,
              marginBottom: "1.6rem",
            }}
          >
            Keep scrolling and watch one come apart — the screen retracts, then
            the rounded cassette hood, roll tube, precision drive gear and idler,
            side tracks, and weighted bottom bar separate and scatter. Every
            component is purpose-built and Florida-engineered, then vanishes
            completely when retracted.
          </p>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem 0.75rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {[
              "Cassette hood",
              "Roll tube",
              "Drive gear",
              "Cradle idler",
              "Side tracks",
              "Weighted bottom bar",
            ].map((label) => (
              <li
                key={label}
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(252,251,247,0.55)",
                  border: "1px solid rgba(184,146,74,0.3)",
                  borderRadius: "999px",
                  padding: "0.35rem 0.8rem",
                }}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: the shade stage (canvas overflows this box) ───────── */}
        <div
          ref={stageRef}
          style={{
            position: "relative",
            height: "min(64vh, 580px)",
            width: "100%",
            overflow: "visible",
            zIndex: 1,
          }}
        >
          <canvas ref={canvasRef} style={{ display: "block" }} />
          {!ready && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(252,251,247,0.35)",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Loading…
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .shade-explode-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .shade-explode-grid > div:last-child {
            height: min(56vh, 460px) !important;
          }
        }
      `}</style>
    </section>
  );
}
