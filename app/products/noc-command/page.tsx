"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Live Topology data (fixed 1100x600 coordinate canvas) ── */
const TOPO_TENANT = { label: "RITS Azure Tenant", sub: "Resource Innovative Technologies Solutions Ltd", subs: 2, resources: 14, x: 430, y: 30, w: 240, h: 92 };

const TOPO_SUBS = [
  { id: "prod", label: "RITS-Production", meta: "f2a-4c1b", region: "East US", status: "warning", note: "3 alerts", x: 195, y: 178, w: 210, h: 84 },
  { id: "dev", label: "RITS-Development", meta: "e3d-5a2f", region: "West US", status: "healthy", x: 695, y: 178, w: 210, h: 84 },
];

const TOPO_RGS = [
  { id: "web", parent: "prod", label: "rg-prod-web", region: "East US", svcs: 2, status: "healthy", x: 80, y: 322, w: 150, h: 68 },
  { id: "data", parent: "prod", label: "rg-prod-data", region: "East US", svcs: 2, status: "warning", badge: 1, x: 260, y: 322, w: 150, h: 68 },
  { id: "infra", parent: "prod", label: "rg-prod-infra", region: "East US", svcs: 4, status: "warning", badge: 2, x: 440, y: 322, w: 150, h: 68 },
  { id: "ai", parent: "dev", label: "rg-prod-ai", region: "East US", svcs: 2, status: "healthy", x: 660, y: 322, w: 150, h: 68 },
  { id: "devrg", parent: "dev", label: "rg-dev", region: "West US", svcs: 2, status: "healthy", x: 860, y: 322, w: 150, h: 68 },
];

const TOPO_SERVICES = [
  { parent: "web", label: "App Service", m1: ["CPU", "34%"], m2: ["Uptime", "99.9%"], status: "healthy", icon: "server", x: 30, y: 452, w: 108, h: 108 },
  { parent: "web", label: "CDN", m1: ["Req/s", "142"], m2: ["Response", "98ms"], status: "healthy", icon: "globe", x: 155, y: 452, w: 108, h: 108 },
  { parent: "data", label: "SQL Database", m1: ["RU/s", "800"], m2: ["Latency", "4ms"], status: "healthy", icon: "db", x: 285, y: 452, w: 108, h: 108 },
  { parent: "data", label: "Cache", m1: ["Memory", "78%"], m2: ["Hit Rate", "92%"], status: "warning", icon: "bolt", x: 410, y: 452, w: 108, h: 108 },
  { parent: "infra", label: "AKS Cluster", m1: ["Nodes", "3/3"], m2: ["Pods", "47"], status: "healthy", icon: "layers", x: 535, y: 452, w: 108, h: 108 },
  { parent: "infra", label: "API Gateway", m1: ["Latency", "12ms"], m2: ["Expected", "5ms"], status: "warning", icon: "route", x: 660, y: 452, w: 108, h: 108 },
  { parent: "ai", label: "AI Service", m1: ["APIs", "7"], m2: ["Req/min", "1.2k"], status: "healthy", icon: "chip", x: 790, y: 452, w: 108, h: 108 },
  { parent: "devrg", label: "Dev Web", m1: ["CPU", "12%"], m2: ["Uptime", "100%"], status: "healthy", icon: "code", x: 918, y: 452, w: 108, h: 108 },
];

const TOPO_ICONS: Record<string, JSX.Element> = {
  server: <><rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/></>,
  globe: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" strokeWidth="1.6"/></>,
  db: <><ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="currentColor" strokeWidth="1.6"/></>,
  bolt: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>,
  layers: <><rect x="3" y="3" width="7" height="7" rx="1.3" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.3" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.3" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.3" stroke="currentColor" strokeWidth="1.6"/></>,
  route: <><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M8.5 7l7 10M8.2 8.5A6 6 0 0018 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>,
  code: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>,
  building: <><rect x="4" y="3" width="16" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>,
  layer2: <><path d="M12 2L2 8l10 6 10-6-10-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M2 16l10 6 10-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></>,
  folder: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>,
};

const TOPO_COLORS: Record<string, string> = { healthy: "#34d399", warning: "#f59e0b" };

function elbowPath(x1: number, y1: number, x2: number, y2: number) {
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1} V${my} H${x2} V${y2}`;
}

function TopologyDiagram() {
  const W = 1100, H = 592;
  const tenantBottom = { x: TOPO_TENANT.x + TOPO_TENANT.w / 2, y: TOPO_TENANT.y + TOPO_TENANT.h };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#0a0f1e", border: "1px solid rgba(255,255,255,0.08)" }}>
      <style>{`
        @keyframes topoFlow { to { stroke-dashoffset: -24; } }
        .topo-line { stroke-dasharray: 1.5 7; stroke-linecap: round; animation: topoFlow 1.1s linear infinite; }
        @keyframes topoPulse { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.6); } }
        .topo-joint { animation: topoPulse 1.6s ease-in-out infinite; transform-origin: center; }
        @keyframes swipeHint { 0%,100% { transform: translateX(0); opacity: 0.5; } 50% { transform: translateX(6px); opacity: 1; } }
        .topo-swipe-icon { animation: swipeHint 1.4s ease-in-out infinite; }
        .topo-scroll { scrollbar-width: thin; scrollbar-color: rgba(0,207,180,0.5) transparent; }
        .topo-scroll::-webkit-scrollbar { height: 8px; }
        .topo-scroll::-webkit-scrollbar-thumb { background: rgba(0,207,180,0.5); border-radius: 99px; }
        .topo-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); }
      `}</style>

      {/* Mobile-only swipe hint */}
      <div className="sm:hidden flex items-center justify-center gap-2 py-2.5" style={{ background: "rgba(0,207,180,0.08)", borderBottom: "1px solid rgba(0,207,180,0.15)" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ color: "#00cfb4" }}><path d="M9 18l-6-6 6-6M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#00cfb4", letterSpacing: "0.02em" }}>Swipe to explore the full map</span>
        <svg className="topo-swipe-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ color: "#00cfb4" }}><path d="M15 18l6-6-6-6M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>

      <div className="overflow-x-auto topo-scroll">
        <div style={{ position: "relative", width: W, height: H, margin: "0 auto" }}>
          {/* Grid backdrop */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          {/* Connector lines */}
          <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
            {TOPO_SUBS.map((s) => {
              const x2 = s.x + s.w / 2;
              return <path key={s.id} className="topo-line" d={elbowPath(tenantBottom.x, tenantBottom.y, x2, s.y)} stroke="rgba(234,179,8,0.5)" strokeWidth="1.5" fill="none" />;
            })}
            {TOPO_RGS.map((rg) => {
              const parent = TOPO_SUBS.find((s) => s.id === rg.parent)!;
              const x1 = parent.x + parent.w / 2, y1 = parent.y + parent.h;
              const x2 = rg.x + rg.w / 2;
              return <path key={rg.id} className="topo-line" d={elbowPath(x1, y1, x2, rg.y)} stroke="rgba(167,139,250,0.45)" strokeWidth="1.5" fill="none" />;
            })}
            {TOPO_SERVICES.map((svc, i) => {
              const parent = TOPO_RGS.find((r) => r.id === svc.parent)!;
              const x1 = parent.x + parent.w / 2, y1 = parent.y + parent.h;
              const x2 = svc.x + svc.w / 2;
              return <path key={i} className="topo-line" d={elbowPath(x1, y1, x2, svc.y)} stroke="rgba(96,165,250,0.4)" strokeWidth="1.5" fill="none" />;
            })}
            {/* Joint dots */}
            <circle className="topo-joint" cx={tenantBottom.x} cy={tenantBottom.y} r="3" fill="#eab308" />
            {TOPO_SUBS.map((s) => <circle key={s.id} className="topo-joint" cx={s.x + s.w / 2} cy={s.y + s.h} r="3" fill="#a78bfa" />)}
            {TOPO_RGS.map((rg) => <circle key={rg.id} className="topo-joint" cx={rg.x + rg.w / 2} cy={rg.y + rg.h} r="2.5" fill="#60a5fa" />)}
          </svg>

          {/* Tenant node */}
          <div style={{ position: "absolute", left: TOPO_TENANT.x, top: TOPO_TENANT.y, width: TOPO_TENANT.w, height: TOPO_TENANT.h, borderRadius: 12, background: "linear-gradient(135deg,#1a1509,#0a0f1e)", border: "1.5px solid rgba(234,179,8,0.5)", boxShadow: "0 0 24px rgba(234,179,8,0.15)", padding: "10px 14px", display: "flex", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(234,179,8,0.15)", border: "1px solid rgba(234,179,8,0.4)", color: "#eab308", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">{TOPO_ICONS.building}</svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#eab308", margin: 0 }}>TENANT</p>
              <p style={{ fontSize: 12.5, fontWeight: 800, color: "white", margin: "1px 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{TOPO_TENANT.label}</p>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(234,179,8,0.9)", background: "rgba(234,179,8,0.12)", borderRadius: 5, padding: "2px 6px" }}>{TOPO_TENANT.subs} Subscriptions</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(234,179,8,0.9)", background: "rgba(234,179,8,0.12)", borderRadius: 5, padding: "2px 6px" }}>{TOPO_TENANT.resources} Resources</span>
              </div>
            </div>
          </div>

          {/* Subscription nodes */}
          {TOPO_SUBS.map((s) => (
            <div key={s.id} style={{ position: "absolute", left: s.x, top: s.y, width: s.w, height: s.h, borderRadius: 10, background: "#0f1424", border: `1.5px solid ${TOPO_COLORS[s.status]}55`, padding: "10px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(167,139,250,0.15)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">{TOPO_ICONS.layer2}</svg>
                </div>
                <p style={{ fontSize: 12, fontWeight: 800, color: "white", margin: 0 }}>{s.label}</p>
              </div>
              <p style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)", margin: "0 0 6px", paddingLeft: 32 }}>{s.meta}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 32 }}>
                <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.5)" }}>{s.region}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 9.5, fontWeight: 700, color: TOPO_COLORS[s.status] }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: TOPO_COLORS[s.status] }} />
                  {s.status === "healthy" ? "Healthy" : s.note}
                </span>
              </div>
            </div>
          ))}

          {/* Resource group nodes */}
          {TOPO_RGS.map((rg) => (
            <div key={rg.id} style={{ position: "absolute", left: rg.x, top: rg.y, width: rg.w, height: rg.h, borderRadius: 9, background: "#0f1424", border: `1.3px solid ${TOPO_COLORS[rg.status]}55`, padding: "9px 10px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ color: "#60a5fa", flexShrink: 0 }}>{TOPO_ICONS.folder}</svg>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{rg.label}</span>
                </div>
                {rg.badge && <span style={{ flexShrink: 0, width: 15, height: 15, borderRadius: "50%", background: "#ef4444", color: "white", fontSize: 8.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{rg.badge}</span>}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.45)" }}>{rg.region}</span>
                <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.45)" }}>{rg.svcs} svcs</span>
              </div>
            </div>
          ))}

          {/* Service nodes */}
          {TOPO_SERVICES.map((svc, i) => (
            <div key={i} style={{ position: "absolute", left: svc.x, top: svc.y, width: svc.w, height: svc.h, borderRadius: 12, background: svc.status === "warning" ? "linear-gradient(180deg,#1a1206,#0f1424)" : "#0f1424", border: `1.3px solid ${TOPO_COLORS[svc.status]}55`, padding: "10px" }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: `${TOPO_COLORS[svc.status]}18`, color: TOPO_COLORS[svc.status], display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">{TOPO_ICONS[svc.icon]}</svg>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{svc.m1[0]}</span>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: TOPO_COLORS[svc.status] }}>{svc.m1[1]}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{svc.m2[0]}</span>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>{svc.m2[1]}</span>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 8.5, fontWeight: 700, color: TOPO_COLORS[svc.status] }}>
                <span style={{ width: 4.5, height: 4.5, borderRadius: "50%", background: TOPO_COLORS[svc.status] }} />
                {svc.status === "healthy" ? "Healthy" : "Degraded"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const WHAT_IT_IS = [
  {
    title: "Sees Everything",
    desc: "Every server, cloud service, network connection, and cost, monitored 24x7.",
    color: "#60a5fa",
    icon: <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    title: "Thinks, Not Just Alerts",
    desc: "7 AI agents analyse context, correlate causes, and cut through noise, engineers only see what genuinely matters.",
    color: "#00cfb4",
    icon: <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    title: "Tells You What To Do",
    desc: "Not “something is wrong.” But: “Server X is failing because of Y, here are the steps to fix it, and which engineer to call.”",
    color: "#a78bfa",
    icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>,
  },
];

const COST_SCENARIOS = [
  { situation: "Server goes down at 2am", without: "No one knows until 9am Monday" },
  { situation: "Security certificate expires", without: "Customers can't log in, 3 hours to fix" },
  { situation: "Azure costs spike 40% overnight", without: "You find out at month-end" },
  { situation: "5 alerts fire at once", without: "Engineers guess which one to fix first" },
  { situation: "Deployment breaks production", without: "2 hours to find which change caused it" },
];

const AGENTS = [
  { name: "Ingestion Analyst", desc: "Reads every alert from every system the moment it fires", color: "#60a5fa" },
  { name: "Correlation Engine", desc: "Spots that 5 separate alerts are actually one single problem", color: "#00cfb4" },
  { name: "Severity Classifier", desc: "Decides what's a genuine emergency vs. background noise", color: "#a78bfa" },
  { name: "Alert Router", desc: "Sends the right alert to the right engineer at the right time", color: "#f472b6" },
  { name: "Triage & Runbook", desc: "Writes step-by-step fix instructions and sends them instantly", color: "#34d399" },
  { name: "Reporting Agent", desc: "Generates the monthly board report automatically", color: "#fb923c" },
  { name: "DevOps Analyst", desc: "Watches every deployment, flags failures, security risks, quality issues", color: "#fbbf24" },
];

const DASHBOARDS = [
  { persona: "Senior Leadership", name: "Cloud Health", desc: "One screen. Traffic lights. Plain English.", points: ["Certificate expiry warnings", "Budget tracking in real time", "All services status at a glance", "Zero Azure knowledge required"], color: "#00cfb4" },
  { persona: "IT Manager", name: "Full Platform View", desc: "Everything in detail.", points: ["Alerts, incidents, topology maps", "No digging through logs", "Root cause already identified", "All in one platform"], color: "#60a5fa" },
  { persona: "On-Call Engineer", name: "Incident Command", desc: "At 3am, what broke, when, why, how to fix it.", points: ["AI-generated runbooks", "Security vulnerability alerts", "Step-by-step resolution guide", "Compliance scores"], color: "#a78bfa" },
  { persona: "Delivery Head", name: "DevOps Center", desc: "Full deployment & pipeline visibility.", points: ["Pipeline failure tracking", "Network health & device status", "Quality gap identification", "Team performance metrics"], color: "#fb923c" },
];

const SEVERITIES = [
  { level: "SEV-1", label: "Critical, Production down", detail: "Instant SMS + WhatsApp + phone call to on-call engineer AND manager", color: "#ef4444" },
  { level: "SEV-2", label: "High, Major degradation", detail: "Slack message + email to the team within 60 seconds", color: "#f97316" },
  { level: "SEV-3", label: "Medium, Something needs attention", detail: "Email during business hours, no one woken up", color: "#eab308" },
  { level: "SEV-4", label: "Low, Advisory only", detail: "Appears in the dashboard. Zero interruption to anyone.", color: "#94a3b8" },
];

/* ── Live Dashboard mock data ── */
const DASH_STATS = [
  { label: "SEV-1 Open", value: "4", sub: "Critical, immediate", color: "#ef4444", icon: "bell" },
  { label: "Open Alerts", value: "17", sub: "6 SEV-2 active", color: "#f97316", icon: "bell" },
  { label: "Open Incidents", value: "5", sub: "Across all sites", color: "#eab308", icon: "warning" },
  { label: "SLA Compliance", value: "98.4%", sub: "30-day rolling", color: "#22c55e", icon: "trend" },
  { label: "MTTD / MTTR", value: "2.3m", sub: "MTTR: 28 min", color: "#6366f1", icon: "clock" },
  { label: "Delivery Health", value: "78%", sub: "2 pipelines failing", color: "#ef4444", icon: "trendDown" },
];

const DASH_ALERTS = [
  { sev: "SEV-1", title: "Cosmos DB Throughput Throttling", src: "COSMOS-NOC-PROD · Azure East US", time: "17 minutes ago", status: "OPEN" },
  { sev: "SEV-1", title: "Core Router CR-01 BGP Session Down", src: "CR-01-RH · Rock Hill DC1", time: "18 minutes ago", status: "OPEN" },
  { sev: "SEV-2", title: "Azure VM PROD-APP-03 Unresponsive", src: "PROD-APP-03 · Azure East US", time: "19 minutes ago", status: "OPEN" },
  { sev: "SEV-2", title: "Switch SW-DIST-04 High Packet Loss", src: "SW-DIST-04 · Rock Hill DC1", time: "22 minutes ago", status: "OPEN" },
  { sev: "SEV-1", title: "Azure ExpressRoute Circuit ERX-001 Down", src: "ERX-001 · Rock Hill DC1", time: "27 minutes ago", status: "ACKNOWLEDGED" },
  { sev: "SEV-2", title: "Load Balancer LB-PROD-01 Backend Pool Degraded", src: "LB-PROD-01 · Azure East US", time: "27 minutes ago", status: "OPEN" },
  { sev: "SEV-1", title: "Firewall FW-CORE-01 CPU at 99%", src: "FW-CORE-01 · Charlotte DC2", time: "33 minutes ago", status: "ASSIGNED" },
  { sev: "SEV-2", title: "AKS Node Pool aks-nodepool-01 NotReady", src: "AKS-NODE-POOL-01 · Azure East US", time: "40 minutes ago", status: "ACKNOWLEDGED" },
];

const DASH_DEVICES = [
  { label: "Healthy", value: 8, color: "#22c55e" },
  { label: "Degraded", value: 9, color: "#f97316" },
  { label: "Down", value: 3, color: "#ef4444" },
];

const DASH_INCIDENTS = [
  { sev: "SEV-1", title: "Core Router BGP Failure, Rock Hill DC1", meta: "INC-001 · 18 minutes ago", status: "IN PROGRESS", statusColor: "#f59e0b" },
  { sev: "SEV-1", title: "Firewall CPU Saturation, FW-CORE-01", meta: "INC-006 · 33 minutes ago", status: "IN PROGRESS", statusColor: "#f59e0b" },
  { sev: "SEV-1", title: "ExpressRoute Failure + AKS Node Degradation", meta: "INC-002 · 40 minutes ago", status: "ACK'D", statusColor: "#3b82f6" },
  { sev: "SEV-2", title: "VPN Tunnel Failure, Charlotte Branch", meta: "INC-003 · about 1 hour ago", status: "IN PROGRESS", statusColor: "#f59e0b" },
  { sev: "SEV-3", title: "Database Server Memory Pressure, SRV-DB-02", meta: "INC-004 · about 1 hour ago", status: "NEW", statusColor: "#8b5cf6" },
];

const SEV_COLOR: Record<string, string> = { "SEV-1": "#ef4444", "SEV-2": "#f97316", "SEV-3": "#eab308" };

const DASH_ICONS: Record<string, JSX.Element> = {
  bell: <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  warning: <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  trend: <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  trendDown: <path d="M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  clock: <><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
};

function LiveDashboardMock() {
  const total = DASH_DEVICES.reduce((s, d) => s + d.value, 0);
  let acc = 0;
  const segments = DASH_DEVICES.map((d) => {
    const start = (acc / total) * 360;
    acc += d.value;
    const end = (acc / total) * 360;
    return { ...d, start, end };
  });
  const gradient = `conic-gradient(${segments.map((s) => `${s.color} ${s.start}deg ${s.end}deg`).join(", ")})`;

  return (
    <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid #e2e8f0", background: "#f8fafc" }}>
      <style>{`
        @keyframes dashRowIn { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
        .dash-row { opacity:0; animation: dashRowIn 0.45s ease forwards; }
        @keyframes dashLivePulse { 0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(239,68,68,0.5);} 50% { opacity:0.6; box-shadow:0 0 0 5px rgba(239,68,68,0);} }
        .dash-live-dot { animation: dashLivePulse 1.6s ease-in-out infinite; }
      `}</style>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1, background: "#e2e8f0" }}>
        {DASH_STATS.map((s) => (
          <div key={s.label} style={{ background: "#ffffff", padding: "16px 18px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8" }}>{s.label}</span>
              <span style={{ width: 22, height: 22, borderRadius: 7, background: `${s.color}15`, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">{DASH_ICONS[s.icon]}</svg>
              </span>
            </div>
            <p style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color, margin: "0 0 3px", lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 10.5, color: "#94a3b8", margin: 0 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Feed + sidebar */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 1, background: "#e2e8f0" }}>
        {/* Live alert feed */}
        <div style={{ background: "#ffffff", padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="dash-live-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444" }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", color: "#0f2447" }}>LIVE ALERT FEED</span>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: "#00A99D" }}>VIEW ALL →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {DASH_ALERTS.map((a, i) => (
              <div key={i} className="dash-row" style={{ animationDelay: `${i * 60}ms`, display: "flex", alignItems: "center", gap: 12, padding: "10px 6px", borderBottom: i < DASH_ALERTS.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                <span style={{ flexShrink: 0, fontSize: 9.5, fontWeight: 800, padding: "3px 8px", borderRadius: 6, background: `${SEV_COLOR[a.sev]}15`, color: SEV_COLOR[a.sev] }}>{a.sev}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12.5, fontWeight: 700, color: "#0f2447", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</p>
                  <p style={{ fontSize: 10.5, color: "#94a3b8", margin: 0 }}>{a.src}</p>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <p style={{ fontSize: 10, color: "#94a3b8", margin: "0 0 2px" }}>{a.time}</p>
                  <span style={{ fontSize: 9, fontWeight: 700, color: a.status === "OPEN" ? "#ef4444" : "#94a3b8" }}>{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: device health + incidents */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "#e2e8f0" }}>
          <div style={{ background: "#ffffff", padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color: "#6366f1" }}><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/></svg>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", color: "#0f2447" }}>DEVICE HEALTH</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <div style={{ position: "relative", width: 110, height: 110, borderRadius: "50%", background: gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#0f2447" }}>{total}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em" }}>DEVICES</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {DASH_DEVICES.map((d) => (
                <div key={d.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: d.color, margin: 0 }}>{d.value}</p>
                  <p style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0 }}>{d.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#ffffff", padding: "18px 20px", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color: "#f59e0b" }}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", color: "#0f2447" }}>ACTIVE INCIDENTS</span>
              </div>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#00A99D" }}>ALL →</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DASH_INCIDENTS.map((inc, i) => (
                <div key={i} className="dash-row" style={{ animationDelay: `${i * 70 + 200}ms` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 5, background: `${SEV_COLOR[inc.sev]}15`, color: SEV_COLOR[inc.sev] }}>{inc.sev}</span>
                    <span style={{ fontSize: 8.5, fontWeight: 700, padding: "2px 7px", borderRadius: 5, background: `${inc.statusColor}15`, color: inc.statusColor }}>{inc.status}</span>
                  </div>
                  <p style={{ fontSize: 11.5, fontWeight: 700, color: "#0f2447", margin: "0 0 2px", lineHeight: 1.3 }}>{inc.title}</p>
                  <p style={{ fontSize: 9.5, color: "#94a3b8", margin: 0 }}>{inc.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DIFFERENTIATION = [
  { old: "Show you 200 alerts", noc: "Show you the 3 that matter" },
  { old: "Tell you something broke", noc: "Tell you why it broke and how to fix it" },
  { old: "Require expert engineers to interpret", noc: "Understood by anyone in the business" },
  { old: "Separate tools for separate problems", noc: "One platform, alerts, costs, health, security, delivery" },
  { old: "Alert fatigue, engineers ignore noise", noc: "AI filters 80% of noise before it reaches anyone" },
  { old: "No business-level view", noc: "Board-ready dashboard built in" },
];

const RESULTS = [
  { metric: "Mean Time to Detect", industry: "45–90 min", noc: "Under 2 min" },
  { metric: "Mean Time to Resolve", industry: "4–6 hours", noc: "Under 45 min" },
  { metric: "Alert Noise Reaching Engineers", industry: "100%", noc: "~20%" },
  { metric: "Time to Create Incident Report", industry: "2–3 hours (manual)", noc: "Instant (automated)" },
  { metric: "Business Visibility into IT Health", industry: "Zero / weekly email", noc: "Real-time, always-on" },
];

const SECURITY = [
  { title: "US Data Residency", desc: "All data held in Azure East US and West US, fully SOC 2 compliant.", icon: <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
  { title: "SOC 2 & ISO 27001", desc: "Certification roadmap built in from day one.", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
  { title: "Role-Based Access", desc: "CEO sees a business summary; junior engineers see only what they need.", icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7"/></> },
  { title: "Private AI Processing", desc: "No models touch customer data, all AI processing uses dedicated private capacity.", icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
  { title: "Full Audit Trail", desc: "Every alert, every action, every decision logged and searchable.", icon: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
  { title: "Azure-Native", desc: "Runs inside Microsoft's enterprise-grade cloud infrastructure.", icon: <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
];

const DEPLOYMENT = [
  { step: "1", when: "Week 1", title: "Connect to Azure Environment", desc: "Read-only connection to your Azure tenant. Dashboards populate with your real data. No changes to infrastructure." },
  { step: "2", when: "Weeks 2–4", title: "Configure & Route", desc: "Set up notification routing. Configure alert thresholds for your specific environment and team structure." },
  { step: "3", when: "Month 2", title: "AI Learns Your Environment", desc: "Agents trained on your environment's patterns. Noise reduction reaches full effectiveness, only what matters gets through." },
];

const NEXT_STEPS = [
  { num: "01", title: "Live Demo (30 min)", desc: "See NOC Command with real data from a sample Azure environment. Watch an alert fire, correlate, classify, and resolve, in under 2 minutes.", color: "#00cfb4" },
  { num: "02", title: "Pilot Programme", desc: "Connect to your Azure environment in read-only mode. No infrastructure changes. Your real Azure data visible in the dashboards from day one of your Pilot.", color: "#60a5fa" },
  { num: "03", title: "Technical Deep-Dive", desc: "For IT leadership, a full walkthrough of the architecture, security model, and integration points.", color: "#a78bfa" },
];

function useReveal(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const add = (el: HTMLElement | null, i: number) => { refs.current[i] = el; };
  return add;
}

function LiveAlertDemo() {
  const [stage, setStage] = useState(0);
  const stages = [
    { label: "5 alerts fire simultaneously", color: "#ef4444" },
    { label: "AI correlating causes…", color: "#f97316" },
    { label: "Root cause identified", color: "#eab308" },
    { label: "Runbook sent to engineer", color: "#00cfb4" },
    { label: "✓ Resolved in 41 sec", color: "#34d399" },
  ];
  useEffect(() => {
    const t = setInterval(() => setStage((s) => (s + 1) % stages.length), 1600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="flex items-center gap-2 mb-5">
        <span className="w-2 h-2 rounded-full" style={{ background: "#00cfb4", animation: "pulse 1.5s ease-in-out infinite" }} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Live Incident Feed</span>
      </div>
      <div className="flex flex-col gap-3">
        {stages.map((s, i) => {
          const done = i < stage;
          const current = i === stage;
          return (
            <div key={s.label} className="flex items-center gap-3 transition-all duration-500">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                style={{ background: done || current ? `${s.color}25` : "rgba(255,255,255,0.04)", border: `1.5px solid ${done || current ? s.color : "rgba(255,255,255,0.08)"}` }}>
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: current ? s.color : "rgba(255,255,255,0.15)" }} />
                )}
              </div>
              <span className="text-sm" style={{ color: done || current ? "white" : "rgba(255,255,255,0.3)", fontWeight: current ? 700 : 500 }}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function NocCommandPage() {
  const addReveal = useReveal(24);

  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <section style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2447 45%, #1B3C6E 100%)", position: "relative", overflow: "hidden" }} className="py-24 md:py-32">
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-100px", width: "460px", height: "460px", background: "radial-gradient(circle, rgba(0,207,180,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(0,207,180,0.1)", border: "1px solid rgba(0,207,180,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00cfb4" }} />
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#00cfb4" }}>RITS Flagship Product</span>
                </div>
                <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
                  NOC Command
                </h1>
                <p style={{ fontSize: "1.2rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", marginBottom: "1rem", fontStyle: "italic" }}>
                  &ldquo;Something is broken right now, and no one knows yet.&rdquo;
                </p>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "56ch", marginBottom: "2.5rem" }}>
                  Sound familiar? An always-on digital operations center that watches your entire technology estate, detects problems the moment they occur, and tells your engineers exactly what to do, before any customer notices.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "2.5rem" }}>
                  {[
                    { value: "70%", label: "reduction in resolution time" },
                    { value: "Under 2 min", label: "avg. time to detect issues" },
                    { value: "~80%", label: "noise reduction to engineers" },
                  ].map((s) => (
                    <div key={s.value} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 18px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "6px" }}>
                      <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#00cfb4", letterSpacing: "-0.01em" }}>{s.value}</span>
                      <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <a href="/contact" className="btn-primary">Book a Live Demo <IconArrow /></a>
                  <a href="#how-it-works" className="btn-outline-white">See How It Works</a>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <LiveAlertDemo />
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IT IS */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 0)} className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
              <p className="section-eyebrow">What it is</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
                NOC Command, in one sentence.
              </h2>
              <p style={{ color: "#495057", fontSize: "1.05rem", maxWidth: "68ch", margin: "0 auto", lineHeight: 1.8 }}>
                An always-on digital operations center that watches your entire technology estate, detects problems the moment they occur, and tells your engineers exactly what to do, before any customer notices.
              </p>
            </div>
            <div ref={(el) => addReveal(el, 1)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {WHAT_IT_IS.map((item) => (
                <div key={item.title} style={{ background: "#f8f9fa", border: "1px solid #dce4f0", borderRadius: "16px", padding: "32px" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${item.color}15`, border: `1px solid ${item.color}35`, color: item.color }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{item.icon}</svg>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0f2447", marginBottom: "10px" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#6c757d", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE REAL COST */}
        <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)", padding: "96px 0" }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 2)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow" style={{ color: "#00cfb4" }}>The real cost</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                Why this matters to your business.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 3)} className="reveal" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", overflow: "hidden", marginBottom: "24px" }}>
              {COST_SCENARIOS.map((row, i) => (
                <div key={row.situation} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "18px 24px", borderBottom: i < COST_SCENARIOS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "white" }}>{row.situation}</p>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)" }}>{row.without}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", padding: "28px", borderRadius: "14px", background: "rgba(0,207,180,0.08)", border: "1px solid rgba(0,207,180,0.25)" }}>
              <p style={{ fontSize: "1.05rem", color: "white", fontWeight: 700, marginBottom: "6px" }}>$18,000/hour in lost productivity</p>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
                NOC Command&apos;s 70% MTTR reduction saves your business an average of <strong style={{ color: "#00cfb4" }}>$12,600 per incident</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* THE TEAM: 7 AGENTS */}
        <section style={{ background: "#0a1628", padding: "96px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 4)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow" style={{ color: "#00cfb4" }}>The team</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                Your 24/7 expert AI team, 7 agents.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 5)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              {AGENTS.map((agent, i) => (
                <div key={agent.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "24px", position: "relative" }}>
                  <span style={{ position: "absolute", top: "16px", right: "18px", fontSize: "0.65rem", fontWeight: 800, color: "rgba(255,255,255,0.15)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: agent.color, marginBottom: "16px", boxShadow: `0 0 12px ${agent.color}80` }} />
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: "8px" }}>{agent.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DASHBOARDS */}
        <section style={{ background: "#f8f9fa", padding: "96px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 6)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow">Dashboards</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em" }}>
                Four views, built for four different people.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 7)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {DASHBOARDS.map((d) => (
                <div key={d.persona} style={{ background: "#ffffff", border: "1px solid #dce4f0", borderRadius: "16px", padding: "26px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: d.color }} />
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: d.color, marginBottom: "8px" }}>{d.persona}</p>
                  <h3 style={{ fontWeight: 800, fontSize: "1.15rem", color: "#0f2447", marginBottom: "6px" }}>{d.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#6c757d", marginBottom: "16px" }}>{d.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {d.points.map((p) => (
                      <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: d.color, marginTop: "6px", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.8rem", color: "#495057" }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE DASHBOARD */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 20)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow">See it in action</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
                One screen. Everything that matters.
              </h2>
              <p style={{ color: "#495057", fontSize: "1rem", maxWidth: "60ch", margin: "0 auto" }}>
                Real-time alerts, incidents, and device health, live as they happen across your estate.
              </p>
            </div>
            <LiveDashboardMock />
          </div>
        </section>

        {/* LIVE TOPOLOGY */}
        <section style={{ background: "#0a1628", padding: "96px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 21)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow" style={{ color: "#00cfb4" }}>Live topology</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
                Your entire Azure estate, mapped in real time.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", maxWidth: "60ch", margin: "0 auto" }}>
                From tenant down to individual service, live status flows through the tree the moment something changes.
              </p>
            </div>
            <div ref={(el) => addReveal(el, 22)} className="reveal">
              <TopologyDiagram />
            </div>
          </div>
        </section>

        {/* SMART ALERTS */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 8)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow">Smart alerts</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em" }}>
                The right person gets the right alert at the right time.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 9)} className="reveal" style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
              {SEVERITIES.map((s) => (
                <div key={s.level} style={{ display: "flex", alignItems: "center", gap: "18px", padding: "18px 24px", borderRadius: "12px", background: "#f8f9fa", border: `1px solid ${s.color}30` }}>
                  <span style={{ flexShrink: 0, fontSize: "0.75rem", fontWeight: 800, padding: "6px 14px", borderRadius: "100px", background: `${s.color}15`, color: s.color }}>{s.level}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f2447" }}>{s.label}</p>
                    <p style={{ fontSize: "0.85rem", color: "#6c757d" }}>{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#6c757d" }}>
              Notification channels: Email &middot; SMS &middot; WhatsApp &middot; Slack &middot; PagerDuty &middot; Mobile Push
            </p>
          </div>
        </section>

        {/* DIFFERENTIATION */}
        <section style={{ background: "linear-gradient(135deg, #0a1020 0%, #0f2447 55%, #1B3C6E 100%)", padding: "96px 0", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div aria-hidden="true" style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 500, height: 260, background: "radial-gradient(ellipse, rgba(0,207,180,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />

          <style>{`
            @keyframes diffRowIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
            .diff-row { opacity:0; animation: diffRowIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
            .diff-row:hover .diff-old { border-color: rgba(239,68,68,0.5) !important; }
            .diff-row:hover .diff-new { border-color: rgba(0,207,180,0.7) !important; box-shadow: 0 8px 28px rgba(0,207,180,0.25) !important; transform: translateY(-2px); }
            .diff-row:hover .diff-new { transform: translateY(-2px); }
            @keyframes diffPulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
            .diff-arrow { animation: diffPulse 1.8s ease-in-out infinite; }
          `}</style>

          <div className="max-w-5xl mx-auto px-6 lg:px-10 relative">
            <div ref={(el) => addReveal(el, 10)} className="reveal" style={{ textAlign: "center", marginBottom: "16px" }}>
              <p className="section-eyebrow" style={{ color: "#00cfb4" }}>Differentiation</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                &ldquo;We already have Azure Monitor / Grafana / PagerDuty&rdquo;
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>Those tools show you data. NOC Command understands data.</p>
            </div>

            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 44px 1fr", gap: "12px", marginTop: "44px", marginBottom: "16px", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(239,68,68,0.75)" }}>Existing Tools</span>
              </div>
              <div />
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00cfb4" }}>NOC Command</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {DIFFERENTIATION.map((row, i) => (
                <div key={row.old} className="diff-row" style={{ display: "grid", gridTemplateColumns: "1fr 44px 1fr", gap: "12px", alignItems: "center", animationDelay: `${i * 90}ms` }}>
                  <div className="diff-old" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", borderRadius: "12px", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)", transition: "border-color 0.3s ease" }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/></svg>
                    </span>
                    <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", margin: 0 }}>{row.old}</p>
                  </div>

                  <div className="diff-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#00cfb4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>

                  <div className="diff-new" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", borderRadius: "12px", background: "rgba(0,207,180,0.08)", border: "1px solid rgba(0,207,180,0.3)", transition: "all 0.3s ease" }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "rgba(0,207,180,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#00cfb4" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <p style={{ fontSize: "0.88rem", color: "white", fontWeight: 700, margin: 0 }}>{row.noc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section style={{ background: "#f8f9fa", padding: "96px 0" }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 12)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow">Results</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em" }}>
                What you can expect.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 13)} className="reveal" style={{ background: "#ffffff", border: "1px solid #dce4f0", borderRadius: "16px", overflow: "hidden", marginBottom: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", background: "#0f2447" }}>
                <div style={{ padding: "14px 20px" }}><span style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Metric</span></div>
                <div style={{ padding: "14px 20px" }}><span style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Industry Avg</span></div>
                <div style={{ padding: "14px 20px", background: "rgba(0,207,180,0.15)" }}><span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00cfb4", textTransform: "uppercase", letterSpacing: "0.06em" }}>With NOC Command</span></div>
              </div>
              {RESULTS.map((row, i) => (
                <div key={row.metric} style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", borderTop: "1px solid #eef1f6" }}>
                  <div style={{ padding: "16px 20px" }}><span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#0f2447" }}>{row.metric}</span></div>
                  <div style={{ padding: "16px 20px" }}><span style={{ fontSize: "0.88rem", color: "#6c757d" }}>{row.industry}</span></div>
                  <div style={{ padding: "16px 20px", background: "rgba(0,169,157,0.04)" }}><span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#00A99D" }}>{row.noc}</span></div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#495057", fontStyle: "italic" }}>
              A single prevented major incident typically pays for a full year of the platform.
            </p>
          </div>
        </section>

        {/* SECURITY */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 14)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow">Security</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em" }}>
                Built to enterprise standards.
              </h2>
            </div>
            <div ref={(el) => addReveal(el, 15)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {SECURITY.map((s) => (
                <div key={s.title} style={{ background: "#f8f9fa", border: "1px solid #dce4f0", borderRadius: "14px", padding: "24px" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(0,169,157,0.1)", color: "#00A99D" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{s.icon}</svg>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "0.98rem", color: "#0f2447", marginBottom: "8px" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#6c757d", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPLOYMENT */}
        <section id="how-it-works" style={{ background: "#f0f4fa", padding: "96px 0" }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div ref={(el) => addReveal(el, 16)} className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
              <p className="section-eyebrow">Deployment</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f2447", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                Operational in 30 days.
              </h2>
              <p style={{ color: "#495057", fontSize: "0.95rem", maxWidth: "60ch", margin: "0 auto" }}>
                Connects to your existing Azure environment. No ripping out existing tools. No long integration projects.
              </p>
            </div>
            <div ref={(el) => addReveal(el, 17)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "32px" }}>
              {DEPLOYMENT.map((d) => (
                <div key={d.step} style={{ background: "#ffffff", border: "1px solid #dce4f0", borderRadius: "16px", padding: "28px", position: "relative" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#00A99D", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, marginBottom: "16px" }}>{d.step}</div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#00A99D" }}>{d.when}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#0f2447", margin: "6px 0 10px" }}>{d.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#6c757d", lineHeight: 1.65 }}>{d.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#495057" }}>
              No professional services engagement required. Initial Azure connection takes under 15 minutes.
            </p>
          </div>
        </section>

        {/* ABOUT / TRUST */}
        <section style={{ background: "#0f2447", padding: "80px 0" }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
            <p className="section-eyebrow" style={{ color: "#00cfb4" }}>About us</p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#ffffff", marginBottom: "1rem" }}>Resource Innovative Technologies (RITS)</h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "68ch", margin: "0 auto 1.5rem" }}>
              RITS is a specialized technology consultancy focused on Azure infrastructure, AI-powered operations, and enterprise platform engineering. NOC Command, our flagship solution, turns proven NOC and DevOps experience into faster incident response, improved reliability, and measurable business outcomes for enterprise clients.
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
              Built on Microsoft Azure &middot; US-ready engineering team &middot; SOC 2 &amp; HIPAA-first design &middot; Ongoing product investment
            </p>
          </div>
        </section>

        {/* NEXT STEP / CTA */}
        <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #0f2447 60%, #1B3C6E 100%)", padding: "96px 0", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(0,169,157,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
            <div ref={(el) => addReveal(el, 18)} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="section-eyebrow" style={{ color: "#00cfb4" }}>The next step</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "1rem", lineHeight: 1.2 }}>
                &ldquo;The question isn&apos;t whether your systems will have a problem.<br className="hidden md:block"/> The question is whether you&apos;ll know about it before your customers do.&rdquo;
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>NOC Command makes sure you always do.</p>
            </div>

            <div ref={(el) => addReveal(el, 19)} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "48px" }}>
              {NEXT_STEPS.map((n) => (
                <div key={n.num} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "28px" }}>
                  <span style={{ fontSize: "1.5rem", fontWeight: 900, color: n.color }}>{n.num}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "white", margin: "10px 0" }}>{n.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{n.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/contact" className="btn-primary">Book a Live Demo <IconArrow /></a>
                <a href="tel:2485226740" className="btn-outline-white">Call 248-522-6740</a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
