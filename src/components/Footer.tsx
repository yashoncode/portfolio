import Link from "next/link";
import { ListChecks } from "lucide-react";
import { profile } from "@/data/resume";
import SpaceEgg from "@/components/SpaceEgg";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-muted sm:px-6 md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="relative flex max-w-full flex-wrap items-center gap-x-1.5 font-mono">
          Built with Next.js · Tailwind · Motion · <SpaceEgg /> ·{" "}
          {/* Unlabelled on purpose — the page behind it isn't indexed and isn't
              advertised. Findable by anyone curious enough to hover. */}
          <Link
            href="/achievements"
            aria-label="A list of things. Nothing to see here."
            className="inline-flex size-6 items-center justify-center text-muted transition-colors hover:text-accent"
          >
            <ListChecks size={13} />
          </Link>
        </p>
      </div>
    </footer>
  );
}
