import type { CSSProperties } from "react";
import { Route } from "lucide-react";
import { experience } from "@/data/resume";
import StarGate from "./StarGate";
import styles from "./Hero.module.css";

const W = 500;
const H = 254;

const roles = [...experience].reverse();
const stops = [...roles, null].map((job, i) => {
  const t = roles.length ? i / roles.length : 0;
  return {
    x: Math.round(40 + 405 * t),
    // Lifted off the bottom edge so the first stop's label chip fits below it.
    y: Math.round(190 - 140 * t - 20 * Math.sin(Math.PI * t)),
    year: job?.current ? "NOW" : job?.period.match(/\d{4}/)?.[0],
    label: job ? (i === 0 ? job.company : job.role.split(",")[0].replace(/\s+L\d.*$/, "")) : "next?",
    job,
  };
});

function segment(start: (typeof stops)[number], end: (typeof stops)[number]) {
  const rise = start.y - end.y;
  const turn = Math.round((start.x + end.x - rise) / 2);
  return `H${turn} L${turn + rise} ${end.y} H${end.x}`;
}

const startAt = (stop: (typeof stops)[number]) => `M${stop.x} ${stop.y}`;
const completed = startAt(stops[0]) + roles.slice(1).map((_, i) => segment(stops[i], stops[i + 1])).join(" ");
const current = stops[Math.max(0, roles.length - 1)];
const next = stops[stops.length - 1];

/** Hairlines stay one device pixel at any scale. */
const hair = { vectorEffect: "non-scaling-stroke" } as const;

/** A schematic freight yard. Roads, warehouses and the quay stay behind the
 *  route, whose stops and geometry come from the experience records. */
function Yard() {
  return (
    <g aria-hidden="true" fill="none">
      <defs>
        <pattern id="yard-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" stroke="var(--color-dim)" strokeOpacity=".12" {...hair} />
          <circle r=".9" fill="var(--color-dim)" opacity=".35" />
        </pattern>
        <pattern id="yard-water" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M-1 1l2-2M0 8l8-8M7 9l2-2" stroke="var(--color-dim)" strokeOpacity=".25" {...hair} />
        </pattern>
        <pattern id="yard-containers" width="21" height="13" patternUnits="userSpaceOnUse">
          <rect x="1" y="1" width="16" height="7" rx=".7" fill="var(--color-surface-2)" stroke="var(--color-dim)" {...hair} />
          <path d="M4 3v3m3-3v3m3-3v3m3-3v3" stroke="var(--color-dim)" {...hair} />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#yard-grid)" />
      <g stroke="var(--color-dim)" opacity=".34" {...hair}>
        <path d="M-12 74H75l51-51h121l28-29M-12 80H78l51-51h122l32-32M14 254v-76l49-49V88l28-28h91l38-37M20 254v-73l49-49V91l24-25h91l40-40" {...hair} />
        <path d="M113 254v-51l91-91h81l58-58h109l43-43M119 254v-49l87-87h81l58-58h110l42-42M183 249l56-56h73l48-48h77l71-71M187 253l55-55h73l48-48h77l70-70" {...hair} />
        <path d="M-5 7h72l22 22m42 172h41l40-40h45l15-15m-33-38 28-28h34l52-52m-31 158 25 25m-49-13 24 24" {...hair} />
      </g>
      <g fill="var(--color-surface-2)" fillOpacity=".55" stroke="var(--color-dim)" opacity=".5">
        <path d="M8 16h38v18H8zm0 24h38v11H8zm46-23h14v34H54zM141 36h31v9h-31zm0 13h43v8h-43zm63-44h34v10h-34z" {...hair} />
        <path d="M98 96l20-20 11 11-20 20zm17 18 21-21 9 9-21 21zm269-42h29v12h-29zm33 0h18v12h-18zM199 212h14v23h-14zm21-4h34v13h-34zm1 18h33v12h-33z" {...hair} />
      </g>
      <g opacity=".5">
        <rect x="332" y="15" width="83" height="26" fill="url(#yard-containers)" transform="rotate(-2 332 15)" />
        <rect x="15" y="105" width="42" height="39" fill="url(#yard-containers)" />
        <rect x="318" y="169" width="63" height="39" fill="url(#yard-containers)" transform="rotate(-43 318 169)" />
      </g>
      <path d="M270 262l43-43h39l31-31h48l23-23h22l31-31v128z" fill="url(#yard-water)" stroke="var(--color-dim)" strokeOpacity=".45" {...hair} />
      <g stroke="var(--color-dim)" opacity=".45">
        <path d="M302 237l25 25m-20-30 34 34m15-55 28 28m-23-33 28 28m22-40v25h-9v-25m27-7v25h-9v-25" {...hair} />
        <path d="m415 233 21-14 15-1-6 11-22 14-8-10z" fill="var(--color-surface-2)" {...hair} />
      </g>
      <path d="M8 19V8h11m462 0h11v11M8 235v11h11m462 0h11v-11" stroke="var(--color-accent)" strokeOpacity=".55" {...hair} />
    </g>
  );
}

/** HTML label chips over the map: crisp text at any size and real backdrop blur. */
function Labels() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {stops.map((stop, i) => {
        const future = !stop.job;
        const last = i === stops.length - 1;
        const below = !last && (i === 0 || i % 2 === 1);
        const anchor = i === 0 ? "start" : last ? "end" : "middle";
        const tx = anchor === "start" ? "-14px" : anchor === "end" ? "calc(-100% + 14px)" : "-50%";
        const style: CSSProperties = {
          left: `${(stop.x / W) * 100}%`,
          top: `${((stop.y + (below ? 15 : -15)) / H) * 100}%`,
          transform: `translate(${tx}, ${below ? "0" : "-100%"})`,
        };
        return (
          <div key={stop.job?.role ?? "next"} style={style} className={`${styles.chip} ${future ? styles.chipNext : ""}`}>
            {stop.year && (
              <span className={styles.chipYear} style={{ color: stop.job?.current ? "var(--color-ok)" : "var(--color-accent)" }}>
                {stop.job?.current && <i className={styles.chipLive} />}
                {stop.year}
              </span>
            )}
            <span className={styles.chipLabel}>{stop.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function CareerRoute() {
  return (
    <section className={`glass ${styles.routePanel}`} aria-labelledby="career-route-title">
      <div aria-hidden="true" className={styles.sheen} />
      <div className={styles.panelHeader}>
        <Route size={17} className="text-accent" aria-hidden="true" />
        <h2 id="career-route-title">Career route</h2>
        <span className={styles.panelMeta}>{roles.length} stops</span>
        <div className="ml-1 size-8 border-l border-border pl-1">
          <StarGate />
        </div>
      </div>
      <div className={styles.routeStage}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.routeMap} shapeRendering="geometricPrecision" role="img" aria-labelledby="route-map-title route-map-description">
          <title id="route-map-title">Career route</title>
          <desc id="route-map-description">
            {roles.map((job) => `${job.role}, ${job.company}, ${job.period}`).join(". ")}. Next?
          </desc>
          <defs>
            <linearGradient id="route-grad" gradientUnits="userSpaceOnUse" x1={stops[0].x} y1="0" x2={current.x} y2="0">
              <stop offset="0" stopColor="var(--color-accent)" stopOpacity=".55" />
              <stop offset="1" stopColor="var(--color-accent)" />
            </linearGradient>
            <radialGradient id="stop-gloss" cx=".35" cy=".3" r=".8">
              <stop offset="0" stopColor="#fff" stopOpacity=".55" />
              <stop offset=".45" stopColor="var(--color-surface)" stopOpacity=".9" />
              <stop offset="1" stopColor="var(--color-surface)" />
            </radialGradient>
            <filter id="route-glow" x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <Yard />
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={completed} stroke="var(--color-accent)" strokeWidth="7" opacity=".45" filter="url(#route-glow)" />
            <path d={completed} stroke="var(--color-bg)" strokeWidth="7" opacity=".7" />
            <path d={completed} stroke="url(#route-grad)" strokeWidth="3" />
            <path d={completed} stroke="#fff" strokeWidth="1.2" opacity=".75" className={styles.flow} />
            <path d={startAt(current) + segment(current, next)} stroke="var(--color-dim)" strokeWidth="1.8" strokeDasharray="4 5" />
          </g>
          {stops.map((stop) => {
            const future = !stop.job;
            const live = stop.job?.current;
            return (
              <g key={stop.job?.role ?? "next"}>
                {live && <circle cx={stop.x} cy={stop.y} r="9" fill="var(--color-ok)" className={styles.pulse} />}
                {!future && <circle cx={stop.x} cy={stop.y} r="11" fill={live ? "var(--color-ok)" : "var(--color-accent)"} opacity=".14" />}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={future ? 5.5 : 7}
                  fill={future ? "var(--color-surface)" : "url(#stop-gloss)"}
                  stroke={future ? "var(--color-dim)" : live ? "var(--color-ok)" : "var(--color-accent)"}
                  strokeWidth="2"
                  strokeDasharray={future ? "2 3" : undefined}
                />
                {!future && <circle cx={stop.x} cy={stop.y} r="2.6" fill={live ? "var(--color-ok)" : "var(--color-accent)"} />}
              </g>
            );
          })}
          {roles.length > 1 && (
            <g className={styles.truck} style={{ offsetPath: `path('${completed}')` }}>
              <circle r="9" fill="var(--color-accent)" opacity=".25" filter="url(#route-glow)" />
              <circle r="3.6" fill="#fff" stroke="var(--color-accent)" strokeWidth="2" />
            </g>
          )}
        </svg>
        <Labels />
      </div>
    </section>
  );
}
