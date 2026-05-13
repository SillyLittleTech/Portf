# Portfolio Starter (Astro + React)

This repository is a static-first portfolio template that keeps the existing visual layout and section flow, while using Astro for cleaner SSG builds and easier deployment.

## Stack

- **Astro 5** for static site generation
- **React 19 + TypeScript** for interactive UI sections
- **Tailwind CSS 4** for styling
- **Framer Motion** for motion with reduced-motion support
- **Playwright + Vitest** for testing

## Quick start

```bash
npm ci
npm run dev
```

Open `http://localhost:4321`.

## Build and verify

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

- `npm run build` -> production output in `dist/`
- `npm run build:pages` -> GitHub Pages subpath build (`/Portf/` by default)

## Data loading (remote + fallback)

The app uses `src/hooks/useRemoteData.ts`.

- If **`VITE_REMOTE_DATA_URL` is set**, data is fetched from that remote endpoint.
- If **`VITE_REMOTE_DATA_URL` is not set**, the app uses local fallback data from `src/data/*`.
- Remote errors show placeholder content instead of silently swapping to local fallback data.

This keeps behavior predictable and easier to debug for template users.

## Common edits

### Content

Edit these files:

- `src/data/projects.ts`
- `src/data/experience.ts`
- `src/data/education.ts`
- `src/data/certifications.ts`
- `src/data/skills.ts`
- `src/data/socials.ts`

### Sections and layout

- Main section order is in `src/App.tsx`.
- Section implementations are in `src/sections/*`.
- Shared UI components are in `src/components/*`.

### Colors and theme

- Global theme styles: `src/index.css`
- Theme behavior: `src/providers/ThemeProvider.tsx`

### Languages

- Translation files: `src/translations/*.json`
- Language provider: `src/providers/LanguageProvider.tsx`

### Icons

- Icon usage is based on Iconify names (e.g. `mdi:github`).
- Icon mapping helpers are in `src/utils/icons.ts`.

## Routing

Astro routes:

- `/` -> `src/pages/index.astro`
- `/privacy-policy` -> `src/pages/privacy-policy.astro`

React is hydrated client-side to preserve the current interactive behavior and visual feel.

## Deployment

### Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Config: `wrangler.toml`
- Headers: `public/_headers`

### GitHub Pages

Use `.github/workflows/github-pages.yml` with:

- `BASE_PATH=/your-repo-name/`
- `npm run build:pages`

## Security headers

Master config lives in `security-headers.config.ts`.

Parity check:

```bash
npm run verify:security-headers
```

This verifies required security headers across:

- `security-headers.config.ts`
- `public/_headers`
- `firebase.json` (reference/backup hosting config)

## Project docs

- `src/README.md` -> source layout overview
- `src/data/README.md` -> data model and remote data format
- `src/utils/README.md` -> utility responsibilities
- `tests/README.md` -> test suite guide

## License

BSD 3-Clause. See `LICENSE`.
