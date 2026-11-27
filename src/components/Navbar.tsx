"use client";

import { useEffect, useState } from "react";
import { ScrollProgress } from "./motion";
import { Download, Mail, MapPin, Menu, Moon, Sun, X } from "lucide-react";
import { IndiaMap, LinkedinIcon, YMark } from "./icons";
import { navSections, profile } from "@/data/resume";

function IconHint({ href, label, hint, external, children }: {
  href: string;
  label: string;
  hint: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a href={href} aria-label={label}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="group/icon relative grid size-8 place-items-center text-muted hover:text-accent">
      {children}
      <span className="pointer-events-none absolute right-0 top-full mt-2 hidden whitespace-nowrap rounded border border-border bg-surface px-2.5 py-1.5 font-mono text-[10px] text-muted group-hover/icon:block group-focus-visible/icon:block">
        {hint}
      </span>
    </a>
  );
}

function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const theme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // The theme still applies to this document when storage is unavailable.
    }
  }
  return (
    <button type="button" onClick={toggle}
      className="glass grid size-9 cursor-pointer place-items-center rounded-md text-muted hover:text-accent">
      <span className="when-dark"><Sun size={16} aria-hidden /><span className="sr-only">Switch to light theme</span></span>
      <span className="when-light"><Moon size={16} aria-hidden /><span className="sr-only">Switch to dark theme</span></span>
    </button>
  );
}

function DownloadCV() {
  return (
    <a href={`/Yashwanth-D-Resume.pdf?v=${process.env.NEXT_PUBLIC_CV_VERSION}`} download="Yashwanth-D-Resume.pdf"
      className="glass inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 font-mono text-xs font-medium text-fg hover:text-accent">
      <Download size={14} /> Download CV
    </a>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [eggOpen, setEggOpen] = useState(false);

  useEffect(() => {
    if (!open && !eggOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEggOpen(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open, eggOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    }, { rootMargin: "-20% 0px -50% 0px" });
    for (const { id } of navSections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    const hero = document.getElementById("top");
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const links = navSections.map(({ id, label }) => (
    <li key={id}>
      <a href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}
        className={`block rounded-sm px-2.5 py-2 hover:text-accent ${active === id ? "text-accent" : "text-muted"}`}>
        {label}
      </a>
    </li>
  ));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-bg/55 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] backdrop-blur-xl backdrop-saturate-150">
      <ScrollProgress />
      <nav aria-label="Main navigation" className="relative mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-6">
        <div className="relative mr-auto lg:mr-0">
          <button type="button" onClick={() => { setEggOpen(!eggOpen); setOpen(false); }}
            aria-expanded={eggOpen} aria-label="Yashwanth D logo, click for a little secret"
            className="group grid size-9 cursor-pointer place-items-center rounded-md border border-accent/40 bg-accent/5">
            <span className="logo-flip"><YMark size={24} /></span>
          </button>
          {eggOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setEggOpen(false)} />
              <div className="absolute left-0 top-full z-50 mt-3 w-76 max-w-[calc(100vw-2.5rem)] rounded-lg border border-border bg-surface p-5 shadow-xl">
                <p className="eyebrow mb-3">🥚 easter egg · 01</p>
                <p className="text-2xl font-bold text-fg">Yashwanth</p>
                <p className="mt-1 font-mono text-xs text-accent">me</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Yashwanth means <span className="text-fg">&ldquo;one who is always famous&rdquo;</span> a bearer of lasting glory and success.
                </p>
                <p className="mt-3 font-mono text-[11px] text-dim">No pressure or anything.</p>
              </div>
            </>
          )}
        </div>
        <ul className="mr-auto hidden items-center text-sm lg:flex">{links}</ul>
        <div className="hidden items-center gap-1 lg:flex">
          <IconHint href={profile.links.linkedin} label="LinkedIn" hint="me, but in my formal attire" external><LinkedinIcon size={16} /></IconHint>
          <IconHint href={`mailto:${profile.email}`} label="Email" hint="replies faster than my CI/CD"><Mail size={16} /></IconHint>
          <span className="group/loc relative mx-1 hidden items-center gap-1 font-mono text-xs text-muted xl:flex">
            <MapPin size={13} />{profile.location}
            <span className="pointer-events-none absolute right-0 top-full mt-2 hidden rounded border border-border bg-surface p-3 group-hover/loc:block"><IndiaMap /></span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block"><DownloadCV /></div>
          <button type="button" onClick={() => { setOpen(!open); setEggOpen(false); }}
            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav"
            className="glass grid size-9 cursor-pointer place-items-center rounded-md text-fg lg:hidden">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-surface px-5 py-3 lg:hidden">
          <ul className="font-mono text-sm">{links}</ul>
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <DownloadCV />
            <span className="mr-auto flex items-center gap-1 font-mono text-xs text-muted"><MapPin size={13} />{profile.location}</span>
            <IconHint href={profile.links.linkedin} label="LinkedIn" hint="me, but in my formal attire" external><LinkedinIcon size={16} /></IconHint>
            <IconHint href={`mailto:${profile.email}`} label="Email" hint="replies faster than my CI/CD"><Mail size={16} /></IconHint>
          </div>
        </nav>
      )}
    </header>
  );
}
