import { GithubIcon } from "./icons";
import { profile } from "@/data/resume";

/** Read GitHub's own contribution fragment rather than a third-party mirror.
 *  The mirrors cache for days: when private contributions were switched on this
 *  graph went 90 -> 1260 immediately here and stayed at 90 upstream. No token
 *  needed, the fragment is public. */
type Day = { date: string; count: number; level: number };

const USER = profile.links.github.split("/").pop() ?? "yashoncode";
const SRC = `https://github.com/users/${USER}/contributions`;

/** Level 0 is a hairline well rather than pure transparency, so an empty day
 *  still reads as a cell and the grid keeps its shape. */
const LEVELS = [
  "rgba(255, 255, 255, 0.045)",
  "color-mix(in oklab, var(--color-violet) 30%, transparent)",
  "color-mix(in oklab, var(--color-violet) 52%, transparent)",
  "color-mix(in oklab, var(--color-violet) 76%, transparent)",
  "var(--color-violet)",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** 2025-12-12 -> "12th Dec '25". 11th, 12th and 13th are the exceptions the
 *  naive last-digit rule gets wrong. */
function label(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const teen = d % 100 >= 11 && d % 100 <= 13;
  const suffix = teen ? "th" : (["th", "st", "nd", "rd"][d % 10] ?? "th");
  return `${d}${suffix} ${MONTHS[m - 1]} '${String(y).slice(2)}`;
}

/** Each day is a <td> carrying the date and level; its count lives in a sibling
 *  <tool-tip for="{td id}">, so the two are joined on that id. The capture stops
 *  at the next "<" rather than matching a closing tag: an escaped "</" inside a
 *  regex literal silently matches nothing once this file goes through the build. */
function parse(html: string): Day[] {
  const tips = new Map<string, string>();
  for (const m of html.matchAll(
    /<tool-tip[^>]*for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)<\/tool-tip>/g,
  )) {
    tips.set(m[1], m[2]);
  }
  const days: Day[] = [];
  for (const m of html.matchAll(/<td[^>]*class="ContributionCalendar-day"[^>]*>/g)) {
    const td = m[0];
    const date = /data-date="([\d-]+)"/.exec(td)?.[1];
    const id = /id="(contribution-day-component-[\d-]+)"/.exec(td)?.[1];
    const level = /data-level="(\d)"/.exec(td)?.[1];
    if (!date || !id || level === undefined) continue;
    // "No contributions on …" has no leading digits and falls through to 0.
    days.push({ date, level: Number(level), count: Number(/^\d+/.exec(tips.get(id) ?? "")?.[0] ?? 0) });
  }
  // GitHub's calendar is a table with one ROW per weekday, so the cells arrive
  // row-major: every Sunday, then every Monday. Sort to chronological order or
  // the column-filled grid below lands each day in the wrong square.
  return days.sort((a, b) => (a.date < b.date ? -1 : 1));
}

/** The account's first year. GitHub has no "all time" endpoint, so the total is
 *  the calendar years summed, and this is where the summing starts. */
const FIRST_YEAR = 2024;

async function fetchDays(query = ""): Promise<Day[]> {
  try {
    const res = await fetch(SRC + query, {
      // GitHub serves an empty body to the default fetch agent.
      headers: { "User-Agent": "Mozilla/5.0", Accept: "text/html" },
      // Refetched daily. The graph moves at most once a day.
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    return parse(await res.text());
  } catch {
    return [];
  }
}

async function getData() {
  const thisYear = new Date().getUTCFullYear();
  const years = Array.from({ length: thisYear - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i);
  // The bare fragment is the rolling 12 months the grid draws; the per-year
  // ones exist only to be summed. All in flight together, all cached a day.
  const [days, ...perYear] = await Promise.all([
    fetchDays(),
    ...years.map((y) => fetchDays(`?from=${y}-01-01&to=${y}-12-31`)),
  ]);
  const allTime = perYear.flat().reduce((n, d) => n + d.count, 0);
  return { days, allTime };
}

export default async function GithubHeatmap() {
  const { days, allTime } = await getData();
  // The card disappears rather than rendering an empty grid: a heatmap that
  // failed to load looks identical to a year of no work.
  if (!days.length) return null;


  // Pad to Sunday so every column is a real calendar week.
  const lead = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const cells: (Day | null)[] = [...Array<null>(lead).fill(null), ...days];
  const last = days[days.length - 1].date;

  // One label per column whose Sunday opens a new month.
  const weeks = Math.ceil(cells.length / 7);
  const labels = Array.from({ length: weeks }, (_, w) => {
    const cell = cells[w * 7];
    if (!cell) return null;
    const d = new Date(cell.date + "T00:00:00Z");
    const prev = cells[(w - 1) * 7];
    if (w > 0 && prev && new Date(prev.date + "T00:00:00Z").getUTCMonth() === d.getUTCMonth())
      return null;
    // A label in the last two columns has no room to draw and overruns the
    // grid's right edge, so the tail month goes unlabelled, as GitHub does.
    if (w > weeks - 3) return null;
    return { col: w + 1, name: MONTHS[d.getUTCMonth()] };
  }).filter((l): l is { col: number; name: string } => l !== null);

  return (
    <div className="glass hm-glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div className="flex items-center gap-2">
          <GithubIcon size={16} />
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-fg transition-colors hover:text-violet"
          >
            @{USER}
          </a>
        </div>
        <p className="text-xs text-muted">
          {/* Fixed locale: the server and the browser must format this the same
              way or React reports a hydration mismatch. */}
          <span className="font-mono text-fg">{allTime.toLocaleString("en-US")}</span> contributions
          all time
        </p>
      </div>

      {/* The grid is wider than a phone; it scrolls on its own rather than
          forcing the page sideways. The padding is headroom for the hover lift:
          overflow-x:auto forces overflow-y to auto, which would clip it. */}
      <div className="-mx-1.5 mt-5 overflow-x-auto p-1.5">
        <div className="min-w-max">
          <div
            className="grid gap-[3px] text-[9px] text-muted"
            style={{ gridTemplateColumns: `repeat(${weeks}, 11px)` }}
            aria-hidden
          >
            {labels.map((l) => (
              <span key={l.col} style={{ gridColumn: l.col }} className="mb-1">
                {l.name}
              </span>
            ))}
          </div>
          <div
            className="grid grid-flow-col grid-rows-7 gap-[3px]"
            role="img"
            aria-label={`GitHub contribution activity over the last year, ${allTime.toLocaleString("en-US")} contributions all time`}
          >
            {cells.map((c, i) =>
              c === null ? (
                <span key={`pad-${i}`} className="size-[11px]" />
              ) : (
                <span
                  key={c.date}
                  title={`${label(c.date)} · ${c.count || "no"} contribution${c.count === 1 ? "" : "s"}`}
                  className={`hm-cell size-[11px] rounded-[2px] ${
                    c.date === last ? "hm-today" : ""
                  }`}
                  style={{
                    ["--hm-lvl" as string]: LEVELS[Math.min(c.level, 4)],
                    // Delay by column, not by index, so the sweep runs left to
                    // right as one wavefront instead of snaking down each week.
                    animationDelay: `${Math.floor(i / 7) * 14}ms`,
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-xs text-muted">
          Private contributions included, counted without repository details.
        </p>
        <div className="flex shrink-0 items-center gap-[3px]" aria-hidden>
          <span className="mr-1 text-[10px] text-muted">Less</span>
          {LEVELS.map((bg) => (
            <span key={bg} className="size-[11px] rounded-[2px]" style={{ background: bg }} />
          ))}
          <span className="ml-1 text-[10px] text-muted">More</span>
        </div>
      </div>
    </div>
  );
}
