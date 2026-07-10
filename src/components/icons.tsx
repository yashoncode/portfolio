// Brand icons — removed from lucide-react upstream, so inlined here.
// Paths from Simple Icons (CC0).

import {
  MAP_W,
  MAP_H,
  INDIA_PATH,
  TAMIL_NADU_PATH,
} from "./india-map-paths";

type IconProps = { size?: number; className?: string };

/**
 * India map from real census boundary data, rendered as a filled silhouette
 * with Tamil Nadu glowing steadily at the southern tip.
 */
export function IndiaMap({ className }: IconProps & { size?: number }) {
  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      width="96"
      height="107"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d={INDIA_PATH} fill="rgba(139, 92, 246, 0.22)" fillRule="nonzero" />
      <path
        d={TAMIL_NADU_PATH}
        fill="#22d3ee"
        fillRule="nonzero"
        style={{ filter: "drop-shadow(0 0 3.5px rgba(34, 211, 238, 0.9))" }}
      />
    </svg>
  );
}

/**
 * Logo mark: a blade "Y" — faceted metal chevrons meeting at a point, with a
 * detached shard for the stem. Brushed-steel left blade, dark right blade
 * with a neon cyan edge, and a glossy shine that sweeps across on a loop.
 */
export function YMark({ size = 28, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* One continuous brand gradient across all facets */}
        <linearGradient id="ymark-g" x1="3" y1="3" x2="29" y2="31" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        {/* Shine band */}
        <linearGradient id="ymark-shine" x1="0" y1="0" x2="10" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="ymark-body">
          <polygon points="3.5,3.5 10.5,5 16.2,14.5 13.6,20.6" />
          <polygon points="28.5,3 21.3,4.8 16.4,14.6 18.8,19.6" />
          <polygon points="15.8,22 19.6,20.6 18.8,29.6 15.4,31" />
        </clipPath>
      </defs>

      {/* Slight italic lean on the whole mark */}
      <g transform="translate(2.6 0) skewX(-9)">
        {/* Facets — one gradient, depth via subtle same-hue shading */}
        <polygon points="3.5,3.5 10.5,5 16.2,14.5 13.6,20.6" fill="url(#ymark-g)" />
        <polygon points="28.5,3 21.3,4.8 16.4,14.6 18.8,19.6" fill="url(#ymark-g)" />
        <polygon points="28.5,3 21.3,4.8 16.4,14.6 18.8,19.6" fill="#000000" opacity="0.22" />
        <polygon points="15.8,22 19.6,20.6 18.8,29.6 15.4,31" fill="url(#ymark-g)" />
        <polygon points="15.8,22 19.6,20.6 18.8,29.6 15.4,31" fill="#000000" opacity="0.12" />

        {/* Single edge highlight for the metal read */}
        <path d="M3.5 3.5 L10.5 5" stroke="#ffffff" strokeWidth="0.6" opacity="0.7" fill="none" />

        {/* Glossy sweep, clipped to the blades */}
        <g clipPath="url(#ymark-body)">
          <polygon
            className="animate-shine"
            points="0,0 7,0 -3,32 -10,32"
            fill="url(#ymark-shine)"
            opacity="0.7"
          />
        </g>
      </g>
    </svg>
  );
}

export function GithubIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
