"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AtsIcloudWordmark, AtsIcloudTagline } from "@/components/AtsIcloudWordmark";
import { useState, useEffect, useRef } from "react";

const SITE = "https://www.atsicloud.com/";

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function useReveal() {
  const refs = useRef<(HTMLElement | null)[]>([]);
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
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (el: HTMLElement | null, i: number) => { refs.current[i] = el; };
}

/* ── Animated pipeline board: a candidate advances Submitted → Offer ── */
const STAGES = ["Submitted", "Screening", "Interview", "Offer"];
const BOARD: { name: string; role: string; stage: number; note?: string; stuck?: boolean }[] = [
  { name: "PN", role: "Data Engineer", stage: 0, note: "1d" },
  { name: "MB", role: "Data Engineer", stage: 0, note: "2d" },
  { name: "DS", role: "Data Engineer", stage: 1, note: "3d" },
  { name: "LF", role: "Data Engineer", stage: 1, note: "stuck 6d", stuck: true },
  { name: "TO", role: "Data Engineer", stage: 2, note: "Thu 2pm" },
  { name: "RM", role: "Data Engineer", stage: 3, note: "$92/hr" },
];

function PipelineBoard() {
  const [moverStage, setMoverStage] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setMoverStage((s) => (s + 1) % STAGES.length), 1800);
    return () => clearInterval(t);
  }, []);
  const mover = { name: "AR", role: "Platform Eng", note: moverStage === 3 ? "$88/hr" : `${moverStage + 1}d` };

  return (
    <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: "#F3C34E", animation: "pulse 1.5s ease-in-out infinite" }} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Pipeline · RITS-September-1003</span>
        </div>
        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(232,181,61,0.15)", color: "#F3C34E" }}>Stuck detector on</span>
      </div>
      <div className="grid grid-cols-4 gap-2 p-3">
        {STAGES.map((stage, si) => {
          const cards = BOARD.filter((c) => c.stage === si);
          const hasMover = moverStage === si;
          return (
            <div key={stage} className="rounded-xl p-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", minHeight: 150 }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold text-white/50 truncate">{stage}</span>
                <span className="text-[9px] font-bold text-white/30">{cards.length + (hasMover ? 1 : 0)}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {cards.map((c) => (
                  <div key={c.name} className="rounded-lg px-1.5 py-1.5" style={{ background: c.stuck ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${c.stuck ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.08)"}` }}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black flex-shrink-0" style={{ background: "rgba(94,130,174,0.3)", color: "#86A8CE" }}>{c.name}</span>
                      <span className="text-[8.5px] text-white/60 truncate">{c.role}</span>
                    </div>
                    <div className="text-[8px] mt-1 font-semibold" style={{ color: c.stuck ? "#f87171" : "rgba(255,255,255,0.35)" }}>{c.note}</div>
                  </div>
                ))}
                {hasMover && (
                  <div className="rounded-lg px-1.5 py-1.5 transition-all duration-500" style={{ background: "rgba(232,181,61,0.14)", border: "1px solid rgba(232,181,61,0.5)", boxShadow: "0 0 14px rgba(232,181,61,0.25)" }}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black flex-shrink-0" style={{ background: "rgba(232,181,61,0.3)", color: "#F3C34E" }}>{mover.name}</span>
                      <span className="text-[8.5px] text-white/80 truncate">{mover.role}</span>
                    </div>
                    <div className="text-[8px] mt-1 font-semibold" style={{ color: "#F3C34E" }}>{mover.note}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2.5 text-[9.5px] font-mono text-white/25 flex justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span>posted: LinkedIn · Dice</span>
        <span>1 stuck · 1 offer</span>
      </div>
    </div>
  );
}

const WHAT_IT_IS = [
  { title: "Req to cash, one system", desc: "Requisitions, pipeline, placements, timesheets, invoicing and compliance in a single desktop app — no spreadsheet glue between them.", color: "#F3C34E", icon: <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/> },
  { title: "Built for US IT staffing", desc: "Bill and pay rates, vendor submissions, I-9 and E-Verify, H-1B dates and QuickBooks sync — the parts of the job generic ATSs leave out.", color: "#86A8CE", icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></> },
  { title: "AI that does the paperwork", desc: "It reads JD emails and drafts the requisition, screens candidates with reasoning attached, writes the outreach, and summarises your reports. Bring your own keys.", color: "#C99A2E", icon: <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
];

const MODULES = [
  { eyebrow: "Recruiting", title: "From JD to shortlist in one afternoon.", color: "#F3C34E", points: ["Open the req without typing it twice — a four-step wizard that checks the rate band before publishing", "Source with a string you keep — Search Sets hold the boolean per requisition", "See who is stuck — the pipeline board flags candidates that have not moved"] },
  { eyebrow: "Chrome Extension", title: "Works where your recruiters already are.", color: "#86A8CE", points: ["Send a JD from Gmail straight through AI intake into a draft requisition", "Save a LinkedIn or Dice profile in one click, and see if you already hold them", "Send a requirement to your vendor list from the side panel"] },
  { eyebrow: "Delivery & Finance", title: "Placement to paid, without the spreadsheet.", color: "#C99A2E", points: ["Bill rate, pay rate and margin sit on the placement from day one", "Hours roll up through approvals into one-click invoices", "A/R aging and DSO are live; QuickBooks stays in sync"] },
  { eyebrow: "Compliance & Immigration", title: "Nobody starts without their paperwork.", color: "#5E82AE", points: ["eBoarding sends the onboarding packet and chases what is missing", "I-9, W-4, E-Verify and document expiries surface early, per consultant and client", "Visa status and key dates carry a risk badge on the employee record"] },
  { eyebrow: "AI Recruiter", title: "An AI recruiter on every desk.", color: "#E8B53D", points: ["The requisition drafts itself from the JD email — you review instead of type", "Screening you can check — scores come with the reasoning attached", "Reports open with key takeaways written from the numbers underneath"] },
  { eyebrow: "Reports", title: "Sixteen reports your Monday meeting actually needs.", color: "#86A8CE", points: ["Executive overview: reqs, submissions, interviews, placements and cash on one KPI strip", "Recruiter performance and pipeline conversion by period, recruiter and client", "Billing vs collected with aging — exported to Excel and PDF the way finance wants"] },
];

const EXTRAS = [
  { title: "Email designs", desc: "76 templates ready to send, styled to your brand." },
  { title: "Sequences & WhatsApp", desc: "Multi-step outreach that stops when someone replies." },
  { title: "eSignature", desc: "Send, track and countersign without leaving the record." },
  { title: "Careers site", desc: "A hosted careers page and apply flow wired to your open jobs." },
  { title: "Team chat", desc: "Talk about a record next to the record, not in another app." },
  { title: "Deep links", desc: "Link straight into any job, candidate or placement." },
  { title: "MCP server", desc: "Let Claude and other agents work your data directly." },
  { title: "Local-first data", desc: "SQLite on the desktop, synced to the cloud when you are online." },
];

const INTEGRATIONS = ["LinkedIn", "Dice", "Gmail", "Outlook", "Indeed", "Monster", "DocuSign", "QuickBooks", "WhatsApp", "Supabase", "Claude"];

const DIFFERENTIATION = [
  { old: "Retype the JD from the client's email", ats: "AI intake drafts the requisition from the email" },
  { old: "Boolean strings lost in a notes doc", ats: "Search Sets saved per requisition, one click away" },
  { old: "Margin lives in someone's head", ats: "Bill rate, pay rate and margin on the placement record" },
  { old: "Hours → export → re-key into invoices", ats: "Hours roll straight into one-click invoices" },
  { old: "Compliance gaps found at audit time", ats: "Expiries and immigration risk surface weeks early" },
  { old: "Reports assembled in Excel on Sunday night", ats: "16 management reports, Excel and PDF, filtered live" },
];

const TRUST = [
  { title: "Local-first, cloud-synced", desc: "Your data lives in SQLite on the desktop and syncs to the cloud when you are online — fast, and yours.", icon: <><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></> },
  { title: "Bring your own AI keys", desc: "AI features run on keys you control. No model is trained on your candidates or clients.", icon: <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
  { title: "Compliance per consultant and client", desc: "I-9, W-4, E-Verify, background checks and visa dates tracked on the record with expiry colours and risk badges.", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
  { title: "Finance stays in sync", desc: "Invoices, A/R aging and DSO tie back to QuickBooks so the revenue conversation uses one set of numbers.", icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
];

const NEXT_STEPS = [
  { num: "01", title: "Book a 20-minute demo", desc: "No slides. Bring a JD and a vendor list and we set them up live, so you see your own reqs in it.", color: "#F3C34E" },
  { num: "02", title: "Watch it work (2 min)", desc: "A short walkthrough of the pipeline board, Chrome extension, invoicing and the AI recruiter.", color: "#86A8CE" },
  { num: "03", title: "Talk to RITS", desc: "Rolling it out across a team, or pairing it with our staffing services? Let's map it together.", color: "#C99A2E" },
];

export default function AtsIcloudPage() {
  const addReveal = useReveal();

  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <section style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2447 45%, #1B3C6E 100%)", position: "relative", overflow: "hidden" }} className="py-24 md:py-32">
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-100px", width: "460px", height: "460px", background: "radial-gradient(circle, rgba(232,181,61,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(232,181,61,0.1)", border: "1px solid rgba(232,181,61,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F3C34E" }} />
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#F3C34E" }}>RITS Product · Desktop ATS</span>
                </div>
                <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "0.6rem" }}>
                  <AtsIcloudWordmark accent="#F3C34E" />
                </h1>
                <div style={{ marginBottom: "1.25rem" }}><AtsIcloudTagline color="#F3C34E" /></div>
                <p style={{ fontSize: "1.2rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", marginBottom: "1rem", fontStyle: "italic" }}>
                  Fill the req. Bill the hours. Get paid.
                </p>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "56ch", marginBottom: "2.5rem" }}>
                  The desktop ATS built for US IT staffing: requisitions, pipeline, placements, timesheets, invoicing and compliance in one app — with AI that does the paperwork.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "2.5rem" }}>
                  {[
                    { value: "14", label: "modules" },
                    { value: "76", label: "email templates" },
                    { value: "16", label: "management reports" },
                    { value: "12", label: "integrations" },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 18px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "6px" }}>
                      <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#F3C34E" }}>{s.value}</span>
                      <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <a href={SITE} target="_blank" rel="noopener noreferrer" className="btn-primary">Book a 20-minute demo <IconArrow /></a>
                  <a href="#modules" className="btn-outline-white">See what&apos;s inside</a>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <PipelineBoard />
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IT IS */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 0)} className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
              <p className="section-eyebrow">Meet AtsIcloud</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
                The staffing OS for US IT firms.
              </h2>
              <p style={{ color: "#495057", fontSize: "1.05rem", maxWidth: "68ch", margin: "0 auto", lineHeight: 1.8 }}>
                Every requisition, every consultant, every invoice — in one desktop app your team already knows how to use.
              </p>
            </div>
            <div ref={(el) => addReveal(el, 1)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {WHAT_IT_IS.map((item) => (
                <div key={item.title} style={{ background: "#f8f9fa", border: "1px solid #E6EDF7", borderRadius: "16px", padding: "32px" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${item.color}15`, border: `1px solid ${item.color}35`, color: item.color }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{item.icon}</svg>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0f2447", marginBottom: "10px" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#6c757d", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MODULES */}
        <section id="modules" style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)", padding: "96px 0" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 2)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow" style={{ color: "#F3C34E" }}>What&apos;s inside</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                Six modules that cover the whole day job.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 3)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {MODULES.map((m) => (
                <div key={m.eyebrow} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.color }}>{m.eyebrow}</span>
                  <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "white", margin: "8px 0 14px", lineHeight: 1.3 }}>{m.title}</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "9px", margin: 0, padding: 0, listStyle: "none" }}>
                    {m.points.map((p) => (
                      <li key={p} style={{ display: "flex", gap: "10px", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>
                        <span style={{ flexShrink: 0, marginTop: 5, width: 6, height: 6, borderRadius: "50%", background: m.color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVERYTHING AROUND IT + INTEGRATIONS */}
        <section style={{ background: "#f8f9fa", padding: "96px 0" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 4)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow">And everything around it</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em" }}>
                The rest of the day job, built in.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 5)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "16px", marginBottom: "56px" }}>
              {EXTRAS.map((e, i) => (
                <div key={e.title} style={{ background: "#ffffff", border: "1px solid #E6EDF7", borderRadius: "14px", padding: "22px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#E8B53D" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "0.98rem", color: "#0f2447", margin: "6px 0 6px" }}>{e.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#6c757d", lineHeight: 1.6, margin: 0 }}>{e.desc}</p>
                </div>
              ))}
            </div>

            <div ref={(el) => addReveal(el, 6)} className="reveal" style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "16px" }}>Integrates with</p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
                {INTEGRATIONS.map((n) => (
                  <span key={n} style={{ padding: "8px 16px", borderRadius: "999px", background: "#ffffff", border: "1px solid #E6EDF7", fontSize: "0.85rem", fontWeight: 600, color: "#0f2447" }}>{n}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DIFFERENTIATION */}
        <section style={{ background: "#0f2447", padding: "96px 0" }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 7)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow" style={{ color: "#F3C34E" }}>Why it&apos;s different</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                The spreadsheet retires.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 8)} className="reveal" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {DIFFERENTIATION.map((row) => (
                <div key={row.old} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#f87171" strokeWidth="2.75" strokeLinecap="round"/></svg>
                    </span>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", margin: 0 }}>{row.old}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", borderRadius: "12px", background: "rgba(232,181,61,0.08)", border: "1px solid rgba(232,181,61,0.3)" }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "rgba(232,181,61,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#F3C34E" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <p style={{ fontSize: "0.88rem", color: "white", fontWeight: 700, margin: 0 }}>{row.ats}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 9)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow">Your data, your rules</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em" }}>
                Built for a staffing firm&apos;s reality.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 10)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {TRUST.map((s) => (
                <div key={s.title} style={{ background: "#f8f9fa", border: "1px solid #E6EDF7", borderRadius: "14px", padding: "24px" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(232,181,61,0.1)", color: "#E8B53D" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{s.icon}</svg>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "0.98rem", color: "#0f2447", marginBottom: "8px" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#6c757d", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEXT STEP / CTA */}
        <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #0f2447 60%, #1B3C6E 100%)", padding: "96px 0", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(232,181,61,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
            <div ref={(el) => addReveal(el, 11)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow" style={{ color: "#F3C34E" }}>Twenty minutes, no slides</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "1rem", lineHeight: 1.2 }}>
                See your own reqs in it.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>Bring a JD and a vendor list to the demo. We set them up live.</p>
            </div>

            <div ref={(el) => addReveal(el, 12)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "48px" }}>
              {NEXT_STEPS.map((n) => (
                <div key={n.num} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "28px" }}>
                  <span style={{ fontSize: "1.5rem", fontWeight: 900, color: n.color }}>{n.num}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "white", margin: "10px 0" }}>{n.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{n.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={SITE} target="_blank" rel="noopener noreferrer" className="btn-primary">Book a 20-minute demo <IconArrow /></a>
              <a href="/contact" className="btn-outline-white">Talk to RITS</a>
            </div>
            <p style={{ textAlign: "center", marginTop: "18px", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
              Demos are booked at <a href={SITE} target="_blank" rel="noopener noreferrer" style={{ color: "#F3C34E" }}>atsicloud.com</a>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
