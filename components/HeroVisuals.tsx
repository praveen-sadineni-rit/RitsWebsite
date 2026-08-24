"use client";

/**
 * HeroVisuals — three self-contained animated SVG hero visuals for the RITS
 * homepage hero (dark navy background shows through; never paint a solid bg).
 *
 * Exports: AiMlViz, TeamViz, OpsViz.
 *
 * Hydration-safety: each component has a unique scope class, unique keyframe
 * names, a unique class prefix (aiml- / teamv- / opsv-), and unique gradient/
 * filter ids. All coordinates are deterministic (hard-coded arrays; any value
 * derived from Math.* is wrapped with Number(x.toFixed(2))). No Math.random,
 * Date.now, or new Date anywhere. Each style block guards prefers-reduced-motion.
 */

/* Brand palette */
const GOLD = "#E8B53D";
const GOLD_LIGHT = "#F3C34E";
const GOLD_DEEP = "#C99A2E";
const GOLD_DEEPER = "#B0810E";
const STEEL = "#5E82AE";
const STEEL_LIGHT = "#86A8CE";
const OFFWHITE = "#e2e8f0";

/* ------------------------------------------------------------------ */
/* 1) AiMlViz — "AI that survives production"                          */
/* ------------------------------------------------------------------ */

export function AiMlViz() {
  // Four vertical layers of nodes: 4 -> 6 -> 6 -> 3
  const layerX = [90, 200, 300, 400];
  const layers: number[][] = [
    // layer 0: 4 nodes
    [130, 200, 270, 340],
    // layer 1: 6 nodes
    [80, 138, 196, 254, 312, 380],
    // layer 2: 6 nodes
    [80, 138, 196, 254, 312, 380],
    // layer 3: 3 nodes
    [170, 230, 290],
  ];

  // Representative edges between adjacent layers (kept sparse for clarity).
  const edges: { x1: number; y1: number; x2: number; y2: number; steel: boolean }[] = [];
  const pairs: [number, number][][] = [
    // layer0 -> layer1
    [
      [0, 0],
      [0, 2],
      [1, 1],
      [1, 3],
      [2, 2],
      [2, 4],
      [3, 3],
      [3, 5],
    ],
    // layer1 -> layer2
    [
      [0, 1],
      [1, 0],
      [1, 3],
      [2, 2],
      [3, 4],
      [4, 3],
      [5, 5],
      [2, 4],
    ],
    // layer2 -> layer3
    [
      [0, 0],
      [1, 1],
      [2, 0],
      [3, 2],
      [4, 1],
      [5, 2],
    ],
  ];
  for (let li = 0; li < 3; li++) {
    pairs[li].forEach(([a, b], idx) => {
      edges.push({
        x1: layerX[li],
        y1: layers[li][a],
        x2: layerX[li + 1],
        y2: layers[li + 1][b],
        steel: idx % 2 === 0,
      });
    });
  }

  // Signal-travel paths (hard-coded M..L strings) for animateMotion dots.
  const signalPaths = [
    "M90,130 L200,80 L300,138 L400,170",
    "M90,200 L200,254 L300,196 L400,230",
    "M90,270 L200,312 L300,254 L400,290",
    "M90,340 L200,380 L300,380 L400,290",
  ];
  const signalBegins = ["0s", "0.9s", "1.7s", "2.4s"];
  const signalDurs = ["3.4s", "3.8s", "3.2s", "3.6s"];

  return (
    <div className="relative w-full select-none aiml-scope" style={{ maxWidth: 560, margin: "0 auto" }}>
      <style>{`
        @keyframes aiml-pulse { 0%,100% { opacity:.55; transform: scale(1); } 50% { opacity:1; transform: scale(1.12); } }
        @keyframes aiml-glow { 0%,100% { opacity:.35; } 50% { opacity:.7; } }
        @keyframes aiml-edge { 0%,100% { opacity:.25; } 50% { opacity:.6; } }
        @keyframes aiml-chip { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .aiml-node { transform-origin: center; animation: aiml-pulse 2.8s ease-in-out infinite; }
        .aiml-glow { animation: aiml-glow 4s ease-in-out infinite; transform-origin: center; }
        .aiml-edge { animation: aiml-edge 3.6s ease-in-out infinite; }
        .aiml-chip { animation: aiml-chip 4.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aiml-node, .aiml-glow, .aiml-edge, .aiml-chip { animation: none !important; }
        }
      `}</style>

      <svg viewBox="0 0 480 460" width="100%" height="100%" fill="none" aria-hidden>
        <defs>
          <radialGradient id="aimlGlow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.5" />
            <stop offset="55%" stopColor={GOLD} stopOpacity="0.12" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="aimlGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={STEEL} />
            <stop offset="100%" stopColor={GOLD} />
          </linearGradient>
          <radialGradient id="aimlNode1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD_LIGHT} />
            <stop offset="100%" stopColor={GOLD_DEEP} />
          </radialGradient>
          <radialGradient id="aimlNode2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={STEEL_LIGHT} />
            <stop offset="100%" stopColor={STEEL} />
          </radialGradient>
        </defs>

        {/* soft central gold glow behind middle layers */}
        <circle className="aiml-glow" cx="250" cy="230" r="150" fill="url(#aimlGlow1)" />

        {/* edges */}
        <g strokeWidth="1.1">
          {edges.map((e, i) => (
            <line
              key={i}
              className="aiml-edge"
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke={e.steel ? STEEL : GOLD}
              strokeOpacity="0.4"
              style={{ animationDelay: `${(i % 6) * 0.25}s` }}
            />
          ))}
        </g>

        {/* nodes */}
        {layers.map((ys, li) =>
          ys.map((y, ni) => (
            <circle
              key={`${li}-${ni}`}
              className="aiml-node"
              cx={layerX[li]}
              cy={y}
              r={li === 0 || li === 3 ? 8 : 6.5}
              fill={li % 2 === 0 ? "url(#aimlNode1)" : "url(#aimlNode2)"}
              stroke={li % 2 === 0 ? GOLD_DEEPER : STEEL}
              strokeWidth="1"
              style={{ animationDelay: `${(li * 6 + ni) * 0.12}s` }}
            />
          ))
        )}

        {/* travelling signal dots */}
        {signalPaths.map((p, i) => (
          <circle key={i} r="3.4" fill={GOLD_LIGHT}>
            <animateMotion
              path={p}
              dur={signalDurs[i]}
              begin={signalBegins[i]}
              repeatCount="indefinite"
              rotate="0"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur={signalDurs[i]}
              begin={signalBegins[i]}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* SVG label chips */}
        <g className="aiml-chip">
          <rect x="40" y="60" width="76" height="24" rx="12" fill="rgba(13,26,46,0.8)" stroke="rgba(255,255,255,0.08)" />
          <text x="78" y="76" textAnchor="middle" fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif" fill={STEEL_LIGHT}>prompt</text>
        </g>
        <g className="aiml-chip" style={{ animationDelay: "1.2s" }}>
          <rect x="210" y="392" width="74" height="24" rx="12" fill="rgba(13,26,46,0.8)" stroke="rgba(255,255,255,0.08)" />
          <text x="247" y="408" textAnchor="middle" fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif" fill={GOLD_LIGHT}>tokens</text>
        </g>
        <g className="aiml-chip" style={{ animationDelay: "2.1s" }}>
          <rect x="374" y="120" width="72" height="24" rx="12" fill="rgba(13,26,46,0.8)" stroke="rgba(232,181,61,0.35)" />
          <text x="410" y="136" textAnchor="middle" fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif" fill={GOLD}>eval ✓</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2) TeamViz — "Senior engineers, embedded in your team"             */
/* ------------------------------------------------------------------ */

export function TeamViz() {
  const cx = 240;
  const cy = 230;
  const radius = 150;

  const roles = [
    {
      label: "AI/ML",
      color: GOLD,
      // cpu / chip
      icon: (
        <>
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2" />
        </>
      ),
    },
    {
      label: "Frontend",
      color: STEEL_LIGHT,
      // code brackets </>
      icon: <path d="M15 17l5-5-5-5M9 7l-5 5 5 5" />,
    },
    {
      label: "Backend",
      color: GOLD_DEEP,
      // stacked servers
      icon: (
        <>
          <rect x="3" y="4" width="18" height="7" rx="1.5" />
          <rect x="3" y="13" width="18" height="7" rx="1.5" />
          <path d="M7 7.5h0M7 16.5h0" />
        </>
      ),
    },
    {
      label: "DevOps",
      color: STEEL,
      // continuous loop (infinity)
      icon: <path d="M8 12c0-2 1.6-3.5 3.5-3.5S15 10 15 12s-1.6 3.5-3.5 3.5S8 14 8 12zm7 0c0-2 1.6-3.5 3.5-3.5S22 10 22 12s-1.6 3.5-3.5 3.5S15 14 15 12zm-7 0c0-2-1.6-3.5-3.5-3.5S2 10 2 12s1.6 3.5 3.5 3.5S8 14 8 12z" />,
    },
    {
      label: "QA",
      color: GOLD_LIGHT,
      // check in circle
      icon: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" />
        </>
      ),
    },
    {
      label: "Data",
      color: STEEL_LIGHT,
      // database cylinder
      icon: (
        <>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
        </>
      ),
    },
  ];

  // Deterministic ring positions (start at top, evenly spaced).
  const avatars = roles.map((r, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / roles.length;
    const x = Number((cx + radius * Math.cos(angle)).toFixed(2));
    const y = Number((cy + radius * Math.sin(angle)).toFixed(2));
    return { ...r, x, y };
  });

  return (
    <div className="relative w-full select-none teamv-scope" style={{ maxWidth: 560, margin: "0 auto" }}>
      <style>{`
        @keyframes teamv-dash { to { stroke-dashoffset: -32; } }
        @keyframes teamv-orbit { to { transform: rotate(360deg); } }
        @keyframes teamv-counter { to { transform: rotate(-360deg); } }
        @keyframes teamv-ring { 0%,100% { opacity:.3; transform: scale(1); } 50% { opacity:.6; transform: scale(1.06); } }
        @keyframes teamv-hubglow { 0%,100% { opacity:.4; } 50% { opacity:.85; } }
        @keyframes teamv-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        /* whole ring orbits the hub; each avatar counter-rotates so text stays upright */
        .teamv-orbit { transform-box: view-box; transform-origin: 240px 230px; animation: teamv-orbit 34s linear infinite; }
        .teamv-line { stroke-dasharray: 5 7; animation: teamv-dash 1.1s linear infinite; }
        .teamv-avatar { transform-box: fill-box; transform-origin: center; animation: teamv-counter 34s linear infinite; }
        .teamv-bob { transform-box: fill-box; transform-origin: center; animation: teamv-bob 4.4s ease-in-out infinite; }
        .teamv-ring { transform-origin: 240px 230px; animation: teamv-ring 4.5s ease-in-out infinite; }
        .teamv-hubglow { animation: teamv-hubglow 3.6s ease-in-out infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .teamv-line, .teamv-orbit, .teamv-avatar, .teamv-bob, .teamv-ring, .teamv-hubglow { animation: none !important; }
        }
      `}</style>

      <svg viewBox="0 0 480 460" width="100%" height="100%" fill="none" aria-hidden>
        <defs>
          <radialGradient id="teamvGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.55" />
            <stop offset="60%" stopColor={GOLD} stopOpacity="0.12" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="teamvHub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#123a55" />
            <stop offset="100%" stopColor="#0b1c2e" />
          </linearGradient>
        </defs>

        {/* concentric faint gold rings behind hub */}
        <circle className="teamv-ring" cx={cx} cy={cy} r="80" stroke={GOLD} strokeOpacity="0.22" strokeWidth="1" />
        <circle className="teamv-ring" cx={cx} cy={cy} r="112" stroke={GOLD} strokeOpacity="0.16" strokeWidth="1" style={{ animationDelay: "0.9s" }} />
        <circle className="teamv-ring" cx={cx} cy={cy} r="150" stroke={GOLD} strokeOpacity="0.1" strokeWidth="1" style={{ animationDelay: "1.8s" }} />

        {/* hub glow */}
        <circle className="teamv-hubglow" cx={cx} cy={cy} r="110" fill="url(#teamvGlow)" />

        {/* everything in here orbits the hub as one ring */}
        <g className="teamv-orbit">
          {/* dashed connectors + travelling pulse dots (hub -> avatar) */}
          {avatars.map((a, i) => (
            <g key={`c-${i}`}>
              <line
                className="teamv-line"
                x1={cx}
                y1={cy}
                x2={a.x}
                y2={a.y}
                stroke={a.color}
                strokeOpacity="0.55"
                strokeWidth="1.4"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              <circle r="3" fill={a.color}>
                <animateMotion
                  path={`M${cx},${cy} L${a.x},${a.y}`}
                  dur="2.6s"
                  begin={`${i * 0.35}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="2.6s"
                  begin={`${i * 0.35}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}

          {/* role avatars — counter-rotate so initials/labels stay upright */}
          {avatars.map((a, i) => (
            <g key={`a-${i}`} className="teamv-avatar">
              <g className="teamv-bob" style={{ animationDelay: `${i * 0.4}s` }}>
                <circle cx={a.x} cy={a.y} r="24" fill="rgba(13,26,46,0.9)" stroke={a.color} strokeWidth="1.6" />
                <svg
                  x={a.x - 12}
                  y={a.y - 12}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={a.color}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {a.icon}
                </svg>
                <text x={a.x} y={a.y + 40} textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif, system-ui, sans-serif" fill={OFFWHITE} opacity="0.85">
                  {a.label}
                </text>
              </g>
            </g>
          ))}
        </g>

        {/* central hub pill */}
        <g>
          <rect x={cx - 62} y={cy - 22} width="124" height="44" rx="22" fill="url(#teamvHub)" stroke={GOLD} strokeWidth="1.6" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="ui-sans-serif, system-ui, sans-serif" fill={GOLD_LIGHT}>
            Your team
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3) OpsViz — "Software that runs while you sleep" (NOC monitoring)   */
/* ------------------------------------------------------------------ */

export function OpsViz() {
  const radarX = 130;
  const radarY = 150;

  // Signal blips (deterministic).
  const blips = [
    { x: 90, y: 120, d: "0s" },
    { x: 168, y: 130, d: "1.1s" },
    { x: 150, y: 190, d: "2.0s" },
    { x: 100, y: 185, d: "1.5s" },
  ];

  // Alert feed rows. Row index 2 is the transient incident (cycles red->amber->green).
  const rows = [
    { label: "api-gateway", status: "ok" as const },
    { label: "db-replica", status: "ok" as const },
    { label: "cache-node", status: "incident" as const },
    { label: "worker-3", status: "ok" as const },
    { label: "queue", status: "warn" as const },
  ];

  const OK = "#34d399";
  const WARN = "#fbbf24";
  const RED = "#f87171";

  const statusColor = (s: "ok" | "warn" | "incident") => (s === "ok" ? OK : s === "warn" ? WARN : RED);
  const statusText = (s: "ok" | "warn" | "incident") => (s === "ok" ? "ok" : s === "warn" ? "warn" : "resolving");

  const rowY = (i: number) => 60 + i * 58;

  return (
    <div className="relative w-full select-none opsv-scope" style={{ maxWidth: 560, margin: "0 auto" }}>
      <style>{`
        @keyframes opsv-sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes opsv-blip { 0%,100% { opacity:.2; transform: scale(.7); } 50% { opacity:1; transform: scale(1.3); } }
        @keyframes opsv-dot { 0%,100% { opacity:.55; } 50% { opacity:1; } }
        @keyframes opsv-ring { 0%,100% { opacity:.25; } 50% { opacity:.5; } }
        @keyframes opsv-incident {
          0%, 18% { fill: #f87171; }
          40%, 58% { fill: #fbbf24; }
          80%, 100% { fill: #34d399; }
        }
        @keyframes opsv-fill { 0% { width: 0px; } 60%,100% { width: 150px; } }
        .opsv-sweep { transform-origin: 130px 150px; animation: opsv-sweep 4.5s linear infinite; }
        .opsv-blip { transform-box: fill-box; transform-origin: center; animation: opsv-blip 2.4s ease-in-out infinite; }
        .opsv-dot { animation: opsv-dot 1.8s ease-in-out infinite; }
        .opsv-ring { animation: opsv-ring 3.6s ease-in-out infinite; }
        .opsv-incident { animation: opsv-incident 5s ease-in-out infinite; }
        .opsv-fill { animation: opsv-fill 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .opsv-sweep, .opsv-blip, .opsv-dot, .opsv-ring, .opsv-incident, .opsv-fill { animation: none !important; }
        }
      `}</style>

      <svg viewBox="0 0 480 460" width="100%" height="100%" fill="none" aria-hidden>
        <defs>
          <linearGradient id="opsvRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.5" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
          <radialGradient id="opsvGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.3" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ---- Left: radar ---- */}
        <circle cx={radarX} cy={radarY} r="110" fill="url(#opsvGlow)" />
        <circle className="opsv-ring" cx={radarX} cy={radarY} r="40" stroke={GOLD} strokeOpacity="0.3" strokeWidth="1" />
        <circle className="opsv-ring" cx={radarX} cy={radarY} r="70" stroke={GOLD} strokeOpacity="0.22" strokeWidth="1" style={{ animationDelay: "0.6s" }} />
        <circle className="opsv-ring" cx={radarX} cy={radarY} r="100" stroke={GOLD} strokeOpacity="0.15" strokeWidth="1" style={{ animationDelay: "1.2s" }} />
        {/* cross hairs */}
        <line x1={radarX - 100} y1={radarY} x2={radarX + 100} y2={radarY} stroke={GOLD} strokeOpacity="0.1" strokeWidth="1" />
        <line x1={radarX} y1={radarY - 100} x2={radarX} y2={radarY + 100} stroke={GOLD} strokeOpacity="0.1" strokeWidth="1" />

        {/* sweeping radar line (a filled wedge) */}
        <g className="opsv-sweep">
          <path d={`M${radarX},${radarY} L${radarX + 100},${radarY} A100,100 0 0 1 ${radarX + 70},${radarY + 71} Z`} fill="url(#opsvRing)" />
          <line x1={radarX} y1={radarY} x2={radarX + 100} y2={radarY} stroke={GOLD_LIGHT} strokeWidth="1.6" />
        </g>

        {/* signal blips */}
        {blips.map((b, i) => (
          <circle key={i} className="opsv-blip" cx={b.x} cy={b.y} r="4" fill={GOLD_LIGHT} style={{ animationDelay: b.d }} />
        ))}

        {/* radar label */}
        <text x={radarX} y={radarY + 138} textAnchor="middle" fontSize="12" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={STEEL_LIGHT}>
          NOC · live
        </text>

        {/* ---- Right: alert feed ---- */}
        {rows.map((r, i) => {
          const y = rowY(i);
          const incident = r.status === "incident";
          return (
            <g key={i}>
              <rect x="262" y={y} width="196" height="42" rx="8" fill="rgba(13,26,46,0.8)" stroke="rgba(255,255,255,0.08)" />
              <circle
                className={incident ? "opsv-incident" : "opsv-dot"}
                cx="286"
                cy={y + 21}
                r="6"
                fill={statusColor(r.status)}
                style={incident ? undefined : { animationDelay: `${i * 0.3}s` }}
              />
              <text x="304" y={y + 26} fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={OFFWHITE}>
                {r.label}
              </text>
              <text
                x="446"
                y={y + 26}
                textAnchor="end"
                fontSize="12"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fill={incident ? WARN : statusColor(r.status)}
              >
                {statusText(r.status)}
              </text>
            </g>
          );
        })}

        {/* uptime bar */}
        <g>
          <text x="262" y="378" fontSize="12" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={STEEL_LIGHT}>
            uptime
          </text>
          <text x="446" y="378" textAnchor="end" fontSize="12" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={GOLD_LIGHT}>
            99.98%
          </text>
          <rect x="262" y="388" width="196" height="8" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" />
          <rect className="opsv-fill" x="262" y="388" width="150" height="8" rx="4" fill={GOLD} />
        </g>
      </svg>
    </div>
  );
}
