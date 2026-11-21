"use client";

import { useEffect, useRef } from "react";

/** The footer planet calls a meteor shower across the board. */
export default function Galaxy() {
  const sky = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function shower() {
      const layer = sky.current;
      if (!layer || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      layer.replaceChildren();
      for (let i = 0; i < 12; i++) {
        const meteor = document.createElement("span");
        meteor.className = "meteor";
        meteor.style.left = `${Math.random() * 90}%`;
        meteor.style.top = `${Math.random() * 60}%`;
        meteor.style.animationDelay = `${Math.random() * 800}ms`;
        meteor.addEventListener("animationend", () => meteor.remove(), { once: true });
        layer.appendChild(meteor);
      }
    }
    window.addEventListener("meteor-shower", shower);
    return () => window.removeEventListener("meteor-shower", shower);
  }, []);
  return <div ref={sky} aria-hidden className="pointer-events-none fixed inset-0 z-[55] overflow-hidden" />;
}
