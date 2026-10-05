"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/lib/data";
import {
  Briefcase,
  FileText,
  Mic,
  GraduationCap,
  Megaphone,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const icons = [Briefcase, FileText, Mic, GraduationCap, Megaphone, Sparkles];

export default function Services() {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track active slide on mobile horizontal scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, offsetWidth } = carouselRef.current;
    const index = Math.round(scrollLeft / (offsetWidth * 0.85));
    setActiveCarouselIdx(Math.min(5, Math.max(0, index)));
  };

  const scrollCarouselTo = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.offsetWidth * 0.85;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveCarouselIdx(index);
  };

  return (
    <section
      id="services"
      className="relative overflow-clip bg-[#FAFAF7] py-20 md:py-28"
    >
      {/* ── Soft Ambient Glows (Orange 8% top-right, Blue 6% bottom-left) ── */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(249,140,15,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(30,58,138,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5">
        {/* ── Heading Area (Two columns on desktop, stacked on mobile) ── */}
        <div className="mb-14 grid items-end gap-6 md:grid-cols-2 md:gap-12 lg:mb-20">
          {/* Left Column: Tag + Heading */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
              <span className="h-0.5 w-6 rounded-full bg-brand" />
              Solutions
            </div>
            <h2 className="mt-3 font-head text-3xl font-extrabold text-navy-950 sm:text-4xl lg:text-5xl">
              Our{" "}
              <span className="relative inline-block">
                Services
                {/* Subtle orange underline curve */}
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-brand"
                  viewBox="0 0 120 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9C38 3 82 4 117 9"
                    stroke="#F98C0F"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* Right Column: Intro text */}
          <div>
            <p className="text-base leading-relaxed text-slate-800 lg:text-lg">
              RECARUH offers end-to-end talent and HR solutions designed to
              simplify recruitment, automate HR operations, manage compliance,
              and streamline onboarding.
            </p>
          </div>
        </div>

        {/* ── Desktop & Tablet Editorial Grid (>= 768px) ── */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((s, idx) => {
            const IconComp = icons[idx];
            const hasError = imgErrors[idx];
            // Stagger cards 2 and 5 (index 1 and 4) down by 40px on desktop
            const isStaggered = idx === 1 || idx === 4;

            return (
              <motion.article
                key={s.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : idx * 0.08,
                  ease: "easeOut",
                }}
                className={`group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] ${
                  isStaggered ? "lg:translate-y-10" : ""
                }`}
              >
                {/* Card Top: Photo Wrapper */}
                <div className="p-3.5 pb-0">
                  <div className="relative aspect-[4/3] w-full overflow-clip rounded-2xl bg-slate-100">
                    {/* Number Badge */}
                    <div className="absolute top-3 left-3 z-10 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-xs font-bold text-navy-950 shadow-sm backdrop-blur-md">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Arrow Action Button */}
                    <div className="absolute right-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-brand shadow-md transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>

                    {/* Image with subtle Ken Burns zoom */}
                    {!hasError ? (
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [idx]: true }))
                        }
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/10 to-orange-100/50">
                        <IconComp className="h-16 w-16 text-brand/40" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Content */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 pt-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                        <IconComp className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="font-head text-lg font-bold text-navy-950 lg:text-xl">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-800">
                      {s.text}
                    </p>
                  </div>

                  {/* Thin orange accent line that grows on hover */}
                  <div className="mt-6 h-0.5 w-0 bg-brand transition-all duration-300 ease-out group-hover:w-full" />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── Mobile Horizontal Snap Carousel (< 768px) ── */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          >
            {services.map((s, idx) => {
              const IconComp = icons[idx];
              const hasError = imgErrors[idx];

              return (
                <article
                  key={s.title}
                  className="flex min-w-[85vw] snap-center flex-col justify-between rounded-3xl border border-slate-200/90 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.07)]"
                >
                  {/* Photo container */}
                  <div className="p-3 pb-0">
                    <div className="relative aspect-[4/3] w-full overflow-clip rounded-2xl bg-slate-100">
                      <div className="absolute top-2.5 left-2.5 z-10 rounded-full border border-white/60 bg-white/90 px-2.5 py-0.5 text-xs font-bold text-navy-950 shadow-sm">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="absolute right-2.5 bottom-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white shadow-md">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>

                      {!hasError ? (
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          sizes="85vw"
                          className="object-cover"
                          onError={() =>
                            setImgErrors((prev) => ({ ...prev, [idx]: true }))
                          }
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/10 to-orange-100">
                          <IconComp className="h-14 w-14 text-brand/40" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 pt-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                        <IconComp className="h-4 w-4" />
                      </div>
                      <h3 className="font-head text-base font-bold text-navy-950">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-800">
                      {s.text}
                    </p>
                    <div className="mt-4 h-0.5 w-full bg-brand/30" />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Carousel Dot Indicators */}
          <div className="mt-2 flex items-center justify-center gap-2">
            {services.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollCarouselTo(i)}
                className="flex h-6 w-6 items-center justify-center"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === activeCarouselIdx
                      ? "h-2 w-6 bg-brand"
                      : "h-2 w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── View All Services Button (Centered Orange Pill) ── */}
        <div className="mt-14 text-center sm:mt-18">
          <Link
            href="/contact"
            className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-brand px-9 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
          >
            View All Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
