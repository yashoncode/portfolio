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
  "var(--color-border)",
  "color-mix(in srgb, var(--color-accent) 28%, var(--color-surface))",
  "color-mix(in srgb, var(--color-accent) 52%, var(--color-surface))",
  "color-mix(in srgb, var(--color-accent) 76%, var(--color-surface))",
  "var(--color-accent)",
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
  const allTime = perYear.every((year) => year.length)
    ? perYear.flat().reduce((n, d) => n + d.count, 0)
    : null;
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
    <section aria-labelledby="contributions-title" className="rise">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-xs text-muted">
        <h2 id="contributions-title" className="flex items-baseline gap-2.5">
          <span className="tracking-[0.12em] text-dim uppercase">Contributions</span>
          {allTime !== null && (
            <span>
              <span className="text-base font-medium tracking-tight text-fg tabular-nums">{allTime.toLocaleString("en-US")}</span> all time
            </span>
          )}
        </h2>
        <a href={profile.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 py-1 hover:text-accent">
          <GithubIcon size={13} /> @{USER}
        </a>
      </div>
      {/* Phones: keep cells legible and scroll sideways; rtl starts the scroll at
          the newest weeks, the inner ltr restores normal order. */}
      <div className="-mx-5 overflow-x-auto px-5 [direction:rtl] sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="min-w-[38rem] [direction:ltr] sm:min-w-0">
          <div
            className="grid gap-0.5 font-mono text-[8px] text-muted sm:text-[9px]"
            style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
            aria-hidden
          >
            {labels.map((l) => (
              <span key={l.col} style={{ gridColumn: l.col }} className="mb-1">
                {l.name}
              </span>
            ))}
          </div>
          <div
            className="grid grid-flow-col grid-rows-7 gap-0.5"
            style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
            role="img"
            aria-label="GitHub contribution activity over the last year"
          >
            {cells.map((c, i) =>
              c === null ? (
                <span key={`pad-${i}`} className="aspect-square" />
              ) : (
                <span
                  key={c.date}
                  title={`${label(c.date)} · ${c.count || "no"} contribution${c.count === 1 ? "" : "s"}`}
                  className={`hm-cell aspect-square rounded-[1px] ${
                    c.date === last ? "hm-today" : ""
                  }`}
                  style={{
                    ["--hm-lvl" as string]: LEVELS[Math.min(c.level, 4)],
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-dim">
            Private contributions included, counted without repository details.
          </p>
          <div className="flex shrink-0 items-center gap-[3px] font-mono" aria-hidden>
            <span className="mr-1 text-[10px] text-muted">Less</span>
            {LEVELS.map((bg) => (
              <span key={bg} className="size-2 rounded-[1px]" style={{ background: bg }} />
            ))}
            <span className="ml-1 text-[10px] text-muted">More</span>
          </div>
        </div>
    </section>
  );
}
