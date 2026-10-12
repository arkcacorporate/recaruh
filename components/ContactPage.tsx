"use client";
import React, { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Building2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { contact, socials } from "@/lib/data";

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
    className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-brand" : "text-navy-950"
      }`}
  >
    <span className="h-px w-8 bg-brand" />
    {children}
  </p>
);

const FAQS = [
  {
    q: "How quickly can employers hire qualified candidates through RECARUH?",
    a: "Depending on role seniority and skill specialization, our automated candidate screening and pre-verified talent network enables companies to review shortlisted candidate profiles within 24 to 48 hours and complete hiring cycles 3.5x faster than conventional recruitment firms.",
  },
  {
    q: "Is RECARUH free for job seekers to register and apply?",
    a: "Yes! Job seekers can register their profile, build their digital resume, and apply to verified corporate vacancies at zero cost. We are committed to transparency and genuine employment opportunities.",
  },
  {
    q: "What HR automation and statutory compliance services do you support?",
    a: "We support end-to-end workforce operations including automated PF and ESI computation, digital onboarding vaults, statutory compliance reporting, attendance integration, and structured HR analytics.",
  },
  {
    q: "Can universities and colleges partner with RECARUH for campus hiring?",
    a: "Absolutely. We work closely with institutional career services and placement cells across West Bengal and nationwide to conduct structured campus drives, technical hackathons, and internship pipelines.",
  },
  {
    q: "Can we schedule an in-person meeting at your Kolkata office?",
    a: "Yes, our corporate office is situated at Ecospace Business Park, Block 4A, 6th Floor in New Town, Kolkata. Please submit the contact form or call us in advance so our leadership team can prepare for your visit.",
  },
];

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "Employer Hiring Solutions",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (formData.phone.trim() && !/^[0-9+()\- ]{7,16}$/.test(formData.phone.trim())) {
      errs.phone = "Please enter a valid phone number (or leave blank).";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Please share a few more details in your message (minimum 10 characters).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "Employer Hiring Solutions",
        message: "",
      });
      setErrors({});
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected network error occurred. Please contact us directly at info@recaruh.com.");
      }
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip bg-[#F8FAFC]">
        {/* ─── 1. HERO SECTION ─── */}
        <section className="relative isolate overflow-hidden bg-navy-950 pb-24 pt-32 sm:pt-40 lg:pb-32">
          {/* Branded background patterns */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(249,140,15,0.18) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-10 h-96 w-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(46,139,69,0.15) 0%, transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-7xl px-5 text-center">
            <motion.div {...rv(0)} className="flex justify-center">
              <Eyebrow light>Connect With ARKCA & RECARUH</Eyebrow>
            </motion.div>
            <motion.h1
              {...rv(0.1)}
              className="mt-6 font-head text-[2.4rem] font-extrabold leading-[1.1] text-white sm:text-6xl xl:text-7xl"
            >
              Let&apos;s Start a <span className="text-brand">Conversation</span>
            </motion.h1>
            <motion.p
              {...rv(0.2)}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Whether you are an enterprise seeking qualified talent, a professional exploring new horizons, or an institution looking to collaborate, our team in Kolkata is ready to assist.
            </motion.p>

            {/* Quick highlight pills */}
            <motion.div
              {...rv(0.3)}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Response within 24 business hours
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-forest-400" />
                Verified corporate recruitment
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-brand-light" />
                Zero obligation consultation
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 2. CONTACT CARDS STRIP ─── */}
        <section className="relative z-10 -mt-12 px-5 sm:-mt-16">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            {/* Office Address Card */}
            <motion.div
              {...rv(0)}
              className="group rounded-3xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-navy-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-navy-950">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-head text-lg font-bold text-navy-950">
                Corporate Office
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {contact.address}
              </p>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <a
                  href="#map-section"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand transition hover:text-brand-dark"
                >
                  View on Map
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              {...rv(0.1)}
              className="group rounded-3xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-navy-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950/10 text-navy-900 transition-colors group-hover:bg-navy-900 group-hover:text-white">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-head text-lg font-bold text-navy-950">
                Email Inquiries
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Direct correspondence for recruitment, partnerships &amp; support.
              </p>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy-950 transition hover:text-brand"
                >
                  {contact.email}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Phone & Hours Card */}
            <motion.div
              {...rv(0.2)}
              className="group rounded-3xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-navy-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-100 text-forest-700 transition-colors group-hover:bg-forest-600 group-hover:text-white">
                <Phone className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-head text-lg font-bold text-navy-950">
                Direct Phone Line
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Mon – Fri: 9:30 AM – 6:30 PM IST
              </p>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy-950 transition hover:text-brand"
                >
                  +91 {contact.phone}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 3. MAIN FORM & DETAILS SECTION ─── */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left Column: Context & Assurances */}
              <motion.div {...rv(0)} className="lg:col-span-5">
                <Eyebrow>SEND A MESSAGE</Eyebrow>
                <h2 className="mt-4 font-head text-3xl font-extrabold text-navy-950 sm:text-4xl">
                  Tell Us How We Can Support Your Journey
                </h2>
                <div className="my-6 h-px w-16 bg-brand" />
                <p className="text-base leading-relaxed text-slate-600">
                  Fill out our inquiry form and our enterprise consulting specialists will evaluate your requirements. Whether hiring for high-volume roles or seeking personalized career advancement, we deliver transparent, measurable outcomes.
                </p>

                {/* Value bullets */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-950">
                        Rapid Matching Engine
                      </h3>
                      <p className="text-xs text-slate-600">
                        Pre-screened candidates aligned with role requirements in under 48 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-700">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-950">
                        Confidential &amp; Verified
                      </h3>
                      <p className="text-xs text-slate-600">
                        Strict data governance and NDAs protecting both corporate and candidate data.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-navy-100 text-navy-900">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-950">
                        Kolkata Headquarters
                      </h3>
                      <p className="text-xs text-slate-600">
                        Strategically located in New Town Ecospace Business Park, Kolkata tech hub.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Connect */}
                <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Connect on Social Media
                  </p>
                  <div className="mt-3 flex gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand hover:bg-brand/5 hover:text-brand"
                      >
                        {s.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Contact Form */}
              <motion.div {...rv(0.1)} className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-navy-950/5 sm:p-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                    <div>
                      <h3 className="font-head text-2xl font-bold text-navy-950">
                        Online Inquiry Form
                      </h3>
                      <p className="text-xs text-slate-500">
                        Please provide accurate contact details so we can reach you.
                      </p>
                    </div>
                    <span className="hidden rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700 sm:inline-block">
                      Fast Response
                    </span>
                  </div>

                  {/* Success State */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="my-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-center"
                    >
                      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-7 w-7" />
                      </div>
                      <h4 className="mt-3 font-head text-lg font-bold text-emerald-950">
                        Message Received!
                      </h4>
                      <p className="mt-1 text-sm text-emerald-800">
                        Thank you for reaching out to RECARUH. Our talent team has received your inquiry and will respond within 24 business hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
                      >
                        Send Another Inquiry
                      </button>
                    </motion.div>
                  )}

                  {/* Error State */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="my-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                    >
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                      <div>
                        <p className="font-semibold">Submission encountered an issue:</p>
                        <p className="text-xs mt-0.5">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Form */}
                  {status !== "success" && (
                    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                      {/* Name & Email Row */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* Full Name */}
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-xs font-bold uppercase tracking-wider text-navy-950"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => {
                              setFormData({ ...formData, fullName: e.target.value });
                              if (errors.fullName) {
                                setErrors({ ...errors, fullName: "" });
                              }
                            }}
                            placeholder="please enter your name"
                            aria-invalid={!!errors.fullName}
                            aria-describedby={errors.fullName ? "fullName-err" : undefined}
                            className={`mt-2 w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-colors focus:bg-white focus:outline-none ${errors.fullName
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-brand"
                              }`}
                          />
                          {errors.fullName && (
                            <p id="fullName-err" className="mt-1.5 text-xs text-red-600">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Work Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-bold uppercase tracking-wider text-navy-950"
                          >
                            Work Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (errors.email) {
                                setErrors({ ...errors, email: "" });
                              }
                            }}
                            placeholder="name@company.com"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-err" : undefined}
                            className={`mt-2 w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-colors focus:bg-white focus:outline-none ${errors.email
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-brand"
                              }`}
                          />
                          {errors.email && (
                            <p id="email-err" className="mt-1.5 text-xs text-red-600">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone & Subject Row */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* Phone Number */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-bold uppercase tracking-wider text-navy-950"
                          >
                            Phone Number <span className="text-slate-400">(Optional)</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (errors.phone) {
                                setErrors({ ...errors, phone: "" });
                              }
                            }}
                            placeholder="+91 98765 43210"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-err" : undefined}
                            className={`mt-2 w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-colors focus:bg-white focus:outline-none ${errors.phone
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-brand"
                              }`}
                          />
                          {errors.phone && (
                            <p id="phone-err" className="mt-1.5 text-xs text-red-600">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* Subject / Service Selection */}
                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-xs font-bold uppercase tracking-wider text-navy-950"
                          >
                            Inquiry Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-colors focus:bg-white focus:border-brand focus:outline-none"
                          >
                            <option value="Employer Hiring Solutions">Employer Hiring Solutions</option>
                            <option value="Job Seeker Opportunities">Job Seeker Opportunities</option>
                            <option value="Campus Recruitment Program">Campus Recruitment Program</option>
                            <option value="HR Automation & Compliance">HR Automation &amp; Compliance</option>
                            <option value="Resume & Interview Coaching">Resume &amp; Interview Coaching</option>
                            <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="message"
                            className="block text-xs font-bold uppercase tracking-wider text-navy-950"
                          >
                            Message Details <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[11px] text-slate-400">
                            Min 10 characters
                          </span>
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => {
                            setFormData({ ...formData, message: e.target.value });
                            if (errors.message) {
                              setErrors({ ...errors, message: "" });
                            }
                          }}
                          placeholder="Tell us about the roles you are hiring for, your timeline, or any specific talent requirements..."
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-err" : undefined}
                          className={`mt-2 w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-colors focus:bg-white focus:outline-none ${errors.message
                              ? "border-red-400 focus:border-red-500"
                              : "border-slate-200 focus:border-brand"
                            }`}
                        />
                        {errors.message && (
                          <p id="message-err" className="mt-1.5 text-xs text-red-600">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-light hover:shadow-brand/40 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending Inquiry...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Inquiry</span>
                              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </button>
                        <p className="mt-2.5 text-center text-[11px] text-slate-400">
                          We respect your privacy. No spam. All inquiries handled with strict confidentiality.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── 4. INTERACTIVE MAP SECTION ─── */}
        <section id="map-section" className="bg-white py-20 sm:py-24 border-t border-slate-200/60">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>OUR LOCATION</Eyebrow>
                <h2 className="mt-4 font-head text-3xl font-extrabold text-navy-950 sm:text-4xl">
                  Visit RECARUH at Ecospace Business Park
                </h2>
                <p className="mt-2 text-sm text-slate-600 sm:text-base">
                  Conveniently situated in New Town, Kolkata&apos;s premier corporate and IT enclave.
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Ecospace+Business+Park+Block+4A+New+Town+Kolkata+700156"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-navy-950/20 bg-slate-50 px-6 py-2.5 text-xs font-bold text-navy-950 transition hover:border-brand hover:bg-brand/10 hover:text-brand"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Map Frame */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl shadow-navy-950/5">
              <div className="relative aspect-[16/9] w-full max-h-[500px]">
                <iframe
                  title="RECARUH Corporate Office Location - Ecospace Business Park, Kolkata"
                  src="https://maps.google.com/maps?q=Ecospace%20Business%20Park%2C%20Block%204A%2C%20New%20Town%2C%20Kolkata%20700156&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full grayscale-[25%] contrast-[1.05]"
                />

                {/* Floating office badge */}
                <div className="absolute bottom-5 left-5 hidden sm:block max-w-xs rounded-2xl border border-white/40 bg-navy-950/90 p-4 text-white shadow-2xl backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand">
                    <Building2 className="h-4 w-4" />
                    <span>RECARUH HQ</span>
                  </div>
                  <p className="mt-1 text-xs text-white/80">
                    Ecospace Business Park, Block 4A, 6th Floor, New Town, Kolkata 700156
                  </p>
                  <p className="mt-1 text-[11px] text-white/50">
                    Landmark: Near Mother&apos;s Wax Museum
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. FREQUENTLY ASKED QUESTIONS (FAQ) ─── */}
        <section className="bg-[#F8FAFC] py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-5">
            <div className="text-center">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-4 font-head text-3xl font-extrabold text-navy-950 sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                Common questions regarding our recruitment services, candidate screening, and corporate partnerships.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-shadow duration-300 hover:shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    >
                      <span className="font-head text-base font-bold text-navy-950 sm:text-lg">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand" : ""
                          }`}
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${idx}`}
                        className="px-6 pb-6 text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-4"
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
