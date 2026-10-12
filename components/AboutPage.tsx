"use client";
import { motion, MotionConfig } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Icon from "./Icon";
import Photo from "./Photo";
import Button from "./Button";

const rv = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-70px" }, transition: { duration: .8, delay: d, ease: [0.22, 1, 0.36, 1] as const } });
const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-brand" : "text-navy-950"}`}><span className="h-px w-8 bg-brand" />{children}</p>
);

const why = [
  { icon: "Search", title: "Automated Job Matching", text: "Find the right opportunities through intelligent skill-based recommendations." },
  { icon: "BadgeCheck", title: "Legitimate Recruiters", text: "Apply with confidence to trusted companies and genuine job openings." },
  { icon: "Zap", title: "Quick Hiring", text: "Experience quick-paced applications, screenings, and interview processes." },
  { icon: "Network", title: "Professional Networking", text: "Connect, learn, and grow in your career with the right professional network." },
];
const socials = [{ n: "Facebook", i: "Facebook" }, { n: "Instagram", i: "Instagram" }, { n: "LinkedIn", i: "Linkedin" }];

export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip">
        {/* 1. HERO */}
        <section className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-32 sm:pt-40 lg:pb-28">
          <div aria-hidden className="absolute inset-0 -z-10 opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <motion.div {...rv()}><Eyebrow light>About RECARUH</Eyebrow></motion.div>
              <motion.h1 {...rv(.1)} className="mt-6 font-head text-[2.4rem] font-extrabold leading-[1.05] text-white sm:text-6xl xl:text-7xl">Building Careers.<br /><span className="text-brand">Creating Opportunities.</span></motion.h1>
              <motion.p {...rv(.2)} className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">We bridge the gap between talented individuals and forward-thinking businesses, built on commitment, trust and transparency.</motion.p>
              <motion.div {...rv(.3)} className="mt-9 flex flex-wrap items-center gap-4"><Button href="#story">Our Story</Button><Button href="/contact" variant="ghost">Contact Us</Button></motion.div>
            </div>
            <motion.div {...rv(.2)} className="mx-auto w-full max-w-[22rem] lg:max-w-none" aria-hidden>
              <svg viewBox="0 0 400 400" className="float h-auto w-full">
                {[170, 115, 60].map(r => <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#fff" strokeOpacity=".18" />)}
                {[[200, 30], [345, 125], [320, 300], [90, 320], [55, 140]].map(([x, y], k) => <g key={k}><line x1="200" y1="200" x2={x} y2={y} stroke="#fff" strokeOpacity=".25" /><circle cx={x} cy={y} r="14" fill="#1E3A8A" stroke="#fff" strokeOpacity=".5" /><circle cx={x} cy={y - 3} r="4" fill="#fff" /><path d={`M${x - 7} ${y + 8}a7 6 0 0 1 14 0z`} fill="#fff" /></g>)}
                <circle cx="200" cy="200" r="34" fill="#F98C0F" /><circle cx="200" cy="192" r="8" fill="#0B1F4D" /><path d="M184 214a16 12 0 0 1 32 0z" fill="#0B1F4D" />
                <circle cx="230" cy="230" r="11" fill="none" stroke="#fff" strokeWidth="3" /><line x1="238" y1="238" x2="250" y2="250" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
          <a href="#story" aria-label="Scroll to our story" className="mx-auto mt-14 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:border-brand hover:text-brand"><ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" /></a>
        </section>

        {/* 2. STORY */}
        <section id="story" className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <motion.div {...rv()} className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full rounded-t-[10rem] rounded-b-2xl border border-brand sm:-bottom-6 sm:-right-6" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[10rem] rounded-b-2xl shadow-2xl shadow-navy-950/20">
                <motion.div initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }} className="absolute inset-0"><Photo src="/images/about/story.webp" alt="A handshake over a resume, closing a successful placement" sizes="(min-width:1024px) 45vw, 90vw" /></motion.div>
              </div>
              <p className="absolute -left-2 bottom-10 rounded-full bg-navy-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-xl sm:-left-6">Trust · Commitment · Transparency</p>
            </motion.div>
            <div>
              <motion.div {...rv()}><Eyebrow>Our Story</Eyebrow></motion.div>
              <motion.h2 {...rv(.1)} className="mt-5 font-head text-3xl font-extrabold text-navy-950 sm:text-5xl">Building Career Opportunities</motion.h2>
              <div className="my-7 h-px w-20 bg-brand" />
              <motion.div {...rv(.2)} className="max-w-xl space-y-5 text-base leading-[1.8] sm:text-lg">
                <p className="text-lg font-bold text-navy-950 sm:text-xl">At RECARUH, our journey began with a simple vision: to bridge the gap between <mark className="bg-brand/20 px-1 font-semibold text-navy-950">talent and businesses</mark>.</p>
                <p className="text-slate-800">As businesses grow, so does the need for the workforce. Industries require more online job portals than traditional hiring solutions. RECARUH believes people are the driving force behind any successful organization. For RECARUH, recruitment is not merely about hiring but also about creating meaningful growth opportunities. Thus, we bridge the gap between talented individuals and forward-thinking businesses, and we built our reputation on our commitment, trust, and transparency.</p>
                <p className="text-slate-800">Every hiring and placement reflects our dedication to the users. We built our reputation on measurable outcomes and constructive feedback from our users, whether they are employers or employees, and our approach on insights from iterations and insights. To stay ahead of the industry, we ensure that our clients and job seekers are prepared for futuristic growth.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. WHY CHOOSE US */}
        <section className="bg-navy-950 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <motion.div {...rv()} className="max-w-2xl"><Eyebrow light>Why Choose Us?</Eyebrow><h2 className="mt-5 font-head text-3xl font-extrabold text-white sm:text-5xl">Reasons for Choosing Us</h2></motion.div>
            <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {why.map((w, k) => (
                <motion.li key={w.title} {...rv(k * .12)} className={`group relative border-t border-white/20 pt-6 transition duration-500 hover:-translate-y-1.5 ${k % 2 ? "lg:mt-14" : ""}`}>
                  <span aria-hidden className="absolute left-0 top-[-1px] h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-start justify-between">
                    <span className="font-head text-5xl font-extrabold text-white/30 transition-colors duration-500 group-hover:text-brand">0{k + 1}</span>
                    <Icon name={w.icon} className="h-7 w-7 text-brand transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-8 text-xl font-bold text-white">{w.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/85">{w.text}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. FOUNDER */}
        <section className="relative bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <motion.div {...rv()} className="group relative mx-auto w-full max-w-sm lg:max-w-none">
              <div aria-hidden className="absolute -left-4 -top-4 h-full w-full rounded-t-full rounded-b-3xl border border-navy-800/30 sm:-left-6 sm:-top-6" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-3xl shadow-2xl shadow-navy-950/25">
                <div className="absolute inset-0 transition duration-700 group-hover:scale-105"><Photo src="/images/about/founder.webp" alt="Sunaina Shaw, Founder of RECARUH" sizes="(min-width:1024px) 40vw, 85vw" /></div>
              </div>
            </motion.div>
            <div className="relative">
              <span aria-hidden className="pointer-events-none absolute -top-16 left-0 select-none font-head text-[10rem] leading-none text-brand/20 sm:-top-20 sm:text-[14rem]">“</span>
              <motion.div {...rv()} className="relative"><Eyebrow>Founder&apos;s Note</Eyebrow></motion.div>
              <motion.h2 {...rv(.1)} className="relative mt-5 font-head text-3xl font-extrabold text-navy-950 sm:text-5xl">From the Founder&apos;s Desk</motion.h2>
              <motion.div {...rv(.2)} className="relative mt-8 max-w-xl space-y-5 text-base leading-[1.8] sm:text-lg">
                <p className="text-lg font-bold text-navy-950 sm:text-xl">At RECARUH, we believe recruitment is about creating opportunities, building trust, and helping businesses grow with the right people.</p>
                <p className="text-slate-800">When I started this journey, my vision was to build a talent solutions company that values relationships, understands business needs, and delivers with integrity.</p>
                <p className="text-slate-800">Every organisation deserves exceptional talent, and every professional deserves a meaningful career opportunity. Our team is committed to bridging that gap through a people-first approach, industry expertise, and a passion for excellence.</p>
                <p className="text-slate-800">As we continue to grow, our focus remains the same: to be a trusted recruitment partner for businesses and a reliable career partner for professionals.</p>
                <p className="text-slate-800">Thank you for being a part of the RECARUH journey.</p>
              </motion.div>
              <div className="relative mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-navy-950/15 pt-6">
                <div><p className="font-head text-2xl font-bold text-navy-950">Sunaina Shaw</p><p className="text-sm font-semibold uppercase tracking-widest text-navy-900">Founder, RECARUH</p></div>
                <ul className="flex gap-3">{socials.map(s => <li key={s.n}><a href="#" aria-label={`${s.n} (Sunaina Shaw)`} className="grid h-11 w-11 place-items-center rounded-full border border-navy-950/30 text-navy-950 transition duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand"><Icon name={s.i} className="h-4 w-4 text-navy-950" /></a></li>)}</ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
