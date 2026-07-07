"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const stats = [
  { value: "50+", label: "Enterprise Clients" },
  { value: "200+", label: "Projects Delivered" },
  { value: "10+", label: "Years in Business" },
  { value: "15", label: "Countries Served" },
];

const pillars = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke="#1B3C6E" strokeWidth="2" />
        <path d="M10 16l4 4 8-8" stroke="#1B3C6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Client Success",
    description:
      "Every engagement is measured by one thing: did our client win? We tie our success directly to theirs.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4C16 4 8 10 8 18a8 8 0 0016 0C24 10 16 4 16 4z" stroke="#1B3C6E" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="16" cy="18" r="3" stroke="#1B3C6E" strokeWidth="2" />
      </svg>
    ),
    title: "People First",
    description:
      "We invest in the humans behind the work, our consultants, our clients, and the teams we build together.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="24" height="16" rx="2" stroke="#1B3C6E" strokeWidth="2" />
        <path d="M10 16h12M16 12v8" stroke="#1B3C6E" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Technical Excellence",
    description:
      "Senior talent only. We never compromise on quality because our clients' systems can't afford shortcuts.",
  },
];

const timeline = [
  {
    year: "2014",
    title: "Founded in Rock Hill, SC",
    description:
      "Resource Innovative Technologies was established with a core focus on connecting exceptional technology talent with businesses that need them most.",
  },
  {
    year: "2016",
    title: "Expanded into Full Software Development",
    description:
      "We broadened our capabilities to include end-to-end software development services, growing our team and our client portfolio.",
  },
  {
    year: "2018",
    title: "Launched AI & ML Practice",
    description:
      "Early movers in enterprise AI, we built our artificial intelligence and machine learning practice before it became mainstream.",
  },
  {
    year: "2020",
    title: "Remote-First Pivot",
    description:
      "We adapted rapidly during COVID-19, enabling our clients to maintain momentum with fully distributed, high-performing teams.",
  },
  {
    year: "2022",
    title: "50+ Enterprise Clients Across 15 Countries",
    description:
      "Our global reach solidified. From startups to Fortune 500 companies, we became a trusted partner across industries and continents.",
  },
  {
    year: "2024",
    title: "Product Development Studio Launched",
    description:
      "We launched our dedicated product studio, helping clients go from idea to production-ready software with speed and precision.",
  },
];

const values = [
  {
    title: "Integrity",
    description: "We do what we say. Always. No surprises, no fine print.",
  },
  {
    title: "Excellence",
    description: "Senior only, no exceptions. Every engagement deserves our best.",
  },
  {
    title: "Partnership",
    description: "We succeed when our clients succeed. That is not a tagline, it is how we operate.",
  },
  {
    title: "Innovation",
    description: "Staying ahead so our clients can too. We bring what is next, not what was.",
  },
];

// Land regions as [minLon, maxLon, minLat, maxLat] boxes — used for dot-grid land check
const LAND_BOXES: [number,number,number,number][] = [
  // India
  [68,98,8,37],
  // Southeast Asia
  [99,110,1,22],[100,120,1,6],[118,126,8,20],
  // China / East Asia
  [74,135,20,54],
  // Japan
  [129,146,30,46],
  // Korea
  [126,130,34,38],
  // Middle East / Arabian Peninsula
  [35,60,12,38],
  // Turkey / Eastern Europe
  [26,42,36,43],
  // East Africa / Horn
  [32,52,-5,18],
  // Central/South Africa
  [10,42,-35,5],
  // West Africa
  [-18,10,-5,20],
  // North Africa
  [-18,52,10,38],
  // Australia
  [113,154,-40,-10],
  // New Guinea
  [131,150,-10,-1],
  // Indonesia (Sumatra)
  [95,107,-6,6],
  // Indonesia (Java/Borneo)
  [106,120,-8,4],
  // Europe
  [-10,32,35,72],
  // Scandinavia
  [5,32,55,72],
  // Russia/Central Asia
  [30,180,40,75],
  // North America
  [-168,-52,15,75],
  // Central America
  [-92,-60,8,18],
  // South America
  [-82,-35,-55,12],
  // Greenland
  [-55,-18,60,84],
  // Sri Lanka
  [80,82,6,10],
  // UK/Ireland
  [-8,2,50,61],
  // Madagascar
  [43,51,-25,-12],
  // New Zealand
  [166,178,-47,-34],
  // Philippines
  [117,127,5,20],
];

function isLand(lon: number, lat: number): boolean {
  return LAND_BOXES.some(([lo1,lo2,la1,la2]) => lon>=lo1 && lon<=lo2 && lat>=la1 && lat<=la2);
}

// Pre-build dot grid (4-degree resolution)
const DOT_GRID: [number,number,boolean][] = [];
for (let lat = -88; lat <= 88; lat += 3) {
  for (let lon = -178; lon <= 178; lon += 3) {
    DOT_GRID.push([lon, lat, isLand(lon, lat)]);
  }
}

function AnimatedGlobe() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = 440, H = 440;
    canvas.width = W; canvas.height = H;
    const cx = W/2, cy = H/2, R = 195;

    const project = (lon: number, lat: number, rotDeg: number) => {
      const lo = (lon + rotDeg) * Math.PI/180;
      const la = lat * Math.PI/180;
      const x = R * Math.cos(la) * Math.sin(lo);
      const y = -R * Math.sin(la);
      const z = R * Math.cos(la) * Math.cos(lo);
      return { x: cx + x, y: cy + y, z };
    };

    const offices = [
      { lon: 78.5, lat: 17.4, color: "#00cfb4" },
      { lon: -80.8, lat: 35.2, color: "#60a5fa" },
    ];

    let rot = 55; // start near India
    let frame = 0, raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;
      rot -= 0.2;

      // Ocean sphere gradient
      const ocean = ctx.createRadialGradient(cx - R*0.3, cy - R*0.3, R*0.05, cx, cy, R);
      ocean.addColorStop(0, "#1e3f8a");
      ocean.addColorStop(0.55, "#0c1f5c");
      ocean.addColorStop(1, "#050d2e");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2);
      ctx.fillStyle = ocean; ctx.fill();

      // Clip all inner drawing to the sphere
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.clip();

      // Dot grid
      DOT_GRID.forEach(([lon, lat, land]) => {
        const p = project(lon, lat, rot);
        if (p.z <= 0) return; // back of globe
        // fade dots near edge by depth
        const depth = p.z / R; // 0..1
        if (land) {
          // land dots — lighter blue-gray
          const alpha = 0.55 + depth * 0.45;
          ctx.fillStyle = `rgba(140,165,220,${alpha})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI*2); ctx.fill();
        } else {
          // ocean dots — subtle grid
          const alpha = 0.06 + depth * 0.06;
          ctx.fillStyle = `rgba(80,120,220,${alpha})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 0.8, 0, Math.PI*2); ctx.fill();
        }
      });

      // Highlight India region with brighter dots + glow
      DOT_GRID.forEach(([lon, lat]) => {
        if (lon < 68 || lon > 98 || lat < 6 || lat > 37) return;
        if (!isLand(lon, lat)) return;
        const p = project(lon, lat, rot);
        if (p.z <= 0) return;
        ctx.fillStyle = "rgba(180,210,255,0.85)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI*2); ctx.fill();
      });

      ctx.restore(); // end clip

      // Atmosphere glow ring
      const atm = ctx.createRadialGradient(cx, cy, R - 2, cx, cy, R + 22);
      atm.addColorStop(0, "rgba(80,130,255,0.28)");
      atm.addColorStop(0.4, "rgba(60,100,200,0.12)");
      atm.addColorStop(1, "rgba(30,60,160,0)");
      ctx.beginPath(); ctx.arc(cx, cy, R + 22, 0, Math.PI*2);
      ctx.fillStyle = atm; ctx.fill();

      // Specular highlight (top-left shine)
      const shine = ctx.createRadialGradient(cx - R*0.38, cy - R*0.38, 0, cx - R*0.2, cy - R*0.2, R*0.7);
      shine.addColorStop(0, "rgba(180,210,255,0.13)");
      shine.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2);
      ctx.fillStyle = shine; ctx.fill();

      // Office markers
      offices.forEach((city, i) => {
        const p = project(city.lon, city.lat, rot);
        if (p.z <= 0) return;
        const pulse = 0.65 + 0.35 * Math.sin(frame * 0.07 + i * 2.5);
        // ring
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18 * pulse);
        g.addColorStop(0, city.color + "bb"); g.addColorStop(1, city.color + "00");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, 18 * pulse, 0, Math.PI*2); ctx.fill();
        // dot
        ctx.fillStyle = city.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI*2); ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ borderRadius: "50%", boxShadow: "0 0 50px rgba(50,100,255,0.25), 0 0 100px rgba(0,60,140,0.18), 0 20px 60px rgba(0,0,0,0.3)" }}>
        <canvas ref={ref} style={{ display: "block", borderRadius: "50%", background: "radial-gradient(ellipse at 38% 32%, #0d2060 0%, #040c20 70%)" }} />
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
        {[{ color: "#00cfb4", label: "Hyderabad, India" }, { color: "#60a5fa", label: "Rock Hill, USA" }].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(15,25,60,0.7)", borderRadius: 99, padding: "5px 14px", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section style={{ backgroundColor: "#ffffff" }} className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p
            style={{
              color: "#1B3C6E",
              fontWeight: 600,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Our Story
          </p>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: text */}
            <div className="flex-1">
              <h1
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                }}
              >
                We started with a simple belief: great technology starts with great people.
              </h1>
              <p style={{ color: "#475569", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                Resource Innovative Technologies was founded on the conviction that the right talent, matched thoughtfully,
                can transform any organization. Over a decade later, that belief drives everything we do, from staffing
                senior engineers to building full-scale software products for enterprises worldwide.
              </p>

              {/* Animated chips */}
              <style>{`
                @keyframes chipIn { from { opacity:0; transform:translateY(12px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
                @keyframes pulse-ring { 0%,100% { box-shadow: 0 0 0 0 var(--ring); } 50% { box-shadow: 0 0 0 6px transparent; } }
                .about-chip { animation: chipIn 0.5s ease forwards; opacity: 0; }
                .about-chip:nth-child(1) { animation-delay: 0.1s; }
                .about-chip:nth-child(2) { animation-delay: 0.2s; }
                .about-chip:nth-child(3) { animation-delay: 0.3s; }
                .about-chip:nth-child(4) { animation-delay: 0.4s; }
                .about-chip:nth-child(5) { animation-delay: 0.5s; }
              `}</style>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {[
                  { icon: "🤝", label: "50+ Clients", bg: "linear-gradient(135deg,#00A99D,#0284c7)", ring: "rgba(0,169,157,0.35)" },
                  { icon: "🌍", label: "Global Reach", bg: "linear-gradient(135deg,#f59e0b,#ef4444)", ring: "rgba(245,158,11,0.35)" },
                  { icon: "💡", label: "AI-First", bg: "linear-gradient(135deg,#10b981,#0ea5e9)", ring: "rgba(16,185,129,0.35)" },
                ].map((chip) => (
                  <div key={chip.label} className="about-chip" style={{ "--ring": chip.ring } as React.CSSProperties}>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      background: chip.bg, borderRadius: 99,
                      padding: "8px 16px",
                      boxShadow: `0 4px 14px ${chip.ring}`,
                      animation: `pulse-ring 2.5s ease infinite`,
                      cursor: "default",
                    }}>
                      <span style={{ fontSize: 16 }}>{chip.icon}</span>
                      <span style={{ color: "white", fontSize: 12, fontWeight: 700, letterSpacing: "0.02em" }}>{chip.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: globe + stats card */}
            <div className="flex flex-col gap-6" style={{ flexShrink: 0, minWidth: "300px" }}>
              <div className="hidden lg:flex items-center justify-center">
                <AnimatedGlobe />
              </div>
            <div
              style={{
                backgroundColor: "#1B3C6E",
                borderRadius: "1rem",
                padding: "2.5rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                }}
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p
                      style={{
                        fontSize: "2.25rem",
                        fontWeight: 800,
                        color: "#ffffff",
                        lineHeight: 1,
                        marginBottom: "0.4rem",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p style={{ color: "#93c5fd", fontSize: "0.85rem", fontWeight: 500 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section style={{ backgroundColor: "#f8fafc" }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p
            style={{
              fontSize: "clamp(1.35rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.5,
              maxWidth: "780px",
              margin: "0 auto 3.5rem",
              fontStyle: "italic",
            }}
          >
            &ldquo;Our mission is to connect the right talent with the right opportunity, and build technology that
            genuinely moves businesses forward.&rdquo;
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "2rem",
              textAlign: "left",
            }}
          >
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "0.75rem",
                  padding: "2rem",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>{pillar.icon}</div>
                <h3 style={{ fontWeight: 700, color: "#0f172a", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  {pillar.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.7 }}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE'RE MADE OF — Bento Grid */}
      <section style={{ background: "#f8fafc" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00A99D", marginBottom: 10 }}>What we&apos;re made of</p>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#0f172a", margin: 0 }}>The pillars behind everything we build.</h2>
          </div>

          {/* Bento grid */}
          <style>{`
            @media (max-width: 768px) {
              .bento-grid { grid-template-columns: 1fr !important; }
              .bento-grid > * { grid-column: auto !important; grid-row: auto !important; min-height: 0 !important; }
            }
          `}</style>
          <div className="bento-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: "auto", gap: 16 }}>

            {/* Big hero card — Talent */}
            <div style={{ gridColumn: "span 5", gridRow: "span 2", background: "linear-gradient(135deg,#0f2447 0%,#1B3C6E 100%)", borderRadius: 20, padding: 36, position: "relative", overflow: "hidden", minHeight: 280 }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(0,169,157,0.12)" }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(0,169,157,0.08)" }} />
              <div style={{ fontSize: 42, marginBottom: 16 }}>🎯</div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00cfb4", marginBottom: 10 }}>Talent First</p>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "white", lineHeight: 1.25, marginBottom: 14 }}>Senior engineers only. No exceptions.</h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>Every person we place or put on your project has 5+ years of hands-on experience. We don't use junior engineers to pad margins.</p>
            </div>

            {/* Speed card */}
            <div style={{ gridColumn: "span 4", background: "linear-gradient(135deg,#00A99D 0%,#0284c7 100%)", borderRadius: 20, padding: 28, position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⚡</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "white", marginBottom: 8 }}>5-Day Average Placement</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>From brief to shortlisted candidates in under a week. No slow agency cycles.</p>
            </div>

            {/* Global card */}
            <div style={{ gridColumn: "span 3", background: "linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)", borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ fontSize: 36 }}>🌍</div>
              <div>
                <p style={{ fontSize: "2rem", fontWeight: 900, color: "white", margin: "0 0 4px" }}>15</p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", margin: 0, fontWeight: 600 }}>Countries served</p>
              </div>
            </div>

            {/* AI-First */}
            <div style={{ gridColumn: "span 4", background: "white", border: "1px solid #e2e8f0", borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🧠</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f2447", marginBottom: 8 }}>AI-First Since 2018</h3>
              <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>We launched our AI & ML practice years before it became mainstream, not chasing trends, setting them.</p>
            </div>

            {/* Clients counter */}
            <div style={{ gridColumn: "span 3", background: "linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)", borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ fontSize: 36 }}>🤝</div>
              <div>
                <p style={{ fontSize: "2rem", fontWeight: 900, color: "white", margin: "0 0 4px" }}>50+</p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.85)", margin: 0, fontWeight: 600 }}>Enterprise clients</p>
              </div>
            </div>

            {/* Full-cycle card */}
            <div style={{ gridColumn: "span 7", background: "white", border: "1px solid #e2e8f0", borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", display: "flex", gap: 24, alignItems: "center" }}>
              <div style={{ fontSize: 48, flexShrink: 0 }}>🏗️</div>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f2447", marginBottom: 8 }}>End-to-End: Idea → Production</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>We cover the full cycle, staffing, software development, AI integration, DevOps, and post-launch support. One partner for everything tech.</p>
              </div>
            </div>

            {/* Products */}
            <div style={{ gridColumn: "span 5", background: "linear-gradient(135deg,#0f2447 0%,#1e3a5f 100%)", borderRadius: 20, padding: 28, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(0,169,157,0.1)" }} />
              <div style={{ fontSize: 36, marginBottom: 12 }}>🚀</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "white", marginBottom: 8 }}>Product Studio</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>Napkin sketch to market-ready product. Our dedicated studio takes you from 0 to launch with design, engineering, and strategy.</p>
              <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Discovery","Design","Build","Launch"].map(s => (
                  <span key={s} style={{ fontSize: 10, fontWeight: 700, color: "#00cfb4", background: "rgba(0,207,180,0.12)", border: "1px solid rgba(0,207,180,0.2)", borderRadius: 99, padding: "3px 8px" }}>{s}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: "linear-gradient(135deg,#0a1628 0%,#0f2447 50%,#0d1e3a 100%)", padding: "96px 24px", position: "relative", overflow: "hidden" }}>
        {/* Background pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(0,169,157,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <style>{`
          @keyframes drawLine { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }
          @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          @keyframes scaleIn { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }
          @keyframes spinDraw { from { stroke-dashoffset: 200; opacity:0; } to { stroke-dashoffset: 0; opacity:1; } }
          .val-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .val-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.4) !important; }
          .val-card:hover .val-svg path,
          .val-card:hover .val-svg circle,
          .val-card:hover .val-svg polyline,
          .val-card:hover .val-svg rect { animation: drawLine 0.6s ease forwards; }
          .val-card .val-svg path,
          .val-card .val-svg circle,
          .val-card .val-svg polyline,
          .val-card .val-svg rect { stroke-dasharray: 300; stroke-dashoffset: 0; transition: stroke 0.3s; }
        `}</style>

        <div className="max-w-6xl mx-auto" style={{ position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00cfb4", marginBottom: 10 }}>Our DNA</p>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "white", margin: 0 }}>What We Stand For</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
            {[
              {
                title: "Integrity",
                desc: "We do what we say. Always. No surprises, no fine print.",
                color: "#00cfb4",
                glow: "rgba(0,207,180,0.15)",
                svg: (
                  <svg className="val-svg" width="52" height="52" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#00cfb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="9 12 11 14 15 10" stroke="#00cfb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                title: "Excellence",
                desc: "Senior only, no exceptions. Every engagement deserves our best.",
                color: "#60a5fa",
                glow: "rgba(96,165,250,0.15)",
                svg: (
                  <svg className="val-svg" width="52" height="52" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                title: "Partnership",
                desc: "We succeed when our clients succeed. That is not a tagline, it is how we operate.",
                color: "#a78bfa",
                glow: "rgba(167,139,250,0.15)",
                svg: (
                  <svg className="val-svg" width="52" height="52" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="#a78bfa" strokeWidth="1.5"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                title: "Innovation",
                desc: "Staying ahead so our clients can too. We bring what is next, not what was.",
                color: "#f472b6",
                glow: "rgba(244,114,182,0.15)",
                svg: (
                  <svg className="val-svg" width="52" height="52" viewBox="0 0 24 24" fill="none">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map((v, i) => (
              <div key={v.title} className="val-card" style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(255,255,255,0.09)`,
                borderRadius: 18,
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
                animation: `fadeUp 0.5s ease forwards ${i * 0.1 + 0.1}s`,
                opacity: 0,
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              }}>
                {/* Glow bg circle */}
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: v.glow, filter: "blur(30px)", pointerEvents: "none" }} />
                {/* Animated SVG icon */}
                <div style={{ width: 56, height: 56, borderRadius: 14, background: v.glow, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, border: `1px solid ${v.color}30` }}>
                  {v.svg}
                </div>
                {/* Animated underline draw-on */}
                <h3 style={{ fontWeight: 800, color: "white", fontSize: "1.15rem", marginBottom: 6, position: "relative", display: "inline-block" }}>
                  {v.title}
                  <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 4 }} viewBox="0 0 100 4" preserveAspectRatio="none">
                    <path d="M0 2 Q50 0 100 2" stroke={v.color} strokeWidth="2.5" fill="none" strokeLinecap="round"
                      style={{ strokeDasharray: 110, strokeDashoffset: 110, animation: `drawLine 0.7s ease forwards ${i * 0.15 + 0.5}s` }} />
                  </svg>
                </h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.75, marginTop: 14, marginBottom: 0 }}>{v.desc}</p>
                {/* Bottom accent line */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${v.color}00, ${v.color}60, ${v.color}00)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section style={{ background: "linear-gradient(135deg,#f0f7ff 0%,#e8f8f7 50%,#f5f0ff 100%)" }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#00A99D", background:"rgba(0,169,157,0.1)", border:"1px solid rgba(0,169,157,0.25)", borderRadius:99, padding:"6px 16px", marginBottom:16 }}>
              🌐 Our Offices
            </span>
            <h2 style={{ fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:900, color:"#0f2447", marginBottom:12 }}>
              Two countries. One team.
            </h2>
            <p style={{ color:"#64748b", fontSize:"1rem", maxWidth:480, margin:"0 auto" }}>
              Our home base is in the Carolinas, but our engineers, delivery teams, and clients span the globe.
            </p>
          </div>

          {/* Two office cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* USA */}
            <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:20, padding:"32px 28px", position:"relative", overflow:"hidden", boxShadow:"0 4px 24px rgba(27,60,110,0.08)" }}>
              {/* Flag accent bar */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:"linear-gradient(90deg,#3C3B6E,#ffffff,#B22234)" }}/>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                <div style={{ width:52, height:52, borderRadius:14, overflow:"hidden", boxShadow:"0 6px 20px rgba(60,59,110,0.25)", flexShrink:0 }}>
                  <svg viewBox="0 0 7410 3900" width="52" height="52" style={{ display:"block" }}>
                    <rect width="7410" height="3900" fill="#b22234"/>
                    <g fill="#fff">
                      <rect y="300" width="7410" height="300"/><rect y="900" width="7410" height="300"/><rect y="1500" width="7410" height="300"/>
                      <rect y="2100" width="7410" height="300"/><rect y="2700" width="7410" height="300"/><rect y="3300" width="7410" height="300"/>
                    </g>
                    <rect width="2964" height="2100" fill="#3c3b6e"/>
                  </svg>
                </div>
                <div>
                  <p style={{ color:"#94a3b8", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", margin:0 }}>United States</p>
                  <p style={{ color:"#0f2447", fontSize:18, fontWeight:800, margin:0 }}>Rock Hill, SC</p>
                </div>
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:16 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:2 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(0,169,157,0.15)" stroke="#00A99D" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" fill="#00A99D"/></svg>
                <address style={{ fontStyle:"normal", color:"#475569", fontSize:14, lineHeight:1.7 }}>
                  331 E Main Street, Suite 200<br/>Rock Hill, SC 29730
                </address>
              </div>
            </div>

            {/* India */}
            <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:20, padding:"32px 28px", position:"relative", overflow:"hidden", boxShadow:"0 4px 24px rgba(27,60,110,0.08)" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:"linear-gradient(90deg,#FF9933,#ffffff,#138808)" }}/>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                <div style={{ width:52, height:52, borderRadius:14, overflow:"hidden", boxShadow:"0 6px 20px rgba(255,153,51,0.25)", flexShrink:0 }}>
                  <svg viewBox="0 0 900 600" width="52" height="52" style={{ display:"block" }}>
                    <rect width="900" height="200" fill="#FF9933"/>
                    <rect y="200" width="900" height="200" fill="#fff"/>
                    <rect y="400" width="900" height="200" fill="#138808"/>
                    <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="4"/>
                    <circle cx="450" cy="300" r="8" fill="#000080"/>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <line key={i} x1="450" y1="300" x2={450 + 80 * Math.cos((i * 15 * Math.PI) / 180)} y2={300 + 80 * Math.sin((i * 15 * Math.PI) / 180)} stroke="#000080" strokeWidth="2"/>
                    ))}
                  </svg>
                </div>
                <div>
                  <p style={{ color:"#94a3b8", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", margin:0 }}>India</p>
                  <p style={{ color:"#0f2447", fontSize:18, fontWeight:800, margin:0 }}>Hyderabad, TS</p>
                </div>
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:16 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:2 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(0,169,157,0.15)" stroke="#00A99D" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" fill="#00A99D"/></svg>
                <address style={{ fontStyle:"normal", color:"#475569", fontSize:14, lineHeight:1.7 }}>
                  Unit No 304, Section A, Third Floor, SBR Pearl<br/>
                  HUDA Techno Enclave-III, Opp. Raheja Mind Space<br/>
                  Madhapur, Hyderabad, 500081
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          borderTop: "1px solid #e2e8f0",
        }}
        className="py-20 px-6 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "1rem",
            }}
          >
            Want to work with us or join us?
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "2.5rem" }}>
            Whether you are looking for a technology partner or your next career move, we would love to hear from you.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                backgroundColor: "#1B3C6E",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "0.85rem 2rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
            >
              Get in Touch
            </Link>
            <Link
              href="/careers"
              style={{
                backgroundColor: "transparent",
                color: "#1B3C6E",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "0.85rem 2rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                display: "inline-block",
                border: "2px solid #1B3C6E",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.target as HTMLElement;
                el.style.backgroundColor = "#1B3C6E";
                el.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                const el = e.target as HTMLElement;
                el.style.backgroundColor = "transparent";
                el.style.color = "#1B3C6E";
              }}
            >
              View Open Roles
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
