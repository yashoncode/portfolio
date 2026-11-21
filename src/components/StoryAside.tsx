"use client";

import type { CSSProperties } from "react";
import styles from "./sections.module.css";
import {
  Award,
  Bitcoin,
  Bot,
  BookOpen,
  Banknote,
  Bike,
  Brain,
  Boxes,
  Briefcase,
  Building2,
  Calculator,
  Code,
  CalendarDays,
  CarTaxiFront,
  ChevronsUp,
  CircuitBoard,
  DraftingCompass,
  Droplets,
  FileText,
  FileSpreadsheet,
  FlaskConical,
  Fish,
  GraduationCap,
  Keyboard,
  Laptop,
  Layers,
  MapPinned,
  Lightbulb,
  Medal,
  Mic,
  Network,
  Nfc,
  Presentation,
  Rocket,
  School,
  Server,
  Smartphone,
  Sprout,
  Truck,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Highlighted term to the thing that drifts through the gutters while you hover
 * it. Matched as a lowercase substring, first hit wins, so specific keys stay
 * above loose ones ("sairam incubation" before "sairam").
 */
const GLYPHS: Array<[key: string, Icon: LucideIcon]> = [
  ["double promoted", ChevronsUp],
  ["sslc", Award],
  ["school first", Trophy],
  ["medals", Medal],
  ["district level", Medal],
  ["visual studio", Calculator],
  ["calculator", Calculator],
  ["school pupil leader", Mic],
  ["2018 to 2019", Mic],
  ["aerospace", Rocket],
  ["ece", CircuitBoard],
  ["sairam engineering", School],
  ["department topper", Trophy],
  ["hydroponics", Sprout],
  ["dtmf", Bot],
  ["ieee", FileText],
  ["pond water", Droplets],
  ["ciba", Fish],
  ["online courses", BookOpen],
  ["crypto", Bitcoin],
  ["custom rom", Smartphone],
  ["registered a startup", Rocket],
  ["aiirf", Building2],
  ["sairam incubation", Lightbulb],
  ["rfid", Nfc],
  ["workshops", Presentation],
  ["outstanding student", Medal],
  ["cgpa", GraduationCap],
  ["prodapt", Briefcase],
  ["educational loans", Banknote],
  ["merit scholarship", GraduationCap],
  ["data entry", Keyboard],
  ["inspection lab", FlaskConical],
  ["first salary", Banknote],
  ["five school students", Users],
  ["bike accident", Bike],
  ["cab", CarTaxiFront],
  ["stockarea", Boxes],
  ["12 august", CalendarDays],
  ["solutions architect", DraftingCompass],
  ["logistics", Truck],
  ["apps script", FileSpreadsheet],
  ["laravel", Server],
  ["react and next", Layers],
  ["full stack", Layers],
  ["remote", Laptop],
  ["december 2024", MapPinned],
  ["agents", Network],
  ["open source", Code],
  // "ai" is a loose substring, so it stays last: everything it would wrongly
  // swallow ("sairam", "aiirf") is matched further up the list.
  ["ai", Brain],
];

/** Does this term have anything to show? Used to decide if it is hoverable. */
export function hasGlyph(term: string) {
  const t = term.toLowerCase();
  return GLYPHS.some(([key]) => t.includes(key));
}

function glyphFor(term: string) {
  const t = term.toLowerCase();
  return GLYPHS.find(([key]) => t.includes(key));
}

/** Fixed scatter, so the server and the client agree on where things sit. */
const DRIFT = [
  { top: "16%", off: "22%", size: 30, delay: 0 },
  { top: "34%", off: "58%", size: 20, delay: 0.09 },
  { top: "52%", off: "12%", size: 42, delay: 0.18 },
  { top: "68%", off: "46%", size: 24, delay: 0.27 },
  { top: "84%", off: "28%", size: 34, delay: 0.36 },
];

/**
 * The gutters either side of the story. Empty until a highlighted term is
 * hovered, then whatever that term is about floats up through them.
 */
export default function StoryAside({ term }: { term: string | null }) {
  const glyph = term ? glyphFor(term) : undefined;
  if (!glyph) return null;
  const [key, Icon] = glyph;

  return (
    <div
      key={key}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden text-accent lg:block"
    >
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className="absolute top-0 h-full w-[calc(50%-25rem)]"
          style={{ [side]: 0 }}
        >
          {DRIFT.map(({ top, off, size, delay }) => (
            <span
              key={top}
              className={styles.glyph}
              style={{
                top,
                [side]: off,
                "--glyph-delay": `${delay + (side === "right" ? 0.12 : 0)}s`,
              } as CSSProperties}
            >
              <Icon size={size} strokeWidth={1.25} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
