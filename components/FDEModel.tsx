"use client";

/**
 * Forward Deployed Engineer (FDE) model — hub-and-spoke with animated
 * marching-ants dotted connectors. On-brand navy/teal, fully responsive:
 * a 3x3 grid on desktop with an SVG connector overlay, stacked on mobile.
 */

const AI_TECHNIQUES = ["LLM Models", "Vector DB (RAG)", "AI Agents / Agentic Workflows", "MCP & Tools"];

type Pillar = {
  key: string;
  title: string;
  color: string;
  area: string; // grid-area on desktop
  items: string[];
};

const PILLARS: Pillar[] = [
  {
    key: "customer",
    title: "Customer Partnership",
    color: "#E8B53D",
    area: "tl",
    items: [
      "Work directly with customer engineering teams",
      "Understand business goals & technical challenges",
      "Gather requirements & define success together",
      "Build trust & drive long-term impact",
    ],
  },
  {
    key: "build",
    title: "Build & Integrate AI Solutions",
    color: "#60a5fa",
    area: "tr",
    items: [
      "Rapid prototyping & application development",
      "Integrate APIs, SDKs & third-party systems",
      "Implement RAG, workflows & agents",
      "Test, evaluate & optimize solutions",
      "Deploy to production & ensure reliability",
    ],
  },
  {
    key: "influence",
    title: "Influence & Feedback Loop",
    color: "#a78bfa",
    area: "bl",
    items: [
      "Translate customer needs into product insights",
      "Partner with Product, Research & Engineering",
      "Drive roadmap & product improvements",
    ],
  },
  {
    key: "deploy",
    title: "Deploy, Monitor & Iterate",
    color: "#fb923c",
    area: "br",
    items: [
      "Monitor performance & user impact",
      "Debug issues & ensure production health",
      "Continuously iterate & improve",
    ],
  },
];

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <div
      className="rounded-2xl p-5 h-full backdrop-blur-sm"
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${pillar.color}33` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: pillar.color }} />
        <h4 className="text-white font-bold text-sm tracking-wide">{pillar.title}</h4>
      </div>
      <ul className="space-y-2">
        {pillar.items.map((it) => (
          <li key={it} className="flex gap-2 text-[13px] leading-snug text-gray-400">
            <span style={{ color: pillar.color }} className="mt-[2px] flex-shrink-0">›</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FDEModel() {
  return (
    <div className="max-w-6xl mx-auto">
      <style>{`
        @keyframes fde-dash { to { stroke-dashoffset: -28; } }
        .fde-line { stroke-dasharray: 6 8; animation: fde-dash 0.9s linear infinite; }
        @keyframes fde-pulse { 0%,100%{ transform:scale(1); opacity:.5 } 50%{ transform:scale(1.08); opacity:1 } }
        .fde-core-ring { animation: fde-pulse 2.8s ease-in-out infinite; transform-origin: center; }
        @keyframes fde-bob { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-3px) } }
        @keyframes fde-screenglow { 0%,100%{ opacity:.6 } 50%{ opacity:1 } }
        @keyframes fde-type-a { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(1.5px) } }
        @keyframes fde-type-b { 0%,100%{ transform: translateY(1.5px) } 50%{ transform: translateY(0) } }
        .fde-figure { animation: fde-bob 4.5s ease-in-out infinite; transform-origin: center; }
        .fde-screenglow { animation: fde-screenglow 1.6s ease-in-out infinite; }
        .fde-type-a { animation: fde-type-a 0.5s ease-in-out infinite; }
        .fde-type-b { animation: fde-type-b 0.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .fde-line, .fde-core-ring, .fde-figure, .fde-screenglow, .fde-type-a, .fde-type-b { animation: none !important; } }
        .fde-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .fde-grid { grid-template-columns: 1fr 1fr 1fr; align-items: stretch; }
          .fde-a-tl { grid-column: 1; grid-row: 1 / 3; }
          .fde-a-tr { grid-column: 3; grid-row: 1 / 3; }
          .fde-a-top { grid-column: 2; grid-row: 1; }
          .fde-a-hub { grid-column: 2; grid-row: 2; }
          .fde-a-bl { grid-column: 1; grid-row: 3; }
          .fde-a-br { grid-column: 3; grid-row: 3; }
          .fde-a-bridge { grid-column: 2; grid-row: 3; }
        }
      `}</style>

      <div className="relative">
        {/* Animated connector overlay (desktop only) */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {/* hub at 50,50 -> corners + top + bottom */}
          {[
            { x: 20, y: 30, c: "#E8B53D" },
            { x: 80, y: 30, c: "#60a5fa" },
            { x: 20, y: 74, c: "#a78bfa" },
            { x: 80, y: 74, c: "#fb923c" },
            { x: 50, y: 12, c: "#22d3ee" },
            { x: 50, y: 88, c: "#94a3b8" },
          ].map((p, i) => (
            <line
              key={i}
              x1="50" y1="50" x2={p.x} y2={p.y}
              stroke={p.c} strokeOpacity="0.85" strokeWidth="2.4"
              className="fde-line" style={{ animationDelay: `${i * 0.12}s` }}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="fde-grid relative">
          {/* Top: AI Solutions & Techniques */}
          <div className="fde-a-top">
            <div
              className="rounded-2xl p-5 text-center"
              style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.28)" }}
            >
              <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "#22d3ee" }}>
                AI Solutions & Techniques
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {AI_TECHNIQUES.map((t) => (
                  <span
                    key={t}
                    className="text-[12px] font-semibold rounded-lg px-3 py-1.5 text-gray-200"
                    style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Corner pillars */}
          <div className="fde-a-tl"><PillarCard pillar={PILLARS[0]} /></div>
          <div className="fde-a-tr"><PillarCard pillar={PILLARS[1]} /></div>
          <div className="fde-a-bl"><PillarCard pillar={PILLARS[2]} /></div>
          <div className="fde-a-br"><PillarCard pillar={PILLARS[3]} /></div>

          {/* Center hub: the FDE — animated engineer-at-laptop illustration */}
          <div className="fde-a-hub flex items-center justify-center py-4">
            <div className="relative flex flex-col items-center text-center">
              <div
                className="relative w-44 h-44 rounded-full flex items-center justify-center"
                style={{ background: "radial-gradient(circle, rgba(232,181,61,0.2) 0%, rgba(232,181,61,0.03) 70%)", border: "1px solid rgba(232,181,61,0.45)" }}
              >
                <span className="fde-core-ring absolute inset-[-10px] rounded-full" style={{ border: "1px solid rgba(232,181,61,0.22)" }} />
                <span className="fde-core-ring absolute inset-[8px] rounded-full" style={{ border: "1px solid rgba(232,181,61,0.14)", animationDelay: "0.7s" }} />

                <svg viewBox="0 0 200 185" width="150" height="139" fill="none" aria-label="Forward Deployed Engineer">
                  <g className="fde-figure">
                    {/* torso / hoodie */}
                    <path d="M58 185 Q56 98 84 88 Q92 84 100 84 Q108 84 116 88 Q144 98 142 185 Z"
                      fill="rgba(232,181,61,0.14)" stroke="#E8B53D" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* forearms to laptop */}
                    <path d="M74 108 L88 138" stroke="#E8B53D" strokeOpacity="0.4" strokeWidth="12" strokeLinecap="round" />
                    <path d="M126 108 L112 138" stroke="#E8B53D" strokeOpacity="0.4" strokeWidth="12" strokeLinecap="round" />
                    {/* neck */}
                    <rect x="92" y="66" width="16" height="22" fill="#123a55" />
                    {/* head */}
                    <circle cx="100" cy="50" r="20" fill="#123a55" stroke="#E8B53D" strokeWidth="2.5" />
                    {/* hair */}
                    <path d="M81 51 Q82 30 100 30 Q118 30 119 51 Q110 43 100 43 Q90 43 81 51 Z" fill="#E8B53D" />
                    {/* eyes + smile */}
                    <circle cx="93" cy="51" r="1.7" fill="#E8B53D" />
                    <circle cx="107" cy="51" r="1.7" fill="#E8B53D" />
                    <path d="M94 59 Q100 63 106 59" stroke="#E8B53D" strokeWidth="1.6" strokeLinecap="round" />
                    {/* laptop screen (in front of torso) */}
                    <rect x="66" y="120" width="68" height="36" rx="3" fill="#08192e" stroke="#E8B53D" strokeWidth="2.5" />
                    <text x="100" y="144" textAnchor="middle" fontSize="17" fontWeight="900" fill="#F3C34E" className="fde-screenglow">FDE</text>
                    {/* laptop base */}
                    <path d="M56 156 L144 156 L154 170 L46 170 Z" fill="rgba(232,181,61,0.16)" stroke="#E8B53D" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* typing hands */}
                    <ellipse className="fde-type-a" cx="74" cy="161" rx="6" ry="4" fill="#E8B53D" opacity="0.55" />
                    <ellipse className="fde-type-b" cx="126" cy="161" rx="6" ry="4" fill="#E8B53D" opacity="0.55" />
                  </g>
                </svg>
              </div>
              <p className="text-white font-bold mt-3 text-sm">Forward Deployed Engineer</p>
              <p className="text-[11px] font-semibold tracking-widest uppercase mt-1" style={{ color: "#E8B53D" }}>
                Embedded · Collaborative · Impactful
              </p>
            </div>
          </div>

          {/* Bottom-center bridge */}
          <div className="fde-a-bridge flex items-center justify-center">
            <div
              className="rounded-2xl px-5 py-4 text-center w-full"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(148,163,184,0.25)" }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m0 0a4 4 0 105-6.26M15 7a4 4 0 11-6 0" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-white font-bold text-sm">The Bridge</span>
              </div>
              <p className="text-[12px] text-gray-400">Between Customers, Product &amp; Engineering</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission banner */}
      <div
        className="mt-6 rounded-2xl px-6 py-4 flex items-center justify-center gap-3 text-center"
        style={{ background: "linear-gradient(90deg, rgba(232,181,61,0.12), rgba(27,60,110,0.18))", border: "1px solid rgba(232,181,61,0.3)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
          <circle cx="12" cy="12" r="9" stroke="#E8B53D" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="4" stroke="#E8B53D" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="1" fill="#E8B53D" />
        </svg>
        <p className="text-sm text-gray-200">
          <span className="font-bold text-white">Mission:</span> Deliver AI solutions that solve real customer problems and drive lasting impact.
        </p>
      </div>
    </div>
  );
}
