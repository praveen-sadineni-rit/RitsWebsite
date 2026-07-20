"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  openDate?: string;
  closeDate?: string;
  skills?: string[];
  mailApply?: boolean;
  experience?: string;
  workMode?: string;
  openings?: number;
  responsibilities?: string[];
  applyEmails?: string[];
};

const jobs: Job[] = [
  {
    id: 11,
    title: "Delivery Manager – US Staffing",
    department: "Operations",
    location: "Hyderabad, India (Onsite)",
    type: "Full-time",
    experience: "12+ years total; 6+ years as a Delivery Manager in US Staffing",
    workMode: "5 Days Onsite – Near Rayadurg Metro, Karachi Bakery",
    description:
      "RITS is looking for an experienced Delivery Manager to partner with our US Recruitment and Sales teams to drive successful client delivery, business growth, and operational excellence.",
    responsibilities: [
      "Manage end-to-end delivery for US staffing accounts: quality, timely closures, and client satisfaction",
      "Collaborate with US Recruitment and Sales teams to meet client hiring goals",
      "Build strong client relationships, lead negotiations, and deliver across accounts",
      "Drive growth within existing accounts and support new business initiatives",
      "Present daily, weekly, and monthly delivery and performance reports to management",
    ],
    skills: ["US Staffing Delivery", "Client Management", "Stakeholder Management", "Negotiation", "Business Development", "Communication"],
    applyEmails: ["hr@rits-it.com", "charan@rits-it.com"],
  },
  {
    id: 12,
    title: "US HR Specialist",
    department: "Operations",
    location: "Hyderabad, India (Onsite)",
    type: "Full-time",
    experience: "5+ years in US HR / HR Operations",
    workMode: "5 Days Onsite – Near Rayadurg Metro, Karachi Bakery",
    openings: 2,
    description:
      "We are looking for experienced US HR Specialists with strong expertise in US HR operations, payroll, compliance, and employee lifecycle management to join our growing team.",
    responsibilities: [
      "Handle employee onboarding, documentation, and lifecycle management",
      "Manage and process ADP payroll accurately and within timelines",
      "Perform E-Verify processes and ensure employment eligibility compliance",
      "Coordinate with immigration attorneys for H1B, OPT, and CPT visa processes",
      "Maintain accurate employee records, HR documentation, and compliance files",
      "Track employee timesheets and follow up on submissions and approvals",
      "Ensure adherence to US HR policies, labor laws, and compliance requirements",
    ],
    skills: ["US HR Operations", "ADP Payroll", "E-Verify", "Onboarding", "Visa Documentation", "H1B/OPT/CPT", "Compliance"],
    applyEmails: ["charan@rits-it.com", "hr@rits-it.com"],
  },
  {
    id: 13,
    title: "USA Immigration Specialist",
    department: "Operations",
    location: "Hyderabad, India (Onsite)",
    type: "Full-time",
    workMode: "5 Days Onsite",
    description:
      "We are looking for an experienced USA Immigration Specialist to work closely with our Immigration and HR teams. The ideal candidate has strong knowledge of US immigration processes, contract documentation, and compliance requirements.",
    responsibilities: [
      "Review and manage immigration contracts, agreements, and documentation",
      "Work directly with the immigration team on CPT, OPT, H1B, and other visa processes",
      "Coordinate document collection, verification, and compliance tracking",
      "Maintain accurate immigration records, case updates, and status reports",
      "Collaborate with candidates, employees, attorneys, and internal teams",
      "Ensure timely completion of immigration tasks while maintaining compliance standards",
    ],
    skills: ["US Immigration", "CPT/OPT/H1B", "Contract Review", "Documentation", "Compliance", "Coordination"],
    applyEmails: ["charan@rits-it.com", "hr@rits-it.com"],
  },
  {
    id: 1,
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "We're looking for a Senior Full Stack Engineer to help design and build scalable web applications end-to-end. You'll work closely with product and design to ship features that matter, own significant parts of the codebase, and mentor junior engineers. Strong experience with Node.js, React, TypeScript, and cloud infrastructure (AWS or GCP) is expected. You'll have real autonomy and real impact.",
  },
  {
    id: 2,
    title: "Senior React Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "We need a Senior React Developer who obsesses over component architecture, performance, and developer experience. You'll lead front-end efforts across multiple product lines, establish best practices, and collaborate directly with UX designers and back-end engineers. Deep knowledge of React, hooks, state management (Zustand or Redux), and testing is required.",
  },
  {
    id: 3,
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Join us as an AI/ML Engineer to build intelligent features into our products, from LLM integrations and RAG pipelines to custom model fine-tuning and inference optimization. You'll work on real problems with real data and have the freedom to choose the right tools. Python, PyTorch or TensorFlow, and experience deploying models to production are required.",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    description:
      "We're looking for a DevOps Engineer to help us build and maintain robust CI/CD pipelines, container orchestration (Kubernetes), and cloud infrastructure. You'll work cross-functionally with engineers and product teams to ensure fast, reliable delivery. Experience with Terraform, Docker, and major cloud platforms is a must.",
  },
  {
    id: 5,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "We need a UX/UI Designer who can translate complex workflows into intuitive, beautiful interfaces. You'll run user research, create wireframes and high-fidelity prototypes in Figma, and work hand-in-hand with engineers to ensure pixel-perfect delivery. A portfolio demonstrating both strong visual design and systems thinking is required.",
  },
  {
    id: 6,
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    description:
      "We're hiring a Product Manager to own product roadmaps, define requirements, and drive cross-functional execution. You'll talk to customers, analyze data, write crisp specs, and partner with engineering and design to ship products people love. Prior experience in B2B SaaS or enterprise software is a plus.",
  },
  {
    id: 7,
    title: "Talent Acquisition Specialist",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    description:
      "We're growing fast and need a Talent Acquisition Specialist to help us find and hire exceptional people. You'll manage full-cycle recruiting across technical and non-technical roles, build talent pipelines, and create a great candidate experience from first touch to offer. Experience hiring engineers in a remote-first environment is a strong plus.",
  },
  {
    id: 8,
    title: "Business Analyst",
    department: "Business",
    location: "Rock Hill, SC",
    type: "Full-time",
    openDate: "06/15/2026",
    closeDate: "07/10/2026",
    description:
      "Seeking qualified Business Analyst with a master's in Management, Business Administration, or CSA and 6 months of work experience for requirement gathering sessions with stakeholders using techniques such as brainstorming, interviews, focus groups, and document analysis. Uses source-to-target mappings, functional specifications, and data dictionaries on a regular basis to identify impacted areas. Examines and reviews clinical data available from existing information sources and collects data statistics and informative summaries. Performs GAP and risk analysis of existing applications and evaluates the benefits of new functionalities and features. Produces Business Requirements Documents (BRD) and Functional Design Documents (FDD), and documents Epics and User Stories in Jira, sharing them with all parties involved in the project. Frequent/occasional travel may be required to unanticipated work-site locations within the US as a roving employee. No relocation required.",
    skills: ["Requirement Gathering", "Brainstorming", "Focus Groups", "Data Mapping", "BRD", "FDD", "GAP Analysis", "Jira", "User Stories"],
    mailApply: true,
  },
  {
    id: 9,
    title: "Software Developer",
    department: "Engineering",
    location: "Rock Hill, SC",
    type: "Full-time",
    openDate: "06/15/2026",
    closeDate: "07/10/2026",
    description:
      "Seeking qualified Software Developer with a master's in Science, Engineering, or CIS and 6 months of work experience with strong C#/.NET experience, building and maintaining cross-platform mobile apps using .NET MAUI/Xamarin, following clean architecture, MVVM, and solid engineering practices. Hands-on with Azure DevOps CI/CD, iOS/Android build pipelines, provisioning/certificates, and troubleshooting complex build/release issues across macOS/Windows environments. Comfortable owning features end-to-end, including requirements, implementation, debugging, and production support, while collaborating with teams and continuously learning new tech stacks. Frequent/occasional travel may be required to unanticipated work-site locations within the US as a roving employee. No relocation required.",
    skills: ["C#/.NET", ".NET MAUI", "Xamarin", "MVVM", "Azure DevOps", "CI/CD", "iOS/Android", "macOS/Windows"],
    mailApply: true,
  },
  {
    id: 10,
    title: "Software Engineer",
    department: "Engineering",
    location: "Rock Hill, SC",
    type: "Full-time",
    openDate: "06/15/2026",
    closeDate: "07/10/2026",
    description:
      "Seeking qualified Software Engineer with a master's in Information Systems, CS, or Engineering and 6 months of work experience to design, develop, and maintain backend services using Java and Spring Boot. Creates REST APIs and maintains interface specifications using Swagger/OpenAPI for system integrations. Applies core Java concepts including multithreading, concurrency handling, exception management, and collections for real-time processing. Implements application security and compliance updates, including Blackduck vulnerability remediation and internal code policy changes across multiple services. Must be willing to travel and work at unanticipated worksite locations in the US. Travel may be required at least once or twice a month based on end-clients' needs as a roving employee. No relocation required.",
    skills: ["Java", "Spring Boot", "REST APIs", "Swagger/OpenAPI", "Multithreading", "Blackduck", "App Security"],
    mailApply: true,
  },
];

const filters = ["All", "Engineering", "Design", "Product", "Operations", "Business"];

const departmentColors: Record<string, string> = {
  Engineering: "bg-slate-100 text-slate-700",
  Design: "bg-amber-100 text-amber-700",
  Product: "bg-slate-100 text-slate-700",
  Operations: "bg-amber-100 text-amber-700",
  Business: "bg-amber-100 text-amber-700",
};

const SKILL_PALETTE = [
  { bg: "#EAF1F8", text: "#5E82AE" },
  { bg: "#FBF4DD", text: "#A9781A" },
  { bg: "#EAF1F8", text: "#3D5A80" },
  { bg: "#FBF4DD", text: "#A9781A" },
  { bg: "#FBF4DD", text: "#C99A2E" },
  { bg: "#FBF4DD", text: "#B0810E" },
  { bg: "#FBF4DD", text: "#A9781A" },
  { bg: "#EAF1F8", text: "#0891b2" },
  { bg: "#EAF1F8", text: "#3D5A80" },
];

const perks = [
  {
    label: "Competitive Salary", desc: "Market-rate + performance bonuses",
    color: "#E8B53D", bg: "#FBF4DD",
    icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    label: "Health Benefits", desc: "Medical, dental & vision coverage",
    color: "#C99A2E", bg: "#FBF4DD",
    icon: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    label: "Remote Work", desc: "Work from anywhere in the world",
    color: "#5E82AE", bg: "#EAF1F8",
    icon: <><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.8"/></>,
  },
  {
    label: "Learning Budget", desc: "$2,000/year for courses & conferences",
    color: "#A9781A", bg: "#FBF4DD",
    icon: <path d="M22 10L12 4 2 10l10 6 10-6zM6 12.5V17c0 1.1 2.7 3 6 3s6-1.9 6-3v-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    label: "Flexible Hours", desc: "Async-first, no rigid 9-to-5",
    color: "#A9781A", bg: "#FBF4DD",
    icon: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
  },
  {
    label: "Annual Team Retreat", desc: "We all meet up once a year, in person",
    color: "#3D5A80", bg: "#EAF1F8",
    icon: <path d="M3 21l6-14 4 8 3-5 5 11H3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    label: "Equipment Stipend", desc: "Best-in-class gear, fully covered",
    color: "#0891b2", bg: "#EAF1F8",
    icon: <><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
  },
  {
    label: "90-Day Onboarding", desc: "Structured ramp so you hit the ground running",
    color: "#A9781A", bg: "#FBF4DD",
    icon: <path d="M9 11l3 3L22 4M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
];

function TeamBubbles() {
  // Connected constellation: role nodes evenly ringed around a "We're hiring" hub,
  // linked by data lines with pulses flowing outward (the team growing).
  const members = [
    { initials:"RK", role:"AI Engineer", color:"#86A8CE" },
    { initials:"MK", role:"UX/UI", color:"#F3C34E" },
    { initials:"JP", role:"Product", color:"#C99A2E" },
    { initials:"PR", role:"QA", color:"#E8B53D" },
    { initials:"AT", role:"DevOps", color:"#5E82AE" },
    { initials:"DL", role:"Mobile", color:"#E8B53D" },
    { initials:"SM", role:"Full Stack", color:"#E8B53D" },
    { initials:"VC", role:"Backend", color:"#86A8CE" },
  ];
  const VW = 480, VH = 380, cx = 240, cy = 190, rx = 188, ry = 150;
  const nodes = members.map((m, i) => {
    const a = ((-90 + i * 45) * Math.PI) / 180;
    return { ...m, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });

  return (
    <div
      className="select-none"
      style={{ position: "relative", width: "100%", maxWidth: VW, margin: "0 auto", aspectRatio: `${VW} / ${VH}` }}
    >
      <style>{`
        @keyframes tb-dash { to { stroke-dashoffset:-24; } }
        @keyframes tb-ring { 0%,100%{ transform:scale(1); opacity:.16 } 50%{ transform:scale(1.16); opacity:.32 } }
        @keyframes tb-bob  { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-6px) } }
        .tb-line { stroke-dasharray:5 7; animation:tb-dash 1.1s linear infinite; }
        .tb-node { animation:tb-bob 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .tb-line, .tb-node, .tb-ring, .tb-pulse { animation:none !important; }
        }
      `}</style>

      <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height="100%" fill="none" aria-hidden>
        {nodes.map((n, i) => (
          <g key={`link-${n.initials}`}>
            <line
              x1={cx} y1={cy} x2={n.x} y2={n.y}
              stroke={n.color} strokeOpacity="0.4" strokeWidth="1.5"
              className="tb-line" style={{ animationDelay: `${i * 0.12}s` }}
            />
            <circle r="3" fill={n.color} className="tb-pulse">
              <animateMotion dur={`${2.4 + i * 0.22}s`} repeatCount="indefinite" path={`M${cx},${cy} L${n.x},${n.y}`} />
            </circle>
          </g>
        ))}
        {[54, 78, 104].map((r, i) => (
          <circle
            key={r} cx={cx} cy={cy} r={r}
            stroke="#E8B53D" strokeOpacity="0.16" strokeWidth="1"
            className="tb-ring"
            style={{ transformOrigin: `${cx}px ${cy}px`, animation: `tb-ring ${3 + i}s ease-in-out ${i * 0.4}s infinite` }}
          />
        ))}
      </svg>

      {/* Role nodes overlaid at exact coordinates */}
      {nodes.map((n, i) => (
        <div
          key={n.initials}
          style={{ position: "absolute", left: `${(n.x / VW) * 100}%`, top: `${(n.y / VH) * 100}%`, transform: "translate(-50%, -50%)" }}
        >
          <div
            className="tb-node flex flex-col items-center gap-1"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <div
              className="rounded-full flex items-center justify-center font-black"
              style={{
                width: 46, height: 46,
                background: `${n.color}22`,
                border: `2px solid ${n.color}60`,
                boxShadow: `0 0 16px ${n.color}30`,
                fontSize: 13,
                color: n.color,
              }}
            >
              {n.initials}
            </div>
            <span className="text-[9px] font-semibold whitespace-nowrap" style={{ color: `${n.color}b3` }}>{n.role}</span>
          </div>
        </div>
      ))}

      {/* Center hiring hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="px-4 py-2 rounded-full text-xs font-black text-white border border-white/20 backdrop-blur-sm"
          style={{ background: "rgba(27,60,110,0.9)", boxShadow: "0 0 30px rgba(232,181,61,0.35)" }}
        >
          We&apos;re hiring ✦
        </div>
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [openJob, setOpenJob] = useState<number | null>(null);

  const filteredJobs =
    activeFilter === "All"
      ? jobs
      : jobs.filter((j) => j.department === activeFilter);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="bg-[#0a1628] text-white py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#E8B53D] uppercase tracking-widest text-sm font-semibold mb-4">
              Join the Team
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Build the future.{" "}
              <span className="text-[#E8B53D]">With people who actually care.</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mb-10">
              We&apos;re a team of engineers, product thinkers, and talent experts who
              believe great technology starts with great people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#jobs"
                className="bg-[#1B3C6E] hover:bg-[#0f2447] text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                See Open Roles
              </a>
              <a
                href="#culture"
                className="border border-white/30 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                Learn About Culture
              </a>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <TeamBubbles />
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Why work with us?
          </h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-14">
            We&apos;ve built a culture where talented people do their best work,
            without the noise.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Remote-First Culture",
                desc: "Work from anywhere. We care about output, not office attendance. Our processes are designed for async collaboration.",
                color: "#5E82AE", bg: "#EAF1F8",
                icon: <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>,
              },
              {
                title: "Senior Team",
                desc: "You'll work alongside senior engineers and leaders who love to share knowledge. Every day is a learning opportunity.",
                color: "#A9781A", bg: "#FBF4DD",
                icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
              },
              {
                title: "Real Ownership",
                desc: "Your ideas are heard. You'll own meaningful parts of the product and have real influence on roadmap decisions.",
                color: "#3D5A80", bg: "#EAF1F8",
                icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
              },
              {
                title: "Competitive Pay + Equity",
                desc: "Top-of-market salaries and equity in the projects you help build. When the company wins, you win.",
                color: "#A9781A", bg: "#FBF4DD",
                icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: card.bg, color: card.color }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section id="jobs" className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Open Positions
          </h2>
          <p className="text-gray-500 text-center mb-10">
            We&apos;re hiring across multiple teams. Find your fit.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActiveFilter(f);
                  setOpenJob(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  activeFilter === f
                    ? "bg-[#1B3C6E] text-white shadow"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#E8B53D] hover:text-[#1B3C6E]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <button
                  className="w-full text-left px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  onClick={() =>
                    setOpenJob(openJob === job.id ? null : job.id)
                  }
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold text-gray-900">
                      {job.title}
                    </span>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          departmentColors[job.department]
                        }`}
                      >
                        {job.department}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {job.location}
                      </span>
                      <span className="text-gray-400 text-sm">&bull;</span>
                      <span className="text-gray-400 text-sm">{job.type}</span>
                    </div>
                  </div>
                  <span className="text-[#1B3C6E] text-sm font-medium shrink-0">
                    {openJob === job.id ? "Hide details" : "View details"}
                  </span>
                </button>

                {openJob === job.id && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    {(job.openDate || job.closeDate || job.experience || job.workMode || job.openings) && (
                      <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4 text-sm text-gray-500">
                        {job.openDate && (
                          <span><span className="font-semibold text-gray-700">Date of Opening:</span> {job.openDate}</span>
                        )}
                        {job.closeDate && (
                          <span><span className="font-semibold text-gray-700">Date of Closing:</span> {job.closeDate}</span>
                        )}
                        {job.experience && (
                          <span><span className="font-semibold text-gray-700">Experience:</span> {job.experience}</span>
                        )}
                        {job.workMode && (
                          <span><span className="font-semibold text-gray-700">Work Mode:</span> {job.workMode}</span>
                        )}
                        {job.openings && (
                          <span><span className="font-semibold text-gray-700">Open Positions:</span> {job.openings}</span>
                        )}
                      </div>
                    )}
                    <p className="text-gray-600 leading-relaxed mb-5">
                      {job.description}
                    </p>
                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div className="mb-5">
                        <p className="text-sm font-semibold text-gray-900 mb-2">Key Responsibilities</p>
                        <ul className="space-y-1.5">
                          {job.responsibilities.map((r) => (
                            <li key={r} className="flex gap-2 text-gray-600 text-sm leading-relaxed">
                              <span className="text-[#E8B53D] mt-0.5 shrink-0">✓</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {job.skills.map((skill, i) => (
                          <span
                            key={skill}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full"
                            style={{
                              background: SKILL_PALETTE[i % SKILL_PALETTE.length].bg,
                              color: SKILL_PALETTE[i % SKILL_PALETTE.length].text,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    {job.mailApply ? (
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          Aspiring candidates should mail their resumes to:
                        </p>
                        <address className="not-italic text-sm text-gray-600 leading-relaxed">
                          Resource Innovative Technologies LLC<br />
                          331 E Main Street, Ste 200<br />
                          Rock Hill, SC 29730
                        </address>
                      </div>
                    ) : job.applyEmails && job.applyEmails.length > 0 ? (
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                        <p className="text-sm font-semibold text-gray-900 mb-3">
                          Send your resume to:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.applyEmails.map((em) => (
                            <a
                              key={em}
                              href={`mailto:${em}`}
                              className="inline-block bg-[#1B3C6E] hover:bg-[#0f2447] text-white font-semibold px-5 py-2 rounded-lg transition text-sm"
                            >
                              {em}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        href="mailto:careers@rits-it.com"
                        className="inline-block bg-[#1B3C6E] hover:bg-[#0f2447] text-white font-semibold px-6 py-2.5 rounded-lg transition"
                      >
                        Apply Now
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE SECTION */}
      <section id="culture" className="bg-[#0a1628] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Culture
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-14">
            Culture isn&apos;t a slide in a deck. It&apos;s how we actually work every day.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "We ship real things.",
                desc: "Our engineers have autonomy and accountability. There are no endless planning cycles, we scope it, build it, ship it, and learn from it.",
                gradient: "from-[#0f2447] to-[#1B3C6E]",
              },
              {
                title: "Async by default.",
                desc: "We respect your time and focus. Meetings are intentional and rare. Deep work is protected. You can do your best thinking without constant interruption.",
                gradient: "from-slate-800 to-slate-600",
              },
              {
                title: "Your growth is our growth.",
                desc: "We promote from within, fund learning, and invest in your career. When you level up, we all level up. There is no ceiling here.",
                gradient: "from-slate-900 to-slate-700",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl overflow-hidden border border-white/10"
              >
                <div
                  className={`bg-gradient-to-br ${item.gradient} h-48 flex items-end p-6`}
                >
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <div className="bg-[#0f1f3d] p-6">
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Perks &amp; Benefits
          </h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-14">
            We take care of our team so our team can take care of the work.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk) => (
              <div
                key={perk.label}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: perk.bg, color: perk.color }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    {perk.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {perk.label}
                </h3>
                <p className="text-gray-500 text-sm">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20 px-6 text-center border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Don&apos;t see your role?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Send us your r&eacute;sum&eacute; anyway. We&apos;re always on the lookout for
            exceptional people, even when we don&apos;t have a perfect open req.
          </p>
          <a
            href="mailto:careers@rits-it.com"
            className="inline-block bg-[#1B3C6E] hover:bg-[#0f2447] text-white font-bold px-10 py-4 rounded-xl text-lg transition"
          >
            Send Your Resume
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
