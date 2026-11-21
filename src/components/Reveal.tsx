import type { CSSProperties, ReactNode } from "react";
import styles from "./sections.module.css";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  return (
    <div
      className={`${styles.reveal} ${className}`}
      style={{ "--entry-offset": `${delay * 100}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
