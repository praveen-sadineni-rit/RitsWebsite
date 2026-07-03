"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const solutions = [
  {
    title: "Custom Storefront Development",
    description:
      "Performance-first storefronts built with Next.js, Remix, or your framework of choice, optimized for Core Web Vitals and conversion.",
    color: "#60a5fa",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
          stroke="#60a5fa"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Marketplace Platforms",
    description:
      "Multi-vendor marketplace solutions with seller onboarding, product catalog management, commission logic, and real-time inventory sync.",
    color: "#00A99D",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9l1-5h16l1 5M3 9h18M3 9a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a1 1 0 0 0-1-1M9 21V9m6 12V9"
          stroke="#00A99D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Payment & Checkout Optimization",
    description:
      "Frictionless checkout flows, one-click payments, BNPL integrations, and multi-currency support that reduce cart abandonment.",
    color: "#a78bfa",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M2 8h20M2 12h6M6 16h4M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
          stroke="#a78bfa"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Inventory & Order Management",
    description:
      "Real-time inventory tracking, multi-warehouse order routing, returns automation, and ERP integrations that scale with your catalog.",
    color: "#34d399",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 7l-8-4-8 4m16 0v10l-8 4m-8-4V7m16 0l-8 4m0 10V11M4 7l8 4"
          stroke="#34d399"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Commerce Analytics",
    description:
      "Custom analytics dashboards tracking conversion funnels, customer LTV, cohort retention, and product performance in real time.",
    color: "#fb923c",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 17l4-4 4 2 4-6 4 3M3 21h18"
          stroke="#fb923c"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Headless Commerce Architecture",
    description:
      "Decouple your frontend from your commerce engine with headless architectures using Shopify, Commercetools, or custom-built backends.",
    color: "#f472b6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7M9 21V12h6v9"
          stroke="#f472b6"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const approachSteps = [
  {
    step: "01",
    title: "Business & Tech Discovery",
    description:
      "We map your catalog, traffic patterns, tech stack, and growth targets to define a commerce architecture that serves you at scale.",
  },
  {
    step: "02",
    title: "UX & Architecture Design",
    description:
      "Our designers and architects craft high-converting UX prototypes and a performance-first technical blueprint before a line is coded.",
  },
  {
    step: "03",
    title: "Build & Integrations",
    description:
      "We develop in focused sprints, integrating your ERP, PIM, payment gateways, and logistics providers with full QA at every gate.",
  },
  {
    step: "04",
    title: "Launch & Scale",
    description:
      "We manage go-live, run load testing under peak traffic simulations, and provide ongoing optimization to keep you growing.",
  },
];

export default function EcommercePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        style={{ backgroundColor: "#0f2447" }}
        className="pt-32 pb-24 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#00A99D" }}>
            E-Commerce
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Commerce Without{" "}
            <span style={{ color: "#00A99D" }}>Limits.</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            We build high-converting storefronts, marketplace platforms, and commerce infrastructure engineered for growth.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Headless Commerce", "Multi-Channel", "Sub-Second Load Times"].map((pill) => (
              <span
                key={pill}
                className="px-4 py-1.5 rounded-full text-sm font-medium border"
                style={{ borderColor: "#00A99D", color: "#00A99D", backgroundColor: "rgba(0,169,157,0.08)" }}
              >
                {pill}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-primary">
              Start Your Project
            </a>
            <a href="/services" className="btn-outline-white">
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "3x", label: "Average Revenue Growth" },
            { number: "99.9%", label: "Cart Uptime" },
            { number: "50ms", label: "Average API Response" },
            { number: "200+", label: "Commerce Integrations" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 text-center shadow-sm"
            >
              <p className="text-4xl font-extrabold mb-1" style={{ color: "#1B3C6E" }}>
                {stat.number}
              </p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">What We Build</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
              End-to-End Commerce Solutions
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              From storefront to fulfillment, we build every layer of your commerce stack to convert, retain, and scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <div
                key={sol.title}
                className="hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 rounded-2xl p-6"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${sol.color}18` }}
                >
                  {sol.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{sol.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{sol.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section style={{ backgroundColor: "#0f2447" }} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#00A99D" }}>
              Our Process
            </p>
            <h2 className="text-4xl font-extrabold text-white">How We Deliver</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-4xl font-extrabold mb-3" style={{ color: "#00A99D" }}>
                  {step.step}
                </p>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #1B3C6E 0%, #00A99D 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to scale your commerce platform?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Let's build something that converts.
          </p>
          <a href="/contact" className="btn-outline-white">
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
