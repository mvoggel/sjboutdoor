"use client";

import {
  BAYS,
  FRAME_COLORS,
  LIGHT_OPTIONS,
  SCREEN_COLORS,
  SIZE,
} from "./config";
import type { MountType, PergolaConfig, ScreenSide } from "./types";

type Update = <K extends keyof PergolaConfig>(
  key: K,
  value: PergolaConfig[K],
) => void;

const SCREEN_SIDES: ScreenSide[] = ["front", "back", "left", "right"];

export function ControlsPanel({
  config,
  update,
  embedded = false,
}: {
  config: PergolaConfig;
  update: Update;
  embedded?: boolean;
}) {
  const setScreen = (side: ScreenSide, on: boolean) =>
    update("screens", { ...config.screens, [side]: on });

  return (
    <div style={{ ...s.panel, ...(embedded ? s.panelEmbedded : null) }}>
      {!embedded && (
        <div style={s.brand}>
          <span style={s.brandTitle}>Pergola Builder</span>
          <span style={s.brandSub}>Louvered · R-Blade</span>
        </div>
      )}

      {/* Size */}
      <Section label="Size">
        <Slider
          label="Width"
          value={config.widthFt}
          min={SIZE.width.min}
          max={SIZE.width.max}
          step={SIZE.width.step}
          unit="ft"
          onChange={(v) => update("widthFt", v)}
        />
        <Slider
          label="Depth"
          value={config.depthFt}
          min={SIZE.depth.min}
          max={SIZE.depth.max}
          step={SIZE.depth.step}
          unit="ft"
          onChange={(v) => update("depthFt", v)}
        />
        <Slider
          label="Post height"
          value={config.postHeightFt}
          min={SIZE.postHeight.min}
          max={SIZE.postHeight.max}
          step={SIZE.postHeight.step}
          unit="ft"
          onChange={(v) => update("postHeightFt", v)}
        />
      </Section>

      {/* Zones */}
      <Section label="Zones (multi-bay)">
        <div style={s.row}>
          {Array.from(
            { length: BAYS.max - BAYS.min + 1 },
            (_, i) => BAYS.min + i,
          ).map((n) => (
            <button
              key={n}
              onClick={() => update("bays", n)}
              style={{
                ...s.miniBtn,
                ...(config.bays === n ? s.miniBtnOn : null),
              }}
            >
              {n} {n === 1 ? "bay" : "bays"}
            </button>
          ))}
        </div>
        <div style={s.hintText}>
          Total width {config.widthFt * config.bays}ft ({config.bays}×{" "}
          {config.widthFt}ft)
        </div>
      </Section>

      {/* Mount */}
      <Section label="Mount">
        <Segmented<MountType>
          value={config.mount}
          options={[
            { value: "freestanding", label: "Freestanding" },
            { value: "wall", label: "Wall-mounted" },
          ]}
          onChange={(v) => update("mount", v)}
        />
      </Section>

      {/* Frame color */}
      <Section label="Frame color">
        <Swatches
          options={FRAME_COLORS}
          selectedId={config.frameColorId}
          onSelect={(id) => update("frameColorId", id)}
        />
      </Section>

      {/* Blades */}
      <Section label="Louver blades">
        <Slider
          label="Tilt"
          value={config.bladeAngleDeg}
          min={0}
          max={90}
          step={1}
          unit="°"
          onChange={(v) => update("bladeAngleDeg", v)}
        />
        <div style={s.row}>
          <button style={s.miniBtn} onClick={() => update("bladeAngleDeg", 0)}>
            Closed
          </button>
          <button style={s.miniBtn} onClick={() => update("bladeAngleDeg", 90)}>
            Open
          </button>
        </div>
      </Section>

      {/* Privacy screens */}
      <Section label="Privacy screens">
        <div style={s.sidesGrid}>
          {SCREEN_SIDES.map((side) => {
            const on = config.screens[side];
            return (
              <button
                key={side}
                onClick={() => setScreen(side, !on)}
                style={{ ...s.sideBtn, ...(on ? s.sideBtnOn : null) }}
              >
                {side[0].toUpperCase() + side.slice(1)}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 10 }}>
          <Swatches
            options={SCREEN_COLORS}
            selectedId={config.screenColorId}
            onSelect={(id) => update("screenColorId", id)}
          />
        </div>
      </Section>

      {/* Lighting */}
      <Section label="Lighting">
        <Toggle
          label="Integrated lights"
          on={config.lightsOn}
          onChange={(v) => update("lightsOn", v)}
        />
        {config.lightsOn && (
          <div style={{ marginTop: 10 }}>
            <Swatches
              options={LIGHT_OPTIONS}
              selectedId={config.lightColorId}
              onSelect={(id) => update("lightColorId", id)}
            />
          </div>
        )}
      </Section>

      <p style={s.note}>
        Demo build · colors & specs are placeholders pending final product data.
      </p>
    </div>
  );
}

// ── Primitives ──────────────────────────────────────────────────────────────

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={s.section}>
      <div style={s.sectionLabel}>{label}</div>
      {children}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <label style={s.sliderWrap}>
      <div style={s.sliderHead}>
        <span>{label}</span>
        <span style={s.sliderVal}>
          {Number.isInteger(value) ? value : value.toFixed(1)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={s.range}
      />
    </label>
  );
}

function Swatches({
  options,
  selectedId,
  onSelect,
}: {
  options: { id: string; name: string; hex: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={s.swatches}>
      {options.map((o) => {
        const active = o.id === selectedId;
        return (
          <button
            key={o.id}
            title={o.name}
            onClick={() => onSelect(o.id)}
            style={{
              ...s.swatch,
              background: o.hex,
              outline: active ? "2px solid #c9a35a" : "1px solid #00000022",
              outlineOffset: active ? 2 : 0,
            }}
          />
        );
      })}
    </div>
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div style={s.segmented}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          style={{
            ...s.segBtn,
            ...(o.value === value ? s.segBtnOn : null),
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button style={s.toggleRow} onClick={() => onChange(!on)}>
      <span>{label}</span>
      <span style={{ ...s.track, ...(on ? s.trackOn : null) }}>
        <span style={{ ...s.knob, ...(on ? s.knobOn : null) }} />
      </span>
    </button>
  );
}

// ── Styles (inline so the widget is independent of host page CSS) ───────────

const s: Record<string, React.CSSProperties> = {
  panel: {
    width: 300,
    height: "100%",
    overflowY: "auto",
    background: "#16181c",
    color: "#e8e6e1",
    padding: "18px 18px 28px",
    boxSizing: "border-box",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    fontSize: 13,
  },
  panelEmbedded: {
    width: "100%",
    height: "auto",
    overflowY: "visible",
    paddingTop: 4,
  },
  brand: { marginBottom: 18 },
  brandTitle: { display: "block", fontSize: 17, fontWeight: 650, letterSpacing: 0.2 },
  brandSub: { display: "block", fontSize: 11, color: "#9b968c", marginTop: 2 },
  section: {
    borderTop: "1px solid #ffffff14",
    paddingTop: 14,
    marginTop: 14,
  },
  sectionLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#9b968c",
    marginBottom: 10,
  },
  sliderWrap: { display: "block", marginBottom: 12 },
  sliderHead: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sliderVal: { color: "#c9a35a", fontVariantNumeric: "tabular-nums" },
  range: { width: "100%", accentColor: "#c9a35a", cursor: "pointer" },
  row: { display: "flex", gap: 8, marginTop: 4 },
  miniBtn: {
    flex: 1,
    padding: "7px 0",
    background: "#23262b",
    color: "#e8e6e1",
    border: "1px solid #ffffff1a",
    borderRadius: 7,
    cursor: "pointer",
    fontSize: 12,
  },
  miniBtnOn: {
    background: "#c9a35a",
    color: "#1b1206",
    fontWeight: 650,
    border: "1px solid #c9a35a",
  },
  hintText: { marginTop: 8, fontSize: 11, color: "#9b968c" },
  swatches: { display: "flex", gap: 8, flexWrap: "wrap" },
  swatch: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  segmented: {
    display: "flex",
    background: "#23262b",
    borderRadius: 8,
    padding: 3,
    gap: 3,
  },
  segBtn: {
    flex: 1,
    padding: "7px 0",
    background: "transparent",
    color: "#b9b5ac",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
  },
  segBtnOn: { background: "#c9a35a", color: "#1b1206", fontWeight: 650 },
  sidesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  },
  sideBtn: {
    padding: "8px 0",
    background: "#23262b",
    color: "#b9b5ac",
    border: "1px solid #ffffff1a",
    borderRadius: 7,
    cursor: "pointer",
    fontSize: 12,
  },
  sideBtnOn: {
    background: "#2e3a42",
    color: "#e8e6e1",
    border: "1px solid #4f6f7e",
  },
  toggleRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "transparent",
    color: "#e8e6e1",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontSize: 13,
  },
  track: {
    width: 38,
    height: 22,
    borderRadius: 11,
    background: "#3a3e44",
    position: "relative",
    transition: "background .15s",
  },
  trackOn: { background: "#c9a35a" },
  knob: {
    position: "absolute",
    top: 2,
    left: 2,
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "#fff",
    transition: "left .15s",
  },
  knobOn: { left: 18 },
  note: {
    marginTop: 22,
    fontSize: 10.5,
    color: "#6f6b63",
    lineHeight: 1.5,
  },
};
