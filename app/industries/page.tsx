import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const industries = [
  {
    title: "FinTech",
    href: "/industries/fintech",
    color: "#4a9eff",
    desc: "Secure, compliant platforms for banking, lending, wealth management, and insurance.",
    icon: "M3 21h18M5 21V7l8-4 8 4v14M9 9v.01M9 12v.01M9 15v.01M9 18v.01",
  },
  {
    title: "Healthcare",
    href: "/industries/healthcare",
    color: "#E8B53D",
    desc: "HIPAA-compliant systems connecting patients, providers, and data, securely.",
    icon: "M12 8v8M8 12h8M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z",
  },
  {
    title: "E-Commerce",
    href: "/industries/ecommerce",
    color: "#f59e0b",
    desc: "High-converting storefronts and commerce platforms built to scale on demand.",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 11-2 2m-6 0a2 2 0 11-2-2",
  },
  {
    title: "Retail",
    href: "/industries/retail",
    color: "#f472b6",
    desc: "Omnichannel experiences that unify store, web, and mobile into one journey.",
    icon: "M3 9l1-5h16l1 5M3 9h18M3 9v10a1 1 0 001 1h16a1 1 0 001-1V9M9 13h6",
  },
  {
    title: "Logistics & Supply Chain",
    href: "/industries/logistics",
    color: "#34d399",
    desc: "Real-time visibility, tracking, and automation across the entire supply chain.",
    icon: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  },
  {
    title: "Manufacturing",
    href: "/industries/manufacturing",
    color: "#a855f7",
    desc: "Smart factory, IoT, and automation platforms for modern production lines.",
    icon: "M2 20h20M4 20V10l6 4V10l6 4V6l4 3v11M8 20v-4M14 20v-4",
  },
  {
    title: "Government",
    href: "/industries/government",
    color: "#60a5fa",
    desc: "Secure, accessible digital services that modernize the public sector.",
    icon: "M3 21h18M5 21V10M19 21V10M4 10h16L12 3 4 10zM9 21v-6h6v6",
  },
  {
    title: "Education",
    href: "/industries/education",
    color: "#fb923c",
    desc: "Engaging learning platforms and edtech tools for schools and institutions.",
    icon: "M12 3L2 8l10 5 10-5-10-5zM6 10.5V16c0 1 2.5 3 6 3s6-2 6-3v-5.5",
  },
  {
    title: "Energy & Utilities",
    href: "/industries/energy",
    color: "#10b981",
    desc: "Grid intelligence and asset monitoring for a connected, reliable grid.",
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main style={{ overflowX: "hidden" }}>
        {/* HERO */}
        <section style={{ background: "#0f2447", position: "relative", overflow: "hidden" }} className="pt-32 pb-24 px-6">
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(74,158,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: 460,
              height: 460,
              background: "radial-gradient(circle, rgba(232,181,61,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="max-w-4xl mx-auto text-center relative">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#E8B53D" }}>
              Industries
            </p>
            <h1 className="text-white font-extrabold leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}>
              Deep expertise across the industries that <span style={{ color: "#E8B53D" }}>run on technology.</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
              We pair engineering talent with real domain knowledge, so you get teams that understand your regulations, your users, and your goals from day one.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">Talk to an Expert</Link>
              <a href="#all" className="btn-outline-white">Explore Industries</a>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section id="all" style={{ background: "#0a1628" }} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#E8B53D" }}>
                Who We Serve
              </p>
              <h2 className="text-white font-extrabold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.02em" }}>
                Nine industries. One standard of delivery.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((ind) => (
                <Link
                  key={ind.title}
                  href={ind.href}
                  className="group block rounded-2xl p-7 transition-all hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${ind.color}22`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${ind.color}1f`, border: `1px solid ${ind.color}44` }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d={ind.icon} stroke={ind.color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{ind.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{ind.desc}</p>
                  <span className="text-sm font-bold transition-colors" style={{ color: ind.color }}>
                    Explore &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center" style={{ background: "linear-gradient(135deg, #1B3C6E 0%, #E8B53D 100%)" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-white mb-4">Don&apos;t see your industry?</h2>
            <p className="text-white/80 text-lg mb-8">
              We work across sectors. Tell us your challenge and we&apos;ll bring the right team.
            </p>
            <Link href="/contact" className="btn-outline-white">Get in Touch</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
