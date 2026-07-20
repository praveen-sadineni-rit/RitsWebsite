"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ManufacturingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section
        style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 50%, #0f2447 100%)" }}
        className="pt-24 pb-20 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#E8B53D] uppercase tracking-widest text-sm font-semibold mb-4">Manufacturing</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Smart Manufacturing{" "}
            <span style={{ color: "#E8B53D" }}>Starts Here.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            IoT, ERP modernization, and AI-powered systems that connect your shop floor to your business, in real time.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Industry 4.0 Ready", "IoT Connected", "ERP Integrated"].map((pill) => (
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
            { number: "45%", label: "OEE Improvement" },
            { number: "60%", label: "Reduction in Downtime" },
            { number: "3x", label: "Faster Production Reporting" },
            { number: "200+", label: "IoT Devices Connected" },
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
            Built for Industry 4.0
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "IoT & Sensor Integration",
                desc: "Connect machines, sensors, and PLCs to a unified data platform, capturing real-time signals from every corner of your plant.",
                color: "#86A8CE",
                bg: "#EAF1F8",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" stroke="#86A8CE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "ERP Modernization",
                desc: "Migrate from legacy ERP systems to modern cloud-native platforms, without disrupting production schedules.",
                color: "#E8B53D",
                bg: "#f0fdfb",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 7v10M8 5v14M12 3v18M16 5v14M20 7v10" stroke="#E8B53D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Predictive Maintenance AI",
                desc: "Machine learning models trained on your sensor data to predict failures before they happen and schedule maintenance proactively.",
                color: "#C99A2E",
                bg: "#FBF4DD",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="#C99A2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Quality Control Systems",
                desc: "Vision-based inspection, SPC dashboards, and defect tracking that keep quality standards tight across every production run.",
                color: "#5E82AE",
                bg: "#EAF1F8",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#5E82AE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Shop Floor Automation",
                desc: "MES integration, automated work order routing, and digital work instructions that eliminate paper and reduce operator errors.",
                color: "#E8B53D",
                bg: "#FBF4DD",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="#E8B53D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="#E8B53D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Supply Chain Integration",
                desc: "Connect suppliers, procurement systems, and logistics partners to your plant floor for fully synchronized demand-driven production.",
                color: "#F3C34E",
                bg: "#FBF4DD",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" stroke="#F3C34E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
              { num: "01", title: "Plant Assessment & Discovery", desc: "We walk the floor, documenting machines, systems, data flows, and pain points before writing a single line of code." },
              { num: "02", title: "IoT Architecture Design", desc: "Our architects design a secure, scalable IoT backbone connecting your OT and IT environments without disrupting uptime." },
              { num: "03", title: "Integration & Testing", desc: "We integrate IoT layers, ERP systems, MES platforms, and quality tools, with rigorous testing at every stage." },
              { num: "04", title: "Deployment & Training", desc: "We go live with your team, provide hands-on training, and embed continuous improvement loops into your operations." },
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
            Ready to modernize your plant?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Let's build a smarter manufacturing operation.
          </p>
          <a href="/contact" className="btn-outline-white">Talk to Our Team</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
