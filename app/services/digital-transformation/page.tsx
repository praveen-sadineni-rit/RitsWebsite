"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function TransformAnim() {
  const [active, setActive] = useState(0);
  const phases = [
    { label: "Legacy", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5m4 0h10m-10 0v4a2 2 0 002 2h4a2 2 0 002-2v-4m0 0h4", color: "#94a3b8", bg: "#f1f5f9" },
    { label: "Assess", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "#86A8CE", bg: "#EAF1F8" },
    { label: "Design", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", color: "#C99A2E", bg: "#FBF4DD" },
    { label: "Build", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color: "#E8B53D", bg: "#f0fdfb" },
    { label: "Modern", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "#5E82AE", bg: "#EAF1F8" },
  ];

  useState(() => {
    const t = setInterval(() => setActive(a => (a + 1) % phases.length), 1600);
    return () => clearInterval(t);
  });

  return (
    <div className="w-full max-w-sm">
      {/* Arrow flow */}
      <div className="flex items-center justify-between gap-1 mb-6">
        {phases.map((p, i) => (
          <div key={p.label} className="flex items-center gap-1 flex-1">
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
                style={{ background: i <= active ? `${p.color}20` : "rgba(255,255,255,0.04)", border: `1.5px solid ${i <= active ? p.color : "rgba(255,255,255,0.1)"}`, boxShadow: i === active ? `0 0 16px ${p.color}50` : "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d={p.icon} stroke={i <= active ? p.color : "rgba(255,255,255,0.2)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: i <= active ? p.color : "rgba(255,255,255,0.2)" }}>{p.label}</span>
            </div>
            {i < phases.length - 1 && (
              <div className="w-4 h-px flex-shrink-0 mb-4 transition-all duration-500"
                style={{ background: i < active ? phases[i].color : "rgba(255,255,255,0.1)" }} />
            )}
          </div>
        ))}
      </div>
      {/* Active stage card */}
      <div className="rounded-2xl p-6 text-center transition-all duration-500"
        style={{ background: `${phases[active].color}15`, border: `1px solid ${phases[active].color}30` }}>
        <p className="font-black text-2xl mb-1" style={{ color: phases[active].color }}>{phases[active].label}</p>
        <p className="text-white/40 text-xs">Stage {active + 1} of {phases.length}</p>
      </div>
    </div>
  );
}

const pillars = [
  {
    title: "Process Modernization",
    desc: "Audit, redesign, and automate business processes to eliminate bottlenecks and manual work that slows you down.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    color: "#86A8CE",
  },
  {
    title: "Legacy System Migration",
    desc: "Modernize monolithic applications and outdated systems to cloud-native, microservices architectures, with zero data loss.",
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    color: "#C99A2E",
  },
  {
    title: "Data & Analytics",
    desc: "Unified data platforms, real-time dashboards, and analytics pipelines that turn raw data into competitive advantage.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    color: "#5E82AE",
  },
  {
    title: "AI-Powered Automation",
    desc: "Embed AI and machine learning into your workflows, from intelligent document processing to predictive operations.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    color: "#E8B53D",
  },
  {
    title: "Customer Experience",
    desc: "Redesign digital touchpoints, web, mobile, and portal, to deliver seamless, personalized experiences at scale.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    color: "#E8B53D",
  },
  {
    title: "Change Management",
    desc: "Technology is only half the transformation. We embed adoption frameworks so your teams actually embrace what's new.",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    color: "#F3C34E",
  },
];

const industries = ["Financial Services", "Healthcare", "Manufacturing", "Retail & E-Commerce", "Government", "Logistics"];

const outcomes = [
  { stat: "60%", label: "Avg operational cost reduction" },
  { stat: "4x", label: "Faster time-to-market" },
  { stat: "85%", label: "Employee adoption rate" },
  { stat: "2.5x", label: "ROI within 18 months" },
];

const approach = [
  { num: "01", title: "Discovery & Assessment", desc: "We map your current state, systems, processes, pain points, and strategic goals. No assumptions." },
  { num: "02", title: "Transformation Roadmap", desc: "A prioritized, phased roadmap with clear ROI milestones. You see the full plan before a single line of code is written." },
  { num: "03", title: "Agile Execution", desc: "Cross-functional squads deliver transformation in sprints, iterating quickly, validating constantly." },
  { num: "04", title: "Measure & Scale", desc: "We instrument outcomes from day one so you can see the impact and scale what's working." },
];

export default function DigitalTransformationPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #0f2447 60%, #0f2447 100%)" }} className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#E8B53D] text-xs font-bold tracking-widest uppercase mb-4">Digital Transformation</p>
            <h1 className="text-white font-black leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              From legacy<br />
              <span style={{ color: "#E8B53D" }}>to leading edge.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              We don&apos;t just digitize existing processes, we reimagine how your business operates and competes in a digital-first world.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Strategy + Execution", "Measurable ROI", "Change Management"].map(t => (
                <span key={t} className="px-4 py-2 rounded-full text-xs font-bold border border-white/10 text-white/60">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="btn-primary">Start Your Transformation</a>
              <a href="/services" className="btn-outline-white">All Services</a>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <TransformAnim />
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-16 px-6" style={{ background: "#f8f9fa" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map(o => (
              <div key={o.stat} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="font-black text-4xl text-[#1B3C6E] mb-2">{o.stat}</p>
                <p className="text-gray-500 text-sm font-medium">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">What We Transform</p>
            <h2 className="text-3xl font-black text-[#0f172a]">Every layer of your business</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Digital transformation isn&apos;t just software, it&apos;s people, process, and technology working together.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(p => (
              <div key={p.title} id={p.title === "Legacy System Migration" ? "legacy-modernization" : p.title === "AI-Powered Automation" ? "process-automation" : undefined} className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 scroll-mt-24">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${p.color}15` }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d={p.icon} stroke={p.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0f172a] mb-2 text-lg">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="py-20 px-6" style={{ background: "#0f2447" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">How We Work</p>
            <h2 className="text-3xl font-black text-white">Our transformation framework</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map(a => (
              <div key={a.num} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="font-black text-3xl text-[#E8B53D] mb-3">{a.num}</p>
                <h3 className="font-bold text-white mb-2">{a.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="section-eyebrow">Industries</p>
          <h2 className="text-3xl font-black text-[#0f172a] mb-4">We&apos;ve transformed companies across</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {industries.map(ind => (
              <span key={ind} className="px-5 py-2.5 rounded-full font-semibold text-sm border-2 border-[#1B3C6E]/10 text-[#1B3C6E] hover:bg-[#1B3C6E] hover:text-white transition-all cursor-default">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #1B3C6E 0%, #E8B53D 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white font-black text-4xl mb-4">Ready to transform?</h2>
          <p className="text-white/70 text-lg mb-8">Let&apos;s map your current state and build a roadmap to what&apos;s next.</p>
          <a href="/contact" className="btn-outline-white">Schedule a Strategy Call</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
