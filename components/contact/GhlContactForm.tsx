"use client";

import { useEffect } from "react";

// GoHighLevel (LeadConnector) embedded contact form for the contact page.
//
// GHL serves the form as an <iframe>; its companion `form_embed.js` reads the
// iframe's data-* attributes and resizes its height to fit the content. We load
// that script once on mount. The id / data-* values must stay in sync with what
// GHL generated so the resizer can target the right frame.
//
// NOTE: the form markup lives INSIDE the iframe on GHL's origin, so our site's
// CSS can't reach it (cross-origin). Field/label/button styling has to be done
// in GHL's form builder. From here we can only style the iframe "frame" itself
// (size, border, radius, background).
const FORM_SRC = "https://api.leadconnectorhq.com/widget/form/dWCX7qTjzqEf606AvfYS";
const FORM_ID = "inline-dWCX7qTjzqEf606AvfYS";
const FORM_HEIGHT = 1223;
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
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name="WebForm_v1"
      data-height={FORM_HEIGHT}
      data-layout-iframe-id={FORM_ID}
      data-form-id="dWCX7qTjzqEf606AvfYS"
      // height seeds the layout (the resizer overwrites it once it measures the
      // real content), so the page doesn't jump on load.
      style={{
        width: "100%",
        height: FORM_HEIGHT,
        border: "none",
        borderRadius: 8,
        overflow: "hidden",
        // Matches the form's green Custom CSS surface so there's no cream
        // flash before the embedded form paints.
        background: "var(--rich-deep)",
      }}
    />
  );
}
