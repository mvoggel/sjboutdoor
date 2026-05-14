# SJBB Outdoors — Build Spec

**Project:** Marketing site for South Jersey Blinds and Beyond's outdoor luxury division (FL expansion)
**Goal:** Drive consultation bookings via a high-impact, video-led luxury site
**Audience:** Affluent FL homeowners shopping high-end outdoor living products
**Primary CTA:** "Schedule a Consultation" → form submit → GoHighLevel CRM

---

## 1. Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + CSS variables for the design tokens
- **Language:** TypeScript
- **Animation:** Framer Motion (for hero reveals + scroll triggers)
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Deployment target:** Vercel (assumed; flag if different)
- **Node:** v20+

### Why Next.js (brief)
SSR + image/video optimization out of the box, plus API routes give a clean place to proxy the GoHighLevel webhook so we never expose the API key in the browser. Like having a back office handle the paperwork instead of the showroom floor.

---

## 2. Project Scaffolding

```
sjbb-outdoors/
├── app/
│   ├── layout.tsx                # Root layout, fonts, global meta
│   ├── page.tsx                  # Homepage (POC focus)
│   ├── products/
│   │   ├── page.tsx              # Product index
│   │   ├── exterior-shades/page.tsx
│   │   ├── retractable-awnings/page.tsx
│   │   └── louvered-pergolas/page.tsx
│   ├── about/page.tsx
│   ├── service-areas/page.tsx    # FL locations
│   ├── contact/page.tsx
│   └── api/
│       └── lead/route.ts         # POST → GoHighLevel
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Top nav w/ opaque text boxes
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── home/
│   │   ├── HeroVideo.tsx         # Full-bleed video fold
│   │   ├── ProductCallouts.tsx   # 3 boxy product cards
│   │   ├── WhyUs.tsx
│   │   └── CtaBand.tsx           # Repeating "Schedule" band
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ConsultModal.tsx      # Form popup
│   │   ├── ConsultForm.tsx
│   │   └── Container.tsx
│   └── shared/
│       └── SectionHeading.tsx
├── lib/
│   ├── crm.ts                    # GoHighLevel client
│   ├── analytics.ts
│   └── validators.ts             # Zod schemas
├── public/
│   ├── video/
│   │   ├── hero.mp4              # 1920x1080, ~8-12s loop, <4MB
│   │   ├── hero.webm             # WebM/AV1 alt
│   │   └── hero-poster.jpg       # Poster fallback
│   └── img/products/
├── styles/
│   └── globals.css               # CSS vars + Tailwind layers
├── tailwind.config.ts
├── next.config.js
└── .env.local                    # GHL_API_KEY, GHL_LOCATION_ID
```

---

## 3. Design System

### 3.1 Color Palette (white-bright + rich)
Use CSS variables in `globals.css` so they're swappable later.

```css
:root {
  --bg-pure:        #FCFBF7;   /* warm white, base canvas */
  --bg-bright:      #FFFFFF;   /* hard white for product cards */
  --ink-primary:    #0E1A1F;   /* near-black w/ green undertone */
  --ink-muted:      #4A5760;
  --rich-deep:      #0B3D2E;   /* deep palm green — primary brand */
  --rich-warm:      #B8924A;   /* brushed brass accent */
  --rich-sand:      #E8DFCF;   /* sandstone — section dividers */
  --overlay-glass:  rgba(252, 251, 247, 0.78); /* nav box bg */
  --overlay-shade:  rgba(14, 26, 31, 0.45);    /* video overlay */
}
```

**Why these:** Deep palm green + brass on warm white reads "Florida coastal estate," not "tropical resort." Like the difference between a Palm Beach private home and a chain hotel lobby.

### 3.2 Typography
- **Display / Headings:** `Fraunces` (variable serif, 400/500/600 — characterful but elegant)
- **Body:** `Inter Tight` (400/500 — clean, modern, pairs well without competing)
- Load via `next/font/google` for zero CLS.

Heading scale (clamp for fluid sizing):
- H1: `clamp(2.75rem, 6vw, 5.5rem)` — Fraunces 500, -2% letter-spacing
- H2: `clamp(2rem, 4vw, 3.25rem)` — Fraunces 500
- H3: `clamp(1.25rem, 2vw, 1.75rem)` — Fraunces 500
- Body: 1.0625rem / 1.65 line-height
- Eyebrow: 0.75rem, uppercase, +8% tracking, brass color

### 3.3 Spatial / Motion
- 8px base grid
- Generous vertical rhythm: sections min `py-24 md:py-36`
- Hero reveal: stagger headline → subhead → CTA (Framer Motion, 0.15s steps)
- Hover states: subtle lift (`translateY(-2px)`) + warm shadow on cards
- Reduced motion: respect `prefers-reduced-motion` everywhere

---

## 4. Navigation

### 4.1 Structure
Top nav items: **Products · About · Service Areas · Contact**
Plus a primary CTA button: **Schedule Consultation** (opens modal)

### 4.2 Visual treatment (the "opaque box" requirement)
- **Nav is positioned absolutely over the hero video** (`position: absolute; top: 0; z-index: 10`), not in normal document flow at the top of the page. It floats on top of the video.
- Each link gets its own pill-shaped backdrop:
  - `background: var(--overlay-glass)`
  - `backdrop-filter: blur(12px)`
  - `border: 1px solid rgba(255,255,255,0.4)`
  - Padding `0.625rem 1.25rem`, radius `999px`
- Logo top-left, also in a glass pill
- On scroll past 80px (i.e., once user scrolls past the hero): nav switches to `position: fixed`, transforms into a solid `--bg-pure` bar with a thin `--rich-sand` bottom border, and the glass pills become flat text links

### 4.3 Mobile
- Hamburger (right side) opens full-screen overlay
- Overlay uses `--bg-pure` with Fraunces nav links at `2.5rem`
- Schedule CTA pinned at bottom of overlay

---

## 5. Homepage Sections (top to bottom)

### 5.1 Hero / The Fold (full viewport)
- **Background video flexes to fill the entire viewport** at any window size — width AND height — using `object-fit: cover`. The video element is positioned absolutely behind everything, sized to `100vw × 100vh` (or `100dvh` on mobile to account for browser chrome). It always crops to fill, never letterboxes.
- **Nav bar overlays the video at the top of the window** — no separate nav region above or beside the video. The nav is positioned absolutely (`position: absolute; top: 0; left: 0; right: 0; z-index: 10`) and sits directly on top of the video.
- **Video element:**
  ```jsx
  <video
    autoPlay
    muted
    loop
    playsInline
    poster="/video/hero-poster.jpg"
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/video/hero.webm" type="video/webm" />
    <source src="/video/hero.mp4" type="video/mp4" />
  </video>
  ```
- Video specs: H.264 MP4 + WebM, 1920×1080, max 4MB, 8–12s loop
- Poster image while loading; fade video in on `loadeddata`
- Overlay gradient sits between video and content: `linear-gradient(180deg, rgba(14,26,31,0.35), rgba(14,26,31,0.55))` for text legibility regardless of which video frame is showing
- **Content (centered or left-aligned, TBD in design pass), positioned over the video:**
  - Eyebrow: "South Jersey Blinds & Beyond — Florida"
  - H1: e.g. "Outdoor Living, Refined"
  - Subhead: 1–2 lines, max 24 words
  - Primary CTA: "Schedule a Consultation" (opens modal)
  - Secondary CTA: "Explore Products" (scrolls to product callouts)
- **Stacking order (z-index):** video (0) → overlay gradient (1) → hero content (2) → nav bar (10)
- **Mobile:** video still plays but compressed alt source; if data saver detected (`navigator.connection.saveData`) or `effectiveType` is `2g`/`slow-2g`, fall back to poster image. Use `100dvh` not `100vh` to handle iOS Safari's address bar correctly.

### 5.2 Product Callouts (3 boxy cards)
Below the fold. Section heading + 3 cards in a grid (`grid-cols-1 md:grid-cols-3 gap-6`).

Each card:
- Square-ish ratio (`aspect-[4/5]`), full-bleed product image
- Hover: image scales `1.04`, brass underline animates under title
- Bottom-left content block on `--bg-bright` with:
  - Eyebrow (e.g. "01 / Shade")
  - Product name (Fraunces, H3)
  - One-line descriptor
  - "Learn more →" link (brass)
- Entire card is clickable → `/products/[slug]`

Three products:
1. **Exterior Shades & Shutters** → `/products/exterior-shades`
2. **Retractable Awnings** → `/products/retractable-awnings`
3. **Louvered Pergolas** → `/products/louvered-pergolas`

### 5.3 CTA Band #1
Full-width band, `--rich-deep` background, warm white type:
- Headline: "See it in your space."
- Sub: "Free in-home consultations across Naples, Bonita Springs, and Marco Island."
- Button: "Schedule Consultation" → modal

### 5.4 Why SJBB / Trust
3–4 column row of value props (custom-fabricated, lifetime warranty, FL-licensed installers, family-owned). Icon + short copy each. Sandstone background.

### 5.5 Gallery Strip (optional for POC — flag with placeholder)
Horizontal-scroll strip of 6–8 project photos. Each opens lightbox. Mark `// TODO: post-POC` if cutting.

### 5.6 CTA Band #2 / Footer Pre-roll
Same pattern as Band #1 but inverted (warm white bg, deep green type) — visual rhythm.

### 5.7 Footer
- Logo + tagline
- Address blocks for both FL locations (placeholder — confirm addresses)
- Nav repeat
- Phone + email + hours
- Social icons
- Copyright + privacy/terms links

---

## 6. Consultation Form (the conversion engine)

### 6.1 Trigger
Every "Schedule Consultation" button anywhere on the site opens the same modal.

### 6.2 Modal behavior
- Centered, max-width `560px`, `--bg-pure` background, brass border accent
- Backdrop: `--overlay-shade` with blur
- Close on ESC, backdrop click, or X button
- Trap focus inside modal while open
- Animation: scale from 0.96 → 1.0 + fade, 0.2s

### 6.3 Fields
| Field | Type | Required | Validation |
|---|---|---|---|
| First name | text | yes | min 2 |
| Last name | text | yes | min 2 |
| Email | email | yes | valid email |
| Phone | tel | yes | US format |
| ZIP code | text | yes | 5 digits |
| Product interest | multi-select | no | array of 3 product slugs |
| Preferred contact | radio | yes | phone/email/text |
| Message | textarea | no | max 500 char |
| Consent | checkbox | yes | TCPA / SMS consent line |

### 6.4 Submission flow
1. Client validates with Zod
2. POST to `/api/lead` (Next API route)
3. Server route forwards to GoHighLevel (`POST https://services.leadconnectorhq.com/contacts/` with `Authorization: Bearer ${GHL_API_KEY}`, `Version: 2021-07-28`)
4. Map fields to GHL contact + add tags: `["sjbb-outdoors", "web-lead", <product tags>]`
5. On success: replace modal content with success state ("We'll be in touch within one business day.")
6. On failure: inline error + fallback `mailto:` link

**Why proxy through API route:** Keeps the GHL key server-side. Like never letting customers walk into the back office where the keys are kept.

### 6.5 Spam protection
- Honeypot field (hidden `<input name="website">`)
- Time-to-submit check (reject < 2s)
- Optional: Cloudflare Turnstile if abuse appears

---

## 7. Performance Targets

- Lighthouse Performance: ≥ 90 mobile, ≥ 95 desktop
- LCP: < 2.5s on 4G (poster image is the LCP candidate, not the video)
- CLS: < 0.05
- Hero video: lazy network-aware (skip auto-play on `effectiveType` = `2g`/`slow-2g`)
- Images: `next/image` everywhere, AVIF + WebP
- Fonts: `display: swap`, preload Fraunces 500

---

## 8. Accessibility

- All interactive elements keyboard reachable
- Modal: focus trap, `aria-modal`, `aria-labelledby`
- Video: `aria-hidden="true"` (decorative), no audio
- Color contrast: AA minimum on all text (the glass nav pills must hit 4.5:1 against worst-case video frames — verify with a dark poster fallback)
- Skip-to-content link
- Form: visible labels, `aria-describedby` for errors

---

## 9. SEO & Meta

- Per-page `<title>` and `<meta description>`
- Open Graph + Twitter card images (need a branded OG asset — placeholder for now)
- Schema.org `LocalBusiness` markup with both FL location addresses
- `robots.txt` + dynamic `sitemap.xml`
- Canonical URLs

---

## 10. Environment Variables

```
GHL_API_KEY=               # GoHighLevel private integration token
GHL_LOCATION_ID=           # GHL sub-account location ID
NEXT_PUBLIC_SITE_URL=https://sjbboutdoors.com
NEXT_PUBLIC_GA_ID=         # if using GA4
```

---

## 11. POC Scope (what to build first)

For the homepage proof-of-concept presentation, prioritize in this order:

1. ✅ Scaffolding + Tailwind + fonts + design tokens
2. ✅ Header (with glass nav pills) + Footer
3. ✅ Hero video fold with both CTAs
4. ✅ Product callouts (3 boxy cards, real or placeholder imagery)
5. ✅ One CTA band
6. ✅ Consultation modal + form (can stub the GHL submit with a console.log + TODO until keys arrive)
7. ⏸ Mobile menu polish
8. ⏸ Inner product pages — placeholder only
9. ⏸ Service areas, About, Contact pages — stubs

Goal: clickable, scrollable, mobile-responsive homepage demo with the form opening and validating, even if the CRM endpoint is mocked.

---

## 12. Open Questions / Inputs Needed

- [ ] Final logo files (SVG preferred)
- [ ] Hero video asset (or budget to license one — Storyblocks/Artgrid have FL coastal/pergola footage)
- [ ] Product photography (placeholder Unsplash for POC OK)
- [ ] Two FL location addresses + phone numbers
- [ ] GoHighLevel API key + Location ID
- [ ] Confirm domain: `sjbboutdoors.com`?
- [ ] Brand voice samples / existing SJBB site for tone reference
