import { Route } from "lucide-react";
import { experience } from "@/data/resume";
import StarGate from "./StarGate";
import styles from "./Hero.module.css";

const roles = [...experience].reverse();
const stops = [...roles, null].map((job, i) => {
  const t = roles.length ? i / roles.length : 0;
  return {
    x: Math.round(40 + 405 * t),
    y: Math.round(201 - 148 * t - 20 * Math.sin(Math.PI * t)),
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

/** A schematic freight yard. Roads, warehouses and the quay stay behind the
 *  route, whose stops and geometry come from the experience records. */
function Yard() {
  return (
    <g aria-hidden="true" fill="none">
      <defs>
        <pattern id="yard-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" stroke="var(--color-dim)" strokeOpacity=".13" />
          <circle r="1" fill="var(--color-dim)" opacity=".32" />
        </pattern>
        <pattern id="yard-water" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M-1 1l2-2M0 8l8-8M7 9l2-2" stroke="var(--color-dim)" strokeOpacity=".23" strokeWidth=".6" />
        </pattern>
        <pattern id="yard-containers" width="21" height="13" patternUnits="userSpaceOnUse">
          <rect x="1" y="1" width="16" height="7" rx=".7" fill="var(--color-surface-2)" stroke="var(--color-dim)" strokeWidth=".7" />
          <path d="M4 3v3m3-3v3m3-3v3m3-3v3" stroke="var(--color-dim)" strokeWidth=".55" />
        </pattern>
      </defs>
      <rect width="500" height="254" fill="url(#yard-grid)" />
      <g stroke="var(--color-dim)" strokeWidth="1" opacity=".28">
        <path d="M-12 74H75l51-51h121l28-29M-12 80H78l51-51h122l32-32M14 254v-76l49-49V88l28-28h91l38-37M20 254v-73l49-49V91l24-25h91l40-40" />
        <path d="M113 254v-51l91-91h81l58-58h109l43-43M119 254v-49l87-87h81l58-58h110l42-42M183 249l56-56h73l48-48h77l71-71M187 253l55-55h73l48-48h77l70-70" />
        <path d="M-5 7h72l22 22m42 172h41l40-40h45l15-15m-33-38 28-28h34l52-52m-31 158 25 25m-49-13 24 24" />
      </g>
      <g fill="var(--color-surface-2)" stroke="var(--color-dim)" strokeWidth=".8" opacity=".42">
        <path d="M8 16h38v18H8zm0 24h38v11H8zm46-23h14v34H54zM141 36h31v9h-31zm0 13h43v8h-43zm63-44h34v10h-34z" />
        <path d="M98 96l20-20 11 11-20 20zm17 18 21-21 9 9-21 21zm269-42h29v12h-29zm33 0h18v12h-18zM199 212h14v23h-14zm21-4h34v13h-34zm1 18h33v12h-33z" />
      </g>
      <g opacity=".46">
        <rect x="332" y="15" width="83" height="26" fill="url(#yard-containers)" transform="rotate(-2 332 15)" />
        <rect x="15" y="105" width="42" height="39" fill="url(#yard-containers)" />
        <rect x="318" y="169" width="63" height="39" fill="url(#yard-containers)" transform="rotate(-43 318 169)" />
      </g>
      <path d="M270 262l43-43h39l31-31h48l23-23h22l31-31v128z" fill="url(#yard-water)" stroke="var(--color-dim)" strokeOpacity=".45" />
      <g stroke="var(--color-dim)" strokeWidth="1.2" opacity=".4">
        <path d="M302 237l25 25m-20-30 34 34m15-55 28 28m-23-33 28 28m22-40v25h-9v-25m27-7v25h-9v-25" />
        <path d="m415 233 21-14 15-1-6 11-22 14-8-10z" fill="var(--color-surface-2)" />
      </g>
      <path d="M8 19V8h11m462 0h11v11M8 235v11h11m462 0h11v-11" stroke="var(--color-dim)" strokeOpacity=".7" />
    </g>
  );
}

export default function CareerRoute() {
  return (
    <section className={styles.panel} aria-labelledby="career-route-title">
      <div className={styles.panelHeader}>
        <Route size={17} className="text-accent" aria-hidden="true" />
        <h2 id="career-route-title">Career route</h2>
        <span className={styles.panelMeta}>{roles.length} stops</span>
        <div className="ml-1 size-8 border-l border-border pl-1">
          <StarGate />
        </div>
      </div>
      <svg viewBox="0 0 500 254" className={styles.routeMap} role="img" aria-labelledby="route-map-title route-map-description">
        <title id="route-map-title">Career route</title>
        <desc id="route-map-description">
          {roles.map((job) => `${job.role}, ${job.company}, ${job.period}`).join(". ")}. Next?
        </desc>
        <Yard />
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={completed} stroke="var(--color-bg)" strokeWidth="8" />
          <path d={completed} stroke="var(--color-accent)" strokeWidth="2.8" />
          <path d={startAt(current) + segment(current, next)} stroke="var(--color-dim)" strokeWidth="1.8" strokeDasharray="4 5" />
        </g>
        {stops.map((stop, i) => {
          const future = !stop.job;
          const last = i === stops.length - 1;
          const below = !last && (i === 0 || i % 2 === 1);
          const anchor = i === 0 ? "start" : last ? "end" : "middle";
          const labelY = stop.y + (below ? 32 : -15);
          return (
            <g key={stop.job?.role ?? "next"}>
              {stop.job?.current && <circle cx={stop.x} cy={stop.y} r="12" fill="var(--color-ok)" opacity=".17" />}
              <circle cx={stop.x} cy={stop.y} r={future ? 5.5 : 6.5} fill="var(--color-surface)" stroke={future ? "var(--color-dim)" : "var(--color-accent)"} strokeWidth="2" strokeDasharray={future ? "2 3" : undefined} />
              {!future && <circle cx={stop.x} cy={stop.y} r="2.8" fill={stop.job?.current ? "var(--color-ok)" : "var(--color-accent)"} />}
              <g textAnchor={anchor} className={styles.mapLabels}>
                {stop.year && <text x={stop.x} y={labelY - 15} fill={stop.job?.current ? "var(--color-ok)" : "var(--color-accent)"} className={styles.mapYear}>{stop.year}</text>}
                <text x={stop.x} y={labelY} fill={future ? "var(--color-muted)" : "var(--color-fg)"} className={future ? styles.mapNext : styles.mapRole}>{stop.label}</text>
              </g>
            </g>
          );
        })}
        {roles.length > 1 && (
          <g className={styles.truck} style={{ offsetPath: `path('${completed}')` }}>
            <circle r="7" fill="var(--color-accent)" opacity=".28" />
            <circle r="3.5" fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="1" />
          </g>
        )}
      </svg>
    </section>
  );
}
