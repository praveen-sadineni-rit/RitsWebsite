import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPost, getAllPosts, formatDate } from "@/content/posts";
import StaffAugArticle from "@/components/articles/StaffAugArticle";
import NocCommandArticle from "@/components/articles/NocCommandArticle";
import FdeAiArticle from "@/components/articles/FdeAiArticle";

// Posts that have a bespoke, fully-designed layout instead of the generic renderer.
const CUSTOM_ARTICLES: Record<string, React.ComponentType> = {
  "scope-a-staff-augmentation-engagement": StaffAugArticle,
  "what-noc-command-watches": NocCommandArticle,
  "shipping-ai-that-survives-production": FdeAiArticle,
};

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Insight not found | Resource Innovative Technologies" };
  return {
    title: `${post.title} | Resource Innovative Technologies`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://rits-it.com/insights/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // Bespoke article layout takes over the whole page (own Navbar/Footer).
  const Custom = CUSTOM_ARTICLES[params.slug];
  if (Custom) return <Custom />;

  const related = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)" }} className="pt-24 pb-14 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            All insights
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "rgba(232,181,61,0.18)", color: "#E8B53D" }}>{post.category}</span>
            <span className="text-white/40 text-xs">{formatDate(post.date)} · {post.readTime}</span>
          </div>
          <h1 className="text-white font-black leading-tight" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-0.02em" }}>
            {post.title}
          </h1>
          <p className="text-white/60 mt-4 text-base leading-relaxed">{post.excerpt}</p>
          <p className="text-white/30 text-xs mt-6">By {post.author}</p>
        </div>
      </section>

      {/* BODY */}
      <article className="flex-1 py-14 px-6">
        <div className="max-w-3xl mx-auto">
          {post.body.map((section, i) => (
            <div key={i} className="mb-8">
              {section.heading && (
                <h2 className="text-xl md:text-2xl font-extrabold text-[#0f2447] mb-4" style={{ letterSpacing: "-0.01em" }}>
                  {section.heading}
                </h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-gray-700 text-[16px] leading-[1.8] mb-4">{p}</p>
              ))}
              {section.bullets && (
                <ul className="space-y-2.5 mb-2">
                  {section.bullets.map((b, k) => (
                    <li key={k} className="flex gap-3 text-gray-700 text-[15px] leading-relaxed">
                      <span className="text-[#E8B53D] mt-1 flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
            {post.tags.map((t) => (
              <span key={t} className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500">#{t}</span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1B3C6E 0%, #0f2447 100%)" }}>
            <h3 className="text-white font-extrabold text-xl mb-2">Want this kind of thinking on your team?</h3>
            <p className="text-white/60 text-sm mb-6">Talk to us about staffing, product engineering, or AI delivery.</p>
            <Link href="/contact" className="btn-primary">Talk to an Expert</Link>
          </div>
        </div>
      </article>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[#B0810E] text-xs font-bold uppercase tracking-widest mb-4">Keep reading</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link key={p.slug} href={`/insights/${p.slug}`} className="group block rounded-xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B0810E]">{p.category}</span>
                  <h4 className="font-bold text-[#0f2447] mt-1 leading-snug group-hover:text-[#1B3C6E] transition-colors">{p.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
