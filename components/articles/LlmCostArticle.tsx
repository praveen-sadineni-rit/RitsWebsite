"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * "The Hidden Cost of Running AI at Scale — LLM Cost & Latency in Production"
 * Bespoke dark article themed to the RITS navy+gold palette. The source's
 * gold-on-black + orange decoration is mapped to navy backgrounds with gold as
 * the primary accent, steel-blue as the neutral secondary, green kept for
 * savings / cheaper / sweet-spot, and red kept for expensive / avoid.
 * All styles scoped under `.costa`.
 */

const BORDER = "rgba(255,255,255,.08)";
const CARD = "#0f2044";
const GOLD = "#E8B53D";
const GOLD_LT = "#F3C34E";
const GOLD_DEEP = "#B0810E";
const STEEL = "#5E82AE";
const GREEN = "#34d399";
const GREEN_D = "#10b981";
const RED = "#f87171";
const RED_D = "#ef4444";

const DIM_ICON = { width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: "1rem", background: "rgba(232,181,61,.1)", border: "1px solid rgba(232,181,61,.2)" } as const;

const LEVERS = [
  { n: "1", title: "Prompt Compression", desc: "Trim system prompts. Remove redundant instructions. Compress retrieved context with summarization before injection. Most system prompts can be cut 40–60% with no quality loss — teams just never audit them.", before: "2,400 tokens/call", after: "960 tokens/call after compression audit", save: "60%", saveLbl: "cost reduction" },
  { n: "2", title: "Model Routing", desc: "Route intelligently: use flagship models only where quality truly requires it — complex reasoning, high-stakes decisions. Use mini models for classification, FAQ answers, formatting tasks. Build a router classifier with a cheap model to decide.", before: "100% flagship calls", after: "20% flagship, 80% mini", save: "75%", saveLbl: "cost reduction" },
  { n: "3", title: "Semantic Caching", desc: "Cache LLM responses by embedding similarity, not exact string match. “What are your hours?” and “When are you open?” are the same question. At scale, 20–40% of queries are near-duplicates — every cache hit is a free response.", before: "100,000 API calls/day", after: "60,000 real calls (40% cache hit rate)", save: "40%", saveLbl: "on cached" },
  { n: "4", title: "Output Constraints", desc: "Set max_tokens strictly. Use structured outputs (JSON mode) — models generate less preamble. Avoid “explain your reasoning” unless you actually need it. Output tokens cost 4× input tokens.", before: "~800 output tokens avg", after: "~320 tokens with max_tokens + structured output", save: "55%", saveLbl: "on output cost" },
  { n: "5", title: "Async Batching", desc: "Not every LLM call needs a real-time response. Report generation, nightly summarization, classification pipelines, and email drafts can all be batched. Batch APIs typically offer 50% cost reduction with a longer SLA (minutes vs. milliseconds).", before: "Real-time inference pricing", after: "Batch API pricing for async workloads", save: "50%", saveLbl: "batch discount" },
];

const CHECKLIST = [
  "Log tokens + cost on every LLM call from Day 1",
  "Set p99 latency budgets before writing prompt code",
  "Audit system prompt tokens — cut the fat before launch",
  "Default to mini models, upgrade only where justified",
  "Model your cost at 10k, 100k, 1M users before building",
];

export default function LlmCostArticle() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("costa-vis"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".costa-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="costa min-h-screen flex flex-col" style={{ background: "#0a1628", color: "#fff" }}>
      <style>{`
        @keyframes costa-fadeup { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes costa-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(.8); } }
        @keyframes costa-meter { 0% { width:6%; } 100% { width:92%; } }
        @keyframes costa-glow { 0%,100% { text-shadow:0 0 8px rgba(232,181,61,.4); } 50% { text-shadow:0 0 22px rgba(232,181,61,.85); } }
        @keyframes costa-stream { 0%,100% { height:5px; opacity:.3; } 50% { height:34px; opacity:1; } }
        .costa-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
        .costa-reveal.costa-vis { opacity:1; transform:translateY(0); }
        .costa-d1 { transition-delay:.06s; } .costa-d2 { transition-delay:.13s; } .costa-d3 { transition-delay:.2s; } .costa-d4 { transition-delay:.27s; } .costa-d5 { transition-delay:.34s; }
        .costa-pulse { animation: costa-pulse 1.8s ease-in-out infinite; }
        .costa-meterfill { animation: costa-meter 4s ease-in-out infinite alternate; }
        .costa-glow { animation: costa-glow 2.5s ease-in-out infinite; }
        .costa-streambar { width:6px; border-radius:3px; background:linear-gradient(180deg,${GOLD_LT},${GOLD}); animation: costa-stream 1.8s ease-in-out infinite; }
        .costa-card { transition: border-color .25s, box-shadow .25s, transform .15s; }
        .costa-card:hover { border-color: rgba(232,181,61,.45); box-shadow: 0 8px 40px rgba(232,181,61,.16); transform: translateY(-3px); }
        .costa-lever:hover { border-color: rgba(232,181,61,.45); box-shadow: 0 4px 30px rgba(232,181,61,.16); transform: translateX(4px); }
        @media (prefers-reduced-motion: reduce) { .costa-reveal,.costa-pulse,.costa-meterfill,.costa-glow,.costa-streambar { animation:none !important; transition:none !important; opacity:1 !important; transform:none !important; } .costa-meterfill { width:78% !important; } }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden text-center px-6 pt-24 pb-20" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 38%, rgba(232,181,61,.14) 0%, transparent 65%), radial-gradient(ellipse at 75% 85%, rgba(94,130,174,.1) 0%, transparent 55%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(232,181,61,.06) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
        <div className="relative max-w-3xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All insights
          </Link>
          <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-7 text-[.82rem] font-bold uppercase tracking-wider" style={{ background: "rgba(232,181,61,.12)", border: "1px solid rgba(232,181,61,.3)", color: GOLD }}>
            <span className="costa-pulse w-2 h-2 rounded-full inline-block" style={{ background: GOLD }} />
            LLM Cost Engineering
          </div>
          <h1 className="text-white font-black leading-[1.12]" style={{ fontSize: "clamp(2.1rem,5.5vw,4rem)", letterSpacing: "-0.03em" }}>
            The <span style={{ background: `linear-gradient(90deg,${GOLD_LT},${GOLD},${GOLD_DEEP})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hidden Cost</span><br />of Running AI at Scale
          </h1>
          <p className="text-white/55 mt-5 mx-auto" style={{ maxWidth: 640, fontSize: "1.15rem", lineHeight: 1.7 }}>
            What costs <em style={{ color: GOLD_LT, fontStyle: "normal", fontWeight: 600 }}>$0.002 per call</em> at demo scale costs <em style={{ color: RED, fontStyle: "normal", fontWeight: 600 }}>$200,000 a year</em> at production scale. Most teams find out too late. Cost is a product decision, not an ops afterthought.
          </p>

          {/* Cost meter */}
          <div className="rounded-2xl mx-auto mt-9 mb-9 relative overflow-hidden text-left" style={{ maxWidth: 480, padding: "1.25rem 1.75rem", background: "rgba(15,32,68,.9)", border: "1px solid rgba(232,181,61,.25)" }}>
            <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: `linear-gradient(90deg,${GOLD},${GOLD_DEEP},${STEEL})` }} />
            <div className="uppercase tracking-wider text-white/45" style={{ fontSize: ".72rem", marginBottom: ".4rem" }}>Cost Accumulation — Illustrative</div>
            <div className="font-black" style={{ fontSize: "2rem", color: GOLD_LT, letterSpacing: "-.02em" }}>$0.4271 <span className="text-white/40" style={{ fontSize: ".85rem", fontWeight: 500 }}>accumulated this session</span></div>
            <div className="rounded-full mt-3 overflow-hidden" style={{ height: 5, background: "rgba(255,255,255,.06)" }}>
              <div className="costa-meterfill h-full rounded-full" style={{ background: `linear-gradient(90deg,${GOLD},${GOLD_LT})`, boxShadow: "0 0 10px rgba(232,181,61,.6)" }} />
            </div>
            <div className="text-white/40 mt-2" style={{ fontSize: ".78rem" }}>4,182 API calls · 6.7M tokens processed</div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {[["$0.002 → $200k", "Per call → per year"], ["5 Levers", "You can actually control"], ["10–100×", "Model tier cost difference"]].map(([v, l]) => (
              <div key={l} className="costa-card rounded-xl text-center" style={{ padding: ".75rem 1.25rem", minWidth: 160, background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}` }}>
                <div className="font-extrabold" style={{ fontSize: "1.25rem", color: GOLD }}>{v}</div>
                <div className="text-white/40 mt-1 uppercase tracking-wider" style={{ fontSize: ".7rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1 — 4 DIMENSIONS */}
      <section className="px-6 py-20" style={{ background: "#0d1829" }}>
        <div className="max-w-5xl mx-auto">
          <div className="costa-reveal mb-10">
            <CostaLabel>Section 01</CostaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-.025em" }}>The <span style={{ color: GOLD_LT }}>4 Dimensions</span> of LLM Cost</h2>
            <p className="text-white/50" style={{ maxWidth: 600 }}>Every API call is a product of four variables. Miss one and your cost model is wrong before you ship.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Input tokens */}
            <div className="costa-reveal costa-card rounded-2xl p-7 relative overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div style={DIM_ICON}>📥</div>
              <div className="font-bold mb-1.5" style={{ fontSize: "1.05rem", color: GOLD_LT }}>Input Tokens</div>
              <div className="text-white/50 mb-4" style={{ fontSize: ".88rem" }}>System prompt + user message + conversation history + retrieved context. Often <strong style={{ color: GOLD }}>80% of total token spend</strong> — and teams rarely measure it upfront.</div>
              <Bars rows={[["System prompt", 55, "~55%", `linear-gradient(90deg,${GOLD},${GOLD_LT})`], ["Context / RAG", 30, "~30%", `linear-gradient(90deg,${GOLD_DEEP},${GOLD})`], ["User message", 15, "~15%", `linear-gradient(90deg,${STEEL},#86A8CE)`]]} />
            </div>

            {/* Output tokens */}
            <div className="costa-reveal costa-d1 costa-card rounded-2xl p-7 relative overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div style={DIM_ICON}>📤</div>
              <div className="font-bold mb-1.5" style={{ fontSize: "1.05rem", color: GOLD_LT }}>Output Tokens</div>
              <div className="text-white/50" style={{ fontSize: ".88rem" }}>Completion text generated by the model. <strong style={{ color: RED }}>Costlier per token</strong> than input — typically 3–5× more expensive — and length is hard to predict.</div>
              <div className="flex gap-4 items-center mt-4">
                <div className="flex-1">
                  <div className="text-white/40 mb-1.5" style={{ fontSize: ".75rem" }}>Cost ratio: Input vs Output</div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="text-white/50" style={{ fontSize: ".75rem", width: 52 }}>Input</div>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ height: 9, background: "rgba(255,255,255,.05)" }}><div style={{ height: "100%", width: "40%", borderRadius: 99, background: `linear-gradient(90deg,${GOLD},${GOLD_LT})` }} /></div>
                    <div className="text-white/40" style={{ fontSize: ".72rem" }}>$1×</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="text-white/50" style={{ fontSize: ".75rem", width: 52 }}>Output</div>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ height: 9, background: "rgba(255,255,255,.05)" }}><div style={{ height: "100%", width: "100%", borderRadius: 99, background: `linear-gradient(90deg,${RED},${RED_D})` }} /></div>
                    <div style={{ fontSize: ".72rem", color: RED }}>$4×</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-black" style={{ fontSize: "2rem", color: RED }}>4×</div>
                  <div className="text-white/40" style={{ fontSize: ".68rem" }}>typical<br />multiplier</div>
                </div>
              </div>
            </div>

            {/* Model tier */}
            <div className="costa-reveal costa-card rounded-2xl p-7 relative overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div style={DIM_ICON}>🧠</div>
              <div className="font-bold mb-1.5" style={{ fontSize: "1.05rem", color: GOLD_LT }}>Model Tier</div>
              <div className="text-white/50 mb-3" style={{ fontSize: ".88rem" }}>Choosing the wrong model tier is the single biggest lever on your bill. Flagship vs. mini vs. fine-tuned: a <strong style={{ color: GOLD }}>10–100× cost difference</strong> for equivalent tasks.</div>
              <Bars rows={[["Flagship", 100, "100%", `linear-gradient(90deg,${RED},${RED_D})`], ["Mini", 6, "6%", `linear-gradient(90deg,${GOLD},${GOLD_LT})`], ["Fine-tuned", 3, "3%", `linear-gradient(90deg,${GREEN},${GREEN_D})`]]} />
            </div>

            {/* Calls per user */}
            <div className="costa-reveal costa-d1 costa-card rounded-2xl p-7 relative overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div style={DIM_ICON}>🔄</div>
              <div className="font-bold mb-1.5" style={{ fontSize: "1.05rem", color: GOLD_LT }}>Calls per User per Session</div>
              <div className="text-white/50" style={{ fontSize: ".88rem" }}>The multiplier <strong style={{ color: GOLD }}>nobody models upfront</strong>. A feature with 3 LLM calls per interaction at 10k DAU is 30,000 calls/day — before you&apos;ve thought about retry logic or fallbacks.</div>
              <div className="mt-3.5">
                <svg width="100%" height="80" viewBox="0 0 280 80" style={{ overflow: "visible" }}>
                  <defs>
                    <linearGradient id="costa-callGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={GOLD} /><stop offset="100%" stopColor={RED_D} /></linearGradient>
                    <linearGradient id="costa-callArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(232,181,61,.25)" /><stop offset="100%" stopColor="rgba(232,181,61,0)" /></linearGradient>
                  </defs>
                  <path d="M10,70 C40,68 80,60 120,45 C160,30 200,10 270,4 L270,75 L10,75Z" fill="url(#costa-callArea)" />
                  <path d="M10,70 C40,68 80,60 120,45 C160,30 200,10 270,4" fill="none" stroke="url(#costa-callGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="10" cy="70" r="4" fill={GOLD} />
                  <circle cx="120" cy="45" r="4" fill={GOLD_DEEP} />
                  <circle cx="270" cy="4" r="4" fill={RED_D} />
                  <text x="14" y="68" fontSize="9" fill="#86A8CE">100 users</text>
                  <text x="86" y="40" fontSize="9" fill="#86A8CE">1k users</text>
                  <text x="210" y="10" fontSize="9" fill={RED}>100k users</text>
                  <line x1="10" y1="75" x2="270" y2="75" stroke="rgba(255,255,255,.07)" strokeWidth="1" />
                </svg>
                <div className="text-white/40 text-center" style={{ fontSize: ".72rem" }}>Cost scales superlinearly with adoption — model it early</div>
              </div>
            </div>
          </div>

          {/* Token breakdown */}
          <div className="costa-reveal costa-card rounded-2xl p-7 mt-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="font-bold mb-4" style={{ fontSize: ".9rem", color: GOLD }}>Typical Token Breakdown — Per Single API Call</div>
            <svg width="100%" height="52" viewBox="0 0 700 52" preserveAspectRatio="none">
              <defs>
                <linearGradient id="costa-tb1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={GOLD_DEEP} /><stop offset="100%" stopColor={GOLD} /></linearGradient>
                <linearGradient id="costa-tb2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8a6a12" /><stop offset="100%" stopColor={GOLD_LT} /></linearGradient>
                <linearGradient id="costa-tb3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3d5473" /><stop offset="100%" stopColor={STEEL} /></linearGradient>
                <linearGradient id="costa-tb4" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7c2b2b" /><stop offset="100%" stopColor={RED_D} /></linearGradient>
              </defs>
              <rect x="0" y="10" width="280" height="32" rx="6" fill="url(#costa-tb1)" />
              <text x="140" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0a1628">System Prompt · 40%</text>
              <rect x="284" y="10" width="210" height="32" rx="6" fill="url(#costa-tb2)" />
              <text x="389" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0a1628">Context · 30%</text>
              <rect x="498" y="10" width="70" height="32" rx="6" fill="url(#costa-tb3)" />
              <text x="533" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">User · 10%</text>
              <rect x="572" y="10" width="128" height="32" rx="6" fill="url(#costa-tb4)" />
              <text x="636" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">Output · 20%</text>
            </svg>
            <div className="flex flex-wrap mt-3.5" style={{ gap: ".5rem 1.5rem" }}>
              {[["System Prompt (input)", GOLD], ["Context / RAG (input)", GOLD_LT], ["User Message (input)", STEEL], ["Completion (output · 4× cost/token)", RED_D]].map(([t, c]) => (
                <div key={t} className="flex items-center gap-1.5 text-white/50" style={{ fontSize: ".72rem" }}><span className="rounded-full" style={{ width: 9, height: 9, background: c as string }} />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — LATENCY */}
      <section className="px-6 py-20" style={{ background: "#0a1628" }}>
        <div className="max-w-5xl mx-auto">
          <div className="costa-reveal mb-10">
            <CostaLabel>Section 02</CostaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-.025em" }}>Latency: What <span style={{ color: GOLD_LT }}>Users Actually Feel</span></h2>
            <p className="text-white/50" style={{ maxWidth: 600 }}>Response time isn&apos;t a single number. It&apos;s a sequence of events — and only some of them are in your control.</p>
          </div>

          {/* Timeline */}
          <div className="costa-reveal rounded-2xl p-8 mb-8 overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="font-bold mb-5" style={{ fontSize: ".9rem", color: GOLD }}>LLM Response Timeline</div>
            <svg width="100%" height="130" viewBox="0 0 800 130" style={{ overflow: "visible" }}>
              <rect x="40" y="52" width="720" height="16" rx="8" fill="rgba(255,255,255,.04)" />
              <rect x="40" y="52" width="90" height="16" rx="8" fill="rgba(94,130,174,.6)" />
              <text x="85" y="44" textAnchor="middle" fontSize="10" fill="#86A8CE">Request</text>
              <rect x="130" y="52" width="120" height="16" fill="rgba(232,181,61,.55)" />
              <text x="190" y="44" textAnchor="middle" fontSize="10" fill={GOLD_LT} fontWeight="700">TTFT</text>
              <line x1="130" y1="30" x2="130" y2="90" stroke="rgba(232,181,61,.4)" strokeWidth="1" strokeDasharray="4,3" />
              <text x="130" y="105" textAnchor="middle" fontSize="9" fill="#86A8CE">0ms</text>
              <line x1="250" y1="30" x2="250" y2="90" stroke="rgba(232,181,61,.4)" strokeWidth="1" strokeDasharray="4,3" />
              <text x="250" y="105" textAnchor="middle" fontSize="9" fill={GOLD_LT}>~500ms</text>
              <rect x="250" y="52" width="340" height="16" fill="rgba(232,181,61,.28)" />
              <text x="420" y="44" textAnchor="middle" fontSize="10" fill={GOLD}>Streaming Chunks →</text>
              {[290, 330, 375, 418, 460, 503, 550].map((x) => (<rect key={x} x={x} y="56" width="3" height="8" rx="1" fill={GOLD_LT} opacity="0.7" />))}
              <rect x="590" y="52" width="80" height="16" fill="rgba(248,113,113,.55)" />
              <text x="630" y="44" textAnchor="middle" fontSize="10" fill={RED}>Last Token</text>
              <line x1="590" y1="30" x2="590" y2="90" stroke="rgba(248,113,113,.4)" strokeWidth="1" strokeDasharray="4,3" />
              <text x="590" y="105" textAnchor="middle" fontSize="9" fill={RED}>~2.5s</text>
              <line x1="670" y1="30" x2="670" y2="90" stroke="rgba(248,113,113,.4)" strokeWidth="1" strokeDasharray="4,3" />
              <text x="670" y="105" textAnchor="middle" fontSize="9" fill="#86A8CE">~3s</text>
              <line x1="480" y1="75" x2="480" y2="90" stroke={GOLD_LT} strokeWidth="1.5" />
              <text x="480" y="100" textAnchor="middle" fontSize="9" fill={GOLD_LT}>p50</text>
              <line x1="660" y1="75" x2="660" y2="90" stroke={RED} strokeWidth="2" />
              <text x="660" y="100" textAnchor="middle" fontSize="9" fill={RED}>p99</text>
              <text x="400" y="125" textAnchor="middle" fontSize="9" fill="#6b7f9e">↑ Streaming makes p50 feel like TTFT to users — even when total time is 3s</text>
            </svg>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="costa-reveal costa-card rounded-2xl p-7" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="font-bold mb-1.5" style={{ fontSize: "1rem", color: GOLD_LT }}>⚡ Time to First Token (TTFT)</div>
              <div className="text-white/50" style={{ fontSize: ".85rem" }}>This is the number that determines whether your product &quot;feels instant.&quot; Users tolerate long completions — they don&apos;t tolerate a blank screen. Optimize TTFT first.</div>
              <div className="flex gap-4 mt-4">
                <div className="text-center flex-1 rounded-xl p-3" style={{ background: "rgba(232,181,61,.07)" }}>
                  <div className="font-black" style={{ fontSize: "1.4rem", color: GOLD_LT }}>&lt;200ms</div>
                  <div className="text-white/40" style={{ fontSize: ".7rem" }}>Feels instant</div>
                </div>
                <div className="text-center flex-1 rounded-xl p-3" style={{ background: "rgba(248,113,113,.07)" }}>
                  <div className="font-black" style={{ fontSize: "1.4rem", color: RED }}>&gt;800ms</div>
                  <div className="text-white/40" style={{ fontSize: ".7rem" }}>Feels slow</div>
                </div>
              </div>
            </div>

            <div className="costa-reveal costa-d1 costa-card rounded-2xl p-7" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="font-bold mb-1.5" style={{ fontSize: "1rem", color: GOLD_LT }}>🌊 Streaming vs. Batch</div>
              <div className="text-white/50" style={{ fontSize: ".85rem" }}>Streaming doesn&apos;t make the model faster — it makes users <em style={{ color: GOLD, fontStyle: "normal" }}>perceive</em> it as faster. Showing the first word at 200ms, even when completion takes 3s, dramatically reduces perceived latency.</div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-end gap-[3px]" style={{ height: 36 }}>
                  {[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((d) => (<div key={d} className="costa-streambar" style={{ animationDelay: `${d}s`, height: 6 }} />))}
                </div>
                <div className="text-white/50" style={{ fontSize: ".82rem" }}>3s total time → feels like 0.3s thanks to streaming</div>
              </div>
            </div>

            <div className="costa-reveal costa-card rounded-2xl p-7" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="font-bold mb-1.5" style={{ fontSize: "1rem", color: GOLD_LT }}>📊 p99 Is Your Real SLA</div>
              <div className="text-white/50" style={{ fontSize: ".85rem" }}>Your average latency (p50) looks great on a dashboard. But 1 in 100 users hits p99 — and that&apos;s the person writing the angry tweet. Design, monitor, and alert on p99.</div>
              <div className="mt-4">
                <svg width="100%" height="60" viewBox="0 0 260 60">
                  <defs><linearGradient id="costa-hist" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={GOLD} stopOpacity="0.8" /><stop offset="100%" stopColor={GOLD} stopOpacity="0.1" /></linearGradient></defs>
                  {[[5, 50, 5], [23, 40, 15], [41, 22, 33], [59, 8, 47], [77, 14, 41], [95, 30, 25], [113, 42, 13], [131, 50, 5]].map(([x, y, h]) => (<rect key={x} x={x} y={y} width="14" height={h} rx="2" fill="url(#costa-hist)" />))}
                  {[[149, 53, 2], [167, 54, 1], [185, 54, 1], [203, 54, 1], [221, 54, 1]].map(([x, y, h]) => (<rect key={x} x={x} y={y} width="14" height={h} rx="2" fill="rgba(248,113,113,.5)" />))}
                  <line x1="84" y1="0" x2="84" y2="56" stroke={GOLD_LT} strokeWidth="1.5" strokeDasharray="3,2" />
                  <text x="87" y="12" fontSize="9" fill={GOLD_LT}>p50</text>
                  <line x1="220" y1="0" x2="220" y2="56" stroke={RED} strokeWidth="1.5" strokeDasharray="3,2" />
                  <text x="223" y="12" fontSize="9" fill={RED}>p99</text>
                </svg>
              </div>
            </div>

            <div className="costa-reveal costa-d1 costa-card rounded-2xl p-7" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="font-bold mb-1.5" style={{ fontSize: "1rem", color: GOLD_LT }}>🧊 Cold Starts, Rate Limits &amp; Queues</div>
              <div className="text-white/50" style={{ fontSize: ".85rem" }}>At peak load, cold starts add 200–800ms, rate limits cause queuing (invisible until it blows up), and retry logic can compound latency 3–5× under pressure.</div>
              <div className="flex flex-col gap-1.5 mt-4">
                {[["Cold start", "+200–800ms", RED, "rgba(248,113,113,.08)"], ["Rate limit queue", "+1–5s", GOLD, "rgba(232,181,61,.08)"], ["Retry cascade", "3–5× latency", RED_D, "rgba(239,68,68,.08)"]].map(([l, v, c, bg]) => (
                  <div key={l} className="flex justify-between items-center rounded-lg" style={{ padding: "6px 10px", background: bg, borderLeft: `3px solid ${c}` }}>
                    <span className="text-white/50" style={{ fontSize: ".8rem" }}>{l}</span>
                    <span className="font-bold" style={{ fontSize: ".78rem", color: c }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — 5 LEVERS */}
      <section className="px-6 py-20" style={{ background: "#101d3a" }}>
        <div className="max-w-5xl mx-auto">
          <div className="costa-reveal mb-10">
            <CostaLabel>Section 03</CostaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-.025em" }}>The <span style={{ color: GOLD_LT }}>5 Cost Levers</span> You Actually Control</h2>
            <p className="text-white/50" style={{ maxWidth: 600 }}>You can&apos;t control pricing. You can control everything else. Here&apos;s where to start.</p>
          </div>

          <div className="flex flex-col gap-4">
            {LEVERS.map((lv, i) => (
              <div key={lv.n} className={`costa-reveal costa-d${(i % 5) + 1} costa-lever rounded-xl relative overflow-hidden`} style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: "1.25rem", alignItems: "start", padding: "1.35rem 1.5rem", background: CARD, border: `1px solid ${BORDER}`, transition: "border-color .25s, box-shadow .25s, transform .15s" }}>
                <div className="flex items-center justify-center font-black flex-shrink-0" style={{ width: 48, height: 48, borderRadius: 12, fontSize: "1.3rem", color: "#0a1628", background: `linear-gradient(135deg,${GOLD},${GOLD_LT})` }}>{lv.n}</div>
                <div>
                  <div className="font-bold mb-1" style={{ fontSize: "1rem", color: GOLD_LT }}>{lv.title}</div>
                  <div className="text-white/50" style={{ fontSize: ".85rem" }}>{lv.desc}</div>
                  <div className="mt-2 text-white/40" style={{ fontSize: ".78rem" }}>
                    <strong style={{ color: RED }}>{lv.before}</strong>
                    <span style={{ color: GOLD, margin: "0 .3rem" }}>→</span>
                    <span style={{ color: GREEN, fontWeight: 700 }}>{lv.after}</span>
                  </div>
                </div>
                <div className="rounded-lg self-center text-center flex-shrink-0" style={{ padding: ".4rem .75rem", minWidth: 70, background: "rgba(16,185,129,.12)", border: "1px solid rgba(16,185,129,.3)", color: GREEN }}>
                  <span className="font-extrabold" style={{ fontSize: ".82rem" }}>{lv.save}</span>
                  <small className="block text-white/40" style={{ fontSize: ".65rem", fontWeight: 500 }}>{lv.saveLbl}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="costa-reveal costa-card rounded-2xl text-center mt-8" style={{ padding: "2rem", background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="uppercase tracking-wider text-white/40 mb-2" style={{ fontSize: ".8rem" }}>Combined levers — realistic production scenario</div>
            <div className="costa-glow font-black" style={{ fontSize: "3rem", background: `linear-gradient(90deg,${GOLD_LT},${GOLD},${GREEN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>85–92%</div>
            <div className="text-white/50 mx-auto mt-2" style={{ fontSize: "1rem", maxWidth: 480 }}>cost reduction achievable before scaling, vs. naive implementation with no cost engineering.</div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — MATRIX */}
      <section className="px-6 py-20" style={{ background: "#0d1829" }}>
        <div className="max-w-5xl mx-auto">
          <div className="costa-reveal mb-10">
            <CostaLabel>Section 04</CostaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-.025em" }}>Cost vs. Quality <span style={{ color: GOLD_LT }}>Trade-off Matrix</span></h2>
            <p className="text-white/50" style={{ maxWidth: 600 }}>Not all tasks need the smartest model. Map your use cases to the right tier before you write a single line of prompt engineering.</p>
          </div>

          <div className="costa-reveal costa-card rounded-2xl p-8" style={{ background: CARD, border: `1px solid ${BORDER}`, overflowX: "auto" }}>
            <div className="font-bold text-center mb-5" style={{ fontSize: ".85rem", color: GOLD }}>Model Cost vs. Output Quality — Use Case Quadrant</div>
            <svg width="100%" viewBox="0 0 660 460" style={{ maxWidth: 660, display: "block", margin: "0 auto", overflow: "visible" }}>
              <defs><filter id="costa-glowpt"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
              <rect x="60" y="30" width="275" height="200" rx="10" fill="rgba(232,181,61,.05)" stroke="rgba(232,181,61,.08)" strokeWidth="1" />
              <rect x="340" y="30" width="275" height="200" rx="10" fill="rgba(94,130,174,.06)" stroke="rgba(94,130,174,.1)" strokeWidth="1" />
              <rect x="340" y="235" width="275" height="195" rx="10" fill="rgba(16,185,129,.05)" stroke="rgba(16,185,129,.08)" strokeWidth="1" />
              <rect x="60" y="235" width="275" height="195" rx="10" fill="rgba(239,68,68,.04)" stroke="rgba(239,68,68,.06)" strokeWidth="1" />

              <text x="197" y="56" textAnchor="middle" fontSize="10" fontWeight="700" fill="rgba(232,181,61,.5)">HIGH COST / LOW QUALITY</text>
              <text x="197" y="68" textAnchor="middle" fontSize="9" fill="rgba(248,113,113,.6)">← Avoid this zone</text>
              <text x="477" y="56" textAnchor="middle" fontSize="10" fontWeight="700" fill="rgba(134,168,206,.75)">HIGH COST / HIGH QUALITY</text>
              <text x="477" y="68" textAnchor="middle" fontSize="9" fill="rgba(134,168,206,.5)">Flagship models</text>
              <text x="197" y="258" textAnchor="middle" fontSize="10" fontWeight="700" fill="rgba(232,181,61,.5)">LOW COST / LOW QUALITY</text>
              <text x="197" y="270" textAnchor="middle" fontSize="9" fill="rgba(232,181,61,.4)">Utility tasks / mini models</text>
              <text x="477" y="258" textAnchor="middle" fontSize="10" fontWeight="700" fill="rgba(52,211,153,.8)">LOW COST / HIGH QUALITY</text>
              <text x="477" y="270" textAnchor="middle" fontSize="9" fill="rgba(52,211,153,.6)">↑ Optimize toward here</text>

              <line x1="60" y1="232" x2="615" y2="232" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
              <line x1="337" y1="25" x2="337" y2="430" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
              <text x="338" y="450" textAnchor="middle" fontSize="11" fill="#86A8CE">← Lower Quality    Output Quality    Higher Quality →</text>
              <text x="25" y="232" textAnchor="middle" fontSize="11" fill="#86A8CE" transform="rotate(-90,25,232)">← Lower Cost    Model Cost    Higher Cost →</text>

              <g transform="translate(510,110)">
                <circle r="22" fill="rgba(134,168,206,.2)" stroke={STEEL} strokeWidth="2" filter="url(#costa-glowpt)" />
                <text y="-30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#86A8CE">⚖️ Legal</text>
                <text y="-18" textAnchor="middle" fontSize="9" fill="#86A8CE">High-stakes docs</text>
                <text y="4" textAnchor="middle" fontSize="10" fill="#86A8CE" fontWeight="700">Flagship</text>
              </g>
              <g transform="translate(450,155)">
                <circle r="18" fill="rgba(134,168,206,.15)" stroke={STEEL} strokeWidth="1.5" />
                <text y="-25" textAnchor="middle" fontSize="11" fontWeight="700" fill="#86A8CE">🏥 Medical</text>
                <text y="-13" textAnchor="middle" fontSize="9" fill="#86A8CE">Diagnosis assist</text>
                <text y="4" textAnchor="middle" fontSize="9" fill="#86A8CE">Flagship</text>
              </g>
              <g transform="translate(560,175)">
                <circle r="20" fill="rgba(232,181,61,.15)" stroke={GOLD} strokeWidth="1.5" />
                <text y="-27" textAnchor="middle" fontSize="11" fontWeight="700" fill={GOLD}>💻 Code Gen</text>
                <text y="-15" textAnchor="middle" fontSize="9" fill="#86A8CE">Complex generation</text>
                <text y="4" textAnchor="middle" fontSize="9" fill={GOLD}>Flagship / Sonnet</text>
              </g>
              <g transform="translate(510,360)">
                <circle r="22" fill="rgba(16,185,129,.2)" stroke={GREEN_D} strokeWidth="2" filter="url(#costa-glowpt)" />
                <text y="-30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4ade80">💬 FAQ Bot</text>
                <text y="-18" textAnchor="middle" fontSize="9" fill="#86A8CE">Support answers</text>
                <text y="4" textAnchor="middle" fontSize="9" fill={GREEN} fontWeight="700">Mini + Cache</text>
              </g>
              <g transform="translate(450,330)">
                <circle r="18" fill="rgba(16,185,129,.12)" stroke={GREEN_D} strokeWidth="1.5" />
                <text y="-26" textAnchor="middle" fontSize="10" fontWeight="700" fill="#4ade80">🏷️ Classification</text>
                <text y="-14" textAnchor="middle" fontSize="9" fill="#86A8CE">Intent / category</text>
                <text y="4" textAnchor="middle" fontSize="9" fill={GREEN_D}>Mini / fine-tuned</text>
              </g>
              <g transform="translate(140,380)">
                <circle r="16" fill="rgba(232,181,61,.1)" stroke={GOLD_DEEP} strokeWidth="1.5" />
                <text y="-24" textAnchor="middle" fontSize="10" fontWeight="700" fill={GOLD}>😊 Sentiment</text>
                <text y="-12" textAnchor="middle" fontSize="9" fill="#86A8CE">Fast classification</text>
                <text y="4" textAnchor="middle" fontSize="9" fill={GOLD_DEEP}>Fine-tuned</text>
              </g>
              <g transform="translate(200,350)">
                <circle r="17" fill="rgba(232,181,61,.12)" stroke={GOLD} strokeWidth="1.5" />
                <text y="-25" textAnchor="middle" fontSize="10" fontWeight="700" fill={GOLD}>📋 Summaries</text>
                <text y="-13" textAnchor="middle" fontSize="9" fill="#86A8CE">Batch async</text>
                <text y="4" textAnchor="middle" fontSize="9" fill={GOLD}>Mini + Batch</text>
              </g>
              <text x="197" y="305" textAnchor="middle" fontSize="14" fill="rgba(239,68,68,.28)">⚠️ Over-engineered</text>
              <text x="197" y="322" textAnchor="middle" fontSize="10" fill="rgba(239,68,68,.22)">Using flagship where mini suffices</text>
            </svg>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-6">
            <div className="costa-reveal costa-card rounded-2xl p-6" style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}` }}>
              <div className="font-bold mb-2" style={{ fontSize: ".85rem", color: GOLD_LT }}>The 80/20 Rule of Model Selection</div>
              <div className="text-white/50" style={{ fontSize: ".85rem" }}>80% of production LLM tasks don&apos;t require a flagship model. Classification, formatting, FAQ retrieval, and basic summarization all perform well on mini models — at a fraction of the cost.</div>
            </div>
            <div className="costa-reveal costa-d1 costa-card rounded-2xl p-6" style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}` }}>
              <div className="font-bold mb-2" style={{ fontSize: ".85rem", color: GOLD_LT }}>The Overkill Tax</div>
              <div className="text-white/50" style={{ fontSize: ".85rem" }}>Defaulting to a flagship model for every call is common. It&apos;s also a 10–100× tax on tasks that a mini or fine-tuned model handles identically. The overkill zone costs teams hundreds of thousands of dollars annually.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden text-center px-6 py-24" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(232,181,61,.12) 0%, transparent 60%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="relative max-w-4xl mx-auto">
          <p className="font-bold uppercase tracking-widest mb-4" style={{ fontSize: ".82rem", color: GOLD }}>Final Thought</p>
          <h2 className="text-white font-black mx-auto mb-4" style={{ fontSize: "clamp(1.7rem,4.5vw,2.8rem)", maxWidth: 780, lineHeight: 1.14, letterSpacing: "-.025em" }}>
            Cost is the LLM metric <span style={{ background: `linear-gradient(90deg,${GOLD_LT},${GOLD},${GOLD_DEEP})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>nobody tracks</span> until it&apos;s a problem.
          </h2>
          <p className="text-white/50 mx-auto mb-10" style={{ maxWidth: 560 }}>Start tracking on day one. Instrument every call. Log token counts, model used, latency, and cost per call. The teams who ship AI profitably aren&apos;t smarter — they just started measuring early.</p>

          <div className="inline-flex flex-col gap-2.5 text-left mb-10" style={{ maxWidth: 480 }}>
            {CHECKLIST.map((c) => (
              <div key={c} className="flex items-center gap-3 rounded-xl" style={{ padding: ".65rem 1rem", background: "rgba(232,181,61,.07)", border: "1px solid rgba(232,181,61,.15)" }}>
                <span style={{ color: GOLD, fontSize: "1rem" }}>✓</span>
                <span className="text-white/60" style={{ fontSize: ".88rem" }}>{c}</span>
              </div>
            ))}
          </div>

          <div>
            <Link href="/contact" className="btn-primary">
              Start Tracking on Day One
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
          <p className="text-white/40 mt-5" style={{ fontSize: ".82rem" }}>Instrument early. Route smart. Ship AI that scales profitably.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CostaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-bold uppercase tracking-widest" style={{ fontSize: ".72rem", color: GOLD }}>
      <span className="inline-block rounded" style={{ width: 18, height: 2, background: GOLD }} />
      {children}
    </span>
  );
}

function Bars({ rows }: { rows: [string, number, string, string][] }) {
  return (
    <div className="flex flex-col gap-1.5 mt-2">
      {rows.map(([lbl, w, val, grad]) => (
        <div key={lbl} className="flex items-center gap-2">
          <div className="text-white/40 flex-shrink-0" style={{ fontSize: ".7rem", width: 90 }}>{lbl}</div>
          <div className="flex-1 rounded-full overflow-hidden" style={{ height: 7, background: "rgba(255,255,255,.05)" }}>
            <div style={{ height: "100%", width: `${w}%`, borderRadius: 99, background: grad }} />
          </div>
          <div className="text-white/50 text-right" style={{ fontSize: ".68rem", width: 30 }}>{val}</div>
        </div>
      ))}
    </div>
  );
}
