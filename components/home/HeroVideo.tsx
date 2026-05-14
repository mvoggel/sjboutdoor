"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import { assetPath } from "@/lib/asset-path";

const HERO_VIDEOS = [
  "/video/homepageloop1.MP4",
  "/video/homepageloop2.mov",
  "/video/homepageloop3.MP4",
  "/video/sjbb-home-test.MP4",
].map(assetPath);

export function HeroVideo() {
  const { openModal } = useConsultModal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFirstRender = useRef(true);
  const prefersReducedMotion = useReducedMotion();

  // Fix iOS Safari viewport height — dvh can be slightly off on some versions
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty("--hero-h", `${window.innerHeight}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  // Skip autoplay on slow / data-saver connections
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const conn = nav.connection;
    const slowConnection =
      conn?.saveData ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "slow-2g";

    if (slowConnection) {
      video.removeAttribute("autoplay");
    }
  }, []);

  // Load and play the next video whenever the index advances
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    setVideoLoaded(false);
    video.load();
    video.play().catch(() => {});
  }, [currentIndex]);

  const handleVideoEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden"
      style={{ height: "var(--hero-h, 100dvh)", minHeight: "600px" }}
    >
      {/* Background fallback */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--rich-deep)" }}
        aria-hidden="true"
      />

      {/* Hero video */}
      <video
        ref={videoRef}
        src={HERO_VIDEOS[currentIndex]}
        aria-hidden="true"
        autoPlay
        muted
        playsInline
        poster={assetPath("/video/hero-poster.jpg")}
        onLoadedData={() => setVideoLoaded(true)}
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: videoLoaded ? 1 : 0 }}
      />

      {/* Minimal overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,26,31,0.25) 0%, rgba(14,26,31,0.25) 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Scroll indicator — bottom-center */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex justify-center"
        style={{ zIndex: 2, paddingBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {/* Chevron — two lines meeting at a point, no body */}
          <svg
            width="22"
            height="12"
            viewBox="0 0 22 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L11 11L21 1"
              stroke="rgba(252,251,247,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* CTA — centered on mobile, bottom-left on desktop */}
      <div
        className="absolute bottom-0 left-0 right-0 flex justify-center md:justify-start"
        style={{ zIndex: 2, paddingBottom: "clamp(4rem, 10vh, 6rem)" }}
      >
        <div className="w-full md:max-w-7xl md:mx-auto px-4 sm:px-6 lg:px-8 flex justify-center md:justify-start">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => openModal()}
              className="inline-flex items-center justify-center gap-2 rounded-none px-8 py-4 transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink-primary)]"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 450,
                fontSize: "1rem",
                letterSpacing: "0.15em",
                background: "var(--ink-primary)",
                color: "var(--bg-pure)",
                border: "1px solid rgba(252, 251, 247, 0.65)",
              }}
            >
              Schedule a Consultation
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
