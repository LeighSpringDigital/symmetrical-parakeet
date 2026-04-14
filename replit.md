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

## Sections

1. Announcement ticker (gold bar)
2. Sticky navbar: left nav | centred name | right: Book + Search + Hamburger
3. Hero: full-screen with "At the Beating Heart of Lee" tagline
4. What's On (Google Sheets driven)
5. Food Menu (Google Sheets driven)
6. About (pub history Est. 1750 + Rob & team bios)
7. Private Hire / Venue Hire
8. Footer with opening hours, address, contact
