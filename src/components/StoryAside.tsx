"use client";

import { AnimatePresence, motion } from "motion/react";
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
const GLYPHS: Array<[key: string, Icon: LucideIcon, tint: string]> = [
  ["double promoted", ChevronsUp, "#a78bfa"],
  ["sslc", Award, "#fbbf24"],
  ["school first", Trophy, "#fbbf24"],
  ["medals", Medal, "#fbbf24"],
  ["district level", Medal, "#fbbf24"],
  ["visual studio", Calculator, "#22d3ee"],
  ["calculator", Calculator, "#22d3ee"],
  ["school pupil leader", Mic, "#a78bfa"],
  ["2018 to 2019", Mic, "#a78bfa"],
  ["aerospace", Rocket, "#22d3ee"],
  ["ece", CircuitBoard, "#22d3ee"],
  ["sairam engineering", School, "#a78bfa"],
  ["department topper", Trophy, "#fbbf24"],
  ["hydroponics", Sprout, "#34d399"],
  ["dtmf", Bot, "#22d3ee"],
  ["ieee", FileText, "#a78bfa"],
  ["pond water", Droplets, "#22d3ee"],
  ["ciba", Fish, "#22d3ee"],
  ["online courses", BookOpen, "#a78bfa"],
  ["crypto", Bitcoin, "#fbbf24"],
  ["custom rom", Smartphone, "#34d399"],
  ["registered a startup", Rocket, "#a78bfa"],
  ["aiirf", Building2, "#a78bfa"],
  ["sairam incubation", Lightbulb, "#fbbf24"],
  ["rfid", Nfc, "#22d3ee"],
  ["workshops", Presentation, "#34d399"],
  ["outstanding student", Medal, "#fbbf24"],
  ["cgpa", GraduationCap, "#34d399"],
  ["prodapt", Briefcase, "#22d3ee"],
  ["educational loans", Banknote, "#fbbf24"],
  ["merit scholarship", GraduationCap, "#34d399"],
  ["data entry", Keyboard, "#22d3ee"],
  ["inspection lab", FlaskConical, "#34d399"],
  ["first salary", Banknote, "#fbbf24"],
  ["five school students", Users, "#a78bfa"],
  ["bike accident", Bike, "#f87171"],
  ["cab", CarTaxiFront, "#fbbf24"],
  ["stockarea", Boxes, "#22d3ee"],
  ["12 august", CalendarDays, "#a78bfa"],
  ["solutions architect", DraftingCompass, "#a78bfa"],
  ["logistics", Truck, "#22d3ee"],
  ["apps script", FileSpreadsheet, "#34d399"],
  ["laravel", Server, "#f87171"],
  ["react and next", Layers, "#22d3ee"],
  ["full stack", Layers, "#a78bfa"],
  ["remote", Laptop, "#34d399"],
  ["december 2024", MapPinned, "#22d3ee"],
  ["agents", Network, "#a78bfa"],
  ["open source", Code, "#34d399"],
  // "ai" is a loose substring, so it stays last: everything it would wrongly
  // swallow ("sairam", "aiirf") is matched further up the list.
  ["ai", Brain, "#a78bfa"],
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
  const hit = term ? glyphFor(term) : undefined;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden lg:block"
    >
      <AnimatePresence>
        {hit && (
          <motion.div
            key={hit[0]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {(["left", "right"] as const).map((side) => (
              <div
                key={side}
                className="absolute top-0 h-full w-[calc(50%-25rem)]"
                style={{ [side]: 0 }}
              >
                <div
                  className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
                  style={{ background: hit[2], opacity: 0.14 }}
                />
                {DRIFT.map((d, i) => {
                  const Icon = hit[1];
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: d.top,
                        [side]: d.off,
                        color: hit[2],
                      }}
                      initial={{ opacity: 0, y: 26, scale: 0.6, rotate: -8 }}
                      animate={{
                        opacity: [0, 0.75, 0.45],
                        y: [26, -14, -34],
                        scale: 1,
                        rotate: side === "left" ? 8 : -8,
                      }}
                      transition={{
                        duration: 3.6,
                        delay: d.delay + (side === "right" ? 0.12 : 0),
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    >
                      <Icon size={d.size} strokeWidth={1.25} />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
