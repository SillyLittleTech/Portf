# Copilot / AI instructions

## Architecture

- Astro + React + TypeScript portfolio template.
- Astro routes live in `src/pages/` (`index.astro`, `privacy-policy.astro`).
- Main UI and section composition remain in React (`src/App.tsx`, `src/sections/*`).
- Local content lives in `src/data/*` and translations in `src/translations/*`.

## Core conventions

- Keep the current visual layout and section order unless explicitly asked to redesign.
- Prefer small, focused edits; preserve accessibility and reduced-motion behavior.
- Use Tailwind utility classes in JSX and keep Material-like rounded card styling.
- Use `.font-kiya` for the display-name accent style.

## Remote data contract

- `VITE_REMOTE_DATA_URL` enables remote JSON fetches.
- If no remote URL is set, use local fallback data only.
- On remote fetch failure, show placeholder data (do not silently swap to local fallback).
- Keep this behavior centered in `src/hooks/useRemoteData.ts`.

## Build and test commands

- Install: `npm ci`
- Dev: `npm run dev`
- Lint/type check: `npm run lint`
- Unit tests: `npm run test`
- E2E tests: `npm run test:e2e`
- Build: `npm run build`

## Deploy targets

- Cloudflare Pages: output `dist/`, config in `wrangler.toml`, headers in `public/_headers`.
- GitHub Pages: use `npm run build:pages` with `BASE_PATH=/your-repo-name/`.

## Security

- Keep security headers centralized in `security-headers.config.ts`.
- Keep parity checks working via `npm run verify:security-headers`.
- Use safe logging helpers in `src/utils/errorSanitizer.ts`.
