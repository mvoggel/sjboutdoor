// Shared types for the retractable-awning builder (v3 — real-time 3D).
// Pure data — no React/three imports — so this can be reused by the UI, the
// 3D model, and (later) a pricing calculator or lead-capture payload.

/** Camera viewpoint. v1 ships "outside" (standing in the yard); "inside"
 *  (sitting underneath, looking out) is a second camera preset. */
export type AwningView = "outside" | "inside";

/** Front valance hem profile. */
export type ValanceProfile = "straight" | "wave";

/** Color family the fabric is grouped under in the picker. */
export type FabricGroup = "tan" | "blue" | "green" | "redbrown" | "greyblack";

export interface Fabric {
  id: string;
  name: string;
  /** Sunbrella stock number, e.g. "4696-0000". */
  sku: string;
  group: FabricGroup;
  /** Average swatch color — used for the picker dot + the 3D fallback before
   *  the real swatch texture has loaded. */
  hex: string;
  /** Woven stripe/pattern vs. solid (auto-classified from the swatch). */
  stripe: boolean;
}

export interface FrameFinish {
  id: string;
  name: string;
  /** Powder-coat albedo applied to cassette / arms / front bar / brackets. */
  hex: string;
  metalness: number;
  roughness: number;
}

/** The complete user-chosen configuration — the single source of truth the 3D
 *  scene and any future price calc / quote payload read from. */
export interface AwningConfig {
  view: AwningView;
  fabricId: string;
  valance: ValanceProfile;
  frameFinishId: string;
  /** Span across the wall, in feet. */
  widthFt: number;
  /** How far it reaches out from the wall when fully open, in feet. */
  projectionFt: number;
  /** Extension 0 = fully retracted (rolled into the cassette), 1 = fully open.
   *  Animated smoothly in the model; the UI sets the target. */
  open: number;
  /** Integrated dimmable LED arm lights. */
  lightsOn: boolean;
  /** 0..1 LED dim level (only meaningful when lightsOn). */
  brightness: number;
}
