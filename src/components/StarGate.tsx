"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { armWarp, WarpOut } from "./Warp";

const stamp = (d: Date) =>
  String(d.getHours()).padStart(2, "0") + String(d.getMinutes()).padStart(2, "0");

export default function StarGate() {
  const router = useRouter();
  const [clicks, setClicks] = useState(0);
  const [pin, setPin] = useState("");
  const [wrong, setWrong] = useState(false);
  const [warping, setWarping] = useState(false);
  const keypad = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!clicks) return;
    const reset = setTimeout(() => setClicks(0), 2500);
    return () => clearTimeout(reset);
  }, [clicks]);

  function onStarClick() {
    if (clicks < 2) return setClicks(clicks + 1);
    setClicks(0);
    setPin("");
    setWrong(false);
    keypad.current?.showModal();
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const now = new Date();
    if (![now, new Date(now.getTime() - 60_000)].some((date) => pin === stamp(date))) {
      setWrong(true);
      setPin("");
      return;
    }
    keypad.current?.close();
    setWarping(true);
    setTimeout(() => router.push("/origin"), armWarp());
  }

  return (
    <>
      <div className="group/sigil relative h-full w-full">
        <button type="button" onClick={onStarClick} aria-label="A star. Some doors need knocking on."
          className="h-full w-full cursor-pointer rounded-full text-accent transition-colors hover:text-fg">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-full w-full">
            <circle cx="24" cy="24" r="19" stroke="currentColor" opacity=".35" strokeDasharray="1 3" />
            <path d="m24 4 3.1 15.6L34 14l-4.5 7.5L44 24l-15.5 3 5.5 7-8-5-2 15-3-15-7 5 5-7L4 24l15.5-2.8-5.5-7.2 7.5 5.5Z" fill="currentColor" />
            <circle cx="24" cy="24" r="2" fill="var(--color-surface)" />
          </svg>
        </button>
      </div>
      <dialog ref={keypad} aria-labelledby="gate-title" className="stat-modal w-[min(24rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface p-0 shadow-2xl"
        onClick={(event) => { if (event.target === event.currentTarget) keypad.current?.close(); }}>
        <form onSubmit={submit} className="p-8 text-center">
          <p id="gate-title" className="eyebrow mb-3">🔒 sealed · 4 digits</p>
          <p className="text-sm leading-relaxed text-muted">The star only opens for someone who knows what time it is.</p>
          <input value={pin} autoFocus aria-label="4 digit pin" aria-invalid={wrong}
            onChange={(e) => { setWrong(false); setPin(e.target.value.replace(/\D/g, "").slice(0, 4)); }}
            inputMode="numeric" autoComplete="off" placeholder="••••"
            className="mt-6 w-full rounded border border-border bg-bg px-4 py-3 text-center font-mono text-3xl tracking-[0.5em] text-fg focus:border-accent" />
          <p className="mt-3 h-4 font-mono text-xs text-muted" role="status">{wrong ? "not the hour. try again." : ""}</p>
          <button type="submit" className="mt-4 w-full rounded-md border border-accent py-2.5 font-mono text-sm text-accent hover:bg-accent/10">Open</button>
        </form>
      </dialog>
      {warping && <WarpOut />}
    </>
  );
}
