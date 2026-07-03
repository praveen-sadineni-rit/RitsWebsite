"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "How quickly can you start a project?",
    a: "For staff augmentation, we can typically have candidates in front of you within 24-48 hours. For project work, we aim to kick off discovery within 1-2 weeks of signing.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "Both. We've helped seed-stage founders build their first product and Fortune 500 companies scale their teams.",
  },
  {
    q: "How does pricing work?",
    a: "Staff augmentation is hourly or monthly. Project work is scoped and fixed-bid. We'll always give you a detailed estimate before any commitment.",
  },
  {
    q: "What makes your vetting process different?",
    a: "We verify identity, check references, run multi-round technical assessments, and only pass ~15% of applicants. You get real senior engineers, not résumé fillers.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    lookingFor: "",
    projectDetails: "",
    hearAboutUs: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 60%, #0d3d4a 100%)", padding: "96px 24px 72px", position: "relative", overflow: "hidden" }}>
        {/* Background decoration dots */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(0,169,157,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#00A99D", marginBottom: 20, background: "rgba(0,169,157,0.12)",
            border: "1px solid rgba(0,169,157,0.3)", borderRadius: 99, padding: "6px 16px",
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" fill="#00A99D"/><circle cx="5" cy="5" r="2" fill="white"/></svg>
            Get In Touch
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, color: "white", lineHeight: 1.2, marginBottom: 20 }}>
            Let&apos;s talk about what<br />
            <span style={{ color: "#00A99D" }}>you&apos;re building.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px" }}>
            Fill out the form and someone from our team will reach out within 24 hours &mdash; usually much sooner.
          </p>

          {/* Colorful chips with icons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              {
                label: "Response Time", value: "< 24 hours",
                bg: "linear-gradient(135deg,#00A99D,#00c9b8)", shadow: "rgba(0,169,157,0.4)",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>,
              },
              {
                label: "Availability", value: "Mon–Fri 9–6 EST",
                bg: "linear-gradient(135deg,#3b82f6,#60a5fa)", shadow: "rgba(59,130,246,0.4)",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="white" strokeWidth="2"/><path d="M8 2v4M16 2v4M3 10h18" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>,
              },
              {
                label: "NDA Signing", value: "Same day",
                bg: "linear-gradient(135deg,#8b5cf6,#a78bfa)", shadow: "rgba(139,92,246,0.4)",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="white" strokeWidth="2"/></svg>,
              },
              {
                label: "No Commitment", value: "Free scoping call",
                bg: "linear-gradient(135deg,#f59e0b,#fbbf24)", shadow: "rgba(245,158,11,0.4)",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="white" strokeWidth="2" strokeLinejoin="round"/></svg>,
              },
              {
                label: "Direct Access", value: "Talk to engineers",
                bg: "linear-gradient(135deg,#ec4899,#f472b6)", shadow: "rgba(236,72,153,0.4)",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>,
              },
            ].map((chip) => (
              <div key={chip.label} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: chip.bg, borderRadius: 14, padding: "10px 18px",
                boxShadow: `0 6px 20px ${chip.shadow}`,
              }}>
                {chip.icon}
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>{chip.label}</p>
                  <p style={{ fontSize: 13, color: "white", fontWeight: 800, margin: 0 }}>{chip.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background: "#F8FAFC", padding: "64px 24px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
          }}
          className="lg:grid-cols-[1fr_380px]"
        >
          {/* LEFT — Form */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              padding: "40px 36px",
              boxShadow: "0 2px 16px rgba(27,60,110,0.07)",
            }}
          >
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 320,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "#00A99D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 18L15 25L28 11"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#1B3C6E",
                    marginBottom: 12,
                  }}
                >
                  Message Sent!
                </h2>
                <p style={{ fontSize: 16, color: "#4B5563" }}>
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Form header with chips */}
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1B3C6E", marginBottom: 14 }}>
                    Send us a message
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {[
                      { label: "🔒 Confidential", bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
                      { label: "⚡ Fast Response", bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
                      { label: "🤝 No Obligation", bg: "#fdf4ff", color: "#9333ea", border: "#e9d5ff" },
                      { label: "✅ No Spam", bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
                    ].map((chip) => (
                      <span key={chip.label} style={{
                        display: "inline-flex", alignItems: "center",
                        fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99,
                        background: chip.bg, color: chip.color, border: `1px solid ${chip.border}`,
                      }}>{chip.label}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="sm:grid-cols-2 grid-cols-1">
                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                      <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:22, height:22, borderRadius:6, background:"#e0f2fe" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#0284c7" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="#0284c7" strokeWidth="2"/></svg>
                      </span>
                      Full Name <span style={{ color: "#00A99D" }}>*</span>
                    </label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Jane Smith"
                      className="border border-gray-200 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:border-[#00A99D] transition-colors" />
                  </div>
                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                      <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:22, height:22, borderRadius:6, background:"#f0fdf4" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#16a34a" strokeWidth="2"/><polyline points="22,6 12,13 2,6" stroke="#16a34a" strokeWidth="2"/></svg>
                      </span>
                      Work Email <span style={{ color: "#00A99D" }}>*</span>
                    </label>
                    <input type="email" name="workEmail" value={formData.workEmail} onChange={handleChange} required placeholder="jane@company.com"
                      className="border border-gray-200 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:border-[#00A99D] transition-colors" />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:22, height:22, borderRadius:6, background:"#fdf4ff" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="#9333ea" strokeWidth="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="#9333ea" strokeWidth="2"/></svg>
                    </span>
                    Company Name
                  </label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Corp"
                    className="border border-gray-200 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:border-[#00A99D] transition-colors" />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:22, height:22, borderRadius:6, background:"#fff7ed" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#ea580c" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"/></svg>
                    </span>
                    What are you looking for? <span style={{ color: "#00A99D" }}>*</span>
                  </label>
                  <select name="lookingFor" value={formData.lookingFor} onChange={handleChange} required
                    className="border border-gray-200 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:border-[#00A99D] transition-colors bg-white">
                    <option value="" disabled>Select an option</option>
                    <option value="software-dev">💻 Software Development</option>
                    <option value="product-dev">🚀 Product Development</option>
                    <option value="ai-ml">🤖 AI/ML Solutions</option>
                    <option value="staff-aug">👥 Staff Augmentation</option>
                    <option value="not-sure">🤔 Not sure yet</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:22, height:22, borderRadius:6, background:"#eff6ff" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
                    </span>
                    Tell us about your project
                  </label>
                  <textarea name="projectDetails" value={formData.projectDetails} onChange={handleChange} rows={4}
                    placeholder="Briefly describe what you're building or the problem you're trying to solve..."
                    className="border border-gray-200 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:border-[#00A99D] transition-colors"
                    style={{ resize: "vertical" }} />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:22, height:22, borderRadius:6, background:"#fef9c3" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#ca8a04" strokeWidth="2" strokeLinejoin="round"/></svg>
                    </span>
                    How did you hear about us?
                  </label>
                  <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:border-[#00A99D] transition-colors bg-white">
                    <option value="" disabled>Select an option</option>
                    <option value="google">🔍 Google</option>
                    <option value="linkedin">💼 LinkedIn</option>
                    <option value="referral">🤝 Referral</option>
                    <option value="event">🎤 Event</option>
                    <option value="other">✨ Other</option>
                  </select>
                </div>

                <button type="submit" style={{
                  background: "linear-gradient(135deg, #00A99D, #0284c7)",
                  color: "#ffffff", border: "none", borderRadius: 10,
                  padding: "15px 32px", fontSize: 15, fontWeight: 700,
                  cursor: "pointer", width: "100%", letterSpacing: "0.01em",
                  boxShadow: "0 4px 16px rgba(0,169,157,0.35)", transition: "opacity 0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* RIGHT — Info Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Animated ping signal */}
            <div className="relative flex items-center justify-center h-32 mb-6">
              <div className="absolute w-32 h-32 rounded-full border border-[#00A99D]/10 animate-ping" style={{ animationDuration:"2s" }}/>
              <div className="absolute w-20 h-20 rounded-full border border-[#00A99D]/20 animate-ping" style={{ animationDuration:"2s", animationDelay:"0.3s" }}/>
              <div className="absolute w-10 h-10 rounded-full border border-[#00A99D]/40 animate-ping" style={{ animationDuration:"2s", animationDelay:"0.6s" }}/>
              <div className="w-12 h-12 rounded-full bg-[#00A99D] flex items-center justify-center shadow-lg" style={{ boxShadow:"0 0 30px rgba(0,169,157,0.5)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 12 19.79 19.79 0 011.52 3.46a2 2 0 011.99-2.19h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006.18 6.18l.81-.81a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>

            {/* Office */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 12,
                padding: "24px 28px",
                boxShadow: "0 2px 12px rgba(27,60,110,0.06)",
                borderLeft: "4px solid #00A99D",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#00A99D",
                  marginBottom: 8,
                }}
              >
                Office
              </p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#1B3C6E",
                  marginBottom: 2,
                }}
              >
                331 E Main Street, Suite 200
              </p>
              <p style={{ fontSize: 14, color: "#6B7280" }}>
                Rock Hill, SC 29730
              </p>
            </div>

            {/* Phone */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 12,
                padding: "24px 28px",
                boxShadow: "0 2px 12px rgba(27,60,110,0.06)",
                borderLeft: "4px solid #00A99D",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#00A99D",
                  marginBottom: 8,
                }}
              >
                Phone
              </p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#1B3C6E",
                  marginBottom: 2,
                }}
              >
                248-522-6740
              </p>
              <p style={{ fontSize: 14, color: "#6B7280" }}>
                Available Mon-Fri, 9am-6pm EST
              </p>
            </div>

            {/* Email */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 12,
                padding: "24px 28px",
                boxShadow: "0 2px 12px rgba(27,60,110,0.06)",
                borderLeft: "4px solid #00A99D",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#00A99D",
                  marginBottom: 8,
                }}
              >
                Email
              </p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#1B3C6E",
                  marginBottom: 2,
                }}
              >
                info@rits-it.com
              </p>
              <p style={{ fontSize: 14, color: "#6B7280" }}>
                We respond within 24 hours
              </p>
            </div>

            {/* Promise card */}
            <div
              style={{
                background: "#1B3C6E",
                borderRadius: 12,
                padding: "24px 28px",
                boxShadow: "0 2px 12px rgba(27,60,110,0.15)",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#00A99D",
                  marginBottom: 10,
                }}
              >
                Our Promise
              </p>
              <p
                style={{
                  fontSize: 15,
                  color: "#ffffff",
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                We respond to every inquiry within 24 hours. No exceptions.
              </p>
            </div>

            {/* Social links */}
            <div
              style={{
                display: "flex",
                gap: 16,
                paddingTop: 8,
              }}
            >
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/rits-it"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#ffffff",
                  borderRadius: 8,
                  padding: "10px 18px",
                  boxShadow: "0 1px 8px rgba(27,60,110,0.08)",
                  textDecoration: "none",
                  color: "#1B3C6E",
                  fontSize: 13,
                  fontWeight: 600,
                  transition: "box-shadow 0.2s",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#0077B5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com/ritsit"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#ffffff",
                  borderRadius: 8,
                  padding: "10px 18px",
                  boxShadow: "0 1px 8px rgba(27,60,110,0.08)",
                  textDecoration: "none",
                  color: "#1B3C6E",
                  fontSize: 13,
                  fontWeight: 600,
                  transition: "box-shadow 0.2s",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ background: "#F1F5F9", padding: "80px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#00A99D",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            FAQs
          </p>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 800,
              color: "#1B3C6E",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Common questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  borderRadius: 12,
                  boxShadow: "0 1px 8px rgba(27,60,110,0.06)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1B3C6E",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: openFaq === i ? "#00A99D" : "#EFF6FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform:
                          openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s",
                      }}
                    >
                      <path
                        d="M2 5L7 10L12 5"
                        stroke={openFaq === i ? "#ffffff" : "#1B3C6E"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {openFaq === i && (
                  <div
                    style={{
                      padding: "0 24px 20px",
                      fontSize: 14,
                      color: "#4B5563",
                      lineHeight: 1.75,
                      borderTop: "1px solid #F3F4F6",
                      paddingTop: 16,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
