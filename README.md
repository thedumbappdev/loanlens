# LoanLens

> A multi-country, multi-discipline loan calculator with amortization analysis, historical interest rate visualization, and repayment strategy insights — built with Next.js 14, TypeScript, and Tailwind CSS.

LoanLens is a fully client-side financial planning tool that helps users explore the true cost of borrowing across multiple loan types and jurisdictions. It computes amortization schedules, factors in country-specific taxes and insurance, visualizes 55+ years of historical interest rate data, and surfaces actionable strategies for paying down debt or reallocating capital.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Supported Countries](#supported-countries)
- [Supported Loan Types](#supported-loan-types)
- [Core Calculations](#core-calculations)
- [Export & Sharing](#export--sharing)
- [Disclaimer](#disclaimer)
- [License](#license)

---

## Features

- 🌍 **Multi-country support** — Pre-configured economic profiles for 8 countries (US, UK, DE, CA, AU, JP, IN, BR), each with localized currency symbols, default rates, property tax estimates, insurance averages, and term options.
- 🏦 **Multi-discipline loan engine** — Mortgage, home equity, personal, auto, student, and business loans, all driven by a unified amortization core.
- 📊 **Interactive amortization & breakdown** — Pie chart of principal vs. interest vs. taxes vs. insurance, plus a detailed monthly cost panel and per-year summaries.
- 📈 **Animated historical rates timeline** — Play, pause, scrub, and replay interest rate movements from 1970 to 2026 across all loan disciplines, with min/avg/max statistics and event annotations.
- 💡 **Repayment strategy library** — Curated, dynamically-priced strategies grouped into three lenses: *Pay Off Early*, *Reduce Payments*, and *Investment Plans* — each with benefits, risk badges, and tailored savings estimates.
- 💾 **One-click export** — Download results as a multi-sheet Excel workbook (`.xlsx`), CSV, or print-ready text document. Includes Web Share API integration on supported devices.
- 🔗 **Shareable URLs** — All inputs are encoded into the URL on every change and hydrated back on load, so a calculation can be bookmarked or sent to anyone.
- ⚡ **Extra-payment modeling** — Add an optional monthly principal-only contribution and instantly see interest saved and months shaved off the term.
- 📱 **Fully responsive UI** — Mobile-first layout with a sticky input panel on desktop, a collapsible action menu on mobile, and dark-themed slate aesthetics throughout.

---

## Tech Stack

| Layer            | Technology                                            |
| ---------------- | ----------------------------------------------------- |
| Framework        | [Next.js 14](https://nextjs.org/) (App Router)        |
| Language         | [TypeScript 5](https://www.typescriptlang.org/) (strict mode) |
| UI library       | [React 18](https://react.dev/)                        |
| Styling          | [Tailwind CSS 3](https://tailwindcss.com/) + `tailwindcss-animate` |
| Component primitives | [Radix UI](https://www.radix-ui.com/) (Label, Select, Slider, Tabs, Slot) |
| Charts           | [Recharts 2](https://recharts.org/)                   |
| Icons            | [lucide-react](https://lucide.dev/)                   |
| Animations       | [Framer Motion 11](https://www.framer.com/motion/)    |
| Date utilities   | [date-fns 3](https://date-fns.org/)                   |
| Validation       | [Zod 3](https://zod.dev/) + `@hookform/resolvers`     |
| Exports          | [xlsx](https://www.npmjs.com/package/xlsx), [jsPDF](https://www.npmjs.com/package/jspdf), [html2canvas](https://www.npmjs.com/package/html2canvas) |
| Utilities        | `clsx`, `tailwind-merge`, `class-variance-authority`  |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.17 (required by Next.js 14)
- **npm**, **pnpm**, or **yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd loanlens

# Install dependencies
npm install
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. Changes to source files hot-reload automatically.

### Production build

```bash
npm run build
npm run start
```

---

## Available Scripts

| Script          | Description                                           |
| --------------- | ----------------------------------------------------- |
| `npm run dev`   | Start the Next.js dev server with hot reload.         |
| `npm run build` | Create an optimized production build.                 |
| `npm run start` | Serve the production build.                           |
| `npm run lint`  | Run ESLint with the `next` configuration.             |

---

## Project Structure

```
loanlens/
├── src/
│   ├── app/                        # Next.js App Router entry points
│   │   ├── layout.tsx              # Root layout, metadata, global styles
│   │   ├── page.tsx                # Main LoanLens page (client component)
│   │   └── globals.css             # Tailwind base layer + CSS variables
│   │
│   ├── components/
│   │   ├── ui/                     # Reusable Radix-based primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   └── tabs.tsx
│   │   ├── AmortizationChart.tsx   # Stacked area chart of balance vs. principal
│   │   ├── CountrySelector.tsx     # Country dropdown
│   │   ├── DownloadShare.tsx       # XLSX/CSV/TXT export + Web Share API
│   │   ├── HistoricalRatesChart.tsx# Animated 1970–2026 rate timeline
│   │   ├── LoanStrategies.tsx      # Tabbed strategy library
│   │   ├── LoanTypeSelector.tsx    # Horizontal-scroll loan picker
│   │   └── ResultsDisplay.tsx      # Stats grid, pie chart, cost panel
│   │
│   ├── lib/
│   │   └── utils.ts                # `cn()` helper (clsx + tailwind-merge)
│   │
│   ├── types/
│   │   └── index.ts                # Shared TS interfaces
│   │
│   └── utils/
│       ├── calculations.ts         # Amortization engine + URL encoding
│       ├── countries.ts            # Country configs + loan-type catalog
│       └── historicalRates.ts      # 1970–2026 rate dataset
│
├── next.config.mjs                 # Next.js config (React strict mode)
├── tailwind.config.ts              # Theme tokens, dark mode, animations
├── tsconfig.json                   # Strict TS with `@/*` path alias
├── postcss.config.mjs              # Tailwind + autoprefixer
└── package.json
```

---

## Architecture Overview

LoanLens is a **fully client-side single-page application** — there are no API routes, no database, and no server state. The entire experience lives in [src/app/page.tsx](src/app/page.tsx), which is rendered as a client component.

### Data flow

```
┌──────────────────┐      ┌────────────────────┐      ┌───────────────────┐
│  User Inputs     │─────▶│  calculateLoan()   │─────▶│  ResultsDisplay   │
│  (form / URL)    │      │  (amortization)    │      │  HistoricalRates  │
└──────────────────┘      └────────────────────┘      │  LoanStrategies   │
        │                                              │  DownloadShare    │
        ▼                                              └───────────────────┘
┌──────────────────┐
│  URL Params      │  ◀── synced via `history.replaceState`
└──────────────────┘
```

1. The page maintains a single `LoanInputs` state object containing loan type, country, principal, rate, term, start date, and any extra monthly payment.
2. On mount, the URL query string is decoded via `decodeFromUrlParams()` and merged into state.
3. Every input change recomputes the full result through a `useMemo` over `calculateLoan(inputs)`.
4. A second `useEffect` re-encodes the inputs into the URL on every change, keeping the link shareable at all times.
5. Country and loan-type metadata are looked up from static catalogs in [src/utils/countries.ts](src/utils/countries.ts).

### Strict typing

The project runs TypeScript in `strict` mode. Core domain types live in [src/types/index.ts](src/types/index.ts):

- `LoanInputs` — form state
- `CountryConfig` — per-country economic profile
- `AmortizationRow` / `YearlySummary` — schedule rows
- `LoanBreakdown` — principal/interest/tax/insurance decomposition
- `CalculationResult` — aggregate output of `calculateLoan`

---

## Supported Countries

Configured in [src/utils/countries.ts](src/utils/countries.ts):

| Code | Country         | Currency | Default Rate | Term Options (yrs) |
| ---- | --------------- | -------- | -----------: | ------------------ |
| US   | United States   | USD ($)  | 6.50%        | 15, 20, 30         |
| UK   | United Kingdom  | GBP (£)  | 4.75%        | 15, 20, 25, 30     |
| DE   | Germany         | EUR (€)  | 3.50%        | 10, 15, 20, 25, 30 |
| CA   | Canada          | CAD (C$) | 5.25%        | 15, 20, 25, 30     |
| AU   | Australia       | AUD (A$) | 6.20%        | 15, 20, 25, 30     |
| JP   | Japan           | JPY (¥)  | 1.50%        | 10, 15, 20, 25, 30, 35 |
| IN   | India           | INR (₹)  | 8.50%        | 5, 10, 15, 20, 25  |
| BR   | Brazil          | BRL (R$) | 9.50%        | 10, 15, 20, 25, 30 |

Each profile also encodes `taxDeductionRate`, `avgPropertyTax`, and `avgInsurance` — all factored into the monthly breakdown and strategy savings estimates.

---

## Supported Loan Types

| Type          | Icon | Description                                |
| ------------- | :--: | ------------------------------------------ |
| Home Mortgage | 🏠   | Real estate purchase financing             |
| Personal Loan | 💰   | Unsecured personal financing               |
| Auto Loan     | 🚗   | Vehicle purchase financing                 |
| Business Loan | 🏢   | Commercial enterprise financing            |
| Student Loan  | 🎓   | Education financing                        |

(`home_equity` is also defined in the `LoanInputs` type for forward compatibility.)

---

## Core Calculations

The amortization engine in [src/utils/calculations.ts](src/utils/calculations.ts) implements the standard fixed-rate amortization formula:

```
                 P × r × (1 + r)^n
Monthly Payment = ─────────────────────
                  (1 + r)^n − 1
```

Where `P` = principal, `r` = monthly rate (`annual / 12 / 100`), `n` = total months.

The engine then walks the schedule month-by-month, applying any user-supplied **extra monthly payment** directly to principal. It records:

- A full `amortizationSchedule` (one row per month) with payment, principal, interest, extra payment, and remaining balance.
- A `yearlySummary` with opening/closing balances and annual interest/principal totals.
- **Interest saved** and **months saved** versus the baseline schedule with no extra payments.
- A `breakdown` that adds country-specific monthly **property tax** and **insurance** estimates on top of P&I.

Zero-rate loans are handled correctly via a divide-by-`n` fallback. The loop is bounded at `totalMonths * 2` as a safety net against pathological inputs.

---

## Export & Sharing

The [DownloadShare](src/components/DownloadShare.tsx) component supports three export formats, all generated on the client:

- **Excel (`.xlsx`)** — Three sheets: *Summary*, *Amortization* (full schedule), *Yearly Summary*. The `xlsx` library is dynamically `import()`-ed to keep the initial bundle slim.
- **CSV (`.csv`)** — Summary header followed by the full amortization schedule, double-quoted and comma-separated.
- **Text (`.txt`)** — A print-friendly plain-text report with the first 12 months of the schedule.

On supported devices, the **Share** button uses the native Web Share API (`navigator.canShare({ files })`) and falls back to a direct download when sharing is unavailable or canceled.

---

## Disclaimer

> The strategies and calculations provided by LoanLens are for **informational and educational purposes only** and do not constitute investment, tax, or financial advice. All investments carry risk, and past performance does not guarantee future results. Default rates, tax deduction percentages, property taxes, and historical interest rates are **approximations** intended for modeling and comparison — they are not live market data. Consult a registered financial advisor before making any borrowing or investment decisions.

---

## License

This project is currently unlicensed and marked `"private": true` in `package.json`. Add an explicit license file before publishing or distributing.

---

<p align="center"><sub>Built with Next.js · TypeScript · Tailwind CSS</sub></p>
