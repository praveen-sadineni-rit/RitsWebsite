"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * "Staff Augmentation Done Right" — a richly designed article, themed to the
 * RITS navy + gold palette. Rendered for the matching /insights slug.
 * All styles are scoped under `.sa` (unique class names / keyframes) so nothing
 * leaks into the rest of the site.
 */

const FAILS = [
  { n: "01", title: "No Defined Outcome", desc: "\"Senior React developer\" is a job title. \"Ship a redesigned checkout flow that cuts drop-off by Q3\" is an outcome. Only one gives engineers a north star." },
  { n: "02", title: "Mixed Operating Models", desc: "Embedded individuals, dedicated pods, and overflow capacity all require different structures. Mixing them mid-flight is where trust breaks down fast." },
  { n: "03", title: "Ambiguous Decision Rights", desc: "Not knowing who approves architecture calls, who reviews PRs, or who to escalate to when blocked is the single most common reason velocity stalls in week two." },
];

const CHIPS = [
  { icon: "🎯", label: "Measurable success from week 1" },
  { icon: "🧭", label: "Engineer has a north star" },
  { icon: "📊", label: "Engagement health visible early" },
  { icon: "🤝", label: "Aligned stakeholders" },
];

const DECISIONS = [
  { dot: "#E8B53D", role: "Architecture Calls", who: "Named tech lead — agreed before day one", when: "Every sprint, every new service boundary" },
  { dot: "#F3C34E", role: "PR Reviews", who: "Designated reviewer(s) with clear SLA", when: "Daily — blocked PRs kill momentum fast" },
  { dot: "#5E82AE", role: "Escalation Path", who: "One named person on client side", when: "When engineer is blocked 24+ hours" },
  { dot: "#B0810E", role: "Scope Changes", who: "Product owner — not the engineer", when: "Any time the outcome definition shifts" },
];

const WHO = [
  { role: "Architecture", title: "Who approves the big calls?", desc: "Document the tech lead by name before any code ships. Architecture ambiguity compounds fast and is expensive to unwind." },
  { role: "Code Review", title: "Who reviews the PRs?", desc: "A named reviewer with a clear turnaround SLA is the difference between a PR queue that flows and one that becomes a bottleneck by end of week one." },
  { role: "Escalation", title: "Who does the engineer call when blocked?", desc: "Engineers who hit blockers and have nowhere to escalate stop making progress. One named person on the client side removes this failure mode entirely." },
];

const TIMELINE = [
  { color: "#E8B53D", day: "Day 0 — Before They Arrive", title: "Accounts Provisioned", desc: "Every access credential, tool licence, and repo permission ready before day one. Starting without access is the fastest way to lose the first week.", tag: "🔑 Access first" },
  { color: "#C99A2E", day: "Days 1–3 — The Pair Phase", title: "Contextual Ramp", desc: "Pair them with someone who knows the codebase for the first few days. Context transfer is the highest-leverage investment in the first week.", tag: "👥 Pair programming" },
  { color: "#5E82AE", day: "Days 3–7 — First Win", title: "Ship Something Small", desc: "Pick a small, shippable task so they can prove the pipeline works end to end — CI passes, review happens, code merges, feature ships. Momentum compounds.", tag: "🚀 First merge" },
  { color: "#B0810E", day: "Day 10 — Health Check", title: "Early Engagement Review", desc: "A quick structured check — blockers surfaced, velocity baseline set, north star re-confirmed. Problems caught here cost a fraction of what they cost at week six.", tag: "✅ On track" },
];

const APPROACH = [
  { icon: "🏅", title: "Senior Only", desc: "We place only senior engineers — people who own problems, not just tickets. No juniors padded into a headcount number." },
  { icon: "📐", title: "Scope Around Outcomes", desc: "We scope every engagement around a measurable outcome and agree the operating model in writing before any placement goes out." },
  { icon: "📅", title: "First Sprint, Our Responsibility", desc: "We stay close through the first sprint. Productive in days, not months — that's the commitment, and we track it ourselves." },
];

export default function StaffAugArticle() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("sa-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".sa-reveal").forEach((el) => obs.observe(el));

    // stat counters
    const nums = [4, 10, 3, 1];
    const statWrap = document.querySelector(".sa-stats");
    if (statWrap) {
      const so = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document.querySelectorAll<HTMLElement>(".sa-stat-num").forEach((el, i) => {
              const target = nums[i]; let cur = 0; const inc = target / 40;
              const t = setInterval(() => { cur += inc; if (cur >= target) { cur = target; clearInterval(t); } el.textContent = String(Math.round(cur)); }, 24);
            });
            so.disconnect();
          }
        });
      }, { threshold: 0.5 });
      so.observe(statWrap);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <main className="sa min-h-screen flex flex-col bg-[#F8FAFC]">
      <style>{`
        @keyframes sa-fadeup { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        @keyframes sa-glow { 0%,100% { box-shadow:0 0 0 0 rgba(232,181,61,.35); } 50% { box-shadow:0 0 0 12px rgba(232,181,61,0); } }
        @keyframes sa-float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        .sa-reveal { opacity:0; transform:translateY(30px); transition:opacity .7s ease, transform .7s ease; }
        .sa-reveal.sa-visible { opacity:1; transform:translateY(0); }
        .sa-d1 { transition-delay:.1s; } .sa-d2 { transition-delay:.2s; } .sa-d3 { transition-delay:.3s; }
        .sa-dot-glow { animation: sa-glow 3s ease-in-out infinite; }
        .sa-float g { animation: sa-float 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .sa-reveal, .sa-dot-glow, .sa-float g { animation:none !important; transition:none !important; opacity:1 !important; transform:none !important; } }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden text-center px-6 pt-24 pb-20" style={{ background: "linear-gradient(135deg,#0f2447 0%,#1B3C6E 50%,#0f2447 100%)" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(232,181,61,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,181,61,.06) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 560, height: 560, background: "radial-gradient(circle, rgba(232,181,61,.12) 0%, transparent 70%)" }} />
        <div className="relative max-w-3xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All insights
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-7 text-sm font-semibold" style={{ background: "rgba(232,181,61,.12)", border: "1px solid rgba(232,181,61,.3)", color: "#E8B53D" }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#E8B53D" }} />
            The Resource IT Method
          </div>
          <h1 className="text-white font-black leading-[1.08]" style={{ fontSize: "clamp(2rem,5vw,3.6rem)", letterSpacing: "-0.02em" }}>
            Staff Augmentation<br /><span style={{ color: "#E8B53D" }}>Done Right.</span>
          </h1>
          <p className="text-white/60 mt-5 mx-auto" style={{ maxWidth: 600, fontSize: "1.1rem" }}>
            The engagements that fail rarely fail because of raw talent. They fail because nobody defined what &ldquo;done&rdquo; looks like.
          </p>
          <div className="sa-stats flex flex-wrap justify-center gap-x-12 gap-y-6 mt-12">
            {[["4", "Core Pillars"], ["10", "Day Ramp Plan"], ["3", "Operating Models"], ["1", "North Star Focus"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="sa-stat-num font-black leading-none" style={{ fontSize: "2.4rem", color: "#E8B53D" }}>{n}</div>
                <div className="text-white/50 mt-1" style={{ fontSize: ".85rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY FAIL */}
      <Section bg="#ffffff" label="The Root Cause" title={<>Why Engagements Fail<br />Before They Begin</>} lead="Most staff augmentation failures aren't talent problems. They're definition problems — no outcome, no ownership, no north star.">
        <div className="grid md:grid-cols-3 gap-5">
          {FAILS.map((f, i) => (
            <div key={f.n} className={`sa-reveal sa-d${i + 1} rounded-2xl bg-white p-7`} style={{ border: "1px solid #e2e8f0", borderTop: "4px solid #dc2626", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
              <div className="font-black leading-none mb-3" style={{ fontSize: "2.6rem", color: "#fca5a5" }}>{f.n}</div>
              <div className="font-extrabold text-[#0f2447] mb-2">{f.title}</div>
              <p className="text-[#64748b] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OUTCOME VS ROLE */}
      <Section bg="#F8FAFC" label="Pillar One" title={<>Define the Outcome,<br />Not Just the Role</>} lead="When you scope around outcomes, you can tell within weeks whether the engagement is working — and the engineer has a north star instead of a ticket queue.">
        <div className="sa-reveal grid lg:grid-cols-[1fr_auto_1fr] rounded-2xl overflow-hidden" style={{ boxShadow: "0 12px 48px rgba(0,0,0,.12)", border: "1px solid #e2e8f0" }}>
          <div className="p-9" style={{ background: "#fff5f5" }}>
            <span className="inline-flex items-center gap-1.5 text-[.72rem] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-5" style={{ background: "#fee2e2", color: "#dc2626" }}>❌ Job Title Thinking</span>
            <h3 className="font-extrabold text-xl mb-3" style={{ color: "#991b1b" }}>Role-Based Scoping</h3>
            <p className="text-[#64748b] text-[.95rem] leading-[1.8]">You receive resumes. Engineers start work. Three months in, nobody can measure whether it&apos;s going well. The engineer ships tickets but nobody&apos;s sure if the right tickets are getting shipped.</p>
            <div className="mt-5 rounded-lg px-5 py-4 text-[.92rem] italic" style={{ background: "#fee2e2", color: "#7f1d1d", borderLeft: "3px solid #ef4444" }}>&ldquo;We need a senior React developer with 5+ years of experience in TypeScript and Redux.&rdquo;</div>
          </div>
          <div className="flex items-center justify-center font-black text-white px-5 py-3 tracking-widest" style={{ background: "#0f2447" }}>VS</div>
          <div className="p-9" style={{ background: "#f0fdf4" }}>
            <span className="inline-flex items-center gap-1.5 text-[.72rem] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-5" style={{ background: "#dcfce7", color: "#16a34a" }}>✅ Outcome Thinking</span>
            <h3 className="font-extrabold text-xl mb-3" style={{ color: "#14532d" }}>Outcome-Based Scoping</h3>
            <p className="text-[#64748b] text-[.95rem] leading-[1.8]">Success is measurable from day one. The engineer knows exactly what winning looks like. You know within weeks if the engagement is on track. Everyone has the same north star.</p>
            <div className="mt-5 rounded-lg px-5 py-4 text-[.92rem] italic" style={{ background: "#dcfce7", color: "#14532d", borderLeft: "3px solid #22c55e" }}>&ldquo;We need to ship a redesigned checkout flow that cuts drop-off by 15% before the end of Q3.&rdquo;</div>
          </div>
        </div>
        <div className="sa-reveal flex flex-wrap gap-3 mt-10">
          {CHIPS.map((c) => (
            <div key={c.label} className="flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-[.92rem] font-semibold text-[#0f2447]" style={{ border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: "rgba(232,181,61,.16)" }}>{c.icon}</span>
              {c.label}
            </div>
          ))}
        </div>
      </Section>

      {/* OPERATING MODELS */}
      <Section bg="#ffffff" label="Pillar Two" title={<>Choose Your Operating<br />Model Before Day One</>} lead="There are really only three models — and mixing them mid-flight is where trust breaks down. Pick one, agree it in writing, and stick to it.">
        <div className="grid md:grid-cols-3 gap-6">
          <ModelCard accent="#E8B53D" icon="👤" name="Embedded Individual" best="Best for: Strong in-house leadership" desc="One or two engineers who join your standups, your repo, your rituals. They become part of your team in every meaningful way.">
            <svg viewBox="0 0 240 80" width="100%"><circle cx="40" cy="40" r="18" fill="rgba(232,181,61,.18)" stroke="#E8B53D" strokeWidth="2" /><text x="40" y="45" textAnchor="middle" fontSize="10" fill="#0f2447" fontWeight="700">You</text><circle cx="100" cy="40" r="18" fill="rgba(232,181,61,.18)" stroke="#E8B53D" strokeWidth="2" /><text x="100" y="45" textAnchor="middle" fontSize="10" fill="#0f2447" fontWeight="700">Team</text><circle cx="160" cy="40" r="18" fill="rgba(94,130,174,.18)" stroke="#5E82AE" strokeWidth="2" strokeDasharray="4 2" /><text x="160" y="45" textAnchor="middle" fontSize="9" fill="#3D5A80" fontWeight="700">Eng.</text><line x1="58" y1="40" x2="82" y2="40" stroke="#E8B53D" strokeWidth="2" /><line x1="118" y1="40" x2="142" y2="40" stroke="#5E82AE" strokeWidth="2" strokeDasharray="4 2" /><text x="192" y="35" fontSize="9" fill="#64748b">→ standups</text><text x="192" y="50" fontSize="9" fill="#64748b">→ same repo</text></svg>
          </ModelCard>
          <ModelCard accent="#5E82AE" icon="👥" name="Dedicated Pod" best="Best for: Hand off a whole surface area" desc="A small self-managing team with its own lead. You hand off a surface area, agree on delivery checkpoints, and the pod owns the rest.">
            <svg viewBox="0 0 240 80" width="100%"><rect x="120" y="10" width="100" height="60" rx="10" fill="rgba(94,130,174,.14)" stroke="#5E82AE" strokeWidth="2" /><circle cx="145" cy="30" r="10" fill="rgba(94,130,174,.3)" stroke="#3D5A80" strokeWidth="1.5" /><text x="145" y="34" textAnchor="middle" fontSize="8" fill="#3D5A80" fontWeight="700">Lead</text><circle cx="175" cy="50" r="8" fill="rgba(94,130,174,.3)" stroke="#3D5A80" strokeWidth="1.5" /><text x="175" y="54" textAnchor="middle" fontSize="7" fill="#3D5A80">Eng</text><circle cx="205" cy="50" r="8" fill="rgba(94,130,174,.3)" stroke="#3D5A80" strokeWidth="1.5" /><text x="205" y="54" textAnchor="middle" fontSize="7" fill="#3D5A80">Eng</text><line x1="145" y1="40" x2="175" y2="42" stroke="#3D5A80" strokeWidth="1.5" /><line x1="145" y1="40" x2="205" y2="42" stroke="#3D5A80" strokeWidth="1.5" /><circle cx="40" cy="40" r="18" fill="rgba(232,181,61,.18)" stroke="#E8B53D" strokeWidth="2" /><text x="40" y="45" textAnchor="middle" fontSize="9" fill="#0f2447" fontWeight="700">Client</text><line x1="58" y1="40" x2="112" y2="38" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 3" /><text x="78" y="30" fontSize="8" fill="#64748b">checkpoints</text></svg>
          </ModelCard>
          <ModelCard accent="#B0810E" icon="⚡" name="Overflow Capacity" best="Best for: Time-boxed push" desc="Extra hands for a defined push. There's a clear finish line, a fixed scope, and a defined exit. No ambiguity about when the work ends.">
            <svg viewBox="0 0 240 80" width="100%"><rect x="10" y="35" width="160" height="12" rx="6" fill="rgba(176,129,14,.15)" stroke="#B0810E" strokeWidth="1.5" /><rect x="10" y="35" width="100" height="12" rx="6" fill="#E8B53D" /><circle cx="175" cy="41" r="10" fill="#B0810E" /><text x="175" y="45" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">✓</text><text x="10" y="25" fontSize="9" fill="#B0810E" fontWeight="600">Start</text><text x="150" y="25" fontSize="9" fill="#B0810E" fontWeight="600">Finish</text><text x="10" y="62" fontSize="8" fill="#64748b">+2 engineers for defined push</text></svg>
          </ModelCard>
        </div>
      </Section>

      {/* DECISION MAKERS (navy) */}
      <section className="px-6 py-20" style={{ background: "#0f2447" }}>
        <div className="max-w-5xl mx-auto">
          <div className="sa-reveal mb-12">
            <SectionLabel dark>Pillar Three</SectionLabel>
            <h2 className="text-white font-extrabold mt-2 mb-3" style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}>Name the Decision-Makers</h2>
            <p className="text-white/60" style={{ maxWidth: 640 }}>Ambiguity about who owns what is the single most common reason velocity stalls in week two. Write it down before a single line of code ships.</p>
          </div>
          <div className="sa-reveal rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)" }}>
            <div className="hidden md:grid grid-cols-3" style={{ background: "rgba(232,181,61,.14)", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
              {["Decision Type", "Who Owns It", "When It Matters"].map((h) => (
                <div key={h} className="px-7 py-5 text-[.8rem] font-extrabold uppercase tracking-wider" style={{ color: "#E8B53D" }}>{h}</div>
              ))}
            </div>
            {DECISIONS.map((d) => (
              <div key={d.role} className="grid md:grid-cols-3" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <div className="px-7 py-5 flex items-center gap-3 text-white font-bold text-[.95rem]"><span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.dot }} />{d.role}</div>
                <div className="px-7 py-5 text-white/70 text-[.95rem] flex items-center">{d.who}</div>
                <div className="px-7 py-5 text-white/70 text-[.95rem] flex items-center">{d.when}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {WHO.map((w, i) => (
              <div key={w.role} className={`sa-reveal sa-d${i + 1} rounded-2xl p-8`} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>
                <div className="text-[.78rem] font-bold uppercase tracking-wider mb-3" style={{ color: "#E8B53D" }}>{w.role}</div>
                <div className="text-white font-extrabold mb-3">{w.title}</div>
                <p className="text-white/55 text-[.92rem] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIRST 10 DAYS */}
      <Section bg="#ffffff" label="Pillar Four" title={<>Plan the First 10 Days<br />Like an Onboarding</>} lead="The fastest engineers still need access, context, and a first win. A good first week pays for itself across the whole engagement.">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="sa-reveal relative pl-10">
            <div className="absolute top-2 bottom-2 rounded" style={{ left: 16, width: 3, background: "linear-gradient(to bottom,#E8B53D,#5E82AE,#B0810E)" }} />
            {TIMELINE.map((t) => (
              <div key={t.title} className="relative mb-8 flex gap-7 items-start">
                <span className="sa-dot-glow absolute rounded-full" style={{ left: -32, top: 4, width: 16, height: 16, background: t.color, border: "3px solid #fff" }} />
                <div className="flex-1 rounded-xl px-7 py-6" style={{ background: "#F8FAFC", border: "1px solid #e2e8f0" }}>
                  <div className="text-[.78rem] font-bold uppercase tracking-wider mb-1.5" style={{ color: t.color }}>{t.day}</div>
                  <div className="font-extrabold text-[#0f2447] mb-2">{t.title}</div>
                  <p className="text-[#64748b] text-[.92rem] leading-relaxed">{t.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[.78rem] font-semibold px-3 py-1 rounded-full mt-3" style={{ background: "rgba(232,181,61,.14)", color: "#B0810E" }}>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sa-reveal sa-d2">
            <div className="rounded-2xl bg-white p-8" style={{ border: "1px solid #e2e8f0", boxShadow: "0 12px 48px rgba(0,0,0,.12)" }}>
              <svg viewBox="0 0 380 460" width="100%" className="sa-float">
                <defs>
                  <linearGradient id="saFlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E8B53D" /><stop offset="100%" stopColor="#B0810E" /></linearGradient>
                  <marker id="saArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" /></marker>
                </defs>
                <line x1="190" y1="50" x2="190" y2="420" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 4" />
                <g transform="translate(190,70)"><circle r="34" fill="url(#saFlow)" /><text y="6" textAnchor="middle" fontSize="20">🎯</text></g>
                <rect x="10" y="46" width="130" height="50" rx="10" fill="#FBF4DD" stroke="#f0dca0" strokeWidth="1.5" /><text x="75" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#B0810E">Define Outcome</text><text x="75" y="84" textAnchor="middle" fontSize="9" fill="#64748b">Not the role</text><line x1="140" y1="71" x2="154" y2="71" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#saArrow)" />
                <g transform="translate(190,155)"><circle r="34" fill="#5E82AE" /><text y="6" textAnchor="middle" fontSize="20">🏗</text></g>
                <rect x="240" y="131" width="130" height="50" rx="10" fill="#EAF1F8" stroke="#c7d9f8" strokeWidth="1.5" /><text x="305" y="153" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3D5A80">Choose Model</text><text x="305" y="169" textAnchor="middle" fontSize="9" fill="#64748b">Embed / Pod / Overflow</text><line x1="226" y1="156" x2="240" y2="156" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#saArrow)" />
                <g transform="translate(190,240)"><circle r="34" fill="#B0810E" /><text y="6" textAnchor="middle" fontSize="20">📋</text></g>
                <rect x="10" y="216" width="130" height="50" rx="10" fill="#FBF4DD" stroke="#f0dca0" strokeWidth="1.5" /><text x="75" y="238" textAnchor="middle" fontSize="10" fontWeight="700" fill="#B0810E">Name Owners</text><text x="75" y="254" textAnchor="middle" fontSize="9" fill="#64748b">Arch · PR · Escalation</text><line x1="140" y1="241" x2="154" y2="241" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#saArrow)" />
                <g transform="translate(190,325)"><circle r="34" fill="#1B3C6E" /><text y="6" textAnchor="middle" fontSize="20">🚀</text></g>
                <rect x="240" y="301" width="130" height="50" rx="10" fill="#EAF1F8" stroke="#c7d9f8" strokeWidth="1.5" /><text x="305" y="323" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1B3C6E">Onboard Right</text><text x="305" y="339" textAnchor="middle" fontSize="9" fill="#64748b">10-day plan + first win</text><line x1="226" y1="326" x2="240" y2="326" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#saArrow)" />
                <rect x="80" y="395" width="220" height="46" rx="14" fill="url(#saFlow)" /><text x="190" y="413" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f2447">✓ Productive in Days</text><text x="190" y="432" textAnchor="middle" fontSize="9" fill="rgba(15,36,71,.7)">Not Weeks or Months</text><line x1="190" y1="361" x2="190" y2="393" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#saArrow)" />
              </svg>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden text-center px-6 py-24" style={{ background: "linear-gradient(135deg,#0f2447 0%,#1B3C6E 100%)" }}>
        <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 800, height: 400, background: "radial-gradient(ellipse, rgba(232,181,61,.18) 0%, transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-[#E8B53D] text-[.85rem] font-bold uppercase tracking-widest mb-5">How We Approach It</p>
          <h2 className="text-white font-black mx-auto mb-4" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", maxWidth: 700, lineHeight: 1.15 }}>Senior-Only Engineers.<br />Ramp-Up as a Deliverable.</h2>
          <p className="text-white/60 mx-auto mb-12" style={{ maxWidth: 520 }}>At Resource IT we place senior-only engineers and treat the ramp-up as part of the deliverable, not an afterthought.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
            {APPROACH.map((a) => (
              <div key={a.title} className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }}>
                <div className="text-3xl mb-4">{a.icon}</div>
                <div className="text-white font-extrabold mb-2">{a.title}</div>
                <p className="text-white/55 text-[.88rem] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/contact" className="btn-primary">
            Start a Scoping Conversation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* helpers */
function SectionLabel({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[.78rem] font-bold uppercase tracking-widest" style={{ color: dark ? "#E8B53D" : "#B0810E" }}>
      <span className="inline-block rounded" style={{ width: 20, height: 2, background: dark ? "#E8B53D" : "#B0810E" }} />
      {children}
    </span>
  );
}

function Section({ bg, label, title, lead, children }: { bg: string; label: string; title: React.ReactNode; lead: string; children: React.ReactNode }) {
  return (
    <section className="px-6 py-20" style={{ background: bg }}>
      <div className="max-w-5xl mx-auto">
        <div className="sa-reveal mb-12">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="text-[#0f2447] font-extrabold mt-2 mb-3" style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}>{title}</h2>
          <p className="text-[#64748b]" style={{ maxWidth: 640, fontSize: "1.1rem" }}>{lead}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function ModelCard({ accent, icon, name, best, desc, children }: { accent: string; icon: string; name: string; best: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="sa-reveal rounded-2xl bg-white p-8 relative overflow-hidden transition-transform hover:-translate-y-1.5" style={{ border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div className="absolute top-0 left-0 right-0" style={{ height: 4, background: accent }} />
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl" style={{ background: `${accent}22` }}>{icon}</div>
      <div className="font-extrabold text-lg text-[#0f2447] mb-2.5">{name}</div>
      <span className="inline-block text-[.72rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4" style={{ background: `${accent}1f`, color: accent }}>{best}</span>
      <p className="text-[#64748b] text-[.94rem] leading-relaxed">{desc}</p>
      <div className="mt-6 p-4 rounded-xl" style={{ background: "#F8FAFC" }}>{children}</div>
    </div>
  );
}
