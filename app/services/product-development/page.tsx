"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const lifecycleSteps = ["Idea", "Discovery", "Design", "Build", "Launch", "Grow"];

const capabilities = [
  {
    title: "Product Discovery",
    description: "User research, problem definition, and roadmapping to validate your idea before a single line of code is written.",
  },
  {
    title: "UX/UI Design",
    description: "Wireframes, interactive prototypes, and scalable design systems that put user experience at the center.",
  },
  {
    title: "Frontend Development",
    description: "Pixel-perfect, performant interfaces built with modern frameworks that delight users on every device.",
  },
  {
    title: "Backend & APIs",
    description: "Scalable, secure architecture and APIs that power your product as you grow from day one to day one thousand.",
  },
  {
    title: "Quality Assurance",
    description: "Automated and manual testing pipelines that catch issues early and keep your product stable at every release.",
  },
  {
    title: "Launch & Growth",
    description: "Deployment, monitoring, analytics, and the iteration loops that turn a launched product into a great one.",
  },
];

const differentiators = [
  {
    icon: "🧠",
    headline: "We think like founders",
    detail: "We care about product-market fit, not just shipping specs. Your success metrics are ours.",
  },
  {
    icon: "🎨",
    headline: "Design-first, always",
    detail: "UX drives every technical decision. Good design is not a phase, it runs through the entire build.",
  },
  {
    icon: "⚡",
    headline: "Ship in weeks, not quarters",
    detail: "Lean delivery with real milestones. You see working software early and often.",
  },
  {
    icon: "🤝",
    headline: "We stay post-launch",
    detail: "90 days of support included after go-live. We are with you through the messy, real-world feedback loop.",
  },
];

const productTypes = [
  "SaaS Platforms",
  "Mobile Apps",
  "Internal Tools",
  "Marketplaces",
  "B2B Portals",
  "Developer Tools",
  "AI Products",
];

const caseStudies = [
  {
    tag: "FinTech",
    headline: "0 to MVP in 8 weeks. Series A funded.",
    detail:
      "We embedded with a fintech founding team to take their payments concept from whiteboard to live product, end to end, on schedule.",
  },
  {
    tag: "Healthcare SaaS",
    headline: "40% reduction in admin time.",
    detail:
      "A complete redesign and rebuild of a healthcare portal cut manual workflow time nearly in half for clinical staff across 12 sites.",
  },
];

function ProductFlow() {
  const [active, setActive] = useState(0);
  const stages = [
    { label: "Idea", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", color:"#f472b6", bg:"#fdf2f8" },
    { label: "Discover", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", color:"#60a5fa", bg:"#eff6ff" },
    { label: "Design", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", color:"#a78bfa", bg:"#f5f3ff" },
    { label: "Build", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color:"#00A99D", bg:"#f0fdfb" },
    { label: "Launch", icon: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z", color:"#34d399", bg:"#f0fdf4" },
    { label: "Grow", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", color:"#fb923c", bg:"#fff7ed" },
  ];
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a+1) % stages.length), 1400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full max-w-sm">
      {/* Main active stage */}
      <div className="rounded-2xl p-8 mb-6 text-center transition-all duration-700 shadow-lg"
        style={{ background: stages[active].bg, border: `2px solid ${stages[active].color}30` }}>
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-500"
          style={{ background: `${stages[active].color}20`, boxShadow: `0 0 30px ${stages[active].color}40` }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d={stages[active].icon} stroke={stages[active].color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="font-black text-2xl transition-all duration-500" style={{ color: stages[active].color }}>
          {stages[active].label}
        </p>
      </div>
      {/* Mini dots */}
      <div className="flex items-center justify-center gap-2">
        {stages.map((s,i) => (
          <button key={s.label} onClick={() => setActive(i)}
            className="transition-all duration-300 rounded-full"
            style={{ width: i===active?32:8, height:8, background: i===active ? s.color : `${s.color}30` }}
          />
        ))}
      </div>
      <p className="text-center text-gray-400 text-xs mt-3 font-medium tracking-widest uppercase">
        {active+1} of {stages.length} stages
      </p>
    </div>
  );
}

export default function ProductDevelopmentPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-gray-950 pt-28 pb-24 px-6 overflow-hidden">
        {/* Teal glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #14b8a6 0%, transparent 70%)" }}
        />

        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="text-center lg:text-left">
            <span className="inline-block mb-4 text-sm font-semibold tracking-widest text-teal-400 uppercase">
              Product Development
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-6">
              From idea to market-ready product.{" "}
              <span className="text-teal-400">Without the chaos.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-14">
              Full-cycle product engineering, discovery, design, development, launch, and the
              iteration that makes it great.
            </p>

            {/* Lifecycle bar */}
            <div className="flex flex-nowrap items-center justify-center lg:justify-start gap-0 overflow-x-auto">
              {lifecycleSteps.map((step, idx) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500 flex items-center justify-center text-xs font-bold text-teal-300">
                      {idx + 1}
                    </div>
                    <span className="mt-2 text-xs text-gray-400 font-medium">{step}</span>
                  </div>
                  {idx < lifecycleSteps.length - 1 && (
                    <div className="w-8 sm:w-12 h-px bg-teal-800 mx-1 mb-5" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — animated ProductFlow */}
          <div className="hidden lg:flex items-center justify-center">
            <ProductFlow />
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Everything your product needs
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              One team. Every capability. No handoff gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-7 hover:border-teal-500 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{cap.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              What makes us different
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {differentiators.map((d) => (
              <div
                key={d.headline}
                className="flex gap-5 items-start bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-teal-600 transition-colors duration-200"
              >
                <span className="text-3xl flex-shrink-0">{d.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{d.headline}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{d.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT TYPES WE BUILD */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Product types we build
            </h2>
            <p className="text-gray-400 text-lg">
              We have shipped across industries and product categories.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {productTypes.map((type) => (
              <div
                key={type}
                className="px-6 py-3 rounded-full border border-teal-700 bg-teal-900/20 text-teal-300 font-semibold text-sm hover:bg-teal-700/30 transition-colors duration-200 cursor-default"
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY TEASER */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Real products. Real results.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <div
                key={cs.tag}
                className="relative rounded-2xl overflow-hidden p-8 flex flex-col justify-between min-h-[220px]"
                style={{
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #134e4a 60%, #0f2027 100%)",
                  border: "1px solid rgba(20,184,166,0.25)",
                }}
              >
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-teal-400 mb-4 bg-teal-900/40 px-3 py-1 rounded-full">
                    {cs.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3 leading-snug">
                    {cs.headline}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{cs.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Tell us about your product idea.
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Whether you have a napkin sketch or a detailed spec, we will help you figure out
            the best path to market.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold text-base px-10 py-4 rounded-xl transition-colors duration-200"
          >
            Start the conversation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
