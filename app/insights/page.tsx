import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts, formatDate } from "@/content/posts";

export const metadata: Metadata = {
  title: "Insights | Resource Innovative Technologies",
  description:
    "Practical writing on staff augmentation, AI in production, cloud operations, and building software that scales — from the Resource IT team.",
  openGraph: {
    title: "Insights | Resource Innovative Technologies",
    description: "Practical writing on staffing, AI, and building software that scales.",
    url: "https://rits-it.com/insights",
    type: "website",
  },
};

export default function InsightsPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)" }} className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#E8B53D] text-xs font-bold tracking-widest uppercase mb-3">Insights</p>
          <h1 className="text-white font-black leading-tight" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            Real talk on shipping<br />
            <span style={{ color: "#E8B53D" }}>software, AI, and teams.</span>
          </h1>
          <p className="text-white/50 mt-3 text-sm max-w-lg">
            Practical lessons from the work — staffing, AI in production, cloud operations, and everything in between.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Featured */}
          {featured && (
            <Link
              href={`/insights/${featured.slug}`}
              className="group block mb-10 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                <div
                  className="lg:w-2/5 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)", minHeight: 240 }}
                >
                  <span className="text-[#E8B53D] font-black text-6xl opacity-20 select-none">RITS</span>
                  <span className="absolute bottom-4 left-6 text-white/60 text-xs font-bold uppercase tracking-widest">{featured.category}</span>
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[#B0810E] text-xs font-bold uppercase tracking-widest">Featured</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-400 text-xs">{formatDate(featured.date)}</span>
                    </div>
                    <h2 className="text-2xl font-black text-[#0f172a] mb-3 leading-tight group-hover:text-[#1B3C6E] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">{featured.excerpt}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{featured.readTime}</span>
                    <span className="inline-flex items-center gap-1.5 text-[#B0810E] text-sm font-bold group-hover:gap-2.5 transition-all">
                      Read article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="h-32 flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)" }}>
                  <span className="text-[#E8B53D] font-black text-3xl opacity-20 select-none">RITS</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "rgba(232,181,61,0.14)", color: "#B0810E" }}>{post.category}</span>
                    <span className="text-gray-400 text-xs">{formatDate(post.date)}</span>
                  </div>
                  <h3 className="font-bold text-[#0f172a] leading-snug mb-2 group-hover:text-[#1B3C6E] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                  <span className="mt-4 text-gray-400 text-xs">{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
