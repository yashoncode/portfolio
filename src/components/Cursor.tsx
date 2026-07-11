"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: an instant dot plus a ring that trails with a lerp,
 * grows over interactive elements, and shrinks while pressing.
 * Desktop (fine pointer) only; skipped for touch and reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || reduce || !dot || !ring) return;

    document.documentElement.classList.add("custom-cursor");
    let x = -10, y = -10, rx = -10, ry = -10;
    let scale = 1, targetScale = 1;
    let hovering = false, down = false;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      dot.style.opacity = ring.style.opacity = "1";
    };
    const over = (e: MouseEvent) => {
      hovering = !!(e.target as Element).closest?.(
        "a, button, [role='button']"
      );
    };
    const downFn = () => { down = true; };
    const upFn = () => { down = false; };
    const leave = () => { dot.style.opacity = ring.style.opacity = "0"; };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", downFn);
    window.addEventListener("mouseup", upFn);
    document.documentElement.addEventListener("mouseleave", leave);

    let raf: number;
    const loop = () => {
      rx += (x - rx) * 0.06;
      ry += (y - ry) * 0.06;
      targetScale = down ? 0.2 : hovering ? 1.2 : 0.5;
      scale += (targetScale - scale) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", downFn);
      window.removeEventListener("mouseup", upFn);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
