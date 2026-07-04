"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";

function IconDoc() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconCode() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconCamera() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const VETTING_STEPS = [
  { number: "01", label: "Application Review", detail: "Resume, portfolio & GitHub audit", Icon: IconDoc },
  { number: "02", label: "Identity & Docs", detail: "ID verification, work authorization", Icon: IconShield },
  { number: "03", label: "Technical Screen", detail: "Coding challenge & system design", Icon: IconCode },
  { number: "04", label: "Video Interview", detail: "Communication & culture fit", Icon: IconCamera },
  { number: "05", label: "Reference Check", detail: "Previous employer verification", Icon: IconUsers },
];

const ROLES = [
  { title: "Frontend Engineers", tags: ["React", "Vue", "Angular"] },
  { title: "Backend Engineers", tags: ["Node", "Python", "Java", "Go"] },
  { title: "Full Stack Engineers", tags: ["End-to-end", "API design"] },
  { title: "Mobile Developers", tags: ["iOS", "Android", "React Native", "Flutter"] },
  { title: "AI / ML Engineers", tags: ["LLMs", "MLOps", "PyTorch"] },
  { title: "DevOps & Cloud", tags: ["AWS", "GCP", "Kubernetes", "Terraform"] },
  { title: "QA Engineers", tags: ["Automation", "Cypress", "Playwright"] },
  { title: "Engineering Managers", tags: ["Team leadership", "Delivery"] },
  { title: "Product Managers", tags: ["Roadmap", "Stakeholder mgmt"] },
  { title: "UX / UI Designers", tags: ["Figma", "Design systems"] },
];

const MODELS = [
  {
    name: "Dedicated",
    hours: "Full-time 40 hrs/week",
    min: "Min. 3 months",
    description: "One engineer embedded in your team, fully focused on your roadmap. Attends standups, joins Slack, lives your sprint cycle.",
    highlight: true,
  },
  {
    name: "Part-Time",
    hours: "20 hrs/week",
    min: "Project basis",
    description: "Targeted expertise on a specific problem, a migration, a feature spike, a security audit, without the full-time commitment.",
    highlight: false,
  },
  {
    name: "Team Extension",
    hours: "Multiple engineers",
    min: "Long-term",
    description: "Scale a pod of 3-10 vetted engineers around your core team. Same vetting process, coordinated onboarding, single point of contact.",
    highlight: false,
  },
  {
    name: "Contract-to-Hire",
    hours: "Full-time 40 hrs/week",
    min: "Convert anytime",
    description: "Evaluate a consultant on real work before committing to a full-time offer. If it's a fit, we convert the engagement, no re-hiring process, no lost momentum.",
    highlight: false,
    anchorId: "contract-to-hire",
  },
];

const TIMELINE = [
  { day: "Day 1", action: "Receive requirements", note: "Role brief, tech stack, culture context" },
  { day: "Day 2", action: "Shortlist submitted", note: "2-3 fully vetted candidates with profiles" },
  { day: "Day 3", action: "Interviews", note: "You choose who to meet, we handle scheduling" },
  { day: "Day 4", action: "Offer & acceptance", note: "Contract signed, paperwork completed" },
  { day: "Day 5", action: "Onboarded", note: "Engineer in your tools, first standup done" },
];

function VettingPipeline() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Application", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "#60a5fa" },
    { label: "ID Verified", icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2", color: "#34d399" },
    { label: "Tech Screen", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color: "#a78bfa" },
    { label: "Interview", icon: "M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z", color: "#00A99D" },
    { label: "✓ Placed", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", color: "#00A99D" },
  ];
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % (steps.length + 2)), 1200);
    return () => clearInterval(t);
  }, []);
  const active = step % (steps.length + 2);
  return (
    <div className="w-full max-w-sm">
      {/* Pipeline steps */}
      <div className="flex flex-col gap-3">
        {steps.map((s, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <div key={s.label} className="flex items-center gap-4 transition-all duration-500">
              <div className="relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                style={{ background: done||current ? `${s.color}25` : "rgba(255,255,255,0.04)", border: `1.5px solid ${done||current ? s.color : "rgba(255,255,255,0.08)"}`, boxShadow: current ? `0 0 16px ${s.color}50` : "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d={s.icon} stroke={done||current ? s.color : "rgba(255,255,255,0.2)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {current && <div className="absolute inset-0 rounded-full animate-ping" style={{background:`${s.color}20`}}/>}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold transition-colors duration-500" style={{ color: done||current ? "white" : "rgba(255,255,255,0.25)" }}>
                    {s.label}
                  </span>
                  {done && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-2 h-px" style={{ background: done ? s.color+"60" : "rgba(255,255,255,0.05)" }}/>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <span className="text-white/20 text-xs font-mono tracking-widest">Only 15% pass our screening</span>
      </div>
    </div>
  );
}

const KANBAN_COLUMNS = [
  {
    label: "Engineering",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.2)",
    cards: [
      { role: "Frontend Engineer", tags: ["React", "Vue", "Angular"], exp: "6 yrs", avail: "5 days" },
      { role: "Backend Engineer", tags: ["Node", "Python", "Go"], exp: "8 yrs", avail: "3 days" },
      { role: "Full Stack Engineer", tags: ["Next.js", "TypeScript"], exp: "7 yrs", avail: "7 days" },
      { role: "Mobile Developer", tags: ["iOS", "Android", "Flutter"], exp: "5 yrs", avail: "4 days" },
    ],
  },
  {
    label: "AI & Data",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
    cards: [
      { role: "AI / ML Engineer", tags: ["PyTorch", "LLMs", "MLOps"], exp: "5 yrs", avail: "6 days" },
      { role: "Data Engineer", tags: ["Spark", "Airflow", "dbt"], exp: "7 yrs", avail: "4 days" },
      { role: "Data Scientist", tags: ["Python", "TensorFlow", "SQL"], exp: "6 yrs", avail: "5 days" },
    ],
  },
  {
    label: "Infrastructure",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
    cards: [
      { role: "DevOps Engineer", tags: ["AWS", "Kubernetes", "Terraform"], exp: "9 yrs", avail: "3 days" },
      { role: "Cloud Architect", tags: ["GCP", "Azure", "CDK"], exp: "10 yrs", avail: "7 days" },
      { role: "Site Reliability", tags: ["Prometheus", "Grafana"], exp: "6 yrs", avail: "5 days" },
    ],
  },
  {
    label: "Product & Design",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
    cards: [
      { role: "QA Engineer", tags: ["Cypress", "Playwright", "Selenium"], exp: "5 yrs", avail: "4 days" },
      { role: "UX / UI Designer", tags: ["Figma", "Design Systems"], exp: "6 yrs", avail: "6 days" },
      { role: "Product Manager", tags: ["Roadmap", "Stakeholder mgmt"], exp: "8 yrs", avail: "5 days" },
      { role: "Eng. Manager", tags: ["Team leadership", "Delivery"], exp: "11 yrs", avail: "7 days" },
    ],
  },
];

function KanbanBoard() {
  const [activeCol, setActiveCol] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
      {KANBAN_COLUMNS.map((col, ci) => (
        <div key={col.label}
          style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: 14, padding: "18px 14px", cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={() => setActiveCol(ci)}
        >
          {/* Column header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: col.color }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: col.color }}>{col.label}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: col.color, background: `${col.color}20`, borderRadius: 99, padding: "2px 8px" }}>{col.cards.length}</span>
          </div>

          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {col.cards.map((card, ki) => {
              const isHighlighted = activeCol === ci && (tick % col.cards.length) === ki;
              return (
                <div key={card.role}
                  style={{
                    background: isHighlighted ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)",
                    border: isHighlighted ? `1px solid ${col.color}60` : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    transition: "all 0.35s ease",
                    transform: isHighlighted ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: isHighlighted ? `0 6px 20px ${col.color}20` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", margin: 0 }}>{card.role}</p>
                    <span style={{ fontSize: 10, color: "#00cfb4", fontWeight: 600, background: "rgba(0,207,180,0.12)", borderRadius: 99, padding: "2px 7px", whiteSpace: "nowrap" }}>≈ {card.avail}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                    {card.tags.map(t => (
                      <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 99, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}>{t}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: 0 }}>{card.exp} avg. experience</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StaffAugmentationPage() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null, i: number) => {
    revealRefs.current[i] = el;
  };

  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <section
          style={{
            background: "linear-gradient(135deg, #0f2447 0%, #0f2447 45%, #1B3C6E 100%)",
            position: "relative",
            overflow: "hidden",
          }}
          className="py-24 md:py-32"
        >
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", top: "-80px", right: "-80px", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(0,169,157,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="section-eyebrow" style={{ color: "#00A99D" }}>Staff Augmentation</p>
                <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
                  The right engineer.{" "}
                  <span style={{ color: "#00A99D" }}>In days, not months.</span>
                </h1>
                <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", maxWidth: "58ch", marginBottom: "2.5rem" }}>
                  Vetted senior talent who integrate into your team from day one. No ramp-up theatre, no bait-and-switch.
                </p>

                <div className="flex-wrap sm:flex-nowrap" style={{ display: "flex", gap: "12px", marginBottom: "2.5rem" }}>
                  {[
                    { value: "5-day avg.", label: "placement" },
                    { value: "Senior only", label: "no juniors placed" },
                    { value: "ID + skills", label: "verified" },
                  ].map((s) => (
                    <div key={s.value} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 18px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "6px" }}>
                      <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#00cfb4", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>{s.value}</span>
                      <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <a href="/contact" className="btn-primary">Tell us who you need <IconArrow /></a>
                  <a href="#how-we-vet" className="btn-outline-white">See our vetting process</a>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <VettingPipeline />
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section style={{ background: "#f0f4fa", borderBottom: "1px solid #dce4f0", padding: "18px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "center" }}>
              {[
                "Only 15% of applicants pass our screening",
                "Senior engineers with 5+ years experience",
                "Typical onboarding: 5 business days",
                "US & global talent pools",
              ].map((item) => (
                <span key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", fontWeight: 600, color: "#1B3C6E" }}>
                  <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#00A99D", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white" }}>
                    <IconCheck />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE VET */}
        <section id="how-we-vet" style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 0)} className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
              <p className="section-eyebrow">Our vetting process</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
                We check everything.{" "}
                <span style={{ color: "#00A99D" }}>So you don&apos;t have to.</span>
              </h2>
              <p style={{ color: "#495057", fontSize: "1rem", maxWidth: "54ch", margin: "0 auto", lineHeight: 1.7 }}>
                Every candidate goes through a five-stage pipeline before you ever see their name. Most don&apos;t make it through.
              </p>
            </div>

            <div ref={(el) => addReveal(el, 1)} className="reveal" style={{ position: "relative" }}>
              <div aria-hidden="true" className="hidden lg:block" style={{ position: "absolute", top: "36px", left: "calc(10% + 36px)", right: "calc(10% + 36px)", height: "2px", background: "linear-gradient(90deg, #00A99D 0%, #1B3C6E 100%)", zIndex: 0 }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "24px", position: "relative", zIndex: 1 }}>
                {VETTING_STEPS.map((step, i) => (
                  <div key={step.number} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: i === 0 ? "#00A99D" : "#ffffff", border: `2px solid ${i === 0 ? "#00A99D" : "#dce4f0"}`, display: "flex", alignItems: "center", justifyContent: "center", color: i === 0 ? "#ffffff" : "#1B3C6E", marginBottom: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", flexShrink: 0 }}>
                      <step.Icon />
                    </div>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: "#00A99D", textTransform: "uppercase", marginBottom: "6px" }}>Step {step.number}</span>
                    <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f2447", marginBottom: "6px", lineHeight: 1.3 }}>{step.label}</p>
                    <p style={{ fontSize: "0.78rem", color: "#6c757d", lineHeight: 1.5, maxWidth: "18ch" }}>{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div ref={(el) => addReveal(el, 2)} className="reveal" style={{ marginTop: "56px", background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)", borderRadius: "12px", padding: "40px 48px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)", fontWeight: 900, color: "#00cfb4", lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}>~15%</span>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginTop: "8px" }}>of applicants pass all five stages.</p>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", marginTop: "6px", maxWidth: "42ch", lineHeight: 1.6 }}>
                  We run the full pipeline before any candidate reaches you. Your time is spent evaluating finalists, not filtering applicants.
                </p>
              </div>
              <a href="/contact" className="btn-primary" style={{ flexShrink: 0 }}>Start a search <IconArrow /></a>
            </div>
          </div>
        </section>

        {/* ROLES — Live Talent Board */}
        <section style={{ background: "#0f1e3a", padding: "96px 0", overflow: "hidden" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00cfb4", background: "rgba(0,207,180,0.1)", border: "1px solid rgba(0,207,180,0.25)", borderRadius: 99, padding: "5px 14px", marginBottom: 14 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00cfb4", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
                  Live Talent Board
                </div>
                <h2 style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: 0 }}>
                  Every discipline, senior level only.
                </h2>
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", maxWidth: 300, lineHeight: 1.6, margin: 0 }}>
                Not seeing your stack? We place across <strong style={{ color: "rgba(255,255,255,0.7)" }}>every technology</strong>, if the role exists in tech, we can fill it.
              </p>
            </div>

            {/* Kanban columns */}
            <KanbanBoard />

            {/* Bottom note */}
            <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", background: "rgba(0,207,180,0.06)", border: "1px solid rgba(0,207,180,0.15)", borderRadius: 10 }}>
              <span style={{ fontSize: 18 }}>💡</span>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", margin: 0 }}>
                <strong style={{ color: "white" }}>Not limited to the above.</strong> We also staff cloud architects, data engineers, cybersecurity, blockchain, AR/VR, embedded systems, and more.
              </p>
              <a href="/contact" style={{ marginLeft: "auto", flexShrink: 0, fontSize: "0.8rem", fontWeight: 700, color: "#00cfb4", textDecoration: "none", whiteSpace: "nowrap" }}>Tell us what you need →</a>
            </div>
          </div>
        </section>

        {/* ENGAGEMENT MODELS */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 5)} className="reveal" style={{ marginBottom: "48px" }}>
              <p className="section-eyebrow">Engagement models</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em" }}>
                One model for every scale of need.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 6)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {MODELS.map((model) => (
                <div id={model.anchorId} key={model.name} className="scroll-mt-28" style={{ borderRadius: "10px", padding: "36px 32px", background: model.highlight ? "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)" : "#f8f9fa", border: model.highlight ? "none" : "1px solid #dce4f0", position: "relative" }}>
                  {model.highlight && (
                    <span style={{ position: "absolute", top: "20px", right: "20px", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "100px", background: "#00A99D", color: "#ffffff" }}>Most popular</span>
                  )}
                  <p style={{ fontWeight: 800, fontSize: "1.3rem", color: model.highlight ? "#ffffff" : "#0f2447", marginBottom: "8px", letterSpacing: "-0.01em" }}>{model.name}</p>
                  <p style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: model.highlight ? "#00cfb4" : "#00A99D", marginBottom: "4px" }}>{model.hours}</p>
                  <p style={{ fontSize: "0.78rem", color: model.highlight ? "rgba(255,255,255,0.5)" : "#6c757d", marginBottom: "20px" }}>{model.min}</p>
                  <div style={{ width: "40px", height: "3px", background: "#00A99D", borderRadius: "2px", marginBottom: "20px" }} />
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: model.highlight ? "rgba(255,255,255,0.72)" : "#495057" }}>{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{ background: "#f0f4fa", padding: "96px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 7)} className="reveal" style={{ marginBottom: "56px" }}>
              <p className="section-eyebrow">Placement timeline</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                From request to onboarded in 5 days.
              </h2>
              <p style={{ color: "#495057", fontSize: "0.95rem", maxWidth: "48ch", lineHeight: 1.7 }}>
                We run the process in parallel, not sequence. By the time most firms send their first resume, your engineer is writing code.
              </p>
            </div>

            <div ref={(el) => addReveal(el, 8)} className="reveal" style={{ position: "relative", paddingLeft: "2px" }}>
              <div aria-hidden="true" style={{ position: "absolute", top: "24px", bottom: "24px", left: "23px", width: "2px", background: "linear-gradient(180deg, #00A99D 0%, #1B3C6E 100%)" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                {TIMELINE.map((item, i) => (
                  <div key={item.day} style={{ display: "flex", gap: "24px", alignItems: "flex-start", paddingBottom: i < TIMELINE.length - 1 ? "32px" : "0" }}>
                    <div style={{ flexShrink: 0, width: "48px", height: "48px", borderRadius: "50%", background: i === TIMELINE.length - 1 ? "#00A99D" : "#ffffff", border: `2px solid ${i === TIMELINE.length - 1 ? "#00A99D" : "#dce4f0"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: i === TIMELINE.length - 1 ? "#ffffff" : "#1B3C6E", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", zIndex: 1, position: "relative" }}>
                      {item.day.replace("Day ", "D")}
                    </div>
                    <div style={{ paddingTop: "10px", paddingBottom: "4px" }}>
                      <p style={{ fontWeight: 700, fontSize: "1rem", color: "#0f2447", marginBottom: "4px", lineHeight: 1.3 }}>{item.action}</p>
                      <p style={{ fontSize: "0.82rem", color: "#6c757d", lineHeight: 1.5 }}>{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #0f2447 60%, #1B3C6E 100%)", padding: "96px 0", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(0,169,157,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative" style={{ textAlign: "center" }}>
            <div ref={(el) => addReveal(el, 9)} className="reveal">
              <p className="section-eyebrow" style={{ color: "#00cfb4" }}>Ready to hire</p>
              <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.025em", marginBottom: "1.25rem", lineHeight: 1.1 }}>
                Tell us who you need.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", maxWidth: "46ch", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
                Share your requirements and we&apos;ll have a shortlist of vetted candidates in your inbox within 48 hours.
              </p>
              <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/contact" className="btn-primary">Start your search <IconArrow /></a>
                <a href="tel:2485226740" className="btn-outline-white">Call 248-522-6740</a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
