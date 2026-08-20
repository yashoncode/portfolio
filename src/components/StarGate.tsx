"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { WarpOut, WARP_MS, armWarp } from "@/components/Warp";

/** Moons: small lit spheres on their own slow, mismatched orbits. */
const MOONS = [
  { r: 88, size: 2.4, dur: "38s", rev: false, tilt: 0, tint: "#e9d5ff" },
  { r: 72, size: 1.5, dur: "53s", rev: true, tilt: 34, tint: "#a5f3fc" },
  { r: 96, size: 1.9, dur: "67s", rev: true, tilt: 71, tint: "#c7d2fe" },
  { r: 58, size: 1.2, dur: "29s", rev: false, tilt: 112, tint: "#ddd6fe" },
];

/** Local wall-clock as HHMM, 24h — the PIN. */
const stamp = (d: Date) =>
  `${d.getHours()}`.padStart(2, "0") + `${d.getMinutes()}`.padStart(2, "0");

/**
 * The hero star, and the door behind it. Three clicks open a keypad; the PIN
 * is the current time in 24h HHMM. Correct → the screen flashes and a portal
 * swallows the page on the way to /origin.
 */
export default function StarGate() {
  const router = useRouter();
  const [clicks, setClicks] = useState(0);
  const [asking, setAsking] = useState(false);
  const [pin, setPin] = useState("");
  const [wrong, setWrong] = useState(false);
  const [warping, setWarping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (asking) inputRef.current?.focus();
  }, [asking]);

  // Idle hands reset the count, so a stray click months apart never stacks.
  useEffect(() => {
    if (!clicks) return;
    const t = setTimeout(() => setClicks(0), 2500);
    return () => clearTimeout(t);
  }, [clicks]);

  function onStarClick() {
    if (clicks < 2) return setClicks((c) => c + 1);
    setClicks(0);
    setAsking(true);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const now = new Date();
    // Accept the previous minute too — typing four digits can cross a tick.
    const ok = [now, new Date(now.getTime() - 60_000)].some(
      (d) => pin === stamp(d)
    );
    if (!ok) {
      setWrong(true);
      setPin("");
      return;
    }
    setAsking(false);
    setWarping(true);
    armWarp();
    setTimeout(() => router.push("/origin"), WARP_MS);
  }

  return (
    <>
      <div className="animate-drift group/sigil pointer-events-none absolute right-[7%] top-[22%] hidden h-56 w-56 lg:block xl:h-72 xl:w-72">
        <button
          type="button"
          onClick={onStarClick}
          aria-label="A star. Some doors need knocking on."
          className="pointer-events-auto h-full w-full cursor-pointer"
        >
          <svg
            viewBox="0 0 200 200"
            className="h-full w-full overflow-visible opacity-90 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/sigil:scale-105 group-hover/sigil:opacity-100"
          >
            <defs>
              <radialGradient id="sigil-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="40%" stopColor="#ddd6fe" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.55" />
              </radialGradient>
              <radialGradient id="sigil-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#8b5cf6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
              {/* Real light doesn't have hard edges — the rays get blurred, the
                  pinpoint core stays sharp so it still reads as a star. */}
              <filter id="sigil-soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.2" />
              </filter>
              <filter id="moon-soft" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="0.6" />
              </filter>
            </defs>

            {/* diffuse halo bloom */}
            <circle cx="100" cy="100" r="86" fill="url(#sigil-halo)" opacity="0.5" />

            {/* Core: blurred 8-ray burst with a sharp hot centre */}
            <g className="animate-spin [animation-duration:180s] origin-center">
              <g filter="url(#sigil-soft)">
                <path
                  d="M100 30 L103 97 L170 100 L103 103 L100 170 L97 103 L30 100 L97 97 Z"
                  fill="url(#sigil-core)"
                  opacity="0.95"
                />
                <g transform="rotate(45 100 100) translate(45 45) scale(0.55)">
                  <path
                    d="M100 30 L103 97 L170 100 L103 103 L100 170 L97 103 L30 100 L97 97 Z"
                    fill="#c4b5fd"
                    opacity="0.5"
                  />
                </g>
              </g>
              <circle cx="100" cy="100" r="18" fill="url(#sigil-core)" opacity="0.3" filter="url(#sigil-soft)" />
              <circle cx="100" cy="100" r="4.5" fill="#fff" opacity="0.95" />
            </g>

            {MOONS.map((m) => (
              <g key={m.dur} transform={`rotate(${m.tilt} 100 100)`}>
                <g
                  className={`animate-spin origin-center ${m.rev ? "[animation-direction:reverse]" : ""}`}
                  style={{ animationDuration: m.dur }}
                >
                  <g filter="url(#moon-soft)">
                    <circle cx={100 + m.r} cy="100" r={m.size} fill={m.tint} opacity="0.9" />
                    {/* offset shadow disc carves the crescent */}
                    <circle
                      cx={100 + m.r + m.size * 0.7}
                      cy={100 - m.size * 0.4}
                      r={m.size * 0.85}
                      fill="#0b0714"
                      opacity="0.55"
                    />
                  </g>
                </g>
              </g>
            ))}
          </svg>
        </button>
      </div>

      {/* Keypad */}
      <AnimatePresence>
        {asking && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAsking(false)}
          >
            <motion.form
              onSubmit={submit}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-keep w-[min(24rem,calc(100vw-2rem))] rounded-2xl p-8 text-center shadow-2xl shadow-black/50"
            >
              <p className="eyebrow mb-3">🔒 sealed · 4 digits</p>
              <p className="text-sm leading-relaxed text-muted">
                The star only opens for someone who knows what time it is.
              </p>
              <motion.input
                ref={inputRef}
                value={pin}
                onChange={(e) => {
                  setWrong(false);
                  setPin(e.target.value.replace(/\D/g, "").slice(0, 4));
                }}
                inputMode="numeric"
                autoComplete="off"
                placeholder="••••"
                aria-label="4 digit pin"
                animate={wrong ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className={`mt-6 w-full rounded-xl border bg-black/30 px-4 py-3 text-center font-mono text-3xl tracking-[0.5em] text-fg outline-none transition-colors ${
                  wrong ? "border-red-500/60" : "border-border focus:border-violet/60"
                }`}
              />
              <p className="mt-3 h-4 font-mono text-[11px] text-dim">
                {wrong ? "not the hour. try again." : ""}
              </p>
              <button
                type="submit"
                className="accent-gradient mt-5 w-full rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
              >
                Open
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {warping && <WarpOut />}
    </>
  );
}
