"use client";

import { useEffect } from "react";

// GoHighLevel (LeadConnector) embedded contact form for the contact page.
//
// GHL serves the form as an <iframe>; its companion `form_embed.js` listens for
// postMessage events from the iframe and resizes its height to fit the content
// (which is why the iframe itself has scrolling disabled). We load that script
// once on mount. The iframe `id` must stay in sync with what GHL generated so
// the resizer can target it.
const FORM_SRC = "https://api.leadconnectorhq.com/widget/booking/LJFb67v3zZK2bpuxiGie";
const FORM_ID = "FUvbZVZsxYR2JHZlX33s_1781812987630";
const EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";

export function GhlContactForm() {
  useEffect(() => {
    // Load the resizer script once; guard against StrictMode double-run and
    // against the script already being present from a previous mount.
    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return;
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      src={FORM_SRC}
      id={FORM_ID}
      title="Contact SJB Outdoor Living"
      scrolling="no"
      // min-height reserves space so the layout doesn't jump before the
      // resizer script sets the real height.
      style={{ width: "100%", border: "none", overflow: "hidden", minHeight: 600 }}
    />
  );
}
