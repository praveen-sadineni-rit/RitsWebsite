"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Animated SAP Activate methodology card (Prepare → Explore → Realize → Deploy → Run)
function SapActivateAnim() {
  const [step, setStep] = useState(0);
  const phases = [
    { label: "Prepare", note: "scope & landscape", color: "#86A8CE" },
    { label: "Explore", note: "fit-to-standard", color: "#5E82AE" },
    { label: "Realize", note: "build & configure", color: "#C99A2E" },
    { label: "Deploy", note: "cutover & go-live", color: "#E8B53D" },
    { label: "Run", note: "AMS & optimize", color: "#F3C34E" },
  ];
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % (phases.length + 2)), 1000);
    return () => clearInterval(t);
  }, []);
  const active = step % (phases.length + 2);
  return (
    <div className="w-full max-w-xs">
      <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: "#161b22" }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-500/70" />
          <span className="ml-2 text-white/30 text-xs font-mono">SAP Activate</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E8B53D] animate-pulse" />
            <span className="text-[#E8B53D] text-[10px] font-mono">S/4HANA</span>
          </div>
        </div>
        <div className="p-5 space-y-3">
          {phases.map((s, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <div key={s.label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 relative font-black text-[11px]"
                  style={{
                    background: done || current ? `${s.color}20` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${done || current ? s.color : "rgba(255,255,255,0.06)"}`,
                    boxShadow: current ? `0 0 12px ${s.color}50` : "none",
                    color: done || current ? s.color : "rgba(255,255,255,0.2)",
                  }}
                >
                  {i + 1}
                  {current && <div className="absolute inset-0 rounded-lg animate-ping" style={{ background: `${s.color}15` }} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: done || current ? "white" : "rgba(255,255,255,0.25)" }}>
                      {s.label}
                      <span className="ml-2 text-white/30 font-normal">{s.note}</span>
                    </span>
                    {done && <span className="text-[10px] font-mono" style={{ color: s.color }}>✓</span>}
                    {current && <span className="text-[10px] font-mono text-white/40 animate-pulse">active</span>}
                  </div>
                  <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: done ? "100%" : current ? "60%" : "0%", background: s.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-5 pb-4 text-[10px] font-mono text-white/20 flex justify-between">
          <span>clean core</span>
          <span>onsite · offshore</span>
        </div>
      </div>
    </div>
  );
}

const capabilities = [
  {
    title: "S/4HANA Transformation",
    desc: "Greenfield and brownfield migration, clean-core transformation, landscape simplification, and upgrade programs for manufacturing and industrial sectors.",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    color: "#E8B53D",
  },
  {
    title: "Global Template Rollouts",
    desc: "Standardized SAP deployments across geographies — template rollout, GST and tax localization, compliance alignment, and go-live stabilization.",
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20",
    color: "#86A8CE",
  },
  {
    title: "Integration & PLM",
    desc: "End-to-end integration with Enovia 3DX, BOM and material synchronization, shop-floor connectivity, APS integration, and cross-system collaboration.",
    icon: "M6 3v12a3 3 0 003 3h6M6 3a2 2 0 100-.001M6 15a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4z",
    color: "#5E82AE",
  },
  {
    title: "Analytics on SAP",
    desc: "SAP BTP and Analytics Cloud reporting, inventory control analytics, and demand and supply planning insight built on your live SAP data.",
    icon: "M3 3v18h18M7 15l3-4 3 3 4-6",
    color: "#C99A2E",
  },
  {
    title: "Core SAP Modules",
    desc: "Configuration, enhancement, and workflow automation across FI/CO, MM, SD, PP, and QM — including Fiori apps and approver-driven material workflows.",
    icon: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    color: "#F3C34E",
  },
  {
    title: "AMS & Support",
    desc: "24×7 application management services — incident and enhancement handling, SLA-based run and optimize, and continuous improvement of your SAP estate.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    color: "#E8B53D",
  },
];

const stack = [
  { category: "Core", items: ["S/4HANA", "SAP ECC", "Fiori", "ABAP"] },
  { category: "Modules", items: ["FI/CO", "MM", "SD", "PP", "QM"] },
  { category: "Analytics", items: ["SAP BTP", "Analytics Cloud", "Datasphere", "Power BI"] },
  { category: "Integration", items: ["Integration Suite", "IDoc / BAPI", "Enovia 3DX", "APIs"] },
  { category: "PLM & Supply", items: ["PLM", "BOM", "APS", "MRP"] },
  { category: "Run", items: ["AMS", "Solution Manager", "SLA Support", "Monitoring"] },
];

const outcomes = [
  { stat: "5-mo", label: "Template rollout delivered" },
  { stat: "24×7", label: "Global AMS coverage" },
  { stat: "Multi-geo", label: "Standardized rollouts" },
  { stat: "Clean-core", label: "S/4HANA migrations" },
];

export default function SapEnterprisePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 60%, #0f2447 100%)" }} className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#E8B53D] text-xs font-bold tracking-widest uppercase mb-4">SAP &amp; Enterprise Platforms</p>
            <h1 className="text-white font-black leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              SAP, delivered<br />
              <span style={{ color: "#E8B53D" }}>end to end.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              Implement, integrate, and run SAP with one accountable team — from S/4HANA transformation and global rollouts to PLM integration, analytics, and 24×7 support.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["S/4HANA", "Global Rollouts", "Integration & PLM", "AMS & Support"].map((t) => (
                <span key={t} className="px-4 py-2 rounded-full text-xs font-bold border border-white/10 text-white/60">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="btn-primary">Talk to an SAP Expert</a>
              <a href="/services" className="btn-outline-white">All Services</a>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <SapActivateAnim />
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-16 px-6" style={{ background: "#f8f9fa" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((o) => (
              <div key={o.label} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="font-black text-3xl text-[#1B3C6E] mb-2">{o.stat}</p>
                <p className="text-gray-500 text-sm font-medium">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">SAP Capabilities</p>
            <h2 className="text-3xl font-black text-[#0f172a]">Full-lifecycle SAP</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">From transformation and rollouts to integration, analytics, and day-2 support — the complete SAP estate, one team.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c) => (
              <div key={c.title} className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${c.color}15` }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d={c.icon} stroke={c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0f172a] mb-2 text-lg">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH / PLATFORM STACK */}
      <section className="py-20 px-6" style={{ background: "#0f2447" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">Platform Coverage</p>
            <h2 className="text-3xl font-black text-white">Across the SAP landscape</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stack.map((s) => (
              <div key={s.category} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-[#E8B53D] text-xs font-bold uppercase tracking-widest mb-4">{s.category}</p>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white/70" style={{ background: "rgba(255,255,255,0.06)" }}>{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">Our Approach</p>
            <h2 className="text-3xl font-black text-[#0f172a]">From assessment to run</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Assess & Scope", desc: "We map your landscape, business goals, and fit-to-standard gaps into a clear SAP roadmap." },
              { num: "02", title: "Design & Build", desc: "Clean-core configuration, template design, integrations, and analytics built to your process." },
              { num: "03", title: "Deploy & Localize", desc: "Multi-geo rollout, localization and compliance, cutover, and go-live stabilization." },
              { num: "04", title: "Run & Optimize", desc: "24×7 AMS, enhancements, and continuous improvement under one SLA and governance model." },
            ].map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#E8B53D]/10 text-[#E8B53D] font-black text-sm flex items-center justify-center mx-auto mb-4">{s.num}</div>
                <h3 className="font-bold text-[#0f172a] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #E8B53D 0%, #1B3C6E 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white font-black text-4xl mb-4">Ready to move your SAP roadmap forward?</h2>
          <p className="text-white/70 text-lg mb-8">Let&apos;s talk through your S/4HANA, rollout, integration, or support needs — and map a clear plan.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-outline-white">Talk to an SAP Expert</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
