# Shade Explode — scroll-driven exploded-view hero

A visually-driven scroll animation for the **Exterior Shades** page: a closed
motorized roll screen that, as the viewer scrolls, rolls its screen up fast and
then comes apart into an engineering-accurate exploded view — hood, end caps,
mounting brackets, roll tube, bronze drive gear + steel pinion, cradle idler,
side tracks, weighted bottom bar, and scattered fasteners — all drifting up and
dissipating into nothing. Because the frames are transparent, the parts appear
to scatter up into the page above.

**Status:** Live. Rendered into the page via `<ShadeExplodeScroll />`.

## How it works (pipeline)

1. **`build_explode.py`** procedurally builds the shade in Blender 5.1 from the
   SUNPRO technical drawings (real cross-sections: 5.5" quarter-round housing,
   1.89×1.55 side-track channel, HD 1.16×3.00 bottom bar) and renders a
   transparent **WebP frame sequence**. Every part's transform is computed
   analytically by `explode(t)` from scroll progress `t∈[0,1]` — no keyframes —
   so the animation is deterministic and easy to retune.
2. Frames land in `/public/experiments/shade-explode/frames/frame_####.webp`
   (90 frames, ~2 MB total, transparent).
3. **`components/products/ShadeExplodeScroll.tsx`** preloads the sequence and
   scrubs it onto a `<canvas>` tied to scroll position inside a sticky/pinned
   section. Reduced-motion shows the closed still (frame 0).

## Re-rendering

```bash
# full sequence (production)
/Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
  --python blender-experiments/shade-explode/build_explode.py -- \
  --frames 90 --res 1000 1360 --samples 48 \
  --out public/experiments/shade-explode/frames

# quick test (few frames, low res/samples)
... -- --test 0 28 60 85 --res 620 850 --samples 16 --out /tmp/se_test
```

Renders headless via the Blender binary (no live MCP / no display needed).
EEVEE-Next (`BLENDER_EEVEE`), AgX, transparent film.

## Tuning the choreography

All in `build_explode.py`:

- `ROLL_LO/ROLL_HI` — when the screen rolls up (fast).
- `EXP_LO/EXP_HI` — the explode window (currently most of the scroll).
- `SPREAD` — global multiplier on how far parts fly.
- `FADE_LO/FADE_HI` — parts stay opaque while flying, fade only at the end.
- Per-part travel/spin/stagger live in the `reg(...)` calls inside `build_unit`.

Component scrub length: `height: 320vh` on the track in `ShadeExplodeScroll.tsx`
(longer track = slower scrub).

## Note

This is distinct from `blender-experiments/shade-reveal/` (an unrelated
garage open/closed photo-wipe experiment).
