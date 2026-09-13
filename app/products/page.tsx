import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AtsIcloudWordmark, AtsIcloudTagline } from "@/components/AtsIcloudWordmark";

export const metadata: Metadata = {
  title: "Products | Resource Innovative Technologies",
  description:
    "Software built and operated by RITS: NOC Command, an AI-driven operations center, and AtsIcloud, the desktop ATS for US IT staffing.",
};

const PRODUCTS = [
  {
    name: "NOC Command",
    tag: "AI Operations Center",
    href: "/products/noc-command",
    accent: "#E8B53D",
    tagline: "Something is broken right now, and no one knows yet.",
    desc: "An always-on digital operations center that watches your whole technology estate, detects problems the moment they occur, and tells your engineers exactly what to do — before any customer notices.",
    points: ["7 AI agents correlate, classify and route alerts", "Role-based dashboards from CEO to on-call engineer", "Azure-native, SOC 2 audited, US data residency"],
    stats: [["Under 2 min", "time to detect"], ["~80%", "noise removed"], ["70%", "faster resolution"]],
    cta: "Explore NOC Command",
  },
  {
    name: "AtsIcloud",
    tag: "Desktop ATS · US IT Staffing",
    href: "/products/atsicloud",
    accent: "#86A8CE",
    tagline: "Fill the req. Bill the hours. Get paid.",
    desc: "The desktop ATS built for US IT staffing: requisitions, pipeline, placements, timesheets, invoicing and compliance in one app — with AI that does the paperwork.",
    points: ["Pipeline board with a stuck detector, plus a Chrome extension", "Placement-to-paid: margin, invoices, A/R aging, QuickBooks sync", "I-9, E-Verify and immigration tracking per consultant"],
    stats: [["14", "modules"], ["16", "reports"], ["12", "integrations"]],
    cta: "Explore AtsIcloud",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2447 45%, #1B3C6E 100%)" }} className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-[#E8B53D] text-xs font-bold tracking-widest uppercase mb-4">Products</p>
          <h1 className="text-white font-black leading-tight mb-5" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", letterSpacing: "-0.02em" }}>
            Software we build<br /><span style={{ color: "#E8B53D" }}>and run ourselves.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Two products born from the work we do every day — keeping systems healthy, and keeping staffing firms moving from requisition to cash.
          </p>
        </div>
      </section>

      {/* PRODUCT CARDS */}
      <section className="py-20 px-6 flex-1" style={{ background: "#f8f9fa" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
              <div className="p-8 md:p-10 flex-1">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5" style={{ background: `${p.accent}18`, color: p.accent === "#E8B53D" ? "#B0810E" : "#3D5A80" }}>{p.tag}</span>
                <h2 className="text-3xl font-black text-[#0f2447] mb-1" style={{ letterSpacing: "-0.02em" }}>
                  {p.name === "AtsIcloud" ? <AtsIcloudWordmark /> : p.name}
                </h2>
                {p.name === "AtsIcloud" && (
                  <div className="mb-3"><AtsIcloudTagline /></div>
                )}
                <p className="text-gray-500 italic mb-4">&ldquo;{p.tagline}&rdquo;</p>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-6">{p.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm text-gray-700">
                      <span className="mt-1 flex-shrink-0" style={{ color: p.accent }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 gap-3">
                  {p.stats.map(([v, l]) => (
                    <div key={l} className="rounded-xl p-3 text-center" style={{ background: "#f8f9fa", border: "1px solid #E6EDF7" }}>
                      <p className="font-black text-[#1B3C6E] text-lg leading-none mb-1">{v}</p>
                      <p className="text-[11px] text-gray-500">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 md:px-10 py-5 border-t border-gray-100 flex items-center justify-between">
                <Link href={p.href} className="btn-primary">
                  {p.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #E8B53D 0%, #1B3C6E 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white font-black text-3xl md:text-4xl mb-3">Want a walkthrough?</h2>
          <p className="text-white/70 text-lg mb-7">Book a live demo of either product, or talk to us about running them for your team.</p>
          <Link href="/contact" className="btn-outline-white">Talk to an Expert</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
