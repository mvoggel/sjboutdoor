"""
Shade Explode — scroll-driven exploded-view animation (Blender 5.1, headless)
============================================================================

Renders a transparent WebP frame sequence of a motorized exterior roll-screen
("Open Roller 2.0"-style, tracked cassette) that, as the viewer scrolls:

  phase A (t 0.00–0.12)  closed & idle — screen fully down in the side tracks
  phase B (t 0.12–0.42)  screen ROLLS UP fast — bottom bar rises, fabric winds
                         onto the roll tube, drop shrinks to zero into the hood
  phase C (t 0.42–1.00)  the whole assembly COMES APART — exploded view: hood
                         lifts, end caps pop, brackets separate, the roll tube
                         splits from the motor, the bronze drive gear spins off,
                         tracks slide out, bottom bar tumbles, screws scatter —
                         everything drifting UP & OUTWARD, fading to nothing so
                         it dissipates up into the page above.

Engineering geometry is taken from the SUNPRO technical drawings:
  * Housing/hood cross-section (quarter-round): 5.5" × 5.5"   (Profiles sheet)
  * Side track channel: 1.89" W × 1.55" D                     (Profiles sheet)
  * HD bottom bar: 1.16" W × 3.00" H weighted bar             (Profiles sheet)
  * Components: fabric/roll tube, gear (motor) drive, cradle idler, mounting
    brackets (circular disc + hub), end caps, hood          (OpenRoller manual)

Design choice: every part's transform is computed ANALYTICALLY from the scroll
parameter t in [0,1] by explode(t) — no Blender keyframes — so the animation is
fully deterministic and trivial to retune. Each frame sets t = f/(N-1), poses
every part, sets per-part alpha, and renders one transparent WebP.

Run (full sequence):
  /Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
      --python build_explode.py -- --frames 90 --res 1100 1500 --samples 64 \
      --out /Users/voggel/Desktop/sjbboutdoor/public/experiments/shade-explode/frames

Run (quick test — just a few frames at low res/samples):
  ... --python build_explode.py -- --test 0 30 55 75 89 --res 550 750 --samples 16 --out /tmp/se_test
"""

import bpy, bmesh, math, os, sys, random
from mathutils import Vector, Euler

IN = 0.0254  # inch -> metre

# ─── CLI args (after the `--`) ───────────────────────────────────────────────
def parse_args():
    argv = sys.argv
    argv = argv[argv.index("--") + 1:] if "--" in argv else []
    a = {"frames": 90, "res": (1100, 1500), "samples": 64,
         "out": "/tmp/se_test", "test": None, "engine": "BLENDER_EEVEE"}
    i = 0
    while i < len(argv):
        k = argv[i]
        if k == "--frames": a["frames"] = int(argv[i + 1]); i += 2
        elif k == "--res": a["res"] = (int(argv[i + 1]), int(argv[i + 2])); i += 3
        elif k == "--samples": a["samples"] = int(argv[i + 1]); i += 2
        elif k == "--out": a["out"] = argv[i + 1]; i += 2
        elif k == "--engine": a["engine"] = argv[i + 1]; i += 2
        elif k == "--test":
            j = i + 1; vals = []
            while j < len(argv) and not argv[j].startswith("--"):
                vals.append(int(argv[j])); j += 1
            a["test"] = vals; i = j
        else: i += 1
    return a

# ─── easing ──────────────────────────────────────────────────────────────────
def clamp01(x): return max(0.0, min(1.0, x))
def smooth(x):  x = clamp01(x); return x * x * (3 - 2 * x)
def smoother(x): x = clamp01(x); return x * x * x * (x * (x * 6 - 15) + 10)
def ease_out(x): x = clamp01(x); return 1 - (1 - x) ** 3
def lerp(a, b, t): return a + (b - a) * t
def vlerp(a, b, t): return Vector(a).lerp(Vector(b), t)

# ─── scene / engine ──────────────────────────────────────────────────────────
def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    return bpy.context.scene

def setup_render(sc, engine, res, samples):
    sc.render.engine = engine
    if engine == "CYCLES":
        sc.cycles.samples = samples
        try: sc.cycles.use_denoising = True
        except Exception: pass
    else:
        try: sc.eevee.taa_render_samples = samples
        except Exception: pass
        for attr, val in (("use_raytracing", True), ("use_shadows", True)):
            if hasattr(sc.eevee, attr):
                try: setattr(sc.eevee, attr, val)
                except Exception: pass
        if hasattr(sc.eevee, "ray_tracing_options"):
            try: sc.eevee.ray_tracing_options.use_denoise = True
            except Exception: pass
    try:
        sc.view_settings.view_transform = "AgX"
        sc.view_settings.look = "AgX - Base Contrast"
    except Exception:
        sc.view_settings.view_transform = "Filmic"
    sc.render.resolution_x, sc.render.resolution_y = res
    sc.render.film_transparent = True
    sc.render.image_settings.file_format = "WEBP"
    sc.render.image_settings.color_mode = "RGBA"
    try: sc.render.image_settings.quality = 92
    except Exception: pass

def setup_world_lights(sc):
    w = sc.world or bpy.data.worlds.new("SE_World"); sc.world = w
    w.use_nodes = True
    bg = w.node_tree.nodes.get("Background")
    if bg:
        bg.inputs["Color"].default_value = (0.55, 0.57, 0.6, 1)
        bg.inputs["Strength"].default_value = 1.0
    # key sun
    bpy.ops.object.light_add(type="SUN"); sun = bpy.context.active_object
    sun.name = "SE_Sun"; sun.data.energy = 3.2; sun.data.angle = math.radians(2.0)
    sun.rotation_euler = Euler((math.radians(52), math.radians(8), math.radians(-48)))
    # soft front fill
    bpy.ops.object.light_add(type="AREA", location=(0.4, -3.2, 1.6))
    f = bpy.context.active_object; f.name = "SE_Fill"
    f.data.shape = "RECTANGLE"; f.data.size = 4.0; f.data.size_y = 3.0
    f.data.energy = 220; f.rotation_euler = Euler((math.radians(72), 0, math.radians(6)))
    # cool rim from back-left
    bpy.ops.object.light_add(type="AREA", location=(-2.4, 1.6, 2.2))
    r = bpy.context.active_object; r.name = "SE_Rim"
    r.data.size = 2.5; r.data.energy = 160; r.data.color = (0.8, 0.86, 1.0)
    r.rotation_euler = Euler((math.radians(-58), 0, math.radians(40)))

def make_camera(sc):
    cd = bpy.data.cameras.new("SE_Cam"); cam = bpy.data.objects.new("SE_Cam", cd)
    sc.collection.objects.link(cam)
    # Pulled back; aim near the hood so the closed shade sits centred with
    # generous headroom ABOVE for the upward explosion to fly into.
    cam.location = Vector((1.85, -3.9, 1.75))
    look = Vector((0.0, 0, 1.18))
    cam.rotation_euler = (look - cam.location).to_track_quat("-Z", "Y").to_euler()
    cd.lens = 52
    sc.camera = cam
    return cam

# ─── materials ───────────────────────────────────────────────────────────────
def pm(name, base, rough=0.5, metal=0.0, alpha=1.0):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*base, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if alpha < 1.0:
        b.inputs["Alpha"].default_value = alpha
        m.blend_method = "BLEND" if hasattr(m, "blend_method") else m.blend_method
    return m

def build_materials():
    M = {}
    M["white"]  = pm("SE_White",  (0.93, 0.93, 0.94), rough=0.30, metal=0.10)  # powder-coat alu, sleek
    M["steel"]  = pm("SE_Steel",  (0.62, 0.64, 0.68), rough=0.28, metal=0.95)  # roll tube/motor
    M["dark"]   = pm("SE_Dark",   (0.24, 0.25, 0.28), rough=0.40, metal=0.90)  # idler/internal
    M["bronze"] = pm("SE_Bronze", (0.76, 0.52, 0.25), rough=0.22, metal=1.00)  # hero drive gear
    M["fabric"] = pm("SE_Fabric", (0.14, 0.14, 0.15), rough=0.92, metal=0.0)  # flat matte screen
    return M

def set_alpha_capable(mat):
    """Ensure a material can fade (EEVEE needs blend method)."""
    try: mat.blend_method = "BLEND"
    except Exception: pass

# ─── geometry helpers ────────────────────────────────────────────────────────
def new_obj(name, mesh, mat, coll):
    o = bpy.data.objects.new(name, mesh)
    coll.objects.link(o)
    if mat: o.data.materials.append(mat)
    return o

def profile_extrude(name, pts, length, mat, coll, axis="X", smooth_sh=False):
    """Extrude a closed 2D profile (list of 2-tuples) into a solid bar.
    axis='X': profile in (Y,Z), bar runs along X, centred at origin.
    axis='Z': profile in (X,Y), bar runs along Z, base at z=0."""
    bm = bmesh.new()
    if axis == "X":
        front = [bm.verts.new((-length / 2, y, z)) for (y, z) in pts]
        back  = [bm.verts.new(( length / 2, y, z)) for (y, z) in pts]
    else:  # Z
        front = [bm.verts.new((x, y, 0.0)) for (x, y) in pts]
        back  = [bm.verts.new((x, y, length)) for (x, y) in pts]
    bm.faces.new(front); bm.faces.new(list(reversed(back)))
    n = len(pts)
    for i in range(n):
        a, b2 = front[i], front[(i + 1) % n]
        c, d = back[(i + 1) % n], back[i]
        bm.faces.new((a, b2, c, d))
    bm.normal_update()
    me = bpy.data.meshes.new(name + "M"); bm.to_mesh(me); bm.free()
    o = new_obj(name, me, mat, coll)
    if smooth_sh:
        for p in o.data.polygons: p.use_smooth = True
    return o

def add_cyl(name, r, depth, loc, mat, coll, axis="X", verts=48, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=depth, vertices=verts, location=loc)
    o = bpy.context.active_object; o.name = name
    # default cylinder is along Z; rotate to requested axis
    if axis == "X": o.rotation_euler = Euler((0, math.radians(90), 0))
    elif axis == "Y": o.rotation_euler = Euler((math.radians(90), 0, 0))
    o.rotation_euler = Euler((o.rotation_euler.x + rot[0],
                              o.rotation_euler.y + rot[1],
                              o.rotation_euler.z + rot[2]))
    bpy.ops.object.transform_apply(rotation=True)
    o.data.materials.clear(); o.data.materials.append(mat)
    bpy.ops.object.shade_smooth()
    return o

def make_gear(name, teeth, r_root, r_tip, width, bore, mat, coll):
    """Simple spur gear built with bmesh: alternating tip/root radii rim,
    extruded to `width`, with a central bore. Axis along X."""
    bm = bmesh.new()
    seg = teeth * 2
    rim_f, rim_b = [], []
    for i in range(seg):
        ang = (i / seg) * 2 * math.pi
        r = r_tip if (i % 2 == 0) else r_root
        # tooth flanks: widen the tip pair slightly handled by alternating
        y, z = r * math.cos(ang), r * math.sin(ang)
        rim_f.append(bm.verts.new((-width / 2, y, z)))
        rim_b.append(bm.verts.new(( width / 2, y, z)))
    bore_f, bore_b = [], []
    for i in range(seg):
        ang = (i / seg) * 2 * math.pi
        y, z = bore * math.cos(ang), bore * math.sin(ang)
        bore_f.append(bm.verts.new((-width / 2, y, z)))
        bore_b.append(bm.verts.new(( width / 2, y, z)))
    for i in range(seg):
        j = (i + 1) % seg
        bm.faces.new((rim_f[i], rim_f[j], rim_b[j], rim_b[i]))          # outer rim
        bm.faces.new((bore_b[i], bore_b[j], bore_f[j], bore_f[i]))      # bore wall
        bm.faces.new((rim_f[j], rim_f[i], bore_f[i], bore_f[j]))        # front ring
        bm.faces.new((rim_b[i], rim_b[j], bore_b[j], bore_b[i]))        # back ring
    bm.normal_update()
    me = bpy.data.meshes.new(name + "M"); bm.to_mesh(me); bm.free()
    return new_obj(name, me, mat, coll)

# ─── cross-section profiles (metres), from the Profiles drawing ───────────────
def hood_profile():
    """Quarter-round cassette: flat back (wall), square top + square back-bottom,
    rounded FRONT-lower corner. Profile in (Y, Z); Y+ = toward viewer/front,
    Z+ = up. 5.5in box. Matches the Profiles-sheet housing cross-section."""
    s = 5.5 * IN
    back_y, front_y = -s * 0.5, s * 0.5
    top_z, bot_z = s * 0.5, -s * 0.5
    r = s * 0.66                        # front corner radius
    cy, cz = front_y - r, bot_z + r    # arc centre
    pts = [(back_y, top_z), (front_y, top_z), (front_y, bot_z + r)]
    steps = 12
    for i in range(steps + 1):         # quarter arc: front face -> bottom face
        a = (math.pi / 2) * (i / steps)
        pts.append((cy + r * math.cos(a), cz - r * math.sin(a)))
    pts.append((back_y, bot_z))        # flat bottom back to the wall side
    return pts

def track_profile():
    """Side-track C-channel, opening toward the screen (Y+). 1.89W x 1.55D.
    Profile in (X, Y) for vertical extrude; centred so mouth faces +Y."""
    w, d, t = 1.89 * IN, 1.55 * IN, 0.16 * IN
    x0, x1 = -w / 2, w / 2
    y0, y1 = -d / 2, d / 2
    m = w * 0.30  # mouth half-gap on the +Y face
    return [(x0, y0), (x1, y0), (x1, y1), (m, y1),
            (m, y1 - t), (x1 - t, y1 - t), (x1 - t, y0 + t),
            (x0 + t, y0 + t), (x0 + t, y1 - t), (-m, y1 - t),
            (-m, y1), (x0, y1)]

def bottombar_profile():
    """HD weighted bottom bar 1.16W x 3.00H, rounded ends, in (Y,Z)."""
    w, h = 1.16 * IN, 3.00 * IN
    y0, y1 = -w / 2, w / 2
    z0, z1 = -h / 2, h / 2
    r = w / 2
    pts = []
    steps = 6
    for i in range(steps + 1):  # top cap
        a = math.radians(0) + math.pi * (i / steps)
        pts.append((r * math.cos(a), z1 - r + r * math.sin(a)))
    for i in range(steps + 1):  # bottom cap
        a = math.pi + math.pi * (i / steps)
        pts.append((r * math.cos(a), z0 + r + r * math.sin(a)))
    return pts

# ─── scene geometry ──────────────────────────────────────────────────────────
WIDTH = 1.55         # visible shade width (X)
HOOD_Z = 1.52        # hood centre height
TUBE_R = 0.052       # roll tube radius
DROP = 1.36          # closed screen drop
TOP_Z = HOOD_Z - 5.5 * IN * 0.5 + 0.01   # where screen exits the hood
BOT_Z = TOP_Z - DROP

PARTS = {}           # name -> dict(obj/objs, home(loc), explode params)

def reg(key, obj, home, off, spin_axis=(1, 0, 0), spin=0.0,
        delay=0.0, fade_lo=0.55, fade_hi=1.0, scale_home=None):
    """Register a part for the explode driver."""
    PARTS[key] = dict(obj=obj, home=Vector(home), off=Vector(off),
                      spin_axis=Vector(spin_axis).normalized(), spin=spin,
                      delay=delay, fade_lo=fade_lo, fade_hi=fade_hi,
                      base_rot=Euler(obj.rotation_euler), scale_home=scale_home)

def build_unit(sc, M):
    coll = sc.collection
    half = WIDTH / 2

    # Hood / cassette (extruded quarter-round) ---------------------------------
    hood = profile_extrude("SE_Hood", hood_profile(), WIDTH + 0.02, M["white"], coll, axis="X", smooth_sh=True)
    hood.location = Vector((0, 0, HOOD_Z))
    reg("hood", hood, hood.location, (0, -0.22, 1.7), (1, 0, 0), math.radians(16), delay=0.55, fade_lo=0.45)

    # End caps (thin D-plates at each hood end) --------------------------------
    for i, sx in enumerate((-1, 1)):
        cap = profile_extrude(f"SE_EndCap{i}", hood_profile(), 0.9 * IN, M["white"], coll, axis="X", smooth_sh=True)
        cap.location = Vector((sx * (half + 0.012), 0, HOOD_Z))
        reg(f"endcap{i}", cap, cap.location,
            (sx * 0.62, -0.1, 0.95), (0, 0, 1), math.radians(sx * 200), delay=0.18, fade_lo=0.5)

    # Mounting brackets (circular disc + hub) behind caps ----------------------
    for i, sx in enumerate((-1, 1)):
        disc = add_cyl(f"SE_BracketDisc{i}", 3.1 * IN, 0.4 * IN,
                       (sx * (half + 0.05), -0.5 * IN, HOOD_Z), M["dark"], coll, axis="X")
        hub = add_cyl(f"SE_BracketHub{i}", 1.0 * IN, 1.2 * IN,
                      (sx * (half + 0.02), -0.5 * IN, HOOD_Z), M["steel"], coll, axis="X")
        # join hub into disc
        bpy.ops.object.select_all(action="DESELECT")
        disc.select_set(True); hub.select_set(True)
        bpy.context.view_layer.objects.active = disc
        bpy.ops.object.join()
        disc.name = f"SE_Bracket{i}"
        reg(f"bracket{i}", disc, disc.location,
            (sx * 0.9, -0.05, 0.7), (0, 1, 0), math.radians(sx * 160), delay=0.34, fade_lo=0.5)

    # Roll / fabric tube -------------------------------------------------------
    tube = add_cyl("SE_RollTube", TUBE_R, WIDTH - 0.03, (0, 0, HOOD_Z), M["steel"], coll, axis="X")
    reg("tube", tube, tube.location, (0, -0.3, 1.3), (1, 0, 0), math.radians(540),
        delay=0.4, fade_lo=0.55)

    # Motor (drive) — cylinder at -X end inside the tube -----------------------
    motor = add_cyl("SE_Motor", TUBE_R * 0.82, 0.34, (-half + 0.16, 0, HOOD_Z), M["dark"], coll, axis="X")
    reg("motor", motor, motor.location, (-0.95, -0.1, 0.55), (1, 0, 0), math.radians(420),
        delay=0.46, fade_lo=0.55)

    # Hero bronze drive gear at -X end (proud of the end so it reads at rest) ---
    gear = make_gear("SE_DriveGear", 18, 2.8 * IN, 3.7 * IN, 0.7 * IN, 0.9 * IN, M["bronze"], coll)
    gear.location = Vector((-half - 0.10, 0.02, HOOD_Z))
    reg("gear", gear, gear.location, (-1.35, -0.35, 1.05), (1, 0, 0), math.radians(1080),
        delay=0.40, fade_lo=0.72, fade_hi=1.0)

    # Cradle idler at +X end ---------------------------------------------------
    idler = make_gear("SE_Idler", 12, 2.0 * IN, 2.6 * IN, 0.6 * IN, 0.7 * IN, M["dark"], coll)
    idler.location = Vector((half + 0.06, 0, HOOD_Z))
    reg("idler", idler, idler.location, (1.25, -0.2, 0.75), (1, 0, 0), math.radians(720),
        delay=0.46, fade_lo=0.66)

    # Side tracks (vertical C-channels) ----------------------------------------
    for i, sx in enumerate((-1, 1)):
        trk = profile_extrude(f"SE_Track{i}", track_profile(), DROP + 0.06, M["white"], coll, axis="Z")
        trk.location = Vector((sx * half, 0, BOT_Z))
        reg(f"track{i}", trk, trk.location, (sx * 0.5, -0.05, 0.62),
            (0, 0, 1), math.radians(sx * 26), delay=0.5, fade_lo=0.5)

    # Fabric screen (thin panel) — animated separately for the roll-up ---------
    # Unit cube (extent +/-0.5); pose() drives scale = full dimension each frame.
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0.02, (TOP_Z + BOT_Z) / 2))
    screen = bpy.context.active_object; screen.name = "SE_Screen"
    screen.data.materials.append(M["fabric"])
    set_alpha_capable(M["fabric"])
    PARTS["screen"] = dict(obj=screen, special="screen")

    # Bottom bar ---------------------------------------------------------------
    bar = profile_extrude("SE_BottomBar", bottombar_profile(), WIDTH - 0.08, M["white"], coll, axis="X", smooth_sh=True)
    bar.location = Vector((0, 0.02, BOT_Z + 0.04))
    PARTS["bar"] = dict(obj=bar, special="bar",
                        explode=dict(off=Vector((0, -0.15, 1.15)),
                                     spin_axis=Vector((1, 0, 0)), spin=math.radians(140),
                                     delay=0.5, fade_lo=0.5, fade_hi=1.0))

    return screen, bar

# ─── the animation driver ────────────────────────────────────────────────────
ROLL_LO, ROLL_HI = 0.0, 0.26         # screen roll-up window (very fast)
EXP_LO, EXP_HI = 0.12, 0.78          # explode window — OVERLAPS the roll-up so
                                     # parts break apart as/just after it rolls
SPREAD = 1.9                         # global multiplier on explode travel (big)
FADE_LO, FADE_HI = 0.82, 1.0         # parts stay opaque while flying, fade at end

def set_obj_alpha(obj, a):
    for mat in obj.data.materials:
        if not mat: continue
        set_alpha_capable(mat)
        try: mat.node_tree.nodes["Principled BSDF"].inputs["Alpha"].default_value = a
        except Exception: pass

def explode_part(p, e, fade_lo=FADE_LO, fade_hi=FADE_HI):
    """e = global explode progress 0..1. Pose a standard registered part.
    Motion eases out (burst then settle); opacity holds until the very end so
    parts are clearly visible flying apart before they dissipate."""
    obj = p["obj"]
    lp = clamp01((e - p["delay"]) / max(1e-3, 1 - p["delay"]))   # local progress
    ep = ease_out(lp)
    obj.location = p["home"] + p["off"] * SPREAD * ep
    br = p["base_rot"]
    obj.rotation_euler = Euler((br.x + p["spin_axis"].x * p["spin"] * ep,
                                br.y + p["spin_axis"].y * p["spin"] * ep,
                                br.z + p["spin_axis"].z * p["spin"] * ep))
    fade = smooth((lp - fade_lo) / max(1e-3, fade_hi - fade_lo))
    set_obj_alpha(obj, 1.0 - fade)

def pose(t):
    roll = smooth((t - ROLL_LO) / (ROLL_HI - ROLL_LO))   # 0 closed -> 1 rolled up
    e = clamp01((t - EXP_LO) / (EXP_HI - EXP_LO)) ** 0.9  # explode progress (~linear)

    # fabric roll grows as it winds up
    roll_r = TUBE_R + roll * 0.045

    # --- screen: shrink drop to ~0 as it rolls up; top pinned under hood ------
    sp = PARTS["screen"]; screen = sp["obj"]
    cur_drop = max(0.012, DROP * (1 - roll))
    top = TOP_Z
    # unit cube: scale = full dimension -> half-extent = scale*0.5
    screen.scale = (WIDTH - 0.10, 0.008, cur_drop)
    screen.location = Vector((0, 0.02, top - cur_drop / 2))
    screen.rotation_euler = Euler((0, 0, 0))
    # fade screen out once explosion starts
    set_obj_alpha(screen, 1.0 - smooth((e - 0.05) / 0.4))

    # --- bottom bar: rides up with the screen, then explodes ------------------
    bp = PARTS["bar"]; bar = bp["obj"]
    bar_home_z = BOT_Z + 0.04
    bar_rolled_z = top - cur_drop - 0.02       # sits at the bottom of the (shrinking) screen
    base_loc = Vector((0, 0.02, lerp(bar_home_z, top - 0.06, roll)))
    ex = bp["explode"]
    lp = clamp01((e - ex["delay"]) / max(1e-3, 1 - ex["delay"]))
    ep = ease_out(lp)
    bar.location = base_loc + ex["off"] * SPREAD * ep
    bar.rotation_euler = Euler((ex["spin_axis"].x * ex["spin"] * ep, 0,
                                ex["spin_axis"].z * ex["spin"] * ep))
    fade = smooth((lp - FADE_LO) / max(1e-3, FADE_HI - FADE_LO))
    set_obj_alpha(bar, 1.0 - fade)

    # --- roll tube spins during roll-up (visual winding) ---------------------
    tube = PARTS["tube"]["obj"]
    # base spin from winding + explode handled by explode_part below (adds on)

    # --- everybody else: standard explode ------------------------------------
    for key, p in PARTS.items():
        if "special" in p: continue
        if key.startswith("bolt"):
            explode_part(p, e, fade_lo=0.62, fade_hi=0.9)   # debris fades sooner
        else:
            explode_part(p, e)

    # extra winding spin for the tube during roll phase (pre-explode)
    if e <= 0.001:
        tube.rotation_euler = Euler((tube.rotation_euler.x + roll * math.radians(360), 0, 0))

# ─── render ──────────────────────────────────────────────────────────────────
def render_frames(sc, frames, out_dir, test=None):
    os.makedirs(out_dir, exist_ok=True)
    idxs = test if test is not None else range(frames)
    n = frames
    for f in idxs:
        t = f / (n - 1) if n > 1 else 0.0
        pose(t)
        bpy.context.view_layer.update()
        sc.render.filepath = os.path.join(out_dir, f"frame_{f:04d}.webp")
        bpy.ops.render.render(write_still=True)
        print(f"RENDERED frame {f:04d}  t={t:.3f}")

def main():
    a = parse_args()
    sc = reset_scene()
    setup_render(sc, a["engine"], a["res"], a["samples"])
    setup_world_lights(sc)
    make_camera(sc)
    M = build_materials()
    build_unit(sc, M)
    print(f"BUILT {len(PARTS)} part groups; rendering to {a['out']}")
    render_frames(sc, a["frames"], a["out"], a["test"])
    print("DONE")

if __name__ == "__main__":
    main()
