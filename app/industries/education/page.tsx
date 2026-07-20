"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const FLOATING_SUBJECTS = [
  { emoji: "📐", top: "6%", left: "8%", color: "#86A8CE", delay: "0s", duration: "3.2s" },
  { emoji: "🔬", top: "10%", left: "78%", color: "#5E82AE", delay: "0.4s", duration: "3.6s" },
  { emoji: "🌍", top: "68%", left: "4%", color: "#E8B53D", delay: "0.8s", duration: "3.4s" },
  { emoji: "💡", top: "72%", left: "82%", color: "#E8B53D", delay: "1.1s", duration: "3s" },
  { emoji: "🎨", top: "38%", left: "86%", color: "#F3C34E", delay: "0.6s", duration: "3.8s" },
  { emoji: "📊", top: "42%", left: "2%", color: "#C99A2E", delay: "1.4s", duration: "3.3s" },
];

const SPARKLES = [
  { top: "16%", left: "34%", delay: "0s" },
  { top: "24%", left: "62%", delay: "0.7s" },
  { top: "60%", left: "28%", delay: "1.3s" },
  { top: "55%", left: "68%", delay: "0.4s" },
  { top: "8%", left: "50%", delay: "1s" },
];

function LearningVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto" style={{ height: 380 }}>
      <style>{`
        @keyframes eduFloat { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(-6deg); } }
        .edu-float { animation: eduFloat 3s ease-in-out infinite; }
        @keyframes eduTwinkle { 0%,100% { opacity: 0.15; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1.15); } }
        .edu-twinkle { animation: eduTwinkle 2.2s ease-in-out infinite; }
        @keyframes eduGlowPulse { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.08); } }
        .edu-glow { animation: eduGlowPulse 3.5s ease-in-out infinite; }
        @keyframes eduCapBob { 0%,100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-6px) rotate(4deg); } }
        .edu-cap { animation: eduCapBob 2.6s ease-in-out infinite; transform-origin: center; }
        @keyframes eduRayspin { to { transform: rotate(360deg); } }
        .edu-rays { animation: eduRayspin 24s linear infinite; transform-origin: center; }
      `}</style>

      {/* Warm glow backdrop */}
      <div className="edu-glow absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(232,181,61,0.18) 0%, rgba(243,195,78,0.1) 45%, transparent 70%)" }} />

      {/* Twinkling sparkles */}
      {SPARKLES.map((s, i) => (
        <span key={i} className="edu-twinkle absolute text-lg" style={{ top: s.top, left: s.left, animationDelay: s.delay }}>✨</span>
      ))}

      {/* Floating subject bubbles */}
      {FLOATING_SUBJECTS.map((s, i) => (
        <div key={i} className="edu-float absolute flex items-center justify-center rounded-2xl shadow-lg"
          style={{ top: s.top, left: s.left, width: 54, height: 54, background: `${s.color}22`, border: `2px solid ${s.color}55`, animationDelay: s.delay, animationDuration: s.duration, boxShadow: `0 8px 20px ${s.color}30` }}>
          <span style={{ fontSize: 24 }}>{s.emoji}</span>
        </div>
      ))}

      {/* Central open book + graduation cap */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="180" height="180" viewBox="0 0 200 200" className="relative">
          {/* Spinning soft rays */}
          <g className="edu-rays" opacity="0.15">
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={i} x="98" y="10" width="4" height="30" rx="2" fill="#E8B53D" transform={`rotate(${i * 45} 100 100)`} />
            ))}
          </g>

          {/* Book base */}
          <path d="M100 70 L30 88 V150 L100 134 Z" fill="#E8B53D" />
          <path d="M100 70 L170 88 V150 L100 134 Z" fill="#B0810E" />
          <path d="M100 70 L30 88 V96 L100 78 Z" fill="#5eead4" opacity="0.7" />
          <path d="M100 70 L170 88 V96 L100 78 Z" fill="#5eead4" opacity="0.5" />
          {/* Page lines */}
          {[100, 112, 124].map((y, i) => (
            <line key={i} x1="42" y1={y} x2="92" y2={y - 8} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          ))}
          {[100, 112, 124].map((y, i) => (
            <line key={i} x1="108" y1={y - 8} x2="158" y2={y} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          ))}

          {/* Graduation cap on top, bobbing */}
          <g className="edu-cap">
            <path d="M100 34 L146 54 L100 74 L54 54 Z" fill="#0f2447" />
            <path d="M100 74 L100 90 Q100 98 115 98 Q130 98 130 90 L130 62" fill="none" stroke="#0f2447" strokeWidth="4" strokeLinecap="round" />
            <circle cx="130" cy="62" r="4.5" fill="#E8B53D" />
            <line x1="130" y1="62" x2="130" y2="80" stroke="#E8B53D" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function EducationPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section
        className="pt-24 pb-20 px-6"
        style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 50%, #0f2447 100%)" }}
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#E8B53D] text-xs font-bold tracking-widest uppercase mb-4">Education</p>
            <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Learning Technology<br />
              <span style={{ color: "#E8B53D" }}>That Scales.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              We build EdTech platforms, LMS solutions, and student engagement tools that make learning more accessible, measurable, and effective.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["FERPA Compliant", "LTI Standards", "Mobile-First"].map((pill) => (
                <span key={pill} className="px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-white/20 bg-white/5">
                  {pill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="btn-primary">Start the Conversation</a>
              <a href="/services" className="btn-outline-white">View Services</a>
            </div>
          </div>

          <div className="hidden lg:block">
            <LearningVisual />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6" style={{ background: "#f8f9fa" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "2M+", label: "Students on Our Platforms" },
              { stat: "95%", label: "Student Retention Rate" },
              { stat: "3x", label: "Engagement vs. Legacy LMS" },
              { stat: "100+", label: "Educational Institutions" },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="font-black text-4xl text-[#1B3C6E] mb-2">{stat}</p>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="section-eyebrow">Solutions</p>
          <h2 className="font-black text-3xl text-[#0f2447] mb-4">Built for modern education</h2>
          <p className="text-gray-500 text-lg mb-12 max-w-2xl">
            Purpose-built EdTech solutions that meet students, educators, and administrators where they are, and take them further.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "LMS Development",
                desc: "Custom learning management systems built on open standards, featuring course authoring, progress tracking, and seamless third-party integrations.",
                color: "#86A8CE",
                path: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              },
              {
                title: "Student Engagement Platforms",
                desc: "Interactive discussion boards, peer collaboration tools, and gamified learning paths that keep students motivated and connected to their peers.",
                color: "#E8B53D",
                path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
              },
              {
                title: "Assessment & Testing Tools",
                desc: "Secure, adaptive assessment platforms with auto-grading, plagiarism detection, and proctoring integrations to ensure academic integrity at scale.",
                color: "#C99A2E",
                path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
              },
              {
                title: "Learning Analytics & Reporting",
                desc: "Real-time dashboards that surface at-risk students, course completion trends, and learning outcome metrics, enabling data-driven academic decisions.",
                color: "#5E82AE",
                path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
              {
                title: "Mobile Learning Apps",
                desc: "Native iOS and Android apps with offline content access, push notifications, and microlearning modules that fit into students' busy lives.",
                color: "#E8B53D",
                path: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
              },
              {
                title: "Administrative Automation",
                desc: "Automated enrollment workflows, scheduling tools, and reporting pipelines that reduce administrative burden and free staff to focus on students.",
                color: "#F3C34E",
                path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
              },
            ].map(({ title, desc, color, path }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: color + "15" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d={path} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0f172a] mb-2 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-20 px-6" style={{ background: "#0f2447" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-[#E8B53D] text-xs font-bold tracking-widest uppercase mb-4">Our Approach</p>
          <h2 className="font-black text-3xl text-white mb-12">How we deliver for education</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Curriculum & Tech Audit",
                desc: "We assess existing curricula, technology stack, and student journey to identify gaps, redundancies, and opportunities for meaningful improvement.",
              },
              {
                num: "02",
                title: "UX Design & Architecture",
                desc: "Student-centered UX design and scalable cloud architecture form the foundation, ensuring the platform is intuitive for learners of all ages and abilities.",
              },
              {
                num: "03",
                title: "Build & Integration",
                desc: "Iterative development with continuous educator feedback, plus integrations with SIS, SSO, and third-party tools your institution already relies on.",
              },
              {
                num: "04",
                title: "Rollout & Training",
                desc: "Phased rollout plans, live training sessions for faculty and staff, and ongoing support to ensure adoption is smooth and sustainable long-term.",
              },
            ].map(({ num, title, desc }) => (
              <div
                key={num}
                className="p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="font-black text-3xl text-[#E8B53D] mb-3">{num}</p>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6"
        style={{ background: "linear-gradient(135deg, #1B3C6E 0%, #E8B53D 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-black text-4xl text-white mb-4">Ready to transform your institution?</h2>
          <p className="text-white/70 text-lg mb-8">Let&apos;s build a learning platform your students and faculty will love.</p>
          <a href="/contact" className="btn-outline-white">Start the Conversation</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
