"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { contact, quickLinks, socials } from "@/lib/data";
import { logo } from "@/lib/images";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Send,
  Heart,
} from "lucide-react";

/* Inline social SVG icons */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" />
    </svg>
  );
}

const socialIcons: Record<string, React.FC<{ className?: string }>> = {
  Facebook: FacebookIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setMsg("Enter a valid email address.");
      setSubmitted(false);
      return;
    }
    setMsg("Thanks, you're subscribed!");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-clip bg-navy-950 text-white/75">
      {/* ── CTA Strip ── */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/10 via-transparent to-brand/10" />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-12 sm:flex-row sm:py-16">
          <div className="text-center sm:text-left">
            <h3 className="font-head text-2xl font-extrabold text-white sm:text-3xl">
              Ready to{" "}
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                hire or get hired
              </span>
              ?
            </h3>
            <p className="mt-2 text-sm text-white/60 sm:text-base">
              Join the smart way to manage talent and grow careers.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-navy-950 shadow-xl shadow-brand/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-brand/50"
          >
            Get Started Today
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Column with Logo */}
        <div>
          <Link href="/" className="inline-block focus:outline-none" aria-label="RECARUH Home">
            {!logoError ? (
              <div className="inline-block rounded-xl bg-white px-3.5 py-2.5 shadow-md transition-transform hover:scale-105">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={170}
                  height={52}
                  className="h-10 w-auto object-contain md:h-12"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <p className="font-head text-2xl font-extrabold text-white md:text-3xl">
                RECA
                <span className="text-brand">RUH</span>
              </p>
            )}
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            A smart job portal and HR automation platform for job seekers and
            employers. Simplifying hiring, compliance, and workforce management.
          </p>

          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-white/40">
            Follow Us
          </p>
          <ul className="mt-3 flex gap-3">
            {socials.map((s) => {
              const IconComp = socialIcons[s.label] ?? FacebookIcon;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/10 hover:text-brand hover:shadow-lg hover:shadow-brand/10"
                  >
                    <IconComp className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/40">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex min-h-[36px] items-center gap-2 text-sm transition-colors hover:text-brand"
                >
                  <span className="h-px w-0 bg-brand transition-all group-hover:w-3" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/40">
            Contact Info
          </p>
          <address className="mt-4 space-y-3.5 text-sm not-italic text-white/75">
            <a
              href={`tel:${contact.phone}`}
              className="flex min-h-[36px] items-start gap-3 transition-colors hover:text-brand"
            >
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex min-h-[36px] items-start gap-3 transition-colors hover:text-brand"
            >
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
              {contact.email}
            </a>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
              <span>{contact.address}</span>
            </p>
          </address>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/40">
            Newsletter
          </p>
          <p className="mt-4 text-sm text-white/70">
            Stay updated with the latest job market trends and HR insights.
          </p>
          <form onSubmit={submit} noValidate className="mt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  id="footer-newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMsg("");
                    setSubmitted(false);
                  }}
                  placeholder="Your email"
                  aria-describedby="nl-msg"
                  className="w-full min-w-0 rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/30 transition-all duration-300 focus:border-brand/50 focus:bg-white/10 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-brand text-navy-950 shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-light hover:shadow-brand/40"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {msg && (
              <p
                id="nl-msg"
                role="status"
                className={`mt-2 text-xs ${
                  submitted ? "text-emerald-400" : "text-brand"
                }`}
              >
                {msg}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="border-t border-white/10">
        <p className="flex items-center justify-center gap-1 px-5 py-5 text-center text-xs text-white/40">
          © {new Date().getFullYear()} RECARUH. Made with
          <Heart className="inline h-3 w-3 text-brand" />
          in Kolkata. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
