# Old Tigers Head — Website

## Overview

A full pub website for The Old Tigers Head, Lee, London (Est. 1750). Built as a React + Vite single-page app with an Express API backend connected to Google Sheets for live content updates.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS v4, hosted at `/`
- **API framework**: Express 5, hosted at `/api`
- **Database**: PostgreSQL + Drizzle ORM (provisioned for future use)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Integrations**: Google Sheets (via Replit Connectors SDK)

## Brand

- **Primary colour**: Navy `#002942`
- **Accent colour**: Gold `#C9A227`
- **Font**: Century Gothic (with Avant Garde / Trebuchet MS fallback)
- **Border radius**: 0 (sharp rectangular design)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/oth-website run dev` — run frontend locally

## Google Sheets Integration

Two API routes pull live content from a Google Spreadsheet:

- `GET /api/sheets/whats-on?sheetId=<id>` — reads the **"What's On"** tab
  - Columns: `Day`, `Time`, `Title`, `Description`, `Tag`
- `GET /api/sheets/menu?sheetId=<id>` — reads the **"Menu"** tab
  - Columns: `Section`, `Item`, `Description`, `Price`

Set `VITE_GOOGLE_SHEET_ID` environment variable to the Google Sheet ID to enable live content. The frontend falls back to hardcoded sample data if the env var is not set.

## Artifacts

- `artifacts/oth-website` — main website (React + Vite), preview path `/`
- `artifacts/api-server` — Express API server, preview path `/api`
- `artifacts/mockup-sandbox` — design prototype (not deployed)

## Pages / Routes

- `/` — Main home page (all sections)
- `/community` — Community signup, Tiger of the Month, member wall
- `/staff` — Staff portal (login: test / test) with Team Notes, Staff Rota, Digital Marketing Creator
- `/privacy` — Privacy Policy + Cookie Policy (GDPR)

## Sections (Home page)

1. Announcement ticker (gold bar)
2. Sticky navbar: left nav | centred name | right: Book + Search + Hamburger
   - Hamburger includes Contact section (Book, Hire, Get in Touch, FAQs, Staff Portal)
3. Hero: full-screen with "At the Beating Heart of Lee" tagline
4. What's On (Google Sheets driven) — Upcoming/Past tabs + Grid/Week view
5. Food Menu (Google Sheets driven) — "Today's Menu" / "Sample Sunday Menu" + Print button
6. Book a Table — WhatsApp confirmation flow + FAQ teaser callout
7. Visit — Address, opening hours, directions, bus routes, FAQ teaser
8. FAQ — 14-question accordion (GDPR, accessibility, dietary, parking, etc.)
9. About — Past (slideshow + history directory), Present, Future
10. Venue Hire — Function room enquiry CTA
11. Footer — Opening hours, contact, Privacy Policy / Cookie Policy / Accessibility links
12. GDPR cookie consent banner (localStorage-persisted)
13. Skip-to-content accessibility link

## Contact Details

- Phone: 020 4568 0111
- Email: enquiries@theoldtigershead.com
- Address: 351 Lee High Road, London SE12 8RU

## Opening Hours

- Mon–Thu: 12pm–11pm
- Fri–Sat: 12pm–12am (midnight)
- Sunday: 12pm–10pm
- Kitchen lunch: 12pm–4pm | Dinner: 5pm–9pm
