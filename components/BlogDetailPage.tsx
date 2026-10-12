"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Info,
  Quote,
  TrendingUp,
} from "lucide-react";
import { BlogPost } from "@/lib/blogData";

interface BlogDetailPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailPage({ post, relatedPosts }: BlogDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://recaruh.com/blog/${post.slug}`;
  const encodedTitle = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip bg-[#F8FAFC]">
        {/* ─── 1. BREADCRUMBS & ARTICLE HEADER ─── */}
        <section className="relative isolate overflow-hidden bg-navy-950 pb-16 pt-32 sm:pt-40 lg:pb-20">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(249,140,15,0.18) 0%, transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-5xl px-5">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/60">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-white/40" />
              <Link href="/blog" className="transition hover:text-white">
                Blog
              </Link>
              <ChevronRight className="h-3 w-3 text-white/40" />
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/90">
                {post.category}
              </span>
            </nav>

            {/* Category & Read Time Strip */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/70">
              <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold text-navy-950">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-brand-light" />
                {post.readTime}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-brand-light" />
                {post.publishedAt}
              </span>
            </div>

            {/* Article Title */}
            <h1 className="mt-5 font-head text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {post.title}
            </h1>

            {/* Excerpt Lead */}
            <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
              {post.excerpt}
            </p>

            {/* Author Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3.5">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand/50">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-head text-sm font-bold text-white">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-white/60">{post.author.role}</p>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy article link"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition hover:border-brand hover:bg-brand/10 hover:text-brand"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/5 text-white/70 transition hover:border-brand hover:text-brand"
                >
                  <span className="text-xs font-bold">in</span>
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/5 text-white/70 transition hover:border-brand hover:text-brand"
                >
                  <span className="text-xs font-bold">𝕏</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. FEATURED IMAGE ─── */}
        <section className="relative z-10 -mt-8 px-5 sm:-mt-10">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-navy-950/10">
              <div className="relative aspect-[16/9] w-full max-h-[520px]">
                {!imgError ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt}
                    fill
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    priority
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-navy-950 p-6 text-center text-white">
                    <span className="font-head text-lg font-bold">{post.title}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-6 py-3 text-xs text-slate-500">
                <span>{post.featuredImageAlt}</span>
                <span className="hidden sm:inline">ARKCA Corporate Insights</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. ARTICLE BODY & SIDEBAR ─── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Main Content Column */}
              <article className="lg:col-span-8">
                <div className="prose-content space-y-10">
                  {post.sections.map((section, sIdx) => (
                    <section
                      key={section.id || sIdx}
                      id={section.id}
                      className="scroll-mt-28 space-y-5"
                    >
                      {/* Section Heading */}
                      {section.heading && (
                        <div className="pt-2">
                          <h2 className="font-head text-2xl font-extrabold text-navy-950 sm:text-3xl">
                            {section.heading}
                          </h2>
                          <div className="mt-3 h-1 w-12 rounded-full bg-brand" />
                        </div>
                      )}

                      {/* Subheading */}
                      {section.subheading && (
                        <h3 className="font-head text-xl font-bold text-navy-900">
                          {section.subheading}
                        </h3>
                      )}

                      {/* Paragraphs */}
                      {section.paragraphs.map((p, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-base leading-[1.8] text-slate-700 sm:text-lg"
                        >
                          {p}
                        </p>
                      ))}

                      {/* Stat Box Callout */}
                      {section.statBox && (
                        <div className="my-7 flex flex-col items-start gap-4 rounded-3xl border border-brand/30 bg-gradient-to-br from-amber-50/80 to-white p-7 shadow-sm sm:flex-row sm:items-center">
                          <div className="flex h-16 w-28 flex-shrink-0 items-center justify-center rounded-2xl bg-brand text-2xl font-extrabold text-navy-950 shadow-md">
                            {section.statBox.number}
                          </div>
                          <div>
                            <h4 className="font-head text-base font-bold text-navy-950">
                              {section.statBox.label}
                            </h4>
                            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                              {section.statBox.caption}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Callout Box */}
                      {section.callout && (
                        <div
                          className={`my-7 rounded-2xl border p-6 ${
                            section.callout.type === "tip"
                              ? "border-emerald-200 bg-emerald-50/60 text-emerald-950"
                              : section.callout.type === "highlight"
                              ? "border-brand/40 bg-amber-50/60 text-navy-950"
                              : "border-navy-200 bg-navy-50/60 text-navy-950"
                          }`}
                        >
                          <div className="flex items-center gap-2 font-head text-sm font-bold">
                            {section.callout.type === "tip" ? (
                              <Lightbulb className="h-4 w-4 text-emerald-600" />
                            ) : section.callout.type === "highlight" ? (
                              <Sparkles className="h-4 w-4 text-brand" />
                            ) : (
                              <Info className="h-4 w-4 text-navy-600" />
                            )}
                            <span>{section.callout.title}</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700">
                            {section.callout.text}
                          </p>
                        </div>
                      )}

                      {/* Blockquote */}
                      {section.quote && (
                        <blockquote className="relative my-8 rounded-3xl border-l-4 border-brand bg-slate-50 p-7 pl-8 shadow-sm">
                          <Quote className="h-8 w-8 text-brand/30 mb-2" />
                          <p className="font-head text-lg font-semibold italic leading-relaxed text-navy-950 sm:text-xl">
                            &ldquo;{section.quote.text}&rdquo;
                          </p>
                          {section.quote.author && (
                            <footer className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                              — {section.quote.author}
                            </footer>
                          )}
                        </blockquote>
                      )}

                      {/* Bullet points */}
                      {section.bulletPoints && section.bulletPoints.length > 0 && (
                        <ul className="my-5 space-y-3 pt-2">
                          {section.bulletPoints.map((bp, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3">
                              <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-brand" />
                              <span className="text-base text-slate-700">{bp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Key Takeaways Box */}
                      {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                        <div className="my-8 rounded-3xl border border-navy-900/10 bg-navy-950 p-8 text-white shadow-xl">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                            <Sparkles className="h-4 w-4" />
                            <span>Executive Summary Takeaways</span>
                          </div>
                          <ul className="mt-5 space-y-3">
                            {section.keyTakeaways.map((kt, kIdx) => (
                              <li key={kIdx} className="flex items-start gap-3 text-sm text-white/90">
                                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand/20 text-xs font-bold text-brand">
                                  {kIdx + 1}
                                </span>
                                <span>{kt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </section>
                  ))}
                </div>

                {/* Article Tags Strip */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                      Topic Tags:
                    </span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom Share & Back Bar */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-xs font-bold text-navy-950 transition hover:text-brand"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to All Articles</span>
                  </Link>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-500">
                      Share this insight:
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 rounded-full bg-navy-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-brand hover:text-navy-950"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-300" />
                          <span>Link Copied</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="h-3.5 w-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Author Bio Card */}
                <div className="mt-10 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
                  <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-head text-lg font-bold text-navy-950">
                          {post.author.name}
                        </h4>
                        <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold text-brand">
                          Author
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{post.author.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {post.author.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar: Sticky Table of Contents & Quick CTA */}
              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-8">
                  {/* Table of Contents */}
                  {post.tableOfContents && post.tableOfContents.length > 0 && (
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                        <BookOpen className="h-4 w-4 text-brand" />
                        <h3 className="font-head text-sm font-bold uppercase tracking-wider text-navy-950">
                          Table of Contents
                        </h3>
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {post.tableOfContents.map((toc, idx) => (
                          <li key={toc.id}>
                            <a
                              href={`#${toc.id}`}
                              className="group flex items-start gap-2.5 text-xs text-slate-600 transition hover:text-brand"
                            >
                              <span className="mt-0.5 text-[10px] font-bold text-slate-400 group-hover:text-brand">
                                0{idx + 1}
                              </span>
                              <span className="line-clamp-2 leading-relaxed">
                                {toc.title}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Sidebar CTA Card */}
                  <div className="relative overflow-hidden rounded-3xl bg-navy-950 p-7 text-white shadow-xl">
                    <div
                      aria-hidden
                      className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(249,140,15,0.3) 0%, transparent 70%)",
                      }}
                    />
                    <div className="relative z-10">
                      <span className="rounded-full bg-brand/20 px-3 py-1 text-[11px] font-bold text-brand">
                        RECARUH Talent
                      </span>
                      <h4 className="mt-3 font-head text-lg font-bold text-white">
                        Hiring or Career Inquiries?
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-white/75">
                        Discover verified talent pipelines and modern recruitment solutions tailored to your organization.
                      </p>
                      <Link
                        href="/contact"
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 text-xs font-bold text-navy-950 shadow-md transition hover:bg-brand-light"
                      >
                        <span>Start a Conversation</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ─── 4. RELATED ARTICLES SECTION ─── */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="bg-white py-16 sm:py-24 border-t border-slate-200/60">
            <div className="mx-auto max-w-7xl px-5">
              <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-navy-950">
                    <span className="h-px w-8 bg-brand" />
                    RECOMMENDED READING
                  </p>
                  <h2 className="mt-3 font-head text-2xl font-extrabold text-navy-950 sm:text-3xl">
                    Related Articles &amp; Insights
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand transition hover:text-brand-dark"
                >
                  <span>View All {post.category} Articles</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rPost) => (
                  <article
                    key={rPost.slug}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Link
                      href={`/blog/${rPost.slug}`}
                      className="relative aspect-[16/10] overflow-hidden bg-slate-100"
                    >
                      <Image
                        src={rPost.featuredImage}
                        alt={rPost.featuredImageAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-navy-950 shadow-sm backdrop-blur-sm">
                        {rPost.category}
                      </span>
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{rPost.publishedAt}</span>
                        <span>·</span>
                        <span>{rPost.readTime}</span>
                      </div>

                      <h3 className="mt-2.5 font-head text-base font-bold leading-snug text-navy-950 transition-colors group-hover:text-brand">
                        <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                      </h3>

                      <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                        {rPost.excerpt}
                      </p>

                      <div className="flex-1" />

                      <div className="mt-5 border-t border-slate-100 pt-3">
                        <Link
                          href={`/blog/${rPost.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-950 group-hover:text-brand"
                        >
                          <span>Read Full Story</span>
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── 5. BOTTOM REASSURANCE & CTA STRIP ─── */}
        <section className="bg-navy-950 py-16 text-white border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 text-center">
            <h2 className="font-head text-2xl font-bold text-white sm:text-3xl">
              Ready to Transform Your <span className="text-brand">Talent Pipeline</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/75 sm:text-base">
              Connect with RECARUH today to explore corporate hiring solutions, campus recruitment drives, and automated workforce management.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-bold text-navy-950 shadow-lg shadow-brand/25 transition-all hover:bg-brand-light"
              >
                <span>Speak with Our Team</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <span>View All Services</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
