"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Mail, MapPin, Menu, X } from "lucide-react";
import { GithubIcon, IndiaMap, LinkedinIcon, YMark } from "./icons";
import { navSections, profile } from "@/data/resume";

/** Icon link with a playful hint that drops in below on hover. */
function IconHint({
  href,
  label,
  hint,
  external = false,
  children,
}: {
  href: string;
  label: string;
  hint: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="group/icon relative text-muted transition-colors hover:text-fg"
    >
      {children}
      <span className="pointer-events-none absolute right-0 top-full mt-4 translate-y-1 whitespace-nowrap rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 font-mono text-[10px] tracking-wide text-muted opacity-0 shadow-lg shadow-black/40 transition-all duration-200 ease-out group-hover/icon:translate-y-0 group-hover/icon:opacity-100">
        {hint}
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [eggOpen, setEggOpen] = useState(false);

  // Easter egg closes on Escape
  useEffect(() => {
    if (!eggOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEggOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [eggOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const { id } of navSections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Persistent glass backdrop, cross-faded to avoid class-swap flicker */}
      <div
        aria-hidden
        className={`glass absolute inset-0 border-b border-border shadow-lg shadow-black/30 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <nav className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <div className="relative">
          <button
            onClick={() => setEggOpen((v) => !v)}
            aria-label="Yashwanth D logo — click for a little secret"
            className="group flex cursor-pointer items-center transition-transform duration-300 ease-out hover:scale-110"
          >
            <span className="logo-flip inline-flex">
              <YMark size={30} />
            </span>
          </button>

          <AnimatePresence>
            {eggOpen && (
              <>
                {/* Click-away layer */}
                <motion.div
                  className="fixed inset-0 z-40"
                  onClick={() => setEggOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.92 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="glass absolute left-0 top-full z-50 mt-4 w-80 max-w-[calc(100vw-2.5rem)] origin-top-left rounded-2xl p-6 shadow-2xl shadow-black/50"
                >
                  <p className="eyebrow mb-3">🥚 easter egg · 01</p>
                  <p className="text-2xl font-bold tracking-wide text-fg">
                    Yashwanth
                  </p>
                  <p className="mt-1 font-mono text-xs text-violet">
                    me
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Yashwanth means{" "}
                    <span className="text-fg">
                      &ldquo;one who is always famous&rdquo;
                    </span>{" "}
                     a bearer of lasting glory and success.
                  </p>
                  <p className="mt-3 font-mono text-[11px] text-dim">
                    No pressure or anything.
                  </p>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navSections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === id
                    ? "bg-surface-2 text-fg"
                    : "text-muted hover:text-fg"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <IconHint
            href={profile.links.github}
            label="GitHub"
            hint="where my code lives rent-free"
            external
          >
            <GithubIcon size={18} />
          </IconHint>
          <IconHint
            href={profile.links.linkedin}
            label="LinkedIn"
            hint="me, but in a formal shirt"
            external
          >
            <LinkedinIcon size={18} />
          </IconHint>
          <IconHint
            href={`mailto:${profile.email}`}
            label="Email"
            hint="replies faster than my CI/CD"
          >
            <Mail size={18} />
          </IconHint>
          <a
            href="/Yashwanth-D-Resume.pdf"
            download
            className="accent-gradient ml-2 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-violet/25 transition-transform hover:scale-105 active:scale-95"
          >
            <Download size={13} />
            Download CV
          </a>
          <span className="group/loc relative ml-1 hidden cursor-default items-center gap-1 text-xs text-dim transition-colors hover:text-muted lg:flex">
            <MapPin size={13} />
            {profile.location}
            {/* India map popover — flashes Tamil Nadu on hover */}
            <span className="pointer-events-none absolute right-0 top-full mt-3 flex origin-top-right scale-90 opacity-0 transition-all duration-300 ease-out group-hover/loc:scale-100 group-hover/loc:opacity-100">
              <IndiaMap />
            </span>
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-fg md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass relative overflow-hidden border-b border-border md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navSections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="/Yashwanth-D-Resume.pdf"
                  download
                  onClick={() => setOpen(false)}
                  className="accent-gradient flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <Download size={14} />
                  Download CV
                </a>
              </li>
              <li className="mt-3 flex items-center justify-between border-t border-border pt-4">
                <span className="flex items-center gap-1.5 text-xs text-dim">
                  <MapPin size={13} />
                  {profile.location}
                </span>
                <span className="flex items-center gap-5">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-muted transition-colors hover:text-fg"
                  >
                    <GithubIcon size={18} />
                  </a>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-muted transition-colors hover:text-fg"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label="Email"
                    className="text-muted transition-colors hover:text-fg"
                  >
                    <Mail size={18} />
                  </a>
                </span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
