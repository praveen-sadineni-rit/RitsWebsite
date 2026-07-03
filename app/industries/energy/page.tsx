"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EnergyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section
        className="pt-24 pb-20 px-6"
        style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 50%, #0f2447 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[#00A99D] text-xs font-bold tracking-widest uppercase mb-4">Energy &amp; Utilities</p>
          <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            Power the<br />
            <span style={{ color: "#00A99D" }}>Future.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
            We build smart grid systems, energy analytics platforms, and sustainability tools that help utilities and energy companies operate more efficiently.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {["Smart Grid Ready", "IoT Connected", "ESG Reporting"].map((pill) => (
              <span key={pill} className="px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-white/20 bg-white/5">
                {pill}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/contact" className="btn-primary">Talk to an Energy Expert</a>
            <a href="/services" className="btn-outline-white">View Services</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6" style={{ background: "#f8f9fa" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "500MW+", label: "Energy Assets Monitored" },
              { stat: "40%", label: "Reduction in Grid Downtime" },
              { stat: "3x", label: "Faster Outage Response" },
              { stat: "85%", label: "Sustainability Reporting Accuracy" },
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
          <h2 className="font-black text-3xl text-[#0f2447] mb-4">Built for energy &amp; utilities</h2>
          <p className="text-gray-500 text-lg mb-12 max-w-2xl">
            End-to-end digital platforms that modernize grid operations, unlock energy intelligence, and drive sustainability across the entire value chain.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Grid Management",
                desc: "Real-time grid monitoring, automated fault detection, and demand response controls that maximize reliability and reduce operational costs.",
                color: "#60a5fa",
                path: "M13 10V3L4 14h7v7l9-11h-7z",
              },
              {
                title: "Energy Analytics & BI",
                desc: "Unified analytics dashboards that aggregate consumption, generation, and distribution data, surfacing actionable insights for grid operators and executives.",
                color: "#00A99D",
                path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
              {
                title: "Predictive Maintenance",
                desc: "ML-powered models that analyze sensor data and historical failure patterns to predict equipment issues before they cause outages or safety incidents.",
                color: "#a78bfa",
                path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
              },
              {
                title: "IoT Sensor Integration",
                desc: "Scalable IoT data pipelines that ingest millions of sensor readings per second from smart meters, substations, and field devices into a unified data lake.",
                color: "#34d399",
                path: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
              },
              {
                title: "Sustainability & ESG Reporting",
                desc: "Automated carbon accounting, emissions tracking, and ESG report generation that meets GRI, TCFD, and SEC climate disclosure requirements.",
                color: "#fb923c",
                path: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Customer Portal & Billing",
                desc: "Self-service customer portals with real-time usage data, smart billing, outage notifications, and renewable energy program enrollment.",
                color: "#f472b6",
                path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
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
          <h2 className="font-black text-3xl text-white mb-12">How we deliver for energy</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Asset & Grid Discovery",
                desc: "We inventory your physical and digital assets, map data flows across SCADA and OT systems, and identify the highest-impact modernization opportunities.",
              },
              {
                num: "02",
                title: "Data Architecture Design",
                desc: "We design a unified data architecture, from edge collection to cloud storage and analytics, built for scale, resilience, and real-time operational needs.",
              },
              {
                num: "03",
                title: "IoT Integration & Build",
                desc: "Secure onboarding of field sensors and meters, development of data ingestion pipelines, and delivery of analytics and control applications sprint by sprint.",
              },
              {
                num: "04",
                title: "Deployment & Monitoring",
                desc: "Hardened production deployment with 24/7 platform monitoring, alerting, and a dedicated support team to keep your grid systems running without interruption.",
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
          <h2 className="font-black text-4xl text-white mb-4">Ready to power the future?</h2>
          <p className="text-white/70 text-lg mb-8">Let&apos;s build the energy infrastructure your operation needs.</p>
          <a href="/contact" className="btn-outline-white">Talk to an Energy Expert</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
