"use client";
import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";

const pillIcons = [Briefcase, ShieldCheck, Zap, TrendingUp];
const pillColors = [
  "from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30",
  "from-emerald-500/20 to-emerald-600/20 text-emerald-400 border-emerald-500/30",
  "from-amber-500/20 to-amber-600/20 text-amber-400 border-amber-500/30",
  "from-purple-500/20 to-purple-600/20 text-purple-400 border-purple-500/30",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [img1Error, setImg1Error] = useState(false);
  const [img2Error, setImg2Error] = useState(false);

  // Scroll-reveal fallback for non-Framer elements
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-clip bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 lg:py-32"
    >
      {/* Background accents */}
      <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-brand/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-navy-800/5 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20">
        {/* ── Left: Photo Collage ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative pb-16 sm:pb-20">
            {/* Main photo (about-1.jpg) */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl shadow-navy-950/15 sm:aspect-[5/4]">
              {!img1Error ? (
                <Image
                  src={getImageSrc(aboutImages.about1)}
                  alt={aboutImages.about1.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  onError={() => setImg1Error(true)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-navy-900 via-navy-950 to-blue-900 p-6 text-center text-white">
                  <Building2 className="h-16 w-16 text-brand/80" />
                  <p className="mt-3 font-head text-lg font-bold">RECARUH Headquarters</p>
                  <p className="text-xs text-white/60">Ecospace Business Park, Kolkata</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 to-transparent" />
            </div>

            {/* Secondary photo (about-2.jpg) – overlapping bubble */}
            <div className="absolute -bottom-4 right-2 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-2xl sm:-bottom-6 sm:right-0 sm:h-44 sm:w-44">
              {!img2Error ? (
                <Image
                  src={getImageSrc(aboutImages.about2)}
                  alt={aboutImages.about2.alt}
                  fill
                  sizes="(max-width: 640px) 128px, 176px"
                  className="object-cover"
                  onError={() => setImg2Error(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-brand-dark p-2 text-white">
                  <Users className="h-10 w-10 text-white" />
                </div>
              )}
            </div>

            {/* Floating orange pill note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="absolute -bottom-6 left-2 right-28 z-10 rounded-2xl border border-brand/20 bg-gradient-to-br from-brand to-brand-dark p-4 shadow-xl shadow-brand/20 sm:left-4 sm:right-auto sm:max-w-xs sm:p-5"
            >
              <p className="text-xs font-semibold leading-relaxed text-white sm:text-sm">
                RECARUH redefines talent management with AI-driven hiring,
                seamless HR automation, and smarter workforce solutions.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Right: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <span className="inline-block rounded-full bg-navy-950/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy-800">
            About Us
          </span>

          <h2 className="mt-4 font-head text-3xl font-extrabold leading-tight text-navy-950 sm:text-4xl lg:text-5xl">
            Our Vision{" "}
            <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              and Mission
            </span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            RECARUH is a talent ecosystem built to simplify hiring and HR
            management. We connect job seekers with the right opportunities and
            help organisations hire the right people, with HR automation that
            keeps the whole process simple and compliant — from PF/ESI
            calculations to seamless onboarding.
          </p>

          {/* Animated pills */}
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10">
            {highlights.map((h, k) => {
              const Icon = pillIcons[k];
              return (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + k * 0.08 }}
                  className={`flex items-center gap-3 rounded-2xl border bg-gradient-to-br p-3.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4 ${pillColors[k]}`}
                >
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-white/80 shadow-sm sm:h-11 sm:w-11">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-navy-950 sm:text-base">
                    {h}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
