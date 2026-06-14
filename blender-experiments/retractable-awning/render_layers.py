"""
Retractable Awning — Blender layer renderer (reference-matched, v4)
==================================================================

Reproducible build + render of the 2D awning-builder's compositing layers.
Run inside Blender 5.x (the same code was driven live via the MCP connection).
The saved `awning_scene.blend` next to this file is the canonical snapshot.

Design intent: match the client's product reference photos — a SUBTLE, rounded
BRONZE-able hardware language (substantial rounded cassette, D-profile front bar,
flat folding arms, chunky wall brackets) on a tasteful but product-focused deck
scene (lap-siding wall, composite deck, white railing, soft green/sky beyond),
shot from two hero angles (outside 3/4 aerial; inside under-awning looking out).

Renders aligned PNG layers per view/state to:
    public/experiments/retractable-awning/layers/{view}/backdrop.png
    public/experiments/retractable-awning/layers/{view}/{state}/hardware.png
    public/experiments/retractable-awning/layers/{view}/{state}/fabric.png
    public/experiments/retractable-awning/layers/{view}/{state}/valance-{straight|wave}.png

Key techniques
--------------
* Lighting: EEVEE-Next (raytraced). A CC0 outdoor HDRI (rooitou_park) is the
  visible backyard background AND the light source — but the LIGHTING path is
  heavily DESATURATED (so the green yard doesn't colour-cast the white fabric)
  via a Light Path "Is Camera Ray" split: camera sees the full-colour HDRI, all
  other rays see the desaturated version. A sun lamp adds crisp shadows; a soft
  area fill keeps the shaded underside neutral so fabric tints read true. AgX
  "Base Contrast".
* Materials: matte-satin aluminium frame (neutral grey, tintable to White/Beige/
  Bronze/Black), white woven fabric (tintable), lap-siding wall, composite deck,
  white railing, glass, trim.
* Fabric is rendered WHITE and hardware NEUTRAL GREY so the browser multiply-
  tints them live. NOTE: the hardware reads as grey in a full-composite Blender
  preview; the bronze/etc. look only appears after the browser tints it.
* DEPTH-CORRECT SEPARATION via holdouts: each pass renders the other groups as
  holdout occluders, so per-view depth decides visibility (arms hidden under the
  fabric from the top, visible from below). Valance is its own layer with
  straight/wave variants.

To re-render: run this file. Keep config.ts (EXTENSION_STATES, FRAME_FINISHES,
VALANCE_PROFILES, view IDs, RENDER_ASPECT) in sync if you change views/states.
"""

import bpy, math, bmesh, os
from mathutils import Vector

ROOT = "/Users/voggel/Desktop/sjbboutdoor/public/experiments/retractable-awning/layers"
SCENE_NAME = "Awning_Render"
RES_X, RES_Y = 1400, 1000
CASS_Y, CASS_Z, PITCH, ARM_X = 0.20, 2.70, 0.15, 1.9
STATES = {"closed": 0.14, "half": 1.8, "open": 3.5}

# CC0 backyard HDRI (Poly Haven). Re-fetch with:
#   curl -L https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/rooitou_park_4k.hdr \
#        -o blender-experiments/retractable-awning/hdri/rooitou_park_4k.hdr
HDRI_PATH = os.path.join(os.path.dirname(__file__) if "__file__" in dir() else
                         "/Users/voggel/Desktop/sjbboutdoor/blender-experiments/retractable-awning",
                         "hdri", "rooitou_park_4k.hdr")
HDRI_ROTATION_DEG = 70.0


# ── Scene / engine ──────────────────────────────────────────────────────────
def fresh_scene():
    if SCENE_NAME in bpy.data.scenes:
        sc = bpy.data.scenes[SCENE_NAME]
        for o in list(sc.collection.objects):
            bpy.data.objects.remove(o, do_unlink=True)
    else:
        sc = bpy.data.scenes.new(SCENE_NAME)
    bpy.context.window.scene = sc
    return sc


def setup_render(sc):
    sc.render.engine = "BLENDER_EEVEE"  # EEVEE-Next in Blender 4.3+/5.x
    ev = sc.eevee
    for attr, val in [("use_raytracing", True), ("taa_render_samples", 64)]:
        if hasattr(ev, attr):
            try: setattr(ev, attr, val)
            except Exception: pass
    if hasattr(ev, "ray_tracing_options"):
        try: ev.ray_tracing_options.use_denoise = True
        except Exception: pass
    try:
        sc.view_settings.view_transform = "AgX"; sc.view_settings.look = "AgX - Base Contrast"
    except Exception:
        sc.view_settings.view_transform = "Filmic"
    sc.render.resolution_x, sc.render.resolution_y = RES_X, RES_Y
    sc.render.image_settings.file_format = "PNG"


def setup_world_sun(sc):
    w = sc.world or bpy.data.worlds.new("AW_World"); sc.world = w; w.use_nodes = True
    nt = w.node_tree
    for n in list(nt.nodes): nt.nodes.remove(n)
    out = nt.nodes.new("ShaderNodeOutputWorld")
    bg_cam = nt.nodes.new("ShaderNodeBackground")
    bg_light = nt.nodes.new("ShaderNodeBackground")
    if os.path.exists(HDRI_PATH):
        img = bpy.data.images.get(os.path.basename(HDRI_PATH)) or bpy.data.images.load(HDRI_PATH)
        env = nt.nodes.new("ShaderNodeTexEnvironment"); env.image = img
        mp = nt.nodes.new("ShaderNodeMapping")
        mp.inputs["Rotation"].default_value = (0, 0, math.radians(HDRI_ROTATION_DEG))
        tc = nt.nodes.new("ShaderNodeTexCoord")
        nt.links.new(tc.outputs["Generated"], mp.inputs["Vector"])
        nt.links.new(mp.outputs["Vector"], env.inputs["Vector"])
        nt.links.new(env.outputs["Color"], bg_cam.inputs["Color"])     # camera: full colour
        hsv = nt.nodes.new("ShaderNodeHueSaturation")
        hsv.inputs["Saturation"].default_value = 0.35; hsv.inputs["Value"].default_value = 1.0
        nt.links.new(env.outputs["Color"], hsv.inputs["Color"])
        nt.links.new(hsv.outputs["Color"], bg_light.inputs["Color"])   # lighting: desaturated
    else:
        bg_cam.inputs["Color"].default_value = (0.62, 0.72, 0.88, 1)
        bg_light.inputs["Color"].default_value = (0.80, 0.80, 0.82, 1)
    lp = nt.nodes.new("ShaderNodeLightPath")
    mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(lp.outputs["Is Camera Ray"], mix.inputs["Fac"])
    nt.links.new(bg_light.outputs["Background"], mix.inputs[1])
    nt.links.new(bg_cam.outputs["Background"], mix.inputs[2])
    nt.links.new(mix.outputs["Shader"], out.inputs["Surface"])

    bpy.ops.object.light_add(type="SUN"); sun = bpy.context.active_object
    sun.name = "AW_Sun"; sun.data.energy = 2.4; sun.data.angle = math.radians(1.0)
    sun.rotation_euler = (math.radians(50), 0, math.radians(-55))
    bpy.ops.object.light_add(type="AREA", location=(0, 3.2, 0.4))
    f = bpy.context.active_object; f.name = "AW_Fill"
    f.data.shape = "RECTANGLE"; f.data.size = 5; f.data.size_y = 3
    f.rotation_euler = (math.radians(-90), 0, 0); f.data.energy = 90


# ── Materials ───────────────────────────────────────────────────────────────
def pm(name, base, rough=0.5, metal=0.0):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*base, 1)
    b.inputs["Roughness"].default_value = rough; b.inputs["Metallic"].default_value = metal
    return m


def wave_bump(mat, direction, scale, strength, profile="SIN"):
    nt = mat.node_tree; b = nt.nodes["Principled BSDF"]
    w = nt.nodes.new("ShaderNodeTexWave"); w.wave_type = "BANDS"
    w.bands_direction = direction; w.wave_profile = profile
    w.inputs["Scale"].default_value = scale
    bump = nt.nodes.new("ShaderNodeBump"); bump.inputs["Strength"].default_value = strength
    nt.links.new(w.outputs["Fac"], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], b.inputs["Normal"])


def build_materials():
    M = {}
    M["metal"] = pm("AW_Metal", (0.62, 0.62, 0.62), rough=0.4, metal=0.15)   # matte-satin, tintable
    fab = pm("AW_Fabric", (0.93, 0.93, 0.92), rough=0.82)
    if "Sheen Weight" in fab.node_tree.nodes["Principled BSDF"].inputs:
        fab.node_tree.nodes["Principled BSDF"].inputs["Sheen Weight"].default_value = 0.4
    M["fabric"] = fab
    M["siding"] = pm("AW_Siding", (0.86, 0.83, 0.77), rough=0.85); wave_bump(M["siding"], "Z", 22, 0.35, "SAW")
    M["deck"] = pm("AW_Deck", (0.46, 0.44, 0.41), rough=0.7); wave_bump(M["deck"], "X", 20, 0.15)
    M["rail"] = pm("AW_Rail", (0.92, 0.92, 0.90), rough=0.5)
    M["glass"] = pm("AW_Glass", (0.05, 0.07, 0.09), rough=0.05)
    M["trim"] = pm("AW_Trim", (0.95, 0.95, 0.93), rough=0.5)
    return M


# ── Geometry helper ─────────────────────────────────────────────────────────
def box(name, size, loc, mat, bevel=0.0, rot=(0, 0, 0), segs=2):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.active_object; o.name = name
    o.scale = (size[0] / 2, size[1] / 2, size[2] / 2); o.rotation_euler = rot
    bpy.ops.object.transform_apply(scale=True, rotation=True)
    if bevel > 0:
        m = o.modifiers.new("b", "BEVEL"); m.width = bevel; m.segments = segs
        bpy.ops.object.modifier_apply(modifier=m.name)
    o.data.materials.append(mat); return o


# ── Environment: siding wall + door + windows + deck + white railing ────────
def build_environment(sc, M):
    box("AWB_Wall", (14, 0.3, 5.4), (0, -0.05, 2.7), M["siding"])
    box("AWB_DoorFrame", (1.95, 0.16, 2.35), (-2.4, 0.12, 1.2), M["trim"])
    box("AWB_DoorGlass", (1.75, 0.06, 2.15), (-2.4, 0.18, 1.18), M["glass"])
    box("AWB_DoorMull", (0.05, 0.07, 2.15), (-2.4, 0.2, 1.18), M["trim"])
    box("AWB_WinFrame", (1.25, 0.14, 1.2), (1.3, 0.12, 1.7), M["trim"])
    box("AWB_WinGlass", (1.05, 0.06, 1.0), (1.3, 0.18, 1.7), M["glass"])
    for i, px in enumerate((-2.0, 0.0, 2.0)):  # upper-floor windows
        box(f"AWB_UWinF{i}", (0.95, 0.12, 1.25), (px, 0.12, 4.25), M["trim"])
        box(f"AWB_UWinG{i}", (0.78, 0.06, 1.05), (px, 0.18, 4.25), M["glass"])
    box("AWB_Deck", (16, 13, 0.12), (0, 5.2, -0.06), M["deck"])
    # white deck railing along the far edge
    box("AWB_RailTop", (12.4, 0.12, 0.09), (0, 7.9, 1.02), M["rail"], bevel=0.02)
    box("AWB_RailBot", (12.4, 0.10, 0.06), (0, 7.9, 0.18), M["rail"])
    for i, px in enumerate((-6, -2, 2, 6)):
        box(f"AWB_Post{i}", (0.13, 0.15, 1.15), (px, 7.9, 0.55), M["rail"], bevel=0.02)
    bal = box("AWB_Bal", (0.035, 0.035, 0.82), (-6.0, 7.9, 0.55), M["rail"])
    arr = bal.modifiers.new("arr", "ARRAY"); arr.count = 68
    arr.use_relative_offset = True; arr.relative_offset_displace = (5.0, 0, 0)
    bpy.ops.object.select_all(action="DESELECT"); bal.select_set(True)
    sc.view_layers[0].objects.active = bal
    bpy.ops.object.modifier_apply(modifier="arr")


# ── Awning rig (AWH_ hardware, AWF_ panel, AWV_ valance) ─────────────────────
def rm(sc, prefixes):
    for o in list(sc.collection.objects):
        if o.name.startswith(prefixes):
            bpy.data.objects.remove(o, do_unlink=True)


def panel(sc, M, P):
    drop = PITCH * P; zf = CASS_Z - drop
    y0, z0 = 0.30, CASS_Z + 0.05; y1, z1 = max(P, 0.14), zf + 0.09
    W, nx, ny, Aw = 4.9, 24, 22, 0.04
    me = bpy.data.meshes.new("AWF_PanelM"); bm = bmesh.new(); V = []
    for j in range(ny + 1):
        t = j / ny; y = y0 + t * (y1 - y0); z = z0 + t * (z1 - z0); row = []
        for i in range(nx + 1):
            u = -W / 2 + W * i / nx; wn = (u + W / 2) / W
            sag = Aw * math.sin(math.pi * wn) * (0.5 + 0.5 * t)
            row.append(bm.verts.new((u, y, z - sag)))
        V.append(row)
    for j in range(ny):
        for i in range(nx):
            bm.faces.new((V[j][i], V[j][i + 1], V[j + 1][i + 1], V[j + 1][i]))
    bm.normal_update(); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new("AWF_Panel", me); sc.collection.objects.link(o)
    o.data.materials.append(M["fabric"]); sc.view_layers[0].objects.active = o
    bpy.ops.object.shade_smooth(); return z1, y1, W


def build_valance(sc, M, z1, y1, W, profile):
    rm(sc, ("AWV_",))
    Hv, nx, freq = 0.13, 64, 7
    As = 0.05 if profile == "wave" else 0.0
    me = bpy.data.meshes.new("AWV_M"); bm = bmesh.new(); top = []; bot = []
    for i in range(nx + 1):
        u = -W / 2 + W * i / nx; wn = i / nx
        scal = As * (0.5 - 0.5 * math.cos(2 * math.pi * freq * wn))
        top.append(bm.verts.new((u, y1 + 0.02, z1)))
        bot.append(bm.verts.new((u, y1 + 0.04, z1 - Hv + scal)))
    for i in range(nx):
        bm.faces.new((top[i], top[i + 1], bot[i + 1], bot[i]))
    bm.normal_update(); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new("AWV_Valance", me); sc.collection.objects.link(o)
    o.data.materials.append(M["fabric"])


def build_awning(sc, M, P):
    """Rounded bronze-able cassette + end caps + D front bar + flat folding arms
    + wall brackets (AWH_) and fabric panel (AWF_). Returns (z1, y1, W)."""
    rm(sc, ("AWH_", "AWF_", "AWV_"))
    drop = PITCH * P; zf = CASS_Z - drop; P = max(P, 0.14); am = M["metal"]
    box("AWH_WallPlate", (5.1, 0.06, 0.40), (0, 0.02, CASS_Z), am)
    box("AWH_Cassette", (5.0, 0.34, 0.34), (0, CASS_Y + 0.02, CASS_Z), am, bevel=0.14, segs=5)
    for i, sx in enumerate((-2.54, 2.54)):
        box(f"AWH_Cap{i}", (0.15, 0.38, 0.38), (sx, CASS_Y + 0.02, CASS_Z), am, bevel=0.14, segs=5)
    box("AWH_FrontBar", (5.2, 0.16, 0.22), (0, P, zf), am, bevel=0.09, segs=5)
    for i, sx in enumerate((-ARM_X, ARM_X)):
        box(f"AWH_Brkt{i}", (0.18, 0.20, 0.30), (sx, 0.05, CASS_Z - 0.12), am, bevel=0.03)
        sh = Vector((sx, 0.16, CASS_Z - 0.15)); wr = Vector((sx, P, zf - 0.05))
        el = (sh + wr) / 2 + Vector((0, 0, -0.06))
        for k, (a, b) in enumerate(((sh, el), (el, wr))):
            mid = (a + b) / 2; d = b - a; L = d.length; ang = math.atan2(d.z, d.y)
            box(f"AWH_Arm{i}_{k}", (0.06, L, 0.10), tuple(mid), am, rot=(-ang, 0, 0))
    return panel(sc, M, P)


# ── Cameras (match the two reference angles) ────────────────────────────────
def make_cam(sc, name, loc, look, lens):
    cam = bpy.data.objects.get(name)
    if cam: bpy.data.objects.remove(cam, do_unlink=True)
    cd = bpy.data.cameras.new(name); cam = bpy.data.objects.new(name, cd)
    sc.collection.objects.link(cam); cam.location = loc
    cam.rotation_euler = (Vector(look) - Vector(loc)).normalized().to_track_quat("-Z", "Y").to_euler()
    cd.lens = lens; return cam


# ── Render passes ───────────────────────────────────────────────────────────
def render_to(sc, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    sc.render.filepath = path; bpy.ops.render.render(write_still=True)


def show_backdrop(sc):
    for o in sc.collection.objects:
        if o.type == "MESH":
            o.hide_render = not o.name.startswith("AWB_"); o.is_holdout = False


def render_holdout(sc, target, occluder, path):
    for o in sc.collection.objects:
        if o.type != "MESH": continue
        if o.name.startswith(target): o.hide_render = False; o.is_holdout = False
        elif o.name.startswith(occluder): o.hide_render = False; o.is_holdout = True
        else: o.hide_render = True
    sc.render.film_transparent = True; sc.render.image_settings.color_mode = "RGBA"
    render_to(sc, path)


def main():
    sc = fresh_scene()
    setup_render(sc)
    setup_world_sun(sc)
    M = build_materials()
    build_environment(sc, M)
    cam_out = make_cam(sc, "AW_Cam_Outside", (3.4, 9.2, 4.3), (-0.4, 1.6, 2.7), 45)
    cam_in = make_cam(sc, "AW_Cam_Inside", (1.6, 0.5, 1.55), (-0.4, 5.5, 2.78), 18)
    views = {"outside": cam_out, "inside": cam_in}

    z1, y1, W = build_awning(sc, M, 3.5)
    build_valance(sc, M, z1, y1, W, "wave")
    for v, cam in views.items():
        sc.camera = cam
        sc.render.film_transparent = False; sc.render.image_settings.color_mode = "RGB"
        show_backdrop(sc)
        render_to(sc, os.path.join(ROOT, v, "backdrop.png"))

    for state, P in STATES.items():
        z1, y1, W = build_awning(sc, M, P)
        build_valance(sc, M, z1, y1, W, "wave")
        for v, cam in views.items():
            sc.camera = cam
            render_holdout(sc, ("AWH_",), ("AWF_", "AWV_"), os.path.join(ROOT, v, state, "hardware.png"))
            render_holdout(sc, ("AWF_",), ("AWH_", "AWV_"), os.path.join(ROOT, v, state, "fabric.png"))
        for profile in ("straight", "wave"):
            build_valance(sc, M, z1, y1, W, profile)
            for v, cam in views.items():
                sc.camera = cam
                render_holdout(sc, ("AWV_",), ("AWH_", "AWF_"),
                               os.path.join(ROOT, v, state, f"valance-{profile}.png"))

    for o in sc.collection.objects:
        if o.type == "MESH": o.hide_render = False; o.is_holdout = False
    print("Awning layers rendered to", ROOT)


if __name__ == "__main__":
    main()
