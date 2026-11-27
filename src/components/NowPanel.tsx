import type { CSSProperties } from "react";
import { workflows } from "@/data/resume";
import StarGate from "./StarGate";
import styles from "./Hero.module.css";

/** Timing lives in CSS: --w picks the workflow's slot in the cycle, --s the step's offset in it. */
const vars = (w: number, s = 0) => ({ "--w": w, "--s": s }) as CSSProperties;

export default function NowPanel() {
  return (
    <section className={`glass ${styles.nowPanel}`} aria-label="Workflows I run">
      <header className={styles.panelHeader}>
        <div className="min-w-0">
          <h2 className={styles.panelLabel}><i className={styles.liveDot} aria-hidden="true" />Running in production</h2>
          <div className={styles.frames} aria-hidden="true">
            {workflows.map(({ name }, w) => (
              <span key={name} style={vars(w)} className={`${styles.frame} ${styles.workflowName}`}>{name}</span>
            ))}
          </div>
        </div>
        <div className="ml-auto size-8 border-l border-border pl-1">
          <StarGate />
        </div>
      </header>
      <div className={`${styles.frames} ${styles.pipeline}`} aria-hidden="true">
        {workflows.map(({ name, steps }, w) => (
          <ol key={name} style={vars(w)} className={styles.frame}>
            {steps.map((step, s) => <li key={step} style={vars(w, s)} className={styles.step}>{step}</li>)}
          </ol>
        ))}
      </div>
      <ul className="sr-only">
        {workflows.map(({ name, steps }) => (
          <li key={name}>
            {name}: {steps.join(", then ")}
          </li>
        ))}
      </ul>
    </section>
  );
}
