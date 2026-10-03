"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/data";
import { logo } from "@/lib/images";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#0B1F4D]/80 shadow-lg shadow-navy-950/30 backdrop-blur-md"
          : "bg-transparent backdrop-blur-[2px]"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-5 md:h-[92px]"
      >
        {/* Logo link - Increased ~25-30% */}
        <Link
          href="/"
          className="group flex flex-shrink-0 items-center focus:outline-none"
          aria-label="RECARUH Home"
        >
          {!logoError ? (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={180}
              height={56}
              priority
              style={{ width: "auto" }}
              className="h-10 w-auto object-contain sm:h-11 md:h-14"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="font-head text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              RECA
              <span className="text-brand transition-colors group-hover:text-brand-light">
                RUH
              </span>
            </span>
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="relative inline-flex min-h-[44px] items-center px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                <span className="relative z-10">{n.label}</span>
                <span className="absolute inset-0 rounded-full bg-white/0 transition-all duration-300 hover:bg-white/10" />
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-navy-950 shadow-lg shadow-brand/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-brand/40"
            >
              Get Started
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle Button (44px min tap target) */}
        <button
          id="nav-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="relative z-50 grid h-11 w-11 place-items-center rounded-xl text-white transition-colors hover:bg-white/10 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#0B1F4D]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="px-5 pt-4 pb-2">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="inline-block"
              >
                {!logoError ? (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={50}
                    style={{ width: "auto" }}
                    className="h-10 w-auto object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="font-head text-2xl font-extrabold text-white">
                    RECA<span className="text-brand">RUH</span>
                  </span>
                )}
              </Link>
            </div>
            <ul className="space-y-1 px-5 pb-5">
              {nav.map((n, idx) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link
                    onClick={() => setOpen(false)}
                    href={n.href}
                    className="flex min-h-[44px] items-center rounded-xl px-4 py-2.5 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {n.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: nav.length * 0.04 }}
                className="pt-2"
              >
                <Link
                  onClick={() => setOpen(false)}
                  href="/contact"
                  className="flex min-h-[44px] items-center justify-center rounded-full bg-brand py-3 text-center text-sm font-bold text-navy-950"
                >
                  Get Started
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
