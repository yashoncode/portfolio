"use client";

import { useEffect, useRef } from "react";

/**
 * Galaxy background: a fixed full-viewport canvas of drifting, twinkling
 * stars in the site's palette, with occasional shooting stars. On fine
 * pointers, stars near the cursor glow brighter and get gently pushed
 * aside, springing back when it leaves. Static render for reduced motion.
 */
type Star = {
  x: number;
  y: number;
  r: number;
  base: number; // base alpha
  phase: number; // twinkle phase
  speed: number; // twinkle speed
  vx: number;
  vy: number;
  ox: number; // current hover displacement
  oy: number;
  color: string;
};

type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

const COLORS = ["255, 255, 255", "196, 181, 253", "165, 243, 252"]; // white / violet / cyan
const HOVER_RADIUS = 130;

export default function Galaxy() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let mx = -9999;
    let my = -9999;

    const makeStar = (): Star => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.4 + Math.random() * 1.1,
      base: 0.25 + Math.random() * 0.65,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.2,
      vx: -0.02 - Math.random() * 0.05,
      vy: 0.01 + Math.random() * 0.03,
      ox: 0,
      oy: 0,
      color: COLORS[(Math.random() * COLORS.length) | 0],
    });

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // ~1 star per 6500px², capped — small screens get few stars for free
      stars = Array.from(
        { length: Math.min(Math.floor((w * h) / 6500), 240) },
        makeStar
      );
      if (reduce) draw(0); // static frame
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        // drift, wrapping at edges
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -2) s.x = w + 2;
        if (s.y > h + 2) s.y = -2;

        // hover: push away + brighten, easing back to rest
        let boost = 0;
        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.hypot(dx, dy);
        let tx = 0;
        let ty = 0;
        if (dist < HOVER_RADIUS && dist > 0) {
          const f = (HOVER_RADIUS - dist) / HOVER_RADIUS;
          tx = (dx / dist) * f * 24;
          ty = (dy / dist) * f * 24;
          boost = f;
        }
        s.ox += (tx - s.ox) * 0.1;
        s.oy += (ty - s.oy) * 0.1;

        const twinkle = 0.65 + 0.35 * Math.sin(t * 0.001 * s.speed + s.phase);
        const alpha = Math.min(s.base * twinkle + boost * 0.6, 1);
        const r = s.r * (1 + boost * 0.8);

        ctx.beginPath();
        ctx.arc(s.x + s.ox, s.y + s.oy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${alpha})`;
        ctx.fill();
        if (boost > 0.05) {
          // soft glow near the cursor
          ctx.beginPath();
          ctx.arc(s.x + s.ox, s.y + s.oy, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color}, ${boost * 0.12})`;
          ctx.fill();
        }
      }

      // shooting stars: rare, fast, with a fading trail
      if (!reduce && Math.random() < 0.003 && meteors.length < 2) {
        meteors.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.4,
          vx: 6 + Math.random() * 5,
          vy: 3 + Math.random() * 2,
          life: 1,
        });
      }
      meteors = meteors.filter((m) => m.life > 0);
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.016;
        const grad = ctx.createLinearGradient(
          m.x - m.vx * 8,
          m.y - m.vy * 8,
          m.x,
          m.y
        );
        grad.addColorStop(0, "rgba(165, 243, 252, 0)");
        grad.addColorStop(1, `rgba(255, 255, 255, ${m.life * 0.9})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x - m.vx * 8, m.y - m.vy * 8);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      }
    };

    // easter egg #04 fires this from the footer
    const shower = () => {
      for (let i = 0; i < 12; i++) {
        meteors.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.5,
          vx: 5 + Math.random() * 6,
          vy: 2.5 + Math.random() * 2.5,
          life: 0.8 + Math.random() * 0.7,
        });
      }
    };

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const leave = () => {
      mx = my = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("meteor-shower", shower);
    if (fine && !reduce) {
      window.addEventListener("mousemove", move, { passive: true });
      document.documentElement.addEventListener("mouseleave", leave);
    }

    let raf = 0;
    if (!reduce) {
      const loop = (t: number) => {
        draw(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("meteor-shower", shower);
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="fixed inset-0 -z-10" />;
}
