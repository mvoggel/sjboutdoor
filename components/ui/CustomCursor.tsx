"use client";

import { useEffect, useRef } from "react";

interface Splash {
  x: number;
  y: number;
  angle: number;
  r: number;
  maxR: number;
  alpha: number;
}

const RADIUS = 16;         // 20% smaller
const RING_RADIUS = 16;
const COLOR = "18, 18, 18"; // near-black instead of grey

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Desktop/mouse only — skip on touch devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mx = -300;
    let my = -300;
    const splashes: Splash[] = [];
    let rafId: number;

    function onResize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    function onClick(e: MouseEvent) {
      const COUNT = 12;
      for (let i = 0; i < COUNT; i++) {
        splashes.push({
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 / COUNT) * i,
          r: 2,
          maxR: RING_RADIUS,
          alpha: 0.75,
        });
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Outer circle
      ctx.beginPath();
      ctx.arc(mx, my, RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, 0.12)`;
      ctx.strokeStyle = `rgba(${COLOR}, 0.7)`;
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Centre dot
      ctx.beginPath();
      ctx.arc(mx, my, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, 0.9)`;
      ctx.fill();

      // Splash particles
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.r += (s.maxR - s.r) * 0.12 + 0.4;
        s.alpha -= 0.035;

        if (s.alpha <= 0 || s.r >= s.maxR) {
          splashes.splice(i, 1);
          continue;
        }

        const px = s.x + Math.cos(s.angle) * s.r;
        const py = s.y + Math.sin(s.angle) * s.r;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR}, ${s.alpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", onResize);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
