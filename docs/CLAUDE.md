# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: CalcWise (working title) — Mortgage & Loan Calculator Web App

Multi-country, AdSense-monetized loan/mortgage calculator SaaS targeting 50+ countries. The full product vision, feature inventory, calculator specs, output/download system, and phased roadmap live in [PRD.md](PRD.md) — treat it as the source of truth for product behavior and acceptance criteria.

## Repository Status

**Day 1 — pre-implementation.** The repo currently contains only the PRD, its PDF render, README, and LICENSE. There is no application code, no `package.json`, no CI config, and no test suite yet. The first PR should scaffold the project per the tech stack in [PRD.md §3.2](PRD.md).

## Tech Stack (from PRD §3.2)

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Forms | React Hook Form + Zod |
| Charts | Recharts + D3.js (D3 only when Recharts is insufficient) |
| Animation | Framer Motion |
| Client PDF | jsPDF + html2canvas |
| Server PDF | Puppeteer (high-fidelity report) |
| Excel | SheetJS (`xlsx`) |
| CSV | Papa Parse |
| QR | qrcode.react |
| Short URLs | nanoid + Redis |
| DB / ORM | PostgreSQL + Prisma |
| Cache | Redis (sessions, rate data, share tokens) |
| Auth | NextAuth.js |
| Email | Resend or SendGrid |
| Storage | AWS S3 or Cloudflare R2 |
| Hosting | Vercel + AWS RDS |
| SEO | next-seo + schema markup |
| Analytics | GA4 + Mixpanel |

## High-Level Architecture

Three layers, with the calc engine as the single source of truth that all output formats read from:

1. **Frontend (Next.js App Router)** — one route per calculator under `/calculators/<type>/<slug>/`, plus `/share/[token]`, `/countries/[country]`, `/embed/[id]`, `/dashboard/*`, and `/api/*` route handlers. The persistent **Output Panel** ([PRD §3.5.1](PRD.md)) is the post-calculation surface shared by every calculator.
2. **API** — `app/api/calculate`, `app/api/rates`, `app/api/export/{pdf,excel,csv,image}`, `app/api/share/{create,resolve/[token],email}`, `app/api/qr`. Rate-limit everything; cache rate/share-token data in Redis.
3. **Data** — PostgreSQL (users, saved calcs, permanent share links, version history) + Redis (rate feed, session, ephemeral share links) + S3/R2 (server-generated PDF/Excel for authed users). Guest downloads are generated client-side and never touch the server.

### Country-aware design is the central architectural concern

Every calculator must consume a `country` parameter and apply country-specific rules (currency, tax, available loan types like FHA/VA/Help-to-Buy, PMI thresholds, disclosure language). Tier 1 countries at launch: US, UK, CA, AU, DE, FR, IN, AE ([PRD §2.1 Moat #1](PRD.md)). Build the country abstraction from day one — retro-fitting it will be painful.

### The Output, Download & Sharing system is the primary differentiator

[PRD §3.5](PRD.md) defines a sticky output panel with three zones: (A) visual summary + charts, (B) action toolbar, (C) detailed data. The toolbar exports PDF (quick via jsPDF, full via Puppeteer), Excel, CSV, PNG, QR code, shareable link, email, print, and social share cards (LinkedIn, Twitter/X, WhatsApp, Facebook, Reddit, Telegram). Share tokens follow TTL rules: guest 7d, free 30d, pro permanent ([PRD §3.5.3](PRD.md)).

### Auth + tier gating

NextAuth with three tiers — Free, Pro ($9/mo), Business ($29/mo). Tier boundaries are encoded in [PRD §3.10.3](PRD.md): guest share expiry, password-protected links, multi-recipient email, white-label PDF, API access, and collaborative editing all gate on subscription.

## Development Conventions (when code exists)

- **Money is integer cents internally** for any persisted value; format at the edge for display. Inputs/outputs in calculators are user-facing decimals.
- **Calculator functions are pure** — `calculateMortgage(inputs) → outputs` ([PRD §3.4.1](PRD.md)). No I/O, no `Date.now()`. Same inputs → same outputs. This makes them unit-testable and shareable.
- **Zod schemas mirror TypeScript types** for inputs (e.g. `MortgageInputs`). Reuse the schema in API route validation and in form validation.
- **One route per calculator**, but share the Output Panel and the action toolbar. Don't duplicate the export pipeline per calculator.
- **Never block the user** with an ad — see AdSense rules in [PRD §3.10.1](PRD.md) (no ads over inputs, outputs, or action buttons; no ads in print/PDF; pre-download interstitial must have a 3s countdown).
- **SEO** is a product feature, not an afterthought. Programmatic `/mortgage-calculator/[country]/[state-city]/` pages target 10,000+ indexed pages ([PRD §3.9.3](PRD.md)). Each page needs ~500 words of unique content, schema markup, and proper meta. Shared-link pages (`/share/[token]`) must be `noindex, nofollow` to prevent duplicate-content cannibalization.

## Phased Delivery (from PRD §Part 4)

- **Phase 1 (MVP, months 1–3):** Core mortgage + affordability + refinance + auto + personal calcs, US/UK/CA/AU variants, basic output system (quick PDF, CSV, 7-day share links, email-to-self, Twitter/WhatsApp, print, PNG), AdSense, 20 landing pages, mobile responsive, GA4.
- **Phase 2 (Growth, months 4–6):** All 8 Tier-1 countries, full country-specific logic, loan comparison, rate feeds, user accounts, rate alerts, embeds, server PDF (Puppeteer), Excel with charts, all social platforms, programmatic SEO to 5,000 pages, affiliate CTAs.
- **Phase 3 (Moat, months 7–12):** AI Scenario Engine, Financial Health Score, Pro/Business launch, white-label PDF, CRM integrations, 10,000+ SEO pages, multi-language, mobile app.

When picking up an issue, confirm which phase it belongs to before implementing — the right "done" definition depends on it.

## Performance Budgets (PRD §3.11 — treat as SLOs)

- Calculator response: < 100ms
- PDF quick: < 2s · PDF full: < 8s
- Excel: < 3s · Share link creation: < 500ms · QR: < 200ms
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Lighthouse > 90 · 3G page load < 2s · 99.9% uptime

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Dip Kumar Kapat.
