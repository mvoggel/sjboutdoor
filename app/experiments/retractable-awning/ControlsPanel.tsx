"use client";

import { useState } from "react";
import {
  FABRICS,
  FABRIC_GROUPS,
  FRAME_FINISHES,
  SIZE,
  VALANCES,
  fabricById,
  fabricTextureUrl,
} from "./config";
import type { AwningConfig, FabricGroup } from "./types";

type Update = <K extends keyof AwningConfig>(
  key: K,
  value: AwningConfig[K],
) => void;

export function ControlsPanel({
  config,
  update,
  embedded = false,
}: {
  config: AwningConfig;
  update: Update;
  embedded?: boolean;
}) {
  const selFabric = fabricById(config.fabricId);
  const [group, setGroup] = useState<FabricGroup>(selFabric.group);
  const groupFabrics = FABRICS.filter((f) => f.group === group);

  return (
    <div style={{ ...s.panel, ...(embedded ? s.panelEmbedded : null) }}>
      {!embedded && (
        <div style={s.brand}>
          <span style={s.brandTitle}>Awning Builder</span>
          <span style={s.brandSub}>SunPro · Traditional</span>
        </div>
      )}

      {/* Fabric */}
      <Section label="Fabric">
        <div style={s.groupRow}>
          {FABRIC_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => setGroup(g.id)}
              style={{ ...s.chip, ...(group === g.id ? s.chipOn : null) }}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div style={s.swatches}>
          {groupFabrics.map((f) => {
            const active = f.id === config.fabricId;
            return (
              <button
                key={f.id}
                title={`${f.name} · ${f.sku}`}
                onClick={() => update("fabricId", f.id)}
                style={{
                  ...s.swatch,
                  backgroundImage: `url(${fabricTextureUrl(f.id)})`,
                  outline: active ? "2px solid #c9a35a" : "1px solid #00000033",
                  outlineOffset: active ? 2 : 0,
                }}
              />
            );
          })}
        </div>
        <div style={s.selName}>
          {selFabric.name}
          <span style={s.selSku}> · {selFabric.sku}</span>
        </div>
      </Section>

      {/* Valance */}
      <Section label="Valance">
        <Segmented
          value={config.valance}
          options={VALANCES.map((v) => ({ value: v.id, label: v.name }))}
          onChange={(v) => update("valance", v)}
        />
      </Section>

      {/* Frame finish */}
      <Section label="Frame finish">
        <div style={s.finishRow}>
          {FRAME_FINISHES.map((f) => {
            const active = f.id === config.frameFinishId;
            return (
              <button
                key={f.id}
                onClick={() => update("frameFinishId", f.id)}
                style={s.finishBtn}
              >
                <span
                  style={{
                    ...s.finishDot,
                    background: f.hex,
                    outline: active
                      ? "2px solid #c9a35a"
                      : "1px solid #ffffff33",
                    outlineOffset: active ? 2 : 0,
                  }}
                />
                <span style={{ color: active ? "#e8e6e1" : "#9b968c" }}>
                  {f.name}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

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
        <div style={s.subLabel}>Projection</div>
        <div style={s.row}>
          {SIZE.projection.options.map((p) => (
            <button
              key={p}
              onClick={() => update("projectionFt", p)}
              style={{
                ...s.miniBtn,
                ...(config.projectionFt === p ? s.miniBtnOn : null),
              }}
            >
              {p}ft
            </button>
          ))}
        </div>
        <div style={{ marginTop: 12 }}>
          <Slider
            label="Extension"
            value={Math.round(config.open * 100)}
            min={0}
            max={100}
            step={1}
            unit="%"
            onChange={(v) => update("open", v / 100)}
          />
        </div>
      </Section>

      {/* Lighting */}
      <Section label="LED arm lights">
        <Toggle
          label="Integrated lights"
          on={config.lightsOn}
          onChange={(v) => update("lightsOn", v)}
        />
        {config.lightsOn && (
          <div style={{ marginTop: 12 }}>
            <Slider
              label="Brightness"
              value={Math.round(config.brightness * 100)}
              min={10}
              max={100}
              step={1}
              unit="%"
              onChange={(v) => update("brightness", v / 100)}
            />
          </div>
        )}
      </Section>

      <p style={s.note}>
        Live preview · {FABRICS.length} in-stock Sunbrella fabrics shown (300+
        custom available). Final colors may vary slightly from screen.
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
          {value}
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
          style={{ ...s.segBtn, ...(o.value === value ? s.segBtnOn : null) }}
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
    width: 320,
    height: "100%",
    overflowY: "auto",
    background: "#16181c",
    color: "#e8e6e1",
    padding: "18px 18px 28px",
    boxSizing: "border-box",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    fontSize: 13,
    flexShrink: 0,
  },
  panelEmbedded: { width: "100%", height: "auto", overflowY: "visible", paddingTop: 4 },
  brand: { marginBottom: 18 },
  brandTitle: { display: "block", fontSize: 17, fontWeight: 650, letterSpacing: 0.2 },
  brandSub: { display: "block", fontSize: 11, color: "#9b968c", marginTop: 2 },
  section: { borderTop: "1px solid #ffffff14", paddingTop: 14, marginTop: 14 },
  sectionLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#9b968c",
    marginBottom: 10,
  },
  groupRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 },
  chip: {
    padding: "5px 9px",
    background: "#23262b",
    color: "#b9b5ac",
    border: "1px solid #ffffff14",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 11.5,
  },
  chipOn: { background: "#2e3138", color: "#fff", border: "1px solid #c9a35a88" },
  swatches: { display: "flex", gap: 9, flexWrap: "wrap" },
  swatch: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    padding: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  selName: { marginTop: 11, fontSize: 12.5, fontWeight: 650 },
  selSku: { color: "#9b968c", fontWeight: 450 },
  finishRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  finishBtn: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontSize: 12.5,
  },
  finishDot: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    flexShrink: 0,
  },
  subLabel: { fontSize: 11.5, color: "#9b968c", margin: "6px 0 6px" },
  sliderWrap: { display: "block", marginBottom: 4 },
  sliderHead: { display: "flex", justifyContent: "space-between", marginBottom: 5 },
  sliderVal: { color: "#c9a35a", fontVariantNumeric: "tabular-nums" },
  range: { width: "100%", accentColor: "#c9a35a", cursor: "pointer" },
  row: { display: "flex", gap: 8 },
  miniBtn: {
    flex: 1,
    padding: "8px 0",
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
  segmented: { display: "flex", background: "#23262b", borderRadius: 8, padding: 3, gap: 3 },
  segBtn: {
    flex: 1,
    padding: "8px 0",
    background: "transparent",
    color: "#b9b5ac",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
  },
  segBtnOn: { background: "#c9a35a", color: "#1b1206", fontWeight: 650 },
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
    flexShrink: 0,
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
  note: { marginTop: 22, fontSize: 10.5, color: "#6f6b63", lineHeight: 1.5 },
};
