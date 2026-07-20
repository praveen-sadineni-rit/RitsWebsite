"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const solutions = [
  {
    title: "EHR/EMR Integrations",
    description:
      "Seamlessly connect with Epic, Cerner, Allscripts, and other leading EHR systems via certified HL7 FHIR and legacy HL7 v2 interfaces.",
    color: "#86A8CE",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7zM9 11h6M9 15h4M9 7h1"
          stroke="#86A8CE"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Telehealth Platforms",
    description:
      "Scalable, HIPAA-compliant telehealth solutions with HD video consultations, e-prescriptions, and integrated patient scheduling.",
    color: "#E8B53D",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M3 8h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z"
          stroke="#E8B53D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Patient Engagement Apps",
    description:
      "Mobile and web apps that empower patients with appointment booking, care plans, secure messaging, and medication reminders.",
    color: "#C99A2E",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
          stroke="#C99A2E"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Clinical Workflow Automation",
    description:
      "Automate referrals, prior authorizations, care transitions, and clinical documentation to reduce administrative burden on providers.",
    color: "#5E82AE",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2M12 12v4M10 14h4"
          stroke="#5E82AE"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Health Data Analytics",
    description:
      "Population health dashboards, clinical intelligence tools, and predictive analytics that surface actionable insights from patient data.",
    color: "#E8B53D",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"
          stroke="#E8B53D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Medical Billing Systems",
    description:
      "End-to-end revenue cycle management platforms with claims processing, denial management, and payer integration built in.",
    color: "#F3C34E",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 14l2 2 4-4M7 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z"
          stroke="#F3C34E"
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
    title: "Compliance Assessment",
    description:
      "We evaluate your HIPAA, HITECH, and state-level compliance posture, identifying gaps and mapping requirements to your use case.",
  },
  {
    step: "02",
    title: "Architecture & Data Modeling",
    description:
      "We design interoperable, FHIR-native data models and cloud architectures that ensure security, scalability, and standards compliance.",
  },
  {
    step: "03",
    title: "Build & Integration",
    description:
      "Our engineers build and test every integration. EHR APIs, payer systems, medical devices, with clinical validation at each milestone.",
  },
  {
    step: "04",
    title: "Certification & Launch",
    description:
      "We support ONC certification, security audits, and clinical go-live with dedicated hypercare support through stabilization.",
  },
];

export default function HealthcarePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        style={{ backgroundColor: "#0f2447" }}
        className="pt-32 pb-24 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#E8B53D" }}>
            Healthcare
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Technology that <span style={{ color: "#E8B53D" }}>Heals.</span>
            <br />
            Systems that Scale.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            We build HIPAA-compliant healthcare platforms that connect patients, providers, and data, securely and reliably.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["HIPAA Compliant", "HL7 & FHIR Ready", "EHR Integrated"].map((pill) => (
              <span
                key={pill}
                className="px-4 py-1.5 rounded-full text-sm font-medium border"
                style={{ borderColor: "#E8B53D", color: "#E8B53D", backgroundColor: "rgba(232,181,61,0.08)" }}
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
            { number: "500K+", label: "Patient Records Managed" },
            { number: "HIPAA", label: "100% Compliant Builds" },
            { number: "3x", label: "Faster Clinical Workflows" },
            { number: "60%", label: "Reduction in Admin Costs" },
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
              End-to-End Healthcare Solutions
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              From EHR integrations to patient engagement, we build every layer of your digital health platform with compliance built in.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <div
                key={sol.title}
                id={sol.title === "Telehealth Platforms" ? "telehealth" : sol.title === "Clinical Workflow Automation" ? "clinical-systems" : sol.title === "Health Data Analytics" ? "pharma-biotech" : undefined}
                className="hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 rounded-2xl p-6 scroll-mt-24"
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
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#E8B53D" }}>
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
                <p className="text-4xl font-extrabold mb-3" style={{ color: "#E8B53D" }}>
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
        style={{ background: "linear-gradient(135deg, #1B3C6E 0%, #E8B53D 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to modernize your healthcare system?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Let's talk about your digital health roadmap.
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
