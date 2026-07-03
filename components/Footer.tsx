"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ backgroundColor: "#0f2447" }} className="text-white pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        {/* 5-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">

          {/* Column 1 - Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            {/* Inline SVG Logo */}
            <div>
              <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="6" fill="#1e5fd4" />
                <path
                  d="M10 10 h14 a10 10 0 0 1 0 20 h-4 l10 8 h-8 l-9-8 v8 h-7 z m7 6 v8 h7 a4 4 0 0 0 0-8 z"
                  fill="white"
                />
                <rect x="36" y="36" width="8" height="8" rx="2" fill="#00cfb4" />
              </svg>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Building tomorrow&apos;s technology, today.
            </p>

            <address className="not-italic text-sm space-y-1" style={{ color: "rgba(255,255,255,0.55)" }}>
              <p>331 E Main Street, Suite 200</p>
              <p>Rock Hill, SC 29730</p>
              <p className="mt-2">
                <a href="tel:2485226740" className="hover:text-white transition-colors">248-522-6740</a>
              </p>
              <p>
                <a href="mailto:info@rits-it.com" className="hover:text-white transition-colors">info@rits-it.com</a>
              </p>
            </address>

            {/* Social Icons */}
            <div className="flex gap-4 mt-1">
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="transition-opacity hover:opacity-80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="#0077B5" />
                  <path
                    d="M7.5 9.5h-2v7h2v-7zm-1-3a1.15 1.15 0 1 0 0 2.3A1.15 1.15 0 0 0 6.5 6.5zM16.5 9.3c-1.4 0-2.1.6-2.5 1.1V9.5h-2v7h2v-3.8c0-.9.2-2.1 1.5-2.1s1.5 1.1 1.5 2v3.9h2v-4.1c0-2.4-1.2-3.1-2.5-3.1z"
                    fill="white"
                  />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="transition-opacity hover:opacity-80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="#1DA1F2" />
                  <path
                    d="M19 7.5a6.3 6.3 0 0 1-1.8.5 3.1 3.1 0 0 0 1.4-1.7c-.6.4-1.3.6-2 .8a3.1 3.1 0 0 0-5.3 2.8A8.8 8.8 0 0 1 5.7 7a3.1 3.1 0 0 0 1 4.1 3 3 0 0 1-1.4-.4v.1a3.1 3.1 0 0 0 2.5 3 3.1 3.1 0 0 1-1.4.1 3.1 3.1 0 0 0 2.9 2.1A6.2 6.2 0 0 1 5 17.3a8.8 8.8 0 0 0 4.7 1.4c5.7 0 8.8-4.7 8.8-8.8v-.4A6.3 6.3 0 0 0 20 8a6.2 6.2 0 0 1-1 .5z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Services */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "#00cfb4" }}>
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Software Solutions", href: "/services/software-solutions" },
                { label: "Product Development", href: "/services/product-development" },
                { label: "AI & Machine Learning", href: "/services/ai-ml" },
                { label: "Staff Augmentation", href: "/services/staff-augmentation" },
                { label: "Cloud & DevOps", href: "#" },
                { label: "Digital Transformation", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Industries */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "#00cfb4" }}>
              Industries
            </h3>
            <ul className="space-y-3">
              {[
                "Financial Services",
                "Healthcare",
                "E-Commerce",
                "Manufacturing",
                "Government",
                "Education",
              ].map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "#00cfb4" }}>
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Insights", href: "/insights" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Use", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 - Contact CTA */}
          <div className="lg:col-span-1">
            <div
              className="rounded-xl p-6 flex flex-col gap-4"
              style={{ backgroundColor: "#1B3C6E" }}
            >
              <h3 className="text-lg font-bold text-white leading-snug">
                Ready to build?
              </h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Talk to our team today.
              </p>
              <a
                href="/contact"
                className="inline-block text-center text-sm font-semibold py-2.5 px-5 rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#00cfb4", color: "#0f2447" }}
              >
                Get in Touch
              </a>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                or call{" "}
                <a
                  href="tel:2485226740"
                  className="underline hover:text-white transition-colors"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  248-522-6740
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
        >
          <p>&copy; 2025 Resource Innovative Technologies. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
