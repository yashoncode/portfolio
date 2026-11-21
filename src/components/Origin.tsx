"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { story } from "@/data/story";
import { WarpArrival, WarpOut, armWarp } from "@/components/Warp";
import StoryAside, { hasGlyph } from "@/components/StoryAside";

/**
 * The page on the other side of the portal. Arrives out of the flash the star
 * left behind, and leaves the same way, so the round trip reads as one motion
 * in both directions rather than two page loads.
 */
export default function Origin() {
  const router = useRouter();
  const [warping, setWarping] = useState(false);
  const [term, setTerm] = useState<string | null>(null);

  function goBack(e: React.MouseEvent) {
    // Let modified clicks open a new tab the normal way.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (warping) return;
    setWarping(true);
    setTimeout(() => router.push("/"), armWarp());
  }

  /**
   * Bare minimum **bold** support, so a chapter can lean on a fact without
   * dragging a markdown renderer into the bundle for one asterisk pair. Terms
   * the aside knows about become hoverable.
   */
  function emphasise(text: string) {
    return text.split(/\*\*(.+?)\*\*/g).map((part, i) => {
      if (i % 2 === 0) return part;
      if (!hasGlyph(part))
        return (
          <strong key={i} className="font-semibold text-fg">
            {part}
          </strong>
        );
      return (
        <strong
          key={i}
          onMouseEnter={() => setTerm(part)}
          onMouseLeave={() => setTerm((t) => (t === part ? null : t))}
          className="cursor-help font-semibold text-fg transition-colors hover:text-accent"
        >
          {part}
        </strong>
      );
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <WarpArrival />
      <StoryAside term={term} />

      <div aria-hidden className="grid-overlay pointer-events-none absolute inset-0" />

      <div
        className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24 sm:py-32"
      >
        <Link
          href="/"
          onClick={goBack}
          className="inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-fg"
        >
          <ArrowLeft size={15} />
          back through the portal
        </Link>

        <p className="eyebrow mt-12 mb-4">{story.subtitle}</p>
        <h1 className="text-fg text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          {story.title}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          {emphasise(story.intro)}
        </p>

        <div className="mt-20 flex flex-col gap-16">
          {story.chapters.map((c, i) => (
            <section
              key={`${c.year}-${c.title}-${i}`}
              className="relative border-l border-border pl-8"
            >
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-sm border border-accent bg-bg" />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {c.year}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-fg sm:text-3xl">
                {c.title}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {c.body.map((p, j) => (
                  <p key={j} className="leading-relaxed text-muted">
                    {emphasise(p)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-24 border-t border-border pt-10 text-center font-mono text-sm text-dim">
          {story.closing}
        </p>

        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            onClick={goBack}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-3 font-mono text-sm text-fg hover:border-accent hover:text-accent"
          >
            <ArrowLeft size={15} />
            back through the portal
          </Link>
        </div>
      </div>

      {warping && <WarpOut />}
    </main>
  );
}
