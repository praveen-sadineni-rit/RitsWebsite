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
    accent: "#E8B53D",
    links: [
      { label: "Staffing Solutions", href: "/services/staff-augmentation" },
      { label: "Non-IT Staffing", href: "/services/non-it-staffing" },
      { label: "Recruitment Process Outsourcing", href: "/services/staff-augmentation#how-we-vet" },
      { label: "Contract-to-Hire", href: "/services/staff-augmentation#contract-to-hire" },
    ],
  },
  {
    category: "Technology",
    accent: "#86A8CE",
    links: [
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
    accent: "#C99A2E",
    links: [
      { label: "Digital Transformation", href: "/services/digital-transformation" },
      { label: "System Integrations", href: "/services/software-solutions#system-integrations" },
      { label: "Process Automation", href: "/services/digital-transformation#process-automation" },
      { label: "Legacy Modernization", href: "/services/digital-transformation#legacy-modernization" },
    ],
  },
  {
    category: "Why RIT",
    accent: "#5E82AE",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/services/software-solutions#process" },
      { label: "Case Studies", href: "/insights" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

const INDUSTRY_COLUMNS = [
  {
    category: "Financial",
    accent: "#5E82AE",
    links: [
      { label: "FinTech", href: "/industries/fintech" },
      { label: "Banking & Lending", href: "/industries/fintech#banking" },
      { label: "Wealth Management", href: "/industries/fintech#wealth-management" },
      { label: "Insurance Tech", href: "/industries/fintech#insurance-tech" },
    ],
  },
  {
    category: "Healthcare & Life Sciences",
    accent: "#F3C34E",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Telehealth", href: "/industries/healthcare#telehealth" },
      { label: "Clinical Systems", href: "/industries/healthcare#clinical-systems" },
      { label: "Pharma & Biotech", href: "/industries/healthcare#pharma-biotech" },
    ],
  },
  {
    category: "Commerce & Retail",
    accent: "#E8B53D",
    links: [
      { label: "E-Commerce", href: "/industries/ecommerce" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Omnichannel Experience", href: "/industries/retail#omnichannel" },
      { label: "Logistics & Supply Chain", href: "/industries/logistics" },
    ],
  },
  {
    category: "Enterprise & Public Sector",
    accent: "#C99A2E",
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
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
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

            {/* Logo — white version on the dark navbar, dark version on light */}
            <a href="/" className="flex items-center flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dark ? "/rits-logo-white.png" : "/rits-logo-dark.png"}
                alt="Resource Innovative Technologies"
                className="h-9 w-auto"
              />
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
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#E8B53D]" />
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
                    background: dark ? "#E8B53D" : "white",
                  }}
                >
                  {dark ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="white"/>
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="5" fill="#E8B53D"/>
                      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#E8B53D" strokeWidth="2" strokeLinecap="round"/>
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
                <a href="/contact" className="flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-lg transition-all" style={{ background: "#E8B53D", color: "white" }}>
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
                <a href="/contact" className="flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-lg transition-all" style={{ background: "#E8B53D", color: "white" }}>
                  Talk to an Expert
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => {
                const columns = link.label === "Services" ? SERVICE_COLUMNS : link.label === "Industries" ? INDUSTRY_COLUMNS : null;
                const isOpen = mobileAccordion === link.label;
                if (!link.mega || !columns) {
                  return (
                    <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-semibold text-gray-700 hover:text-[#1B3C6E] border-b border-gray-50 transition-colors">
                      {link.label}
                    </a>
                  );
                }
                return (
                  <div key={link.label} className="border-b border-gray-50">
                    <button
                      onClick={() => setMobileAccordion(isOpen ? null : link.label)}
                      className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-700 hover:text-[#1B3C6E] transition-colors"
                    >
                      {link.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="pb-3 pl-3 space-y-4">
                        {columns.map((col) => (
                          <div key={col.category}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: col.accent }} />
                              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{col.category}</p>
                            </div>
                            <div className="flex flex-col">
                              {col.links.map((sub) => (
                                <a
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                                  className="py-2 text-sm text-gray-600 hover:text-[#1B3C6E] transition-colors"
                                >
                                  {sub.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                        <a href={link.href} onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-1 text-sm font-bold text-[#E8B53D]">
                          View all {link.label}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
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
