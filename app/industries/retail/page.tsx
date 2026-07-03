"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RetailPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section
        style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 50%, #0f2447 100%)" }}
        className="pt-24 pb-20 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#00A99D] uppercase tracking-widest text-sm font-semibold mb-4">Retail</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Retail{" "}
            <span style={{ color: "#00A99D" }}>Reimagined.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            We build unified commerce platforms. POS, inventory, loyalty, and omnichannel experiences that keep customers coming back.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Omnichannel Ready", "Real-Time Inventory", "AI-Powered Personalization"].map((pill) => (
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
            { number: "35%", label: "Increase in Repeat Purchases" },
            { number: "2x", label: "Inventory Accuracy" },
            { number: "48hr", label: "Average Go-Live Time" },
            { number: "100+", label: "Retail Systems Integrated" },
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
            Built for Modern Retail
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "POS & Checkout Systems",
                desc: "Fast, reliable point-of-sale solutions that work online and offline, built for high-volume retail environments.",
                color: "#60a5fa",
                bg: "#eff6ff",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 10h18M7 15h.01M12 15h.01M17 15h.01M7 19h.01M12 19h.01M17 19h.01" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Inventory Management",
                desc: "Real-time stock visibility across all locations, with automated replenishment and shrinkage tracking built in.",
                color: "#00A99D",
                bg: "#f0fdfb",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="#00A99D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2zM12 12v4M10 14h4" stroke="#00A99D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Omnichannel Platforms",
                desc: "Unify your in-store, online, and mobile shopping experience under one seamless customer journey.",
                color: "#a78bfa",
                bg: "#f5f3ff",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Customer Loyalty Programs",
                desc: "Points, rewards, and personalized offers that drive repeat visits and deepen brand affinity at every touchpoint.",
                color: "#34d399",
                bg: "#f0fdf4",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.99 5.99 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Retail Analytics & BI",
                desc: "Dashboards and data pipelines that surface insights on sales trends, basket sizes, and customer behavior.",
                color: "#fb923c",
                bg: "#fff7ed",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "CRM & Personalization Engine",
                desc: "AI-powered customer profiles that power targeted marketing, product recommendations, and lifecycle automation.",
                color: "#f472b6",
                bg: "#fdf2f8",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
          <p className="text-[#00A99D] uppercase tracking-widest text-sm font-semibold mb-4">Our Approach</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">How We Deliver</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Retail Audit & Discovery", desc: "We map your current systems, gaps, and customer journeys to define the right tech stack." },
              { num: "02", title: "Platform Design & Architecture", desc: "Our architects design a scalable, composable commerce platform tailored to your brand." },
              { num: "03", title: "Build & System Integration", desc: "We build and integrate POS, inventory, loyalty, and analytics into a unified platform." },
              { num: "04", title: "Launch & Continuous Improvement", desc: "We go live fast, then iterate, using real data to optimize performance and experience." },
            ].map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[#00A99D] font-black text-3xl mb-3">{step.num}</p>
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
        style={{ background: "linear-gradient(135deg, #1B3C6E 0%, #00A99D 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to reimagine retail?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Let's build a unified commerce experience your customers will love.
          </p>
          <a href="/contact" className="btn-outline-white">Talk to Our Team</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
