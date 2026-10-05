"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { highlights } from "@/lib/data";
import { aboutImages, getImageSrc } from "@/lib/images";
import {
  Briefcase,
  ShieldCheck,
  Zap,
  TrendingUp,
  Building2,
  Users,
  Compass,
  Target,
  ArrowUpRight,
} from "lucide-react";

const pillarDetails: Record<
  string,
  { number: string; icon: typeof Briefcase; desc: string }
> = {
  Hiring: {
    number: "01",
    icon: Briefcase,
    desc: "Intelligent candidate matching & verified corporate placements.",
  },
  Compliance: {
    number: "02",
    icon: ShieldCheck,
    desc: "Statutory governance with automated PF/ESI precision.",
  },
  Automation: {
    number: "03",
    icon: Zap,
    desc: "Streamlined HR workflows from screening to onboarding.",
  },
  Growth: {
    number: "04",
    icon: TrendingUp,
    desc: "Scalable workforce solutions designed for lasting capability.",
  },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.18 });
  const [img1Error, setImg1Error] = useState(false);
  const [img2Error, setImg2Error] = useState(false);

  // Easing curve for a luxurious, classic editorial feel
  const transitionConfig = {
    duration: 0.85,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate overflow-hidden bg-[#F8FAFC] py-24 font-body sm:py-32 lg:py-36"
    >
      {/* ── Background Architectural Details ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        {/* Subtle architectural hairline grid */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#0B1F4D_1px,transparent_1px),linear-gradient(90deg,#0B1F4D_1px,transparent_1px)] [background-size:72px_72px]" />

        {/* Soft atmospheric glow accents in navy & brand orange */}
        <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-navy-800/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ── Section Eyebrow & Index Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-950/15 pb-6 text-xs uppercase tracking-[0.24em] text-navy-950 font-body"
        >
          <div className="flex items-center gap-3 font-bold">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span>01 / Corporate Philosophy & Direction</span>
          </div>
          <div className="hidden text-[11px] font-bold tracking-widest text-navy-800 sm:block">
            EST. 2024 · ECOSPACE, KOLKATA
          </div>
        </motion.div>

        {/* ── Main Editorial Asymmetrical Layout ── */}
        <div className="mt-14 grid items-start gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading & Narrative (7 cols) */}
          <div className="lg:col-span-7">
            {/* Editorial Heading with staggered reveal */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transitionConfig, delay: 0.1 }}
            >
              <h2 className="font-head text-3xl font-extrabold tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
                Our <span>Vision</span>{" "}
                <span className="text-brand">&</span>{" "}
                <span>Mission</span>
              </h2>

              <p className="mt-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-navy-800">
                A Unified Mandate for Modern Workforce Excellence
              </p>
            </motion.div>

            {/* Core Narrative with refined fade-up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transitionConfig, delay: 0.2 }}
              className="mt-8 border-l-2 border-brand pl-6 lg:mt-10 lg:pl-8"
            >
              <p className="font-body text-lg font-normal leading-relaxed text-slate-700 sm:text-xl lg:leading-relaxed">
                RECARUH is a talent ecosystem built to simplify hiring and HR
                management. We connect job seekers with the right opportunities
                and help organisations hire the right people, with HR automation
                that keeps the whole process simple and compliant — from PF/ESI
                calculations to seamless onboarding.
              </p>
            </motion.div>

            {/* ── Distinct Vision & Mission Two-Column Editorial Ledger ── */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...transitionConfig, delay: 0.3 }}
                className="group relative flex flex-col justify-between rounded-2xl border-2 border-slate-200/90 bg-white p-7 shadow-md transition-all duration-300 hover:border-brand hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-navy-950 font-body">
                    <span className="flex items-center gap-2">
                      <Compass className="h-4 w-4 text-brand" />
                      The Vision
                    </span>
                    <span className="font-head text-sm font-bold text-navy-800">01</span>
                  </div>

                  <h3 className="mt-4 font-head text-xl font-extrabold tracking-tight text-navy-950">
                    Building the Future of Talent
                  </h3>

                  <p className="mt-3 font-body text-sm font-normal leading-relaxed text-slate-700">
                    To establish a transformative talent ecosystem that bridges the
                    divide between aspiring talent and forward-looking enterprises,
                    creating sustainable career trajectories and long-term organizational value.
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 font-body text-xs font-bold text-navy-950">
                  <span className="h-0.5 w-6 bg-brand transition-all duration-300 group-hover:w-10" />
                  <span>Direction & Foresight</span>
                </div>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...transitionConfig, delay: 0.38 }}
                className="group relative flex flex-col justify-between rounded-2xl border-2 border-slate-200/90 bg-white p-7 shadow-md transition-all duration-300 hover:border-brand hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-navy-950 font-body">
                    <span className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-brand" />
                      The Mission
                    </span>
                    <span className="font-head text-sm font-bold text-navy-800">02</span>
                  </div>

                  <h3 className="mt-4 font-head text-xl font-extrabold tracking-tight text-navy-950">
                    Frictionless Execution & Precision
                  </h3>

                  <p className="mt-3 font-body text-sm font-normal leading-relaxed text-slate-700">
                    To eliminate recruitment complexity and administrative friction
                    through transparent processes, meticulous regulatory compliance,
                    and intelligent automation that empowers both employers and job seekers.
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 font-body text-xs font-bold text-navy-950">
                  <span className="h-0.5 w-6 bg-brand transition-all duration-300 group-hover:w-10" />
                  <span>Execution & Trust</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Imagery (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...transitionConfig, delay: 0.25 }}
            className="relative lg:col-span-5"
          >
            {/* Primary Editorial Image Frame with hairline architectural mat */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer architectural mat with corner crosshairs */}
              <div className="relative rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xl sm:p-5">
                {/* Corner crosshairs for editorial technical feel */}
                <div className="pointer-events-none absolute left-1 top-1 h-2 w-2 border-l-2 border-t-2 border-navy-950/40" />
                <div className="pointer-events-none absolute right-1 top-1 h-2 w-2 border-r-2 border-t-2 border-navy-950/40" />
                <div className="pointer-events-none absolute bottom-1 left-1 h-2 w-2 border-b-2 border-l-2 border-navy-950/40" />
                <div className="pointer-events-none absolute bottom-1 right-1 h-2 w-2 border-b-2 border-r-2 border-navy-950/40" />

                {/* Main Photo Container — tailored 4:3 ratio for collaborative office photography */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy-950 sm:aspect-[5/4]">
                  {!img1Error ? (
                    <Image
                      src={getImageSrc(aboutImages.about1)}
                      alt={aboutImages.about1.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
                      onError={() => setImg1Error(true)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-950 p-6 text-center text-white">
                      <Users className="h-14 w-14 text-brand" />
                      <p className="mt-3 font-head text-base font-bold text-white">RECARUH Creative Workspace</p>
                      <p className="font-body text-xs text-white/80">Innovation & Talent Operations</p>
                    </div>
                  )}

                  {/* High-contrast gradient overlay ensuring text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" />

                  {/* Archival caption printed directly on the image lower third */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 font-body text-white sm:p-6">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-brand">
                      Collaborative Culture
                    </span>
                    <p className="mt-1 font-head text-base font-extrabold text-white sm:text-lg">
                      Creative Talent at Work
                    </p>
                    <p className="font-body text-xs font-medium text-white/90">
                      RECARUH Talent & Innovation Workspace
                    </p>
                  </div>
                </div>

                {/* Mat caption footnote */}
                <div className="mt-3 flex items-center justify-between font-body text-[11px] font-bold uppercase tracking-widest text-navy-950">
                  <span>Fig. 1.0 — Team & Culture</span>
                  <span className="text-slate-600">Talent Ecosystem</span>
                </div>
              </div>

              {/* Secondary Layered Editorial Element (Offset Badge / Note) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...transitionConfig, delay: 0.45 }}
                className="absolute -bottom-8 -left-4 z-10 max-w-[280px] rounded-xl border border-white/10 bg-navy-950 p-5 font-body text-white shadow-2xl sm:-bottom-10 sm:-left-8 sm:max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand/40 bg-navy-900">
                    {!img2Error ? (
                      <Image
                        src={getImageSrc(aboutImages.about2)}
                        alt={aboutImages.about2.alt}
                        fill
                        className="object-cover"
                        onError={() => setImg2Error(true)}
                      />
                    ) : (
                      <Users className="h-4 w-4 text-brand" />
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
                      Innovation Focus
                    </p>
                    <p className="font-head text-xs font-bold text-white">
                      AI & Workforce Systems
                    </p>
                  </div>
                </div>

                <div className="my-3 h-px w-full bg-white/15" />

                <p className="font-body text-xs font-normal leading-relaxed text-white/90">
                  RECARUH redefines talent management with AI-driven hiring,
                  seamless HR automation, and smarter workforce solutions.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── 4 Strategic Highlights / Pillars (Cards Grid) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...transitionConfig, delay: 0.4 }}
          className="mt-20 border-t-2 border-slate-200 pt-12 sm:mt-24 lg:mt-28"
        >
          <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-[0.24em] text-brand">
                Strategic Foundation
              </p>
              <h3 className="mt-1 font-head text-xl font-extrabold tracking-tight text-navy-950 sm:text-2xl">
                Four Pillars of Our Operating Model
              </h3>
            </div>
            <p className="max-w-md font-body text-xs font-medium leading-relaxed text-slate-700">
              Designed to create enduring value across each touchpoint of the
              talent acquisition and human resource management lifecycle.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, k) => {
              const details = pillarDetails[h] || {
                number: `0${k + 1}`,
                icon: Briefcase,
                desc: "Integrated solutions engineered for enterprise excellence.",
              };
              const Icon = details.icon;

              return (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + k * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md lg:p-7"
                >
                  {/* Subtle top indicator line on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-1 w-0 rounded-t-2xl bg-brand transition-all duration-300 group-hover:w-full"
                  />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-head text-sm font-extrabold tracking-wider text-brand">
                        {details.number}
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy-950/5 text-navy-950 transition-all duration-300 group-hover:bg-brand group-hover:text-navy-950">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                    </div>

                    <h4 className="mt-6 font-head text-lg font-extrabold tracking-tight text-navy-950 sm:text-xl">
                      {h}
                    </h4>

                    <p className="mt-2 font-body text-xs font-normal leading-relaxed text-slate-700">
                      {details.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-navy-950 transition-colors duration-300 group-hover:text-brand">
                    <span>Explore Pillar</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

