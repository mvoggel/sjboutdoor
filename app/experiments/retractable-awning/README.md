# Awning Builder — interactive retractable-awning configurator (v3)

A **real-time 3D** configurator for SunPro **Traditional** (folding-arm) motorized
retractable awnings. Users orbit a live WebGL model and change everything
instantly: **fabric** (the full 30 in-stock Sunbrella line, real swatch
textures), **valance** (sea-wave / straight), **frame finish** (White / Beige /
Bronze / Black), **width** (10′–40′) and **projection** (8′ / 10′ / 12′), watch it
**extend / retract** with an eased animation, toggle the **integrated LED arm
lights** (dimmable), and flip between an **Outside** view (standing in the yard)
and an **Inside** view (sitting underneath, looking out). Built to embed via
`<iframe>`, mirroring the pergola builder.

Preview locally: `npm run dev` → http://localhost:3000/experiments/retractable-awning

---

## Architecture (why it's real-time 3D)

This is a **live three.js scene** (React Three Fiber), not pre-rendered images.
That's what makes open/close smooth, the size sliders real, and inside↔outside a
camera move rather than a re-render. It follows the **pergola builder** pattern:
the awning geometry is generated **procedurally in three.js** (so it's parametric
and animatable), and the detailed hardware can later be swapped for a
**Blender-authored glTF prop** for finer fidelity — geometry only, with R3F still
applying the live finish material.

Stack: `three` + `@react-three/fiber` + `@react-three/drei`, React 19, Next 16.
Client-only via `dynamic(..., { ssr:false })` (R3F can't SSR); static-export safe.

## Files

| File                | Role                                                                          |
|---------------------|-------------------------------------------------------------------------------|
| `page.tsx`          | Route entry. Client-only dynamic import of the studio.                        |
| `AwningStudio.tsx`  | `<Canvas>`, lighting, HDRI environment, house wall + ground, camera rig (Outside/Inside presets), responsive layout (side panel on desktop, bottom drawer on mobile), floating view + extend/retract controls. Holds `config` state. |
| `AwningModel.tsx`   | **The procedural awning** — cassette, folding arms (2-bone IK) + elbow, front bar, parametric fabric panel, scalloped/straight valance, LED arm strips. Eased open/close each frame. |
| `ControlsPanel.tsx` | The options UI (inline-styled, host-CSS-independent; works as side panel or in the mobile drawer). |
| `config.ts`         | **⭐ All product data lives here.** 30 fabrics, finishes, valances, sizes, hardware dimensions, defaults. |
| `types.ts`          | Shared TypeScript types (pure data — reusable by a future price calc / quote payload). |

Fabric swatch textures: `public/experiments/retractable-awning/fabrics/<id>.png`
— the 30 in-stock Sunbrella swatches, cropped from the official fabric card.

## Product data

- **Fabrics** (`config.ts` → `FABRICS`): the full **30 in-stock Sunbrella** line,
  grouped Tan/Beige · Blues · Greens · Reds/Browns · Grey/Black, with real stock
  numbers, sampled average hex, and an auto-classified `stripe` flag. The actual
  swatch image is used as the fabric texture, so stripes "just work." 300+ custom
  fabrics also exist (not enumerated).
- **Frame finishes** (`FRAME_FINISHES`): White / Beige / Bronze / Black.
  TODO(real): swap hex for true powder-coat RAL codes.
- **Valance** (`VALANCES`): removable Sea-Wave or Straight.
- **Sizes** (`SIZE`): width 10′–40′, projection 8′ / 10′ / 12′.
- **Hardware proportions** (`HW`): cassette / arm / front-bar / valance dims,
  pitch, and the sea-wave scallop — matched to the SunPro reference photos.

## Embedding

- **Embeddable route:** `/embed/retractable-awning` — chrome-free, `noindex`,
  fills the iframe; reuses this same `AwningStudio`. The floating ChatWidget is
  gated off for this + the experiments route via `components/ui/ChatWidgetGate.tsx`.
- Drop-in:
  ```html
  <iframe src="https://YOUR-SITE.com/sjboutdoor/embed/retractable-awning"
    width="100%" height="680" style="border:0;border-radius:14px"
    title="Awning Builder" loading="lazy" allowfullscreen></iframe>
  ```

## Next steps / ideas

- **Blender-authored hardware GLB** — replace the procedural cassette/arm/front-bar
  with a detailed glTF prop (the pergola-builder pattern) for close-up realism.
- **Cross-arm family** — a second model for the narrow/deep cross-arm line.
- **Lead capture** — hand the chosen config off to the consult/quote flow.
- **Front drop screen** — the multi-use front bar accessory.
- **Real powder-coat + dimension data** to replace the reasoned `HW` proportions.
- Old v2 lived as a 2D layer compositor; its Blender layer renders still sit under
  `public/experiments/retractable-awning/layers/` and can be deleted once v3 ships.
