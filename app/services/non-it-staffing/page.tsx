"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const ROLES = [
  {
    title: "Finance & Accounting",
    desc: "AP/AR clerks, staff accountants, controllers, bookkeepers, payroll specialists.",
    color: "#00A99D", bg: "#e6f7f6",
    icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    title: "HR & Administration",
    desc: "HR generalists, recruiters, office managers, executive assistants.",
    color: "#2563eb", bg: "#eef4ff",
    icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
  },
  {
    title: "Customer Support",
    desc: "Call center reps, customer success, technical support, help desk.",
    color: "#7c3aed", bg: "#f3eeff",
    icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    title: "Sales & Marketing",
    desc: "Sales reps, account managers, marketing coordinators, SDRs.",
    color: "#ea580c", bg: "#fff7ed",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    title: "Healthcare",
    desc: "Medical assistants, billing & coding specialists, front office staff.",
    color: "#db2777", bg: "#fff0f8",
    icon: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    title: "Supply Chain & Logistics",
    desc: "Warehouse supervisors, dispatchers, procurement, inventory coordinators.",
    color: "#059669", bg: "#edfaf5",
    icon: <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
];

const INDUSTRIES = [
  "Construction", "Manufacturing", "Retail & E-Commerce", "Banking & Financial Services", "Logistics & Warehousing", "Healthcare & Life Sciences",
];

const WHY_US = [
  { title: "Fast turnaround time", desc: "Shortlisted candidates in days, not weeks." },
  { title: "Pre-screened candidates", desc: "Every profile is vetted for skills and reliability before it reaches you." },
  { title: "Flexible hiring models", desc: "Contract, contract-to-hire, or direct full-time placement." },
  { title: "Volume hiring experience", desc: "From a single hire to building out entire operational teams." },
];

export default function NonITStaffingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section
          style={{ background: "linear-gradient(135deg, #0f2447 0%, #0f2447 45%, #1B3C6E 100%)", position: "relative", overflow: "hidden" }}
          className="py-24 md:py-32"
        >
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", top: "-80px", right: "-80px", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(0,169,157,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="max-w-5xl mx-auto px-6 lg:px-10 relative text-center">
            <p className="section-eyebrow" style={{ color: "#00A99D" }}>Non-IT Staffing</p>
            <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
              Great teams aren&apos;t just engineers.{" "}
              <span style={{ color: "#00A99D" }}>We staff the rest too.</span>
            </h1>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", maxWidth: "58ch", margin: "0 auto 2.5rem" }}>
              From finance and HR to customer support and logistics, we help organizations build strong operational teams with pre-screened, reliable talent.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "2.5rem" }}>
              {[
                { value: "Multiple domains", label: "roles covered" },
                { value: "Pre-screened", label: "candidates only" },
                { value: "Flexible", label: "contract, C2H, full-time" },
              ].map((s) => (
                <div key={s.value} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 18px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "6px" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#00cfb4", letterSpacing: "-0.01em" }}>{s.value}</span>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/contact" className="btn-primary">Request Talent Now <IconArrow /></a>
              <a href="#roles" className="btn-outline-white">See roles we cover</a>
            </div>
          </div>
        </section>

        {/* ROLES WE COVER */}
        <section id="roles" style={{ background: "#f8f9fa" }} className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div style={{ marginBottom: "3rem", textAlign: "center" }}>
              <p className="section-eyebrow" style={{ color: "#00A99D" }}>Roles we cover</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em" }}>
                Specialized staffing across every operational function.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {ROLES.map((role) => (
                <div
                  key={role.title}
                  style={{ background: "#ffffff", border: "1px solid #dce4f0", borderRadius: "16px", padding: "28px", transition: "box-shadow 0.2s ease, transform 0.2s ease" }}
                  className="hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: role.bg, color: role.color }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{role.icon}</svg>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#0f2447", marginBottom: "8px" }}>{role.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6 }}>{role.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES WE SERVE */}
        <section style={{ background: "#ffffff" }} className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
              <p className="section-eyebrow" style={{ color: "#00A99D" }}>Industries we serve</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em" }}>
                We understand your industry&apos;s hiring urgency.
              </h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
              {INDUSTRIES.map((ind) => (
                <span
                  key={ind}
                  style={{ fontSize: "0.9rem", fontWeight: 600, padding: "10px 20px", borderRadius: "100px", background: "#edf2fb", color: "#1B3C6E", border: "1px solid #dce4f0" }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)" }} className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div style={{ marginBottom: "3rem", textAlign: "center" }}>
              <p className="section-eyebrow" style={{ color: "#00cfb4" }}>Why choose us</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                Staffing that keeps pace with your business.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              {WHY_US.map((item) => (
                <div key={item.title} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", padding: "24px" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(0,207,180,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#00cfb4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#ffffff", marginBottom: "8px" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#f8f9fa" }} className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#0f2447", marginBottom: "1rem" }}>
              Need to fill a role fast?
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "2rem" }}>
              Tell us who you need. We&apos;ll have qualified, pre-screened candidates in front of you within days.
            </p>
            <a href="/contact" className="btn-primary" style={{ display: "inline-flex" }}>Request Talent Now <IconArrow /></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
