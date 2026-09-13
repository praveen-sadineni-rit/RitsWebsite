import type { CSSProperties } from "react";

// "AtsIcloud" brand wordmark: the A and I are picked out in gold.
export function AtsIcloudWordmark({ accent = "#E8B53D", style }: { accent?: string; style?: CSSProperties }) {
  return (
    <span style={style}>
      <span style={{ color: accent }}>A</span>ts<span style={{ color: accent }}>I</span>cloud
    </span>
  );
}

// Positioning line shown under the wordmark.
export function AtsIcloudTagline({ color = "#B0810E", style }: { color?: string; style?: CSSProperties }) {
  return (
    <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color, ...style }}>
      AI&nbsp;&nbsp;|&nbsp;&nbsp;ATS&nbsp;&nbsp;|&nbsp;&nbsp;Desktop Cloud
    </span>
  );
}
