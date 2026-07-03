"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Services", href: "/services", mega: true },
  { label: "Products", href: "/products/noc-command", mega: false },
  { label: "Industries", href: "/industries", mega: true },
  { label: "Insights", href: "/insights", mega: false },
  { label: "About", href: "/about", mega: false },
  { label: "Careers", href: "/careers", mega: false },
];

const SERVICE_COLUMNS = [
  {
    category: "Talent",
    accent: "#00A99D",
    links: [
      { label: "Staffing Solutions", href: "/services/staff-augmentation" },
      { label: "Non-IT Staffing", href: "/services/non-it-staffing" },
      { label: "Recruitment Process Outsourcing", href: "/services/staff-augmentation#how-we-vet" },
      { label: "Contract-to-Hire", href: "/services/staff-augmentation#contract-to-hire" },
    ],
  },
  {
    category: "Technology",
    accent: "#60a5fa",
    links: [
      { label: "NOC Command (Product)", href: "/products/noc-command" },
      { label: "Software Development", href: "/services/software-solutions" },
      { label: "AI & Machine Learning", href: "/services/ai-ml" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
      { label: "Product Engineering", href: "/services/product-development" },
      { label: "Backend & API Engineering", href: "/services/software-solutions#backend" },
      { label: "Mobile Development", href: "/services/software-solutions#mobile" },
    ],
  },
  {
    category: "Transformation",
    accent: "#a78bfa",
    links: [
      { label: "Digital Transformation", href: "/services/digital-transformation" },
      { label: "System Integrations", href: "/services/software-solutions" },
      { label: "Process Automation", href: "/services/ai-ml" },
      { label: "Legacy Modernization", href: "/services/digital-transformation" },
    ],
  },
  {
    category: "Why RIT",
    accent: "#34d399",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/services/software-solutions" },
      { label: "Case Studies", href: "/insights" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

const INDUSTRY_COLUMNS = [
  {
    category: "Financial",
    accent: "#34d399",
    links: [
      { label: "FinTech", href: "/industries/fintech" },
      { label: "Banking & Lending", href: "/industries/fintech" },
      { label: "Wealth Management", href: "/industries/fintech" },
      { label: "Insurance Tech", href: "/industries/fintech" },
    ],
  },
  {
    category: "Healthcare & Life Sciences",
    accent: "#f472b6",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Telehealth", href: "/industries/healthcare" },
      { label: "Clinical Systems", href: "/industries/healthcare" },
      { label: "Pharma & Biotech", href: "/industries/healthcare" },
    ],
  },
  {
    category: "Commerce & Retail",
    accent: "#fb923c",
    links: [
      { label: "E-Commerce", href: "/industries/ecommerce" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Omnichannel Experience", href: "/industries/retail" },
      { label: "Logistics & Supply Chain", href: "/industries/logistics" },
    ],
  },
  {
    category: "Enterprise & Public Sector",
    accent: "#a78bfa",
    links: [
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Government", href: "/industries/government" },
      { label: "Education", href: "/industries/education" },
      { label: "Energy & Utilities", href: "/industries/energy" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0f2447] text-white py-2 px-6 lg:px-10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-xs text-white/60">Trusted technology partner for 50+ companies worldwide</p>
          <div className="flex items-center gap-6 text-xs">
            <a href="tel:+12485226740" className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 12 19.79 19.79 0 011.52 3.46a2 2 0 011.99-2.19h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006.18 6.18l.81-.81a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              248-522-6740
            </a>
            <a href="mailto:info@rits-it.com" className="text-white/70 hover:text-white transition-colors">info@rits-it.com</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-md" : "border-b border-gray-100"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-18 py-3">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3 flex-shrink-0">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="5" fill="#1B3C6E"/>
                <path d="M10 10H22C25.3 10 28 12.7 28 16C28 18.4 26.6 20.5 24.5 21.5L28.5 30H23L19.5 22H15V30H10V10Z" fill="white"/>
                <rect x="15" y="14" width="7" height="4" rx="2" fill="#00A99D"/>
                <path d="M15 24L19.5 20.5L24 24H21.5V30H17.5V24H15Z" fill="#00A99D"/>
              </svg>
              <div>
                <div className="text-[#1B3C6E] font-black text-base leading-tight tracking-tight">RESOURCE</div>
                <div className="text-[#00A99D] font-semibold text-[9px] tracking-[0.15em] uppercase leading-tight">Innovative Technologies</div>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative" onMouseEnter={() => setActiveMenu(link.mega ? link.label : null)}>
                  <a
                    href={link.href}
                    className={`px-4 py-5 text-sm font-600 font-semibold transition-colors flex items-center gap-1 ${
                      activeMenu === link.label ? "text-[#1B3C6E]" : "text-gray-700 hover:text-[#1B3C6E]"
                    }`}
                  >
                    {link.label}
                    {link.mega && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={`transition-transform ${activeMenu === link.label ? "rotate-180" : ""}`}>
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </a>
                  {/* Underline indicator */}
                  {activeMenu === link.label && (
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#00A99D]" />
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Dark/Light toggle */}
              <button
                onClick={() => setDark(!dark)}
                title={dark ? "Switch to light mode" : "Switch to dark mode"}
                className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none flex-shrink-0"
                style={{ background: dark ? "#1B3C6E" : "#e2e8f0" }}
              >
                <span
                  className="absolute top-1 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-md"
                  style={{
                    left: dark ? "calc(100% - 24px)" : "4px",
                    background: dark ? "#00A99D" : "white",
                  }}
                >
                  {dark ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="white"/>
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="5" fill="#f59e0b"/>
                      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </span>
              </button>
              <a href="/contact" className="btn-primary">
                Talk to an Expert
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-gray-600 hover:text-[#1B3C6E] transition-colors p-2">
              {mobileOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              }
            </button>
          </div>
        </div>

        {/* Services mega menu */}
        {activeMenu === "Services" && (
          <div className="absolute left-0 right-0 z-50 shadow-2xl" style={{ background: "#0d1a2e" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
              <div className="grid grid-cols-4 gap-10">
                {SERVICE_COLUMNS.map((col) => (
                  <div key={col.category}>
                    {/* Category header */}
                    <p className="font-black text-white text-sm mb-1 tracking-wide">{col.category}</p>
                    <div className="h-0.5 w-8 mb-5 rounded-full" style={{ background: col.accent }} />
                    {/* Links */}
                    <div className="flex flex-col gap-1">
                      {col.links.map((link) => (
                        <a key={link.label} href={link.href}
                          className="text-sm py-1.5 transition-all duration-150 hover:translate-x-1"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Bottom bar */}
              <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between">
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Trusted by 50+ companies worldwide</p>
                <a href="/contact" className="flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-lg transition-all" style={{ background: "#00A99D", color: "white" }}>
                  Talk to an Expert
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Industries mega menu */}
        {activeMenu === "Industries" && (
          <div className="absolute left-0 right-0 z-50 shadow-2xl" style={{ background: "#0d1a2e" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
              <div className="grid grid-cols-4 gap-10">
                {INDUSTRY_COLUMNS.map((col) => (
                  <div key={col.category}>
                    <p className="font-black text-white text-sm mb-1 tracking-wide">{col.category}</p>
                    <div className="h-0.5 w-8 mb-5 rounded-full" style={{ background: col.accent }} />
                    <div className="flex flex-col gap-1">
                      {col.links.map((link) => (
                        <a key={link.label} href={link.href}
                          className="text-sm py-1.5 transition-all duration-150 hover:translate-x-1"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between">
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Solutions tailored to your industry</p>
                <a href="/contact" className="flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-lg transition-all" style={{ background: "#00A99D", color: "white" }}>
                  Talk to an Expert
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-semibold text-gray-700 hover:text-[#1B3C6E] border-b border-gray-50 transition-colors">
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
                  Talk to an Expert
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
