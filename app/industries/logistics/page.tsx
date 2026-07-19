"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LogisticsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section
        style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 50%, #0f2447 100%)" }}
        className="pt-24 pb-20 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#E8B53D] uppercase tracking-widest text-sm font-semibold mb-4">Logistics</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Move Faster.{" "}
            <span style={{ color: "#E8B53D" }}>Deliver Smarter.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            End-to-end logistics technology, from real-time fleet tracking to warehouse automation and supply chain visibility.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Real-Time Tracking", "Route Optimization", "Supply Chain Visibility"].map((pill) => (
              <span
                key={pill}
                className="px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20 bg-white/10"
              >
                {pill}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-primary">Get Started</a>
            <a href="/services" className="btn-outline-white">View Services</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6" style={{ background: "#f8f9fa" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "30%", label: "Reduction in Delivery Costs" },
            { number: "99.5%", label: "On-Time Delivery Rate" },
            { number: "4x", label: "Faster Dispatch Processing" },
            { number: "500+", label: "Fleet Units Managed" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="text-[#1B3C6E] font-black text-4xl mb-1">{stat.number}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="section-eyebrow">Solutions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f2447] mb-12 mt-2">
            Built for Modern Logistics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Fleet Management Systems",
                desc: "Real-time GPS tracking, driver performance monitoring, and vehicle health dashboards to keep your fleet running at peak efficiency.",
                color: "#60a5fa",
                bg: "#eff6ff",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 17V7a2 2 0 012-2h9l4 4v8M3 17h2m14 0h2m-4-8h-5V5" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Supply Chain Visibility",
                desc: "End-to-end tracking across suppliers, ports, and last-mile partners, with live alerts and predictive ETAs.",
                color: "#E8B53D",
                bg: "#f0fdfb",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke="#E8B53D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Route Optimization",
                desc: "AI-powered routing that cuts miles, reduces fuel costs, and adapts dynamically to traffic and delivery windows.",
                color: "#a78bfa",
                bg: "#f5f3ff",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Warehouse Management",
                desc: "Smart WMS with barcode scanning, slot optimization, and pick-pack-ship automation that scales with your volume.",
                color: "#34d399",
                bg: "#f0fdf4",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 22V12h6v10" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Last-Mile Delivery Tech",
                desc: "Customer notification systems, proof-of-delivery capture, and dynamic slot booking for the final leg of every shipment.",
                color: "#fb923c",
                bg: "#fff7ed",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Customs & Compliance Automation",
                desc: "Automated documentation, HS code classification, and compliance checks that accelerate cross-border shipments.",
                color: "#f472b6",
                bg: "#fdf2f8",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: card.bg }}
                >
                  {card.icon}
                </div>
                <h3 className="text-[#0f2447] font-semibold text-lg mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 px-6" style={{ background: "#0f2447" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-[#E8B53D] uppercase tracking-widest text-sm font-semibold mb-4">Our Approach</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">How We Deliver</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Operations Discovery", desc: "We audit your current logistics stack, identify bottlenecks, and map your full freight and fulfillment flow." },
              { num: "02", title: "System Architecture", desc: "Our engineers design a modular logistics platform, built for your carrier mix, warehouse setup, and scale." },
              { num: "03", title: "Integration & Build", desc: "We integrate TMS, WMS, fleet systems, and carrier APIs into one unified operations platform." },
              { num: "04", title: "Go-Live & Optimization", desc: "We launch with live monitoring, then continuously optimize routes, costs, and SLAs using real operational data." },
            ].map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[#E8B53D] font-black text-3xl mb-3">{step.num}</p>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #1B3C6E 0%, #E8B53D 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to optimize your logistics?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Let's map your supply chain and build what's next.
          </p>
          <a href="/contact" className="btn-outline-white">Talk to Our Team</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
