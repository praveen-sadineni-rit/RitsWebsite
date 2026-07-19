"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const capabilities = [
  {
    num: "01",
    title: "Full-Stack Digital Products",
    subtitle: "End-to-end software built with modern frameworks and cloud-native architecture.",
    desc: "We design and develop applications that are fast, secure, and optimized for real-world business use.",
    bullets: ["High-performance web apps", "Cross-platform mobile apps", "Multi-tenant SaaS platforms", "Custom enterprise tools"],
    accent: "#60a5fa",
    glow: "rgba(96,165,250,0.12)",
    iconPath: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    wide: true,
  },
  {
    num: "02",
    title: "AI-Powered Automation",
    subtitle: "Transform manual processes into intelligent, self-running workflows.",
    desc: "Our AI engines learn your operations, reduce repetitive work, and improve decision accuracy.",
    bullets: ["Workflow automation", "Document intelligence (OCR + ML)", "Predictive analytics", "Smart communication triggers"],
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.12)",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    wide: false,
  },
  {
    num: "03",
    title: "Backend & API Engineering",
    subtitle: "Robust server-side systems built for scale, reliability, and seamless integration.",
    desc: "We architect APIs that power your products and connect your entire ecosystem.",
    bullets: ["REST & GraphQL APIs", "Microservices architecture", "Secure authentication", "High-availability systems"],
    accent: "#E8B53D",
    glow: "rgba(232,181,61,0.12)",
    iconPath: "M4 6h16M4 10h16M4 14h10M4 18h6",
    wide: false,
  },
  {
    num: "04",
    title: "System Integrations",
    subtitle: "Connect your business with the tools you already use.",
    desc: "Our integration layer ensures smooth data flow across platforms and enterprise systems.",
    bullets: ["SAP, CRMs, ERPs", "Payment gateways", "Identity providers (OAuth, SSO)", "Custom webhooks & triggers"],
    accent: "#34d399",
    glow: "rgba(52,211,153,0.12)",
    iconPath: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
    wide: false,
  },
  {
    num: "05",
    title: "DevOps & Quality Engineering",
    subtitle: "Ship faster with confidence.",
    desc: "We implement automated pipelines, testing frameworks, and deployment workflows that keep your product stable and production-ready.",
    bullets: ["CI/CD pipelines", "Automated testing suites", "Cloud deployment", "Performance monitoring"],
    accent: "#fb923c",
    glow: "rgba(251,146,60,0.12)",
    iconPath: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    wide: false,
  },
];

const capWhyUs = [
  "Built with modern, scalable architecture",
  "AI-driven intelligence at every layer",
  "Enterprise-grade security and reliability",
  "Fast deployment and easy customization",
  "Designed for real operational impact",
];

const processSteps = [
  {
    weeks: "Week 1–2", num: "01",
    title: "Architecture & Planning",
    description: "We deep-dive into your requirements, define the data model, choose the right stack, and produce a technical blueprint with milestones.",
    highlights: ["Technical spec", "Stack selection", "Sprint planning", "Risk assessment"],
    accent: "#60a5fa",
    iconPath: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    weeks: "Week 3–8", num: "02",
    title: "Core Development",
    description: "Iterative sprints with weekly demos. You see working software early, not a black box that opens at the end.",
    highlights: ["Weekly demos", "Feature flags", "Code reviews", "Staging deployments"],
    accent: "#E8B53D",
    iconPath: "M16 18L22 12L16 6M8 6L2 12L8 18",
  },
  {
    weeks: "Week 6–10", num: "03",
    title: "Testing & QA",
    description: "Automated unit, integration, and end-to-end tests run in CI. Manual QA cycles validate edge cases and real-world flows.",
    highlights: ["Automated tests", "Performance testing", "Security scanning", "Accessibility audit"],
    accent: "#a78bfa",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    weeks: "Week 10–12", num: "04",
    title: "Launch & Handover",
    description: "Production deployment with zero-downtime rollout. Full documentation, knowledge transfer, and a 30-day post-launch support window.",
    highlights: ["Zero-downtime deploy", "Full documentation", "Team training", "30-day support"],
    accent: "#34d399",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    weeks: "Ongoing", num: "05",
    title: "Support & Evolution",
    description: "Retainer-based engagement for feature additions, performance tuning, dependency upgrades, and monitoring.",
    highlights: ["Feature roadmap", "Dependency updates", "24/7 monitoring", "SLA guarantees"],
    accent: "#fb923c",
    iconPath: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
];

const techStack = [
  {
    category: "Frontend Technologies",
    sub: "Crafting fast, responsive, and accessible user experiences.",
    accent: "#60a5fa",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    items: ["React.js", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript", "Redux / Zustand"],
  },
  {
    category: "Mobile Development",
    sub: "Cross-platform apps with native performance.",
    accent: "#a78bfa",
    icon: "M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zM12 18h.01",
    items: ["React Native", "Flutter", "Expo"],
  },
  {
    category: "Backend & API Engineering",
    sub: "Secure, scalable, optimized for high-traffic workloads.",
    accent: "#E8B53D",
    icon: "M4 6h16M4 10h16M4 14h10M4 18h6",
    items: ["Node.js", "Express.js / Fastify", "Python", "Django / Flask / FastAPI", "Go (Golang)", "REST & GraphQL APIs", "Microservices Architecture"],
  },
  {
    category: "AI, ML & Automation",
    sub: "Intelligent systems that automate, predict, and enhance operations.",
    accent: "#f472b6",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    items: ["Python (AI/ML)", "TensorFlow / PyTorch", "OpenAI / LLM Integrations", "OCR & Document Intelligence", "Predictive Analytics Models", "Workflow Automation Engines"],
  },
  {
    category: "Databases & Storage",
    sub: "Reliable data systems for structured and unstructured workloads.",
    accent: "#fb923c",
    icon: "M3 5a1 1 0 000 2h13a1 1 0 100-2H3zM3 11a1 1 0 000 2h5a1 1 0 000-2H3zM3 17a1 1 0 000 2h5a1 1 0 000-2H3z",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "S3 / Cloud Storage"],
  },
  {
    category: "Cloud & Deployment",
    sub: "Enterprise-grade infrastructure for global scale.",
    accent: "#34d399",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    items: ["AWS", "Azure", "Google Cloud", "Vercel (Frontend)", "Render (Backend)", "Docker & Containers"],
  },
  {
    category: "DevOps & Quality Engineering",
    sub: "Automated pipelines and testing for smooth, safe releases.",
    accent: "#fbbf24",
    icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    items: ["CI/CD Pipelines", "GitHub Actions", "Jest / Mocha", "Playwright / Cypress", "Kubernetes (K8s)", "Grafana, Prometheus"],
  },
  {
    category: "Integrations & Enterprise Systems",
    sub: "Connecting your business ecosystem with seamless interoperability.",
    accent: "#e879f9",
    icon: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
    items: ["SAP", "CRMs & ERPs", "Stripe / Payment Gateways", "OAuth / SSO Authentication", "Custom Webhooks"],
  },
];

const whyUs = [
  {
    title: "Senior engineers only",
    description:
      "Every engineer on your project has 5+ years of production experience. No juniors learning on your dime.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Clean, documented code",
    description:
      "You own your codebase. We write it like it will be maintained by a team you hire next year, because it probably will be.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Automated test coverage",
    description:
      "No feature ships without tests. Our CI gates enforce minimum coverage thresholds on every pull request.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    title: "Performance-first architecture",
    description:
      "We design for load from day one, caching strategies, query optimization, and horizontal scaling baked in from the start.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

function CodeEditor() {
  const [line, setLine] = useState(0);
  const lines = [
    { indent: 0, content: "const buildProduct = async (idea) => {", color: "#60a5fa" },
    { indent: 1, content: "const requirements = await discover(idea);", color: "#e2e8f0" },
    { indent: 1, content: "const architecture = design(requirements);", color: "#e2e8f0" },
    { indent: 1, content: "const code = await develop({", color: "#e2e8f0" },
    { indent: 2, content: "stack: ['Next.js', 'Node', 'PostgreSQL'],", color: "#34d399" },
    { indent: 2, content: "quality: 'senior-only',", color: "#34d399" },
    { indent: 2, content: "timeline: '8 weeks',", color: "#34d399" },
    { indent: 1, content: "});", color: "#e2e8f0" },
    { indent: 1, content: "await test(code, { coverage: '>90%' });", color: "#a78bfa" },
    { indent: 1, content: "return deploy(code); // ships on time ✓", color: "#E8B53D" },
    { indent: 0, content: "};", color: "#60a5fa" },
  ];
  useEffect(() => {
    if (line >= lines.length) return;
    const t = setTimeout(() => setLine(l => l + 1), 180);
    return () => clearTimeout(t);
  }, [line]);
  return (
    <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{background:"#0d1117",border:"1px solid rgba(255,255,255,0.08)"}}>
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{background:"#161b22"}}>
        <div className="w-3 h-3 rounded-full bg-red-500/70"/>
        <div className="w-3 h-3 rounded-full bg-yellow-500/70"/>
        <div className="w-3 h-3 rounded-full bg-green-500/70"/>
        <span className="ml-3 text-white/30 text-xs font-mono">buildProduct.ts</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E8B53D] animate-pulse"/>
          <span className="text-[#E8B53D] text-[10px] font-mono">compiling...</span>
        </div>
      </div>
      {/* Code */}
      <div className="p-5 font-mono text-xs leading-6 min-h-[260px]">
        {lines.slice(0, line).map((l, i) => (
          <div key={i} className="flex">
            <span className="w-6 text-white/20 select-none flex-shrink-0 text-right mr-4">{i+1}</span>
            <span style={{paddingLeft: l.indent * 16, color: l.color}}>{l.content}</span>
          </div>
        ))}
        {line < lines.length && (
          <div className="flex">
            <span className="w-6 text-white/20 select-none flex-shrink-0 text-right mr-4">{line+1}</span>
            <span style={{paddingLeft: (lines[line]?.indent||0) * 16}}>
              <span className="inline-block w-2 h-4 bg-[#E8B53D] animate-pulse"/>
            </span>
          </div>
        )}
      </div>
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 text-[10px] font-mono" style={{background:"#161b22"}}>
        <span className="text-[#E8B53D]">✓ TypeScript</span>
        <span className="text-white/30">UTF-8</span>
        <span className="text-white/30">Ln {Math.min(line,lines.length)}, Col 1</span>
      </div>
    </div>
  );
}

function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const step = processSteps[activeStep];
  const pctWidth = String(((activeStep + 1) / processSteps.length) * 100) + "%";

  return (
    <section id="process" className="py-24 px-6 scroll-mt-24" style={{ background: "#0a0f1e" }}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#E8B53D" }}>How we work</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Our <span style={{ color: "#E8B53D" }}>process.</span>
            </h2>
            <p className="text-sm max-w-xs lg:text-right" style={{ color: "rgba(255,255,255,0.4)" }}>A proven delivery framework refined across 200+ projects.</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {processSteps.map((ps, i) => (
            <button key={ps.num} onClick={() => setActiveStep(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex-shrink-0"
              style={{
                background: activeStep === i ? ps.accent + "22" : "rgba(255,255,255,0.04)",
                border: "1.5px solid " + (activeStep === i ? ps.accent : "rgba(255,255,255,0.08)"),
                color: activeStep === i ? ps.accent : "rgba(255,255,255,0.4)",
              }}>
              <span style={{ opacity: 0.5 }}>{ps.num}</span>{ps.title}
            </button>
          ))}
        </div>

        <div className="h-px mb-10 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full" style={{ width: pctWidth, background: step.accent, transition: "width 0.5s ease" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="relative rounded-2xl p-8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid " + step.accent + "35" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 0% 0%, " + step.accent + "12 0%, transparent 60%)" }} />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: step.accent + "18", border: "1.5px solid " + step.accent + "40" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d={step.iconPath} stroke={step.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: step.accent + "18", color: step.accent }}>{step.weeks}</span>
                <h3 className="text-white font-black text-2xl mt-1">{step.title}</h3>
              </div>
            </div>
            <p className="leading-relaxed mb-8 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{step.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {step.highlights.map(h => (
                <div key={h} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: step.accent }} />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {processSteps.map((ps, i) => (
              <button key={ps.num} onClick={() => setActiveStep(i)}
                className="flex items-center gap-4 p-4 rounded-xl text-left w-full"
                style={{
                  background: activeStep === i ? ps.accent + "10" : "rgba(255,255,255,0.02)",
                  border: "1px solid " + (activeStep === i ? ps.accent + "40" : "rgba(255,255,255,0.05)"),
                  transition: "all 0.3s ease",
                }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: activeStep === i ? ps.accent + "22" : "rgba(255,255,255,0.05)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d={ps.iconPath} stroke={activeStep === i ? ps.accent : "rgba(255,255,255,0.25)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: activeStep === i ? "white" : "rgba(255,255,255,0.4)" }}>{ps.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.22)" }}>{ps.weeks}</p>
                </div>
                {activeStep === i && <div className="w-1 h-6 rounded-full flex-shrink-0" style={{ background: ps.accent }} />}
              </button>
            ))}
            <div className="flex items-center gap-4 mt-4 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                onClick={() => setActiveStep(a => Math.max(0, a - 1))}
                disabled={activeStep === 0}
                aria-label="Previous step"
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: activeStep === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.7)",
                  cursor: activeStep === 0 ? "not-allowed" : "pointer",
                }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: step.accent }}>
                    Step {activeStep + 1} of {processSteps.length}
                  </span>
                  <span className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>{step.weeks}</span>
                </div>
                <div className="flex gap-1.5">
                  {processSteps.map((ps, i) => (
                    <div key={ps.num} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: i <= activeStep ? "100%" : "0%",
                          background: i <= activeStep ? ps.accent : "transparent",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveStep(a => Math.min(processSteps.length - 1, a + 1))}
                disabled={activeStep === processSteps.length - 1}
                aria-label="Next step"
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  background: activeStep === processSteps.length - 1 ? "rgba(255,255,255,0.04)" : step.accent,
                  boxShadow: activeStep === processSteps.length - 1 ? "none" : `0 0 16px ${step.accent}60`,
                  color: activeStep === processSteps.length - 1 ? "rgba(255,255,255,0.15)" : "#0a0f1e",
                  cursor: activeStep === processSteps.length - 1 ? "not-allowed" : "pointer",
                }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function SoftwareSolutionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* HERO */}
        <section className="relative bg-gradient-to-br from-[#0f2447] via-[#1B3C6E] to-[#0f2447] pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#E8B53D]/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#1B3C6E]/40 blur-2xl" />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "radial-gradient(#E8B53D 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <p className="text-[#E8B53D]/70 text-sm font-medium tracking-wide mb-6">
              Services
              <span className="mx-2 opacity-50">/</span>
              <span className="text-[#E8B53D]">Software Solutions</span>
            </p>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                  Software that ships.{" "}
                  <span className="text-[#E8B53D]">And keeps running.</span>
                </h1>
                <p className="text-xl text-blue-100/80 leading-relaxed mb-10">
                  We build enterprise-grade web apps, mobile products, and APIs,
                  architected to last and designed to scale.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["200+ projects delivered", "8 week avg. MVP timeline", "99.9% uptime SLA"].map(
                    (stat) => (
                      <span
                        key={stat}
                        className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm"
                      >
                        {stat}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <CodeEditor />
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE BUILD */}
        <section className="py-24 px-6" style={{ background: "#0a0f1e" }}>
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="mb-6">
              <p className="text-[#E8B53D] text-xs font-bold uppercase tracking-widest mb-3">Capabilities</p>
              <h2 className="text-white font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                What we <span style={{ color: "#E8B53D" }}>build.</span>
              </h2>
              <p className="text-white/40 text-base max-w-2xl leading-relaxed">
                We build intelligent, scalable software solutions designed to modernize operations, automate workflows, and accelerate business growth. Our products combine advanced engineering with AI-driven automation to deliver reliable, high-performance systems across web, mobile, and enterprise environments.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px mb-10" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Bento grid — card 01 is wide, rest are normal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Wide card — Full-Stack Digital Products */}
              {(() => {
                const cap = capabilities[0];
                return (
                  <div id="mobile" key={cap.title} className="group relative rounded-2xl p-7 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-0.5 lg:col-span-2 scroll-mt-28"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at 10% 50%, ${cap.glow} 0%, transparent 65%)` }} />
                    <span className="absolute top-6 right-6 font-black tracking-widest text-sm" style={{ color: "rgba(255,255,255,0.06)" }}>{cap.num}</span>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${cap.accent}15`, border: `1px solid ${cap.accent}30` }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d={cap.iconPath} stroke={cap.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        <h3 className="font-black text-white text-xl mb-1">{cap.title}</h3>
                        <p className="text-sm font-semibold mb-2" style={{ color: cap.accent }}>{cap.subtitle}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{cap.desc}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>Includes</p>
                        <ul className="space-y-2">
                          {cap.bullets.map(b => (
                            <li key={b} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cap.accent }} />{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${cap.accent}, transparent)` }} />
                  </div>
                );
              })()}

              {/* Card 02 */}
              {(() => {
                const cap = capabilities[1];
                return (
                  <div key={cap.title} className="group relative rounded-2xl p-7 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at 20% 20%, ${cap.glow} 0%, transparent 70%)` }} />
                    <span className="absolute top-6 right-6 font-black tracking-widest text-sm" style={{ color: "rgba(255,255,255,0.06)" }}>{cap.num}</span>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${cap.accent}15`, border: `1px solid ${cap.accent}30` }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d={cap.iconPath} stroke={cap.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <h3 className="font-black text-white text-lg mb-1">{cap.title}</h3>
                    <p className="text-xs font-semibold mb-3" style={{ color: cap.accent }}>{cap.subtitle}</p>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>{cap.desc}</p>
                    <ul className="space-y-1.5">
                      {cap.bullets.map(b => (
                        <li key={b} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cap.accent }} />{b}
                        </li>
                      ))}
                    </ul>
                    <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${cap.accent}, transparent)` }} />
                  </div>
                );
              })()}
            </div>

            {/* Bottom row — 3 equal cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {capabilities.slice(2).map(cap => (
                <div id={cap.title === "Backend & API Engineering" ? "backend" : cap.title === "System Integrations" ? "system-integrations" : undefined} key={cap.title} className="group relative rounded-2xl p-7 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-0.5 scroll-mt-28"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 20% 20%, ${cap.glow} 0%, transparent 70%)` }} />
                  <span className="absolute top-6 right-6 font-black tracking-widest text-sm" style={{ color: "rgba(255,255,255,0.06)" }}>{cap.num}</span>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${cap.accent}15`, border: `1px solid ${cap.accent}30` }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d={cap.iconPath} stroke={cap.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="font-black text-white text-lg mb-1">{cap.title}</h3>
                  <p className="text-xs font-semibold mb-3" style={{ color: cap.accent }}>{cap.subtitle}</p>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>{cap.desc}</p>
                  <ul className="space-y-1.5">
                    {cap.bullets.map(b => (
                      <li key={b} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cap.accent }} />{b}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${cap.accent}, transparent)` }} />
                </div>
              ))}
            </div>

            {/* Why Us strip */}
            <div className="rounded-2xl p-7 flex flex-col lg:flex-row lg:items-center gap-6"
              style={{ background: "linear-gradient(135deg, rgba(232,181,61,0.08) 0%, rgba(96,165,250,0.06) 100%)", border: "1px solid rgba(232,181,61,0.2)" }}>
              <div className="lg:w-48 flex-shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#E8B53D" }}>Why us</p>
                <p className="text-white font-black text-lg leading-tight">Why our solutions stand out</p>
              </div>
              <div className="h-px lg:h-12 lg:w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              <div className="flex flex-wrap gap-3 flex-1">
                {capWhyUs.map(w => (
                  <span key={w} className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-full"
                    style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#E8B53D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {w}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* OUR PROCESS */}
        <ProcessSection />

        {/* TECH STACK */}
        <section className="py-24 px-6" style={{ background: "#0f2447" }}>
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="mb-12">
              <p className="text-[#E8B53D] text-xs font-bold uppercase tracking-widest mb-3">Technologies</p>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                  Our tech <span style={{ color: "#E8B53D" }}>stack.</span>
                </h2>
                <p className="text-white/40 text-sm max-w-sm lg:text-right leading-relaxed">
                  We build high-performance, scalable software using a modern, battle-tested technology stack, engineered for speed, reliability, and long-term growth.
                </p>
              </div>
            </div>

            <div className="h-px mb-10" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Grid — 2 cols on md, 4 cols on lg */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {techStack.map((group) => (
                <div key={group.category}
                  className="group relative rounded-2xl p-6 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>

                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 15% 15%, ${group.accent}18 0%, transparent 70%)` }} />

                  {/* Icon + category */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${group.accent}18`, border: `1px solid ${group.accent}30` }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d={group.icon} stroke={group.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-white font-black text-xs uppercase tracking-wider">{group.category}</h3>
                  </div>

                  {/* Subtitle */}
                  <p className="text-[11px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>{group.sub}</p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map(item => (
                      <span key={item} className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: `${group.accent}12`, color: group.accent, border: `1px solid ${group.accent}22` }}>
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${group.accent}, transparent)` }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              <div>
                <p className="text-[#E8B53D] text-sm font-semibold uppercase tracking-widest mb-3">
                  Our difference
                </p>
                <h2 className="text-4xl font-bold text-[#1B3C6E] mb-6 leading-tight">
                  Why choose RIT for software?
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  We are not a body-shop. We are an engineering partner that takes ownership of
                  outcomes, not just outputs. Here is what that looks like in practice.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3C6E] text-white rounded-xl font-semibold hover:bg-[#E8B53D] transition-colors duration-300"
                >
                  Start a conversation
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="mt-12 lg:mt-0 space-y-5">
                {whyUs.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-[#E8B53D]/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#1B3C6E]/5 text-[#1B3C6E] flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1B3C6E] mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#1B3C6E] to-[#0f2447] py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to build your next product?
            </h2>
            <p className="text-blue-100/70 text-lg mb-10 leading-relaxed">
              Tell us what you are building. We will scope it, plan it, and ship it, on time and on budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-[#E8B53D] hover:bg-[#008f84] text-white font-semibold rounded-xl transition-colors duration-300 text-base"
              >
                Let us talk
              </a>
              <a
                href="/services"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors duration-300 text-base"
              >
                Explore all services
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
