"""
Blender batch render — SJBB Outdoors awning visualizer.

Renders 24 photoreal variants of the retractable awning at locked camera/lighting,
varying only frame color, fabric, valance shape, and open/closed state.

Usage:
  Open Blender, load awning-scene.blend, open this file in the Scripting workspace,
  click Run Script.

  OR from CLI:
    blender awning-scene.blend --background --python batch_render.py

Output: WebP files written directly to /public/visualizer/awnings/.
Blender 3.6+ supports WebP natively — no conversion step needed.

Naming contract: object and material names in your .blend file MUST match the
constants below. See BLENDER_SETUP.md, Phase 3.
"""

import bpy
import os
from itertools import product

# ─────────────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────────────

OUTPUT_BASE = "/Users/voggel/Desktop/sjbboutdoor/public/visualizer/awnings"

FRAMES = ["white", "beige", "bronze"]
VALANCES = ["straight", "sea-wave"]
FABRICS = ["linen", "marine-blue", "equate-cashmere"]

FRAME_MATERIAL = {
    "white": "Frame_White",
    "beige": "Frame_Beige",
    "bronze": "Frame_Bronze",
}
FABRIC_MATERIAL = {
    "linen": "Fabric_Linen",
    "marine-blue": "Fabric_MarineBlue",
    "equate-cashmere": "Fabric_EquateCashmere",
}

FRAME_OBJ = "Awning_Frame"
FABRIC_OBJ = "Awning_Fabric"
VALANCE_STRAIGHT_OBJ = "Valance_Straight"
VALANCE_WAVE_OBJ = "Valance_SeaWave"
OPEN_RIG_OBJ = "Awning_Open"
CLOSED_RIG_OBJ = "Awning_Closed"

RESOLUTION_X = 2000
RESOLUTION_Y = 1400
SAMPLES = 256
WEBP_QUALITY = 90  # 0-100. 90 = visually lossless for photos, ~150-250 KB at 2000x1400

# ─────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────

def set_material(obj_name, material_name):
    if obj_name not in bpy.data.objects:
        raise RuntimeError(f"Missing object '{obj_name}'. Check Phase 3c in BLENDER_SETUP.md")
    if material_name not in bpy.data.materials:
        raise RuntimeError(f"Missing material '{material_name}'. Check Phase 3d in BLENDER_SETUP.md")
    obj = bpy.data.objects[obj_name]
    mat = bpy.data.materials[material_name]
    if obj.data.materials:
        obj.data.materials[0] = mat
    else:
        obj.data.materials.append(mat)

def set_visible(obj_name, visible):
    if obj_name not in bpy.data.objects:
        raise RuntimeError(f"Missing object '{obj_name}'. Check Phase 3c in BLENDER_SETUP.md")
    obj = bpy.data.objects[obj_name]
    obj.hide_render = not visible
    obj.hide_viewport = not visible

def render_to(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    bpy.context.scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    print(f"  saved -> {path}")

def setup_render_settings():
    scene = bpy.context.scene
    scene.render.resolution_x = RESOLUTION_X
    scene.render.resolution_y = RESOLUTION_Y
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "WEBP"
    scene.render.image_settings.color_mode = "RGB"
    scene.render.image_settings.quality = WEBP_QUALITY
    if scene.render.engine == "CYCLES":
        scene.cycles.samples = SAMPLES

# ─────────────────────────────────────────────────────────────────────
# Render loops
# ─────────────────────────────────────────────────────────────────────

def render_open_variants():
    set_visible(OPEN_RIG_OBJ, True)
    set_visible(CLOSED_RIG_OBJ, False)
    for frame, valance, fabric in product(FRAMES, VALANCES, FABRICS):
        print(f"[OPEN] frame={frame} valance={valance} fabric={fabric}")
        set_material(FRAME_OBJ, FRAME_MATERIAL[frame])
        set_material(FABRIC_OBJ, FABRIC_MATERIAL[fabric])
        set_visible(VALANCE_STRAIGHT_OBJ, valance == "straight")
        set_visible(VALANCE_WAVE_OBJ, valance == "sea-wave")
        path = os.path.join(OUTPUT_BASE, "open", valance, f"{frame}-{fabric}.webp")
        render_to(path)

def render_closed_variants():
    set_visible(OPEN_RIG_OBJ, False)
    set_visible(CLOSED_RIG_OBJ, True)
    for frame, valance in product(FRAMES, VALANCES):
        print(f"[CLOSED] frame={frame} valance={valance}")
        set_material(FRAME_OBJ, FRAME_MATERIAL[frame])
        set_visible(VALANCE_STRAIGHT_OBJ, valance == "straight")
        set_visible(VALANCE_WAVE_OBJ, valance == "sea-wave")
        path = os.path.join(OUTPUT_BASE, "closed", valance, f"{frame}.webp")
        render_to(path)

# ─────────────────────────────────────────────────────────────────────
# Entry
# ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    setup_render_settings()
    render_open_variants()
    render_closed_variants()
    total = len(FRAMES) * len(VALANCES) * len(FABRICS) + len(FRAMES) * len(VALANCES)
    print(f"\nDone. {total} WebP renders written to {OUTPUT_BASE}.")
