"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * "RAG Done Right — What Nobody Tells You About Retrieval in Production" —
 * bespoke dark article themed to the RITS navy+gold palette (emerald/cyan/teal
 * brand accents mapped to gold/steel; green kept for grounded/relevant, red for
 * retrieval failure/hallucination, amber for caution). All styles scoped under `.raga`.
 */

const BORDER = "rgba(255,255,255,.08)";
const CARD = "#0f2044";

const GOLD = "#E8B53D";
const GOLD_LT = "#F3C34E";
const STEEL = "#5E82AE";
const STEEL_LT = "#86A8CE";

const PIPE = [
  { icon: "💬", label: "Query", desc: "User question" },
  { icon: "✂️", label: "Chunk", desc: "Split & index" },
  { icon: "🔢", label: "Embed", desc: "Vectorize" },
  { icon: "🔍", label: "Search", desc: "ANN lookup" },
  { icon: "🏆", label: "Rerank", desc: "Cross-encode" },
  { icon: "🤖", label: "LLM", desc: "Generate" },
];

const STATS = [
  { num: "5", label: "Failure Modes" },
  { num: "5", label: "RAG Quality Levels" },
  { num: "1", label: "Thing That Beats a Bigger Model" },
];

const LADDER = [
  {
    n: "1",
    color: "#ef4444",
    tagBorder: "rgba(239,68,68,.38)",
    tagColor: "#f87171",
    tagBg: "rgba(239,68,68,.08)",
    level: "Level 1 — Starting Point",
    title: "Naive RAG — Basic Vector Search, No Eval",
    desc: "Fixed-size chunks, one embedding model, top-k cosine search, feed directly to LLM. Works on demos. Fails on edge cases you haven't seen yet. You have no idea how often it fails because you have no measurement.",
    tags: ["text-embedding-ada-002", "chunk_size=512", "top_k=5", "no eval ✗"],
  },
  {
    n: "2",
    color: "#f59e0b",
    tagBorder: "rgba(245,158,11,.38)",
    tagColor: "#fbbf24",
    tagBg: "rgba(245,158,11,.08)",
    level: "Level 2 — Smarter Indexing",
    title: "Chunking Strategy + Metadata Enrichment",
    desc: "Semantic chunking respects document structure. Metadata tags (date, source, version, section) enable pre-filtering before vector search. Parent-document retrieval fetches larger context windows around matched chunks.",
    tags: ["semantic chunks", "metadata filters", "parent-doc retrieval", "sliding window"],
  },
  {
    n: "3",
    color: GOLD,
    tagBorder: "rgba(232,181,61,.38)",
    tagColor: GOLD_LT,
    tagBg: "rgba(232,181,61,.08)",
    level: "Level 3 — Better Retrieval",
    title: "Reranking + Hybrid Search (BM25 + Dense)",
    desc: "Combine keyword (BM25/TF-IDF) and dense vector retrieval — keywords catch exact matches that semantics miss. A cross-encoder reranker re-scores the combined candidate set. Reciprocal Rank Fusion merges the result lists.",
    tags: ["BM25 + dense fusion", "cross-encoder rerank", "RRF merging", "query expansion"],
  },
  {
    n: "4",
    color: "#22c55e",
    tagBorder: "rgba(34,197,94,.38)",
    tagColor: "#4ade80",
    tagBg: "rgba(34,197,94,.08)",
    level: "Level 4 — Measurement",
    title: "Retrieval Eval Harness — MRR, NDCG, Hit Rate",
    desc: "A golden Q&A dataset with ground-truth relevant chunks. Automated metrics run on every retrieval change. You now know your Hit@3, MRR@10, and NDCG@5 — and regressions block deployment.",
    tags: ["golden dataset", "MRR@10", "NDCG@5", "Hit@3", "CI gate"],
  },
  {
    n: "5",
    color: "#10b981",
    tagBorder: "rgba(16,185,129,.4)",
    tagColor: "#34d399",
    tagBg: "rgba(16,185,129,.08)",
    level: "Level 5 — Production",
    title: "Continuous Monitoring + Feedback Loop",
    desc: "Live retrieval metrics tracked per-query. Low-confidence retrievals are flagged. User feedback (thumbs down, corrections) flows back into the eval dataset. Model drift and distribution shift are caught automatically. The system gets better with every failure.",
    tags: ["live metrics", "feedback ingestion", "drift detection", "auto-reindexing", "A/B retrieval tests"],
    glow: true,
  },
];

const EVAL_STACK = [
  { layer: "Layer 1 — Golden Dataset", color: GOLD, desc: "~200 hand-curated query / relevant-chunk / expected-answer triples. Cover head queries (80%) and tail edge cases (20%). Update as content changes." },
  { layer: "Layer 2 — Retrieval Metrics", color: STEEL_LT, desc: "For each query, check if the relevant chunk appears in top-k results. Compute Hit@3, MRR@10, NDCG@5. Alert if MRR drops more than 5% from baseline." },
  { layer: "Layer 3 — Generation Metrics", color: GOLD_LT, desc: "Faithfulness (does the answer contradict the retrieved context?), Answer Relevance (does it answer the question?), Correctness vs. ground truth. Use an LLM-as-judge or RAGAS framework." },
  { layer: "Layer 4 — CI Gate", color: "#fbbf24", desc: "Every pull request that changes chunking, embedding, or retrieval logic runs the full eval suite. Regressions block merge. Improvements get logged." },
];

const RETR_METRICS = [
  { label: "MRR@10", pct: 71, val: "0.71", note: "▲ +0.08 vs baseline" },
  { label: "NDCG@5", pct: 76, val: "0.76", note: "▲ +0.11 vs baseline" },
  { label: "Hit@3", pct: 84, val: "0.84", note: "▲ +0.06 vs baseline" },
  { label: "Hit@1", pct: 62, val: "0.62", note: "▲ +0.09 vs baseline" },
];

const GEN_METRICS = [
  { label: "Faithfulness", pct: 91, val: "0.91", note: "✓ above threshold" },
  { label: "Answer Relevance", pct: 88, val: "0.88", note: "✓ above threshold" },
  { label: "Correctness", pct: 79, val: "0.79", note: "✓ above threshold" },
  { label: "Context Recall", pct: 83, val: "0.83", note: "✓ above threshold" },
];

const arrowSvg = (
  <svg width="28" height="16" viewBox="0 0 28 16">
    <path d="M0 8 H22 M18 2 L26 8 L18 14" stroke={GOLD} strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

export default function RagArticle() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("raga-vis"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".raga-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="raga min-h-screen flex flex-col" style={{ background: "#0a1628", color: "#fff" }}>
      <style>{`
        @keyframes raga-fadeup { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes raga-pulse { 0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(232,181,61,.4); } 50% { opacity:.6; box-shadow:0 0 0 6px rgba(232,181,61,0); } }
        @keyframes raga-glow { 0%,100% { box-shadow:0 0 20px rgba(232,181,61,.1); } 50% { box-shadow:0 0 40px rgba(232,181,61,.3); } }
        @keyframes raga-growbar { from { width:0 !important; } }
        .raga-reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
        .raga-reveal.raga-vis { opacity:1; transform:translateY(0); }
        .raga-d1 { transition-delay:.1s; } .raga-d2 { transition-delay:.2s; } .raga-d3 { transition-delay:.3s; } .raga-d4 { transition-delay:.4s; } .raga-d5 { transition-delay:.5s; }
        .raga-pulse { animation: raga-pulse 2s ease infinite; }
        .raga-glow { animation: raga-glow 3s ease infinite; }
        .raga-bar { animation: raga-growbar 1.5s ease both; transform-origin:left; }
        .raga-pipe:hover { border-color: rgba(232,181,61,.4) !important; transform: translateY(-3px); }
        .raga-card:hover { border-color: rgba(232,181,61,.35) !important; box-shadow: 0 0 40px rgba(232,181,61,.16); }
        .raga-ladder:hover { transform: translateX(4px); }
        @media (prefers-reduced-motion: reduce) { .raga-reveal,.raga-pulse,.raga-glow,.raga-bar { animation:none !important; transition:none !important; opacity:1 !important; transform:none !important; } }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden text-center px-4 pt-28 pb-20" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(232,181,61,.1) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(94,130,174,.08) 0%, transparent 60%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(232,181,61,.06) 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
        <div className="relative max-w-4xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All insights
          </Link>
          <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-7 text-[.78rem] font-bold uppercase tracking-wider" style={{ background: "rgba(232,181,61,.1)", border: "1px solid rgba(232,181,61,.3)", color: GOLD }}>
            <span className="raga-pulse w-1.5 h-1.5 rounded-full inline-block" style={{ background: GOLD }} />
            Retrieval-Augmented Generation
          </div>
          <h1 className="text-white font-black leading-[1.15]" style={{ fontSize: "clamp(2.2rem,6vw,4rem)", letterSpacing: "-0.02em" }}>
            RAG Done Right —<br />
            <span style={{ background: "linear-gradient(135deg,#F3C34E 0%,#86A8CE 55%,#5E82AE 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>What Nobody Tells You</span><br />
            About Retrieval in Production
          </h1>
          <p className="text-white/55 mt-6 mx-auto" style={{ maxWidth: 620, fontSize: "clamp(1rem,2vw,1.2rem)" }}>
            Most RAG implementations work fine on your test data. They fall apart on real user questions. The gap is in <span style={{ color: GOLD_LT, fontWeight: 600 }}>retrieval quality</span> — not the LLM.
          </p>

          {/* Pipeline visual */}
          <div className="flex items-center justify-center mt-12 mb-4 mx-auto" style={{ maxWidth: 840, overflowX: "auto", padding: "0.5rem 0.5rem" }}>
            {PIPE.map((p, i) => (
              <div key={p.label} className="flex items-center flex-shrink-0">
                <div className="raga-pipe flex flex-col items-center gap-1 rounded-[10px] px-4 py-3 flex-shrink-0" style={{ background: "rgba(15,32,68,.85)", border: `1px solid ${BORDER}`, minWidth: 100, transition: "border-color .3s, transform .3s" }}>
                  <div style={{ fontSize: "1.4rem" }}>{p.icon}</div>
                  <div className="font-semibold uppercase" style={{ fontSize: ".7rem", letterSpacing: ".06em", color: GOLD_LT, whiteSpace: "nowrap" }}>{p.label}</div>
                  <div className="text-white/45" style={{ fontSize: ".65rem", whiteSpace: "nowrap" }}>{p.desc}</div>
                </div>
                {i < PIPE.length - 1 && <div className="flex items-center justify-center flex-shrink-0" style={{ width: 32 }}>{arrowSvg}</div>}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-stretch mt-10">
            {STATS.map((s, i) => (
              <div key={s.label} className="px-7 py-3 text-center flex flex-col items-center justify-center" style={{ borderRight: i < STATS.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                <div className="font-black leading-none" style={{ fontSize: "2rem", background: "linear-gradient(135deg,#F3C34E,#86A8CE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.num}</div>
                <div className="text-white/45 mt-1.5 uppercase" style={{ fontSize: ".72rem", letterSpacing: ".08em", maxWidth: 130 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1 — FAILURE MODES */}
      <section className="px-6 py-20" style={{ background: "#0d1829" }}>
        <div className="max-w-5xl mx-auto">
          <div className="raga-reveal mb-10">
            <RagaLabel>The Hidden Problem</RagaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-0.02em" }}>5 Ways RAG Fails <span style={{ background: "linear-gradient(135deg,#F3C34E,#86A8CE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Silently</span></h2>
            <p className="text-white/50" style={{ maxWidth: 640, lineHeight: 1.75 }}>Your RAG system returns answers — that&apos;s the dangerous part. Silent failures produce plausible-sounding responses backed by the wrong context. Here are the five culprits, and what they look like in practice.</p>
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {/* 1 Chunk size */}
            <FailCard n="01" title="Wrong Chunk Size" desc="Too small: chunks lack the context the LLM needs. Too large: the relevant signal is buried in noise. There is no universal default — optimal size depends on your content structure and query patterns." delay={1}>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1.5 items-center mb-1">
                  <span style={{ fontSize: ".68rem", color: "#f87171", width: 70, flexShrink: 0 }}>Too small</span>
                  <div className="flex gap-0.5 flex-1">
                    {["18%", "14%", "22%", "16%", "20%"].map((w, i) => (
                      <div key={i} style={{ width: w, height: 10, borderRadius: 3, background: "rgba(239,68,68,.19)", border: "1px dashed rgba(239,68,68,.38)", color: "#f87171", fontSize: ".6rem", display: "flex", alignItems: "center", paddingLeft: 5 }}>…</div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1.5 items-center mb-1">
                  <span style={{ fontSize: ".68rem", color: "#34d399", width: 70, flexShrink: 0 }}>Optimal</span>
                  <div className="flex gap-1 flex-1">
                    {["45%", "48%"].map((w, i) => (
                      <div key={i} style={{ width: w, height: 10, borderRadius: 3, background: "rgba(16,185,129,.25)", border: "1px solid rgba(16,185,129,.5)", color: "rgba(52,211,153,.9)", fontSize: ".6rem", display: "flex", alignItems: "center", paddingLeft: 5, fontWeight: 700 }}>context</div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1.5 items-center">
                  <span style={{ fontSize: ".68rem", color: "#f59e0b", width: 70, flexShrink: 0 }}>Too large</span>
                  <div className="flex flex-1">
                    <div style={{ width: "95%", height: 10, borderRadius: 3, background: "rgba(245,158,11,.15)", border: "1px dashed rgba(245,158,11,.38)", color: "#f59e0b", fontSize: ".6rem", display: "flex", alignItems: "center", paddingLeft: 5, overflow: "hidden", whiteSpace: "nowrap" }}>noise · noise · signal · noise · noise</div>
                  </div>
                </div>
              </div>
            </FailCard>

            {/* 2 Embedding model */}
            <FailCard n="02" title="Wrong Embedding Model for the Domain" desc={"A model trained on Wikipedia won't understand \"T-cell exhaustion\" or \"EBITDA margin compression.\" Domain-specific terminology collapses into generic vectors — semantic similarity becomes meaningless."} delay={2}>
              <CodeBlock lines={[
                { c: "comment", t: "# Generic model — cosine distance" },
                { parts: [{ c: "key", t: "embed" }, { c: "plain", t: "(" }, { c: "bad", t: "\"myocardial infarction\"" }, { c: "plain", t: ") ≈" }] },
                { pad: true, parts: [{ c: "bad", t: "embed(\"heart attack\")  dist=0.82 ✗" }] },
                { c: "comment", t: "# Domain-tuned model", top: true },
                { parts: [{ c: "key", t: "embed" }, { c: "plain", t: "(" }, { c: "good", t: "\"myocardial infarction\"" }, { c: "plain", t: ") ≈" }] },
                { pad: true, parts: [{ c: "good", t: "embed(\"heart attack\")  dist=0.97 ✓" }] },
              ]} />
            </FailCard>

            {/* 3 No reranking */}
            <FailCard n="03" title="No Reranking Step" desc="ANN retrieval optimizes for speed, not relevance. Cosine similarity in embedding space is a proxy metric. A cross-encoder reranker evaluates query-document pairs directly — often flipping the top result entirely." delay={3}>
              <CodeBlock lines={[
                { c: "comment", t: "# Without reranking (top-3 by cosine)" },
                { parts: [{ c: "val", t: "rank 1" }, { c: "plain", t: " " }, { c: "bad", t: "score=0.91" }, { c: "plain", t: " " }, { c: "comment", t: "← partially related" }] },
                { parts: [{ c: "val", t: "rank 2" }, { c: "plain", t: " " }, { c: "bad", t: "score=0.88" }, { c: "plain", t: " " }, { c: "comment", t: "← off-topic" }] },
                { parts: [{ c: "val", t: "rank 3" }, { c: "plain", t: " " }, { c: "good", t: "score=0.85" }, { c: "plain", t: " " }, { c: "comment", t: "← actual answer" }] },
                { c: "comment", t: "# After cross-encoder reranking", top: true },
                { parts: [{ c: "val", t: "rank 1" }, { c: "plain", t: " " }, { c: "good", t: "score=0.97" }, { c: "plain", t: " " }, { c: "comment", t: "← actual answer ✓" }] },
              ]} />
            </FailCard>

            {/* 4 Metadata filters */}
            <FailCard n="04" title="Missing Metadata Filters" desc="Pure semantic search has no concept of time, version, or source type. Without filters, your RAG happily retrieves a 2019 deprecation notice when the user asks about the current API." delay={4}>
              <CodeBlock lines={[
                { c: "comment", t: "# Without metadata filter" },
                { parts: [{ c: "key", t: "query" }, { c: "plain", t: ": " }, { c: "val", t: "\"how to authenticate\"" }] },
                { parts: [{ c: "bad", t: "↳ retrieved: docs/auth_v1.md (2019) ✗" }] },
                { c: "comment", t: "# With metadata filter", top: true },
                { parts: [{ c: "key", t: "query" }, { c: "plain", t: ": " }, { c: "val", t: "\"how to authenticate\"" }] },
                { parts: [{ c: "key", t: "filter" }, { c: "plain", t: ": " }, { c: "val", t: "{\"version\": \"≥3.0\", \"type\": \"guide\"}" }] },
                { parts: [{ c: "good", t: "↳ retrieved: docs/auth_v3.md (2024) ✓" }] },
              ]} />
            </FailCard>

            {/* 5 No retrieval eval */}
            <FailCard n="05" title="No Retrieval Evaluation" desc="Teams measure LLM output quality, but never measure whether the right chunks were retrieved in the first place. You optimize the wrong layer and wonder why accuracy doesn't improve." delay={5}>
              <div style={{ borderRadius: 8, background: "rgba(10,22,40,.7)", border: "1px solid rgba(255,255,255,.08)", padding: "0.75rem" }}>
                <svg viewBox="0 0 260 90" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
                  <line x1="30" y1="10" x2="30" y2="70" stroke={STEEL} strokeWidth="1" />
                  <line x1="30" y1="70" x2="250" y2="70" stroke={STEEL} strokeWidth="1" />
                  <polyline points="30,45 70,42 110,44 150,43 190,41 230,40" fill="none" stroke="#34d399" strokeWidth="2" />
                  <polyline points="30,65 70,63 110,64 150,62 190,65 230,64" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,3" />
                  <text x="235" y="38" fill="#34d399" fontSize="7" fontFamily="monospace">LLM score (visible)</text>
                  <text x="235" y="62" fill="#ef4444" fontSize="7" fontFamily="monospace">Retrieval (ignored)</text>
                  <text x="28" y="80" fill={STEEL} fontSize="6" fontFamily="monospace">Time →</text>
                  <text x="8" y="14" fill={STEEL} fontSize="6" fontFamily="monospace" transform="rotate(-90,12,40)">Score</text>
                </svg>
              </div>
            </FailCard>
          </div>
        </div>
      </section>

      {/* SECTION 2 — QUALITY LADDER */}
      <section className="px-6 py-20" style={{ background: "#101d3a" }}>
        <div className="max-w-4xl mx-auto">
          <div className="raga-reveal mb-10">
            <RagaLabel>The Path Forward</RagaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-0.02em" }}>The RAG <span style={{ background: "linear-gradient(135deg,#F3C34E,#86A8CE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Quality Ladder</span></h2>
            <p className="text-white/50" style={{ maxWidth: 640, lineHeight: 1.75 }}>Five levels separate a weekend prototype from a production system you can trust. Each level builds on the last — you can&apos;t skip rungs without accumulating hidden debt.</p>
          </div>

          <div className="relative flex flex-col gap-4" style={{ paddingLeft: "2.5rem" }}>
            <div aria-hidden className="absolute" style={{ left: 10, top: 20, bottom: 20, width: 2, background: "linear-gradient(180deg,#ef4444,#f59e0b,#E8B53D,#22c55e,#10b981)" }} />
            {LADDER.map((it, i) => (
              <div key={it.n} className={`raga-reveal raga-d${i + 1} relative flex items-start`} style={{ gap: "1.25rem" }}>
                <div className="absolute flex items-center justify-center font-extrabold" style={{ left: "-2.5rem", top: "1rem", width: 20, height: 20, borderRadius: "50%", border: `2px solid ${it.color}`, background: "#101d3a", color: it.color, fontSize: ".65rem", flexShrink: 0, zIndex: 1 }}>{it.n}</div>
                <div className={`raga-ladder ${it.glow ? "raga-glow" : ""} flex-1`} style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${it.color}`, borderRadius: 10, padding: "1.25rem 1.5rem", transition: "border-color .3s, transform .3s" }}>
                  <div className="uppercase font-bold" style={{ fontSize: ".68rem", letterSpacing: ".1em", marginBottom: ".3rem", color: it.color }}>{it.level}</div>
                  <h3 className="text-white font-bold mb-1.5" style={{ fontSize: "1rem" }}>{it.title}</h3>
                  <p className="text-white/50" style={{ fontSize: ".85rem", lineHeight: 1.6 }}>{it.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {it.tags.map((t) => (
                      <span key={t} className="font-semibold" style={{ fontSize: ".7rem", padding: ".2rem .55rem", borderRadius: 999, border: `1px solid ${it.tagBorder}`, color: it.tagColor, background: it.tagBg, letterSpacing: ".04em" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — HALLUCINATION VS RETRIEVAL */}
      <section className="px-6 py-20" style={{ background: "#0d1829" }}>
        <div className="max-w-5xl mx-auto">
          <div className="raga-reveal mb-10">
            <RagaLabel>The Root Cause</RagaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-0.02em" }}>Hallucination vs. <span style={{ background: "linear-gradient(135deg,#F3C34E,#86A8CE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Retrieval Failure</span></h2>
            <p className="text-white/50" style={{ maxWidth: 640, lineHeight: 1.75 }}>Most &quot;LLM hallucinations&quot; in RAG systems are actually retrieval failures in disguise. The LLM is doing its job — it&apos;s faithfully working with the wrong context. Getting the diagnosis right determines where you fix it.</p>
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div className="raga-reveal raga-d1 rounded-2xl p-7" style={{ background: "rgba(239,68,68,.05)", border: "1px solid rgba(239,68,68,.2)" }}>
              <span className="inline-block uppercase font-bold mb-3" style={{ fontSize: ".68rem", letterSpacing: ".1em", padding: ".2rem .6rem", borderRadius: 999, background: "rgba(239,68,68,.15)", color: "#f87171" }}>Retrieval Failure</span>
              <h3 className="text-white font-bold mb-2" style={{ fontSize: "1.05rem" }}>Wrong chunks retrieved — LLM has nothing to work with</h3>
              <p className="text-white/50 mb-4" style={{ fontSize: ".88rem", lineHeight: 1.65 }}>The retrieved context doesn&apos;t contain the answer. The LLM either says &quot;I don&apos;t know&quot; (good) or — more often — confabulates a plausible answer from its parametric knowledge (bad). This <em style={{ color: "#f87171", fontStyle: "normal" }}>looks</em> like a hallucination but is actually a retrieval miss.</p>
              <DebugSteps color="#f87171" bg="rgba(239,68,68,.2)" steps={[
                "Log retrieved chunks — is the answer actually in them?",
                "Check retrieval metrics: Hit@3, MRR — are the right docs ranked?",
                "Fix: improve chunking, add reranker, tune embedding model",
                "Verify with a prompt that gives the correct chunk directly",
              ]} />
            </div>

            <div className="raga-reveal raga-d2 rounded-2xl p-7" style={{ background: "rgba(16,185,129,.05)", border: "1px solid rgba(16,185,129,.2)" }}>
              <span className="inline-block uppercase font-bold mb-3" style={{ fontSize: ".68rem", letterSpacing: ".1em", padding: ".2rem .6rem", borderRadius: 999, background: "rgba(16,185,129,.15)", color: "#34d399" }}>True LLM Failure</span>
              <h3 className="text-white font-bold mb-2" style={{ fontSize: "1.05rem" }}>Correct chunks retrieved — LLM ignores or distorts them</h3>
              <p className="text-white/50 mb-4" style={{ fontSize: ".88rem", lineHeight: 1.65 }}>The retrieved context <em style={{ color: "#34d399", fontStyle: "normal" }}>does</em> contain the answer, but the LLM fails to extract it correctly. This is a genuine generation failure — prompt design, context window position bias, or instruction-following issues.</p>
              <DebugSteps color="#34d399" bg="rgba(16,185,129,.2)" steps={[
                "Confirm the correct chunk is in retrieved context",
                "Measure faithfulness score against retrieved context",
                "Fix: improve system prompt, chunk ordering, context framing",
                "Consider a stronger/larger LLM or fine-tuned generation layer",
              ]} />
            </div>
          </div>

          <div className="raga-reveal rounded-2xl p-6 mt-8" style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}` }}>
            <div className="flex items-center gap-3 mb-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" fill="#fbbf24" opacity="0.85" /></svg>
              <span className="font-bold" style={{ fontSize: ".85rem", color: "#fbbf24" }}>Key Diagnostic Question</span>
            </div>
            <p className="text-white/55" style={{ fontSize: ".93rem", lineHeight: 1.7 }}>
              Before blaming the LLM: <strong className="text-white">inspect the retrieved chunks.</strong> If you paste the correct context directly into the prompt and the LLM answers correctly, you have a retrieval problem. If it still fails — you have a generation problem. These require completely different fixes. Debug in order: retrieval first, generation second.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — EVAL PIPELINE */}
      <section className="px-6 py-20" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,181,61,.08) 0%, transparent 55%), #101d3a" }}>
        <div className="max-w-5xl mx-auto">
          <div className="raga-reveal mb-10">
            <RagaLabel>Measure Everything</RagaLabel>
            <h2 className="text-white font-black mt-2 mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-0.02em" }}>What a Production RAG <span style={{ background: "linear-gradient(135deg,#F3C34E,#86A8CE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Eval Looks Like</span></h2>
            <p className="text-white/50" style={{ maxWidth: 640, lineHeight: 1.75 }}>A golden Q&amp;A dataset drives retrieval metrics. Generation metrics measure faithfulness independently. A combined eval pipeline runs in CI and gates every change.</p>
          </div>

          <div className="grid gap-8 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {/* Eval stack */}
            <div className="raga-reveal">
              <h3 className="text-white font-bold mb-3" style={{ fontSize: "1.1rem" }}>The Eval Stack</h3>
              <div className="flex flex-col gap-3">
                {EVAL_STACK.map((l) => (
                  <div key={l.layer} className="raga-card rounded-2xl" style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}`, padding: "1.25rem", transition: "border-color .3s, box-shadow .3s" }}>
                    <div className="uppercase font-bold mb-1.5" style={{ fontSize: ".72rem", letterSpacing: ".08em", color: l.color }}>{l.layer}</div>
                    <p className="text-white/50" style={{ fontSize: ".85rem", lineHeight: 1.6 }}>{l.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Eval terminal */}
            <div className="raga-reveal raga-d2">
              <div className="rounded-2xl overflow-hidden" style={{ background: "#071226", border: "1px solid rgba(232,181,61,.2)", boxShadow: "0 0 60px rgba(232,181,61,.08)" }}>
                <div className="flex items-center gap-3 px-5 py-3" style={{ background: "rgba(232,181,61,.06)", borderBottom: "1px solid rgba(232,181,61,.15)" }}>
                  <div className="flex gap-1.5">
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                  </div>
                  <div className="text-white/50" style={{ fontSize: ".75rem", fontFamily: "monospace", letterSpacing: ".04em" }}>rag_eval_report.py — run complete</div>
                </div>
                <div style={{ padding: "1.5rem", fontFamily: "monospace", fontSize: ".82rem", lineHeight: 1.9, overflowX: "auto" }}>
                  <div style={{ color: STEEL }}>## ─── RAG Eval Pipeline v2.3 ───</div>
                  <div style={{ color: STEEL }}>## Dataset: golden_queries_v4.json (214 items)</div>
                  <div style={{ color: STEEL }}>## Retriever: hybrid-bm25+dense + cross-encoder</div>
                  <div style={{ height: ".6rem" }} />
                  <div style={{ color: GOLD_LT }}>RETRIEVAL METRICS <span style={{ color: STEEL }}>─────────</span></div>
                  <hr style={{ border: "none", borderTop: "1px solid rgba(232,181,61,.12)", margin: ".5rem 0" }} />
                  {RETR_METRICS.map((m) => <MetricBar key={m.label} {...m} />)}
                  <div style={{ height: ".6rem" }} />
                  <div style={{ color: GOLD_LT }}>GENERATION METRICS <span style={{ color: STEEL }}>─────────</span></div>
                  <hr style={{ border: "none", borderTop: "1px solid rgba(232,181,61,.12)", margin: ".5rem 0" }} />
                  {GEN_METRICS.map((m) => <MetricBar key={m.label} {...m} />)}
                  <div style={{ height: ".6rem" }} />
                  <div style={{ color: STEEL }}>─────────────────────────────</div>
                  <div style={{ color: STEEL }}>Failures breakdown:</div>
                  <div style={{ color: STEEL }}>  retrieval_miss   : <span style={{ color: "#f87171" }}>31</span> (14.5%)  ← fix retrieval</div>
                  <div style={{ color: STEEL }}>  generation_error : <span style={{ color: "#f87171" }}> 8</span> ( 3.7%)  ← fix prompt</div>
                  <div style={{ color: STEEL }}>  correct          : <span style={{ color: "#34d399" }}>175</span> (81.8%)</div>
                  <div style={{ height: ".6rem" }} />
                  <div><span style={{ color: "#34d399" }}>✓ CI gate: PASSED</span> <span style={{ color: STEEL }}>— safe to merge</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden text-center px-6 py-24" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,181,61,.1) 0%, transparent 70%), #0a1628" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-[.82rem] font-bold uppercase tracking-widest mb-4" style={{ color: GOLD }}>The Bottom Line</p>
          <h2 className="text-white font-black mx-auto mb-4" style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)", maxWidth: 720, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            <span style={{ background: "linear-gradient(135deg,#F3C34E,#86A8CE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Better retrieval beats a bigger model</span> every time.
          </h2>
          <p className="text-white/50 mx-auto mb-8" style={{ maxWidth: 520 }}>You don&apos;t need GPT-5. You need the right chunks in the context window. Measure your retrieval. Fix what&apos;s broken. Ship with confidence.</p>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-10" style={{ opacity: 0.7 }}>
            {["Chunk Smarter", "Embed Better", "Rerank Always", "Filter by Metadata", "Measure Retrieval"].map((t, i, arr) => (
              <span key={t} className="flex items-center gap-4">
                <span className="uppercase font-semibold" style={{ fontSize: ".72rem", letterSpacing: ".1em", color: GOLD }}>{t}</span>
                {i < arr.length - 1 && <span className="text-white/30">·</span>}
              </span>
            ))}
          </div>

          <Link href="/contact" className="btn-primary">
            Build RAG That Actually Works
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <p className="text-white/40 mt-5" style={{ fontSize: ".82rem" }}>Retrieval-first AI, measured and monitored — not vibes.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function RagaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-bold uppercase" style={{ fontSize: ".72rem", letterSpacing: ".12em", color: GOLD }}>
      <span className="inline-block rounded" style={{ width: 20, height: 2, background: GOLD }} />
      {children}
    </span>
  );
}

function FailCard({ n, title, desc, delay, children }: { n: string; title: string; desc: string; delay: number; children: React.ReactNode }) {
  return (
    <div className={`raga-reveal raga-d${delay} raga-card rounded-2xl relative overflow-hidden`} style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}`, padding: "1.75rem", transition: "border-color .3s, box-shadow .3s" }}>
      <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: "linear-gradient(90deg,#E8B53D,#5E82AE)", opacity: 0.7 }} />
      <div className="uppercase font-bold mb-2" style={{ fontSize: ".7rem", letterSpacing: ".12em", color: GOLD }}>Failure Mode {n}</div>
      <div className="text-white font-bold mb-2" style={{ fontSize: "1.1rem" }}>{title}</div>
      <div className="text-white/50 mb-4" style={{ fontSize: ".88rem", lineHeight: 1.65 }}>{desc}</div>
      {children}
    </div>
  );
}

type CodePart = { c: string; t: string };
type CodeLine = { c?: string; t?: string; parts?: CodePart[]; pad?: boolean; top?: boolean };

function codeColor(c?: string) {
  switch (c) {
    case "bad": return "#f87171";
    case "good": return "#34d399";
    case "comment": return "#5E82AE";
    case "key": return "#86A8CE";
    case "val": return "#fbbf24";
    default: return "#e6edf7";
  }
}

function CodeBlock({ lines }: { lines: CodeLine[] }) {
  return (
    <div style={{ borderRadius: 8, background: "rgba(10,22,40,.7)", border: "1px solid rgba(255,255,255,.08)", padding: "0.75rem", fontFamily: "monospace", fontSize: ".76rem", overflow: "hidden" }}>
      {lines.map((ln, i) => (
        <div key={i} className="flex items-center gap-1" style={{ lineHeight: 1.8, paddingLeft: ln.pad ? "1rem" : 0, marginTop: ln.top ? 6 : 0, flexWrap: "wrap" }}>
          {ln.parts
            ? ln.parts.map((p, j) => <span key={j} style={{ color: codeColor(p.c) }}>{p.t}</span>)
            : <span style={{ color: codeColor(ln.c) }}>{ln.t}</span>}
        </div>
      ))}
    </div>
  );
}

function DebugSteps({ steps, color, bg }: { steps: string[]; color: string; bg: string }) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-start gap-2.5 text-white/50" style={{ fontSize: ".82rem" }}>
          <span className="flex items-center justify-center font-bold flex-shrink-0" style={{ minWidth: 20, height: 20, borderRadius: "50%", background: bg, color, fontSize: ".65rem", marginTop: ".1rem" }}>{i + 1}</span>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}

function MetricBar({ label, pct, val, note }: { label: string; pct: number; val: string; note: string }) {
  return (
    <div className="flex items-center gap-3" style={{ margin: ".2rem 0", flexWrap: "wrap" }}>
      <span style={{ color: STEEL_LT, minWidth: 140, fontSize: ".8rem" }}>{label}</span>
      <div style={{ flex: 1, height: 6, background: "rgba(232,181,61,.1)", borderRadius: 3, overflow: "hidden", maxWidth: 200 }}>
        <div className="raga-bar" style={{ height: "100%", borderRadius: 3, width: `${pct}%`, background: "linear-gradient(90deg,#E8B53D,#5E82AE)" }} />
      </div>
      <span style={{ color: GOLD_LT, fontWeight: 700, minWidth: 40, fontSize: ".8rem" }}>{val}</span>
      <span style={{ color: STEEL, fontSize: ".72rem" }}>{note}</span>
    </div>
  );
}
