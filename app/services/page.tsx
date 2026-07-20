"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function FloatingServices() {
  const items = [
    { icon: "M16 18L22 12L16 6M8 6L2 12L8 18", label: "Software", color: "#86A8CE" },
    { icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", label: "Product", color: "#E8B53D" },
    { icon: "M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83", label: "AI & ML", color: "#C99A2E" },
    { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z", label: "Staff Aug", color: "#5E82AE" },
    { icon: "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z", label: "Cloud", color: "#E8B53D" },
    { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Analytics", color: "#F3C34E" },
  ];

  // Fixed-position constellation: nodes evenly placed around a core, connected
  // by data lines. Coordinate space matches the SVG viewBox below.
  const VW = 460, VH = 420, cx = 230, cy = 210, rx = 162, ry = 148;
  const nodes = items.map((it, i) => {
    const angle = ((-90 + i * 60) * Math.PI) / 180;
    return { ...it, x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) };
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: VW,
        margin: "0 auto",
        aspectRatio: `${VW} / ${VH}`,
        userSelect: "none",
      }}
    >
      <style>{`
        @keyframes cst-dash { to { stroke-dashoffset: -24; } }
        @keyframes cst-ring { 0%,100%{ transform:scale(1); opacity:.16 } 50%{ transform:scale(1.16); opacity:.32 } }
        @keyframes cst-bob  { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-6px) } }
        @keyframes cst-core { 0%,100%{ opacity:.5 } 50%{ opacity:1 } }
        .cst-line { stroke-dasharray:5 7; animation:cst-dash 1.1s linear infinite; }
        .cst-node { animation:cst-bob 4s ease-in-out infinite; }
        .cst-core { animation:cst-core 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cst-line, .cst-node, .cst-core, .cst-ring, .cst-pulse { animation:none !important; }
        }
      `}</style>

      {/* Lines, pulses, rings and core all share one SVG coordinate space */}
      <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height="100%" fill="none" aria-hidden>
        {nodes.map((n, i) => (
          <g key={`link-${n.label}`}>
            <line
              x1={cx} y1={cy} x2={n.x} y2={n.y}
              stroke={n.color} strokeOpacity="0.4" strokeWidth="1.5"
              className="cst-line" style={{ animationDelay: `${i * 0.13}s` }}
            />
            <circle r="3" fill={n.color} className="cst-pulse">
              <animateMotion
                dur={`${2.4 + i * 0.25}s`}
                repeatCount="indefinite"
                path={`M${cx},${cy} L${n.x},${n.y}`}
              />
            </circle>
          </g>
        ))}

        {[46, 68, 92].map((r, i) => (
          <circle
            key={r} cx={cx} cy={cy} r={r}
            stroke="#E8B53D" strokeOpacity="0.16" strokeWidth="1"
            className="cst-ring"
            style={{ transformOrigin: `${cx}px ${cy}px`, animation: `cst-ring ${3 + i}s ease-in-out ${i * 0.4}s infinite` }}
          />
        ))}

        <circle cx={cx} cy={cy} r="31" fill="rgba(232,181,61,0.16)" stroke="rgba(232,181,61,0.5)" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="16" fill="rgba(232,181,61,0.45)" className="cst-core" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#e6fffb" letterSpacing="1.5">RITS</text>
      </svg>

      {/* Capability chips overlaid at exact node coordinates (percent-based so they track on resize) */}
      {nodes.map((n, i) => (
        <div
          key={n.label}
          style={{
            position: "absolute",
            left: `${(n.x / VW) * 100}%`,
            top: `${(n.y / VH) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="cst-node"
            style={{
              animationDelay: `${i * 0.35}s`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${n.color}22`,
                border: `1px solid ${n.color}55`,
                boxShadow: `0 0 18px ${n.color}30`,
                backdropFilter: "blur(2px)",
              }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d={n.icon} stroke={n.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                whiteSpace: "nowrap",
                color: `${n.color}cc`,
              }}
            >
              {n.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

const serviceCards = [
  {
    title: "Software Solutions",
    gradient: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)",
    accentColor: "#86A8CE",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="#86A8CE" strokeWidth="2" fill="none"/>
        <path d="M12 17l-4 3 4 3" stroke="#86A8CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 17l4 3-4 3" stroke="#86A8CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 32h24" stroke="#86A8CE" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    capabilities: [
      "Custom web & mobile application development",
      "Legacy system modernization & migration",
      "API design, integration & microservices",
    ],
    href: "/services/software-solutions",
  },
  {
    title: "Product Development",
    gradient: "linear-gradient(135deg, #0f2447 0%, #E8B53D 100%)",
    accentColor: "#E8B53D",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="6" width="28" height="28" rx="3" stroke="#E8B53D" strokeWidth="2" fill="none"/>
        <rect x="11" y="11" width="18" height="18" rx="2" stroke="#E8B53D" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <rect x="16" y="16" width="8" height="8" rx="1" fill="#E8B53D" opacity="0.8"/>
      </svg>
    ),
    capabilities: [
      "End-to-end product strategy & roadmapping",
      "UX/UI design with user research & testing",
      "Agile development with continuous delivery",
    ],
    href: "/services/product-development",
  },
  {
    title: "AI & ML",
    gradient: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)",
    accentColor: "#C99A2E",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="7" stroke="#C99A2E" strokeWidth="2" fill="none"/>
        <circle cx="20" cy="20" r="2" fill="#C99A2E"/>
        <path d="M20 5v6M20 29v6M5 20h6M29 20h6" stroke="#C99A2E" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9.4 9.4l4.2 4.2M26.4 26.4l4.2 4.2M30.6 9.4l-4.2 4.2M13.6 26.4l-4.2 4.2" stroke="#C99A2E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    capabilities: [
      "LLM integration & generative AI solutions",
      "Predictive analytics & ML model development",
      "Intelligent automation & data pipelines",
    ],
    href: "/services/ai-ml",
  },
  {
    title: "Staff Augmentation",
    gradient: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 60%, #E8B53D 100%)",
    accentColor: "#E8B53D",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="14" cy="13" r="5" stroke="#E8B53D" strokeWidth="2" fill="none"/>
        <circle cx="26" cy="13" r="5" stroke="#E8B53D" strokeWidth="2" fill="none"/>
        <path d="M6 32c0-5.523 3.582-10 8-10h12c4.418 0 8 4.477 8 10" stroke="#E8B53D" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    capabilities: [
      "Senior engineers on-demand, any timezone",
      "Dedicated pods or individual contributors",
      "Seamless onboarding within days, not months",
    ],
    href: "/services/staff-augmentation",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Scoping",
    description: "We dive deep into your goals, existing tech landscape, and constraints. You get a clear project brief and a realistic roadmap before a single line of code is written.",
    timeline: "Week 1–2",
  },
  {
    number: "02",
    title: "Team Assembly",
    description: "We match the right talent to your project, engineers, designers, architects, and PMs, based on your stack, timeline, and culture.",
    timeline: "Week 2–3",
  },
  {
    number: "03",
    title: "Build & Iterate",
    description: "Agile sprints with weekly demos, transparent progress tracking, and continuous feedback loops. You always know exactly where things stand.",
    timeline: "Ongoing",
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "We don’t disappear at go-live. Every engagement includes 90 days of post-launch support, monitoring, and rapid-response bug fixes.",
    timeline: "Go-live +",
  },
];

const techStack = [
  {
    category: "Frontend",
    color: "#86A8CE",
    icon: "M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM3 9h18M7 6h.01",
    tags: ["React", "Next.js", "Vue", "Angular", "React Native", "Flutter"],
  },
  {
    category: "Backend",
    color: "#E8B53D",
    icon: "M5 4h14a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zM5 14h14a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4a1 1 0 011-1zM8 7h.01M8 17h.01",
    tags: ["Node.js", "Python", "Java", "Go", ".NET", "FastAPI"],
  },
  {
    category: "AI / ML",
    color: "#C99A2E",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m14 0h2M3 15h2m14 0h2M6 6h12v12H6zM10 10h4v4h-4z",
    tags: ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "Hugging Face"],
  },
  {
    category: "Cloud",
    color: "#E8B53D",
    icon: "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z",
    tags: ["AWS", "GCP", "Azure", "Vercel", "Docker", "Kubernetes"],
  },
  {
    category: "Database",
    color: "#3D5A80",
    icon: "M4 5a8 3 0 0016 0 8 3 0 00-16 0zM4 5v6a8 3 0 0016 0V5M4 11v6a8 3 0 0016 0v-6",
    tags: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "MySQL"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ overflowX: "hidden" }}>

        {/* HERO */}
        <section
          style={{
            background: "#0f2447",
            padding: "120px 0 100px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(134,168,206,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(134,168,206,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  color: "#E8B53D",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                What We Do
              </span>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 24,
                  letterSpacing: "-0.02em",
                }}
              >
                End-to-end technology services built around your goals.
              </h1>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "1.15rem",
                  lineHeight: 1.7,
                  marginBottom: 40,
                  maxWidth: 500,
                }}
              >
                From a single engineer to a full product team, we have the capability, the talent, and the commitment to deliver.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    background: "#E8B53D",
                    color: "#ffffff",
                    padding: "14px 32px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 24px rgba(232,181,61,0.35)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#D9A428";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#E8B53D";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  Talk to an Expert
                </Link>
                <a
                  href="#work"
                  style={{
                    display: "inline-block",
                    background: "transparent",
                    color: "#ffffff",
                    padding: "14px 32px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    border: "2px solid rgba(255,255,255,0.25)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E8B53D";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#E8B53D";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                  }}
                >
                  See Our Work
                </a>
              </div>
            </div>

            {/* Floating services animation */}
            <div aria-hidden>
              <FloatingServices />
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section
          id="work"
          style={{
            background: "#0a1628",
            padding: "100px 0",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span
                style={{
                  display: "inline-block",
                  color: "#E8B53D",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Our Services
              </span>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                Everything your product needs to succeed.
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
              }}
            >
              {serviceCards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: card.gradient,
                    borderRadius: 16,
                    padding: "40px",
                    border: `1px solid ${card.accentColor}22`,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${card.accentColor}22`;
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${card.accentColor}55`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${card.accentColor}22`;
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: -40,
                      right: -40,
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${card.accentColor}18 0%, transparent 70%)`,
                    }}
                  />
                  <div style={{ marginBottom: 20 }}>{card.icon}</div>
                  <h3
                    style={{
                      color: "#ffffff",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      marginBottom: 20,
                    }}
                  >
                    {card.title}
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                    {card.capabilities.map((cap) => (
                      <li
                        key={cap}
                        style={{
                          color: "#cbd5e1",
                          fontSize: "0.95rem",
                          lineHeight: 1.6,
                          paddingLeft: 20,
                          marginBottom: 10,
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: card.accentColor,
                            fontWeight: 700,
                          }}
                        >
                          &rsaquo;
                        </span>
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={card.href}
                    style={{
                      color: card.accentColor,
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      textDecoration: "none",
                      letterSpacing: "0.03em",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
                    }}
                  >
                    Explore &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section
          style={{
            background: "#ffffff",
            padding: "100px 0",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <span
                style={{
                  display: "inline-block",
                  color: "#E8B53D",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Our Process
              </span>
              <h2
                style={{
                  color: "#0f2447",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                How We Work
              </h2>
              <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto" }}>
                A proven engagement model that keeps projects on track and teams aligned from kickoff to launch.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0,
                position: "relative",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 36,
                  left: "12.5%",
                  right: "12.5%",
                  height: 2,
                  background: "linear-gradient(90deg, #E8B53D, #86A8CE, #C99A2E, #E8B53D)",
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />

              {processSteps.map((step, i) => {
                const stepColors = ["#86A8CE", "#E8B53D", "#C99A2E", "#E8B53D"];
                return (
                  <div
                    key={step.number}
                    style={{
                      textAlign: "center",
                      padding: "0 24px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: `${stepColors[i]}15`,
                        border: `2px solid ${stepColors[i]}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: stepColors[i],
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {step.number}
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        background: `${stepColors[i]}15`,
                        color: stepColors[i],
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        borderRadius: 20,
                        marginBottom: 12,
                      }}
                    >
                      {step.timeline}
                    </div>
                    <h3
                      style={{
                        color: "#0f2447",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        marginBottom: 12,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section
          style={{
            background: "#0a1628",
            padding: "100px 0",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span
                style={{
                  display: "inline-block",
                  color: "#E8B53D",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Our Stack
              </span>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                Technologies We Work With
              </h2>
              <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto" }}>
                We pick the right tool for each challenge, not the trendy one.
              </p>
            </div>

            <div
              style={{ display: "grid", gap: 20 }}
              className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {techStack.map((group) => (
                <div
                  key={group.category}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${group.color}22`,
                    borderRadius: 16,
                    padding: 24,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${group.color}55`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 44px ${group.color}18`;
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${group.color}22`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: `${group.color}18`,
                        border: `1px solid ${group.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d={group.icon} stroke={group.color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span
                      style={{
                        color: group.color,
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {group.category}
                    </span>
                    <span style={{ marginLeft: "auto", color: "#64748b", fontSize: "0.72rem", fontWeight: 600 }}>
                      {group.tags.length} tools
                    </span>
                  </div>
                  <div style={{ height: 1, background: `${group.color}20`, marginBottom: 16 }} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: `${group.color}12`,
                          border: `1px solid ${group.color}30`,
                          color: "#e2e8f0",
                          borderRadius: 8,
                          padding: "6px 12px",
                          fontSize: "0.82rem",
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section
          style={{
            background: "#E8B53D",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Not sure which service fits?
            </p>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: 40,
                letterSpacing: "-0.02em",
              }}
            >
              Let&apos;s figure it out together.
            </h2>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                background: "#0f2447",
                color: "#ffffff",
                padding: "16px 40px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 8px 32px rgba(15,36,71,0.4)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#1B3C6E";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#0f2447";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Start the Conversation
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
