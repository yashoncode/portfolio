import Link from "next/link";
import { ListChecks } from "lucide-react";
import { profile } from "@/data/resume";
import SpaceEgg from "@/components/SpaceEgg";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-dim md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="flex items-center gap-2 font-mono tracking-wider">
          Built with Next.js · Tailwind · Motion · <SpaceEgg /> ·{" "}
          {/* Unlabelled on purpose — the page behind it isn't indexed and isn't
              advertised. Findable by anyone curious enough to hover. */}
          <Link
            href="/achievements"
            aria-label="A list of things. Nothing to see here."
            className="inline-flex text-dim transition-all duration-300 hover:scale-125 hover:text-cyan"
          >
            <ListChecks size={13} />
          </Link>
        </p>
      </div>
    </footer>
  );
}
