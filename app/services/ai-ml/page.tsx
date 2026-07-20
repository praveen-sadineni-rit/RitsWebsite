"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FDEModel from "@/components/FDEModel";

const typingStrings = [
  "Analyzing data...",
  "Training model...",
  "Deploying to production...",
];

const useCases = [
  {
    title: "LLM Integration",
    description: "Embed GPT-4, Claude, or custom models into your workflows",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "AI Chatbots & Copilots",
    description: "Intelligent assistants trained on your data",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="12" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Computer Vision",
    description: "Image recognition, object detection, quality inspection",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 5v2M12 17v2M5 12H3M21 12h-2" />
      </svg>
    ),
  },
  {
    title: "Predictive Analytics",
    description: "Forecast demand, churn, and business outcomes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "NLP & Text Analysis",
    description: "Sentiment, classification, entity extraction",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Recommendation Engines",
    description: "Personalization at scale",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const aiStack = [
  {
    category: "LLM Providers",
    pills: ["OpenAI", "Anthropic", "Google Gemini", "Llama"],
    color: "#F3C34E",
    icon: <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    category: "Frameworks",
    pills: ["LangChain", "LlamaIndex", "Hugging Face", "CrewAI"],
    color: "#86A8CE",
    icon: <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    category: "ML Libraries",
    pills: ["TensorFlow", "PyTorch", "scikit-learn", "XGBoost"],
    color: "#C99A2E",
    icon: <><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/></>,
  },
  {
    category: "Vector DBs",
    pills: ["Pinecone", "Weaviate", "Chroma", "pgvector"],
    color: "#86A8CE",
    icon: <><ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>,
  },
  {
    category: "Infrastructure",
    pills: ["AWS SageMaker", "GCP Vertex AI", "Azure ML"],
    color: "#E8B53D",
    icon: <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>,
  },
];

function AIStackPipeline() {
  const [ticks, setTicks] = useState<number[]>(aiStack.map(() => 0));
  useEffect(() => {
    const t = setInterval(() => {
      setTicks((prev) => prev.map((v, i) => (v + 1) % aiStack[i].pills.length));
    }, 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* Connecting spine */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute top-8 bottom-8 z-0"
        style={{ left: "27px", width: "2px", background: "linear-gradient(180deg, #F3C34E, #86A8CE, #C99A2E, #86A8CE, #E8B53D)", opacity: 0.35 }}
      />
      <div className="space-y-5">
        {aiStack.map((group, i) => (
          <div key={group.category} className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Node icon */}
            <div className="relative z-10 flex-shrink-0 hidden sm:flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${group.color}18`, border: `1px solid ${group.color}40`, boxShadow: `0 0 24px ${group.color}25` }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: group.color }}>{group.icon}</svg>
              </div>
            </div>

            {/* Card */}
            <div
              className="flex-1 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${group.color}25`, boxShadow: `0 4px 24px rgba(0,0,0,0.2)` }}
            >
              <div className="flex items-center gap-3 mb-3 sm:hidden">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${group.color}18`, border: `1px solid ${group.color}40` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: group.color }}>{group.icon}</svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: group.color }}>{group.category}</span>
              </div>
              <span className="hidden sm:block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: group.color }}>{group.category}</span>
              <div className="flex flex-wrap gap-2">
                {group.pills.map((pill, j) => {
                  const active = ticks[i] === j;
                  return (
                    <span
                      key={pill}
                      className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-500"
                      style={{
                        color: active ? "#0f2447" : "rgba(255,255,255,0.85)",
                        background: active ? group.color : `${group.color}12`,
                        border: `1px solid ${active ? group.color : group.color + "35"}`,
                        boxShadow: active ? `0 0 18px ${group.color}70` : "none",
                        transform: active ? "translateY(-2px)" : "translateY(0)",
                      }}
                    >
                      {pill}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const phases = [
  {
    number: "01",
    title: "Data Audit & Strategy",
    description:
      "We assess your existing data assets, identify gaps, and define the AI strategy aligned to your business goals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Model Selection & Training",
    description:
      "Choose the right architecture, fine-tune existing LLMs or train custom models on your domain-specific data.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Integration & Testing",
    description:
      "Embed AI into your product via APIs, SDKs, or native modules. Rigorous red-teaming and accuracy benchmarking.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="19" y1="12" x2="5" y2="12" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Monitoring & Retraining",
    description:
      "Production AI drifts. We set up observability pipelines, feedback loops, and automated retraining schedules.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

const safetyPrinciples = [
  {
    title: "Bias Testing",
    description: "Every model goes through demographic and fairness audits before deployment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Explainability",
    description: "We build AI you can explain. SHAP values, attention maps, decision trails.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: "Data Privacy",
    description: "Your data never trains third-party models. Full on-premise options available.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Human-in-the-Loop",
    description: "Critical decisions require human review. We architect approval gates by design.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

function PolygonFace() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = 480, H = 560;
    canvas.width = W; canvas.height = H;

    // Face silhouette points (normalized 0-1, then scaled)
    const rawPts: [number,number][] = [
      // forehead top
      [0.35,0.04],[0.5,0.02],[0.65,0.04],
      // temples
      [0.22,0.14],[0.5,0.08],[0.78,0.14],
      // brow line
      [0.18,0.26],[0.32,0.22],[0.5,0.20],[0.68,0.22],[0.82,0.26],
      // eye level
      [0.16,0.35],[0.28,0.31],[0.37,0.33],[0.44,0.31],[0.5,0.33],
      [0.56,0.31],[0.63,0.33],[0.72,0.31],[0.84,0.35],
      // nose bridge
      [0.20,0.45],[0.35,0.42],[0.50,0.40],[0.65,0.42],[0.80,0.45],
      // nose tip
      [0.30,0.56],[0.42,0.54],[0.50,0.56],[0.58,0.54],[0.70,0.56],
      // cheekbones
      [0.14,0.52],[0.86,0.52],
      // upper lip
      [0.24,0.64],[0.36,0.62],[0.50,0.63],[0.64,0.62],[0.76,0.64],
      // mouth
      [0.28,0.71],[0.40,0.69],[0.50,0.70],[0.60,0.69],[0.72,0.71],
      // lower lip
      [0.32,0.77],[0.50,0.78],[0.68,0.77],
      // chin
      [0.22,0.84],[0.35,0.88],[0.50,0.90],[0.65,0.88],[0.78,0.84],
      // jaw
      [0.16,0.72],[0.84,0.72],
      [0.14,0.62],[0.86,0.62],
    ];

    const pts = rawPts.map(([x,y]) => ({ x: x*W, y: y*H, vx:(Math.random()-0.5)*0.18, vy:(Math.random()-0.5)*0.18, ox:x*W, oy:y*H }));

    // Build Delaunay-like triangles by connecting nearby points
    const triangles: [number,number,number][] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i+1; j < pts.length; j++) {
        for (let k = j+1; k < pts.length; k++) {
          const dx1=pts[i].x-pts[j].x, dy1=pts[i].y-pts[j].y;
          const dx2=pts[i].x-pts[k].x, dy2=pts[i].y-pts[k].y;
          const dx3=pts[j].x-pts[k].x, dy3=pts[j].y-pts[k].y;
          const d1=Math.sqrt(dx1*dx1+dy1*dy1);
          const d2=Math.sqrt(dx2*dx2+dy2*dy2);
          const d3=Math.sqrt(dx3*dx3+dy3*dy3);
          if (d1<110 && d2<110 && d3<110) triangles.push([i,j,k]);
        }
      }
    }

    // Glowing nodes to randomly activate
    type Glow = { idx: number; t: number };
    let glows: Glow[] = [];
    let frame = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0,0,W,H);
      frame++;

      // Float points gently
      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.x-p.ox)>5) p.vx *= -1;
        if (Math.abs(p.y-p.oy)>5) p.vy *= -1;
      });

      // Randomly activate glows
      if (frame % 12 === 0) glows.push({ idx: Math.floor(Math.random()*pts.length), t: 0 });
      glows = glows.filter(g => g.t < 1);
      glows.forEach(g => g.t += 0.015);

      // Draw triangles
      triangles.forEach(([i,j,k]) => {
        const glow = glows.find(g => g.idx===i||g.idx===j||g.idx===k);
        const alpha = glow ? 0.08 + 0.18*(1-Math.abs(glow.t-0.5)*2) : 0.04;
        const color = glow ? `rgba(232,181,61,${alpha})` : `rgba(232,181,61,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(pts[i].x,pts[i].y);
        ctx.lineTo(pts[j].x,pts[j].y);
        ctx.lineTo(pts[k].x,pts[k].y);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = glow ? `rgba(232,181,61,${alpha*3})` : `rgba(232,181,61,0.18)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw nodes
      pts.forEach((p, i) => {
        const glow = glows.find(g => g.idx===i);
        const pulse = glow ? Math.sin(glow.t * Math.PI) : 0;
        const r = 2.5 + pulse * 3;
        // Outer glow
        if (glow) {
          const g2 = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*5);
          g2.addColorStop(0,`rgba(232,181,61,${0.5*pulse})`);
          g2.addColorStop(1,"rgba(232,181,61,0)");
          ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(p.x,p.y,r*5,0,Math.PI*2); ctx.fill();
        }
        // Core dot
        ctx.fillStyle = glow ? "#F3C34E" : "rgba(232,181,61,0.55)";
        ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.fill();
      });

      // Scan line effect
      const scanY = ((frame * 1.2) % (H + 40)) - 20;
      const scanG = ctx.createLinearGradient(0,scanY-15,0,scanY+15);
      scanG.addColorStop(0,"rgba(232,181,61,0)");
      scanG.addColorStop(0.5,"rgba(232,181,61,0.06)");
      scanG.addColorStop(1,"rgba(232,181,61,0)");
      ctx.fillStyle = scanG;
      ctx.fillRect(0, scanY-15, W, 30);

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ position:"relative" }}>
      <canvas ref={ref} style={{ background:"transparent", width:"100%", maxWidth:480 }} />
      <div style={{ position:"absolute", bottom:12, left:0, right:0, display:"flex", justifyContent:"center", gap:16 }}>
        {["Neural Mesh","Polygon AI","RIT Vision"].map((label,i) => (
          <span key={label} style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:`rgba(232,181,61,${0.25+i*0.1})` }}>{label}</span>
        ))}
      </div>
    </div>
  );
}

export default function AiMlPage() {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = typingStrings[typingIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < current.length) {
            setDisplayText(current.slice(0, charIndex + 1));
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1200);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(current.slice(0, charIndex - 1));
            setCharIndex((c) => c - 1);
          } else {
            setIsDeleting(false);
            setTypingIndex((i) => (i + 1) % typingStrings.length);
          }
        }
      },
      isDeleting ? 40 : 70
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typingIndex]);

  return (
    <div className="min-h-screen bg-[#0f2447] text-white">
      <Navbar />

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#0f2447" }}
      >
        {/* Animated grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,181,61,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,181,61,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(27,60,110,0.45) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: text content */}
            <div className="text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8B53D]/40 bg-[#E8B53D]/10 text-[#E8B53D] text-sm font-medium mb-8 backdrop-blur-sm">
                ✦ AI &amp; Machine Learning
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                AI that works in{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #E8B53D, #1B3C6E 80%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  production
                </span>
                .<br />Not just in demos.
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
                We build intelligent systems using LLMs, computer vision, NLP, and predictive
                analytics, integrated directly into your product, not bolted on.
              </p>

              {/* Typing animation terminal */}
              <div className="inline-flex items-center gap-3 bg-[#0f2447] border border-[#1B3C6E]/60 rounded-xl px-6 py-4 font-mono text-sm md:text-base text-[#E8B53D] shadow-lg shadow-[#E8B53D]/10">
                <span className="w-2 h-2 rounded-full bg-[#E8B53D] animate-pulse flex-shrink-0" />
                <span className="min-w-[260px] text-left">
                  {displayText}
                  <span className="animate-pulse ml-0.5 text-[#E8B53D]">|</span>
                </span>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg shadow-[#E8B53D]/30"
                  style={{ background: "linear-gradient(135deg, #E8B53D, #008a80)" }}
                >
                  Start Your AI Project
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#use-cases"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold border border-[#1B3C6E] text-gray-300 hover:border-[#E8B53D] hover:text-[#E8B53D] transition-all duration-200"
                >
                  Explore Use Cases
                </a>
              </div>
            </div>

            {/* Right: neural network visual */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-4">
              <PolygonFace />
              <p className="text-white/20 text-xs font-mono tracking-widest uppercase">Neural Mesh · AI Vision</p>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="py-24 bg-[#07111f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#E8B53D] text-sm font-semibold uppercase tracking-widest mb-3">
              What We Build
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI use cases we specialize in
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From foundational models to production pipelines, every AI capability your product needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="group relative bg-[#0f2447] border border-[#1B3C6E]/40 rounded-2xl p-7 hover:border-[#E8B53D]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E8B53D]/10 cursor-default"
              >
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 text-[#E8B53D] group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "rgba(232,181,61,0.08)" }}
                >
                  {uc.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{uc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{uc.description}</p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, transparent, #E8B53D, transparent)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FDE MODEL (draft) */}
      <section className="py-24 px-6" style={{ background: "#07111f" }}>
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-[#F3C34E] text-sm font-semibold uppercase tracking-widest mb-3">How We Engage</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Forward Deployed Engineer Model</h2>
          <p className="text-gray-400 text-lg">
            Our engineers embed inside your team, understand the problem firsthand, and build, ship, and iterate on AI solutions alongside you.
          </p>
        </div>
        <FDEModel />
      </section>

      {/* AI STACK */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#0a1628" }}>
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(232,181,61,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,181,61,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />
        <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #F3C34E 0%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <p className="text-[#F3C34E] text-sm font-semibold uppercase tracking-widest mb-3">
              Technology
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our AI Stack</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We work with the best-in-class tools across the entire AI/ML pipeline.
            </p>
          </div>

          <AIStackPipeline />
        </div>
      </section>

      {/* HOW WE BUILD */}
      <section className="py-24 bg-[#07111f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#E8B53D] text-sm font-semibold uppercase tracking-widest mb-3">
              Our Process
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How we build AI products
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A structured, repeatable approach that gets AI from idea to production reliably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, i) => (
              <div
                key={i}
                className="relative bg-[#0f2447] border border-[#1B3C6E]/40 rounded-2xl p-7 hover:border-[#E8B53D]/50 transition-all duration-300 group"
              >
                <div
                  className="text-6xl font-black mb-4 leading-none"
                  style={{ color: "rgba(27,60,110,0.5)" }}
                >
                  {phase.number}
                </div>
                <div className="text-[#E8B53D] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {phase.icon}
                </div>
                <h3 className="text-white font-semibold text-base mb-3">{phase.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{phase.description}</p>

                {i < phases.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#1B3C6E]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & SAFETY */}
      <section className="py-24 bg-[#0f2447]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-2/5 flex-shrink-0">
              <p className="text-[#E8B53D] text-sm font-semibold uppercase tracking-widest mb-3">
                Responsible AI
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                We build AI responsibly.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Every system we deliver is designed with transparency, fairness, and accountability
                as first-class requirements, not afterthoughts.
              </p>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8B53D]/30 bg-[#E8B53D]/8 text-[#E8B53D] text-sm font-medium"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Safety-first engineering
              </div>
            </div>

            <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {safetyPrinciples.map((p, i) => (
                <div
                  key={i}
                  className="bg-[#0f2447] border border-[#1B3C6E]/40 rounded-2xl p-6 hover:border-[#E8B53D]/40 transition-all duration-300 group"
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 text-[#E8B53D]"
                    style={{ background: "rgba(232,181,61,0.08)" }}
                  >
                    {p.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d2147 0%, #1B3C6E 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,181,61,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(232,181,61,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-20"
          style={{
            background: "radial-gradient(ellipse, #E8B53D 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8B53D]/40 bg-[#E8B53D]/10 text-[#E8B53D] text-sm font-medium mb-8">
            ✦ Let&apos;s build something intelligent
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to add intelligence to your product?
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Tell us what you&apos;re trying to solve. We&apos;ll map out an AI approach that fits your data, timeline, and budget.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg font-semibold text-white text-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-xl shadow-[#E8B53D]/30"
            style={{ background: "linear-gradient(135deg, #E8B53D, #008a80)" }}
          >
            Get in Touch
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
