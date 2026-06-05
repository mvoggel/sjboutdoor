# Pergola Builder — interactive 3D configurator (v1)

A live, in-browser 3D louvered-pergola customizer. Users orbit the model and
change size, frame color, louver tilt, privacy screens, and lighting — every
option updates the 3D in real time. Built to eventually embed on the site via
`<iframe>`.

**Status:** working v1 with **placeholder product data**. Geometry, controls,
and live updates all function. Visual fidelity of detail props (light fixtures,
post caps, fan) is intentionally simple until real specs/assets land.

Preview locally: `npm run dev` → http://localhost:3000/experiments/pergola-builder

---

## Architecture (why it's built this way)

A louvered pergola is parametric box geometry, so the frame is generated
**procedurally in Three.js** rather than baked in Blender. That's what makes
size / blade-count / tilt / color / screens update instantly — a frozen Blender
export can't resize or re-count blades live. Blender's role (next phase) is to
author the **non-parametric detail props** (LED fixtures, fan, post base caps,
motor housing) as small glTF assets that get dropped into this procedural frame.

Stack: `three` + `@react-three/fiber` + `@react-three/drei`, React 19, Next 16.
Static-export safe (the page is client-only via `dynamic(..., { ssr:false })`).

## Files

| File                | Role                                                                 |
|---------------------|----------------------------------------------------------------------|
| `page.tsx`          | Route entry. Client-only dynamic import of the studio.               |
| `PergolaStudio.tsx` | Canvas, lighting, environment, camera, ground, holds config state.   |
| `PergolaModel.tsx`  | The procedural pergola mesh — posts, beams, blades, screens, lights. |
| `ControlsPanel.tsx` | The options UI (inline-styled so it's independent of host CSS).      |
| `config.ts`         | **⭐ All product data lives here.** Edit this to swap placeholders.   |
| `types.ts`          | Shared TypeScript types.                                             |

## Swapping placeholders for real data

Almost everything is in **`config.ts`**, tagged with `TODO(real)`:

1. **Frame colors** — names are real (R-Blade), hex values are eyeballed.
   Replace `FRAME_COLORS[].hex` with true powder-coat codes. Wood-grain needs a
   real texture instead of the flat brown.
2. **Screen colors** — `SCREEN_COLORS` is entirely invented. Replace with your
   actual swatch names + hex + how opaque each reads.
3. **Light fixtures** — `LIGHT_OPTIONS` is warm/neutral white only. Confirm
   fixture type (under-blade strip vs. recessed pucks) — affects `PergolaModel`.
4. **Blade profile** — `BLADE` (face width / thickness / gap). Count auto-scales
   from these.
5. **Size envelope** — `SIZE` ranges came from the pricing table; adjust if the
   true min/max differ.

## Verified against the 2025 collection PDF

Specs below are now CONFIRMED from the Azenco PDF (not guesses):
- Colors: White / Black / Dark Gray / Wood Grain / Custom (Bronze is NOT R-Blade)
- Posts: 6.5"×6.5" → 8"×8"; max single zone 22'10" × 16'
- Lighting families: LED Ramps, LED Strips, Recessed Lights, Solar-Powered
- Privacy: Fixed Privacy Wall, Operable (louvered) Privacy Wall, Integrated
  Screen, Sliding Glass Door
- Detail trims: Corbel, Cornice, Accessory Beam, Base Plate Cover

Built so far from that: perimeter cornice LED + recessed downlights, base-plate
covers, cornice lip, correct post size, correct palette.

## Multi-zone, photorealism & TV (added)

- **Multi-zone bays** — `bays` (1–3) repeats the louvered roof along the width
  with shared posts + cross beams. Total span = `widthFt × bays` (mirrors the
  pricing table, e.g. 20×20 = 2 bays). Per-bay independent tilt is a future add.
- **Photorealism** — `meshPhysicalMaterial` (clearcoat powder-coat sheen,
  env reflections); outdoor **park HDRI** backdrop via drei `<Environment>`;
  procedural **wood-grain** canvas texture (`textures.ts`) for the Wood Grain
  finish. Camera **auto-frames** on size/bay/mount changes via drei `<Bounds>`.
- **Wall-mount TV** — a glowing ~75" outdoor TV centerpiece appears on the wall
  when mount = wall (`WallTv` in `PergolaModel.tsx`).

> ⚠️ The park HDRI streams from the drei/poly-haven CDN at runtime. For a
> production embed, self-host the HDRI (and the wood texture as a real photo).

## Blender → glTF props pipeline (live)

The hybrid plan's Blender half is working. Geometry is authored in Blender,
exported to `public/experiments/pergola-builder/props/props.glb`, then loaded
with `useGLTF` and **instanced** in `PergolaModel.tsx` — R3F applies the live
frame material to the glTF geometry, so color still swaps.

- Authored so far: **BasePlate** (flared foot skirt), **PostCap** (post→beam
  capital). Both instanced at every post.
- To add a prop: model it in Blender, name the object, re-export the same
  `props.glb` with both/all props selected, then reference `nodes.<Name>.geometry`.
- Asset URLs are basePath-aware (`BASE` const) for the static export.

Next props to author: angled **corbel bracket**, molded **cornice profile**,
**recessed light fixture** + **LED ramp** housing.

## Known limitations / next steps

- Privacy screens are flat translucent panels; PDF shows an **operable louvered
  privacy wall** as a distinct option — worth modeling separately.
- Lighting is one combined look; could split into the 4 real fixture families.
- Corbels / accessory beam / decorative cornice profile are simplified boxes —
  prime candidates for Blender-authored glTF props.
- Fans / heaters / gutters / sliding glass doors not modeled yet.
- Multi-zone & special-cut configurations not built (single zone only).
- No live price readout — pricing-table data exists and could wire in here.
- Background is a fixed studio gradient; "adjustable background" (photo/scene)
  is a planned toggle.
## Embedding (live)

- **Embeddable route:** `/embed/pergola-builder` — chrome-free, `noindex`,
  fills the iframe. The root layout's floating ChatWidget is gated off for
  `/embed/*` (and the experiments route) via `components/ui/ChatWidgetGate.tsx`.
- **Demo + snippet:** `/pergola-builder-demo` shows the builder embedded in a
  host page with a copy-paste `<iframe>` snippet.
- Drop-in:
  ```html
  <iframe src="https://YOUR-SITE.com/embed/pergola-builder"
    width="100%" height="680" style="border:0;border-radius:14px"
    title="Pergola Builder" loading="lazy" allowfullscreen></iframe>
  ```

> Before going live: self-host the park HDRI + (eventual) wood photo so the
> embed has no external CDN dependency.
