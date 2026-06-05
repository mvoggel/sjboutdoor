// Shared types for the pergola builder. Pure data — no React/three imports
// so this can be reused by UI, 3D, and (later) a pricing calculator.

export type MountType = "freestanding" | "wall";

export type ScreenSide = "front" | "back" | "left" | "right";

export interface FrameColor {
  id: string;
  name: string;
  /** Base albedo color shown on swatches and applied to frame + blades. */
  hex: string;
  /** PBR hints so powder-coat vs. wood-grain read differently in 3D. */
  metalness: number;
  roughness: number;
}

export interface ScreenColor {
  id: string;
  name: string;
  hex: string;
  /** 0..1 — how see-through the mesh reads. */
  opacity: number;
}

export interface LightOption {
  id: string;
  name: string;
  /** Warm-white emissive color for the fixtures. */
  hex: string;
}

/** The complete user-chosen configuration. This is the single source of
 *  truth that both the 3D scene and (future) price calc read from. */
export interface PergolaConfig {
  /** Per-bay width. Total span = widthFt × bays. */
  widthFt: number;
  depthFt: number;
  postHeightFt: number;
  /** Number of louvered zones repeated along the width (shared posts). */
  bays: number;
  mount: MountType;
  frameColorId: string;
  /** 0 = louvers fully closed (flat), 90 = fully open (vertical). */
  bladeAngleDeg: number;
  screens: Record<ScreenSide, boolean>;
  screenColorId: string;
  lightsOn: boolean;
  lightColorId: string;
}
