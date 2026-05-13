# `tests/` guide

This directory contains Playwright end-to-end tests:

- `a11y.spec.ts` - accessibility checks (Axe)
- `theme-consistency.spec.ts` - theme persistence/behavior checks
- `screenshot.spec.ts` - visual screenshot capture

Run with:

```bash
npm run test:e2e
```

Unit tests run with Vitest via:

```bash
npm run test
```
