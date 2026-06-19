"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// We use GoHighLevel's (LeadConnector) hosted chat widget as the floating
// bottom-right launcher. It renders its own bubble + chat UI and handles
// conversations / lead capture natively, so the custom <ChatWidget /> is
// retired (the file is kept in the repo as a future fully-branded option).
//
// Full-screen tool/embed routes should not load the widget — its floating
// bubble would overlay the builder and bleed into <iframe> embeds.
const HIDE_ON = [
  "/embed",
  "/experiments/pergola-builder",
  "/experiments/retractable-awning",
];

// The widget renders into an OPEN shadow root on a <chat-widget> element
// (not a cross-origin iframe), so we can inject our own stylesheet to control
// the text size. NOTE: rem is resolved against the *document* root (20px on
// this site) even inside the shadow root, so we use an explicit px value to get
// the size we actually want rather than a doubled-up rem.
const FONT_SIZE = "16px";

function injectFontOverride() {
  const widget = document.querySelector("chat-widget");
  const root = widget?.shadowRoot;
  if (!root) return false;

  let style = root.getElementById("sjbb-font-override") as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = "sjbb-font-override";
    root.appendChild(style);
  }
  // Scope to text-bearing nodes; the rule also applies to elements GHL adds
  // later (conversation messages, form fields) since it lives in the shadow root.
  // Catch-all under the widget root so the rule also covers the expanded
  // conversation view (message bubbles, inputs, buttons) whose class names
  // differ from the collapsed prompt.
  style.textContent = `
    .lc_text-widget,
    .lc_text-widget * { font-size: ${FONT_SIZE} !important; line-height: 1.5 !important; }
  `;
  return true;
}

export function ChatWidgetGate() {
  const pathname = usePathname();
  const hidden = pathname ? HIDE_ON.some((p) => pathname.startsWith(p)) : false;

  // The web component hydrates asynchronously after loader.js runs, so poll
  // briefly until the shadow root exists, then inject once and stop.
  useEffect(() => {
    if (hidden) return;
    if (injectFontOverride()) return;
    const id = setInterval(() => {
      if (injectFontOverride()) clearInterval(id);
    }, 300);
    const timeout = setTimeout(() => clearInterval(id), 15000);
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <Script
      id="ghl-chat-widget"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6a349dd97214fce3458208b8"
      strategy="lazyOnload"
    />
  );
}
