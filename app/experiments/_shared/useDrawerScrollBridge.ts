"use client";

import { useRef } from "react";

/**
 * Mobile-only glue for the visualizer's options drawer.
 *
 * The builder runs inside a fixed-size, same-origin iframe on the product page.
 * A desktop mouse wheel chains across the iframe boundary (scroll the panel to
 * its end and the parent page keeps going), but a touch drag never does — it
 * stays trapped in the iframe. That makes the page feel un-scrollable past the
 * visualizer on phones.
 *
 * This hook watches the drawer's touch drags and, once the drawer is scrolled
 * to its top/bottom edge, forwards the remaining delta to the parent window so
 * the page keeps scrolling. It only touches the drawer — the 3D canvas keeps
 * its own orbit/zoom gestures untouched.
 *
 * Spread the returned props onto the scrollable drawer element and give that
 * element `overscroll-behavior: contain` so its own rubber-band doesn't fight
 * the forwarded scroll.
 */
export function useDrawerScrollBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const lastY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    lastY.current = e.touches[0]?.clientY ?? null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const el = ref.current;
    if (!el || lastY.current == null) return;
    const y = e.touches[0]?.clientY ?? lastY.current;
    const dy = lastY.current - y; // > 0 : finger up → page should scroll down
    lastY.current = y;

    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

    // Only take over once the drawer can't scroll further in this direction.
    if ((dy > 0 && atBottom) || (dy < 0 && atTop)) {
      try {
        const parent = window.parent;
        // `behavior: instant` overrides the page's CSS `scroll-behavior: smooth`
        // so each forwarded delta lands immediately and tracks the finger 1:1
        // instead of queuing laggy, self-cancelling smooth animations.
        if (parent && parent !== window)
          parent.scrollBy({ top: dy, left: 0, behavior: "instant" });
      } catch {
        /* cross-origin parent — nothing we can do, leave it to the browser */
      }
    }
  };

  const onTouchEnd = () => {
    lastY.current = null;
  };

  return { ref, onTouchStart, onTouchMove, onTouchEnd };
}
