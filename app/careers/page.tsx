"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jobs = [
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
  Engineering: "bg-blue-100 text-blue-700",
  Design: "bg-purple-100 text-purple-700",
  Product: "bg-green-100 text-green-700",
  Operations: "bg-orange-100 text-orange-700",
  Business: "bg-teal-100 text-teal-700",
};

const SKILL_PALETTE = [
  { bg: "#eef4ff", text: "#2563eb" },
  { bg: "#f3eeff", text: "#7c3aed" },
  { bg: "#edfaf5", text: "#059669" },
  { bg: "#fff7ed", text: "#ea580c" },
  { bg: "#fff0f8", text: "#db2777" },
  { bg: "#e6f7f6", text: "#00877d" },
  { bg: "#fffbeb", text: "#d97706" },
  { bg: "#ecfeff", text: "#0891b2" },
  { bg: "#f0fdf4", text: "#16a34a" },
];

const perks = [
  {
    label: "Competitive Salary", desc: "Market-rate + performance bonuses",
    color: "#00A99D", bg: "#e6f7f6",
    icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    label: "Health Benefits", desc: "Medical, dental & vision coverage",
    color: "#db2777", bg: "#fff0f8",
    icon: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    label: "Remote Work", desc: "Work from anywhere in the world",
    color: "#2563eb", bg: "#eef4ff",
    icon: <><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.8"/></>,
  },
  {
    label: "Learning Budget", desc: "$2,000/year for courses & conferences",
    color: "#7c3aed", bg: "#f3eeff",
    icon: <path d="M22 10L12 4 2 10l10 6 10-6zM6 12.5V17c0 1.1 2.7 3 6 3s6-1.9 6-3v-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    label: "Flexible Hours", desc: "Async-first, no rigid 9-to-5",
    color: "#ea580c", bg: "#fff7ed",
    icon: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
  },
  {
    label: "Annual Team Retreat", desc: "We all meet up once a year, in person",
    color: "#059669", bg: "#edfaf5",
    icon: <path d="M3 21l6-14 4 8 3-5 5 11H3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
  {
    label: "Equipment Stipend", desc: "Best-in-class gear, fully covered",
    color: "#0891b2", bg: "#ecfeff",
    icon: <><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
  },
  {
    label: "90-Day Onboarding", desc: "Structured ramp so you hit the ground running",
    color: "#d97706", bg: "#fffbeb",
    icon: <path d="M9 11l3 3L22 4M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  },
];

function TeamBubbles() {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => p+1), 600);
    return () => clearInterval(t);
  }, []);
  const members = [
    { initials:"RK", role:"AI Engineer", color:"#60a5fa", x:50, y:20, size:52 },
    { initials:"SM", role:"Full Stack", color:"#00A99D", x:20, y:45, size:48 },
    { initials:"JP", role:"Product", color:"#a78bfa", x:75, y:48, size:44 },
    { initials:"AT", role:"DevOps", color:"#34d399", x:40, y:70, size:50 },
    { initials:"MK", role:"UX/UI", color:"#f472b6", x:65, y:22, size:42 },
    { initials:"DL", role:"Mobile", color:"#fb923c", x:15, y:72, size:46 },
    { initials:"PR", role:"QA", color:"#fbbf24", x:82, y:72, size:40 },
    { initials:"VC", role:"Backend", color:"#00A99D", x:35, y:30, size:38 },
  ];
  return (
    <div className="relative w-full h-72 select-none">
      {members.map((m, i) => (
        <div key={m.initials} className="absolute flex flex-col items-center gap-1 transition-transform duration-1000"
          style={{ left:`${m.x}%`, top:`${m.y}%`, transform:"translate(-50%,-50%)" }}>
          <div className="rounded-full flex items-center justify-center font-black text-white shadow-lg"
            style={{
              width:m.size, height:m.size,
              background:`${m.color}25`,
              border:`2px solid ${m.color}60`,
              fontSize: m.size*0.28,
              boxShadow: pulse%members.length===i ? `0 0 20px ${m.color}80, 0 0 40px ${m.color}40` : `0 0 8px ${m.color}30`,
              transition:"box-shadow 0.4s ease",
              color: m.color,
            }}>
            {m.initials}
          </div>
          <span className="text-[9px] font-semibold whitespace-nowrap" style={{ color:`${m.color}80` }}>{m.role}</span>
        </div>
      ))}
      {/* Center: hiring badge */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
        <div className="px-4 py-2 rounded-full text-xs font-black text-white border border-white/20 backdrop-blur-sm"
          style={{ background:"rgba(27,60,110,0.8)", boxShadow:"0 0 30px rgba(0,169,157,0.2)" }}>
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
            <p className="text-[#00A99D] uppercase tracking-widest text-sm font-semibold mb-4">
              Join the Team
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Build the future.{" "}
              <span className="text-[#00A99D]">With people who actually care.</span>
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
                color: "#2563eb", bg: "#eef4ff",
                icon: <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>,
              },
              {
                title: "Senior Team",
                desc: "You'll work alongside senior engineers and leaders who love to share knowledge. Every day is a learning opportunity.",
                color: "#7c3aed", bg: "#f3eeff",
                icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
              },
              {
                title: "Real Ownership",
                desc: "Your ideas are heard. You'll own meaningful parts of the product and have real influence on roadmap decisions.",
                color: "#059669", bg: "#edfaf5",
                icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
              },
              {
                title: "Competitive Pay + Equity",
                desc: "Top-of-market salaries and equity in the projects you help build. When the company wins, you win.",
                color: "#d97706", bg: "#fffbeb",
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
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#00A99D] hover:text-[#1B3C6E]"
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
                    {(job.openDate || job.closeDate) && (
                      <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4 text-sm text-gray-500">
                        {job.openDate && (
                          <span><span className="font-semibold text-gray-700">Date of Opening:</span> {job.openDate}</span>
                        )}
                        {job.closeDate && (
                          <span><span className="font-semibold text-gray-700">Date of Closing:</span> {job.closeDate}</span>
                        )}
                      </div>
                    )}
                    <p className="text-gray-600 leading-relaxed mb-5">
                      {job.description}
                    </p>
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
                gradient: "from-indigo-800 to-indigo-600",
              },
              {
                title: "Your growth is our growth.",
                desc: "We promote from within, fund learning, and invest in your career. When you level up, we all level up. There is no ceiling here.",
                gradient: "from-blue-900 to-blue-700",
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
