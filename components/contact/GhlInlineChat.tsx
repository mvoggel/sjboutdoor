"use client";

import { useEffect, useRef } from "react";

// GoHighLevel (LeadConnector) INLINE chat widget for the contact page.
//
// Unlike the sticky/floating widget in ChatWidgetGate (which next/script loads
// once into <body>), an inline widget must render at a specific spot in the
// page. GHL's loader places the widget adjacent to `document.currentScript`,
// so we run the loader from INSIDE this component's container — that lands the
// widget here in the content flow instead of floating in the corner.
//
// (next/script can't do this: it injects into <head>/<body>, and it would also
// dedupe against the floating widget's identical loader URL.)
const WIDGET_ID = "6a2f448ce20523fdce363757";

// GHL renders the embedded widget at a fixed ~620px width (the outer wrapper
// div inside its open shadow root carries an explicit width). Left alone it
// overflows narrow containers. We make it fluid: the host column gets
// `min-w-0` (in the contact page) so it can shrink, and we override the
// shadow wrapper width here.
const RESPONSIVE_CSS = `
  :host > div,
  .lc_text-widget {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box;
  }
`;

function makeFluid(host: HTMLElement): boolean {
  const widget = host.querySelector("chat-widget") as HTMLElement | null;
  const root = widget?.shadowRoot;
  if (!widget || !root) return false;

  widget.style.display = "block";
  widget.style.width = "100%";
  widget.style.maxWidth = "100%";

  if (!root.getElementById("sjbb-inline-responsive")) {
    const style = document.createElement("style");
    style.id = "sjbb-inline-responsive";
    style.textContent = RESPONSIVE_CSS;
    root.appendChild(style);
  }
  return true;
}

export function GhlInlineChat() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (!host.querySelector("script")) {
      // guard StrictMode double-run
      const script = document.createElement("script");
      script.src = "https://widgets.leadconnectorhq.com/loader.js";
      script.setAttribute(
        "data-resources-url",
        "https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      );
      script.setAttribute("data-widget-id", WIDGET_ID);
      host.appendChild(script);
    }

    // The widget hydrates asynchronously; poll until it mounts, then make it
    // fluid once and stop.
    if (makeFluid(host)) return;
    const id = setInterval(() => {
      if (makeFluid(host)) clearInterval(id);
    }, 300);
    const timeout = setTimeout(() => clearInterval(id), 15000);
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, []);

  // min-height reserves space so the layout doesn't jump before the widget mounts
  return <div ref={hostRef} className="w-full min-w-0" style={{ minHeight: 480 }} />;
}
