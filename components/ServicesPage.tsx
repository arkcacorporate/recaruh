"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  Briefcase,
  FileText,
  Mic2,
  GraduationCap,
  BarChart3,
  Lightbulb,
  Building2,
  Megaphone,
  Cpu,
  Database,
  Award,
  Headphones,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

/* ─── Service data ──────────────────────────────────────────────── */
interface Service {
  icon: LucideIcon;
  title: string;
  tag: string;
  desc: string;
}

const JOB_SEEKERS: Service[] = [
  {
    icon: Briefcase,
    title: "Job Applications",
    tag: "Opportunities",
    desc: "Find employment in a variety of industries, experience levels, and areas. Manage opportunities and applications, apply quickly, and get alerts for positions that meet your requirements.",
  },
  {
    icon: FileText,
    title: "Resume Building",
    tag: "Profile",
    desc: "Build a robust profile on the RECARUH job portal, which helps recruiters understand the strengths of the candidates. Make a resume that highlights skills and work experience.",
  },
  {
    icon: Mic2,
    title: "Interview Preparation",
    tag: "Confidence",
    desc: "Get interview opportunities with role-specific preparation resources and build confidence with RECARUH to make a lasting impression on recruiters.",
  },
  {
    icon: GraduationCap,
    title: "Career Counseling",
    tag: "Guidance",
    desc: "Professional recruiters and employers will provide career counseling to new job seekers and advise experienced professionals on healthy career growth.",
  },
  {
    icon: BarChart3,
    title: "Skill Assessment",
    tag: "Assessment",
    desc: "Understand your strengths, identify weaker areas, and discover opportunities for improvement through assessments tailored to boost your job profile and improve your resume.",
  },
  {
    icon: Lightbulb,
    title: "Upskilling",
    tag: "Growth",
    desc: "With recent technologies, it has become essential to acquire in-demand skills and continuously improve your professional capabilities.",
  },
  {
    icon: Building2,
    title: "Internship Opportunities",
    tag: "Experience",
    desc: "Start your career journey with jobs and internships. Gain valuable experience with RECARUH by developing industry-relevant skills.",
  },
];

const EMPLOYERS: Service[] = [
  {
    icon: GraduationCap,
    title: "Campus Hiring",
    tag: "Pipeline",
    desc: "Reach students and fresh graduates through structured campus recruitment programs and build the best talent.",
  },
  {
    icon: Megaphone,
    title: "Job Posting",
    tag: "Reach",
    desc: "Publish and hire smartly by connecting with qualified candidates across various roles and industries with the help of the RECARUH job portal.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Candidate Selection",
    tag: "AI Driven",
    desc: "Emerging technologies are changing the way companies recruit. AI helps you identify the right candidates quickly and efficiently.",
  },
  {
    icon: Database,
    title: "Job Seeker Database",
    tag: "Database",
    desc: "Access best-fit candidate profiles with ease and hire smarter with RECARUH to meet your hiring needs.",
  },
  {
    icon: Award,
    title: "Employer Branding",
    tag: "Branding",
    desc: "Highlight company culture, values, work environment, and growth opportunities to attract the best talent.",
  },
  {
    icon: Headphones,
    title: "Recruitment Process Support",
    tag: "Support",
    desc: "Make hiring easier with support for screening, short-listing, interview coordination, and offer-stage assistance.",
  },
  {
    icon: TrendingUp,
    title: "Tracking Recent Trends",
    tag: "Insights",
    desc: "Track recruitment processes, job seeker responses, and overall performance with valuable insights that help recruiters make better decisions.",
  },
];

const TABS = ["Job Seekers", "Employers"] as const;
type Tab = (typeof TABS)[number];

/* ─── ServiceCard ───────────────────────────────────────────────── */
function ServiceCard({ item, index }: { item: Service; index: number }) {
  const Icon = item.icon;
  const isAlt = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.065, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 shadow-[0_2px_16px_rgba(11,31,77,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(11,31,77,0.13)] ${
        isAlt ? "bg-slate-50" : "bg-white"
      }`}
    >
      {/* Top orange accent bar reveals on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        {/* Icon + Tag row */}
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <span className="mt-0.5 rounded-full bg-navy-950/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-950">
            {item.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-head text-lg font-extrabold leading-snug text-navy-950 sm:text-[1.2rem]">
          {item.title}
        </h3>

        {/* Body */}
        <p className="flex-1 text-sm leading-[1.75] text-slate-800">
          {item.desc}
        </p>

        {/* Hover CTA hint */}
        <div className="flex translate-y-1.5 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand" />
          <span className="text-xs font-bold text-brand">
            Available with RECARUH
          </span>
        </div>
      </div>

      {/* Bottom orange accent line grows on hover */}
      <div
        aria-hidden
        className="mx-6 mb-5 h-0.5 w-0 bg-brand transition-all duration-300 ease-out group-hover:w-full"
      />
    </motion.article>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function ServicesPage() {
  const [active, setActive] = useState<Tab>("Job Seekers");
  const services = active === "Job Seekers" ? JOB_SEEKERS : EMPLOYERS;

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip">

        {/* ═══ HERO — dark navy, matching site Hero/Footer style ══════ */}
        <section className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-32 sm:pt-40 lg:pb-28">
          {/* Grid texture overlay */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px]"
          />
          {/* Orange ambient glow top-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(249,140,15,0.35) 0%, transparent 70%)" }}
          />
          {/* Navy blue glow bottom-left */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-[380px] w-[380px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(30,58,138,0.5) 0%, transparent 70%)" }}
          />

          <div className="relative mx-auto max-w-4xl px-5 text-center">
            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-brand"
            >
              <span aria-hidden className="h-px w-8 bg-brand" />
              Recruitment Services
              <span aria-hidden className="h-px w-8 bg-brand" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-6 font-head text-[2.4rem] font-extrabold leading-[1.07] text-white sm:text-5xl lg:text-6xl"
            >
              Services Built for{" "}
              <span className="relative inline-block">
                <span className="text-brand">Every Journey</span>
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-[7px] w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 6C60 2 140 2 196 6"
                    stroke="#F98C0F"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Whether you&apos;re launching your career or scaling your team,
              RECARUH provides end-to-end recruitment solutions — tailored,
              transparent, and trusted.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
            >
              {[
                { label: "Services for Job Seekers", value: "7" },
                { label: "Services for Employers",   value: "7" },
                { label: "End-to-end Support",        value: "100%" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-0.5">
                  <span className="font-head text-3xl font-extrabold text-brand sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="text-xs font-semibold text-white/90">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ TABS + CARDS — light off-white, matching Services section ═══ */}
        <section className="relative overflow-clip bg-[#FAFAF7] py-16 sm:py-20 lg:py-24">
          {/* Ambient glows — exactly matching existing Services.tsx */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(249,140,15,0.08) 0%, transparent 70%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(30,58,138,0.06) 0%, transparent 70%)" }}
          />

          <div className="relative mx-auto max-w-7xl px-5">

            {/* Segmented Tab Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-14 flex justify-center"
            >
              <div
                className="flex rounded-2xl border border-slate-300 bg-white p-1.5 shadow-[0_4px_20px_rgba(11,31,77,0.08)]"
                role="tablist"
                aria-label="Service category"
              >
                {TABS.map((tab) => {
                  const isActive = active === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      id={`services-tab-${tab === "Job Seekers" ? "seekers" : "employers"}`}
                      aria-selected={isActive}
                      aria-controls={`services-panel-${tab === "Job Seekers" ? "seekers" : "employers"}`}
                      onClick={() => setActive(tab)}
                      className="relative min-w-[140px] rounded-xl px-7 py-3 text-sm font-bold transition-colors duration-150 focus-visible:outline-2 sm:min-w-[170px] sm:px-9 sm:py-3.5 sm:text-base"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="svc-tab-pill"
                          className="absolute inset-0 rounded-xl bg-navy-950 shadow-[0_4px_16px_rgba(11,31,77,0.3)]"
                          transition={{ type: "spring", stiffness: 360, damping: 36 }}
                        />
                      )}
                      <span
                        className={`relative z-10 tracking-wide ${
                          isActive ? "text-white" : "text-navy-950"
                        }`}
                      >
                        {tab}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Animated Tab Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                id={`services-panel-${active === "Job Seekers" ? "seekers" : "employers"}`}
                role="tabpanel"
                aria-labelledby={`services-tab-${active === "Job Seekers" ? "seekers" : "employers"}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Sub-label */}
                <div className="mb-8 flex items-center gap-3">
                  <span aria-hidden className="h-0.5 w-6 rounded-full bg-brand" />
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
                    {active === "Job Seekers"
                      ? "7 services for professionals"
                      : "7 services for organisations"}
                  </p>
                </div>

                {/* Cards Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
                  {services.map((item, i) => (
                    <ServiceCard key={item.title} item={item} index={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA Strip — dark navy, matching Footer CTA style */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="mt-16 sm:mt-20"
            >
              <div className="relative overflow-hidden rounded-2xl bg-navy-950">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-brand/10 via-transparent to-brand/10"
                />
                <div className="relative flex flex-col items-center gap-6 px-8 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
                  <div>
                    <p className="font-head text-xl font-extrabold text-white sm:text-2xl">
                      Ready to get started?
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                      Connect with our team and discover how RECARUH can support your{" "}
                      {active === "Job Seekers" ? "career journey." : "hiring goals."}
                    </p>
                  </div>
                  <a
                    href="/contact"
                    className="group inline-flex flex-shrink-0 items-center gap-2.5 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-brand/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-brand/50"
                  >
                    Get in Touch
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}

