"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";

const OPEN_SRC = assetPath("/experiments/shade-reveal/garage-open.png");
const CLOSED_SRC = assetPath("/experiments/shade-reveal/garage-closed.png");
const VIDEO_SRC = assetPath("/experiments/shade-reveal/shade-close.webm");

type Mode = "loading" | "video" | "css-fallback" | "missing-assets";

export function ShadeReveal() {
  const prefersReducedMotion = useReducedMotion();
  const [mode, setMode] = useState<Mode>("loading");
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const probeVideo = fetch(VIDEO_SRC, { method: "HEAD" })
      .then((res) => res.ok)
      .catch(() => false);

    const probeImages = Promise.all(
      [OPEN_SRC, CLOSED_SRC].map(
        (src) =>
          new Promise<boolean>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
          }),
      ),
    ).then((results) => results.every(Boolean));

    Promise.all([probeVideo, probeImages]).then(([hasVideo, hasImages]) => {
      if (cancelled) return;
      if (hasVideo) setMode("video");
      else if (hasImages) setMode("css-fallback");
      else setMode("missing-assets");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ aspectRatio: "3 / 2" }}
    >
      {mode === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">
          Loading…
        </div>
      )}

      {mode === "missing-assets" && (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <div className="max-w-md text-white/80 text-sm leading-relaxed">
            <p className="font-medium mb-2">Source photos not found.</p>
            <p className="text-white/60">
              Save the two garage photos to{" "}
              <code className="font-mono text-xs bg-white/10 px-1.5 py-0.5 rounded">
                /public/experiments/shade-reveal/
              </code>{" "}
              as{" "}
              <code className="font-mono text-xs bg-white/10 px-1.5 py-0.5 rounded">
                garage-open.png
              </code>{" "}
              and{" "}
              <code className="font-mono text-xs bg-white/10 px-1.5 py-0.5 rounded">
                garage-closed.png
              </code>
              , then reload.
            </p>
          </div>
        </div>
      )}

      {mode === "video" && (
        <video
          autoPlay={!prefersReducedMotion && inView}
          muted
          playsInline
          loop
          src={VIDEO_SRC}
          poster={OPEN_SRC}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {mode === "css-fallback" && (
        <CssFallback
          inView={inView}
          prefersReducedMotion={!!prefersReducedMotion}
        />
      )}
    </div>
  );
}

function CssFallback({
  inView,
  prefersReducedMotion,
}: {
  inView: boolean;
  prefersReducedMotion: boolean;
}) {
  // Animate clip-path of the "closed" image from 0% height (hidden) to 100% (fully revealed).
  // The shade appears to drop from the top edge of the frame.
  const animate = inView && !prefersReducedMotion;

  return (
    <>
      {/* Back layer: open garage */}
      <img
        src={OPEN_SRC}
        alt="Garage with motorized shades open, cars visible inside"
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
      />

      {/* Front layer: closed garage, masked from top */}
      <motion.img
        src={CLOSED_SRC}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={
          animate
            ? { clipPath: "inset(0 0 0% 0)" }
            : { clipPath: "inset(0 0 100% 0)" }
        }
        transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />

      {/* Placeholder badge — clearly marks this as the CSS preview, not the Blender render */}
      <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 text-white/80 text-[10px] font-mono uppercase tracking-wider">
        CSS preview · Blender render not yet placed
      </div>
    </>
  );
}
