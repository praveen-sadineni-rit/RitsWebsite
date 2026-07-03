"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function PipelineAnim() {
  const [step, setStep] = useState(0);
  const stages = [
    { label: "Code", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color: "#60a5fa" },
    { label: "Build", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", color: "#a78bfa" },
    { label: "Test", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", color: "#34d399" },
    { label: "Deploy", icon: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z", color: "#00A99D" },
    { label: "Monitor", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "#fb923c" },
  ];
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % (stages.length + 2)), 1000);
    return () => clearInterval(t);
  }, []);
  const active = step % (stages.length + 2);
  return (
    <div className="w-full max-w-xs">
      <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: "#161b22" }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 text-white/30 text-xs font-mono">CI/CD Pipeline</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00A99D] animate-pulse" />
            <span className="text-[#00A99D] text-[10px] font-mono">running</span>
          </div>
        </div>
        <div className="p-5 space-y-3">
          {stages.map((s, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 relative"
                  style={{ background: done || current ? `${s.color}20` : "rgba(255,255,255,0.04)", border: `1px solid ${done || current ? s.color : "rgba(255,255,255,0.06)"}`, boxShadow: current ? `0 0 12px ${s.color}50` : "none" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d={s.icon} stroke={done || current ? s.color : "rgba(255,255,255,0.2)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {current && <div className="absolute inset-0 rounded-lg animate-ping" style={{ background: `${s.color}15` }} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: done || current ? "white" : "rgba(255,255,255,0.25)" }}>{s.label}</span>
                    {done && (
                      <span className="text-[10px] font-mono" style={{ color: s.color }}>✓ passed</span>
                    )}
                    {current && (
                      <span className="text-[10px] font-mono text-white/40 animate-pulse">running...</span>
                    )}
                  </div>
                  <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: done ? "100%" : current ? "60%" : "0%", background: s.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-5 pb-4 text-[10px] font-mono text-white/20 flex justify-between">
          <span>branch: main</span>
          <span>triggered 2s ago</span>
        </div>
      </div>
    </div>
  );
}

const capabilities = [
  {
    title: "Cloud Architecture",
    desc: "Design scalable, cost-efficient cloud infrastructure on AWS, Azure, or GCP — purpose-built for your workload.",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    color: "#60a5fa",
  },
  {
    title: "CI/CD Pipelines",
    desc: "Automated build, test, and deployment pipelines. Ship code multiple times a day with confidence.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    color: "#a78bfa",
  },
  {
    title: "Kubernetes & Containers",
    desc: "Container orchestration with Kubernetes, Docker, and Helm. Zero-downtime deployments at any scale.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    color: "#34d399",
  },
  {
    title: "Infrastructure as Code",
    desc: "Terraform, Pulumi, and CloudFormation templates that version your infra alongside your application code.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    color: "#00A99D",
  },
  {
    title: "Site Reliability Engineering",
    desc: "SRE practices that keep your systems at 99.9%+ uptime. On-call runbooks, SLOs, and incident playbooks.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    color: "#fb923c",
  },
  {
    title: "Security & Compliance",
    desc: "DevSecOps baked into the pipeline. SOC 2, HIPAA, and PCI-ready architectures with automated security scanning.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    color: "#f472b6",
  },
];

const stack = [
  { category: "Cloud", items: ["AWS", "Azure", "GCP", "DigitalOcean"] },
  { category: "Containers", items: ["Docker", "Kubernetes", "Helm", "ECS"] },
  { category: "IaC", items: ["Terraform", "Pulumi", "CloudFormation", "Ansible"] },
  { category: "CI/CD", items: ["GitHub Actions", "GitLab CI", "Jenkins", "ArgoCD"] },
  { category: "Monitoring", items: ["Datadog", "Grafana", "Prometheus", "PagerDuty"] },
  { category: "Security", items: ["Vault", "Snyk", "SonarQube", "Trivy"] },
];

const outcomes = [
  { stat: "70%", label: "Avg reduction in deploy time" },
  { stat: "99.9%", label: "Uptime SLA delivered" },
  { stat: "40%", label: "Avg cloud cost savings" },
  { stat: "3x", label: "Faster release cycles" },
];

export default function CloudDevOpsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 60%, #0f2447 100%)" }} className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#00A99D] text-xs font-bold tracking-widest uppercase mb-4">Cloud & DevOps</p>
            <h1 className="text-white font-black leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Ship faster.<br />
              <span style={{ color: "#00A99D" }}>Break nothing.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              Modern cloud infrastructure and DevOps practices that let your team deploy with confidence — multiple times a day.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["AWS Certified", "Zero-Downtime Deploys", "IaC First"].map(t => (
                <span key={t} className="px-4 py-2 rounded-full text-xs font-bold border border-white/10 text-white/60">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="btn-primary">Get a Cloud Assessment</a>
              <a href="/services" className="btn-outline-white">All Services</a>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <PipelineAnim />
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-16 px-6" style={{ background: "#f8f9fa" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map(o => (
              <div key={o.stat} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="font-black text-4xl text-[#1B3C6E] mb-2">{o.stat}</p>
                <p className="text-gray-500 text-sm font-medium">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">What We Do</p>
            <h2 className="text-3xl font-black text-[#0f172a]">Full-stack cloud expertise</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">From architecture design to day-2 operations — we handle the full lifecycle.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(c => (
              <div key={c.title} className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${c.color}15` }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d={c.icon} stroke={c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0f172a] mb-2 text-lg">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-20 px-6" style={{ background: "#0f2447" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">Tech Stack</p>
            <h2 className="text-3xl font-black text-white">Tools we master</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stack.map(s => (
              <div key={s.category} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-[#00A99D] text-xs font-bold uppercase tracking-widest mb-4">{s.category}</p>
                <div className="flex flex-wrap gap-2">
                  {s.items.map(i => (
                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white/70" style={{ background: "rgba(255,255,255,0.06)" }}>{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">Our Process</p>
            <h2 className="text-3xl font-black text-[#0f172a]">From audit to autopilot</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Cloud Audit", desc: "We assess your current infrastructure, costs, and gaps against best practices." },
              { num: "02", title: "Architecture Design", desc: "We design a target-state architecture optimized for performance and cost." },
              { num: "03", title: "Migration & Setup", desc: "Phased migration with zero disruption to your running systems." },
              { num: "04", title: "Operate & Optimize", desc: "Ongoing SRE support, cost reviews, and continuous improvement." },
            ].map(s => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#00A99D]/10 text-[#00A99D] font-black text-sm flex items-center justify-center mx-auto mb-4">{s.num}</div>
                <h3 className="font-bold text-[#0f172a] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #00A99D 0%, #1B3C6E 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white font-black text-4xl mb-4">Ready to modernize your infrastructure?</h2>
          <p className="text-white/70 text-lg mb-8">Get a free cloud assessment and a clear roadmap — no strings attached.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-outline-white">Book a Free Assessment</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
