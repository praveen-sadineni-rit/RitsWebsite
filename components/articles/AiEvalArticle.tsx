"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * "Vibes Are Not an Eval — Building Real Quality Gates for AI" — bespoke dark
 * article themed to the RITS navy+gold palette (blue/cyan/purple mapped to
 * gold/steel; green kept for pass, amber for warn, red for fail). All styles
 * scoped under `.evala`.
 */

const BORDER = "rgba(255,255,255,.08)";
const CARD = "#0f2044";

const FAILURES = [
  {
    num: "01",
    title: "You Can't Test 10,000 Edge Cases by Hand",
    desc: "Real user distributions contain rare but critical inputs: edge-case dates, ambiguous pronouns, adversarial phrasing. A human can cover maybe 50 before shipping. An eval suite covers 50,000 in under 3 minutes.",
    svg: (
      <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg" width="100%">
        <rect x="10" y="30" width="30" height="35" rx="3" fill="rgba(94,130,174,0.25)" stroke="rgba(94,130,174,0.4)" strokeWidth="1" />
        <text x="25" y="25" textAnchor="middle" fill="#86A8CE" fontSize="8" fontFamily="monospace">Manual</text>
        <text x="25" y="77" textAnchor="middle" fill="#86A8CE" fontSize="7" fontFamily="monospace">~50</text>
        <rect x="80" y="5" width="30" height="60" rx="3" fill="rgba(232,181,61,0.25)" stroke="rgba(232,181,61,0.4)" strokeWidth="1" />
        <text x="95" y="0" dy="8" textAnchor="middle" fill="#F3C34E" fontSize="8" fontFamily="monospace">Eval</text>
        <text x="95" y="77" textAnchor="middle" fill="#86A8CE" fontSize="7" fontFamily="monospace">50k+</text>
        <text x="155" y="30" fill="#34d399" fontSize="8" fontFamily="monospace">⚡ 3 min</text>
        <text x="155" y="42" fill="#86A8CE" fontSize="7" fontFamily="monospace">vs hours</text>
        <text x="155" y="55" fill="#86A8CE" fontSize="7" fontFamily="monospace">of clicking</text>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Prompts That “Feel Better” Can Quietly Regress",
    desc: "Rephrasing a prompt to improve tone on 5 examples you tested can silently tank accuracy on 500 real-world cases you didn't. Without a baseline comparison, you'll never know until users complain.",
    svg: (
      <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg" width="100%">
        <text x="10" y="14" fill="#86A8CE" fontSize="8" fontFamily="monospace">Tested (5 examples)</text>
        <rect x="10" y="20" width="50" height="16" rx="3" fill="rgba(94,130,174,0.2)" stroke="rgba(94,130,174,0.3)" strokeWidth="1" />
        <rect x="10" y="20" width="42" height="16" rx="3" fill="rgba(94,130,174,0.5)" />
        <text x="65" y="31" fill="#F3C34E" fontSize="7" fontFamily="monospace">84% → 88% 🎉</text>
        <text x="10" y="52" fill="#f87171" fontSize="8" fontFamily="monospace">Real dist. (500 examples)</text>
        <rect x="10" y="57" width="50" height="16" rx="3" fill="rgba(220,38,38,0.1)" stroke="rgba(220,38,38,0.3)" strokeWidth="1" />
        <rect x="10" y="57" width="27" height="16" rx="3" fill="rgba(220,38,38,0.45)" />
        <text x="65" y="68" fill="#f87171" fontSize="7" fontFamily="monospace">84% → 54% 😱</text>
      </svg>
    ),
  },
  {
    num: "03",
    title: "New Model Versions Break Things You Never Tested",
    desc: "gpt-4o to gpt-4o-mini, Claude 3.5 to Claude 3.7 — each release brings subtle behavioral changes. JSON format drift, instruction-following changes, refusal behavior updates. Your eval suite catches this before prod does.",
    svg: (
      <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg" width="100%">
        <text x="10" y="12" fill="#86A8CE" fontSize="7" fontFamily="monospace">model: gpt-4o</text>
        <rect x="10" y="17" width="90" height="12" rx="3" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
        <rect x="10" y="17" width="85" height="12" rx="3" fill="rgba(52,211,153,0.4)" />
        <text x="108" y="27" fill="#34d399" fontSize="7" fontFamily="monospace">92%</text>
        <text x="10" y="44" fill="#86A8CE" fontSize="7" fontFamily="monospace">model: gpt-4o-mini (new)</text>
        <rect x="10" y="49" width="90" height="12" rx="3" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
        <rect x="10" y="49" width="63" height="12" rx="3" fill="rgba(251,191,36,0.4)" />
        <text x="108" y="59" fill="#fbbf24" fontSize="7" fontFamily="monospace">70% ⚠</text>
        <text x="10" y="76" fill="#F3C34E" fontSize="7" fontFamily="monospace">▶ Regression detected before deploy</text>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Without a Baseline, You Can't Measure Progress",
    desc: "Teams that operate on vibes can't answer: “Did last sprint's changes help or hurt?” You need a frozen golden dataset and a baseline score to know if you're moving the needle — or just rearranging deck chairs.",
    svg: (
      <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg" width="100%">
        <text x="10" y="12" fill="#f87171" fontSize="7" fontFamily="monospace">Without baseline: ¯\_(ツ)_/¯</text>
        <polyline points="10,35 50,25 90,40 130,20 170,38" fill="none" stroke="rgba(248,113,113,0.4)" strokeWidth="2" strokeDasharray="4,3" />
        <text x="10" y="55" fill="#34d399" fontSize="7" fontFamily="monospace">With baseline: clear signal</text>
        <polyline points="10,75 50,70 90,65 130,58 170,50" fill="none" stroke="rgba(232,181,61,0.7)" strokeWidth="2" />
        <circle cx="170" cy="50" r="3" fill="#E8B53D" />
      </svg>
    ),
  },
];

const LAYERS = [
  {
    n: "1",
    grad: "linear-gradient(135deg,#B0810E,#E8B53D)",
    tag: "Foundation",
    title: "Golden Dataset",
    chip: { label: "Required", bg: "rgba(232,181,61,.2)", color: "#F3C34E", border: "rgba(232,181,61,.3)" },
    body: "Representative inputs paired with expected outputs — the bedrock everything else runs against. Curate from real prod traffic, cover all capability categories, freeze it after initial creation. Add to it from production failures. Without this, no eval is meaningful.",
  },
  {
    n: "2",
    grad: "linear-gradient(135deg,#E8B53D,#86A8CE)",
    tag: "Per-Capability Testing",
    title: "Unit Evals",
    chip: { label: "Run on PR", bg: "rgba(94,130,174,.2)", color: "#86A8CE", border: "rgba(94,130,174,.3)" },
    body: "One test per atomic capability: classification accuracy, extraction F1, groundedness score, format compliance. Fast to run (<60s), easy to isolate failures. Block merges that drop any metric below threshold. These are your unit tests — except for prompts and model behavior.",
  },
  {
    n: "3",
    grad: "linear-gradient(135deg,#5E82AE,#86A8CE)",
    tag: "Deploy Gate",
    title: "Regression Suite",
    chip: { label: "Every Deploy", bg: "rgba(94,130,174,.2)", color: "#86A8CE", border: "rgba(94,130,174,.3)" },
    body: "Runs the full golden dataset on every candidate deploy. Compares against the last known-good snapshot. If more than N% of previously-passing cases now fail, the deploy is blocked automatically. This is your airbag. It fires silently until you need it — then it saves you.",
  },
  {
    n: "4",
    grad: "linear-gradient(135deg,#5E82AE,#34d399)",
    tag: "Live Signal",
    title: "Shadow Evaluation",
    chip: { label: "A/B on Prod", bg: "rgba(52,211,153,.12)", color: "#34d399", border: "rgba(52,211,153,.25)" },
    body: "Route a percentage of real traffic through the new prompt or model in shadow mode. Score both responses with LLM-as-judge without showing users. After collecting statistical significance, compare distributions. If the new version wins, ship. If it doesn't, rollback costs zero.",
  },
];

const EVAL_GROUPS = [
  {
    title: "RAG System",
    rows: [
      { metric: "faithfulness", val: "0.91", state: "pass", width: 91 },
      { metric: "answer_relevance", val: "0.88", state: "pass", width: 88 },
      { metric: "context_recall", val: "0.74", state: "warn", width: 74 },
      { metric: "hallucination_rate", val: "2.1%", state: "pass", width: 8 },
    ],
  },
  {
    title: "Agent / Tool Use",
    rows: [
      { metric: "task_completion", val: "87.3%", state: "pass", width: 87 },
      { metric: "tool_accuracy", val: "93.1%", state: "pass", width: 93 },
      { metric: "loop_detection", val: "100%", state: "pass", width: 100 },
      { metric: "avg_steps_to_goal", val: "4.7", state: "warn", width: 60 },
    ],
  },
  {
    title: "Classifier",
    rows: [
      { metric: "precision", val: "0.94", state: "pass", width: 94 },
      { metric: "recall", val: "0.81", state: "warn", width: 81 },
      { metric: "f1_score", val: "0.87", state: "warn", width: 87 },
      { metric: "false_negative_rate", val: "19%", state: "fail", width: 19 },
    ],
  },
];

const METRIC_CARDS = [
  {
    icon: "📡",
    title: "RAG Metrics",
    parts: [
      ["Faithfulness", " — is the answer grounded in the retrieved context, or did the model hallucinate?"],
      ["Answer Relevance", " — does the response actually address the question?"],
      ["Context Recall", " — did the retriever fetch the documents needed to answer? Low recall here means your retriever is the bottleneck."],
    ],
  },
  {
    icon: "🤖",
    title: "Agent Metrics",
    parts: [
      ["Task Completion Rate", " — did the agent finish the goal without human intervention?"],
      ["Tool Accuracy", " — did it call the right tool with correct parameters?"],
      ["Loop Detection Rate", " — the 100% you always need. An agent stuck in a retry loop will burn your entire token budget."],
    ],
  },
  {
    icon: "🎯",
    title: "Classifier Metrics",
    parts: [
      ["Precision", " — of what you flagged positive, how many actually were?"],
      ["Recall", " — of all actual positives, how many did you catch?"],
      ["Confusion Matrix", " — the full picture. Never optimize precision and recall as single numbers without looking at what the errors are."],
    ],
  },
  {
    icon: "✍️",
    title: "Generation: Skip BLEU",
    parts: [
      ["", "BLEU and ROUGE measure n-gram overlap with a reference. They'll penalize a perfect paraphrase and reward a grammatically broken copy-paste."],
      ["Use LLM-as-judge instead", " — ask a stronger model to score coherence, helpfulness, and factuality. Correlates far better with human preference."],
    ],
  },
];

const PITFALLS = [
  { title: "Verbosity bias", body: "LLM judges often score longer answers higher, independent of quality. Counteract with explicit rubric guidance: “length should not influence score.”" },
  { title: "Self-preference", body: "GPT-4 prefers GPT-4 outputs; Claude prefers Claude outputs. Use a different family model as judge, or use multiple judges and average." },
  { title: "Position bias", body: "In A/B comparisons, the judge often favors whichever response is listed first. Always run both orderings and average to eliminate this." },
];

const FLYWHEEL = [
  { title: "Prod Failure", sub: "Something breaks in the wild", pos: { top: "2%", left: "50%", transform: "translateX(-50%)" } },
  { title: "Golden Dataset", sub: "Add the failure case", pos: { top: "50%", right: "2%", transform: "translateY(-50%)" } },
  { title: "Eval Catches It", sub: "Next run detects regression", pos: { bottom: "2%", left: "50%", transform: "translateX(-50%)" } },
  { title: "Ship Confident", sub: "Gate passes, deploy green", pos: { top: "50%", left: "2%", transform: "translateY(-50%)" } },
];

const stateColor: Record<string, string> = { pass: "#34d399", warn: "#fbbf24", fail: "#f87171" };
const stateBar: Record<string, string> = {
  pass: "linear-gradient(90deg,#059669,#34d399)",
  warn: "linear-gradient(90deg,#d97706,#fbbf24)",
  fail: "linear-gradient(90deg,#dc2626,#f87171)",
};

export default function AiEvalArticle() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("evala-vis"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".evala-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="evala min-h-screen flex flex-col" style={{ background: "#0a1628", color: "#fff" }}>
      <style>{`
        @keyframes evala-fadeup { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes evala-spin { from { transform:rotate(0); } to { transform:rotate(360deg); } }
        @keyframes evala-spinrev { from { transform:rotate(0); } to { transform:rotate(-360deg); } }
        @keyframes evala-pulse { 0%,100% { opacity:1; } 50% { opacity:.45; } }
        .evala-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
        .evala-reveal.evala-vis { opacity:1; transform:translateY(0); }
        .evala-d1 { transition-delay:.1s; } .evala-d2 { transition-delay:.2s; } .evala-d3 { transition-delay:.3s; } .evala-d4 { transition-delay:.4s; }
        .evala-spin { animation: evala-spin 3s linear infinite; display:inline-block; }
        .evala-pulse { animation: evala-pulse 2.5s ease-in-out infinite; }
        .evala-ring-outer { animation: evala-spin 26s linear infinite; transform-origin:center; }
        .evala-ring-inner { animation: evala-spinrev 18s linear infinite; transform-origin:center; }
        @media (prefers-reduced-motion: reduce) { .evala-reveal,.evala-spin,.evala-pulse,.evala-ring-outer,.evala-ring-inner { animation:none !important; transition:none !important; opacity:1 !important; transform:none !important; } }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden text-center px-6 pt-24 pb-20" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(232,181,61,.16) 0%, rgba(94,130,174,.07) 50%, transparent 80%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(232,181,61,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,181,61,.05) 1px, transparent 1px)", backgroundSize: "60px 60px", opacity: 0.6 }} />
        <div className="relative max-w-3xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All insights
          </Link>
          <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-7 text-[.82rem] font-bold uppercase tracking-wider" style={{ background: "rgba(232,181,61,.12)", border: "1px solid rgba(232,181,61,.3)", color: "#E8B53D" }}>
            <span className="evala-pulse w-2 h-2 rounded-full inline-block" style={{ background: "#E8B53D" }} />
            AI Evaluation Engineering
          </div>
          <h1 className="text-white font-black leading-[1.12]" style={{ fontSize: "clamp(2.2rem,5.5vw,4rem)" }}>
            Vibes Are Not<br />
            <span style={{ background: "linear-gradient(90deg,#F3C34E,#86A8CE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>an Eval</span>
          </h1>
          <p className="text-white/50 mt-5 mx-auto" style={{ maxWidth: 640, fontSize: "1.12rem" }}>
            Every team says their AI &quot;works great&quot; — until it doesn&apos;t. The difference between teams that catch regressions and teams that get surprised by them is a{" "}
            <strong style={{ color: "#F3C34E" }}>real eval harness.</strong> Vibes don&apos;t scale.
          </p>

          {/* stat pills */}
          <div className="flex flex-wrap gap-4 justify-center mt-9">
            {[["10k+", "Edge Cases"], ["4", "Eval Layers"], ["1", "Flywheel"]].map(([n, l]) => (
              <div key={l} className="flex flex-col items-center rounded-xl px-6 py-3.5" style={{ background: "rgba(15,32,68,.9)", border: `1px solid ${BORDER}`, minWidth: 120 }}>
                <span className="font-black leading-none" style={{ fontSize: "1.5rem", background: "linear-gradient(90deg,#F3C34E,#E8B53D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</span>
                <span className="text-white/45 mt-1 uppercase" style={{ fontSize: ".72rem", letterSpacing: ".5px" }}>{l}</span>
              </div>
            ))}
          </div>

          {/* terminal (static) */}
          <div className="mt-10 mx-auto text-left" style={{ maxWidth: 520 }}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(4,10,22,.97)", border: "1px solid rgba(232,181,61,.25)", boxShadow: "0 20px 60px rgba(0,0,0,.6)" }}>
              <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "rgba(15,32,68,.95)", borderBottom: "1px solid rgba(232,181,61,.14)" }}>
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                <span className="flex-1 text-center text-white/40" style={{ fontFamily: "monospace", fontSize: ".72rem" }}>eval-harness · regression-suite · v2.8.1</span>
              </div>
              <div className="px-5 py-4" style={{ fontFamily: "monospace", fontSize: ".78rem", lineHeight: 1.7 }}>
                <div style={{ color: "#5E82AE" }}>$ <span style={{ color: "#86A8CE" }}>eval-suite run --suite regression --dataset golden-v4</span></div>
                <div className="text-white/45">Loading 10,247 test cases...</div>
                <div style={{ color: "#34d399" }}>✓ [001/250] entity_extraction .......... PASS (94.2%)</div>
                <div style={{ color: "#34d399" }}>✓ [002/250] rag_faithfulness ........... PASS (0.91)</div>
                <div style={{ color: "#34d399" }}>✓ [004/250] agent_task_completion ...... PASS (87.3%)</div>
                <div style={{ color: "#fbbf24" }}>⚠ [005/250] context_recall ............ WARN (0.74 &lt; 0.80)</div>
                <div style={{ color: "#f87171" }}>✗ [007/250] hallucination_rate ........ FAIL (8.3% &gt; 5.0%)</div>
                <div className="text-white/45">  ... running 243 more cases ...</div>
                <div style={{ color: "#34d399" }}>✓ [250/250] summarization_quality ...... PASS (0.89)</div>
                <div className="text-white/30">─────────────────────────────────────────</div>
                <div style={{ color: "#34d399" }}>  247/250 passed ✓   3 regressions ✗</div>
                <div style={{ color: "#fbbf24" }}>  ⚠ Deploy blocked — fix regressions first</div>
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5" style={{ borderTop: "1px solid rgba(232,181,61,.14)", fontFamily: "monospace", fontSize: ".72rem" }}>
                <span className="text-white/40">progress</span>
                <span className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.07)" }}>
                  <span className="block h-full rounded-full" style={{ width: "100%", background: "linear-gradient(90deg,#E8B53D,#5E82AE)" }} />
                </span>
                <span className="text-white/40">100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MANUAL TESTING BREAKS */}
      <section className="px-6 py-20" style={{ background: "#0d1829" }}>
        <div className="max-w-5xl mx-auto">
          <div className="evala-reveal mb-12">
            <EvalaLabel>The Problem</EvalaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)" }}>Why &quot;Manual Testing&quot; Breaks Down</h2>
            <p className="text-white/50" style={{ maxWidth: 620, lineHeight: 1.75 }}>Clicking around in the playground is not quality assurance. Here&apos;s exactly where the wheels fall off — and why the gap between what you tested and what users experience widens every sprint.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {FAILURES.map((f, i) => (
              <div key={f.num} className={`evala-reveal evala-d${(i % 4) + 1} rounded-2xl p-6 transition-transform hover:-translate-y-1`} style={{ background: CARD, border: `1px solid ${BORDER}`, borderTop: "2px solid rgba(232,181,61,.5)" }}>
                <div className="font-black leading-none mb-2" style={{ fontSize: "2rem", background: "linear-gradient(135deg,#F3C34E,#E8B53D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{f.num}</div>
                <div className="font-bold text-white mb-1.5" style={{ fontSize: "1.02rem" }}>{f.title}</div>
                <div className="text-white/50" style={{ fontSize: ".88rem", lineHeight: 1.6 }}>{f.desc}</div>
                <div className="mt-4 rounded-lg p-2" style={{ background: "rgba(4,10,22,.7)" }}>{f.svg}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 LAYERS */}
      <section className="px-6 py-20" style={{ background: "#0a1628" }}>
        <div className="max-w-3xl mx-auto">
          <div className="evala-reveal mb-12">
            <EvalaLabel>Architecture</EvalaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)" }}>The 4 Layers of a Real Eval Harness</h2>
            <p className="text-white/50" style={{ maxWidth: 620, lineHeight: 1.75 }}>A production eval harness is not a single script. It&apos;s a stack — each layer serves a different purpose and runs at a different cadence. Build all four, and you have real confidence.</p>
          </div>

          <div className="flex flex-col">
            {LAYERS.map((l, i) => (
              <div key={l.n} className="flex items-stretch gap-0">
                <div className="flex flex-col items-center flex-shrink-0" style={{ width: 48 }}>
                  <div className="rounded-full flex items-center justify-center font-extrabold text-white" style={{ width: 36, height: 36, marginTop: "1.6rem", fontSize: ".9rem", background: l.grad }}>{l.n}</div>
                  {i < LAYERS.length - 1 && <div style={{ flex: 1, width: 2, marginLeft: 0, minHeight: 20, background: "linear-gradient(to bottom,#B0810E,#5E82AE)" }} />}
                </div>
                <div className={`evala-reveal evala-d${(i % 4) + 1} flex-1 rounded-xl p-5 mb-4`} style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="uppercase font-bold mb-1" style={{ fontSize: ".68rem", letterSpacing: "1px", color: "#E8B53D" }}>{l.tag}</div>
                  <div className="font-bold text-white mb-1.5 flex items-center gap-2 flex-wrap" style={{ fontSize: "1rem" }}>
                    {l.title}
                    <span className="inline-block uppercase font-bold rounded" style={{ fontSize: ".62rem", letterSpacing: ".5px", padding: ".15rem .5rem", background: l.chip.bg, color: l.chip.color, border: `1px solid ${l.chip.border}` }}>{l.chip.label}</span>
                  </div>
                  <div className="text-white/50" style={{ fontSize: ".88rem", lineHeight: 1.6 }}>{l.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="evala-reveal rounded-r-xl mt-8 px-6 py-4" style={{ borderLeft: "3px solid #E8B53D", background: "rgba(232,181,61,.06)" }}>
            <p className="text-white/60" style={{ fontSize: ".92rem", lineHeight: 1.7, fontStyle: "italic" }}>
              <strong className="text-white not-italic">The key insight:</strong> each layer catches different failure modes. Unit evals catch &quot;did I break this specific capability.&quot; Regression suites catch &quot;did I break anything.&quot; Shadow evals catch &quot;is this actually better in the real world.&quot; You need all three.
            </p>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="px-6 py-20" style={{ background: "#101d3a" }}>
        <div className="max-w-5xl mx-auto">
          <div className="evala-reveal mb-10">
            <EvalaLabel>What to Measure</EvalaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)" }}>Metrics That Actually Matter</h2>
            <p className="text-white/50" style={{ maxWidth: 620, lineHeight: 1.75 }}>Different AI systems need different metrics. Here&apos;s the full breakdown — and a live eval report showing what good looks like.</p>
          </div>

          {/* eval panel */}
          <div className="evala-reveal rounded-2xl overflow-hidden mb-10" style={{ background: "rgba(4,10,22,.97)", border: "1px solid rgba(232,181,61,.22)", boxShadow: "0 30px 80px rgba(0,0,0,.5)" }}>
            <div className="flex items-center justify-between px-5 py-3" style={{ background: "rgba(15,32,68,.95)", borderBottom: "1px solid rgba(232,181,61,.15)" }}>
              <span style={{ fontFamily: "monospace", fontSize: ".82rem", color: "#F3C34E", fontWeight: 700 }}>📊 eval-report · run #1,847 · 2025-07-24 14:33 UTC</span>
              <span className="rounded" style={{ fontFamily: "monospace", fontSize: ".68rem", padding: ".2rem .6rem", background: "rgba(94,130,174,.2)", color: "#86A8CE", border: "1px solid rgba(94,130,174,.3)" }}>CI GATE</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6 p-6">
              {EVAL_GROUPS.map((g) => (
                <div key={g.title}>
                  <div className="uppercase mb-3 pb-1.5" style={{ fontFamily: "monospace", fontSize: ".7rem", letterSpacing: "1px", color: "rgba(255,255,255,.5)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>{g.title}</div>
                  {g.rows.map((r) => (
                    <div key={r.metric} className="flex justify-between items-center mb-2" style={{ fontFamily: "monospace", fontSize: ".78rem" }}>
                      <span style={{ color: "#c7d8e8" }}>{r.metric}</span>
                      <span className="flex items-center gap-1.5">
                        <span style={{ fontWeight: 700, color: stateColor[r.state] }}>{r.val}</span>
                        <span className="inline-block rounded-full overflow-hidden" style={{ width: 56, height: 5, background: "rgba(255,255,255,.07)" }}>
                          <span className="block h-full rounded-full" style={{ width: `${r.width}%`, background: stateBar[r.state] }} />
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3" style={{ borderTop: "1px solid rgba(232,181,61,.12)", fontFamily: "monospace", fontSize: ".72rem" }}>
              <span className="text-white/45">run_id: r1847 · dataset: golden-v4 · 10,247 samples</span>
              <span style={{ color: "#F3C34E", fontWeight: 700 }}>247/250 passed ✓&nbsp;&nbsp;3 regressions ✗</span>
            </div>
          </div>

          {/* metric cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {METRIC_CARDS.map((m, i) => (
              <div key={m.title} className={`evala-reveal evala-d${(i % 4) + 1} rounded-2xl p-5`} style={{ background: CARD, border: `1px solid ${BORDER}`, borderTop: "2px solid rgba(232,181,61,.5)" }}>
                <div className="rounded-lg flex items-center justify-center mb-3" style={{ width: 44, height: 44, fontSize: "1.3rem", background: "linear-gradient(135deg,rgba(232,181,61,.2),rgba(94,130,174,.2))", border: "1px solid rgba(232,181,61,.3)" }}>{m.icon}</div>
                <div className="font-bold text-white mb-2" style={{ fontSize: "1.02rem" }}>{m.title}</div>
                <div className="text-white/50" style={{ fontSize: ".84rem", lineHeight: 1.55 }}>
                  {m.parts.map((p, j) => (
                    <p key={j} className={j > 0 ? "mt-2.5" : ""}>
                      {p[0] && <strong style={{ color: "#86A8CE", fontWeight: 600 }}>{p[0]}</strong>}{p[1]}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LLM AS JUDGE */}
      <section className="px-6 py-20" style={{ background: "#0a1628" }}>
        <div className="max-w-5xl mx-auto">
          <div className="evala-reveal mb-10">
            <EvalaLabel>The Modern Approach</EvalaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)" }}>LLM-as-Judge</h2>
            <p className="text-white/50" style={{ maxWidth: 640, lineHeight: 1.75 }}>Use a stronger model to evaluate the outputs of a weaker one. It&apos;s scalable, aligns with human judgment, and can evaluate dimensions that heuristics never could — like tone, coherence, and factual precision.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* diagram */}
            <div className="evala-reveal">
              <div className="rounded-2xl p-6" style={{ background: "rgba(4,10,22,.97)", border: "1px solid rgba(232,181,61,.2)", fontFamily: "monospace" }}>
                <div className="uppercase mb-3" style={{ fontSize: ".72rem", letterSpacing: "1px", color: "rgba(255,255,255,.5)" }}>Judge Prompt Pattern</div>
                <div className="flex flex-col gap-2">
                  <div className="rounded-lg px-4 py-2.5" style={{ fontSize: ".78rem", background: "rgba(94,130,174,.15)", border: "1px solid rgba(94,130,174,.3)", color: "#86A8CE" }}>🤖 Evaluated Model (e.g., GPT-4o-mini)<br /><span className="text-white/45" style={{ fontSize: ".72rem" }}>answers the user&apos;s question</span></div>
                  <div className="text-center" style={{ color: "#E8B53D", fontSize: "1.2rem" }}>↓</div>
                  <div className="rounded-lg px-4 py-2.5" style={{ fontSize: ".72rem", background: "rgba(15,32,68,.8)", border: `1px solid ${BORDER}`, color: "#c7d8e8", whiteSpace: "pre-wrap" }}>Output: &quot;The capital of France is Paris, which has been the capital since 987 AD and is home to approximately 2.1M people.&quot;</div>
                  <div className="text-center" style={{ color: "#E8B53D", fontSize: ".9rem" }}>↓ + [original question] + [rubric]</div>
                  <div className="rounded-lg px-4 py-2.5" style={{ fontSize: ".78rem", background: "rgba(232,181,61,.12)", border: "1px solid rgba(232,181,61,.35)", color: "#F3C34E" }}>⚖️ Judge Model (e.g., Claude Opus / GPT-4o)<br /><span className="text-white/45" style={{ fontSize: ".72rem" }}>evaluates against rubric</span></div>
                  <div className="text-center" style={{ color: "#E8B53D", fontSize: "1.2rem" }}>↓</div>
                  <div className="rounded-lg px-4 py-2.5" style={{ fontSize: ".78rem", background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.3)", color: "#34d399" }}>✓ Factual accuracy: PASS (5/5)<br />✓ Completeness: PASS (4/5)<br />✓ Hallucination: NONE detected<br />→ Overall: 9/10</div>
                </div>
              </div>
              <div className="rounded-r-xl mt-5 px-5 py-3.5" style={{ borderLeft: "3px solid #E8B53D", background: "rgba(232,181,61,.06)" }}>
                <p className="text-white/60" style={{ fontSize: ".83rem", lineHeight: 1.65, fontStyle: "italic" }}>
                  <strong className="text-white not-italic">Calibration tip:</strong> before trusting your judge, run 200 cases through it and compare against human labels. A well-calibrated judge should agree with humans at &gt;85% rate. If it doesn&apos;t, adjust your rubric.
                </p>
              </div>
            </div>

            {/* patterns + pitfalls */}
            <div className="evala-reveal evala-d1 flex flex-col gap-4">
              <div className="font-bold text-white" style={{ fontSize: ".9rem" }}>Prompting Patterns That Work</div>
              {[
                { t: "Use structured rubrics, not free-form", b: "Give the judge explicit dimensions to score (accuracy, completeness, tone) with integer scales. Free-form “is this good?” produces high variance and poor calibration." },
                { t: "Force chain-of-thought before verdict", b: "Ask the judge to reason step by step before giving a score. This dramatically reduces position bias and produces more consistent verdicts." },
              ].map((c) => (
                <div key={c.t} className="rounded-xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="font-bold text-white mb-1.5" style={{ fontSize: ".9rem" }}>{c.t}</div>
                  <div className="text-white/50" style={{ fontSize: ".84rem", lineHeight: 1.6 }}>{c.b}</div>
                </div>
              ))}
              <div className="font-bold text-white mt-2" style={{ fontSize: ".9rem" }}>Known Pitfalls</div>
              {PITFALLS.map((p) => (
                <div key={p.title} className="flex gap-3">
                  <span className="flex-shrink-0" style={{ fontSize: "1.2rem" }}>⚠️</span>
                  <div>
                    <strong className="block text-white mb-0.5" style={{ fontSize: ".9rem" }}>{p.title}</strong>
                    <span className="text-white/50" style={{ fontSize: ".84rem", lineHeight: 1.55 }}>{p.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FLYWHEEL */}
      <section className="px-6 py-20" style={{ background: "#0d1829" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="evala-reveal mb-10">
            <EvalaLabel center>Close the Loop</EvalaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)" }}>The Eval Flywheel</h2>
            <p className="text-white/50 mx-auto" style={{ maxWidth: 620, lineHeight: 1.75 }}>The best eval harnesses get better over time — automatically. Every production failure feeds back into the golden dataset, making the next eval run sharper. This is the compounding advantage.</p>
          </div>

          <div className="evala-reveal flex justify-center my-8">
            <div className="relative" style={{ width: "min(480px,90vw)", height: "min(480px,90vw)" }}>
              <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                <defs>
                  <radialGradient id="evala-fw-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(232,181,61,0.12)" />
                    <stop offset="100%" stopColor="rgba(10,22,40,0)" />
                  </radialGradient>
                  <linearGradient id="evala-arc1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E8B53D" /><stop offset="100%" stopColor="#5E82AE" /></linearGradient>
                  <linearGradient id="evala-arc2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5E82AE" /><stop offset="100%" stopColor="#86A8CE" /></linearGradient>
                  <linearGradient id="evala-arc3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#86A8CE" /><stop offset="100%" stopColor="#B0810E" /></linearGradient>
                  <linearGradient id="evala-arc4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#B0810E" /><stop offset="100%" stopColor="#E8B53D" /></linearGradient>
                </defs>
                <circle cx="240" cy="240" r="200" fill="url(#evala-fw-glow)" />
                <g className="evala-ring-outer"><circle cx="240" cy="240" r="185" fill="none" stroke="rgba(232,181,61,0.15)" strokeWidth="1" strokeDasharray="8,6" /></g>
                <g className="evala-ring-inner"><circle cx="240" cy="240" r="100" fill="none" stroke="rgba(94,130,174,0.12)" strokeWidth="1" strokeDasharray="4,8" /></g>
                <path d="M 240,90 A 150,150 0 0,1 390,240" fill="none" stroke="url(#evala-arc1)" strokeWidth="3" strokeLinecap="round" strokeDasharray="120,180" />
                <path d="M 390,240 A 150,150 0 0,1 240,390" fill="none" stroke="url(#evala-arc2)" strokeWidth="3" strokeLinecap="round" strokeDasharray="120,180" />
                <path d="M 240,390 A 150,150 0 0,1 90,240" fill="none" stroke="url(#evala-arc3)" strokeWidth="3" strokeLinecap="round" strokeDasharray="120,180" />
                <path d="M 90,240 A 150,150 0 0,1 240,90" fill="none" stroke="url(#evala-arc4)" strokeWidth="3" strokeLinecap="round" strokeDasharray="120,180" />
                {/* nodes */}
                <circle cx="240" cy="90" r="22" fill="rgba(10,22,40,0.95)" stroke="rgba(248,113,113,0.7)" strokeWidth="2" />
                <text x="240" y="86" textAnchor="middle" fontSize="14">🚨</text>
                <text x="240" y="98" textAnchor="middle" fill="#f87171" fontSize="7" fontFamily="monospace" fontWeight="bold">PROD</text>
                <circle cx="390" cy="240" r="22" fill="rgba(10,22,40,0.95)" stroke="rgba(251,191,36,0.7)" strokeWidth="2" />
                <text x="390" y="236" textAnchor="middle" fontSize="14">🗂</text>
                <text x="390" y="248" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily="monospace" fontWeight="bold">GOLDEN</text>
                <circle cx="240" cy="390" r="22" fill="rgba(10,22,40,0.95)" stroke="rgba(52,211,153,0.7)" strokeWidth="2" />
                <text x="240" y="386" textAnchor="middle" fontSize="14">✅</text>
                <text x="240" y="398" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace" fontWeight="bold">EVAL</text>
                <circle cx="90" cy="240" r="22" fill="rgba(10,22,40,0.95)" stroke="rgba(232,181,61,0.7)" strokeWidth="2" />
                <text x="90" y="236" textAnchor="middle" fontSize="14">🚀</text>
                <text x="90" y="248" textAnchor="middle" fill="#F3C34E" fontSize="7" fontFamily="monospace" fontWeight="bold">SHIP</text>
                <circle cx="240" cy="240" r="55" fill="rgba(15,32,68,0.95)" stroke="rgba(232,181,61,0.25)" strokeWidth="1.5" />
              </svg>

              {FLYWHEEL.map((s) => (
                <div key={s.title} className="absolute flex flex-col items-center text-center" style={{ width: 130, ...s.pos }}>
                  <div className="font-bold text-white" style={{ fontSize: ".78rem" }}>{s.title}</div>
                  <div className="text-white/45" style={{ fontSize: ".68rem" }}>{s.sub}</div>
                </div>
              ))}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="uppercase text-white/45" style={{ fontSize: ".72rem", letterSpacing: "1px" }}>The</span>
                <span className="font-black" style={{ fontSize: "1.1rem", color: "#F3C34E" }}>Flywheel</span>
              </div>
            </div>
          </div>

          <div className="evala-reveal mx-auto rounded-r-xl px-6 py-4 text-left" style={{ maxWidth: 600, borderLeft: "3px solid #E8B53D", background: "rgba(232,181,61,.06)" }}>
            <p className="text-white/60" style={{ fontSize: ".92rem", lineHeight: 1.7, fontStyle: "italic" }}>
              <strong className="text-white not-italic">Compound advantage:</strong> a team that has been running this flywheel for 6 months has a golden dataset with hundreds of real-world failure cases — edge cases that no one thought to test upfront. Their eval suite is dramatically more powerful than a team starting fresh. Start the flywheel now.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden text-center px-6 py-24" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(232,181,61,.12) 0%, transparent 60%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-[.82rem] font-bold uppercase tracking-widest mb-4" style={{ color: "#E8B53D" }}>The Takeaway</p>
          <h2 className="text-white font-black mx-auto mb-4" style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)", maxWidth: 780, lineHeight: 1.12 }}>
            The teams shipping AI with <span style={{ background: "linear-gradient(90deg,#F3C34E,#E8B53D,#86A8CE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>confidence</span> aren&apos;t guessing. They&apos;re measuring.
          </h2>
          <p className="text-white/50 mx-auto mb-10" style={{ maxWidth: 540, lineHeight: 1.7 }}>Stop relying on vibes. Build the golden dataset, wire up the eval layers, run the flywheel. That&apos;s the difference between shipping fearlessly and shipping anxiously.</p>
          <Link href="/contact" className="btn-primary">
            Build Real Quality Gates for Your AI
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <p className="text-white/40 mt-5" style={{ fontSize: ".82rem" }}>Golden dataset → Unit evals → Regression suite → Shadow eval → Flywheel. That&apos;s the stack.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function EvalaLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[.75rem] font-bold uppercase tracking-widest ${center ? "justify-center" : ""}`} style={{ color: "#E8B53D" }}>
      <span className="inline-block rounded" style={{ width: 18, height: 2, background: "#E8B53D" }} />
      {children}
    </span>
  );
}
