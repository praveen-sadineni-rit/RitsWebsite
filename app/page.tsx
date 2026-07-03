"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── Scroll reveal hook ── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible, delay };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal(delay);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Counter ── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const step = end / 50;
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setVal(end); clearInterval(t); } else setVal(Math.floor(cur));
    }, 30);
    return () => clearInterval(t);
  }, [started, end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Arrow icon ── */
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
    <path d="M20 6L9 17L4 12" stroke="#00A99D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── DATA ── */
const stats = [
  { end: 50, suffix: "+", label: "Global Clients" },
  { end: 200, suffix: "+", label: "Projects Delivered" },
  { end: 10, suffix: "+", label: "Years of Excellence" },
  { end: 99, suffix: "%", label: "Client Satisfaction" },
];

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Software Solutions",
    desc: "Enterprise-grade web, mobile, and API development tailored to your business needs. From MVPs to complex platforms, we build software that lasts.",
    link: "Explore Software Solutions",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Product Development",
    desc: "Full-cycle product engineering, from discovery and UX design to launch and iteration. We turn your vision into a market-ready product.",
    link: "Explore Product Development",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI & Machine Learning",
    desc: "Intelligent solutions powered by LLMs, computer vision, NLP, and predictive analytics. We integrate AI directly into your product workflows.",
    link: "Explore AI Services",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M17 21V19C17 16.79 15.21 15 13 15H5C2.79 15 1 16.79 1 19V21M23 21V19C23 17.13 21.65 15.57 20 15.13M16 3.13C17.66 3.58 19 5.14 19 7C19 8.86 17.66 10.42 16 10.87M9 11C11.21 11 13 9.21 13 7C13 4.79 11.21 3 9 3C6.79 3 5 4.79 5 7C5 9.21 6.79 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Staff Augmentation",
    desc: "Scale your engineering team with vetted senior talent. Flexible engagement models that fit your culture, timeline, and budget, ready from day one.",
    link: "Explore Staff Augmentation",
  },
];

const industries = [
  "Financial Services", "Healthcare & Life Sciences", "E-Commerce & Retail",
  "Manufacturing", "Government & Public Sector", "Education & EdTech",
  "Energy & Utilities", "Logistics & Supply Chain", "Media & Entertainment",
  "Insurance", "Telecommunications", "Real Estate & PropTech",
  "Automotive", "Legal & Compliance", "Non-Profit", "Cybersecurity",
];

const whyUs = [
  { title: "Senior-only talent", desc: "Every engineer we assign is senior level. No bait-and-switch, no juniors learning on your budget." },
  { title: "Transparent by design", desc: "Weekly written updates, live project dashboards, and no surprise invoices. You always know where things stand." },
  { title: "Outcome-driven delivery", desc: "We measure success by business results, revenue, growth, time-to-market, not story points or hours billed." },
  { title: "90-day post-launch support", desc: "Every engagement includes 90 days of post-launch support as standard. We don't disappear at go-live." },
  { title: "NDA within 24 hours", desc: "Confidentiality agreements signed within 24 hours of first contact. Your IP is protected from day one." },
  { title: "Dedicated project manager", desc: "A dedicated PM on every project, your single point of contact for communication, planning, and escalations." },
];

const insights = [
  {
    category: "AI & Technology",
    tag: "Featured",
    title: "GPT-4o, Gemini 1.5, Claude 3. What Each Model Actually Does Best in 2025",
    excerpt: "OpenAI, Google, and Anthropic have each shipped major model upgrades this year. We break down real benchmark differences, cost-per-token tradeoffs, and which tasks each excels at, so you can stop guessing and start building.",
    author: "MIT Technology Review",
    initials: "MT",
    avatarColor: "#1B3C6E",
    date: "June 12, 2025",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 50%, #00A99D 100%)",
    href: "https://www.technologyreview.com/",
  },
  {
    category: "AI in Enterprise",
    tag: "Trending",
    title: "McKinsey: AI Could Add $4.4 Trillion Annually to the Global Economy",
    excerpt: "McKinsey's 2025 AI report found that generative AI alone could add the equivalent of $2.6–$4.4 trillion annually across 63 analyzed use cases, with knowledge work and software development leading adoption.",
    author: "McKinsey & Company",
    initials: "MC",
    avatarColor: "#00877d",
    date: "May 20, 2025",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #003d3a 0%, #00A99D 100%)",
    href: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai",
  },
  {
    category: "AI Engineering",
    tag: "New",
    title: "RAG vs. Fine-Tuning: Choosing the Right Strategy for Your LLM Application",
    excerpt: "Retrieval-Augmented Generation and fine-tuning solve different problems. RAG keeps models current with live data; fine-tuning bakes domain knowledge into weights. Here's how to decide, with real cost and latency comparisons.",
    author: "Google DeepMind Blog",
    initials: "GD",
    avatarColor: "#5b21b6",
    date: "June 3, 2025",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg, #1a1a4e 0%, #2a5298 100%)",
    href: "https://deepmind.google/",
  },
  {
    category: "AI Regulation",
    tag: "Popular",
    title: "EU AI Act Is Now in Force. What Every Tech Company Must Do by 2026",
    excerpt: "The European Union's AI Act took effect in August 2024 and begins phased enforcement in 2025–2026. High-risk AI systems face mandatory conformity assessments, transparency requirements, and human oversight rules.",
    author: "European Commission",
    initials: "EC",
    avatarColor: "#b45309",
    date: "April 30, 2025",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #1B3C6E 0%, #0f2447 100%)",
    href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
  },
];

const testimonials = [
  {
    quote: "Resource IT placed senior engineers who hit the ground running from day one. The quality of talent and their communication throughout was exceptional.",
    name: "Sarah Johnson",
    role: "CTO",
    company: "FinTech Scale-up",
    initials: "SJ",
  },
  {
    quote: "They built our AI recommendation engine in 8 weeks. It's been 18 months and we're still iterating on the same solid architecture. No rewrites needed.",
    name: "Marcus Williams",
    role: "VP Engineering",
    company: "E-Commerce Platform",
    initials: "MW",
  },
  {
    quote: "From MVP to Series A. Resource IT was our technology partner every step of the way. They think like founders, not just developers.",
    name: "Priya Sharma",
    role: "Founder & CEO",
    company: "HealthTech Startup",
    initials: "PS",
  },
];

/* ── 3D Rotating Particle Sphere with Tech Labels ── */
function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = 310;
    const N = 120;

    const TECHS = [
      { label: "AI", color: "#00A99D" },
      { label: "Node.js", color: "#68d391" },
      { label: "LLM", color: "#a78bfa" },
      { label: "Data", color: "#60a5fa" },
      { label: "React", color: "#38bdf8" },
      { label: "Python", color: "#fbbf24" },
      { label: "Cloud", color: "#34d399" },
      { label: "ML", color: "#f472b6" },
      { label: "API", color: "#00A99D" },
      { label: "DevOps", color: "#fb923c" },
      { label: "TypeScript", color: "#60a5fa" },
      { label: "Docker", color: "#38bdf8" },
      { label: "Next.js", color: "#e2e8f0" },
      { label: "GraphQL", color: "#e879f9" },
      { label: "AWS", color: "#fbbf24" },
      { label: "MongoDB", color: "#68d391" },
      { label: "GPT-4", color: "#a78bfa" },
      { label: "Vector DB", color: "#f472b6" },
      { label: "Kubernetes", color: "#38bdf8" },
      { label: "Terraform", color: "#a78bfa" },
      { label: "CI/CD", color: "#34d399" },
      { label: "Redis", color: "#fb923c" },
      { label: "PostgreSQL", color: "#60a5fa" },
      { label: "NLP", color: "#f472b6" },
      { label: "RAG", color: "#00A99D" },
      { label: "Microservices", color: "#fbbf24" },
      { label: "Azure", color: "#38bdf8" },
      { label: "GCP", color: "#68d391" },
      { label: "Kafka", color: "#e879f9" },
      { label: "Langchain", color: "#a78bfa" },
      { label: "Pinecone", color: "#34d399" },
      { label: "OpenAI", color: "#e2e8f0" },
      { label: "Gemini", color: "#60a5fa" },
      { label: "Claude", color: "#f472b6" },
      { label: "Anthropic", color: "#a78bfa" },
      { label: "Hugging Face", color: "#fbbf24" },
      { label: "Spark", color: "#fb923c" },
      { label: "Snowflake", color: "#38bdf8" },
      { label: "dbt", color: "#68d391" },
      { label: "Airflow", color: "#34d399" },
      { label: "FastAPI", color: "#00A99D" },
      { label: "Go", color: "#38bdf8" },
      { label: "Rust", color: "#fb923c" },
      { label: "Java", color: "#fbbf24" },
      { label: "Scala", color: "#e879f9" },
      { label: "Elasticsearch", color: "#60a5fa" },
      { label: "gRPC", color: "#a78bfa" },
      { label: "Prometheus", color: "#fb923c" },
      { label: "Grafana", color: "#f472b6" },
      { label: "Istio", color: "#34d399" },
      { label: "Helm", color: "#38bdf8" },
      { label: "ArgoCD", color: "#e879f9" },
      { label: "Databricks", color: "#fb923c" },
      { label: "CUDA", color: "#68d391" },
      { label: "PyTorch", color: "#f472b6" },
      { label: "TensorFlow", color: "#fbbf24" },
      { label: "Fine-Tuning", color: "#a78bfa" },
      { label: "Embeddings", color: "#00A99D" },
      { label: "Zero-Shot", color: "#e2e8f0" },
    ];

    const N_NODES = 120;

    // Fibonacci lattice distribution on sphere
    const pts = Array.from({ length: N_NODES }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N_NODES);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const isTech = i % 3 === 0 && Math.floor(i / 3) < TECHS.length;
      return {
        ox: Math.sin(phi) * Math.cos(theta),
        oy: Math.sin(phi) * Math.sin(theta),
        oz: Math.cos(phi),
        tech: isTech ? TECHS[Math.floor(i / 3)] : null,
      };
    });

    let angle = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      angle += 0.004;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const tilt = 0.25;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      // Project all points
      const proj = pts.map((pt) => {
        const { ox, oy, oz } = pt;
        const x1 = ox * cosA + oz * sinA;
        const z1 = -ox * sinA + oz * cosA;
        const y2 = oy * cosT - z1 * sinT;
        const z2 = oy * sinT + z1 * cosT;
        const depth = (z2 + 1) / 2;
        const scale = 0.85 + depth * 0.3;
        return {
          sx: cx + x1 * R * scale,
          sy: cy + y2 * R * scale,
          depth,
          tech: pt.tech,
        };
      });

      // Draw edges
      for (let i = 0; i < proj.length; i += 1) {
        for (let j = i + 1; j < proj.length; j++) {
          const a = proj[i], b = proj[j];
          const dx = a.sx - b.sx, dy = a.sy - b.sy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 72) {
            const alpha = (1 - d / 72) * 0.3 * Math.min(a.depth, b.depth);
            ctx.strokeStyle = "rgba(0,169,157," + alpha + ")";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      // Draw nodes + labels (back → front)
      [...proj]
        .sort((a, b) => a.depth - b.depth)
        .forEach(({ sx, sy, depth, tech }) => {
          const alpha = 0.2 + depth * 0.8;

          if (tech && depth > 0.4) {
            // Tech node — larger glowing pill
            const nodeR = 3.5 + depth * 3;
            const labelAlpha = Math.max(0, (depth - 0.4) / 0.6);

            // Outer glow
            const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, nodeR * 5);
            grd.addColorStop(0, tech.color + Math.round(labelAlpha * 80).toString(16).padStart(2, "0"));
            grd.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(sx, sy, nodeR * 5, 0, Math.PI * 2);
            ctx.fill();

            // Node core
            ctx.fillStyle = tech.color + Math.round(labelAlpha * 255).toString(16).padStart(2, "0");
            ctx.beginPath();
            ctx.arc(sx, sy, nodeR, 0, Math.PI * 2);
            ctx.fill();

            // Label pill
            const fontSize = 9 + depth * 3;
            ctx.font = "bold " + fontSize + "px -apple-system,sans-serif";
            const tw = ctx.measureText(tech.label).width;
            const pw = tw + 10;
            const ph = fontSize + 6;
            const px = sx + nodeR + 6;
            const py = sy - ph / 2;

            // Pill background
            ctx.fillStyle = "rgba(13,26,46," + (labelAlpha * 0.85) + ")";
            ctx.strokeStyle = tech.color + Math.round(labelAlpha * 120).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.8;
            const rad = ph / 2;
            ctx.beginPath();
            ctx.moveTo(px + rad, py);
            ctx.lineTo(px + pw - rad, py);
            ctx.quadraticCurveTo(px + pw, py, px + pw, py + rad);
            ctx.lineTo(px + pw, py + ph - rad);
            ctx.quadraticCurveTo(px + pw, py + ph, px + pw - rad, py + ph);
            ctx.lineTo(px + rad, py + ph);
            ctx.quadraticCurveTo(px, py + ph, px, py + ph - rad);
            ctx.lineTo(px, py + rad);
            ctx.quadraticCurveTo(px, py, px + rad, py);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Label text
            ctx.fillStyle = tech.color + Math.round(labelAlpha * 230).toString(16).padStart(2, "0");
            ctx.textBaseline = "middle";
            ctx.fillText(tech.label, px + 5, sy);

          } else {
            // Regular node
            const r = 1.2 + depth * 2.8;
            const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 4);
            grd.addColorStop(0, "rgba(0,212,200," + (alpha * 0.3) + ")");
            grd.addColorStop(1, "rgba(0,212,200,0)");
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(sx, sy, r * 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "rgba(0,212,200," + alpha + ")";
            ctx.beginPath();
            ctx.arc(sx, sy, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "rgba(255,255,255," + (alpha * 0.5) + ")";
            ctx.beginPath();
            ctx.arc(sx - r * 0.25, sy - r * 0.25, r * 0.38, 0, Math.PI * 2);
            ctx.fill();
          }
        });

      // Central ambient glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
      cg.addColorStop(0, "rgba(0,169,157,0.05)");
      cg.addColorStop(1, "rgba(0,169,157,0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fill();

      // Curved text along bottom arc
      const text = "RESOURCE  INNOVATIVE  TECHNOLOGIES";
      const arcR = R + 48;
      ctx.font = "bold 16px -apple-system,sans-serif";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      const totalAngle = Math.PI * 0.78;
      const startAngle = Math.PI / 2 + totalAngle / 2;
      const charSpacing = totalAngle / (text.length - 1);
      // Indices of R (0), I (10), T (22) in "RESOURCE  INNOVATIVE  TECHNOLOGIES"
      const ritIndices: Record<number, string> = { 0: "#00cfb4", 10: "#60a5fa", 22: "#f472b6" };

      for (let k = 0; k < text.length; k++) {
        const charAngle = startAngle - k * charSpacing;
        const charX = cx + arcR * Math.cos(charAngle);
        const charY = cy + arcR * Math.sin(charAngle);
        ctx.save();
        ctx.translate(charX, charY);
        ctx.rotate(charAngle - Math.PI / 2);
        ctx.fillStyle = ritIndices[k] ?? "rgba(255,255,255,0.9)";
        ctx.fillText(text[k], 0, 0);
        ctx.restore();
      }

      // Decorative arc line under text
      ctx.beginPath();
      ctx.arc(cx, cy, arcR + 12, Math.PI / 2 - totalAngle / 2, Math.PI / 2 + totalAngle / 2);
      ctx.strokeStyle = "rgba(0,169,157,0.18)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Left chip — diamond ◆
      const chipL = startAngle + 0.08;
      const chipLx = cx + (arcR) * Math.cos(chipL);
      const chipLy = cy + (arcR) * Math.sin(chipL);
      ctx.save();
      ctx.translate(chipLx, chipLy);
      ctx.rotate(chipL - Math.PI / 2);
      ctx.fillStyle = "#00A99D";
      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.lineTo(4, 0);
      ctx.lineTo(0, 5);
      ctx.lineTo(-4, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Right chip — diamond ◆
      const chipR = startAngle - totalAngle - 0.08;
      const chipRx = cx + (arcR) * Math.cos(chipR);
      const chipRy = cy + (arcR) * Math.sin(chipR);
      ctx.save();
      ctx.translate(chipRx, chipRy);
      ctx.rotate(chipR - Math.PI / 2);
      ctx.fillStyle = "#00A99D";
      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.lineTo(4, 0);
      ctx.lineTo(0, 5);
      ctx.lineTo(-4, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Small dots flanking each diamond
      [chipL + 0.1, chipL + 0.16, chipR - 0.1, chipR - 0.16].forEach((a) => {
        const dx = cx + arcR * Math.cos(a);
        const dy = cy + arcR * Math.sin(a);
        ctx.beginPath();
        ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,200,185,0.5)";
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative w-full max-w-3xl select-none">
      <canvas
        ref={canvasRef}
        width={900}
        height={880}
        style={{ background: "transparent" }}
        className="w-full h-auto"
      />
    </div>
  );
}

/* ─── Service Showcase ─── */
const ALL_SERVICES = [
  {
    num: "01",
    title: "Software Solutions",
    short: "Web · Mobile · API",
    desc: "Enterprise-grade web apps, mobile products, and APIs, architected to last and designed to scale. From MVPs to complex distributed systems.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    accent: "#60a5fa",
    href: "/services/software-solutions",
    iconPath: "M16 18L22 12L16 6M8 6L2 12L8 18",
  },
  {
    num: "02",
    title: "Product Development",
    short: "Discovery · Design · Launch",
    desc: "Full-cycle product engineering, from idea and UX research to launch and iteration. We turn vision into market-ready products, fast.",
    tags: ["Discovery", "UX Design", "Agile", "Go-to-Market"],
    accent: "#00A99D",
    href: "/services/product-development",
    iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    num: "03",
    title: "AI & Machine Learning",
    short: "LLMs · NLP · Vision",
    desc: "Production-ready AI, not just demos. We embed LLMs, computer vision, and predictive models directly into your products and workflows.",
    tags: ["LLMs", "OpenAI", "Computer Vision", "NLP"],
    accent: "#a78bfa",
    href: "/services/ai-ml",
    iconPath: "M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83",
  },
  {
    num: "04",
    title: "Staff Augmentation",
    short: "Vetted · Senior · Ready",
    desc: "Rigorously screened senior engineers. ID-verified, technically tested, reference-checked. Plug them into your team from day one.",
    tags: ["Senior Only", "ID Verified", "5-Day Onboard", "Flexible"],
    accent: "#34d399",
    href: "/services/staff-augmentation",
    iconPath: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  },
  {
    num: "05",
    title: "Cloud & DevOps",
    short: "AWS · GCP · Azure",
    desc: "Modern cloud infrastructure, CI/CD pipelines, and SRE practices that let your team ship with confidence, multiple times a day.",
    tags: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    accent: "#fb923c",
    href: "/services/cloud-devops",
    iconPath: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  },
  {
    num: "06",
    title: "Digital Transformation",
    short: "Strategy · Execution · Scale",
    desc: "From legacy systems to leading-edge architecture. We reimagine how your business operates, process, technology, and people together.",
    tags: ["Modernization", "Data & Analytics", "Change Mgmt", "ROI-Focused"],
    accent: "#f472b6",
    href: "/services/digital-transformation",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
];

function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const svc = ALL_SERVICES[active];

  return (
    <section id="services" className="py-24 bg-[#0a1628] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <Reveal className="mb-14">
          <p className="text-[#00A99D] text-xs font-bold uppercase tracking-widest mb-3">What We Do</p>
          <div className="w-10 h-1 bg-[#00A99D] rounded mb-5" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Six ways we build<br />
              <span style={{ color: "#00A99D" }}>what&apos;s next.</span>
            </h2>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              End-to-end technology capabilities, from the first line of code to the right engineer on your team.
            </p>
          </div>
        </Reveal>

        {/* Main interactive panel */}
        <div className="grid lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-white/5">

          {/* Left: numbered list */}
          <div className="lg:col-span-2 flex flex-col divide-y divide-white/5" style={{ background: "#0d1b2e" }}>
            {ALL_SERVICES.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setActive(i)}
                className="group w-full text-left px-6 py-5 flex items-center gap-4 transition-all duration-300 relative"
                style={{ background: active === i ? `${s.accent}10` : "transparent" }}
              >
                {/* Active indicator bar */}
                {active === i && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r transition-all duration-300"
                    style={{ background: s.accent }} />
                )}
                {/* Number */}
                <span className="font-black text-xs w-7 flex-shrink-0 transition-colors duration-300"
                  style={{ color: active === i ? s.accent : "rgba(255,255,255,0.15)" }}>
                  {s.num}
                </span>
                {/* Icon */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ background: active === i ? `${s.accent}20` : "rgba(255,255,255,0.04)", border: `1px solid ${active === i ? s.accent + "40" : "rgba(255,255,255,0.06)"}` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d={s.iconPath} stroke={active === i ? s.accent : "rgba(255,255,255,0.25)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {/* Title */}
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate transition-colors duration-300"
                    style={{ color: active === i ? "white" : "rgba(255,255,255,0.4)" }}>
                    {s.title}
                  </p>
                  <p className="text-[10px] font-medium truncate mt-0.5 transition-colors duration-300"
                    style={{ color: active === i ? s.accent + "99" : "rgba(255,255,255,0.2)" }}>
                    {s.short}
                  </p>
                </div>
                {/* Arrow */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-auto flex-shrink-0 transition-all duration-300"
                  style={{ color: active === i ? s.accent : "transparent" }}>
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>

          {/* Right: detail panel */}
          <div className="lg:col-span-3 p-10 flex flex-col justify-between min-h-[420px] transition-all duration-300"
            style={{ background: `linear-gradient(135deg, ${svc.accent}08 0%, #0a1628 60%)` }}>

            {/* Top */}
            <div>
              {/* Big number watermark */}
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${svc.accent}15`, border: `1px solid ${svc.accent}30`, boxShadow: `0 0 32px ${svc.accent}20` }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d={svc.iconPath} stroke={svc.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-black text-7xl leading-none select-none"
                  style={{ color: `${svc.accent}08` }}>
                  {svc.num}
                </span>
              </div>

              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: svc.accent }}>
                {svc.short}
              </p>
              <h3 className="text-3xl font-black text-white mb-4 leading-tight">{svc.title}</h3>
              <p className="text-white/50 text-base leading-relaxed mb-8 max-w-lg">{svc.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {svc.tags.map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: `${svc.accent}12`, color: `${svc.accent}cc`, border: `1px solid ${svc.accent}20` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-6">
                {ALL_SERVICES.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{ width: active === i ? 24 : 6, height: 6, background: active === i ? svc.accent : "rgba(255,255,255,0.1)" }} />
                ))}
              </div>
              <a href={svc.href}
                className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 hover:gap-3"
                style={{ color: svc.accent }}>
                Explore {svc.title} <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

/* ── Logo Item ── */
function LogoItem({ client }: { client: { name: string; img: string; seal?: boolean } }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="flex items-center justify-center" style={{ height: client.seal ? 64 : 40 }}>
      {!imgError ? (
        <img
          src={client.img}
          alt={client.name}
          className="object-contain"
          style={{ height: client.seal ? 64 : 36, width: client.seal ? 64 : "auto", maxWidth: client.seal ? 64 : 120 }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-white/50 text-xs font-bold whitespace-nowrap px-4">{client.name}</span>
      )}
    </div>
  );
}

/* ── Client Logos ── */
const CLIENT_LOGOS = [
  { name: "IBM",           img: "/logos/IBM.png",                              seal: false },
  { name: "Kyndryl",      img: "/logos/Kyndryl.png",                          seal: false },
  { name: "Thermo Fisher", img: "/logos/Thermo%20Fisher.png",                 seal: false },
  { name: "Marriott",     img: "/logos/Marriot.png",                          seal: false },
  { name: "Whataburger",  img: "/logos/whataburger.png",                      seal: false },
  { name: "Virginia",     img: "/logos/File_Seal%20of%20Virgini.png",         seal: true  },
  { name: "Georgia",      img: "/logos/GEORGIA.png",                          seal: true  },
  { name: "Idaho",        img: "/logos/Idaho%20State%20Seal.png",             seal: true  },
  { name: "Mississippi",  img: "/logos/Seal%20of%20Mississippi%20.png",       seal: true  },
  { name: "Florida",      img: "/logos/The%20Official%20State%20Florida.png", seal: true  },
  { name: "Arkansas",     img: "/logos/What%20is%20the%20Arkansas.png",       seal: true  },
  { name: "State Seal",   img: "/logos/The%20Official%20State%20S.png",       seal: true  },
];

/* ═══════════════════════════════════════════════════════ */
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-white text-gray-900">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative flex items-stretch overflow-hidden">
        {/* Background - professional gradient mimicking photo background */}
        <div className="absolute inset-0 bg-[#0f2447]">
          {/* Layered gradient to suggest professional imagery */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 40%, #1a4a7a 70%, #0d3d6b 100%)"
          }}/>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-2/3 h-full opacity-10" style={{
            background: "radial-gradient(ellipse at 80% 50%, #00A99D 0%, transparent 60%)"
          }}/>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-5" style={{
            background: "radial-gradient(ellipse at 20% 80%, #ffffff 0%, transparent 60%)"
          }}/>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}/>
        </div>

        <div className="relative z-10 w-full">
        {/* Independence Day banner */}
        <div className="relative overflow-hidden border-b border-white/10" style={{ background: "linear-gradient(90deg, #B22234, #1B3C6E)" }}>
          <div className="marquee-track marquee-slow py-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center flex-shrink-0">
                {Array.from({ length: 6 }).map((_, j) => (
                  <span key={j} className="flex items-center gap-2 px-8 text-white text-xs font-semibold tracking-wide whitespace-nowrap">
                    🎆 Happy Independence Day from Resource Innovative Technologies
                    <span className="text-white/50">&middot;</span>
                    celebrating freedom, innovation, and the people who build the future 🇺🇸
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-4 pb-4">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <div className="">{/* text col */}
            {/* Eyebrow */}
            <div className="animate-fade-up mb-6">
              <span className="inline-flex items-center gap-2 text-[#00A99D] text-sm font-semibold uppercase tracking-widest">
                <span className="w-8 h-px bg-[#00A99D]" />
                Talent · Tech · Transformation
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-white font-black leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em",
                animation: "revealUp 0.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s both" }}
            >
              The right technology
              <br />
              <span className="text-[#00A99D]">changes everything.</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl font-light"
              style={{ animation: "revealUp 0.9s ease 0.3s both" }}
            >
              Software solutions, AI-powered products, and engineering talent.
              Embedded in the work with your team, invested in the result.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4"
              style={{ animation: "revealUp 0.9s ease 0.45s both" }}
            >
              <a href="#services" className="btn-outline-white">
                See What We Do
              </a>
            </div>

          </div>{/* end text col */}

          {/* ── AI Neural Network Animation ── */}
          <div className="hidden lg:flex items-center justify-end relative">
            <div style={{ transform: "translateX(80px)" }}>
              <NeuralNetwork />
            </div>

          </div>

          </div>{/* end grid */}
        </div>

        {/* ── Client Logos Marquee ── */}
        <div className="relative overflow-hidden py-6">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #0f2447, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #0f2447, transparent)" }} />
          <div className="marquee-track marquee-left" style={{ animationDuration: "28s" }}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
              <div key={`${client.name}-${i}`} className="inline-flex items-center mx-8 flex-shrink-0">
                <LogoItem client={client} />
              </div>
            ))}
          </div>
        </div>
        </div>

      </section>

      {/* ═══════════════════════ ABOUT / APPROACH ═══════════════════════ */}
      <section id="about" className="pt-10 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <Reveal className="text-center mb-16">
            <p className="section-eyebrow">Our Approach</p>
            <div className="section-divider mx-auto" />
            <h2 className="text-4xl md:text-5xl font-black text-[#1B3C6E] leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
              Client First. People Always.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We believe the only way to truly serve a client is to first get the people right.
              Every engagement starts with trust, and trust starts with verification.
            </p>
          </Reveal>

          {/* Two pillars */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">

            {/* Pillar 1 — Client First */}
            <Reveal>
              <div className="h-full rounded-2xl border border-[#1B3C6E]/10 p-10 bg-[#f8faff] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#1B3C6E] rounded-l-2xl" />
                <div className="w-12 h-12 rounded-xl bg-[#1B3C6E] flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-[#1B3C6E] mb-3">Client First, Always</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Your success is our only metric. We don&apos;t place talent and walk away;
                  we stay accountable to results. Fast turnaround, zero compromise on quality,
                  and a commitment to your timeline that we take personally.
                </p>
                <div className="space-y-2.5">
                  {[
                    "Results-focused, not hours-billed",
                    "Fast turnaround without cutting corners",
                    "Dedicated point of contact for every client",
                    "We measure success by your outcomes",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckIcon />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Pillar 2 — People Vetted */}
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-[#00A99D]/15 p-10 bg-[#f0fdfb] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#00A99D] rounded-l-2xl" />
                <div className="w-12 h-12 rounded-xl bg-[#00A99D] flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-[#1B3C6E] mb-3">Rigorously Vetted Talent</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Before any engineer reaches a client, they go through our full screening process.
                  No shortcuts. We verify who they are, what they know, and that they&apos;re genuinely
                  as good as their résumé says. Only the best make it through.
                </p>
                <div className="space-y-2.5">
                  {[
                    "Identity & document verification on every candidate",
                    "Multi-round technical screening, not just a résumé review",
                    "Background checks, employment history confirmed",
                    "Skills validated through real-world problem solving",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckIcon />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom — philosophy strip */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl bg-[#0f2447] px-10 py-10 grid md:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#00A99D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  title: "People First",
                  desc: "We invest in our people, always available, always listening. A supported team delivers exceptional work.",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#00A99D" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#00A99D" strokeWidth="2" strokeLinecap="round"/></svg>,
                  title: "Strong Foundations",
                  desc: "Growth takes time. We don't chase shortcuts, we build relationships and capabilities that compound over years.",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#00A99D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 4L12 14.01l-3-3" stroke="#00A99D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  title: "Results Focused",
                  desc: "At the end of the day, what matters is impact. We stay accountable to outcomes, not just deliverables.",
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center">
                  <div className="mb-4">{item.icon}</div>
                  <h4 className="text-white font-bold text-base mb-2">{item.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ═══════════════════════ SERVICES ═══════════════════════ */}
      <ServiceShowcase />

      {/* ═══════════════════════ INDUSTRIES ═══════════════════════ */}
      <section id="industries" className="py-24 bg-white overflow-hidden">

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="section-eyebrow">Who We Serve</p>
              <div className="section-divider" />
              <h2 className="text-4xl md:text-5xl font-black text-[#1B3C6E]" style={{ letterSpacing: "-0.02em" }}>
                Every industry.<br />Every function.
              </h2>
            </div>
            <div className="max-w-xs">
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                From FinTech to Healthcare, Government to E-Commerce, we bring
                deep domain knowledge to every engagement.
              </p>
              <a href="#contact" className="btn-navy">
                Find Your Solution <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white, transparent)" }} />
          <div className="overflow-hidden">
            <div className="marquee-track marquee-left">
              {[...industries, ...industries].map((ind, i) => (
                <span key={i} className="inline-flex items-center gap-3 mx-3">
                  <a href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-[#1B3C6E] hover:bg-[#1B3C6E] hover:text-white hover:border-[#1B3C6E] transition-all duration-200 whitespace-nowrap">
                    {ind}
                  </a>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A99D] opacity-40 flex-shrink-0" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 — scrolls right (offset subset) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white, transparent)" }} />
          <div className="overflow-hidden">
            <div className="marquee-track marquee-right">
              {[...[...industries].reverse(), ...[...industries].reverse()].map((ind, i) => (
                <span key={i} className="inline-flex items-center gap-3 mx-3">
                  <a href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-100 bg-[#f8f9fa] text-sm font-medium text-gray-500 hover:bg-[#00A99D] hover:text-white hover:border-[#00A99D] transition-all duration-200 whitespace-nowrap">
                    {ind}
                  </a>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B3C6E] opacity-20 flex-shrink-0" />
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ═══════════════════════ WHY RESOURCE IT ═══════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <Reveal className="mb-14">
            <p className="section-eyebrow">Why Resource IT</p>
            <div className="section-divider" />
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-black text-[#1B3C6E] leading-tight" style={{ letterSpacing: "-0.02em" }}>
                The difference you<br />feel from day one.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Six commitments we make to every client, and keep.
              </p>
            </div>
          </Reveal>

          {/* Asymmetric bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Card 1 — large, spans 2 cols, dark navy */}
            <Reveal className="md:col-span-2">
              <div className="relative rounded-2xl bg-[#0f2447] p-10 h-full min-h-[260px] overflow-hidden group">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle at 80% 50%, #00A99D 0%, transparent 60%)"
                }}/>
                {/* Decorative circles */}
                <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full border border-white/5"/>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full border border-white/5"/>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#00A99D]/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#00A99D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="text-[#00A99D] text-xs font-bold uppercase tracking-widest">01</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">Senior-only talent</h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-md">Every engineer we assign is senior level. No bait-and-switch, no juniors learning on your budget. You asked for senior, you get senior, every single time.</p>
                </div>
                {/* Floating badge */}
                <div className="absolute bottom-8 right-8 bg-[#00A99D]/10 border border-[#00A99D]/20 rounded-xl px-4 py-2 text-right">
                  <div className="text-2xl font-black text-[#00A99D]">100%</div>
                  <div className="text-white/30 text-xs">Senior engineers</div>
                </div>
              </div>
            </Reveal>

            {/* Card 2 — teal accent */}
            <Reveal delay={0.08}>
              <div className="relative rounded-2xl bg-[#f0fdfb] border border-[#00A99D]/15 p-8 h-full min-h-[260px] overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{
                  background: "radial-gradient(circle, #00A99D 0%, transparent 70%)"
                }}/>
                <span className="text-[#00A99D] text-xs font-bold uppercase tracking-widest mb-4 block">02</span>
                <div className="w-10 h-10 rounded-xl bg-[#00A99D] flex items-center justify-center mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/></svg>
                </div>
                <h3 className="text-lg font-black text-[#1B3C6E] mb-2">Transparent by design</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Weekly updates, live dashboards, no surprise invoices. You always know exactly where things stand.</p>
              </div>
            </Reveal>

            {/* Card 3 — small, light */}
            <Reveal delay={0.1}>
              <div className="relative rounded-2xl bg-[#f8f9fa] border border-gray-100 p-8 h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <span className="text-gray-300 text-xs font-bold uppercase tracking-widest mb-4 block">03</span>
                <div className="w-10 h-10 rounded-xl bg-[#1B3C6E] flex items-center justify-center mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="text-lg font-black text-[#1B3C6E] mb-2">Outcome-driven delivery</h3>
                <p className="text-gray-400 text-sm leading-relaxed">We measure success by revenue, growth, and time-to-market, not story points or hours billed.</p>
              </div>
            </Reveal>

            {/* Card 4 — wide, light blue with visual */}
            <Reveal delay={0.12} className="md:col-span-2">
              <div className="relative rounded-2xl bg-[#f0f5ff] border border-[#1B3C6E]/10 p-10 h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#1B3C6E]/5"/>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-[#1B3C6E]/40 text-xs font-bold uppercase tracking-widest mb-4 block">04</span>
                    <div className="w-10 h-10 rounded-xl bg-[#1B3C6E]/10 flex items-center justify-center mb-5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#1B3C6E" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#1B3C6E" strokeWidth="2" strokeLinecap="round"/></svg>
                    </div>
                    <h3 className="text-xl font-black text-[#1B3C6E] mb-2">90-day post-launch support</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Every engagement includes 90 days of post-launch support as standard. We don't disappear at go-live.</p>
                  </div>
                  {/* Timeline visual */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-2">
                      {["Launch", "30d", "60d", "90d"].map((label, i) => (
                        <div key={label} className="flex items-center gap-2">
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-[#1B3C6E]" : "bg-[#00A99D]"}`}/>
                            <span className="text-[10px] font-bold text-[#1B3C6E]/50">{label}</span>
                          </div>
                          {i < 3 && <div className="w-8 h-px bg-[#00A99D]/30 mb-3"/>}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 text-center">Included as standard</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 5 */}
            <Reveal delay={0.14}>
              <div className="relative rounded-2xl bg-[#fff8f0] border border-orange-100 p-8 h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <span className="text-orange-200 text-xs font-bold uppercase tracking-widest mb-4 block">05</span>
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">NDA within 24 hours</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Confidentiality signed within 24 hours of first contact. Your IP is protected from day one.</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"/>
                  <span className="text-orange-500 text-xs font-bold">&lt; 24hr turnaround</span>
                </div>
              </div>
            </Reveal>

            {/* Card 6 */}
            <Reveal delay={0.16} className="md:col-span-2">
              <div className="relative rounded-2xl bg-[#1B3C6E] p-10 h-full overflow-hidden group">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle at 20% 50%, #00A99D 0%, transparent 50%)"
                }}/>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-white/20 text-xs font-bold uppercase tracking-widest mb-4 block">06</span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">Dedicated project manager</h3>
                    <p className="text-white/40 text-sm leading-relaxed max-w-sm">A dedicated PM on every project, your single point of contact for communication, planning, and escalations.</p>
                  </div>
                  <a href="#contact" className="flex-shrink-0 btn-primary">
                    Work With Us <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="pt-2 pb-8 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <p className="section-eyebrow">Client Stories</p>
            <div className="section-divider mx-auto" />
            <h2 className="text-4xl md:text-5xl font-black text-[#1B3C6E]" style={{ letterSpacing: "-0.02em" }}>
              What Our Clients Say
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="testimonial-card h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5 mt-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1" strokeLinejoin="round"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[#1B3C6E] flex items-center justify-center text-white font-black text-xs">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{t.name}</div>
                      <div className="text-gray-400 text-xs">{t.role} · {t.company}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ INSIGHTS / NEWS ═══════════════════════ */}
      <section id="insights" className="pt-8 pb-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="section-eyebrow">Resources & Insights</p>
              <div className="section-divider" />
              <h2 className="text-4xl md:text-5xl font-black text-[#1B3C6E]" style={{ letterSpacing: "-0.02em" }}>
                Real talk.<br />Real expertise.
              </h2>
            </div>
            <a href="/insights" className="btn-outline-navy">
              View all articles <ArrowRight size={14} />
            </a>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-5">

            {/* Hero card — spans 3 cols, tall */}
            <Reveal className="lg:col-span-3">
              <a href="#" className="group block h-full rounded-2xl overflow-hidden relative min-h-[480px] cursor-pointer">
                <div className="absolute inset-0" style={{ background: insights[0].gradient }} />
                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")"
                }}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative h-full flex flex-col justify-between p-8 min-h-[480px]">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#00A99D] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {insights[0].tag}
                    </span>
                    <span className="bg-white/10 text-white/70 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                      {insights[0].category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white leading-tight mb-3 group-hover:text-[#00A99D] transition-colors duration-300" style={{ letterSpacing: "-0.01em" }}>
                      {insights[0].title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-2">{insights[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs" style={{ background: insights[0].avatarColor }}>
                          {insights[0].initials}
                        </div>
                        <div>
                          <div className="text-white/90 text-xs font-semibold">{insights[0].author}</div>
                          <div className="text-white/40 text-[10px]">{insights[0].date} · {insights[0].readTime}</div>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#00A99D] group-hover:border-[#00A99D] transition-all duration-300">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>

            {/* Right column — 3 stacked cards */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {insights.slice(1).map((post, i) => (
                <Reveal key={post.title} delay={i * 0.1}>
                  <a href="#" className="group flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                    {/* Color swatch */}
                    <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-end p-1.5" style={{ background: post.gradient }}>
                      <span className="text-[8px] font-black text-white/70 uppercase tracking-widest leading-tight">{post.category.split(" ")[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{
                            background: post.tag === "Popular" ? "#fef3c7" : post.tag === "New" ? "#f0fdf4" : "#fff7ed",
                            color: post.tag === "Popular" ? "#92400e" : post.tag === "New" ? "#065f46" : "#9a3412",
                          }}>
                          {post.tag}
                        </span>
                        <span className="text-gray-300 text-[9px]">{post.readTime}</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-[#1B3C6E] transition-colors duration-200">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-black text-[8px] flex-shrink-0" style={{ background: post.avatarColor }}>
                          {post.initials}
                        </div>
                        <span className="text-[10px] text-gray-400">{post.author} · {post.date}</span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════ CONTACT CTA ═══════════════════════ */}
      <section id="contact" className="py-16 bg-[#1B3C6E]">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          {/* Word spotlight headline */}
          <Reveal>
            <div className="text-center mb-10">
              <div className="flex items-end justify-center gap-6 flex-wrap mb-3 select-none">
                <span className="word-spotlight word-spotlight-1 text-5xl lg:text-6xl font-black text-white tracking-tight">BUILD.</span>
                <span className="text-[#00A99D] text-3xl font-black mb-2">→</span>
                <span className="word-spotlight word-spotlight-2 text-5xl lg:text-6xl font-black text-white tracking-tight">LAUNCH.</span>
                <span className="text-[#00A99D] text-3xl font-black mb-2">→</span>
                <span className="word-spotlight word-spotlight-3 text-5xl lg:text-6xl font-black text-white tracking-tight">GROW.</span>
              </div>
              <p className="text-white/40 text-sm tracking-widest uppercase mt-6">with Resource Innovative Technologies</p>
            </div>
          </Reveal>

          {/* Stat counters */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
              {[
                { value: "50+", label: "Clients Served" },
                { value: "200+", label: "Projects Delivered" },
                { value: "24h", label: "Response Time" },
              ].map((stat, i) => (
                <div key={i} className="text-center py-4 border border-white/10 rounded-xl" style={{ animation: `countUp 0.5s ease forwards ${0.3 + i * 0.15}s`, opacity: 0 }}>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-white/40 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Split: trust signals + form */}
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 items-start">
            {/* Left: trust signals */}
            <Reveal delay={0.3}>
              <div className="space-y-4">
                {[
                  { title: "Direct line to engineers", desc: "No sales layers, you speak to the people building your product." },
                  { title: "No commitment required", desc: "Start with a free scoping call. Engage only when it feels right." },
                  { title: "Response within 24 hours", desc: "We follow up fast. Your timeline matters to us." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(0,169,157,0.15)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="#00A99D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{item.title}</div>
                      <div className="text-white/40 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 flex flex-wrap gap-6">
                  {[
                    { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "info@rits-it.com", href: "mailto:info@rits-it.com" },
                    { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "248-522-6740", href: "tel:+12485226740" },
                  ].map((c, i) => (
                    <a key={i} href={c.href} className="flex items-center gap-2 text-white/40 hover:text-white/80 text-xs transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d={c.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {c.text}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={0.4}>
              {submitted ? (
                <div className="flex items-center gap-3 bg-white/10 text-white px-8 py-6 rounded-xl border border-white/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#00A99D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-semibold">Thank you! We&apos;ll be in touch within 24 hours.</span>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  <p className="text-white/60 text-sm">Drop your email and we&apos;ll reach out to understand your project.</p>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@company.com" required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#00A99D] transition-colors text-sm" />
                  <button type="submit" className="btn-primary w-full justify-center">Send Message <ArrowRight size={14} /></button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
