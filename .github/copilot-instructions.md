# Copilot / AI agent instructions (project-specific)

This file contains focused, actionable rules for automated coding agents working in the KR_Portf repository. Keep guidance short and specific — prefer small, safe edits and follow the project's conventions.

## Quick architecture & big picture
- Vite + React + TypeScript front-end served via Firebase Hosting. Entry points: `src/main.tsx` → `src/App.tsx` → `src/AppRouter.tsx`.
- UI components: `src/components/`; page sections: `src/sections/`; content/data: `src/data/` (e.g., `build.ts`, `projects.ts`).
- Theme and context providers: `src/providers/ThemeProvider.tsx`, `src/providers/theme-context.ts` and hook `src/hooks/useTheme.ts`.
- Tests and visual checks: Playwright + Vitest under `tests/` and `playwright.config.ts`.

## Project-specific conventions (follow these)
- Compose Tailwind utility classes directly in JSX. Use PascalCase for components and camelCase for hooks.
- Visual style: rounded Material-like cards (`rounded-3xl`, `shadow-card`), warm orange/pink accents (`#f97316`, `#ec4899`), and `.font-kiya` for the printed name "Kiya Rose" (font located in `public/fonts`).
- Respect `prefers-reduced-motion`. Framer Motion is used; prefer short fade/slide transitions and provide reduced-motion fallbacks.
- Footer/legal: use `getBuildUpdatedAt()` from `src/data/build.ts` for the "Last updated" date — do not hard-code timestamps.
- Contact form: client-only `mailto:` generation plus copy-to-clipboard CTA (see `src/sections/ContactSection.tsx`).

## Environment & secrets
- Environment variables use the `VITE_` prefix. Critical: `VITE_TURNSTYLE_SITE` is intentionally misspelled (no second "t"); do not rename it.
- Never commit secrets. Use `.env.local` locally and GitHub Secrets in CI.

## Common developer workflows & commands
- Install deps: `npm ci` or `npm install`.
- Dev server: `npm run dev` (Vite, http://localhost:5173).
- Lint: `npm run lint` (run before PR).
- Build: `npm run build` → `dist/` for Firebase Hosting.
- Local hosting preview: `firebase emulators:start --only hosting` (project has `firebase.json`).
- Run tests: `npm run test` (Playwright tests and other test runners configured in package.json).

## Places to inspect for examples and patterns
- Routing & layout: `src/App.tsx`, `src/AppRouter.tsx`.
- Footer/build label: `src/components/SiteFooter.tsx`, `src/data/build.ts` (localStorage prefix behavior).
- Contact flow: `src/sections/ContactSection.tsx` (mailto + clipboard behaviour).
- Theme logic: `src/providers/ThemeProvider.tsx`, `src/hooks/useTheme.ts`.
- Page-level sections: `src/sections/*` — follow their existing patterns for spacing, animation, and accessibility.

## Editing guidance for AI agents
- Make smallest useful change. Prefer a focused PR per issue.
- Preserve existing UX and data flows. If you change `src/data/build.ts` or footer code, preserve the localStorage build-label behavior unless explicitly fixing it.
- Avoid global CSS: adhere to Tailwind utility usage in JSX.
- When adding routes: update `src/AppRouter.tsx` and use `src/utils/navigation.ts` helpers.

## Tests & quality gates
- Before proposing changes: run `npm run lint` and `npm run build` locally.
- Test files live under `tests/` (e.g. `a11y.spec.ts`, `screenshot.spec.ts`); Playwright is used for integration/visual checks.

## Native companion tool
- `$DashCam!/` holds a macOS Swift helper app used by developers to manage dev and playwright codegen tasks. If you modify related scripts, update the DashCam Swift sources under `$DashCam!/Sources/DashboardApp`.

## PR checklist for automated changes
- Lint passes (`npm run lint`).
- Build succeeds (`npm run build`).
- No secrets committed.
- Follow naming and Tailwind conventions.

If any section is unclear or you want more repo file examples, say which area to expand and I will iterate.
# Copilot Instructions

## Style & Architecture

- Keep the interface sleek and minimal with rounded Material-style cards, soft shadows, and translucent layers when depth is needed.
- Accent colors lean warm orange/pink (`#f97316` / `#ec4899`) in light mode while dark mode stays slate—mirror those tones in new UI or gradients.
- Use rounded Material Symbols for navigation, section headers, and social chips so iconography stays cohesive.
- Compose Tailwind utility classes directly in JSX; components follow PascalCase, hooks use camelCase, and class names remain lowercase-kebab.
- Respect `prefers-reduced-motion`, keeping Framer Motion animations subtle (short fade/slide transitions) and providing fallbacks for reduced motion preferences.
- Maintain the light/dark theme toggle with animated sun/moon icons and ensure contrast targets accessibility best practices.
- Apply the `.font-kiya` (Patrick Hand) accent whenever “Kiya Rose” appears in UI copy.
- Keep the footer’s legal line consistent: dynamic current year, typographic © symbol, `.font-kiya` "Kiya Rose", and the “Crafted with React, Tailwind CSS, and Firebase.” tag.
- Privacy and legal copy should source their “Last updated” value from `getBuildUpdatedAt()` in `src/data/build.ts` so the date reflects the current build—no hard-coded timestamps.
- Everything should be in Canadian English or French English when possible, when there are conflicting versions of a singular term use the more specific one. (For example cheque instead of check)

## Environment Variables

- Secrets use the `VITE_` prefix; note that `VITE_TURNSTYLE_SITE` (missing the second "t") is intentional and should not be renamed to `VITE_TURNSTILE_SITE`.

## Quality Expectations

- Prefer fixes that resolve lint warnings, TypeScript errors, and obvious UX problems rather than adding placeholders.
- When you touch code, scan the surrounding logic for latent bugs or smells and address them when feasible.
- Align fixes with the guidance used by DeepSource, CodeFactor, and SonarQube: eliminate dead code, handle edge cases, simplify complex conditionals, and tighten null/undefined guards.
- Preserve Firebase secrets by loading them from environment configuration—never commit credentials or hard-coded API keys.
- Ensure licensing references match the BSD 3-Clause notice in the project root `LICENSE` (copyright © 2025, Kiya Rose).
- Honor existing lint rules (avoid inline arrow handlers in JSX, limit nesting by extracting helpers, etc.).

## Collaboration Notes

- Favor small, composable helper components over deeply nested JSX trees (see `SiteHeader`/`SiteFooter` in `App.tsx`).
- When making UI changes, consider drag-and-drop persistence, localStorage access, the `mailto:` contact workflow, and other side effects already established in the repo.
- Use the existing `isDeveloping` styling in the Skills section when introducing new abilities (dashed border for in-progress skills).
- Keep the fallback page (`public/index.html`) visually aligned with the main palette when adjusting colors.
- Run `npm run lint` and (when relevant) `npm run build`; clean up generated `dist/` outputs if you run the build locally.
- Keep the build label helper in `src/data/build.ts` intact: it persists a random prefix per build signature in `localStorage`, so only adjust it if that behaviour breaks, and retain the accent tooltip that explains the two segments.
- Keep the macOS Swift companion `DashCam!` in `$DashCam!/`: it manages `npm run dev` and `npx playwright codegen` processes, so update `DashboardViewModel`/`ProcessController` plus the packaged `DashCam.app` or `dashcam_swift.tgz` whenever those workflows change.
- Route-level additions should flow through `src/AppRouter.tsx` with helpers from `src/utils/navigation.ts`; render privacy/legal pages inside React rather than shipping standalone static HTML.
- When you adjust repository guidance, update both `AGENTS.md` and this file so instructions stay in sync.
## Security & ZAP Scanning

- All security headers are centrally configured in `security-headers.config.ts` and deployed via `public/_headers` (Cloudflare Pages), `firebase.json` (Firebase Hosting), and `vite.config.ts` (local preview).
- The ZAP workflow scans `https://kiya.cat` nightly; check `.zap-ignore` for known/accepted alerts.
- When ZAP reports issues, verify headers are in `public/_headers` and deployed properly before adding to `.zap-ignore`.
- Use `safeConsoleWarn()` and `safeConsoleError()` from `src/utils/errorSanitizer.ts` instead of raw console methods to prevent information disclosure.
