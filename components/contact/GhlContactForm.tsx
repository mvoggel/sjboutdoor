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
// CSS can't reach it (cross-origin). Field/label/button styling is done in GHL's
// form builder Custom CSS (green theme). From here we own the surrounding
// "frame" — the header + the card chrome below.
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
    <div
      style={{
        borderRadius: 10,
        overflow: "hidden",
        background: "var(--rich-deep)",
        border: "1px solid rgba(184,146,74,0.28)",
        // Layered shadow echoing the product-visualizer "stage" panels.
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 40px 60px -36px rgba(14,26,31,0.45), 0 14px 28px -14px rgba(14,26,31,0.3)",
      }}
    >
      {/* Frame header */}
      <div
        style={{
          padding: "1.3rem 1.6rem 1.15rem",
          borderBottom: "1px solid rgba(184,146,74,0.25)",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "0.7rem",
            fontWeight: 550,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--rich-warm)",
            marginBottom: "0.5rem",
          }}
        >
          Free consultation
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)",
            fontWeight: 550,
            lineHeight: 1.1,
            letterSpacing: "0.01em",
            color: "var(--bg-pure)",
          }}
        >
          Get in touch
        </h2>
      </div>

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
        // height seeds the layout (the resizer overwrites it once it measures
        // the real content), so the page doesn't jump on load.
        style={{
          display: "block",
          width: "100%",
          height: FORM_HEIGHT,
          border: "none",
          // Matches the form's green Custom CSS surface so there's no flash
          // before the embedded form paints.
          background: "var(--rich-deep)",
        }}
      />
    </div>
  );
}
