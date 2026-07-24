"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * "What NOC Command watches so your team can sleep" — bespoke dark article
 * themed to the RITS navy + gold palette. Red/amber/green are kept as
 * alert-severity semantics; blue/cyan from the mockup mapped to gold/steel.
 * All styles scoped under `.noc`.
 */

const INSIGHTS = [
  { icon: "🧠", title: "Tribal Knowledge Dies with People", desc: "When the person who knows \"this alert always fires on deploy\" leaves, the team flies blind. NOC Command encodes that judgment automatically." },
  { icon: "🔇", title: "Muted Channels Miss Real Outages", desc: "Teams that silence noisy channels don't just miss noise — they miss the one critical alert buried in the feed at 3 a.m." },
  { icon: "⚡", title: "The Goal Is Fewer, Better Alerts", desc: "Not more coverage, not more dashboards. A short list your team can trust 100% of the time — that's the whole product." },
];

const FLOW = [
  { icon: "📡", name: "Ingest", desc: "All signals from your cloud estate arrive — metrics, logs, traces, uptime checks.", tint: "rgba(239,68,68,.12)" },
  { icon: "🔗", name: "Correlate", desc: "Related signals are grouped into a single incident fingerprint in real time.", tint: "rgba(245,158,11,.12)" },
  { icon: "⚖️", name: "Triage", desc: "AI scores severity. Noise is suppressed. Real incidents are escalated.", tint: "rgba(232,181,61,.14)" },
  { icon: "📎", name: "Enrich", desc: "Root cause, affected services, and historical context attached automatically.", tint: "rgba(94,130,174,.16)" },
  { icon: "📟", name: "Route", desc: "Right alert, right person, right view — at the moment it matters.", tint: "rgba(16,185,129,.12)" },
];

const SEC = [
  { icon: "☁️", title: "Microsoft Azure", desc: "Runs on Azure infrastructure with US data residency — your signals never leave the region.", tag: "US Residency" },
  { icon: "🛡️", title: "SOC 2 Audited", desc: "Controls are independently audited so you hand your auditors a report, not a questionnaire.", tag: "Audited Controls" },
  { icon: "🏥", title: "HIPAA Compliant", desc: "Designed for healthcare environments — patient data stays protected throughout the signal pipeline.", tag: "Healthcare Ready" },
  { icon: "🔑", title: "Role-Based Access", desc: "RBAC from day one. Engineers see what they need. Executives see what they need. Nothing more.", tag: "RBAC Day One" },
];

const PILLS = ["✅ Senior-only alert triage", "🔗 Cascade → single incident", "📎 Context on arrival", "🛡️ SOC 2 + HIPAA", "☁️ Azure · US residency", "😴 Fewer 3 a.m. pages"];

const BORDER = "rgba(255,255,255,.08)";
const MUTED = "#94a3b8";
const CARD = "#0f2044";

export default function NocCommandArticle() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("noc-vis"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".noc-reveal").forEach((el) => obs.observe(el));

    // stat counters (94, 1, 3)
    const targets = [94, 1, 3];
    const wrap = document.querySelector(".noc-stats");
    if (wrap) {
      const so = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document.querySelectorAll<HTMLElement>(".noc-stat-num[data-count]").forEach((el, i) => {
              const suffix = el.dataset.suffix || ""; const t = targets[i]; let c = 0; const inc = Math.max(1, t / 40);
              const timer = setInterval(() => { c += inc; if (c >= t) { c = t; clearInterval(timer); } el.textContent = Math.round(c) + suffix; }, 24);
            });
            so.disconnect();
          }
        });
      }, { threshold: 0.5 });
      so.observe(wrap);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <main className="noc min-h-screen flex flex-col" style={{ background: "#0a1628", color: "#fff" }}>
      <style>{`
        @keyframes noc-fadeup { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes noc-blink { 0%,100% { opacity:1; } 50% { opacity:.35; } }
        @keyframes noc-glowred { 0%,100% { box-shadow:0 0 0 0 rgba(239,68,68,.5); } 50% { box-shadow:0 0 0 10px rgba(239,68,68,0); } }
        @keyframes noc-flash { 0%,100% { background:rgba(239,68,68,.10); } 50% { background:rgba(239,68,68,.22); } }
        @keyframes noc-float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes noc-slide { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }
        .noc-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
        .noc-reveal.noc-vis { opacity:1; transform:translateY(0); }
        .noc-d1 { transition-delay:.1s; } .noc-d2 { transition-delay:.2s; } .noc-d3 { transition-delay:.3s; } .noc-d4 { transition-delay:.4s; }
        .noc-blink { animation: noc-blink 2s ease-in-out infinite; }
        .noc-glowred { animation: noc-glowred 1.6s ease-in-out infinite; }
        .noc-flash { animation: noc-flash 2s ease-in-out infinite; }
        .noc-float { animation: noc-float 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .noc-reveal,.noc-blink,.noc-glowred,.noc-flash,.noc-float { animation:none !important; transition:none !important; opacity:1 !important; transform:none !important; } }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden text-center px-6 pt-24 pb-20" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,181,61,.16) 0%, transparent 60%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-3xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All insights
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-7 text-[.82rem] font-bold uppercase tracking-wider" style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)", color: "#fca5a5" }}>
            <span className="noc-glowred w-2 h-2 rounded-full inline-block" style={{ background: "#ef4444" }} />
            Operations Intelligence
          </div>
          <h1 className="text-white font-black leading-[1.08]" style={{ fontSize: "clamp(2rem,5.5vw,3.8rem)" }}>
            Every ops team eventually<br /><span style={{ background: "linear-gradient(90deg,#ef4444,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>drowns in alerts.</span><br />We fix that.
          </h1>
          <p className="text-white/55 mt-5 mx-auto" style={{ maxWidth: 580, fontSize: "1.1rem" }}>
            The problem is rarely a lack of monitoring — it&apos;s too much monitoring with too little judgment.
          </p>

          {/* terminal */}
          <div className="mx-auto mt-10 text-left rounded-2xl overflow-hidden" style={{ maxWidth: 640, background: "rgba(13,24,41,.9)", border: "1px solid rgba(255,255,255,.1)", boxShadow: "0 24px 80px rgba(0,0,0,.6)" }}>
            <div className="flex items-center gap-2 px-5 py-3" style={{ background: "rgba(255,255,255,.04)", borderBottom: `1px solid ${BORDER}` }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#10b981" }} />
              <span className="flex-1 text-center text-white/40" style={{ fontFamily: "monospace", fontSize: ".8rem" }}>noc-command — live alert feed</span>
            </div>
            <div className="px-5 py-4" style={{ fontFamily: "monospace", fontSize: ".82rem" }}>
              <TLine ts="03:14:08" sev="info" msg="CPU spike on web-04 (82%)" ai="AI: noise" strike />
              <TLine ts="03:14:11" sev="warn" msg="Latency p99 > 800ms — us-east-1" ai="AI: correlated" strike />
              <TLine ts="03:14:13" sev="SEV-1" msg="Payment API timeout — 3 upstreams affected" ai="→ PAGED" crit />
              <TLine ts="03:14:14" sev="info" msg="Disk 73% on log-server-02" ai="AI: noise" strike />
              <TLine ts="03:14:16" sev="ok" msg="Root cause attached: DB connection pool exhausted" ai="AI: context" ok />
            </div>
          </div>

          {/* stats */}
          <div className="noc-stats flex flex-wrap justify-center mt-10">
            {[
              { num: "94", suffix: "%", label: "Alert noise reduced", color: "#ef4444", count: true },
              { num: "1", suffix: "", label: "Incident per cascade", color: "#f59e0b", count: true },
              { num: "3", suffix: "x", label: "Faster MTTD", color: "#E8B53D", count: true },
              { num: "ZZZ", suffix: "", label: "Full night's sleep", color: "#34d399", count: false },
            ].map((s, i) => (
              <div key={s.label} className="px-9 py-5 text-center" style={{ borderRight: i < 3 ? `1px solid ${BORDER}` : "none" }}>
                <div className="noc-stat-num font-black leading-none" style={{ fontSize: "2.1rem", color: s.color }} {...(s.count ? { "data-count": "1", "data-suffix": s.suffix } : {})}>{s.count ? "0" + s.suffix : s.num}</div>
                <div className="text-white/45 mt-1" style={{ fontSize: ".8rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOISE IS THE REAL OUTAGE */}
      <NocSection bg="#0d1829" label="The Core Problem" title="Noise Is the Real Outage" lead="When everything alerts, nothing does. Teams start ignoring the pager, muting channels, and building tribal knowledge about which alerts are &ldquo;real&rdquo; — knowledge that walks out the door when people do.">
        <div className="noc-reveal rounded-2xl overflow-hidden" style={{ background: "rgba(13,24,41,.8)", border: `1px solid ${BORDER}`, boxShadow: "0 16px 60px rgba(0,0,0,.5)" }}>
          <div className="grid md:grid-cols-2">
            <div className="p-8" style={{ borderRight: `1px solid ${BORDER}` }}>
              <div className="text-[.75rem] font-bold uppercase tracking-wider mb-5" style={{ color: "#ef4444" }}>🔴 Without NOC Command</div>
              <div className="font-black" style={{ fontSize: "2rem", color: "#ef4444" }}>247</div>
              <div className="text-white/45 text-sm mb-4">alerts in 10 minutes</div>
              {["CPU spike web-01 (81%)", "CPU spike web-02 (79%)", "Latency p99 high — us-east", "DB conn pool warn", "Payment timeout SEV-1 ← real", "Disk 71% log-server-02"].map((a, i) => (
                <div key={i} className="noc-flash flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1.5 text-white/70" style={{ fontFamily: "monospace", fontSize: ".8rem", border: "1px solid rgba(239,68,68,.15)", animationDelay: `${i * 0.3}s` }}>
                  <span className="noc-glowred w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#ef4444" }} />{a}
                </div>
              ))}
              <div className="mt-2" style={{ color: "rgba(239,68,68,.4)", fontSize: ".75rem", fontFamily: "monospace" }}>+ 240 more…</div>
            </div>
            <div className="p-8">
              <div className="text-[.75rem] font-bold uppercase tracking-wider mb-5" style={{ color: "#10b981" }}>🟢 With NOC Command</div>
              <div className="font-black" style={{ fontSize: "2rem", color: "#10b981" }}>1</div>
              <div className="text-white/45 text-sm mb-4">actionable incident, right context</div>
              {["CPU spikes web-01…03 ← correlated", "Latency: upstream symptom", "Disk: below threshold"].map((a, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1.5 text-white/60" style={{ fontFamily: "monospace", fontSize: ".8rem", background: "rgba(16,185,129,.06)", border: "1px solid rgba(16,185,129,.15)" }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#10b981" }} />{a}
                </div>
              ))}
              <div className="rounded-lg px-4 py-3 mt-2" style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)" }}>
                <div className="font-bold mb-1.5" style={{ color: "#6ee7b7", fontSize: ".85rem" }}>📟 SEV-1 — Payment API</div>
                <div className="text-white/45" style={{ fontSize: ".78rem", lineHeight: 1.6 }}>Root cause: DB connection pool exhausted<br />Affected: checkout, payment, order APIs<br />On-call notified automatically</div>
              </div>
              <div className="mt-3" style={{ color: "rgba(16,185,129,.5)", fontSize: ".75rem", fontFamily: "monospace" }}>246 signals suppressed as noise</div>
            </div>
          </div>
          <div className="grid md:grid-cols-3" style={{ borderTop: `1px solid ${BORDER}` }}>
            {INSIGHTS.map((it, i) => (
              <div key={it.title} className="px-7 py-6" style={{ borderRight: i < 2 ? `1px solid ${BORDER}` : "none" }}>
                <div className="text-2xl mb-2.5">{it.icon}</div>
                <div className="font-bold text-white mb-1.5 text-[.92rem]">{it.title}</div>
                <div className="text-white/45" style={{ fontSize: ".82rem", lineHeight: 1.6 }}>{it.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </NocSection>

      {/* FEATURES */}
      <NocSection bg="#0a1628" label="Core Capabilities" title="What NOC Command Actually Does" lead="NOC Command sits across your cloud estate and applies AI agents to the firehose of signals — so humans only see what needs a human.">
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard num="01 / Correlation" icon="🔗" title="Alert Correlation" accent="linear-gradient(90deg,#ef4444,#f59e0b)" iconBg="rgba(239,68,68,.12)" desc="Groups a cascade of related alerts into a single incident instead of forty pages. One CPU spike, one latency blip, one database warning — all correlated into one coherent story." >
            <svg viewBox="0 0 320 80" width="100%">
              {[20, 40, 60].map((y) => <circle key={y} cx="30" cy={y} r="8" fill="rgba(239,68,68,.3)" stroke="#ef4444" strokeWidth="1.5" />)}
              <circle cx="80" cy="25" r="8" fill="rgba(245,158,11,.3)" stroke="#f59e0b" strokeWidth="1.5" /><circle cx="80" cy="55" r="8" fill="rgba(245,158,11,.3)" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="130" cy="40" r="8" fill="rgba(232,181,61,.3)" stroke="#E8B53D" strokeWidth="1.5" />
              {[20, 40, 60].map((y) => <line key={y} x1="38" y1={y} x2="122" y2="40" stroke="rgba(255,255,255,.15)" strokeWidth="1" />)}
              <line x1="88" y1="25" x2="122" y2="40" stroke="rgba(255,255,255,.15)" strokeWidth="1" /><line x1="88" y1="55" x2="122" y2="40" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
              <line x1="138" y1="40" x2="184" y2="40" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" markerEnd="url(#nocArr)" />
              <defs><marker id="nocArr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="rgba(255,255,255,.4)" /></marker></defs>
              <rect x="188" y="28" width="120" height="24" rx="8" fill="rgba(16,185,129,.15)" stroke="rgba(16,185,129,.4)" strokeWidth="1.5" /><text x="248" y="44" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700" fontFamily="monospace">1 Incident</text>
              <text x="14" y="76" fill="rgba(255,255,255,.25)" fontSize="9" fontFamily="monospace">5 alerts</text>
            </svg>
          </FeatureCard>

          <FeatureCard num="02 / Triage" icon="⚖️" title="Severity Triage" accent="linear-gradient(90deg,#f59e0b,#10b981)" iconBg="rgba(245,158,11,.12)" desc="Separates a genuine SEV-1 from noise and routes each to the right person — automatically. No more guessing if the alert is real or waking someone up for a self-healing blip." >
            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center" style={{ fontFamily: "monospace", fontSize: ".72rem" }}>
              <div className="space-y-1">
                {["CPU 82%", "Latency high", "Disk 71%"].map((t) => <div key={t} className="px-2.5 py-1.5 rounded" style={{ background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)", color: "#fca5a5" }}>{t}</div>)}
              </div>
              <div className="text-center px-1" style={{ color: "#E8B53D" }}>AI⚡</div>
              <div className="space-y-1">
                <div className="px-2.5 py-1.5 rounded font-bold" style={{ background: "rgba(239,68,68,.2)", border: "1px solid rgba(239,68,68,.4)", color: "#fca5a5" }}>→ SEV-1: Page</div>
                <div className="px-2.5 py-1.5 rounded" style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}`, color: MUTED }}>→ Noise: suppress</div>
                <div className="px-2.5 py-1.5 rounded" style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}`, color: MUTED }}>→ Watch: log only</div>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard num="03 / Context" icon="📎" title="Context on Arrival" accent="linear-gradient(90deg,#E8B53D,#5E82AE)" iconBg="rgba(232,181,61,.14)" desc="The alert shows up with the likely cause and affected services already attached. Engineers spend zero time orienting — they spend all of their time fixing." >
            <div style={{ fontFamily: "monospace", fontSize: ".75rem" }}>
              <div className="font-bold mb-2" style={{ color: "#fca5a5" }}>📟 SEV-1 · Payment API Timeout</div>
              <div className="text-white/45" style={{ lineHeight: 1.8 }}>
                <span style={{ color: "#E8B53D" }}>Root cause:</span> DB conn pool exhausted<br />
                <span style={{ color: "#E8B53D" }}>Affected:</span> checkout, payment, orders<br />
                <span style={{ color: "#E8B53D" }}>Duration:</span> 4 min 22 sec<br />
                <span style={{ color: "#E8B53D" }}>Similar:</span> 2023-11-14 (same fix)
              </div>
            </div>
          </FeatureCard>

          <FeatureCard num="04 / Role Views" icon="👁️" title="Role-Aware Views" accent="linear-gradient(90deg,#5E82AE,#10b981)" iconBg="rgba(94,130,174,.16)" desc="A CEO sees a business summary. An on-call engineer sees exactly what they need. Same incident, right information, right person — no noise for either." >
            <div className="grid grid-cols-2 gap-2.5" style={{ fontFamily: "monospace", fontSize: ".72rem" }}>
              <div className="px-3 py-2.5 rounded-lg" style={{ background: "rgba(94,130,174,.12)", border: "1px solid rgba(94,130,174,.25)" }}>
                <div className="font-bold mb-1.5" style={{ color: "#86A8CE" }}>CEO View</div>
                <div className="text-white/45" style={{ lineHeight: 1.6 }}>Checkout affected<br />Est. impact: $12k/min<br />Team responding</div>
              </div>
              <div className="px-3 py-2.5 rounded-lg" style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)" }}>
                <div className="font-bold mb-1.5" style={{ color: "#6ee7b7" }}>On-Call View</div>
                <div className="text-white/45" style={{ lineHeight: 1.6 }}>Pool: 200/200 used<br />kubectl describe pod<br />Runbook: RB-0042</div>
              </div>
            </div>
          </FeatureCard>
        </div>
      </NocSection>

      {/* FLOW */}
      <section className="px-6 py-20" style={{ background: "#0d1829" }}>
        <div className="max-w-5xl mx-auto">
          <div className="noc-reveal text-center mb-14">
            <NocLabel center>The Signal Journey</NocLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>From Firehose to Focus</h2>
            <p className="text-white/50 mx-auto" style={{ maxWidth: 560 }}>Every signal your cloud estate emits passes through five stages before a human ever sees it.</p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
            <div aria-hidden className="hidden md:block absolute" style={{ top: 36, left: "10%", right: "10%", height: 2, background: "linear-gradient(90deg,#ef4444,#f59e0b,#E8B53D,#5E82AE,#10b981)" }} />
            {FLOW.map((s, i) => (
              <div key={s.name} className={`noc-reveal noc-d${(i % 4) + 1} relative z-10 flex flex-col items-center text-center px-3`}>
                <div className="noc-float w-[72px] h-[72px] rounded-full flex items-center justify-center text-2xl mb-5" style={{ background: s.tint, border: `2px solid ${BORDER}`, animationDelay: `${i * 0.3}s` }}>{s.icon}</div>
                <div className="font-bold text-white text-[.88rem] mb-1.5">{s.name}</div>
                <div className="text-white/45" style={{ fontSize: ".76rem", lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="px-6 py-20" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,181,61,.12) 0%, transparent 60%), #0a1628" }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="noc-reveal mb-8">
              <NocLabel>Security &amp; Compliance</NocLabel>
              <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", lineHeight: 1.15 }}>Visibility That Doesn&apos;t Cost You on Compliance</h2>
              <p className="text-white/50" style={{ maxWidth: 560 }}>Security and residency are designed in from day one — not bolted on later.</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {SEC.map((s, i) => (
                <div key={s.title} className={`noc-reveal noc-d${i + 1} rounded-2xl p-6 relative overflow-hidden`} style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: "linear-gradient(90deg,#E8B53D,#5E82AE)" }} />
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <div className="font-extrabold text-white text-[.9rem] mb-1.5">{s.title}</div>
                  <div className="text-white/45" style={{ fontSize: ".8rem", lineHeight: 1.6 }}>{s.desc}</div>
                  <span className="inline-block mt-2.5 text-[.7rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ background: "rgba(232,181,61,.15)", color: "#E8B53D" }}>{s.tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="noc-reveal noc-d2 flex flex-col items-center justify-center p-10 rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <svg viewBox="0 0 200 220" width="200">
              <defs>
                <linearGradient id="nocShield" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E8B53D" /><stop offset="100%" stopColor="#5E82AE" /></linearGradient>
                <radialGradient id="nocGlow" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(232,181,61,.3)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
              </defs>
              <ellipse cx="100" cy="130" rx="80" ry="60" fill="url(#nocGlow)" opacity=".6" />
              <path d="M100,10 L170,40 L170,110 Q170,170 100,200 Q30,170 30,110 L30,40 Z" fill="rgba(232,181,61,.08)" stroke="url(#nocShield)" strokeWidth="2" />
              <path d="M100,28 L156,52 L156,112 Q156,158 100,182 Q44,158 44,112 L44,52 Z" fill="rgba(94,130,174,.06)" stroke="rgba(94,130,174,.25)" strokeWidth="1" />
              <circle cx="100" cy="110" r="30" fill="rgba(16,185,129,.12)" stroke="rgba(16,185,129,.3)" strokeWidth="2" />
              <path d="M84,110 L96,122 L118,98" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="100" cy="72" r="5" fill="#F3C34E" opacity=".85"><animateTransform attributeName="transform" type="rotate" from="0 100 110" to="360 100 110" dur="6s" repeatCount="indefinite" /></circle>
              <circle cx="70" cy="115" r="4" fill="#86A8CE" opacity=".7"><animateTransform attributeName="transform" type="rotate" from="120 100 110" to="480 100 110" dur="8s" repeatCount="indefinite" /></circle>
              <circle cx="130" cy="115" r="3" fill="#10b981" opacity=".6"><animateTransform attributeName="transform" type="rotate" from="240 100 110" to="600 100 110" dur="5s" repeatCount="indefinite" /></circle>
            </svg>
            <div className="font-extrabold text-white mt-6 mb-2">Security by Design</div>
            <div className="text-white/45 text-center" style={{ fontSize: ".88rem", lineHeight: 1.6, maxWidth: 280 }}>Compliance controls built into the architecture from day one — not retrofitted when an auditor asks.</div>
            <div className="flex gap-2.5 mt-5 flex-wrap justify-center">
              {[["Azure", "#E8B53D"], ["SOC 2", "#34d399"], ["HIPAA", "#fcd34d"], ["RBAC", "#86A8CE"]].map(([t, c]) => (
                <span key={t} className="px-3.5 py-1 rounded-full text-[.75rem] font-semibold" style={{ background: `${c}22`, border: `1px solid ${c}44`, color: c }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden text-center px-6 py-24" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(232,181,61,.14) 0%, transparent 60%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-[.82rem] font-bold uppercase tracking-widest mb-4" style={{ color: "#E8B53D" }}>The Outcome</p>
          <h2 className="text-white font-black mx-auto mb-4" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", maxWidth: 720, lineHeight: 1.12 }}>
            Watch <span style={{ background: "linear-gradient(90deg,#E8B53D,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>less.</span><br />Trust what you see. Sleep.
          </h2>
          <p className="text-white/50 mx-auto mb-12" style={{ maxWidth: 500 }}>The point of a good NOC is not to watch more — it is to let your team watch less, and trust that the short list they do see is the one that matters.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {PILLS.map((p) => (
              <span key={p} className="rounded-full px-5 py-2.5 text-[.88rem] font-semibold text-white" style={{ background: "rgba(255,255,255,.05)", border: `1px solid ${BORDER}` }}>{p}</span>
            ))}
          </div>
          <Link href="/products/noc-command" className="btn-primary">
            See NOC Command in Action
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <p className="text-white/40 mt-5" style={{ fontSize: ".82rem" }}>No setup fees. Running against your estate in days, not months.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* helpers */
function TLine({ ts, sev, msg, ai, strike, crit, ok }: { ts: string; sev: string; msg: string; ai: string; strike?: boolean; crit?: boolean; ok?: boolean }) {
  const sevStyle: Record<string, { bg: string; c: string }> = {
    info: { bg: "rgba(94,130,174,.2)", c: "#86A8CE" },
    warn: { bg: "rgba(245,158,11,.2)", c: "#fcd34d" },
    "SEV-1": { bg: "rgba(239,68,68,.2)", c: "#fca5a5" },
    ok: { bg: "rgba(16,185,129,.2)", c: "#6ee7b7" },
  };
  const s = sevStyle[sev] || sevStyle.info;
  return (
    <div className="flex items-center gap-3 py-1.5 rounded" style={crit ? { background: "rgba(239,68,68,.07)", paddingInline: 6 } : undefined}>
      <span className="text-white/25 flex-shrink-0" style={{ fontSize: ".72rem" }}>{ts}</span>
      <span className="font-bold uppercase flex-shrink-0 rounded" style={{ fontSize: ".68rem", padding: "2px 8px", letterSpacing: ".5px", background: s.bg, color: s.c }}>{sev}</span>
      <span className="flex-1" style={{ color: crit ? "#fca5a5" : ok ? "#6ee7b7" : "rgba(255,255,255,.7)", fontWeight: crit ? 600 : 400, textDecoration: strike ? "line-through" : "none", opacity: strike ? 0.5 : 1 }}>{msg}</span>
      <span className="flex-shrink-0 rounded" style={{ fontSize: ".68rem", padding: "2px 8px", background: crit ? "rgba(239,68,68,.2)" : ok ? "rgba(16,185,129,.15)" : "rgba(232,181,61,.15)", color: crit ? "#fca5a5" : ok ? "#6ee7b7" : "#E8B53D" }}>{ai}</span>
    </div>
  );
}

function NocLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[.75rem] font-bold uppercase tracking-widest ${center ? "" : ""}`} style={{ color: "#E8B53D" }}>
      <span className="inline-block rounded" style={{ width: 18, height: 2, background: "#E8B53D" }} />
      {children}
    </span>
  );
}

function NocSection({ bg, label, title, lead, children }: { bg: string; label: string; title: string; lead: string; children: React.ReactNode }) {
  return (
    <section className="px-6 py-20" style={{ background: bg }}>
      <div className="max-w-5xl mx-auto">
        <div className="noc-reveal mb-12">
          <NocLabel>{label}</NocLabel>
          <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", lineHeight: 1.15 }}>{title}</h2>
          <p className="text-white/50" style={{ maxWidth: 620, fontSize: "1.05rem", lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: lead }} />
        </div>
        {children}
      </div>
    </section>
  );
}

function FeatureCard({ num, icon, title, accent, iconBg, desc, children }: { num: string; icon: string; title: string; accent: string; iconBg: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="noc-reveal rounded-2xl p-8 relative overflow-hidden transition-transform hover:-translate-y-1.5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
      <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: accent }} />
      <div className="text-[.7rem] font-extrabold uppercase tracking-widest mb-4 text-white/40">{num}</div>
      <div className="flex items-center gap-4 mb-5">
        <div className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl" style={{ background: iconBg, width: 52, height: 52 }}>{icon}</div>
        <div className="font-extrabold text-white text-lg">{title}</div>
      </div>
      <p className="text-white/50 mb-6" style={{ fontSize: ".92rem", lineHeight: 1.75 }}>{desc}</p>
      <div className="rounded-xl p-4" style={{ background: "rgba(0,0,0,.25)", border: `1px solid ${BORDER}` }}>{children}</div>
    </div>
  );
}
