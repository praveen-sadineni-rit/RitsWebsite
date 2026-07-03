"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const accentColors = ["#60a5fa", "#00A99D", "#a78bfa", "#34d399", "#fb923c", "#f472b6"];

const solutions = [
  {
    title: "Core Banking Systems",
    description:
      "Modernize legacy infrastructure with scalable, microservices-based core banking platforms built for reliability and growth.",
    color: "#60a5fa",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"
          stroke="#60a5fa"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Payment Processing APIs",
    description:
      "High-throughput, low-latency payment APIs that support global currencies, real-time settlements, and seamless gateway integrations.",
    color: "#00A99D",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M2 8h20M2 12h6M6 16h4M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
          stroke="#00A99D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Fraud Detection & ML",
    description:
      "Real-time transaction monitoring powered by machine learning models that detect anomalies and stop fraud before it impacts customers.",
    color: "#a78bfa",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l7 4v5c0 4.418-2.99 8.55-7 10-4.01-1.45-7-5.582-7-10V6l7-4zM9 12l2 2 4-4"
          stroke="#a78bfa"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Compliance Automation",
    description:
      "Automate KYC, AML, and regulatory reporting workflows to reduce manual effort and accelerate compliance cycles by up to 40%.",
    color: "#34d399",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2m-6 9l2 2 4-4"
          stroke="#34d399"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Wealth Management Platforms",
    description:
      "Portfolio dashboards, robo-advisor engines, and client-facing investment tools built for asset managers and wealth advisors.",
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
    title: "Open Banking Integrations",
    description:
      "PSD2-ready open banking connectors, API aggregators, and third-party fintech integrations that extend your financial ecosystem.",
    color: "#f472b6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
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
    title: "Discovery & Compliance Mapping",
    description:
      "We audit your regulatory requirements, existing infrastructure, and business goals to define a compliant, future-proof roadmap.",
  },
  {
    step: "02",
    title: "Architecture & Security Design",
    description:
      "Our architects design bank-grade system blueprints — zero-trust networks, encrypted data flows, and PCI-DSS aligned infrastructure.",
  },
  {
    step: "03",
    title: "Agile Build & Testing",
    description:
      "We develop in sprints with continuous security reviews, load testing, and penetration testing at every release gate.",
  },
  {
    step: "04",
    title: "Launch & Ongoing Support",
    description:
      "We manage go-live, monitor system health 24/7, and provide dedicated support to keep your platform performing at peak.",
  },
];

export default function FintechPage() {
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
            FinTech
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Built for <span style={{ color: "#00A99D" }}>Finance.</span>
            <br />
            Engineered for Trust.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            We build secure, compliant, high-performance financial platforms — from payment APIs to wealth management dashboards.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["PCI-DSS Compliant", "Real-Time Processing", "Bank-Grade Security"].map((pill) => (
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
            { number: "$2B+", label: "Transactions Processed" },
            { number: "99.99%", label: "Platform Uptime" },
            { number: "40%", label: "Faster Compliance Cycles" },
            { number: "150+", label: "FinTech Integrations Built" },
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
              End-to-End FinTech Solutions
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              From core banking to open finance — we design and build every layer of your financial technology stack.
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
            Ready to build your financial platform?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Let's talk about your FinTech roadmap.
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
