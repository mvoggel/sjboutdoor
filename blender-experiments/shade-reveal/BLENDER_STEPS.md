# Blender Walkthrough — Shade Reveal Animation

First-time Blender user, ~45 minutes start to finish. Assumes Blender 4.x installed.

The technique: stack two photos as planes in a 3D scene, animate a mask between them so the shade appears to roll down, optionally add a subtle camera push for parallax. Render to WebM.

You won't model anything. No sculpting, no rigging. Just planes, materials, keyframes, and render settings.

---

## 0 — Before you open Blender

Confirm both source photos are saved at:

```
/Users/voggel/Desktop/sjbboutdoor/public/experiments/shade-reveal/garage-open.png
/Users/voggel/Desktop/sjbboutdoor/public/experiments/shade-reveal/garage-closed.png
```

Both should be the same dimensions (the React component checks). If not, crop them in Preview so they match before continuing.

---

## 1 — Blender first-launch sanity (5 min)

1. Open Blender. Accept defaults.
2. **Delete the default cube**: click it in the 3D viewport, press `X` → confirm.
3. Top bar → switch workspace from **Layout** to **Shading** (you'll need the node editor later).
4. Render engine: right-side Properties panel → click the camera-back icon (Render Properties) → **Render Engine: Cycles**. Eevee is faster but won't give you the subtle lighting we want.
5. (Optional, Mac with Apple Silicon) Edit → Preferences → System → Cycles Render Devices → **Metal** → check your GPU.
6. **Save now**: File → Save As → navigate to `/Users/voggel/Desktop/sjbboutdoor/blender-experiments/shade-reveal/` → name it `scene.blend`. Save often (Cmd+S).

---

## 2 — Set up the camera and output (3 min)

We want a fixed render that matches the photo's framing.

1. Click the existing **Camera** in the Outliner (top right). Don't add a new one.
2. Press `N` to open the side panel in the 3D viewport. Item tab.
3. Set the camera **Location** to `X=0, Y=-5, Z=0` and **Rotation** to `X=90°, Y=0°, Z=0°`. (This puts the camera looking straight at the YZ plane where we'll place our photo planes.)
4. Right-side Properties → Output Properties (printer icon):
   - **Resolution X**: `1920`
   - **Resolution Y**: `1280`
   - **Frame Rate**: `30 fps`
   - **Frame Start**: `1`
   - **Frame End**: `90` (= 3 seconds at 30fps)

---

## 3 — Add the two image planes (10 min)

We're building a sandwich: the open-garage photo at the back, the closed-garage photo in front, with the front photo's alpha animated by a mask.

### 3a. The "open" plane (back)

1. `Shift+A` → Mesh → **Plane**.
2. With the plane selected, press `R` → `X` → `90` → Enter. (Rotates the plane to stand upright facing the camera.)
3. Press `S` → `3` → Enter. (Scales it up so it fills the camera view.)
4. Press `N` → Item tab → confirm Location is `X=0, Y=0, Z=0`. Rename it in the Outliner to **`Plane_Open`** (double-click to rename).
5. Aspect ratio fix: the photo is 1500×1000 (≈1.5:1) but the plane is square. Press `S` → `Y` → `1` (Y stays) — wait, we need to set X separately. Easier: in the N-panel → Item → **Scale X = 4.5**, **Scale Y = 3.0** (keeps the 1.5:1 ratio at our chosen size).

### 3b. The material for Plane_Open

1. Bottom of screen, switch the editor from default to **Shader Editor** if you're not already (Shading workspace has this at the bottom).
2. With Plane_Open selected, click **+ New** at the top of the shader editor to add a material.
3. Rename the material to `Mat_Open` in the side panel (Material Properties — sphere icon, right side).
4. In the shader editor you'll see a Principled BSDF connected to a Material Output. Press `Shift+A` → Texture → **Image Texture**.
5. The Image Texture node appears at your cursor. Click **Open** → navigate to `/Users/voggel/Desktop/sjbboutdoor/public/experiments/shade-reveal/garage-open.png` → Open.
6. Drag a noodle from Image Texture's **Color** output to Principled BSDF's **Base Color** input.
7. Switch the 3D viewport shading to **Material Preview** (top right of the 3D viewport — four sphere icons, pick the third). You should see the open-garage photo on the plane.

### 3c. The "closed" plane (front)

1. With Plane_Open selected, `Shift+D` to duplicate → right-click to cancel the move (keeps it at the same XY position).
2. Press `G` → `Y` → `-0.1` → Enter. (Moves the duplicate 10cm toward the camera so it sits in front. Tiny offset, doesn't affect parallax visibly.)
3. Rename to **`Plane_Closed`** in the Outliner.
4. Material Properties panel → click the small **2 ▼** dropdown next to the material name → **New** (this creates a *unique* material on the copy instead of sharing).
5. Rename to `Mat_Closed`.
6. In the shader editor: click the Image Texture node and change the file to `garage-closed.png`.

You now have two planes stacked. The front one (closed) hides the back one (open) entirely. Next step: animate the front plane's alpha so it reveals from top to bottom.

---

## 4 — Animate the shade reveal (15 min — the only tricky part)

We'll drive the front plane's transparency with a gradient mask that animates from "fully transparent" to "fully visible" over 90 frames.

### 4a. Build the mask in the shader graph

With Plane_Closed selected, in the Shader Editor:

1. `Shift+A` → Input → **Texture Coordinate**. Place it to the left.
2. `Shift+A` → Vector → **Mapping**. Connect Texture Coordinate's `Generated` output to Mapping's `Vector` input.
3. `Shift+A` → Texture → **Gradient Texture**. Connect Mapping's `Vector` output to Gradient Texture's `Vector` input. Set Gradient Texture's type to **Linear**.
4. `Shift+A` → Converter → **ColorRamp**. Connect Gradient Texture's `Color` output to ColorRamp's `Fac` input. The ColorRamp lets us sharpen the transition between transparent and opaque.
5. `Shift+A` → Shader → **Transparent BSDF**.
6. `Shift+A` → Shader → **Mix Shader**. Connect:
   - Transparent BSDF → top shader input of Mix Shader
   - Existing Principled BSDF → bottom shader input of Mix Shader
   - ColorRamp's `Color` output → Mix Shader's `Fac` input
   - Mix Shader's output → Material Output's `Surface` input (replacing the direct Principled BSDF connection)
7. Material Properties (right side) → Settings section → **Blend Mode: Alpha Blend** (so transparency renders correctly).

You should now see the closed-shade plane fade from invisible at the top to fully visible at the bottom, controlled by the gradient.

### 4b. Orient the gradient

The Gradient Texture's `Linear` type runs left-to-right by default. We need top-to-bottom.

1. Click the **Mapping** node. Set Rotation `Z = 90°`. The gradient now runs vertically.
2. If the closed image is now revealed bottom-up instead of top-down, set Mapping Rotation `Z = -90°` (or 270°). The shade should *appear* to drop from the top.

### 4c. Keyframe the mask

We'll animate the Mapping node's **Location Y** so the gradient slides across the plane from "all transparent" to "all opaque" over 90 frames.

1. In the timeline at the bottom, drag the playhead to **frame 1**.
2. Click the **Mapping** node. Set **Location Y = -1.0**. Hover over the Y field and press `I` to insert a keyframe (the field turns yellow).
3. Drag the playhead to **frame 90**.
4. Set Mapping **Location Y = 1.0**. Press `I` again.
5. Press `Space` to preview. The closed-shade plane should now reveal from top to bottom over 3 seconds.

### 4d. Easing (optional, makes it feel premium)

Linear motion feels robotic. Soften it:

1. Bottom editor → switch from Shader Editor to **Graph Editor** (left dropdown).
2. You'll see two keyframes connected by a line. Select both (`A`).
3. Right-click → **Interpolation Mode** → **Bezier**.
4. Right-click → **Easing Type** → **Ease Out**. The shade now decelerates as it lands — feels like a real motorized shade.

---

## 5 — Subtle camera parallax (5 min, optional)

Adds depth so the result reads as 3D, not just a photo wipe.

1. Select the camera. Frame 1 → press `I` in the viewport → **Location**. (Keyframes the starting position.)
2. Frame 90 → press `N` → set camera Location `Y = -4.8` (was -5.0, so it inches forward 20cm). Press `I` → Location.
3. Graph editor → set both keyframes to Bezier + Ease Out.

Result: the camera barely creeps toward the garage as the shade closes. Subtle but adds the "parallax" feel.

---

## 6 — Lighting (3 min)

Cycles needs at least one light source or the render will be black.

1. `Shift+A` → Light → **Sun**.
2. N-panel → Rotation `X = 45°, Y = 30°, Z = 0°`. Light Properties (lightbulb icon, right side) → **Strength = 3.0**.
3. The photos already contain baked lighting, but this Sun adds a slight directional fill that the camera move can play off of. Strictly optional — you can skip it if the test render looks fine.

---

## 7 — Test render (5 min)

Before rendering 90 frames, render just one to confirm setup.

1. Top menu: **Render → Render Image** (or `F12`).
2. Wait 30–90 seconds. A new window opens with the result.
3. **Sanity check:**
   - Does the photo fill the frame? If letterboxed, your Plane_Open scale is off. Re-do step 3a.
   - Is the closed shade visible *at all* at frame 1? It shouldn't be. If it is, your Mapping Location Y at frame 1 is wrong.
   - Drag the timeline to frame 45 and re-render. Half the shade should be down.

If the test frame looks right, proceed.

---

## 8 — Render the full animation (5–20 min depending on Mac)

1. Output Properties (printer icon):
   - **Output path**: `/Users/voggel/Desktop/sjbboutdoor/blender-experiments/shade-reveal/renders/frame_####`
   - **File Format**: PNG (we'll convert to WebM after)
   - **Color**: RGB
2. Render Properties → Sampling → Render Samples: **64** (good enough for this scene; 128 if you see noise).
3. **Render → Render Animation** (or `Ctrl+F12`). Blender writes 90 PNG files to the renders folder. Grab a coffee.

### 8a. Convert PNGs to WebM

When the PNG sequence is done, open Terminal and run:

```bash
cd /Users/voggel/Desktop/sjbboutdoor/blender-experiments/shade-reveal/renders
ffmpeg -framerate 30 -i frame_%04d.png -c:v libvpx-vp9 -b:v 0 -crf 30 -pix_fmt yuv420p ../../../public/experiments/shade-reveal/shade-close.webm
```

(If you don't have ffmpeg: `brew install ffmpeg` first.)

That writes the final WebM to `/public/experiments/shade-reveal/shade-close.webm`. The React component picks it up on the next page load.

---

## 9 — Iterate

Don't like the timing? Adjust the frame end (longer = slower close) and re-render.

Want the shade to bounce slightly when it lands? Add a third keyframe at frame 95 with Mapping Y = 0.98, easing Bounce.

Want it to loop (close → snap back to open)? Set frame end to 180, add reverse keyframes at frame 91 and 180. Then in the React component set `loop` on the `<video>`.

---

## Common gotchas

- **Render is solid black**: no lights in scene. Add a Sun (step 6) or set World Background strength higher.
- **Closed shade is sideways/upside down**: Mapping rotation Z is wrong. Try 90, -90, 180.
- **Closed shade is fully visible at frame 1**: your starting Mapping Y is on the wrong side of the gradient. Flip the sign.
- **Render is extremely slow**: drop Render Samples to 32 for previews. Bump back to 64–128 for the final.
- **WebM is huge**: increase `-crf` (try 36) for smaller file. Diminishing returns past CRF 40.
