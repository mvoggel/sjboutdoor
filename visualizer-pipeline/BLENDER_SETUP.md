# Blender Setup — SJBB Awning Visualizer

This is the production pipeline for the 24-render awning visualizer image set.
Everything in this folder is **build-time tooling**. None of it ships in the Next.js build.

Final renders land in `/public/visualizer/awnings/...` and become the only thing the website serves.

---

## Output target (the contract)

The website expects exactly these 24 files. The Python script in `batch_render.py` writes to these paths automatically — do not rename anything.

**Open state (18 files):**
```
public/visualizer/awnings/open/straight/white-linen.webp
public/visualizer/awnings/open/straight/white-marine-blue.webp
public/visualizer/awnings/open/straight/white-equate-cashmere.webp
public/visualizer/awnings/open/straight/beige-linen.webp
public/visualizer/awnings/open/straight/beige-marine-blue.webp
public/visualizer/awnings/open/straight/beige-equate-cashmere.webp
public/visualizer/awnings/open/straight/bronze-linen.webp
public/visualizer/awnings/open/straight/bronze-marine-blue.webp
public/visualizer/awnings/open/straight/bronze-equate-cashmere.webp
public/visualizer/awnings/open/sea-wave/white-linen.webp
public/visualizer/awnings/open/sea-wave/white-marine-blue.webp
public/visualizer/awnings/open/sea-wave/white-equate-cashmere.webp
public/visualizer/awnings/open/sea-wave/beige-linen.webp
public/visualizer/awnings/open/sea-wave/beige-marine-blue.webp
public/visualizer/awnings/open/sea-wave/beige-equate-cashmere.webp
public/visualizer/awnings/open/sea-wave/bronze-linen.webp
public/visualizer/awnings/open/sea-wave/bronze-marine-blue.webp
public/visualizer/awnings/open/sea-wave/bronze-equate-cashmere.webp
```

**Closed state (6 files — fabric not visible, so no fabric variation):**
```
public/visualizer/awnings/closed/straight/white.webp
public/visualizer/awnings/closed/straight/beige.webp
public/visualizer/awnings/closed/straight/bronze.webp
public/visualizer/awnings/closed/sea-wave/white.webp
public/visualizer/awnings/closed/sea-wave/beige.webp
public/visualizer/awnings/closed/sea-wave/bronze.webp
```

All renders: **2000×1400 px**, WebP, ~150–250 KB each.

---

## Phase 1 — Install + first-time setup

1. Download Blender 4.x from [blender.org/download](https://www.blender.org/download/). Free, runs on macOS.
2. Open Blender, accept defaults. Switch to the **Rendering** workspace tab (top bar).
3. Set render engine to **Cycles** (Properties panel → Render → Engine). Eevee is faster but won't hold up at this quality bar.
4. Enable GPU rendering if your Mac supports Metal: Preferences → System → Cycles Render Devices → Metal → check your GPU.

That's it for Phase 1. Blender 3.6+ outputs WebP natively, so no extra image-conversion tools needed.

---

## Phase 2 — Source assets

### 2a. The awning 3D model

**Confirm what you actually sell before modeling.** Your site lists Phantom Screens (for screens) and Azenco (pergolas), but no specific awning brand. Match the model to the real product or your visualizer lies to customers.

Options ranked:
1. **Manufacturer asset request** — call your supplier rep. Many awning brands have 3D CAD files they hand to architects. Free if you ask.
2. **Buy on [TurboSquid](https://turbosquid.com) or [CGTrader](https://www.cgtrader.com)** — search "retractable awning" or "cassette awning". Budget $30–80. Required features:
   - Separate meshes for **frame**, **fabric**, **valance**, **casing**
   - At least one open and one retracted pose (or rig you can pose yourself)
   - Quad-based topology if you can find it (subdivides cleanly)
3. **Model it yourself** — 6–10 hrs your first time. Skip unless you enjoy this.

### 2b. The HDRI (lighting environment)

Free, professional HDRIs at [polyhaven.com/hdris](https://polyhaven.com/hdris). Recommended:
- **`kloofendal_43d_clear_puresky`** — clean midday sun, good shadows
- **`venice_sunset`** — warmer late-afternoon mood, premium feel

Download the **2K or 4K HDR** version. Save anywhere on your machine.

### 2c. Fabric texture maps

This is the part most renders get wrong. **Do not eyedrop a hex color and call it fabric** — Sunbrella-style outdoor canvas has woven texture, fiber sheen, and dye variation that flat colors can't fake.

For the 3 fabrics in Phase 1 (Linen, Marine Blue, Equate Cashmere):
1. **Ask your manufacturer for digital swatches.** Most have hi-res scans or fabric library PDFs. If they give you a PDF, screenshot each swatch at the largest size and crop to a clean square.
2. **Fallback:** photograph physical swatches on a flat surface under diffuse light, against a neutral grey card. Color-correct to grey card in Photoshop.
3. **Tile-test:** open the swatch in Photoshop → Filter → Other → Offset (50%/50%) → check the seam. If it tiles cleanly, save as `linen.jpg`, `marine-blue.jpg`, `equate-cashmere.jpg` in `visualizer-pipeline/textures/`.

### 2d. House backplate (optional but recommended)

Two options for the environment behind the awning:

- **Easy:** one photo of a real installation, dropped in as a camera background. You only render the awning in 3D; the house is photographic. Best balance of effort to realism.
- **Hard:** model a simple house wall + deck. Reusable, but adds ~6–8 hrs.

Save your chosen backplate as `visualizer-pipeline/backplate.jpg` if going the easy route.

---

## Phase 3 — Scene setup (THE CRITICAL PART)

The whole visualizer illusion depends on **every render using identical camera, lighting, and environment.** Set these once, lock them, never touch again.

### 3a. Camera lock

1. Add a camera (Shift+A → Camera).
2. Set focal length to **40mm** (Properties → Camera Data → Lens → Focal Length). 35–50mm is the believable range for architectural shots.
3. Position the camera to frame the awning at ~30° down angle, ~25° off-axis. Reference photo: your inspiration image is close to right.
4. **Lock it.** Select the camera → press `N` to open the side panel → pin Item tab → write down the X/Y/Z location and rotation. If you bump it accidentally, restore from these values.
5. Set output resolution: Properties → Output → Resolution X=2000, Y=1400, %=100.

### 3b. HDRI + sun lamp

1. Switch to the **Shading** workspace (top bar).
2. In the World shader editor: replace the default Background node with **Environment Texture** → load your HDRI file.
3. Add a **Sun lamp** to the scene (Shift+A → Light → Sun). Rotate it to match the HDRI's sun direction (look at where shadows fall in the HDRI preview). Strength 2.0–4.0 for a sharp shadow.
4. **Lighting check:** render once with no awning visible. The house/ground should look believable. If not, fix now — you cannot fix lighting after 24 renders are baked.

### 3c. Object naming convention (must match exactly)

The Python script finds objects by name. Rename your imported awning meshes to these exact strings (case-sensitive):

| Object name             | What it is                                          |
|-------------------------|-----------------------------------------------------|
| `Awning_Frame`          | The metal arms and roller — gets frame color        |
| `Awning_Fabric`         | The canvas sheet — gets fabric color                |
| `Valance_Straight`      | The straight-cut bottom edge                        |
| `Valance_SeaWave`       | The wave-cut bottom edge                            |
| `Awning_Open`           | Parent empty containing the extended awning meshes  |
| `Awning_Closed`         | Parent empty containing the retracted casing meshes |

If your downloaded model uses different names, rename in the Outliner (double-click). Both `Valance_Straight` and `Valance_SeaWave` should exist as separate objects — the script toggles visibility between them.

For `Awning_Open` vs `Awning_Closed`: you need two configurations of the awning. Either:
- **Two separate meshes** (one extended, one retracted) parented to two empties, OR
- **One mesh with a shape key or armature** — but then you'll need to modify the script to drive the rig.

The simple route: model/source both poses, group each under an empty named as above. The script just toggles which group is visible.

### 3d. Materials (must match exactly)

Create 3 frame materials and 3 fabric materials. Names matter — the script looks them up by name.

| Material name              | Type    | Setup                                                                                  |
|----------------------------|---------|----------------------------------------------------------------------------------------|
| `Frame_White`              | Metal   | Principled BSDF, Base Color `#E8E5DC`, Metallic 0.8, Roughness 0.35                    |
| `Frame_Beige`              | Metal   | Principled BSDF, Base Color `#C9B79C`, Metallic 0.8, Roughness 0.35                    |
| `Frame_Bronze`             | Metal   | Principled BSDF, Base Color `#6B4628`, Metallic 0.9, Roughness 0.30                    |
| `Fabric_Linen`             | Fabric  | Principled BSDF, Base Color = `textures/linen.jpg` (Image Texture), Roughness 0.85     |
| `Fabric_MarineBlue`        | Fabric  | Principled BSDF, Base Color = `textures/marine-blue.jpg`, Roughness 0.85               |
| `Fabric_EquateCashmere`    | Fabric  | Principled BSDF, Base Color = `textures/equate-cashmere.jpg`, Roughness 0.85           |

For fabric materials, also wire a Bump node from the same image texture into Normal (Bump strength 0.05–0.10) to give the weave depth. Optional but worth the 5 minutes.

---

## Phase 4 — Run the batch render

1. **Save your `.blend` file** as `visualizer-pipeline/awning-scene.blend`.
2. Open the **Scripting** workspace (top bar).
3. In the text editor: Open → select `batch_render.py` from `visualizer-pipeline/`.
4. Edit the `OUTPUT_BASE` variable at the top to match your machine if needed (default assumes the repo lives at `/Users/voggel/Desktop/sjbboutdoor`).
5. **Test with one render first.** Comment out the `render_open_variants()` and `render_closed_variants()` calls at the bottom. Run just one variant manually from the Python console to confirm everything looks right.
6. When happy, uncomment and run the full script. Expect 5–15 min per render on a modern Mac (so ~2–6 hrs total for 24 renders). Lower `SAMPLES` to 128 for faster previews.

The script writes WebP files directly to `/public/visualizer/awnings/...` — no conversion step. Adjust `WEBP_QUALITY` at the top of the script if you want smaller files (try 80) or higher fidelity (try 95).

---

## Phase 5 — QA checklist

Before declaring done, A/B compare swaps in a quick HTML preview. The eye picks up drift instantly. Open two renders in adjacent tabs and flip between them:

- [ ] Does the **shadow on the ground/wall** stay identical between two frame-color variants? (It must — only the frame color changes.)
- [ ] Does the **house geometry, plants, and sky** stay pixel-identical? (Should be — same scene file.)
- [ ] Does the **valance edge cleanly differ** between straight and sea-wave variants of the same frame+fabric?
- [ ] Does the **fabric texture** read as fabric (not flat color) on a hi-res monitor?
- [ ] In closed state, is the **cassette/casing visible** and the awning clearly retracted (not just invisible)?

If any of these fail, fix once and re-batch. Don't ship a half-consistent set.

---

## What happens next

Once all 24 WebPs are in `/public/visualizer/awnings/...`, the next step is the UI shell at `/app/products/retractable-awnings/visualizer/` (or wherever we decide to embed). I'll build:

- The option selector matching your mockup (frame chips, fabric swatches, state toggle, valance toggle)
- Image preloading so swaps are instant
- Framer Motion fade between variants
- Mobile responsive layout

Ping me when you have at least one variant rendered — I can start scaffolding the UI against placeholder paths even before all 24 are done.
