"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Article = {
  id: string;
  title: string;
  url: string;
  source: "HackerNews" | "DevTo";
  author: string;
  date: string;
  points?: number;
  comments?: number;
  readTime?: string;
  coverImage?: string;
  tags?: string[];
};

const FILTERS = ["All", "LLMs", "Agents", "Open Source", "Research", "Tools", "Industry"];

const TAG_MAP: Record<string, string[]> = {
  LLMs: ["llm", "gpt", "claude", "gemini", "language model", "openai", "anthropic", "mistral", "llama"],
  Agents: ["agent", "agentic", "autonomous", "copilot", "assistant"],
  "Open Source": ["open source", "open-source", "hugging face", "ollama", "mistral", "llama"],
  Research: ["paper", "research", "study", "benchmark", "arxiv", "alignment"],
  Tools: ["tool", "framework", "library", "sdk", "api", "platform", "cursor", "github copilot"],
  Industry: ["enterprise", "startup", "funding", "acquisition", "regulation", "policy", "job"],
};

// Reject titles containing non-Latin scripts (CJK, Cyrillic, Arabic, Hebrew, Devanagari, etc.)
const NON_LATIN_SCRIPT = /[぀-ヿ㐀-鿿가-힯Ѐ-ӿ؀-ۿ֐-׿ऀ-ॿ฀-๿]/;

function isEnglish(title: string): boolean {
  if (NON_LATIN_SCRIPT.test(title)) return false;
  // Require the title to be mostly ASCII letters/punctuation (allow accented Latin chars)
  const letters = title.replace(/[^a-zA-ZÀ-ɏ]/g, "");
  const total = title.replace(/\s/g, "");
  if (total.length === 0) return false;
  return letters.length / total.length > 0.6;
}

function matchesFilter(article: Article, filter: string): boolean {
  if (filter === "All") return true;
  const keywords = TAG_MAP[filter] ?? [];
  const text = (article.title + " " + (article.tags?.join(" ") ?? "")).toLowerCase();
  return keywords.some(k => text.includes(k));
}

function timeAgo(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function SourceBadge({ source }: { source: Article["source"] }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest"
      style={{ background: source === "HackerNews" ? "#E8B53D" + "20" : "#5E82AE" + "20", color: source === "HackerNews" ? "#E8B53D" : "#5E82AE" }}>
      {source === "HackerNews" ? "HN" : "Dev.to"}
    </span>
  );
}

// Deterministic color palette per card based on index
const CARD_PALETTES = [
  { bg: "#FBF4DD", border: "#b2e8e5", accent: "#00897b", text: "#0f2447", sub: "#5a8a87", tag: "#b2e8e5", tagText: "#007a6e" },
  { bg: "#EAF1F8", border: "#c7d9f8", accent: "#5E82AE", text: "#0f2447", sub: "#4a6da8", tag: "#c7d9f8", tagText: "#3D5A80" },
  { bg: "#FBF4DD", border: "#d8c8f8", accent: "#A9781A", text: "#0f2447", sub: "#6b52a8", tag: "#d8c8f8", tagText: "#A9781A" },
  { bg: "#EAF1F8", border: "#b8edd8", accent: "#3D5A80", text: "#0f2447", sub: "#4a8a6e", tag: "#b8edd8", tagText: "#047857" },
  { bg: "#FBF4DD", border: "#f8c8e5", accent: "#C99A2E", text: "#0f2447", sub: "#a05070", tag: "#f8c8e5", tagText: "#be185d" },
  { bg: "#FBF4DD", border: "#fdd9b5", accent: "#A9781A", text: "#0f2447", sub: "#a06030", tag: "#fdd9b5", tagText: "#c2410c" },
];

function SkeletonCard({ idx }: { idx: number }) {
  const p = CARD_PALETTES[idx % CARD_PALETTES.length];
  return (
    <div className="rounded-2xl p-5 animate-pulse" style={{ background: p.bg, minHeight: 180 }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-4 w-10 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        <div className="h-4 w-16 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
      </div>
      <div className="h-5 rounded mb-2 w-full" style={{ background: "rgba(255,255,255,0.12)" }} />
      <div className="h-5 rounded mb-4 w-3/4" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="flex gap-3 mt-6">
        <div className="h-3 w-16 rounded" style={{ background: "rgba(255,255,255,0.10)" }} />
        <div className="h-3 w-16 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchArticles = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      const results: Article[] = [];

      // ── Hacker News: AI search via Algolia ──
      const hnRes = await fetch(
        "https://hn.algolia.com/api/v1/search?query=artificial+intelligence+machine+learning+LLM&tags=story&numericFilters=num_comments%3E2&hitsPerPage=40"
      );
      if (hnRes.ok) {
        const hnData = await hnRes.json();
        for (const hit of hnData.hits ?? []) {
          if (!hit.title || !hit.url) continue;
          results.push({
            id: `hn-${hit.objectID}`,
            title: hit.title,
            url: hit.url,
            source: "HackerNews",
            author: hit.author ?? "Anonymous",
            date: hit.created_at ?? new Date().toISOString(),
            points: hit.points ?? 0,
            comments: hit.num_comments ?? 0,
          });
        }
      }

      // ── Dev.to: AI & ML articles ──
      const devRes = await fetch(
        "https://dev.to/api/articles?tag=ai&per_page=30&state=rising"
      );
      if (devRes.ok) {
        const devData = await devRes.json();
        for (const a of devData ?? []) {
          results.push({
            id: `dev-${a.id}`,
            title: a.title,
            url: a.url,
            source: "DevTo",
            author: a.user?.name ?? "Anonymous",
            date: a.published_at ?? new Date().toISOString(),
            readTime: a.reading_time_minutes ? `${a.reading_time_minutes} min` : undefined,
            coverImage: a.cover_image ?? a.social_image ?? undefined,
            tags: a.tag_list ?? [],
          });
        }
      }

      // Also fetch Dev.to ML tag
      const devRes2 = await fetch(
        "https://dev.to/api/articles?tag=machinelearning&per_page=20&state=rising"
      );
      if (devRes2.ok) {
        const devData2 = await devRes2.json();
        for (const a of devData2 ?? []) {
          if (results.find(r => r.id === `dev-${a.id}`)) continue;
          results.push({
            id: `dev-${a.id}`,
            title: a.title,
            url: a.url,
            source: "DevTo",
            author: a.user?.name ?? "Anonymous",
            date: a.published_at ?? new Date().toISOString(),
            readTime: a.reading_time_minutes ? `${a.reading_time_minutes} min` : undefined,
            coverImage: a.cover_image ?? a.social_image ?? undefined,
            tags: a.tag_list ?? [],
          });
        }
      }

      // Keep English-only titles
      const englishOnly = results.filter(a => isEnglish(a.title));

      // Sort by date descending
      englishOnly.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setArticles(englishOnly);
      setLastUpdated(new Date());
    } catch {
      setError("Could not load live feed. Check your connection.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchArticles(); }, []);

  const filtered = articles.filter(a => matchesFilter(a, filter));
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)" }} className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[#E8B53D] text-xs font-bold tracking-widest uppercase mb-3">Live AI Feed</p>
              <h1 className="text-white font-black leading-tight" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                What&apos;s happening in AI,<br />
                <span style={{ color: "#E8B53D" }}>right now.</span>
              </h1>
              <p className="text-white/50 mt-3 text-sm max-w-lg">
                Live articles from Hacker News and Dev.to. AI, ML, LLMs, and everything in between. Updated in real time.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <p className="text-white/30 text-xs font-mono">
                  Updated {timeAgo(lastUpdated.toISOString())}
                </p>
              )}
              <button
                onClick={() => fetchArticles(true)}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-xs font-semibold transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={refreshing ? "animate-spin" : ""}>
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {/* Source badges */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-white/20 text-xs">Sources:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#E8B53D20", color: "#E8B53D", border: "1px solid #E8B53D30" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B53D] animate-pulse inline-block" />
              Hacker News
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#5E82AE20", color: "#818cf8", border: "1px solid #5E82AE30" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8] animate-pulse inline-block" />
              Dev.to
            </span>
            {!loading && (
              <span className="text-white/20 text-xs ml-2">{articles.length} articles loaded</span>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
                style={{
                  background: filter === f ? "#E8B53D" : "rgba(255,255,255,0.06)",
                  color: filter === f ? "white" : "rgba(255,255,255,0.40)",
                  border: `1px solid ${filter === f ? "#E8B53D" : "rgba(255,255,255,0.08)"}`,
                }}>
                {f}
                {f !== "All" && !loading && (
                  <span className="ml-1.5 opacity-60">
                    {articles.filter(a => matchesFilter(a, f)).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">

          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {error}
              <button onClick={() => fetchArticles()} className="ml-auto underline font-semibold">Retry</button>
            </div>
          )}

          {loading ? (
            <>
              {/* Skeleton featured */}
              <div className="mb-8 bg-white rounded-2xl border border-gray-100 p-8 animate-pulse">
                <div className="h-4 w-24 bg-gray-100 rounded-full mb-4" />
                <div className="h-8 bg-gray-100 rounded mb-3 w-3/4" />
                <div className="h-8 bg-gray-100 rounded mb-6 w-1/2" />
                <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} idx={i} />)}
              </div>
            </>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <svg className="mx-auto mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <p className="font-semibold">No articles match this filter right now.</p>
              <button onClick={() => setFilter("All")} className="mt-3 text-[#E8B53D] text-sm font-semibold hover:underline">Show all</button>
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <a href={featured.url} target="_blank" rel="noopener noreferrer"
                  className="group block mb-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {featured.coverImage ? (
                      <div className="lg:w-2/5 h-56 lg:h-auto relative overflow-hidden bg-gray-100 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="hidden lg:flex lg:w-2/5 items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #0f2447 0%, #1B3C6E 100%)", minHeight: 260 }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
                          <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    )}
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[#E8B53D] text-xs font-bold uppercase tracking-widest">Featured</span>
                          <span className="text-gray-300">·</span>
                          <SourceBadge source={featured.source} />
                        </div>
                        <h2 className="text-2xl font-black text-[#0f172a] mb-3 leading-tight group-hover:text-[#1B3C6E] transition-colors">
                          {featured.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-gray-400 text-xs mt-4">
                          <span className="font-medium text-gray-600">{featured.author}</span>
                          <span>·</span>
                          <span>{timeAgo(featured.date)}</span>
                          {featured.points !== undefined && (
                            <><span>·</span><span>▲ {featured.points} pts</span></>
                          )}
                          {featured.readTime && (
                            <><span>·</span><span>{featured.readTime} read</span></>
                          )}
                          {featured.comments !== undefined && (
                            <><span>·</span><span>{featured.comments} comments</span></>
                          )}
                        </div>
                        {featured.tags && featured.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {featured.tags.slice(0, 4).map(t => (
                              <span key={t} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-500">#{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-6">
                        <span className="inline-flex items-center gap-1.5 text-[#E8B53D] text-sm font-bold group-hover:gap-2.5 transition-all">
                          Read article
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              )}

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((article, i) => {
                  const p = CARD_PALETTES[i % CARD_PALETTES.length];
                  return (
                    <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer"
                      className="group rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-5"
                      style={{ background: p.bg, border: `1.5px solid ${p.border}`, minHeight: 190 }}>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest"
                            style={{ background: p.accent, color: "white" }}>
                            {article.source === "HackerNews" ? "HN" : "Dev.to"}
                          </span>
                          <span className="text-xs" style={{ color: p.sub }}>{timeAgo(article.date)}</span>
                          {article.points !== undefined && article.points > 0 && (
                            <span className="text-xs font-bold" style={{ color: p.accent }}>▲{article.points}</span>
                          )}
                        </div>
                        <h3 className="font-bold text-sm leading-snug mb-3 line-clamp-3" style={{ color: p.text }}>
                          {article.title}
                        </h3>
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {article.tags.slice(0, 3).map(t => (
                              <span key={t} className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                                style={{ background: `${p.accent}18`, color: p.accent }}>
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-3 mt-2" style={{ borderTop: `1px solid ${p.border}` }}>
                        <span className="text-xs font-medium truncate max-w-[130px]" style={{ color: p.sub }}>
                          {article.author}{article.readTime ? ` · ${article.readTime}` : ""}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                          <path d="M7 17L17 7M17 7H7M17 7v10" stroke={p.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 text-center text-gray-400 text-xs">
                Showing {filtered.length} articles · {filter !== "All" ? `filtered by "${filter}" · ` : ""}
                <button onClick={() => fetchArticles(true)} className="text-[#E8B53D] font-semibold hover:underline ml-1">
                  Refresh for latest
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
