"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function FloatingServices() {
  const items = [
    { icon: "M16 18L22 12L16 6M8 6L2 12L8 18", label: "Software", color: "#60a5fa", delay: "0s", orbit: 110 },
    { icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", label: "Product", color: "#00A99D", delay: "0.5s", orbit: 80 },
    { icon: "M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83", label: "AI & ML", color: "#a78bfa", delay: "1s", orbit: 130 },
    { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z", label: "Staff Aug", color: "#34d399", delay: "1.5s", orbit: 90 },
    { icon: "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z", label: "Cloud", color: "#fb923c", delay: "0.8s", orbit: 120 },
    { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Analytics", color: "#f472b6", delay: "0.3s", orbit: 100 },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: 420, display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none" }}>
      <style>{`
        @keyframes orbit { from{transform:rotate(0deg) translateX(var(--r)) rotate(0deg)} to{transform:rotate(360deg) translateX(var(--r)) rotate(-360deg)} }
        @keyframes pulse-ring { 0%,100%{transform:scale(1);opacity:0.15} 50%{transform:scale(1.12);opacity:0.25} }
      `}</style>
      {[70, 110, 150].map((r, i) => (
        <div key={r} style={{
          position: "absolute",
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
          animation: `pulse-ring ${3 + i}s ease-in-out ${i * 0.5}s infinite`,
        }} />
      ))}
      <div style={{
        position: "absolute",
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "rgba(0,169,157,0.2)",
        border: "1px solid rgba(0,169,157,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "rgba(0,169,157,0.4)",
          border: "1px solid rgba(0,169,157,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#00A99D" }} />
        </div>
      </div>
      {items.map((item, i) => {
        const angle = (i / items.length) * 360;
        const r = item.orbit;
        const x = Math.cos((angle * Math.PI) / 180) * r;
        const y = Math.sin((angle * Math.PI) / 180) * r;
        return (
          <div key={item.label} style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            transform: `translate(${x}px, ${y}px)`,
            animation: `orbit ${8 + i}s linear ${item.delay} infinite`,
            ["--r" as string]: `${r}px`,
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `${item.color}20`,
              border: `1px solid ${item.color}40`,
              boxShadow: `0 0 16px ${item.color}30`,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d={item.icon} stroke={item.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              whiteSpace: "nowrap",
              color: `${item.color}99`,
            }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

const serviceCards = [
  {
    title: "Software Solutions",
    gradient: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)",
    accentColor: "#4a9eff",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="#4a9eff" strokeWidth="2" fill="none"/>
        <path d="M12 17l-4 3 4 3" stroke="#4a9eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 17l4 3-4 3" stroke="#4a9eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 32h24" stroke="#4a9eff" strokeWidth="2" strokeLinecap="round"/>
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
    gradient: "linear-gradient(135deg, #0f2447 0%, #00A99D 100%)",
    accentColor: "#00d4c8",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="6" width="28" height="28" rx="3" stroke="#00d4c8" strokeWidth="2" fill="none"/>
        <rect x="11" y="11" width="18" height="18" rx="2" stroke="#00d4c8" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <rect x="16" y="16" width="8" height="8" rx="1" fill="#00d4c8" opacity="0.8"/>
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
    accentColor: "#a855f7",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="7" stroke="#a855f7" strokeWidth="2" fill="none"/>
        <circle cx="20" cy="20" r="2" fill="#a855f7"/>
        <path d="M20 5v6M20 29v6M5 20h6M29 20h6" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9.4 9.4l4.2 4.2M26.4 26.4l4.2 4.2M30.6 9.4l-4.2 4.2M13.6 26.4l-4.2 4.2" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
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
    gradient: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 60%, #00A99D 100%)",
    accentColor: "#00A99D",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="14" cy="13" r="5" stroke="#00A99D" strokeWidth="2" fill="none"/>
        <circle cx="26" cy="13" r="5" stroke="#00A99D" strokeWidth="2" fill="none"/>
        <path d="M6 32c0-5.523 3.582-10 8-10h12c4.418 0 8 4.477 8 10" stroke="#00A99D" strokeWidth="2" strokeLinecap="round"/>
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
    color: "#4a9eff",
    tags: ["React", "Next.js", "Vue", "Angular", "React Native", "Flutter"],
  },
  {
    category: "Backend",
    color: "#00d4c8",
    tags: ["Node.js", "Python", "Java", "Go", ".NET", "FastAPI"],
  },
  {
    category: "AI / ML",
    color: "#a855f7",
    tags: ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "Hugging Face"],
  },
  {
    category: "Cloud",
    color: "#f59e0b",
    tags: ["AWS", "GCP", "Azure", "Vercel", "Docker", "Kubernetes"],
  },
  {
    category: "Database",
    color: "#10b981",
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
                "linear-gradient(rgba(74,158,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.04) 1px, transparent 1px)",
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
                  color: "#00A99D",
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
                    background: "#00A99D",
                    color: "#ffffff",
                    padding: "14px 32px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 24px rgba(0,169,157,0.35)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#00c4b7";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#00A99D";
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
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#00A99D";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#00A99D";
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
                  color: "#00A99D",
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
                  color: "#00A99D",
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
                  background: "linear-gradient(90deg, #00A99D, #4a9eff, #a855f7, #00A99D)",
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />

              {processSteps.map((step, i) => {
                const stepColors = ["#4a9eff", "#00A99D", "#a855f7", "#00d4c8"];
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
                  color: "#00A99D",
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

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {techStack.map((group) => (
                <div
                  key={group.category}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      minWidth: 100,
                      color: group.color,
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {group.category}
                  </div>
                  <div
                    style={{
                      width: 40,
                      height: 1,
                      background: `${group.color}40`,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: `${group.color}12`,
                          border: `1px solid ${group.color}35`,
                          color: "#e2e8f0",
                          borderRadius: 100,
                          padding: "6px 16px",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                          cursor: "default",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLSpanElement).style.background = `${group.color}25`;
                          (e.currentTarget as HTMLSpanElement).style.borderColor = group.color;
                          (e.currentTarget as HTMLSpanElement).style.color = "#ffffff";
                          (e.currentTarget as HTMLSpanElement).style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLSpanElement).style.background = `${group.color}12`;
                          (e.currentTarget as HTMLSpanElement).style.borderColor = `${group.color}35`;
                          (e.currentTarget as HTMLSpanElement).style.color = "#e2e8f0";
                          (e.currentTarget as HTMLSpanElement).style.transform = "translateY(0)";
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
            background: "#00A99D",
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
