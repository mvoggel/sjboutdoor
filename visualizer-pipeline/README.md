# visualizer-pipeline/

Build-time tooling for generating the awning visualizer image set. **Not part of the website build** — Next.js never imports anything from this folder. Safe to ignore until you're ready to render.

## Contents

| File                | Purpose                                                                |
|---------------------|------------------------------------------------------------------------|
| `BLENDER_SETUP.md`  | Step-by-step setup for first-time Blender users. Start here.           |
| `batch_render.py`   | Blender Python script that batch-renders all 24 variants.              |
| `awning-scene.blend`| Your Blender file — not in git, you create this during Phase 3 setup.  |
| `textures/`         | Fabric texture maps (linen, marine-blue, equate-cashmere). You add.    |

## Output destination

All renders write to `/public/visualizer/awnings/...` — those are the files the website serves.

## Adding more fabrics later

When you expand from 3 fabrics to 6 (or all 30):

1. Add a row to `FABRICS` and `FABRIC_MATERIAL` at the top of `batch_render.py`.
2. Add the fabric texture file to `textures/`.
3. Create the corresponding `Fabric_<Name>` material in your `.blend`.
4. Re-run the script — only new variants are rendered (existing PNGs get overwritten with identical output, so it's idempotent).
