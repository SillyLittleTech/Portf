# KR_Portf — Portfolio template

This repository is a lightweight, opinionated portfolio starter built with Vite + React + TypeScript and Tailwind CSS. It's been refactored to be a reusable template: fork or clone, then replace the content data and assets to make it your own.

Why use this template?
- Simple single-page layout made of modular sections (`src/sections/*`).
- Data-driven: edit `src/data/*` to update content (no deep React changes required).
- Accessible defaults: prefers-reduced-motion support, semantic HTML, and modest Framer Motion usage.

Quickstart (local)
1. Clone or fork this repo and open it locally.
2. Install dependencies:

```bash
npm ci
```

3. Start the dev server:

```bash
npm run dev
# open http://localhost:5173
```

4. Lint / build / test:

```bash
npm run lint
npm run build
npm run test
```

Where to edit content (most common customizations)

Data files in my production build are hosted on a Cloudflare R2 server and data is pulled at runtime. However, you do not need this to be your case, as you can embed data in the following files: 
- `src/data/projects.ts` — your projects list (title, description, tech, links, images).
- `src/data/experience.ts`, `src/data/education.ts`, `src/data/certifications.ts` — timeline and credentials.
- `src/data/skills.ts` — skills shown in the Skills section (supports `isDeveloping` flag for "in progress" items).
- `src/data/socials.ts` — social links and icons.
- `src/sections/HeroSection.tsx` — top-of-page hero copy and primary CTA if you need custom layout.
- `src/sections/ContactSection.tsx` — contact flow (mailto generation + copy-to-clipboard). If you prefer a server-backed form, replace this component.
- `src/components/SiteFooter.tsx` & `src/data/build.ts` — footer and build-label logic (the build label persists a short random prefix per build signature in `localStorage`).
- `public/` — replace `favicon.svg`, `index.html` fallback content, and `public/fonts/NanumPenScript-Regular.ttf` if you want a different display font.

Environment variables
- Use `.env.local` for local secrets and GitHub/CI Secrets for automated deploys. Variables use the `VITE_` prefix.
- Important: `VITE_TURNSTYLE_SITE` Sometimes `VITE_TURNSTILE_SITE_KEY`,  `src/sections/ContactSection.tsx`. (I'm sorry user, my spelling is bad and I did an oopsy)

Development & deployment notes
- Dev server: `npm run dev` (Vite).
- Build: `npm run build` produces `dist/`.
- Preview hosting locally with either firebase (as we have a firebase.json file setuo) or Cloudflare pages (we have a wrangler.toml and _headers file), I'm sure although if you know a little bit about coding, you should be able to set it up with any static hosting service you prefer... or if you are insane you can host it yourself.

```bash
firebase emulators:start --only hosting
```

- CI / preview deploys: this repo contains GitHub Actions and Cloudflare Pages / Wrangler examples. You can deploy `dist/` with `npx wrangler pages deploy dist --project-name <name>` or use Firebase hosting in your own project.

Testing & visual checks
- Playwright is configured under `tests/` and `playwright.config.ts` for accessibility and visual diffs. Run the test suite with `npm run test`.

Styling & accessibility
- Compose Tailwind utility classes directly in JSX. Follow the existing component patterns in `src/sections/*` for spacing and accessible markup.
- Respect `prefers-reduced-motion` — Framer Motion is used sparingly. See `src/providers/ThemeProvider.tsx` for theme handling.

Template checklist — things to replace when making it yours
- [ ] Replace site name and printed name (`.font-kiya`) text instances (`src/components/*`, `public/index.html`).
- [ ] Update `src/data/*` files (projects, socials, skills, experience).
- Or alternrativly spin up a database (like an R2 server) and host the content there updating useRemoteContent.ts
- See the README in `/src/data` for information on how to get started.
- [ ] Replace images in `src/assets/` and files in `public/` (favicon, fonts).
- [ ] Review `src/sections/ContactSection.tsx` to choose mailto-only or server-backed forms; set environment variables if using captcha or Pageclip.
- [ ] Replace the target URL in `.github/workflows/ZAP.yml` with your production URL to ensure good security. 
- [ ] Disable any workflows you do not want/need. 
- [ ] Run `npm run lint` and `npm run build` to ensure no local errors after changes.

License
- The project uses the repository's BSD 3-Clause license (see `LICENSE`). Keep license headers intact when copying code.

Need help or want this template tuned for a specific workflow?
- Tell me what you want to change (simpler hero, blog-style pages, serverless contact form). I can add examples or small helper scripts (e.g., a CLI to scaffold `src/data/projects.ts` entries).
# Kiya Rose Portfolio

My Personal Portfolio. I put things here, hopefully it looks good.

## Tech Stack

- **React 19 + TypeScript** via Vite
- **Tailwind CSS** for styling with custom material-inspired components
- **Framer Motion** for smooth, accessible animations
- **@dnd-kit** for drag-and-drop skill reordering with localStorage persistence
- **Cloudflare Pages** for global edge hosting and preview environments

## Environment Variables

- `VITE_PAGECLIP_API_KEY` – Required for the contact form to work. API key from [Pageclip](https://pageclip.co/).
- `VITE_TURNSTILE_SITE_KEY` (or legacy `VITE_TURNSTYLE_SITE`) – Cloudflare Turnstile site key that powers the human verification step on the contact form.

Configure these variables in your local `.env` file and in the Cloudflare Pages project settings so production builds hydrate them at runtime.

## Deployment

- Build with `npm run build` (output in `dist/`), then deploy using Wrangler: `npx wrangler pages deploy dist --project-name kiyaverse --compatibility-date=2024-06-01`.
- GitHub Actions ([`cloudflare-pages-preview.yml`](.github/workflows/cloudflare-pages-preview.yml) and [`cloudflare-pages-merge.yml`](.github/workflows/cloudflare-pages-merge.yml)) run linting, build the bundle, and publish to Cloudflare Pages when enabled. Provide the following repository secrets for automation:
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_API_TOKEN` (Pages `Edit` + `Deployments` permissions)
  - `VITE_PAGECLIP_API_KEY`
  - `VITE_TURNSTILE_SITE_KEY` (and/or `VITE_TURNSTYLE_SITE` for legacy naming)

The repository needs a `FIREBASE_SERVICE_ACCOUNT_KIYAVERSE` secret with deploy access to the `kiyaverse` Firebase project.

## Data conversion helper

- `npm run data:to-json -- src/data/projects.ts` exports convertible `export const` values to `src/data/projects.json` alongside round-trip metadata.
- `npm run data:to-ts -- src/data/projects.json` restores the original TypeScript module (use `--overwrite` to replace an existing file).
- Pass `--pick projectsFallback,educationFallback` to work with specific exports when a file contains multiple arrays or objects.
- Open `src/tools/convert.html` in a browser for an all-in-one local UI that handles file drops, selective exports, and downloads without leaving the machine.

## JSON visualization helper

- Open `src/tools/visualizeme.html` locally to inspect JSON structures with pan/zoom navigation, modal node editing, search, expand/collapse controls, and SVG export.
- Switch the input mode to load TypeScript data modules directly; the tool converts exports into JSON for editing and can export the updated module back to TypeScript once you save.
