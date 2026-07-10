# Yashwanth D — Portfolio

Personal portfolio site. Dark, animated, single-page — built with Next.js (App Router), Tailwind CSS v4, and Motion.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Editing content

All resume content (experience, skills, education, publications, links, contact info) lives in one file:

- [`src/data/resume.ts`](src/data/resume.ts)

Edit values there and the whole site updates — components under `src/components/` only render that data.

Design tokens (colors, animations, utilities) live in [`src/app/globals.css`](src/app/globals.css).
