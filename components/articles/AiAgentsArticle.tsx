"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * "AI Agents in Production — Why They Break" — bespoke dark article themed to the
 * RITS navy+gold palette. Source amber/orange brand accents mapped to gold/steel;
 * blue/cyan/purple decoration mapped to steel/gold; green kept for success,
 * red for failure, amber for warning/retry/caution status. All styles scoped
 * under `.agnt`.
 */

const BORDER = "rgba(255,255,255,.08)";
const CARD = "#0f2044";
const MONO = "'Courier New', Courier, monospace";

const FAILURES = [
  {
    icon: "🔧",
    title: "Tool Hallucination",
    sev: "critical",
    sevLabel: "● Critical",
    desc: "The agent invents tool names that don't exist, passes wrong parameter types, or constructs API calls that can never succeed — then retries indefinitely.",
    code: [
      { c: "cmt", t: "// Agent decides to call..." },
      { c: "key", t: "tool_call", rest: ": {" },
      { c: "key", t: "  name", rest: ": ", err: "\"search_customer_db_v3\"," },
      { c: "key", t: "  args", rest: ": { ", key2: "user_id", err: "null", tail: " }" },
      { c: "raw", t: "}" },
      { c: "cmt", t: "// Reality: tool is \"query_users\"" },
      { c: "err", t: "ToolNotFoundError", rest: ": unknown tool" },
      { c: "warn", t: "→ agent retries with same wrong name" },
    ],
  },
  {
    icon: "♾",
    title: "Infinite Loop",
    sev: "critical",
    sevLabel: "● Critical",
    desc: "Stuck in a reasoning cycle, the agent re-queries the same information, re-evaluates the same decision, and burns tokens until the context window fills or your budget runs out.",
    code: [
      { c: "cmt", t: "// Step 12" },
      { c: "warn", t: "Agent", rest: ": I need more info → ", key2: "search()" },
      { c: "cmt", t: "// Step 13" },
      { c: "warn", t: "Agent", rest: ": Result unclear → ", key2: "search()" },
      { c: "cmt", t: "// Step 14" },
      { c: "warn", t: "Agent", rest: ": Still unclear → ", key2: "search()" },
      { c: "err", t: "... repeats 38 more times ..." },
      { c: "err", t: "BudgetExceeded", rest: ": $4.82 burned" },
    ],
  },
  {
    icon: "💥",
    title: "Context Window Blowout",
    sev: "high",
    sevLabel: "▲ High",
    desc: "Long multi-step chains accumulate tool outputs, prior reasoning, and conversation history until the model exceeds its context limit — and silently forgets earlier instructions.",
    code: [
      { c: "key", t: "context_tokens", rest: ": ", num: "127,841", tail: " / ", num2: "128,000" },
      { c: "warn", t: "⚠ approaching limit" },
      { c: "cmt", t: "// model drops earliest messages" },
      { c: "err", t: "lost", rest: ": [system_prompt, initial_goal," },
      { c: "raw", t: "        tool_schema_v2, user_constraint]" },
      { c: "warn", t: "Agent now has no memory of the task" },
      { c: "err", t: "→ starts hallucinating objectives" },
    ],
  },
  {
    icon: "🌊",
    title: "Cascading Failures",
    sev: "high",
    sevLabel: "▲ High",
    desc: "One bad tool output poisons every downstream decision. The agent confidently builds on corrupted data — creating wrong records, sending bad emails, and making irreversible API calls.",
    code: [
      { c: "key", t: "step_1", rest: ": get_user_id(", str: "\"john\"", tail: ")" },
      { c: "err", t: "        → returns wrong user #9921" },
      { c: "key", t: "step_2", rest: ": get_orders(", num: "9921", tail: ")   ", warn2: "← wrong!" },
      { c: "key", t: "step_3", rest: ": refund_order(", num: "9921", tail: ")  ", err2: "← wrong!" },
      { c: "key", t: "step_4", rest: ": send_receipt(", num: "9921", tail: ")  ", err2: "← wrong!" },
      { c: "cmt", t: "// all 4 steps confident, no error thrown" },
      { c: "err", t: "Silent data corruption across 3 systems" },
    ],
  },
];

const STACK = [
  { num: "01", title: "Tool Input / Output Validation", desc: "Validate every parameter before the tool fires. Validate every response before it enters the agent's context. JSON Schema, Zod, Pydantic — pick one, use it everywhere.", tags: [["Prevents Hallucinations", "gold"], ["Prevents Cascades", "deep"]] },
  { num: "02", title: "Loop Detection + Max Step Limits", desc: "Track the last N tool calls. If the same tool is called with the same args twice in a window, interrupt and ask for clarification. Hard cap at 30–50 steps maximum.", tags: [["Kills Infinite Loops", "red"]] },
  { num: "03", title: "Structured Output Parsing", desc: "Never parse free-text for decisions. Force the model into a typed schema at every decision point. No regex on LLM output. No JSON.parse without a schema.", tags: [["Prevents Silent Failures", "gold"]] },
  { num: "04", title: "Human-in-the-Loop Checkpoints", desc: "Before any irreversible action (write, send, delete, pay) — pause and confirm. Surface a diff of what will change. Let the human approve, edit, or abort.", tags: [["Prevents Irreversible Damage", "steel"]] },
  { num: "05", title: "Cost Guardrails Per Run", desc: "Set hard token and dollar budgets per agent run. Alert at 70%, interrupt at 90%, kill at 100%. Track per-tool cost contribution so you know where budget goes.", tags: [["Prevents Runaway Costs", "green"]] },
];

const TAG_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  gold: { bg: "rgba(232,181,61,.12)", color: "#E8B53D", border: "rgba(232,181,61,.25)" },
  deep: { bg: "rgba(176,129,14,.14)", color: "#F3C34E", border: "rgba(176,129,14,.3)" },
  steel: { bg: "rgba(94,130,174,.14)", color: "#86A8CE", border: "rgba(94,130,174,.3)" },
  red: { bg: "rgba(220,38,38,.12)", color: "#f87171", border: "rgba(220,38,38,.25)" },
  green: { bg: "rgba(34,197,94,.12)", color: "#86efac", border: "rgba(34,197,94,.25)" },
};

const METRICS = [
  ["step_latency", "p95: 1.4s"],
  ["tool_calls/run", "avg: 8.2"],
  ["cost/run", "$0.034"],
  ["failure_rate", "4.1%"],
  ["loop_detected", "0.3%"],
  ["ctx_overflow", "0.8%"],
];

type TraceRow = { badge: string; bt: string; strong: string; msg: string; time: string; cost: string; costGreen?: boolean };
const TRACE: TraceRow[] = [
  { badge: "INIT", bt: "info", strong: "Agent start", msg: " — task=\"Process refund for order #8823\" · tools_registered=12 · budget=$0.10", time: "+0ms", cost: "$0.000" },
  { badge: "TOOL", bt: "ok", strong: "→ lookup_order", msg: "(order_id=\"8823\") · validated ✓ · response: {status:\"pending\", user_id:5521}", time: "+142ms", cost: "$0.003" },
  { badge: "TOOL", bt: "ok", strong: "→ get_user", msg: "(user_id=5521) · validated ✓ · response: {name:\"Maria Chen\", tier:\"gold\"}", time: "+298ms", cost: "$0.006" },
  { badge: "WARN", bt: "warn", strong: "Tool call attempt:", msg: " \"check_refund_policy_v2\" ← not registered · fuzzy match → \"check_refund_policy\"", time: "+401ms", cost: "$0.008" },
  { badge: "CATCH", bt: "catch", strong: "Validator intercepted", msg: " hallucinated tool name · redirected to correct tool · retry queued", time: "+402ms", cost: "$0.008" },
  { badge: "TOOL", bt: "ok", strong: "→ check_refund_policy", msg: "(tier=\"gold\", days_since_purchase=12) · eligible=true · max_amount=$249", time: "+558ms", cost: "$0.012" },
  { badge: "PAUSE", bt: "warn", strong: "Human checkpoint:", msg: " irreversible action detected — process_refund($189.99) · awaiting approval", time: "+601ms", cost: "$0.014" },
  { badge: "HUMAN", bt: "ok", strong: "Approved by:", msg: " agent@company.com · diff reviewed · proceeding with refund", time: "+14.2s", cost: "$0.014" },
  { badge: "TOOL", bt: "ok", strong: "→ process_refund", msg: "(order_id=\"8823\", amount=189.99) · txn_id=\"rfnd_9xa2\" · status=success", time: "+15.8s", cost: "$0.021" },
  { badge: "DONE", bt: "ok", strong: "Run complete", msg: " · steps=7 · tools_called=5 · wall_time=15.8s · no loops detected · cost within budget", time: "+15.9s", cost: "$0.022", costGreen: true },
];

const TRACE_BADGE: Record<string, { bg: string; color: string; border: string }> = {
  ok: { bg: "rgba(34,197,94,.18)", color: "#86efac", border: "rgba(34,197,94,.3)" },
  warn: { bg: "rgba(232,181,61,.18)", color: "#F3C34E", border: "rgba(232,181,61,.3)" },
  err: { bg: "rgba(220,38,38,.18)", color: "#f87171", border: "rgba(220,38,38,.3)" },
  info: { bg: "rgba(94,130,174,.18)", color: "#86A8CE", border: "rgba(94,130,174,.35)" },
  catch: { bg: "rgba(232,181,61,.15)", color: "#E8B53D", border: "rgba(232,181,61,.35)" },
};

const OBS_CARDS = [
  { icon: "🔍", title: "Trace Every Step", desc: "Assign a run ID to every agent invocation. Log each reasoning step, tool call, and model response with timestamps. Make traces searchable and retentable for 30+ days." },
  { icon: "📊", title: "Measure Tool Performance", desc: "Track latency, error rate, and token cost per tool individually. Know which tools are slow, which fail most often, and which tools are called unnecessarily." },
  { icon: "🚨", title: "Alert on Anomalies", desc: "Set thresholds: cost/run exceeds $0.10, step count over 20, same tool called 3× in a row, context fills above 80%. Alert before the user notices something is wrong." },
];

const PROD_CARDS = [
  { icon: "🛡️", title: "Validate at Every Boundary", desc: "Input before planning. Tool args before calling. Tool output before returning to context. Output before sending to users. No boundary should be unchecked." },
  { icon: "🔄", title: "Fallbacks Are First-Class", desc: "Design the failure path before the happy path. What happens on loop detection? On context overflow? On budget exhaustion? Every failure mode needs a handler — not a crash." },
  { icon: "🧵", title: "Traces Connect Everything", desc: "A single run_id should let you replay every decision, every tool call, every cost charge. When something breaks at 3 AM, traces tell you exactly why within 30 seconds." },
];

const HERO_STEPS = [
  { icon: "✓", time: "0ms", color: "#86efac", label: <>Agent initialized · model=claude-3-5-sonnet</> },
  { icon: "✓", time: "142ms", color: "#86efac", label: <>Tool call → <span style={{ color: "#E8B53D" }}>search_docs</span>(query=&quot;refund policy&quot;)</> },
  { icon: "⚠", time: "1.2s", color: "#F3C34E", label: <>Tool call → <span style={{ color: "#f87171" }}>send_email_v2</span> ← NOT REGISTERED</> },
  { icon: "✗", time: "1.2s", color: "#f87171", label: <>ToolNotFoundError: hallucinated tool name</> },
  { icon: "⟳", time: "1.3s", color: "#E8B53D", label: <>Caught → fallback to <span style={{ color: "#86efac" }}>send_email</span> · retrying<span className="agnt-blink">_</span></> },
];

export default function AiAgentsArticle() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("agnt-vis"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".agnt-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="agnt min-h-screen flex flex-col" style={{ background: "#0a1628", color: "#fff" }}>
      <style>{`
        @keyframes agnt-fadeup { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes agnt-spin { from { transform:rotate(0); } to { transform:rotate(360deg); } }
        @keyframes agnt-pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }
        @keyframes agnt-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        .agnt-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
        .agnt-reveal.agnt-vis { opacity:1; transform:translateY(0); }
        .agnt-d1 { transition-delay:.1s; } .agnt-d2 { transition-delay:.2s; } .agnt-d3 { transition-delay:.3s; } .agnt-d4 { transition-delay:.4s; }
        .agnt-spin { animation: agnt-spin 3s linear infinite; display:inline-block; }
        .agnt-pulse { animation: agnt-pulse 2.5s ease-in-out infinite; }
        .agnt-blink { animation: agnt-blink 1s step-end infinite; }
        .agnt-card { transition: border-color .25s, box-shadow .25s, transform .15s; }
        .agnt-card:hover { border-color: rgba(232,181,61,.45) !important; box-shadow: 0 0 35px rgba(232,181,61,.18); transform: translateY(-3px); }
        .agnt-stackitem { transition: transform .2s; }
        .agnt-stackitem:hover { transform: translateX(6px); }
        @media (prefers-reduced-motion: reduce) { .agnt-reveal,.agnt-spin,.agnt-pulse,.agnt-blink { animation:none !important; transition:none !important; opacity:1 !important; transform:none !important; } }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden text-center px-6 pt-24 pb-24" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 44%, rgba(232,181,61,.12) 0%, transparent 70%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(232,181,61,.06) 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
        <div className="relative max-w-3xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All insights
          </Link>
          <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-7 text-[.78rem] font-bold uppercase tracking-wider" style={{ background: "rgba(232,181,61,.12)", border: "1px solid rgba(232,181,61,.3)", color: "#E8B53D" }}>
            <span className="agnt-pulse w-2 h-2 rounded-full inline-block" style={{ background: "#E8B53D" }} />
            Agentic AI Systems · Agent Reliability
          </div>
          <h1 className="text-white font-black leading-[1.08]" style={{ fontSize: "clamp(2.2rem,5.5vw,3.8rem)", letterSpacing: "-.03em" }}>
            AI agents look <span style={{ background: "linear-gradient(90deg,#F3C34E,#E8B53D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>magical</span> in demos.<br />
            In production, they loop,<br />hallucinate, and call the wrong tool.
          </h1>
          <p className="text-white/50 mt-5 mx-auto" style={{ maxWidth: 600, fontSize: "1.12rem" }}>
            Every demo hides the failure modes. Real agents face context blowouts, infinite reasoning loops, and cascading tool errors at 3 AM. Here&apos;s what actually breaks — and how to fix it before it hits users.
          </p>

          {/* hero terminal */}
          <div className="rounded-xl mx-auto mt-10 text-left overflow-hidden relative" style={{ background: "rgba(10,22,40,.92)", border: "1px solid rgba(232,181,61,.25)", maxWidth: 540, boxShadow: "0 0 40px rgba(232,181,61,.1)" }}>
            <div aria-hidden className="absolute top-0 left-0 right-0" style={{ height: 2, background: "linear-gradient(90deg,#E8B53D,#B0810E,transparent)" }} />
            <div className="flex items-center gap-1.5 px-6 pt-5 pb-3 mb-1" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
              <span className="flex-1 text-center" style={{ color: "#64748b", fontSize: ".72rem", fontFamily: MONO }}>agent-run · trace #4821</span>
            </div>
            <div className="px-6 pb-5" style={{ fontFamily: MONO, fontSize: ".8rem", lineHeight: 1.8 }}>
              {HERO_STEPS.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 py-0.5">
                  <span className="flex-shrink-0 w-4 text-center" style={{ color: s.color }}>{s.icon}</span>
                  <span style={{ color: "#64748b", minWidth: 46 }}>{s.time}</span>
                  <span style={{ color: s.color }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-10">
            {[["68%", "agents fail silently in prod"], ["3.4×", "avg cost overrun without guardrails"], ["<1%", "of demos cover error paths"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="font-black leading-none" style={{ fontSize: "1.9rem", letterSpacing: "-.03em", background: "linear-gradient(90deg,#F3C34E,#B0810E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                <div className="text-white/50 mt-1" style={{ fontSize: ".78rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAILURE MODES */}
      <section className="px-6 py-20" style={{ background: "#0d1829" }}>
        <div className="max-w-5xl mx-auto">
          <div className="agnt-reveal mb-12">
            <AgntEyebrow>§ 01 — Why Agents Break</AgntEyebrow>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-.025em" }}>Four failure modes that kill production agents</h2>
            <p className="text-white/50" style={{ maxWidth: 650, lineHeight: 1.75 }}>Demo environments use happy-path inputs, tiny context windows, and no real side effects. Production is different. Here are the four failures that actually happen.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {FAILURES.map((f, i) => (
              <div key={f.title} className={`agnt-reveal agnt-d${(i % 4) + 1} agnt-card rounded-2xl p-7 relative overflow-hidden`} style={{ background: "rgba(10,22,40,.9)", border: "1px solid rgba(220,38,38,.2)" }}>
                <div aria-hidden className="absolute top-0 left-0 right-0" style={{ height: 3, background: f.sev === "critical" ? "linear-gradient(90deg,#dc2626,#B0810E)" : "linear-gradient(90deg,#B0810E,#E8B53D)" }} />
                <span className="inline-flex items-center gap-1.5 text-[.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3.5" style={f.sev === "critical" ? { background: "rgba(220,38,38,.15)", color: "#f87171", border: "1px solid rgba(220,38,38,.3)" } : { background: "rgba(176,129,14,.15)", color: "#F3C34E", border: "1px solid rgba(176,129,14,.3)" }}>{f.sevLabel}</span>
                <h3 className="font-bold text-white mb-2" style={{ fontSize: "1.08rem" }}>{f.icon} {f.title}</h3>
                <p className="text-white/50 mb-4" style={{ fontSize: ".88rem", lineHeight: 1.65 }}>{f.desc}</p>
                <pre className="rounded-lg overflow-x-auto" style={{ background: "rgba(6,12,22,.9)", border: "1px solid rgba(255,255,255,.06)", padding: ".85rem 1rem", fontFamily: MONO, fontSize: ".76rem", lineHeight: 1.6, margin: 0 }}>
                  {f.code.map((ln: { c: string; t: string; rest?: string; key2?: string; err?: string; str?: string; num?: string; tail?: string; num2?: string; warn2?: string; err2?: string }, j) => (
                    <div key={j}>
                      <span style={{ color: codeColor(ln.c) }}>{ln.t}</span>
                      {ln.rest && <span style={{ color: "#94a3b8" }}>{ln.rest}</span>}
                      {ln.key2 && <span style={{ color: "#86A8CE" }}>{ln.key2}</span>}
                      {ln.err && <span style={{ color: "#f87171" }}>{ln.err}</span>}
                      {ln.str && <span style={{ color: "#86efac" }}>{ln.str}</span>}
                      {ln.num && <span style={{ color: "#F3C34E" }}>{ln.num}</span>}
                      {ln.tail && <span style={{ color: "#94a3b8" }}>{ln.tail}</span>}
                      {ln.num2 && <span style={{ color: "#F3C34E" }}>{ln.num2}</span>}
                      {ln.warn2 && <span style={{ color: "#F3C34E" }}>{ln.warn2}</span>}
                      {ln.err2 && <span style={{ color: "#f87171" }}>{ln.err2}</span>}
                    </div>
                  ))}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELIABILITY STACK */}
      <section className="px-6 py-20" style={{ background: "#0a1628" }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="agnt-reveal mb-8">
              <AgntEyebrow>§ 02 — Agentic Reliability Stack</AgntEyebrow>
              <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-.025em" }}>What you need before shipping an agent</h2>
              <p className="text-white/50" style={{ maxWidth: 560, lineHeight: 1.75 }}>Reliability isn&apos;t a feature you add later. These five layers are what separates a demo that works once from an agent your customers can depend on.</p>
            </div>
            <div className="relative">
              <div aria-hidden className="absolute" style={{ left: 22, top: 28, bottom: 28, width: 2, background: "linear-gradient(to bottom,#E8B53D,#B0810E,#5E82AE)", borderRadius: 2 }} />
              {STACK.map((s, i) => (
                <div key={s.num} className={`agnt-reveal agnt-d${(i % 4) + 1} agnt-stackitem flex items-start gap-5 relative`} style={{ padding: "1.2rem 0" }}>
                  <div className="flex items-center justify-center flex-shrink-0 font-black relative" style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,rgba(232,181,61,.2),rgba(176,129,14,.2))", border: "2px solid rgba(232,181,61,.4)", color: "#E8B53D", fontSize: ".9rem", zIndex: 1 }}>{s.num}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1" style={{ fontSize: "1rem" }}>{s.title}</h3>
                    <p className="text-white/50" style={{ fontSize: ".88rem", lineHeight: 1.6 }}>{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {s.tags.map(([label, tone]) => {
                        const st = TAG_STYLE[tone];
                        return <span key={label} className="inline-block text-[.66rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>{label}</span>;
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right: SVG stack diagram */}
          <div className="agnt-reveal agnt-d2 rounded-2xl relative overflow-hidden" style={{ background: "rgba(10,22,40,.8)", border: `1px solid ${BORDER}`, padding: "1.6rem" }}>
            <div aria-hidden className="absolute top-0 left-0 right-0" style={{ height: 3, background: "linear-gradient(90deg,#E8B53D,#B0810E)" }} />
            <div className="mb-5" style={{ fontFamily: MONO, fontSize: ".78rem", color: "#94a3b8" }}>reliability-stack.svg</div>
            <svg viewBox="0 0 380 440" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
              <defs>
                <linearGradient id="agnt-sg1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E8B53D" />
                  <stop offset="100%" stopColor="#B0810E" />
                </linearGradient>
              </defs>
              <line x1="60" y1="30" x2="60" y2="410" stroke="url(#agnt-sg1)" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
              {/* layer 1 */}
              <rect x="90" y="20" width="270" height="54" rx="8" fill="rgba(232,181,61,0.08)" stroke="rgba(232,181,61,0.35)" strokeWidth="1.5" />
              <circle cx="60" cy="47" r="12" fill="rgba(232,181,61,0.2)" stroke="#E8B53D" strokeWidth="1.5" />
              <text x="60" y="52" textAnchor="middle" fill="#E8B53D" fontSize="10" fontWeight="700">01</text>
              <text x="106" y="41" fill="#e2e8f0" fontSize="11" fontWeight="700">Tool I/O Validation</text>
              <text x="106" y="58" fill="#94a3b8" fontSize="9">JSON Schema · Zod · Pydantic</text>
              <rect x="296" y="30" width="54" height="20" rx="5" fill="rgba(232,181,61,0.15)" stroke="rgba(232,181,61,0.3)" strokeWidth="1" />
              <text x="323" y="44" textAnchor="middle" fill="#E8B53D" fontSize="8" fontWeight="700">CRITICAL</text>
              {/* layer 2 */}
              <rect x="90" y="95" width="270" height="54" rx="8" fill="rgba(176,129,14,0.1)" stroke="rgba(176,129,14,0.3)" strokeWidth="1.5" />
              <circle cx="60" cy="122" r="12" fill="rgba(176,129,14,0.2)" stroke="#B0810E" strokeWidth="1.5" />
              <text x="60" y="127" textAnchor="middle" fill="#B0810E" fontSize="10" fontWeight="700">02</text>
              <text x="106" y="116" fill="#e2e8f0" fontSize="11" fontWeight="700">Loop Detection + Step Limit</text>
              <text x="106" y="133" fill="#94a3b8" fontSize="9">dedup window · max 30–50 steps</text>
              <rect x="296" y="105" width="54" height="20" rx="5" fill="rgba(176,129,14,0.15)" stroke="rgba(176,129,14,0.3)" strokeWidth="1" />
              <text x="323" y="119" textAnchor="middle" fill="#F3C34E" fontSize="8" fontWeight="700">CRITICAL</text>
              {/* layer 3 */}
              <rect x="90" y="170" width="270" height="54" rx="8" fill="rgba(232,181,61,0.06)" stroke="rgba(232,181,61,0.25)" strokeWidth="1.5" />
              <circle cx="60" cy="197" r="12" fill="rgba(232,181,61,0.15)" stroke="#E8B53D" strokeWidth="1.5" />
              <text x="60" y="202" textAnchor="middle" fill="#E8B53D" fontSize="10" fontWeight="700">03</text>
              <text x="106" y="191" fill="#e2e8f0" fontSize="11" fontWeight="700">Structured Output Parsing</text>
              <text x="106" y="208" fill="#94a3b8" fontSize="9">typed schemas at every decision point</text>
              {/* layer 4 */}
              <rect x="90" y="245" width="270" height="54" rx="8" fill="rgba(94,130,174,0.08)" stroke="rgba(94,130,174,0.3)" strokeWidth="1.5" />
              <circle cx="60" cy="272" r="12" fill="rgba(94,130,174,0.16)" stroke="#86A8CE" strokeWidth="1.5" />
              <text x="60" y="277" textAnchor="middle" fill="#86A8CE" fontSize="10" fontWeight="700">04</text>
              <text x="106" y="266" fill="#e2e8f0" fontSize="11" fontWeight="700">Human-in-the-Loop Checkpoints</text>
              <text x="106" y="283" fill="#94a3b8" fontSize="9">pause before write/send/delete</text>
              <rect x="296" y="255" width="54" height="20" rx="5" fill="rgba(94,130,174,0.14)" stroke="rgba(94,130,174,0.3)" strokeWidth="1" />
              <text x="323" y="269" textAnchor="middle" fill="#86A8CE" fontSize="8" fontWeight="700">REQUIRED</text>
              {/* layer 5 */}
              <rect x="90" y="320" width="270" height="54" rx="8" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5" />
              <circle cx="60" cy="347" r="12" fill="rgba(34,197,94,0.15)" stroke="#86efac" strokeWidth="1.5" />
              <text x="60" y="352" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="700">05</text>
              <text x="106" y="341" fill="#e2e8f0" fontSize="11" fontWeight="700">Cost Guardrails Per Run</text>
              <text x="106" y="358" fill="#94a3b8" fontSize="9">budget cap · alert 70% · kill 100%</text>
              {/* foundation */}
              <rect x="90" y="395" width="270" height="28" rx="6" fill="rgba(232,181,61,0.12)" stroke="rgba(232,181,61,0.3)" strokeWidth="1" />
              <text x="225" y="413" textAnchor="middle" fill="#E8B53D" fontSize="10" fontWeight="700">PRODUCTION FOUNDATION</text>
            </svg>
          </div>
        </div>
      </section>

      {/* OBSERVABILITY */}
      <section className="px-6 py-20" style={{ background: "#101d3a" }}>
        <div className="max-w-5xl mx-auto">
          <div className="agnt-reveal mb-8">
            <AgntEyebrow>§ 03 — Observable Agents</AgntEyebrow>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-.025em" }}>If you can&apos;t see it, you can&apos;t fix it</h2>
            <p className="text-white/50" style={{ maxWidth: 650, lineHeight: 1.75 }}>Trace every step. Log every tool call. Measure latency per step, cost per run, and failure rate per tool. Observability is not optional — it&apos;s the only way to know what&apos;s actually happening.</p>
          </div>

          {/* metric chips */}
          <div className="agnt-reveal flex flex-wrap gap-2 mb-10">
            {METRICS.map(([k, v]) => (
              <span key={k} className="inline-flex items-center gap-1.5 rounded-lg" style={{ background: "rgba(232,181,61,.08)", border: "1px solid rgba(232,181,61,.2)", padding: ".4rem .85rem", fontSize: ".82rem", color: "#E8B53D", fontFamily: MONO }}>
                {k} <span style={{ fontWeight: 700, color: "#F3C34E" }}>{v}</span>
              </span>
            ))}
          </div>

          {/* trace panel */}
          <div className="agnt-reveal rounded-2xl overflow-hidden" style={{ background: "rgba(6,12,22,.95)", border: "1px solid rgba(232,181,61,.2)", boxShadow: "0 0 60px rgba(232,181,61,.08)" }}>
            <div className="flex items-center gap-4 px-6 py-3.5" style={{ background: "rgba(10,22,40,.8)", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
              </div>
              <div className="flex-1 text-center" style={{ fontFamily: MONO, fontSize: ".76rem", color: "#94a3b8" }}>agent-trace · run_id=7f3a2b · run#4821 · model=claude-3-5-sonnet · session=prod</div>
            </div>
            <div className="px-5 py-5 overflow-x-auto" style={{ fontFamily: MONO, fontSize: ".8rem", lineHeight: 1.9 }}>
              {TRACE.map((r, i) => {
                const b = TRACE_BADGE[r.bt];
                return (
                  <div key={i} className="flex items-start" style={{ paddingBottom: ".5rem", marginBottom: ".5rem", borderBottom: i < TRACE.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none" }}>
                    <span className="flex-shrink-0 text-center" style={{ fontSize: ".68rem", fontWeight: 700, padding: ".1rem .5rem", borderRadius: 5, marginRight: ".75rem", minWidth: 52, background: b.bg, color: b.color, border: `1px solid ${b.border}` }}>{r.badge}</span>
                    <span className="flex-1" style={{ color: "#94a3b8" }}><strong style={{ color: "#e2e8f0" }}>{r.strong}</strong>{r.msg}</span>
                    <span className="text-right" style={{ color: "#64748b", fontSize: ".73rem", marginLeft: "1rem", minWidth: 55 }}>{r.time}</span>
                    <span className="text-right" style={{ color: r.costGreen ? "#86efac" : "#B0810E", fontWeight: r.costGreen ? 700 : 400, fontSize: ".73rem", marginLeft: ".75rem", minWidth: 52 }}>{r.cost}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* what to trace */}
          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            {OBS_CARDS.map((c, i) => (
              <div key={c.title} className={`agnt-reveal agnt-d${i + 1} agnt-card rounded-xl relative overflow-hidden`} style={{ background: "rgba(10,22,40,.8)", border: `1px solid ${BORDER}`, padding: "1.8rem" }}>
                <div aria-hidden className="absolute top-0 left-0 right-0" style={{ height: 3, background: "linear-gradient(90deg,#E8B53D,#B0810E)" }} />
                <span className="block mb-3" style={{ fontSize: "1.6rem" }}>{c.icon}</span>
                <h3 className="font-bold text-white mb-1.5" style={{ fontSize: "1.1rem" }}>{c.title}</h3>
                <p className="text-white/50" style={{ fontSize: ".9rem", lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTION READY */}
      <section className="px-6 py-20" style={{ background: "#0d1829" }}>
        <div className="max-w-5xl mx-auto">
          <div className="agnt-reveal mb-10">
            <AgntEyebrow>§ 04 — Production-Ready Agents</AgntEyebrow>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-.025em" }}>What a well-instrumented agent actually looks like</h2>
            <p className="text-white/50" style={{ maxWidth: 650, lineHeight: 1.75 }}>A production agent isn&apos;t just an LLM calling tools. It&apos;s a hardened pipeline with validated inputs, observed steps, controlled costs, and a fallback path for every failure mode.</p>
          </div>

          {/* SVG flow diagram */}
          <div className="agnt-reveal overflow-x-auto">
            <svg viewBox="0 0 900 520" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 900, display: "block", margin: "0 auto" }}>
              <defs>
                <linearGradient id="agnt-fg1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E8B53D" />
                  <stop offset="100%" stopColor="#B0810E" />
                </linearGradient>
                <marker id="agnt-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="rgba(232,181,61,0.6)" /></marker>
                <marker id="agnt-arr-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#22c55e" /></marker>
                <marker id="agnt-arr-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" /></marker>
              </defs>
              <rect width="900" height="520" rx="14" fill="rgba(10,22,40,0.8)" />
              <rect width="900" height="3" rx="2" fill="url(#agnt-fg1)" />
              <text x="450" y="32" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">production-agent-flow.svg</text>
              {/* user input */}
              <rect x="30" y="60" width="130" height="52" rx="8" fill="rgba(94,130,174,0.12)" stroke="rgba(94,130,174,0.45)" strokeWidth="1.5" />
              <text x="95" y="82" textAnchor="middle" fill="#86A8CE" fontSize="10" fontWeight="700">USER INPUT</text>
              <text x="95" y="97" textAnchor="middle" fill="#64748b" fontSize="9">intent + context</text>
              <line x1="160" y1="86" x2="196" y2="86" stroke="rgba(232,181,61,0.5)" strokeWidth="1.5" markerEnd="url(#agnt-arr)" />
              {/* input validator */}
              <rect x="200" y="60" width="130" height="52" rx="8" fill="rgba(232,181,61,0.1)" stroke="rgba(232,181,61,0.4)" strokeWidth="1.5" />
              <text x="265" y="82" textAnchor="middle" fill="#E8B53D" fontSize="10" fontWeight="700">INPUT VALIDATOR</text>
              <text x="265" y="97" textAnchor="middle" fill="#64748b" fontSize="9">schema · sanitize</text>
              <line x1="330" y1="86" x2="366" y2="86" stroke="rgba(232,181,61,0.5)" strokeWidth="1.5" markerEnd="url(#agnt-arr)" />
              {/* agent planner */}
              <rect x="370" y="50" width="160" height="72" rx="8" fill="rgba(232,181,61,0.08)" stroke="url(#agnt-fg1)" strokeWidth="2" />
              <text x="450" y="76" textAnchor="middle" fill="#F3C34E" fontSize="12" fontWeight="800">AGENT PLANNER</text>
              <text x="450" y="93" textAnchor="middle" fill="#94a3b8" fontSize="9">model · tool schema · memory</text>
              <text x="450" y="107" textAnchor="middle" fill="#64748b" fontSize="9">loop detector · step counter</text>
              <line x1="530" y1="86" x2="566" y2="86" stroke="rgba(232,181,61,0.5)" strokeWidth="1.5" markerEnd="url(#agnt-arr)" />
              {/* tool router */}
              <rect x="570" y="60" width="130" height="52" rx="8" fill="rgba(176,129,14,0.12)" stroke="rgba(176,129,14,0.4)" strokeWidth="1.5" />
              <text x="635" y="82" textAnchor="middle" fill="#F3C34E" fontSize="10" fontWeight="700">TOOL ROUTER</text>
              <text x="635" y="97" textAnchor="middle" fill="#64748b" fontSize="9">validate name + args</text>
              <line x1="635" y1="112" x2="635" y2="160" stroke="rgba(176,129,14,0.4)" strokeWidth="1.5" markerEnd="url(#agnt-arr-red)" />
              {/* tool executors */}
              <rect x="490" y="164" width="100" height="44" rx="6" fill="rgba(15,32,68,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="540" y="183" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">TOOL A</text>
              <text x="540" y="196" textAnchor="middle" fill="#64748b" fontSize="8">search_docs</text>
              <rect x="605" y="164" width="100" height="44" rx="6" fill="rgba(15,32,68,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="655" y="183" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">TOOL B</text>
              <text x="655" y="196" textAnchor="middle" fill="#64748b" fontSize="8">get_user</text>
              <rect x="720" y="164" width="100" height="44" rx="6" fill="rgba(15,32,68,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="770" y="183" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">TOOL C</text>
              <text x="770" y="196" textAnchor="middle" fill="#64748b" fontSize="8">process_refund</text>
              <line x1="540" y1="208" x2="540" y2="250" stroke="rgba(34,197,94,0.4)" strokeWidth="1" markerEnd="url(#agnt-arr-green)" />
              <line x1="655" y1="208" x2="655" y2="250" stroke="rgba(34,197,94,0.4)" strokeWidth="1" markerEnd="url(#agnt-arr-green)" />
              <line x1="770" y1="208" x2="770" y2="250" stroke="rgba(34,197,94,0.4)" strokeWidth="1" markerEnd="url(#agnt-arr-green)" />
              {/* output validator */}
              <rect x="490" y="254" width="340" height="40" rx="8" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.35)" strokeWidth="1.5" />
              <text x="660" y="276" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="700">OUTPUT VALIDATOR — schema + type check per tool response</text>
              <line x1="490" y1="274" x2="460" y2="274" stroke="rgba(232,181,61,0.4)" strokeWidth="1.5" markerEnd="url(#agnt-arr)" />
              <path d="M450,274 C440,274 440,260 440,150 C440,120 440,120 450,120" stroke="rgba(232,181,61,0.3)" strokeWidth="1" strokeDasharray="4 3" fill="none" />
              {/* human checkpoint */}
              <rect x="200" y="168" width="150" height="52" rx="8" fill="rgba(94,130,174,0.08)" stroke="rgba(94,130,174,0.35)" strokeWidth="1.5" strokeDasharray="5 3" />
              <text x="275" y="190" textAnchor="middle" fill="#86A8CE" fontSize="10" fontWeight="700">HUMAN CHECKPOINT</text>
              <text x="275" y="205" textAnchor="middle" fill="#64748b" fontSize="9">approve write/send/delete</text>
              <line x1="370" y1="150" x2="350" y2="194" stroke="rgba(94,130,174,0.3)" strokeWidth="1" strokeDasharray="4 3" />
              {/* cost guard */}
              <rect x="30" y="168" width="130" height="52" rx="8" fill="rgba(232,181,61,0.06)" stroke="rgba(232,181,61,0.25)" strokeWidth="1.5" />
              <text x="95" y="189" textAnchor="middle" fill="#E8B53D" fontSize="10" fontWeight="700">COST GUARD</text>
              <text x="95" y="204" textAnchor="middle" fill="#64748b" fontSize="9">$0.10 budget · kill at 100%</text>
              {/* tracer */}
              <rect x="30" y="300" width="840" height="50" rx="8" fill="rgba(232,181,61,0.05)" stroke="rgba(232,181,61,0.2)" strokeWidth="1" strokeDasharray="6 3" />
              <text x="450" y="321" textAnchor="middle" fill="#B0810E" fontSize="10" fontWeight="700">DISTRIBUTED TRACER</text>
              <text x="450" y="337" textAnchor="middle" fill="#64748b" fontSize="9">run_id · step_ts · tool_name · latency · tokens · cost · status — all steps above emit here</text>
              {/* fallback */}
              <rect x="370" y="380" width="160" height="52" rx="8" fill="rgba(220,38,38,0.08)" stroke="rgba(220,38,38,0.3)" strokeWidth="1.5" />
              <text x="450" y="401" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="700">FALLBACK HANDLER</text>
              <text x="450" y="416" textAnchor="middle" fill="#64748b" fontSize="9">loop / error / budget exceeded</text>
              <line x1="450" y1="354" x2="450" y2="376" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#agnt-arr-red)" />
              <text x="462" y="368" fill="#64748b" fontSize="8">on failure</text>
              {/* success */}
              <rect x="570" y="380" width="130" height="52" rx="8" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" />
              <text x="635" y="401" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="700">SUCCESS OUTPUT</text>
              <text x="635" y="416" textAnchor="middle" fill="#64748b" fontSize="9">structured result + trace link</text>
              <line x1="660" y1="354" x2="660" y2="376" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" markerEnd="url(#agnt-arr-green)" />
              <text x="672" y="368" fill="#64748b" fontSize="8">on success</text>
              <text x="95" y="244" textAnchor="middle" fill="#64748b" fontSize="8">⚡ real-time</text>
              <text x="275" y="234" textAnchor="middle" fill="#64748b" fontSize="8">🔒 gate</text>
              {/* legend */}
              <rect x="30" y="456" width="840" height="48" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="52" y1="480" x2="78" y2="480" stroke="rgba(232,181,61,0.6)" strokeWidth="1.5" markerEnd="url(#agnt-arr)" />
              <text x="85" y="484" fill="#94a3b8" fontSize="9">main flow</text>
              <line x1="160" y1="480" x2="186" y2="480" stroke="rgba(232,181,61,0.3)" strokeWidth="1" strokeDasharray="4 3" />
              <text x="193" y="484" fill="#94a3b8" fontSize="9">conditional</text>
              <line x1="268" y1="480" x2="294" y2="480" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" markerEnd="url(#agnt-arr-green)" />
              <text x="301" y="484" fill="#94a3b8" fontSize="9">validated output</text>
              <line x1="400" y1="480" x2="426" y2="480" stroke="rgba(220,38,38,0.5)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#agnt-arr-red)" />
              <text x="433" y="484" fill="#94a3b8" fontSize="9">error / fallback</text>
            </svg>
          </div>

          {/* cards below flow */}
          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            {PROD_CARDS.map((c, i) => (
              <div key={c.title} className={`agnt-reveal agnt-d${i + 1} agnt-card rounded-xl relative overflow-hidden`} style={{ background: "rgba(10,22,40,.8)", border: `1px solid ${BORDER}`, padding: "1.8rem" }}>
                <div aria-hidden className="absolute top-0 left-0 right-0" style={{ height: 3, background: "linear-gradient(90deg,#E8B53D,#B0810E)" }} />
                <span className="block mb-3" style={{ fontSize: "1.6rem" }}>{c.icon}</span>
                <h3 className="font-bold text-white mb-1.5" style={{ fontSize: "1.1rem" }}>{c.title}</h3>
                <p className="text-white/50" style={{ fontSize: ".9rem", lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden text-center px-6 py-24" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,181,61,.12) 0%, transparent 65%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-[.75rem] font-bold uppercase tracking-widest mb-4" style={{ color: "#E8B53D" }}>§ 05 — Ship With Confidence</p>
          <h2 className="text-white font-black mx-auto mb-4" style={{ fontSize: "clamp(1.8rem,4vw,2.7rem)", maxWidth: 760, lineHeight: 1.15, letterSpacing: "-.025em" }}>
            Agents your customers can depend on start with <span style={{ background: "linear-gradient(90deg,#F3C34E,#5E82AE,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>observability</span>, not demos.
          </h2>
          <p className="text-white/50 mx-auto mb-10" style={{ maxWidth: 560, fontSize: "1.05rem" }}>The gap between a demo agent and a production agent is validation, tracing, loop detection, human checkpoints, and cost guardrails. These aren&apos;t nice-to-haves. They&apos;re the difference between trust and outage.</p>
          <Link href="/contact" className="btn-primary">
            Build Production Agents With Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <p className="text-white/40 mt-5" style={{ fontSize: ".82rem" }}>Validated inputs. Observed steps. Controlled costs. A fallback for every failure.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function codeColor(c: string): string {
  switch (c) {
    case "cmt": return "#64748b";
    case "key": return "#86A8CE";
    case "err": return "#f87171";
    case "warn": return "#F3C34E";
    case "str": return "#86efac";
    case "num": return "#F3C34E";
    default: return "#94a3b8";
  }
}

function AgntEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[.75rem] font-bold uppercase tracking-widest" style={{ color: "#E8B53D" }}>
      <span className="inline-block rounded" style={{ width: 18, height: 2, background: "#E8B53D" }} />
      {children}
    </span>
  );
}
