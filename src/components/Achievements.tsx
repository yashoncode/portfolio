import Link from "next/link";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { achievementGroups, achievementCount } from "@/data/achievements";

/**
 * The hidden checklist behind the footer icon. Read before an interview, so
 * the whole thing has to be scannable in one pass with the detail one click
 * away, never in the way.
 *
 * Deliberately a server component: <details> already does disclosure natively,
 * so there is nothing here worth shipping JavaScript for.
 */
export default function Achievements() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-overlay absolute inset-0" />
        <div className="absolute -top-40 right-1/4 h-[26rem] w-[26rem] rounded-full bg-cyan/15 blur-[140px] sm:animate-aurora" />
        <div className="absolute bottom-0 left-1/4 h-[22rem] w-[22rem] rounded-full bg-violet/15 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-fg"
        >
          <ArrowLeft size={15} />
          back to the portfolio
        </Link>

        <p className="eyebrow mt-12 mb-4">the receipts · {achievementCount} of them</p>
        <h1 className="text-gradient text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          What I&apos;ve actually done
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Every line is a claim I can defend under follow-up questions. Open one
          and the detail underneath is the mechanism, not the same sentence in
          new words.
        </p>

        <div className="mt-16 flex flex-col gap-14">
          {achievementGroups.map((group) => (
            <section key={group.label}>
              <div className="border-b border-border pb-4">
                <h2 className="text-xl font-bold text-fg sm:text-2xl">
                  {group.label}
                </h2>
                <p className="mt-1.5 font-mono text-xs leading-relaxed text-dim">
                  {group.probe}
                </p>
              </div>

              <ul className="mt-2 flex flex-col">
                {group.items.map((item) => (
                  <li key={item.claim} className="border-b border-border/60">
                    <details className="ach group">
                      <summary className="flex cursor-pointer list-none items-start gap-3 py-4 transition-colors hover:bg-white/[0.02]">
                        <Check
                          size={15}
                          strokeWidth={3}
                          aria-hidden
                          className="mt-0.5 shrink-0 text-cyan"
                        />
                        <span className="flex-1 font-medium leading-snug text-fg">
                          {item.claim}
                        </span>
                        {item.metric && (
                          <span className="mt-px shrink-0 rounded-full border border-violet/30 bg-violet/10 px-2.5 py-0.5 font-mono text-[0.68rem] tracking-wide text-violet">
                            {item.metric}
                          </span>
                        )}
                        <ChevronRight
                          size={15}
                          aria-hidden
                          className="ach-chevron mt-0.5 shrink-0 text-dim"
                        />
                      </summary>

                      <ul className="flex flex-col gap-3 pb-5 pl-[1.65rem] pr-1">
                        {item.proof.map((line) => (
                          <li
                            key={line}
                            className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-dim"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-20 flex justify-center border-t border-border pt-12">
          <Link
            href="/"
            className="accent-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
          >
            <ArrowLeft size={15} />
            back to the portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
