"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter,
  CheckCircle2,
  Mail,
  X,
  TrendingUp,
} from "lucide-react";
import { blogPosts, BLOG_CATEGORIES, BlogCategory, BlogPost } from "@/lib/blogData";

const rv = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
});

const Eyebrow = ({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <p
    className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${
      light ? "text-brand" : "text-navy-950"
    }`}
  >
    <span className="h-px w-8 bg-brand" />
    {children}
  </p>
);

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [nlEmail, setNlEmail] = useState("");
  const [nlSuccess, setNlSuccess] = useState(false);

  // Filter blog posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Find the featured post (if category is All and no search)
  const featuredPost = useMemo(() => {
    if (selectedCategory !== "All" || searchQuery.trim() !== "") {
      return null;
    }
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, [selectedCategory, searchQuery]);

  // Remaining posts when featured post is displayed separately
  const regularPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(nlEmail)) {
      return;
    }
    setNlSuccess(true);
    setNlEmail("");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip bg-[#F8FAFC]">
        {/* ─── 1. HERO SECTION ─── */}
        <section className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-32 sm:pt-40 lg:pb-28">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(249,140,15,0.16) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 right-10 h-96 w-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(46,139,69,0.18) 0%, transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-7xl px-5 text-center">
            <motion.div {...rv(0)} className="flex justify-center">
              <Eyebrow light>LATEST ARTICLES &amp; PERSPECTIVES</Eyebrow>
            </motion.div>
            <motion.h1
              {...rv(0.1)}
              className="mt-6 font-head text-[2.4rem] font-extrabold leading-[1.08] text-white sm:text-6xl xl:text-7xl"
            >
              Insights for <span className="text-brand">Talent &amp; Growth</span>
            </motion.h1>
            <motion.p
              {...rv(0.2)}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Expert editorial coverage on recruitment automation, ATS-optimized resume strategies, corporate interview preparation, and workforce compliance.
            </motion.p>

            {/* Quick stats badges */}
            <motion.div
              {...rv(0.3)}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                <BookOpen className="h-3.5 w-3.5 text-brand" />
                <span>{blogPosts.length} Published In-Depth Guides</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                <TrendingUp className="h-3.5 w-3.5 text-forest-400" />
                <span>Industry Tested Strategies</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 2. SEARCH & CATEGORY BAR ─── */}
        <section className="relative z-10 -mt-8 px-5">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-navy-950/5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, keyword, or author..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-10 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-brand focus:bg-white focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Category Count Indicator */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 sm:justify-end gap-3">
                  <span className="flex items-center gap-1.5">
                    <Filter className="h-3.5 w-3.5 text-brand" />
                    Showing <strong className="text-navy-950">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "article" : "articles"}
                  </span>
                  {(selectedCategory !== "All" || searchQuery) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                      className="text-xs font-bold text-brand hover:underline"
                    >
                      Reset All
                    </button>
                  )}
                </div>
              </div>

              {/* Category Pills Strip */}
              <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 scrollbar-none">
                {BLOG_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`inline-flex flex-shrink-0 items-center rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-navy-950 text-white shadow-md shadow-navy-950/20"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-navy-950"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. FEATURED STORY (SPOTLIGHT) ─── */}
        {featuredPost && (
          <section className="pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-5">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-brand" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Editor&apos;s Spotlight Story
                  </span>
                </div>
              </div>

              <div className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-navy-950/5 transition-all duration-500 hover:shadow-2xl">
                <div className="grid lg:grid-cols-12 lg:items-center">
                  {/* Image Column */}
                  <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-[16/11]">
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.featuredImageAlt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      priority
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent lg:hidden" />
                    <span className="absolute left-5 top-5 rounded-full bg-brand px-3.5 py-1 text-xs font-bold text-navy-950 shadow-md">
                      Featured
                    </span>
                  </div>

                  {/* Content Column */}
                  <div className="p-8 lg:col-span-5 lg:p-12">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="rounded-full bg-navy-50 px-3 py-1 font-semibold text-navy-800">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readTime}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {featuredPost.publishedAt}
                      </span>
                    </div>

                    <h2 className="mt-4 font-head text-2xl font-bold leading-tight text-navy-950 transition-colors group-hover:text-brand sm:text-3xl">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {featuredPost.excerpt}
                    </p>

                    {/* Author & CTA */}
                    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200">
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-navy-950">
                            {featuredPost.author.name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {featuredPost.author.role}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-brand hover:text-navy-950"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── 4. ARTICLE GRID SECTION ─── */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5">
            {/* Section Header */}
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <Eyebrow>ALL ARTICLES</Eyebrow>
                <h2 className="mt-3 font-head text-3xl font-extrabold text-navy-950 sm:text-4xl">
                  {selectedCategory === "All"
                    ? "Curated Industry Insights"
                    : `${selectedCategory} Articles`}
                </h2>
              </div>
              <p className="text-xs text-slate-500 sm:text-sm">
                Showing {regularPosts.length} {regularPosts.length === 1 ? "article" : "articles"}
              </p>
            </div>

            {/* Empty State */}
            {regularPosts.length === 0 && (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-brand">
                  <Search className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-head text-xl font-bold text-navy-950">
                  No Articles Found
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                  We could not find any articles matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-brand hover:text-navy-950"
                >
                  Reset Filters &amp; View All
                </button>
              </div>
            )}

            {/* Grid */}
            {regularPosts.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post, idx) => (
                  <motion.article
                    key={post.slug}
                    {...rv(idx * 0.08)}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md shadow-navy-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Thumbnail */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative aspect-[16/10] overflow-hidden bg-slate-100"
                    >
                      <Image
                        src={post.featuredImage}
                        alt={post.featuredImageAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-navy-950 shadow-sm backdrop-blur-sm">
                        {post.category}
                      </span>
                    </Link>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishedAt}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="mt-3 font-head text-lg font-bold leading-snug text-navy-950 transition-colors group-hover:text-brand sm:text-xl">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {post.excerpt}
                      </p>

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Footer: Author & Read Link */}
                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-2.5">
                          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-slate-200">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-navy-950">
                              {post.author.name}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-950 transition-colors group-hover:text-brand"
                        >
                          <span>Read</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ─── 5. NEWSLETTER BANNER SECTION ─── */}
        <section className="pb-24 pt-8">
          <div className="mx-auto max-w-7xl px-5">
            <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-8 py-12 text-white shadow-2xl sm:px-14 sm:py-16">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(249,140,15,0.2) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <Eyebrow light>WEEKLY RECRUITMENT BRIEFING</Eyebrow>
                  <h2 className="mt-3 font-head text-2xl font-bold text-white sm:text-4xl">
                    Stay Ahead of the Hiring Curve
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                    Join over 4,500 hiring managers and talent seekers receiving our bi-weekly breakdown of employment benchmarks, hiring automation tips, and career strategies.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  {nlSuccess ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-sm text-emerald-300">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                      <span>Thank you! You are subscribed to our weekly briefing.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <input
                          type="email"
                          required
                          value={nlEmail}
                          onChange={(e) => setNlEmail(e.target.value)}
                          placeholder="Enter your corporate email address..."
                          className="w-full rounded-full border border-white/20 bg-white/10 py-3.5 pl-11 pr-5 text-sm text-white placeholder:text-white/40 backdrop-blur-md transition focus:border-brand focus:bg-white/15 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-full bg-brand py-3.5 text-center text-sm font-bold text-navy-950 shadow-lg shadow-brand/25 transition-all hover:bg-brand-light hover:shadow-brand/40"
                      >
                        Subscribe to Insights
                      </button>
                      <p className="text-center text-[11px] text-white/50">
                        Zero spam. Unsubscribe at any time.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
