"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EducationPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section
        className="pt-24 pb-20 px-6"
        style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 50%, #0f2447 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[#00A99D] text-xs font-bold tracking-widest uppercase mb-4">Education</p>
          <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            Learning Technology<br />
            <span style={{ color: "#00A99D" }}>That Scales.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
            We build EdTech platforms, LMS solutions, and student engagement tools that make learning more accessible, measurable, and effective.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {["FERPA Compliant", "LTI Standards", "Mobile-First"].map((pill) => (
              <span key={pill} className="px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-white/20 bg-white/5">
                {pill}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/contact" className="btn-primary">Start the Conversation</a>
            <a href="/services" className="btn-outline-white">View Services</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6" style={{ background: "#f8f9fa" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "2M+", label: "Students on Our Platforms" },
              { stat: "95%", label: "Student Retention Rate" },
              { stat: "3x", label: "Engagement vs. Legacy LMS" },
              { stat: "100+", label: "Educational Institutions" },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="font-black text-4xl text-[#1B3C6E] mb-2">{stat}</p>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="section-eyebrow">Solutions</p>
          <h2 className="font-black text-3xl text-[#0f2447] mb-4">Built for modern education</h2>
          <p className="text-gray-500 text-lg mb-12 max-w-2xl">
            Purpose-built EdTech solutions that meet students, educators, and administrators where they are, and take them further.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "LMS Development",
                desc: "Custom learning management systems built on open standards, featuring course authoring, progress tracking, and seamless third-party integrations.",
                color: "#60a5fa",
                path: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              },
              {
                title: "Student Engagement Platforms",
                desc: "Interactive discussion boards, peer collaboration tools, and gamified learning paths that keep students motivated and connected to their peers.",
                color: "#00A99D",
                path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
              },
              {
                title: "Assessment & Testing Tools",
                desc: "Secure, adaptive assessment platforms with auto-grading, plagiarism detection, and proctoring integrations to ensure academic integrity at scale.",
                color: "#a78bfa",
                path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
              },
              {
                title: "Learning Analytics & Reporting",
                desc: "Real-time dashboards that surface at-risk students, course completion trends, and learning outcome metrics, enabling data-driven academic decisions.",
                color: "#34d399",
                path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
              {
                title: "Mobile Learning Apps",
                desc: "Native iOS and Android apps with offline content access, push notifications, and microlearning modules that fit into students' busy lives.",
                color: "#fb923c",
                path: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
              },
              {
                title: "Administrative Automation",
                desc: "Automated enrollment workflows, scheduling tools, and reporting pipelines that reduce administrative burden and free staff to focus on students.",
                color: "#f472b6",
                path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
              },
            ].map(({ title, desc, color, path }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: color + "15" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d={path} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0f172a] mb-2 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-20 px-6" style={{ background: "#0f2447" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-[#00A99D] text-xs font-bold tracking-widest uppercase mb-4">Our Approach</p>
          <h2 className="font-black text-3xl text-white mb-12">How we deliver for education</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Curriculum & Tech Audit",
                desc: "We assess existing curricula, technology stack, and student journey to identify gaps, redundancies, and opportunities for meaningful improvement.",
              },
              {
                num: "02",
                title: "UX Design & Architecture",
                desc: "Student-centered UX design and scalable cloud architecture form the foundation, ensuring the platform is intuitive for learners of all ages and abilities.",
              },
              {
                num: "03",
                title: "Build & Integration",
                desc: "Iterative development with continuous educator feedback, plus integrations with SIS, SSO, and third-party tools your institution already relies on.",
              },
              {
                num: "04",
                title: "Rollout & Training",
                desc: "Phased rollout plans, live training sessions for faculty and staff, and ongoing support to ensure adoption is smooth and sustainable long-term.",
              },
            ].map(({ num, title, desc }) => (
              <div
                key={num}
                className="p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="font-black text-3xl text-[#00A99D] mb-3">{num}</p>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6"
        style={{ background: "linear-gradient(135deg, #1B3C6E 0%, #00A99D 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-black text-4xl text-white mb-4">Ready to transform your institution?</h2>
          <p className="text-white/70 text-lg mb-8">Let&apos;s build a learning platform your students and faculty will love.</p>
          <a href="/contact" className="btn-outline-white">Start the Conversation</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
