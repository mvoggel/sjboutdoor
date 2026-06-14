# Shade Reveal — Blender Experiment

A test build for a homepage parallax/animation showing a motorized shade closing over a garage opening.

**Status:** Experiment. Not wired into the homepage. Lives in isolation under `/blender-experiments/` (this folder) and `/app/experiments/shade-reveal/` (the preview page).

---

## What this is

Using two pixel-matched photos of the same garage — one with shades open (cars visible inside), one with shades down — we build a short Blender animation that:

1. Starts on the "open" frame
2. Animates the shade rolling down from the header housing
3. Lands on the "closed" frame
4. (Optional) Subtle camera dolly for depth/parallax feel

Render target: **1920×1280 WebM**, ~3 seconds, loopable.

Output lands at `/public/experiments/shade-reveal/shade-close.webm` — the React component picks it up automatically.

---

## Folder layout

```
blender-experiments/shade-reveal/
├── README.md               ← you are here
├── BLENDER_STEPS.md        ← beginner walkthrough, follow this
├── scene.blend             ← created during step 3 (gitignored)
└── renders/                ← Blender writes here during preview renders

public/experiments/shade-reveal/
├── garage-open.png         ← drop the open-state photo here
├── garage-closed.png       ← drop the closed-state photo here
└── shade-close.webm        ← final render output (gitignored until you're happy)

app/experiments/shade-reveal/
├── page.tsx                ← visit /experiments/shade-reveal to preview
└── ShadeReveal.tsx         ← the component itself
```

---

## How to use this

1. **Save the two source photos** to `public/experiments/shade-reveal/` as `garage-open.png` and `garage-closed.png` (exact names — the component looks for these).
2. **Start the dev server** (`npm run dev`) and visit [http://localhost:3000/experiments/shade-reveal](http://localhost:3000/experiments/shade-reveal). You'll see a CSS placeholder animation using the two photos. This lets you evaluate the *concept* without Blender first.
3. **If the concept feels right**, open `BLENDER_STEPS.md` and follow it. Blender produces a higher-fidelity render with proper easing, optional parallax, and lighting nuance the CSS version can't match.
4. **Drop the rendered WebM** at `public/experiments/shade-reveal/shade-close.webm`. The component auto-detects it and swaps in the video.

---

## Why this approach

- **CSS placeholder first** so you see the idea in the browser in ~2 minutes, before committing time to Blender.
- **Blender as the upgrade path** for visual fidelity (motion blur on the rolling shade, subtle camera parallax, lighting shift) that CSS can't do.
- **Fully isolated** — deleting this folder + `/app/experiments/shade-reveal/` + `/public/experiments/shade-reveal/` removes the experiment with zero impact on the live site.
