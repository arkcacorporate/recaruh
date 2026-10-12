"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { services, floatingChips } from "@/lib/data";
import { heroImages, getImageSrc } from "@/lib/images";
import {
  Briefcase,
  FileText,
  Mic,
  GraduationCap,
  Megaphone,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const icons = [Briefcase, FileText, Mic, GraduationCap, Megaphone, Sparkles];

/* ─── Climber SVG (Person Silhouette) ─── */
function ClimberSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      width="30"
      height="48"
      viewBox="0 0 30 48"
      fill="none"
      className={`drop-shadow-[0_2px_8px_rgba(249,140,15,0.7)] ${className}`}
      aria-hidden="true"
    >
      <circle cx="15" cy="6" r="5" fill="#F98C0F" />
      <path
        d="M15 11 v12"
        stroke="#F98C0F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M15 16 L7 22 M15 16 L23 13"
        stroke="#F98C0F"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M15 23 L9 34 L5 42 M15 23 L21 32 L26 39"
        stroke="#F98C0F"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Glassy Floating UI Chips ─── */
function FloatingChips() {
  const anims = [
    "animate-float-chip",
    "animate-float-chip-delay",
    "animate-float-chip-delay2",
  ];
  const positions = [
    "top-[20%] right-[3%]",
    "top-[46%] right-[1%]",
    "bottom-[22%] right-[6%]",
  ];
  return (
    <>
      {floatingChips.map((chip, idx) => (
        <div
          key={chip}
          className={`absolute hidden items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white/95 shadow-xl backdrop-blur-md xl:flex ${positions[idx]} ${anims[idx]}`}
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
          {chip}
        </div>
      ))}
    </>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [idleLoaded, setIdleLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking across the pinned hero section (600vh desktop / 500vh mobile)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Smooth progress for natural climber movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 24,
    restDelta: 0.001,
  });

  // Map progress (0 to 1) to activeStep (0 to 5)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(5, Math.floor(latest * 6));
    if (step !== activeStep) {
      setActiveStep(step);
    }
  });

  // Preload background images 2 to 6 when idle
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(
        () => setIdleLoaded(true),
        { timeout: 1000 }
      );
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as any).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => setIdleLoaded(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Climber position along the desktop staircase
  const climberBottom = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [48, 96, 144, 192, 240, 288]
  );
  const climberLeft = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [18, 62, 106, 150, 194, 238]
  );

  // Mobile climber horizontal position (0% to ~82%)
  const mobileClimberLeft = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "82%"]
  );

  // Fade out "Scroll to climb" indicator smoothly
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.04],
    [1, 0]
  );

  // Click dot to smooth-scroll window to that step position
  const scrollToStep = (index: number) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const heroTop = rect.top + scrollTop;
    const heroHeight = heroRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = heroHeight - windowHeight;

    const targetProgress =
      index === 0 ? 0.01 : index === 5 ? 0.98 : (index + 0.4) / 6;
    const targetScrollY = heroTop + targetProgress * maxScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const currentService = services[activeStep] || services[0];
  const CurrentIcon = icons[activeStep] || icons[0];

  /* ─── Reduced Motion Fallback: Accessible static layout ─── */
  if (prefersReducedMotion) {
    return (
      <section
        id="hero"
        className="relative min-h-[100svh] overflow-x-clip bg-navy-950 pt-[96px] pb-12 text-white"
      >
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-3xl">
            <h1 className="font-head text-[clamp(1.9rem,min(4.2vw,6.5vh),3.75rem)] font-extrabold leading-[1.12] text-white [text-shadow:_0_2px_12px_rgba(0,0,0,0.35)]">
              Discover new opportunities,{" "}
              <span className="text-brand">achieve more</span>, and succeed
              faster
            </h1>
            <p className="mt-3 max-w-xl text-[clamp(0.95rem,1.5vh+0.35rem,1.15rem)] leading-relaxed text-white/80">
              Welcome to the best job portal for finding jobs and hiring the right
              talent. Your career staircase starts here.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => {
              const IconComp = icons[i];
              return (
                <div
                  key={svc.title}
                  className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md"
                >
                  <IconComp className="h-6 w-6 text-brand" />
                  <h2 className="mt-3 text-base font-bold text-white">
                    {svc.title}
                  </h2>
                  <p className="mt-1 text-xs text-white/75">{svc.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-[500vh] md:h-[600vh]"
    >
      {/* ── Inner Sticky Viewport: Fixed on screen, fits in 100svh ── */}
      <div className="sticky top-0 h-[100svh] min-h-[560px] w-full overflow-clip bg-navy-950 isolate">
        {/* ── Background Photo Stack ── */}
        <div className="absolute inset-0 z-0 overflow-clip">
          {heroImages.map((img, idx) => {
            const isActive = activeStep === idx;
            const hasError = imgErrors[idx];
            const IconComp = icons[idx];
            const shouldRender = idx === 0 || idleLoaded || isActive;

            if (!shouldRender) return null;

            return (
              <div
                key={img.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 z-10 will-change-[transform,opacity]"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {!hasError ? (
                  <Image
                    src={getImageSrc(img)}
                    alt={img.alt}
                    fill
                    priority={idx === 0}
                    // @ts-ignore
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    loading={idx === 0 ? "eager" : "lazy"}
                    sizes="100vw"
                    quality={70}
                    placeholder={idx === 0 ? "blur" : "empty"}
                    blurDataURL={img.blurDataURL}
                    className={`object-cover brightness-[1.05] saturate-[1.05] transition-transform duration-[6000ms] ease-out ${
                      isActive ? "scale-[1.04]" : "scale-100"
                    }`}
                    onError={() =>
                      setImgErrors((prev) => ({ ...prev, [idx]: true }))
                    }
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-950/20">
                    <IconComp className="h-32 w-32 text-brand/20" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Directional Gradient Overlay (Lighter, lets photo breathe) ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,31,77,0.82) 0%, rgba(11,31,77,0.55) 38%, rgba(11,31,77,0.18) 70%, rgba(11,31,77,0.05) 100%)",
          }}
        />

        {/* ── Soft bottom fade for service card reading ── */}
        <div
          className="absolute inset-x-0 bottom-0 h-[30%] z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(11,31,77,0.35) 0%, transparent 100%)",
          }}
        />

        {/* ── Glassy Floating Chips (XL screens only, far right) ── */}
        <div className="relative z-20">
          <FloatingChips />
        </div>

        {/* ── Main Hero Content Wrapper (Compact, fits in 100svh, pt-[92px]) ── */}
        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pt-[92px] pb-6 md:pt-[96px]">
          <div className="flex flex-1 flex-col justify-between lg:flex-row lg:items-center lg:gap-10">
            {/* Left Column: Headline, Subtext, Buttons, Step Card */}
            <div className="flex max-w-3xl flex-col justify-center">
              {/* Headline: max 3 lines on desktop, clamp size, leading-[1.12] */}
              <h1 className="font-head text-[clamp(1.9rem,min(4.2vw,6.5vh),3.75rem)] font-extrabold leading-[1.12] text-white [text-shadow:_0_2px_12px_rgba(0,0,0,0.35)]">
                Discover new opportunities,{" "}
                <span className="text-brand">achieve more</span>, and succeed
                faster
              </h1>

              {/* Subtext: short paragraph, clamp font, mt-3 */}
              <p className="mt-3 max-w-xl text-[clamp(0.95rem,1.5vh+0.35rem,1.15rem)] leading-relaxed text-white/85 [text-shadow:_0_1px_8px_rgba(0,0,0,0.3)]">
                Welcome to the best job portal for finding jobs and hiring the
                right talent. Your career staircase starts here.
              </p>

              {/* Action Buttons: 48px height, mt-5 */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="#services"
                  className="group inline-flex h-12 min-h-[48px] items-center gap-2 rounded-full bg-brand px-7 text-sm font-bold text-navy-950 shadow-lg shadow-brand/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-brand/50"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 min-h-[48px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
                >
                  Contact Us
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* ── Mobile Horizontal 6-Step Track (< 1024px) ── */}
              <div className="mt-4 lg:hidden">
                <div className="relative mb-1.5 h-6 w-full">
                  <motion.div
                    className="absolute -top-1"
                    style={{ left: mobileClimberLeft }}
                  >
                    <ClimberSVG className="h-5 w-auto" />
                  </motion.div>
                </div>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {services.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToStep(idx)}
                      className="relative flex h-8 flex-1 items-center justify-center p-0"
                      aria-label={`Go to step ${idx + 1}`}
                    >
                      <div
                        className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                          idx <= activeStep ? "bg-brand" : "bg-white/25"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Compact Service Card (STEP x / 6) ── */}
              <div className="mt-4 w-full max-w-[460px] pb-1 sm:mt-5">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md">
                  {/* Step counter + Dot indicators */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">
                      Step {activeStep + 1} / 6
                    </span>
                    <div className="flex items-center gap-1.5">
                      {services.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => scrollToStep(idx)}
                          className="flex h-6 w-6 items-center justify-center rounded-full transition-transform hover:scale-125"
                          aria-label={`Jump to step ${idx + 1}`}
                        >
                          <span
                            className={`block rounded-full transition-all duration-300 ${
                              idx === activeStep
                                ? "h-2 w-5 bg-brand"
                                : idx < activeStep
                                ? "h-1.5 w-1.5 bg-brand/60"
                                : "h-1.5 w-1.5 bg-white/35"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/15">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-brand-light"
                      animate={{ width: `${((activeStep + 1) / 6) * 100}%` }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Service info: 1 line description */}
                  <div className="mt-2.5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl bg-brand/20">
                            <CurrentIcon className="h-4 w-4 text-brand" />
                          </div>
                          <h2 className="text-base font-bold text-white sm:text-lg">
                            {currentService.title}
                          </h2>
                        </div>
                        <p className="mt-1 line-clamp-1 text-xs text-white/80 sm:text-sm">
                          {currentService.text}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Desktop Staircase (vh-scaled, compact) */}
            <div
              className="relative hidden h-[320px] w-[310px] flex-shrink-0 origin-bottom-right scale-90 lg:block xl:scale-100"
              aria-hidden="true"
            >
              {services.map((svc, idx) => {
                const IconComp = icons[idx];
                const bottomOffset = idx * 48;
                const leftOffset = idx * 44;
                const isPassedOrCurrent = idx <= activeStep;
                const isCurrent = idx === activeStep;

                return (
                  <button
                    key={svc.title}
                    type="button"
                    onClick={() => scrollToStep(idx)}
                    className={`group absolute flex items-end transition-all duration-400 focus:outline-none ${
                      isPassedOrCurrent ? "opacity-100" : "opacity-40"
                    }`}
                    style={{
                      bottom: `${bottomOffset}px`,
                      left: `${leftOffset}px`,
                    }}
                    aria-label={`Scroll to Step ${idx + 1}: ${svc.title}`}
                  >
                    <div
                      className={`relative flex h-[46px] w-[66px] items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-400 ${
                        isCurrent
                          ? "border-brand bg-brand/30 shadow-lg shadow-brand/30 scale-105"
                          : isPassedOrCurrent
                          ? "border-white/30 bg-white/15"
                          : "border-white/15 bg-white/5"
                      }`}
                    >
                      <IconComp
                        className={`h-4.5 w-4.5 transition-colors duration-300 ${
                          isPassedOrCurrent ? "text-brand" : "text-white/60"
                        }`}
                      />
                      <span
                        className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] font-bold transition-all duration-300 ${
                          isCurrent
                            ? "text-brand opacity-100"
                            : "text-white/60 opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Climber positioned with scroll-driven transform */}
              <motion.div
                className="pointer-events-none absolute z-20"
                style={{
                  bottom: climberBottom,
                  left: climberLeft,
                }}
              >
                <ClimberSVG />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Scroll to Climb Indicator (Hidden on mobile/tablet to avoid overlap) ── */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="pointer-events-none absolute bottom-2 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-0.5 text-white/70 lg:flex"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand">
            Scroll to climb
          </span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce text-brand" />
        </motion.div>
      </div>
    </section>
  );
}
