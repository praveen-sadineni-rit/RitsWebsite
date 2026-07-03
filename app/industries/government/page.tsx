"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GovPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section
        className="pt-24 pb-20 px-6"
        style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 50%, #0f2447 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[#00A99D] text-xs font-bold tracking-widest uppercase mb-4">Government</p>
          <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            Digital Government.<br />
            <span style={{ color: "#00A99D" }}>Real Results.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
            We build secure, scalable civic technology, modernizing government services, citizen portals, and data infrastructure.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {["FedRAMP Aligned", "ADA Compliant", "SOC 2 Ready"].map((pill) => (
              <span key={pill} className="px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-white/20 bg-white/5">
                {pill}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/contact" className="btn-primary">Schedule a Discovery Call</a>
            <a href="/services" className="btn-outline-white">View Services</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6" style={{ background: "#f8f9fa" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "10M+", label: "Citizens Served Through Our Platforms" },
              { stat: "99.9%", label: "System Availability SLA" },
              { stat: "70%", label: "Reduction in Processing Time" },
              { stat: "40+", label: "Government Agencies Served" },
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
          <h2 className="font-black text-3xl text-[#0f2447] mb-4">Built for the public sector</h2>
          <p className="text-gray-500 text-lg mb-12 max-w-2xl">
            End-to-end digital solutions designed to meet the rigorous demands of government, from security and compliance to usability and scale.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Citizen Self-Service Portals",
                desc: "Intuitive web and mobile portals that let citizens access government services 24/7, reducing call center volume and wait times.",
                color: "#60a5fa",
                path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
              },
              {
                title: "Case Management Systems",
                desc: "Configurable workflows that track citizen cases from intake to resolution, with real-time status updates and audit trails.",
                color: "#00A99D",
                path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
              },
              {
                title: "Grants & Benefits Administration",
                desc: "Digital platforms to manage eligibility screening, grant applications, award tracking, and compliance reporting end-to-end.",
                color: "#a78bfa",
                path: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Government Data Modernization",
                desc: "Migrate legacy data silos to unified cloud data platforms with governance, lineage tracking, and analytics-ready architecture.",
                color: "#34d399",
                path: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
              },
              {
                title: "Interoperability & API Integration",
                desc: "FHIR, REST, and SOAP API integrations that connect disparate agency systems for seamless cross-department data sharing.",
                color: "#fb923c",
                path: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
              {
                title: "Cybersecurity & Compliance",
                desc: "Zero-trust security architecture, continuous monitoring, and FedRAMP/FISMA compliance frameworks to protect sensitive citizen data.",
                color: "#f472b6",
                path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
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
          <p className="text-[#00A99D] text-xs font-bold tracking-widest uppercase mb-4">Our Approach</p>
          <h2 className="font-black text-3xl text-white mb-12">How we deliver for government</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Stakeholder Discovery & Requirements",
                desc: "We engage agency leaders, IT teams, and end-users to map current workflows, pain points, and regulatory constraints before a single line of code is written.",
              },
              {
                num: "02",
                title: "Compliance-First Architecture",
                desc: "Security and compliance are designed in from day one. FedRAMP, FISMA, ADA, and SOC 2 requirements shape every architectural decision.",
              },
              {
                num: "03",
                title: "Agile Build & UAT",
                desc: "Two-week sprints with continuous stakeholder demos and rigorous user acceptance testing ensure the solution meets real-world government operational needs.",
              },
              {
                num: "04",
                title: "Deployment & Change Management",
                desc: "We manage rollout, staff training, and a structured change management program to maximize adoption and minimize disruption to ongoing operations.",
              },
            ].map(({ num, title, desc }) => (
              <div
                key={num}
                className="p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="font-black text-3xl text-[#00A99D] mb-3">{num}</p>
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
        style={{ background: "linear-gradient(135deg, #1B3C6E 0%, #00A99D 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-black text-4xl text-white mb-4">Ready to modernize your agency?</h2>
          <p className="text-white/70 text-lg mb-8">Let&apos;s map your digital transformation roadmap.</p>
          <a href="/contact" className="btn-outline-white">Schedule a Discovery Call</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
