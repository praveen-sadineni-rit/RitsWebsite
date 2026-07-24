"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * "From Demo to Dependable — Forward Deployed AI Engineering" — bespoke dark
 * article themed to the RITS navy+gold palette (purple/indigo/blue/cyan mapped
 * to gold/steel; green kept for production-ready, red/amber for failure states).
 * All styles scoped under `.fdea`.
 */

const BORDER = "rgba(255,255,255,.08)";
const CARD = "#0f2044";

const INSIGHTS = [
  { icon: "🧠", title: "Context Doesn't Survive Hand-offs", desc: "The hard decisions made during prototyping — why that prompt structure, why that chunking strategy — live in the builders' heads. When they hand over to a new team, the rebuild begins." },
  { icon: "🌪️", title: "Real Users Are Chaos Engineers", desc: "Users will find every input you didn't test, trigger every edge case you didn't guard, and prompt-inject in ways you never imagined. Happy-path demos offer no warning." },
  { icon: "💸", title: "Latency and Cost Bite at Scale", desc: "What runs fine at 10 req/min falls apart at 10,000. The demo never shows you cost per inference, p99 latency, or what happens when your vector DB has a bad day." },
];

const LOOP = [
  { num: "Step 01", icon: "🤝", title: "Partner", accent: "linear-gradient(90deg,#E8B53D,#B0810E)", iconBg: "rgba(232,181,61,.12)", dot: "#E8B53D", desc: "Sit with the customer's team. Understand goals and constraints. Define what success means before a single line of code ships.", bullets: ["Stakeholder goals mapped", "Success metrics defined", "Constraints surfaced early", "Data landscape assessed"] },
  { num: "Step 02", icon: "⚙️", title: "Build & Integrate", accent: "linear-gradient(90deg,#B0810E,#5E82AE)", iconBg: "rgba(176,129,14,.14)", dot: "#B0810E", desc: "Rapid prototyping, real API and data integration, RAG and agent workflows, and a real evaluation harness — not vibes.", bullets: ["Real API & data integration", "RAG + agent workflows", "Eval harness from day one", "Guardrails baked in"] },
  { num: "Step 03", icon: "🚀", title: "Deploy, Monitor, Iterate", accent: "linear-gradient(90deg,#5E82AE,#34d399)", iconBg: "rgba(94,130,174,.16)", dot: "#5E82AE", desc: "Ship to production, watch real usage, debug the edge cases that only real users find, and keep improving — without a hand-off reset.", bullets: ["Production deployment", "Cost & latency tracking", "Real usage debugging", "Rollback path ready"] },
  { num: "Step 04", icon: "🔁", title: "Feed Back", accent: "linear-gradient(90deg,#34d399,#10b981)", iconBg: "rgba(16,185,129,.12)", dot: "#10b981", desc: "Turn what you learn from real users into product and roadmap decisions. The engineers who built it inform the next iteration — no translation loss.", bullets: ["Usage patterns analysed", "Failure modes logged", "Roadmap informed", "Loop restarts with insight"] },
];

const GAP = [
  { icon: "🪠", title: "Data Plumbing", desc: "Chunking strategy, embedding pipeline, retrieval quality, data freshness, format normalization — none of this is visible in a demo." },
  { icon: "📊", title: "Real Evaluation", desc: "A real eval harness with representative edge cases, not vibes and cherry-picked examples. Measurable quality regression testing." },
  { icon: "🛡️", title: "Guardrails", desc: "Input validation, output filtering, prompt injection defence, toxicity screening — the list of ways LLMs can go wrong in production is long." },
  { icon: "⏱️", title: "Latency", desc: "p50 is a lie. p99 at 10× traffic is your reality. Streaming, caching, model selection, and infrastructure all have to be tuned for real load." },
  { icon: "💰", title: "Cost", desc: "Token costs that are fine at demo scale become business-model problems at production scale. Cost per inference has to be designed in, not optimized later." },
  { icon: "🎲", title: "Edge Cases", desc: "The 1,000 things real users do that you never tested. Adversarial inputs, unexpected languages, malformed data, simultaneous peak load." },
];

const CHECKS = [
  { title: "A Real Evaluation Harness", desc: "Not vibes. A structured test suite with representative inputs including adversarial cases, edge cases, and quality regression tests you can run on every deploy.", not: "Not: \"it looked good in the demo\"" },
  { title: "Guardrails for Bad Inputs & Outputs", desc: "Input validation that catches malformed data, prompt injection, and out-of-scope queries. Output filtering that catches hallucinations and harmful content before they reach users.", not: "Not: \"the model usually does the right thing\"" },
  { title: "Observability Into Cost & Latency", desc: "Token spend per call, p50/p95/p99 latency, error rates, and fallback rates — all tracked in real time. If you can't see it, you can't fix it when it breaks at 3 a.m.", not: "Not: \"we'll add monitoring later\"" },
  { title: "A Rollback Path", desc: "A way to turn the feature off, fall back to a previous version, or switch models without a full re-deploy. Every AI feature in production needs an emergency exit.", not: "Not: \"we'll figure it out if something goes wrong\"" },
];

const PROOF = [
  { icon: "🏗️", title: "Builder", desc: "Technical enough to own the architecture, data pipeline, RAG design, eval harness, and production deployment — end to end, no hand-offs." },
  { icon: "🤝", title: "Partner", desc: "Close enough to the customer to see what actually matters — not what's in the spec, but what users actually do and what the business actually needs." },
  { icon: "🔁", title: "In the Loop", desc: "Stays with the product through production. Turns real usage into roadmap decisions. The context that would be lost in a hand-off never leaves the building." },
];

export default function FdeAiArticle() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("fdea-vis"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fdea-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="fdea min-h-screen flex flex-col" style={{ background: "#0a1628", color: "#fff" }}>
      <style>{`
        @keyframes fdea-fadeup { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fdea-spin { from { transform:rotate(0); } to { transform:rotate(360deg); } }
        @keyframes fdea-pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }
        .fdea-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
        .fdea-reveal.fdea-vis { opacity:1; transform:translateY(0); }
        .fdea-d1 { transition-delay:.1s; } .fdea-d2 { transition-delay:.2s; } .fdea-d3 { transition-delay:.3s; } .fdea-d4 { transition-delay:.4s; }
        .fdea-spin { animation: fdea-spin 3s linear infinite; display:inline-block; }
        .fdea-pulse { animation: fdea-pulse 2.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .fdea-reveal,.fdea-spin,.fdea-pulse { animation:none !important; transition:none !important; opacity:1 !important; transform:none !important; } }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden text-center px-6 pt-24 pb-20" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(232,181,61,.14) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(94,130,174,.1) 0%, transparent 50%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(232,181,61,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,181,61,.05) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-3xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All insights
          </Link>
          <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-7 text-[.82rem] font-bold uppercase tracking-wider" style={{ background: "rgba(232,181,61,.12)", border: "1px solid rgba(232,181,61,.3)", color: "#E8B53D" }}>
            <span className="fdea-pulse w-2 h-2 rounded-full inline-block" style={{ background: "#E8B53D" }} />
            From Demo to Dependable
          </div>
          <h1 className="text-white font-black leading-[1.08]" style={{ fontSize: "clamp(2rem,5.5vw,3.8rem)" }}>
            The gap between an <span style={{ background: "linear-gradient(90deg,#F3C34E,#E8B53D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>impressive demo</span><br />and a <span style={{ background: "linear-gradient(90deg,#5E82AE,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>dependable product</span><br />is enormous.
          </h1>
          <p className="text-white/50 mt-5 mx-auto" style={{ maxWidth: 640, fontSize: "1.1rem" }}>
            It is almost never about the model. It&apos;s about data plumbing, evaluation, guardrails, latency, cost, and the thousand edge cases that only show up once real users arrive.
          </p>

          {/* compare */}
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 mt-10 max-w-2xl mx-auto text-left">
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(232,181,61,.25)" }}>
              <div className="text-[.72rem] font-bold uppercase tracking-wider mb-3.5" style={{ color: "#E8B53D" }}>🟡 The Demo</div>
              {["Curated happy-path inputs", "Static test dataset", "Controlled environment", "Vibes-based evaluation", "No error paths"].map((t) => (
                <div key={t} className="flex items-center gap-2.5 py-1 text-white/50" style={{ fontFamily: "monospace", fontSize: ".8rem" }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#E8B53D" }} />{t}</div>
              ))}
            </div>
            <div className="flex items-center justify-center text-2xl text-white/40 px-5">→</div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(16,185,129,.25)" }}>
              <div className="text-[.72rem] font-bold uppercase tracking-wider mb-3.5" style={{ color: "#34d399" }}>🟢 Production Reality</div>
              {["Messy, adversarial inputs", "Flaky upstream services", "Prompt injection attempts", "3 a.m. traffic spikes", "Cost and latency SLAs"].map((t) => (
                <div key={t} className="flex items-center gap-2.5 py-1 text-white/50" style={{ fontFamily: "monospace", fontSize: ".8rem" }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />{t}</div>
              ))}
            </div>
          </div>

          {/* stats */}
          <div className="flex flex-wrap justify-center mt-10">
            {[["1000+", "Edge cases in production", "linear-gradient(90deg,#F3C34E,#E8B53D)"], ["4", "FDE loop stages", "linear-gradient(90deg,#E8B53D,#5E82AE)"], ["0", "Hand-offs. Ever.", "linear-gradient(90deg,#5E82AE,#34d399)"]].map(([n, l, g], i) => (
              <div key={l} className="px-9 py-5 text-center" style={{ borderRight: i < 2 ? `1px solid ${BORDER}` : "none" }}>
                <div className="font-black leading-none" style={{ fontSize: "2rem", background: g, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                <div className="text-white/45 mt-1" style={{ fontSize: ".78rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PROTOTYPES STALL */}
      <section className="px-6 py-20" style={{ background: "#0d1829" }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="fdea-reveal mb-8">
              <FdeaLabel>The Core Problem</FdeaLabel>
              <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>Why Prototypes Stall</h2>
              <p className="text-white/50" style={{ maxWidth: 560, lineHeight: 1.75 }}>A prototype optimizes for a happy path in a controlled environment. Production optimizes for the opposite. And the context that bridges them doesn&apos;t survive a hand-off.</p>
            </div>
            <div className="space-y-4">
              {INSIGHTS.map((it, i) => (
                <div key={it.title} className={`fdea-reveal fdea-d${i + 1} flex gap-3.5 rounded-xl p-5 transition-transform hover:translate-x-1`} style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(232,181,61,.1)" }}>{it.icon}</div>
                  <div>
                    <div className="font-bold text-white text-[.92rem] mb-1">{it.title}</div>
                    <div className="text-white/45" style={{ fontSize: ".82rem", lineHeight: 1.6 }}>{it.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* path viz */}
          <div className="fdea-reveal fdea-d2 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${BORDER}` }}>
            <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,.03)" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} /><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} /><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#10b981" }} />
              <span className="flex-1 text-center text-white/40" style={{ fontFamily: "monospace", fontSize: ".78rem" }}>prototype vs production</span>
            </div>
            <div className="grid grid-cols-2" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div className="p-5" style={{ borderRight: `1px solid ${BORDER}` }}>
                <div className="text-[.7rem] font-bold uppercase tracking-wider pb-2.5 mb-3.5" style={{ color: "#E8B53D", borderBottom: `1px solid ${BORDER}` }}>🟡 Prototype Path</div>
                {[["✨", "Input", "\"Summarise this report\""], ["🤖", "Process", "Clean text, GPT-4, prompt v1"], ["✅", "Output", "Nice summary, demo applause"]].map(([ic, s, t]) => (
                  <div key={s} className="flex gap-2.5 mb-2.5" style={{ fontSize: ".8rem", lineHeight: 1.5 }}><span>{ic}</span><span className="text-white/45"><strong className="text-white block">{s}</strong>{t}</span></div>
                ))}
              </div>
              <div className="p-5">
                <div className="text-[.7rem] font-bold uppercase tracking-wider pb-2.5 mb-3.5" style={{ color: "#34d399", borderBottom: `1px solid ${BORDER}` }}>🟢 Production Reality</div>
                {[["💥", "Input", "200-page PDF with tables & images, uploaded at 3 a.m. with a prompt injection in the footer"], ["🔥", "Process", "Chunking fails, upstream OCR returns 500, context window blown"], ["⚠️", "Output", "Hallucinated summary, no guardrails, $2 per call"]].map(([ic, s, t]) => (
                  <div key={s} className="flex gap-2.5 mb-2.5" style={{ fontSize: ".8rem", lineHeight: 1.5 }}><span>{ic}</span><span className="text-white/45"><strong className="text-white block">{s}</strong>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="p-5">
              <div className="text-[.72rem] font-bold uppercase tracking-wider text-white/50 mb-3">What&apos;s Missing</div>
              <div className="space-y-1.5" style={{ fontFamily: "monospace", fontSize: ".78rem" }}>
                {["Eval harness for edge cases", "Input / output guardrails", "Cost & latency observability", "Rollback path", "Flaky upstream handling"].map((t) => (
                  <div key={t} className="flex gap-2 items-center" style={{ color: "#fca5a5" }}><span>✗</span> {t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FDE LOOP */}
      <section className="px-6 py-20" style={{ background: "#0a1628" }}>
        <div className="max-w-5xl mx-auto">
          <div className="fdea-reveal text-center mb-14">
            <FdeaLabel center>The Model</FdeaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>The Forward Deployed Engineer Loop</h2>
            <p className="text-white/50 mx-auto" style={{ maxWidth: 620 }}>Instead of a hand-off, we embed engineers inside your team who understand the problem firsthand and own the solution end to end.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {LOOP.map((c, i) => (
              <div key={c.title} className={`fdea-reveal fdea-d${i + 1} rounded-2xl p-8 relative overflow-hidden transition-transform hover:-translate-y-1.5`} style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: c.accent }} />
                <div className="text-[.7rem] font-extrabold uppercase tracking-widest mb-4 text-white/40">{c.num}</div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5" style={{ background: c.iconBg }}>{c.icon}</div>
                <div className="font-extrabold text-white text-lg mb-2.5">{c.title}</div>
                <p className="text-white/50 mb-5" style={{ fontSize: ".9rem", lineHeight: 1.75 }}>{c.desc}</p>
                <ul>
                  {c.bullets.map((b, j) => (
                    <li key={b} className="flex items-center gap-2.5 py-2 text-white/50" style={{ fontSize: ".82rem", borderBottom: j < c.bullets.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.dot }} />{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="fdea-reveal flex justify-center mt-8">
            <div className="rounded-full px-6 py-2.5 text-[.78rem] font-bold uppercase tracking-wider text-white/60 flex items-center gap-2" style={{ background: "radial-gradient(circle, rgba(232,181,61,.2), rgba(94,130,174,.1))", border: "1px solid rgba(255,255,255,.1)" }}>
              <span className="fdea-spin">↻</span> Continuous loop — no hand-off reset
            </div>
          </div>
        </div>
      </section>

      {/* GAP */}
      <section className="px-6 py-20" style={{ background: "#101d3a" }}>
        <div className="max-w-5xl mx-auto">
          <div className="fdea-reveal text-center mb-12">
            <FdeaLabel center>What the Gap Is Made Of</FdeaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>It Is Almost Never About the Model</h2>
            <p className="text-white/50 mx-auto" style={{ maxWidth: 620 }}>The six things between an impressive demo and a system people depend on — and why they only appear once real users arrive.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAP.map((g, i) => (
              <div key={g.title} className={`fdea-reveal fdea-d${(i % 4) + 1} rounded-xl p-5 transition-colors`} style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}` }}>
                <div className="text-2xl mb-2">{g.icon}</div>
                <div className="font-bold text-white mb-1">{g.title}</div>
                <div className="text-white/45" style={{ fontSize: ".78rem", lineHeight: 1.55 }}>{g.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="px-6 py-20" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,181,61,.1) 0%, transparent 55%), #0d1829" }}>
        <div className="max-w-5xl mx-auto">
          <div className="fdea-reveal text-center mb-12">
            <FdeaLabel center>Production Readiness</FdeaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", lineHeight: 1.15 }}>What to Insist on<br />Before You Call It Done</h2>
            <p className="text-white/50 mx-auto" style={{ maxWidth: 620 }}>Before an AI feature ships, four things must be true. If any one is missing, it is not production-ready — it is a very convincing demo.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {CHECKS.map((c, i) => (
              <div key={c.title} className={`fdea-reveal fdea-d${i + 1} flex gap-5 rounded-2xl p-8 transition-transform hover:-translate-y-1`} style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl font-black" style={{ border: "2px solid #10b981", background: "rgba(16,185,129,.15)", color: "#34d399" }}>✓</div>
                <div>
                  <div className="font-extrabold text-white mb-2">{c.title}</div>
                  <div className="text-white/50" style={{ fontSize: ".88rem", lineHeight: 1.7 }}>{c.desc}</div>
                  <span className="inline-block mt-2.5 text-[.72rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ background: "rgba(16,185,129,.1)", color: "#34d399" }}>{c.not}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="fdea-reveal flex items-center gap-4 rounded-xl px-7 py-5 mt-8" style={{ background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)" }}>
            <div className="text-3xl flex-shrink-0">🚫</div>
            <div className="text-white/75" style={{ fontSize: ".92rem", lineHeight: 1.6 }}>
              <strong className="text-white">If a feature cannot be measured and monitored, it is not production-ready —</strong> it is a very convincing demo. These four gates are non-negotiable before any AI feature ships to real users.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden text-center px-6 py-24" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(232,181,61,.12) 0%, transparent 60%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-[.82rem] font-bold uppercase tracking-widest mb-4" style={{ color: "#E8B53D" }}>The Takeaway</p>
          <h2 className="text-white font-black mx-auto mb-4" style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)", maxWidth: 780, lineHeight: 1.12 }}>
            AI that <span style={{ background: "linear-gradient(90deg,#F3C34E,#5E82AE,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>survives production</span> is built by people who live with the problem.
          </h2>
          <p className="text-white/50 mx-auto mb-12" style={{ maxWidth: 540 }}>Embedding engineers who are equal parts builder and partner is the difference between a proof of concept and a system your customers depend on every day.</p>
          <div className="grid md:grid-cols-3 gap-5 mb-12 text-left">
            {PROOF.map((p) => (
              <div key={p.title} className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}` }}>
                <div className="text-2xl mb-3">{p.icon}</div>
                <div className="font-extrabold text-white text-[.95rem] mb-1.5">{p.title}</div>
                <div className="text-white/45" style={{ fontSize: ".82rem", lineHeight: 1.65 }}>{p.desc}</div>
              </div>
            ))}
          </div>
          <Link href="/contact" className="btn-primary">
            Talk to a Forward Deployed Engineer
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <p className="text-white/40 mt-5" style={{ fontSize: ".82rem" }}>No hand-offs. No rebuilds. Just a team that lives with the problem.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FdeaLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[.75rem] font-bold uppercase tracking-widest ${center ? "justify-center" : ""}`} style={{ color: "#E8B53D" }}>
      <span className="inline-block rounded" style={{ width: 18, height: 2, background: "#E8B53D" }} />
      {children}
    </span>
  );
}
