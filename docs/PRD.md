# Product Requirements Document (PRD)

## Mortgage & Loan Calculator Web App

### Version 2.0 | With Enhanced Output, Download & Sharing Features

---

# PART 1: COMPETITIVE RESEARCH & MARKET ANALYSIS

## 1.1 Top Competing Websites Analysis

| Website                 | Traffic/Month | Key Strengths                          | Weaknesses                     |
| ----------------------- | ------------- | -------------------------------------- | ------------------------------ |
| Bankrate.com            | 45M+          | Comprehensive tools, editorial content | Cluttered UX, aggressive ads   |
| NerdWallet.com          | 30M+          | Clean UI, comparison tools             | Limited international coverage |
| Mortgage Calculator.org | 15M+          | Simple, fast                           | Minimal content depth          |
| Calculator.net          | 20M+          | Multi-category calculators             | Generic, no personalization    |
| Zillow.com              | 60M+          | Real estate integration                | Mortgage-focused only          |
| MoneySavingExpert.com   | 18M+          | UK-focused, trusted editorial          | UK only                        |
| SmartAsset.com          | 10M+          | Financial advisor matching             | US-centric                     |
| HSH.com                 | 5M+           | Rate data, deep mortgage tools         | Dated UX                       |
| Dave Ramsey             | 12M+          | Debt-free philosophy tools             | US-centric, opinionated        |
| MyFICO.com              | 8M+           | Credit score integration               | Limited calculator variety     |

## 1.2 Features Found Across Top Competitors

### Universal Features (Must-Have)

- Basic mortgage payment calculator
- Amortization schedules (monthly/yearly)
- Refinance calculators
- Affordability calculators
- Interest rate comparison
- Printable/downloadable results (PDF)
- Email results functionality

### Advanced Features (Differentiators)

- Real-time rate feeds
- Side-by-side loan comparisons
- Bi-weekly vs monthly payment analysis
- Extra payment impact calculators
- Tax deduction estimators
- PMI calculators
- Closing cost estimators

### Content Strategy (SEO Moat)

- Glossary of financial terms
- "How it works" educational articles
- FAQ sections per calculator
- State/country-specific guides
- Blog with mortgage news/rate updates

---

# PART 2: MOAT STRATEGY & DIFFERENTIATORS

## 2.1 Unique Value Propositions (Your Competitive Moat)

### 🌍 MOAT #1: True Multi-Country Architecture

Most competitors are US or UK only. You will support:

- **Tier 1**: USA, UK, Canada, Australia, Germany, France, India, UAE
- **Tier 2**: Singapore, New Zealand, South Africa, Brazil, Japan, Netherlands
- **Tier 3**: 40+ additional countries with localized rules

**What this means technically:**

- Local tax laws baked in per country
- Local currency with live exchange rates
- Country-specific loan types (Help-to-Buy UK, FHA/VA USA, etc.)
- Localized compliance terminology
- Multi-language support (Phase 2)

---

### 🧠 MOAT #2: AI-Powered "Loan Scenario Engine"

No major competitor has this:

- Users input their financial situation
- AI generates 3-5 personalized loan scenarios
- Plain-English explanation of each scenario
- "What changes if..." dynamic slider
- Compare scenarios side by side
- Save scenarios to account

---

### 📊 MOAT #3: Real-Time Rate Intelligence Dashboard

- Aggregate public rate data across countries
- Show rate trends (7-day, 30-day, 90-day, 1-year)
- Rate alert subscription (email/SMS)
- "Is now a good time to buy?" indicator
- Central bank rate tracker (Fed, ECB, BoE, RBI, etc.)

---

### 🎮 MOAT #4: Interactive "Loan Journey" Gamification

- Progress tracker showing where user is in loan journey
- Achievement badges for financial milestones
- "Financial Health Score" based on inputs
- Personalized tips based on score
- Share score on social media (viral loop)

---

### 📱 MOAT #5: Embeddable Widget Ecosystem

- Offer free embeddable calculators for real estate agents, brokers, financial blogs
- Each widget backlinks to your site (massive SEO link-building moat)
- White-label option for premium partners
- API access for developers

---

### 🔄 MOAT #6: Multi-Discipline Calculator Breadth

Competitors focus on mortgages. You cover:

- Mortgage (all types)
- Personal loans
- Auto/vehicle loans
- Student loans
- Business loans
- HELOC
- Reverse mortgage
- Construction loans
- Bridge loans
- Islamic finance (Halal loans - huge underserved market)

---

### 📤 MOAT #7: Superior Output, Download & Sharing System

This is a PRIMARY differentiator. Most competitors offer basic PDF only.
You will offer:

- **Multi-format downloads**: PDF, Excel, CSV, PNG image, JSON
- **Branded shareable reports**: Professional cover page, charts included
- **Social sharing**: Pre-formatted cards for LinkedIn, Twitter, WhatsApp
- **Shareable links**: Unique URL that recreates exact calculation
- **QR code generation**: For physical sharing with agents/advisors
- **Email delivery**: Send full report to self or advisor
- **Collaborative sharing**: Share with spouse/partner to edit together
- **Embed results**: Paste results into any website or forum
- **Print-optimized views**: Professional print layouts

---

### 📰 MOAT #8: Dynamic SEO Content Engine

- Auto-generated location-specific pages
- Rate comparison pages by lender (affiliate revenue)
- Monthly "Rate Update" reports (email list building)
- User-submitted Q&A (UGC for SEO)
- Schema markup for rich snippets

---

### 💾 MOAT #9: User Account & Dashboard

- Save unlimited calculations
- Track loan applications across time
- Set payment reminders
- Net worth tracker
- Document vault (Phase 2)

---

# PART 3: FULL PRODUCT REQUIREMENTS DOCUMENT

---

## 3.1 Product Overview

| Field                   | Detail                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------- |
| **Product Name**        | CalcWise (working title)                                                              |
| **Product Type**        | Web Application (SaaS + AdSense)                                                      |
| **Primary Goal**        | Free-to-use financial calculator platform with AdSense monetization                   |
| **Secondary Goal**      | Affiliate revenue, lead generation, premium subscriptions                             |
| **Target Users**        | First-time homebuyers, refinancers, investors, financial advisors, real estate agents |
| **Supported Countries** | 50+ (phased rollout)                                                                  |
| **Monetization**        | Google AdSense + Affiliate CPA + Premium Subscription                                 |

---

## 3.2 Technical Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                            │
│   Next.js 14 (App Router) + TypeScript + Tailwind CSS           │
│   React Hook Form + Zod Validation                              │
│   Recharts / D3.js for visualizations                           │
│   Framer Motion for animations                                  │
│   html2canvas + jsPDF (client-side PDF/PNG generation)          │
│   SheetJS (Excel export)                                        │
│   qrcode.react (QR code generation)                             │
└──────────────────────┬───────────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────────┐
│                         API LAYER                                │
│   Next.js API Routes / Node.js Express                          │
│   RESTful + GraphQL (for complex queries)                       │
│   Rate limiting + caching (Redis)                               │
│   Puppeteer / Playwright (server-side PDF generation)           │
│   Nodemailer / SendGrid (email delivery)                        │
│   Short URL service (shareable links)                           │
└──────────────────────┬───────────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────────┐
│                        DATA LAYER                                │
│   PostgreSQL (user data, saved calculations, shared links)      │
│   Redis (session cache, rate data cache, share token cache)     │
│   AWS S3 / Cloudflare R2 (generated PDF/Excel storage)         │
│   External APIs (exchange rates, mortgage rates)               │
└──────────────────────────────────────────────────────────────────┘
```

### Tech Stack Decisions

| Layer        | Technology                    | Rationale                              |
| ------------ | ----------------------------- | -------------------------------------- |
| Framework    | Next.js 14                    | SSR/SSG for SEO, App Router            |
| Language     | TypeScript                    | Type safety for financial calculations |
| Styling      | Tailwind CSS + shadcn/ui      | Speed + consistency                    |
| Charts       | Recharts + D3.js              | Complex financial visualizations       |
| Client PDF   | jsPDF + html2canvas           | Instant client-side PDF                |
| Server PDF   | Puppeteer                     | High-fidelity server-rendered PDF      |
| Excel Export | SheetJS (xlsx)                | Full Excel with charts                 |
| CSV Export   | Papa Parse                    | Clean CSV generation                   |
| Image Export | html2canvas                   | PNG snapshot of results                |
| QR Code      | qrcode.react                  | QR for shareable links                 |
| Short URLs   | Custom + nanoid               | Shareable calculation URLs             |
| Database     | PostgreSQL + Prisma           | Relational data, type-safe ORM         |
| File Storage | AWS S3 / Cloudflare R2        | PDF/Excel storage                      |
| Cache        | Redis                         | Rate data, session, share tokens       |
| Auth         | NextAuth.js                   | OAuth + email auth                     |
| Email        | Resend / SendGrid             | Report delivery, alerts                |
| Hosting      | Vercel + AWS RDS              | Edge performance                       |
| CDN          | Cloudflare                    | Global speed, DDoS protection          |
| Analytics    | Google Analytics 4 + Mixpanel | Traffic + behavior                     |
| SEO          | Next-SEO + Schema markup      | Organic traffic                        |

---

## 3.3 Site Architecture & URL Structure

```
calcwise.com/
│
├── / (Homepage)
│
├── /calculators/
│   ├── mortgage/
│   │   ├── basic-mortgage-calculator/
│   │   ├── affordability-calculator/
│   │   ├── refinance-calculator/
│   │   ├── amortization-schedule/
│   │   ├── extra-payment-calculator/
│   │   ├── bi-weekly-payment-calculator/
│   │   ├── arm-vs-fixed-calculator/
│   │   ├── fha-loan-calculator/
│   │   ├── va-loan-calculator/
│   │   ├── heloc-calculator/
│   │   ├── reverse-mortgage-calculator/
│   │   ├── construction-loan-calculator/
│   │   ├── bridge-loan-calculator/
│   │   ├── jumbo-loan-calculator/
│   │   ├── interest-only-calculator/
│   │   └── pmi-calculator/
│   │
│   ├── personal-loan/
│   ├── auto-loan/
│   ├── student-loan/
│   ├── business-loan/
│   └── islamic-finance/
│
├── /countries/
│   ├── us/ | uk/ | canada/ | australia/
│   ├── germany/ | india/ | uae/
│   └── [country-slug]/
│
├── /share/
│   └── [unique-token]/          ← Shareable calculation links
│
├── /rates/
├── /tools/
│   ├── loan-comparison/
│   ├── financial-health-score/
│   └── scenario-planner/
│
├── /learn/
│
├── /embed/
│   └── [calculator-id]/
│
├── /dashboard/ (authenticated)
│   ├── saved-calculations/
│   ├── shared-calculations/     ← NEW
│   ├── download-history/        ← NEW
│   ├── rate-alerts/
│   └── profile/
│
└── /api/
    ├── /calculate/
    ├── /rates/
    ├── /export/                 ← NEW
    │   ├── /pdf/
    │   ├── /excel/
    │   ├── /csv/
    │   └── /image/
    ├── /share/                  ← NEW
    │   ├── /create/
    │   ├── /resolve/[token]/
    │   └── /email/
    └── /qr/                     ← NEW
```

---

## 3.4 Calculator Specifications

### 3.4.1 Core Mortgage Calculator

**Inputs:**

```
┌─────────────────────────────────────────┐
│ HOME PRICE          [$ ___________]     │
│ DOWN PAYMENT        [$ ___] [___%]      │
│ LOAN TERM           [10/15/20/25/30 yr] │
│ INTEREST RATE       [___%]  [🔄 Live]  │
│ LOAN TYPE           [Fixed/ARM/IO]      │
│ START DATE          [Month/Year]        │
│                                         │
│ ▼ ADVANCED OPTIONS                      │
│ Property Tax        [$ ___ /year]       │
│ Home Insurance      [$ ___ /year]       │
│ HOA Fees            [$ ___ /month]      │
│ PMI Rate            [___%] [auto-calc]  │
│ Extra Payment       [$ ___ /month]      │
└─────────────────────────────────────────┘
```

**Outputs:**

```
┌──────────────────────────────────────────────────────────┐
│   MONTHLY PAYMENT BREAKDOWN                              │
│   ┌──────────────────────────────────────────────────┐  │
│   │  Principal & Interest:              $1,847        │  │
│   │  Property Tax:                        $312        │  │
│   │  Home Insurance:                       $83        │  │
│   │  PMI:                                  $95        │  │
│   │  HOA:                                 $150        │  │
│   │  ─────────────────────────────────────────────── │  │
│   │  TOTAL MONTHLY:                     $2,487        │  │
│   └──────────────────────────────────────────────────┘  │
│                                                          │
│  [Donut Chart - Payment Breakdown]                       │
│  [Bar Chart - Principal vs Interest over time]           │
│  [Line Chart - Remaining Balance over time]              │
│                                                          │
│  LOAN SUMMARY                                            │
│  Total Loan Amount:         $380,000                     │
│  Total Interest Paid:       $284,491                     │
│  Total Cost of Loan:        $664,491                     │
│  Payoff Date:               June 2055                    │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │         OUTPUT ACTIONS TOOLBAR                   │   │
│  │  [📄 PDF] [📊 Excel] [📋 CSV] [🖼 PNG]           │   │
│  │  [🔗 Share Link] [📧 Email] [📱 QR Code]         │   │
│  │  [🖨 Print] [💬 WhatsApp] [🐦 Twitter]           │   │
│  │  [💼 LinkedIn] [📌 Save to Account]              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  [AMORTIZATION SCHEDULE TABLE]                           │
│  ┌──────┬──────────┬──────────┬──────────────────┐      │
│  │ Year │ Principal│ Interest │ Balance          │      │
│  ├──────┼──────────┼──────────┼──────────────────┤      │
│  │ 2025 │  $8,432  │ $13,732  │ $371,568         │      │
│  │ 2026 │  $8,943  │ $13,221  │ $362,625         │      │
│  └──────┴──────────┴──────────┴──────────────────┘      │
└──────────────────────────────────────────────────────────┘
```

**Calculation Logic (TypeScript):**

```typescript
interface MortgageInputs {
	homePrice: number;
	downPayment: number;
	loanTermYears: number;
	annualInterestRate: number;
	propertyTaxAnnual: number;
	homeInsuranceAnnual: number;
	hoaMonthly: number;
	pmiRate: number;
	extraPaymentMonthly: number;
	loanType: "fixed" | "arm" | "interest-only";
}

interface MortgageOutputs {
	monthlyPrincipalInterest: number;
	monthlyPropertyTax: number;
	monthlyInsurance: number;
	monthlyPMI: number;
	monthlyHOA: number;
	totalMonthlyPayment: number;
	totalInterestPaid: number;
	totalCostOfLoan: number;
	payoffDate: Date;
	amortizationSchedule: AmortizationEntry[];
	loanAmount: number;
}

function calculateMortgage(inputs: MortgageInputs): MortgageOutputs {
	const {
		homePrice,
		downPayment,
		loanTermYears,
		annualInterestRate,
		extraPaymentMonthly,
	} = inputs;

	const loanAmount = homePrice - downPayment;
	const monthlyRate = annualInterestRate / 100 / 12;
	const numPayments = loanTermYears * 12;

	// Standard formula: M = P[r(1+r)^n]/[(1+r)^n-1]
	const monthlyPI =
		(loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
		(Math.pow(1 + monthlyRate, numPayments) - 1);

	const schedule = generateAmortizationSchedule(
		loanAmount,
		monthlyRate,
		monthlyPI,
		extraPaymentMonthly,
	);

	return {
		monthlyPrincipalInterest: monthlyPI,
		monthlyPropertyTax: inputs.propertyTaxAnnual / 12,
		monthlyInsurance: inputs.homeInsuranceAnnual / 12,
		monthlyPMI: calculatePMI(loanAmount, homePrice, inputs.pmiRate),
		monthlyHOA: inputs.hoaMonthly,
		totalMonthlyPayment:
			monthlyPI +
			inputs.propertyTaxAnnual / 12 +
			inputs.homeInsuranceAnnual / 12 +
			inputs.hoaMonthly,
		totalInterestPaid: schedule.reduce((sum, e) => sum + e.interest, 0),
		totalCostOfLoan:
			loanAmount + schedule.reduce((sum, e) => sum + e.interest, 0),
		payoffDate: schedule[schedule.length - 1].date,
		amortizationSchedule: schedule,
		loanAmount,
	};
}
```

---

## 3.5 OUTPUT, DOWNLOAD & SHARING SYSTEM _(NEW — CORE FEATURE)_

### 3.5.1 Output Panel Architecture

The Output Panel is a persistent, sticky component that appears after calculation. It contains three zones:

```
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT PANEL                             │
│                                                             │
│  ZONE A: Visual Summary                                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  [Branded Header with CalcWise logo + Date]           │  │
│  │  [Key Metrics Cards: Monthly Payment / Total Cost /   │  │
│  │   Total Interest / Payoff Date]                       │  │
│  │  [Interactive Charts: Donut / Bar / Line]             │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ZONE B: Action Toolbar                                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  DOWNLOAD          SHARE           SOCIAL             │  │
│  │  [PDF] [Excel]   [🔗 Link] [📧]  [LinkedIn]          │  │
│  │  [CSV] [PNG]     [📱 QR]  [💬]  [Twitter/X]         │  │
│  │  [Print]                          [WhatsApp]          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ZONE C: Detailed Data                                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  [Amortization Schedule - Full Table]                 │  │
│  │  [Year-by-Year Summary]                               │  │
│  │  [Payment Breakdown Detail]                           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

### 3.5.2 Download Features (Detailed Specs)

#### 📄 PDF Download

**Two PDF Generation Modes:**

| Mode            | Technology          | Use Case                    | Quality   |
| --------------- | ------------------- | --------------------------- | --------- |
| Quick PDF       | jsPDF + html2canvas | Instant, client-side        | Good      |
| Full Report PDF | Puppeteer (server)  | Professional, high-fidelity | Excellent |

**PDF Report Structure:**

```
PAGE 1: COVER PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[CalcWise Logo]                    [Date Generated]

MORTGAGE CALCULATION REPORT
─────────────────────────────────────────────────
Prepared for: [User Name or "Guest User"]
Calculator:   Basic Mortgage Calculator
Country:      United States
Generated:    January 15, 2025 at 3:42 PM EST
Reference #:  CW-2025-011547392

KEY RESULTS AT A GLANCE
┌─────────────────┬──────────────────────────────┐
│ Monthly Payment │ $2,487                        │
│ Total Interest  │ $284,491                      │
│ Total Cost      │ $664,491                      │
│ Payoff Date     │ June 2055                     │
│ Loan Amount     │ $380,000                      │
└─────────────────┴──────────────────────────────┘

─────────────────────────────────────────────────
Disclaimer: For informational purposes only.
Consult a licensed financial advisor.

PAGE 2: INPUT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR CALCULATION INPUTS
─────────────────────────────────────────────────
Home Price:              $475,000
Down Payment:            $95,000 (20%)
Loan Amount:             $380,000
Loan Term:               30 Years
Interest Rate:           6.75% Fixed
Start Date:              February 2025
Property Tax:            $3,750/year ($312/mo)
Home Insurance:          $996/year ($83/mo)
HOA Fees:                $150/month
PMI:                     N/A (≥20% down)
Extra Payment:           $0/month

PAGE 3: PAYMENT BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Donut Chart - Full Color]
[Monthly Payment Breakdown Bar Chart]
[Principal vs Interest Over Time Chart]

MONTHLY PAYMENT BREAKDOWN
─────────────────────────────────────────────────
Principal & Interest:    $1,847   (74.3%)
Property Tax:              $312   (12.5%)
Home Insurance:             $83    (3.3%)
HOA Fees:                  $150    (6.0%)
PMI:                         $0    (0.0%)
─────────────────────────────────────────────────
TOTAL MONTHLY PAYMENT:   $2,487  (100.0%)

PAGE 4: AMORTIZATION SCHEDULE (YEARLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Year | Beginning Bal | Principal | Interest | End Bal
2025 | $380,000      | $8,432    | $13,732  | $371,568
2026 | $371,568      | $8,943    | $13,221  | $362,625
...

PAGE 5: AMORTIZATION SCHEDULE (MONTHLY - FULL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Complete monthly breakdown]

PAGE 6: IMPORTANT NOTES & DISCLAIMER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Legal disclaimer, data sources, advice to consult
 licensed mortgage broker/financial advisor]
[Link to calcwise.com for recalculation]
[QR code to reload this exact calculation]
```

**PDF Options Modal (shown before download):**

```
┌──────────────────────────────────────────┐
│  📄 PDF DOWNLOAD OPTIONS                  │
│                                          │
│  Report Type:                            │
│  ○ Quick Summary (1-2 pages)             │
│  ● Full Report (5-6 pages) [Recommended] │
│                                          │
│  Include:                                │
│  ☑ Cover page                            │
│  ☑ Input summary                         │
│  ☑ Charts & visualizations               │
│  ☑ Yearly amortization table             │
│  ☑ Monthly amortization table            │
│  ☑ Disclaimer page                       │
│                                          │
│  Personalize (optional):                 │
│  Your Name: [________________]           │
│  Note/Label: [________________]          │
│                                          │
│  Paper Size: [A4 ▼] [Letter] [Legal]    │
│                                          │
│  [CANCEL]        [⬇ DOWNLOAD PDF]       │
└──────────────────────────────────────────┘
```

---

#### 📊 Excel Download (.xlsx)

**Excel File Structure:**

```
WORKBOOK: CalcWise_Mortgage_2025-01-15.xlsx
│
├── Sheet 1: "Summary"
│   ┌────────────────────────────────────────┐
│   │ [CalcWise Logo]     Mortgage Report    │
│   │ Generated: Jan 15, 2025               │
│   │                                        │
│   │ INPUT PARAMETERS                       │
│   │ Home Price          $475,000           │
│   │ Down Payment        $95,000            │
│   │ Loan Amount         $380,000           │
│   │ Interest Rate       6.75%              │
│   │ Loan Term           30 years           │
│   │                                        │
│   │ RESULTS                                │
│   │ Monthly Payment     $2,487             │
│   │ Total Interest      $284,491           │
│   │ Total Cost          $664,491           │
│   │ Payoff Date         June 2055          │
│   └────────────────────────────────────────┘
│
├── Sheet 2: "Monthly Amortization"
│   Month | Date | Payment | Principal | Interest | Balance
│   1     | Feb 2025 | $1,847 | $710 | $1,137 | $379,290
│   2     | Mar 2025 | $1,847 | $713 | $1,134 | $378,577
│   ... (360 rows)
│
├── Sheet 3: "Yearly Summary"
│   Year | Principal Paid | Interest Paid | Balance
│   2025 | $8,432 | $13,732 | $371,568
│   ...
│
├── Sheet 4: "Payment Breakdown"
│   Category | Monthly | Annual | % of Payment
│   P&I      | $1,847  | $22,164 | 74.3%
│   ...
│
└── Sheet 5: "Charts"
    [Embedded Excel charts: Donut, Bar, Line]
```

**Excel Features:**

```
✓ Conditional formatting (red = high interest, green = principal growth)
✓ Frozen headers on scroll
✓ Auto-filter on amortization columns
✓ Color-coded milestone rows (25%, 50%, 75% paid off)
✓ Built-in Excel charts
✓ Print area pre-configured
✓ Custom CalcWise color theme
✓ Protected formula cells (prevent accidental editing)
✓ Data validation notes
```

---

#### 📋 CSV Download

```
Format: calcwise_mortgage_2025-01-15.csv

# CalcWise Mortgage Calculator Export
# Generated: 2025-01-15T15:42:00Z
# Calculator: Basic Mortgage Calculator
# Reference: CW-2025-011547392
#
# INPUTS
Home Price,$475000
Down Payment,$95000
Loan Amount,$380000
Interest Rate,6.75%
Loan Term,30 years
#
# MONTHLY AMORTIZATION
Month,Date,Payment,Principal,Interest,Balance,Cumulative Interest
1,2025-02,1847.34,710.34,1137.00,379289.66,1137.00
2,2025-03,1847.34,712.47,1134.87,378577.19,2271.87
...
```

**CSV Options:**

```
Delimiter: [Comma ▼] [Semicolon] [Tab]
Include: ☑ Monthly data  ☑ Yearly summary  ☑ Input parameters
Encoding: [UTF-8 ▼]
Date Format: [MM/DD/YYYY ▼]
```

---

#### 🖼 PNG / Image Download

**Two Image Formats:**

```
1. RESULTS CARD (Social Media Optimized)
   ┌─────────────────────────────────────┐
   │  📊 MY MORTGAGE BREAKDOWN           │
   │  ─────────────────────────────────  │
   │  Monthly Payment:     $2,487/mo     │
   │  ┌──────────────────────────────┐   │
   │  │    [Donut Chart]             │   │
   │  └──────────────────────────────┘   │
   │  Home: $475K | Rate: 6.75% | 30yr  │
   │  Total Interest: $284,491           │
   │  ─────────────────────────────────  │
   │  calcwise.com | Scan to recalculate │
   │  [QR Code]                          │
   └─────────────────────────────────────┘
   Size: 1200x630px (OG image standard)
   Also: 1080x1080px (Instagram square)

2. FULL REPORT SCREENSHOT
   Full-page render of results panel
   High-resolution: 2x retina
   Size: 800x[auto] px
```

---

#### 🖨 Print View

```
Print-specific CSS:
✓ Remove navigation, ads, sidebar
✓ Expand all collapsed sections
✓ Black & white friendly charts
✓ Page break control (no table rows split)
✓ Show full URL for reference
✓ Include QR code for digital access
✓ Print-friendly font sizes
✓ Margin optimization for A4/Letter

Print Shortcut: Ctrl+P / Cmd+P triggers
                optimized print view automatically
```

---

### 3.5.3 Shareable Link System

#### How It Works

```
┌─────────────────────────────────────────────────────────┐
│                SHAREABLE LINK FLOW                      │
│                                                         │
│  USER CLICKS "🔗 Share Link"                            │
│          │                                              │
│          ▼                                              │
│  System serializes calculation state:                   │
│  {                                                      │
│    calcType: "mortgage",                                │
│    inputs: { homePrice: 475000, ... },                 │
│    country: "us",                                       │
│    timestamp: "2025-01-15T15:42:00Z",                  │
│    version: "1.0"                                       │
│  }                                                      │
│          │                                              │
│          ▼                                              │
│  POST /api/share/create                                 │
│  → Generates unique token (nanoid, 10 chars)           │
│  → Stores in Redis (7-day expiry, free users)          │
│  → Stores in PostgreSQL (permanent, logged users)       │
│          │                                              │
│          ▼                                              │
│  Returns: calcwise.com/share/Xk7mP2nQr5               │
│          │                                              │
│          ▼                                              │
│  SHARE DIALOG shows:                                    │
│  [Copy Link Button] ← One click copy                   │
│  [Open in New Tab]                                      │
│  [Social share buttons]                                 │
│  [QR Code]                                              │
│  [Expiry notice if guest]                               │
└─────────────────────────────────────────────────────────┘
```

#### Shareable Link Page (/share/[token])

```
When recipient opens link:
┌─────────────────────────────────────────────────────────┐
│  🔔 BANNER: "Viewing a calculation shared by [Name]"   │
│             "Shared on Jan 15, 2025"                    │
│             [Make My Own Copy] [Modify This Calc]       │
│                                                         │
│  [FULL CALCULATOR shown with inputs pre-filled]         │
│  [Full results displayed]                               │
│  [Download / Share options available to recipient]      │
│                                                         │
│  SEO: noindex, nofollow (prevent duplicate content)     │
└─────────────────────────────────────────────────────────┘
```

#### Share Link Management

```typescript
interface ShareableLink {
	token: string; // "Xk7mP2nQr5"
	fullUrl: string; // "calcwise.com/share/Xk7mP2nQr5"
	calculationType: string;
	inputSnapshot: object; // Full inputs at time of share
	createdAt: Date;
	expiresAt: Date | null; // null = permanent (premium users)
	createdBy: string | null; // userId or null (guest)
	viewCount: number;
	isPasswordProtected: boolean;
	password?: string; // bcrypt hashed (premium feature)
	allowModification: boolean;
	allowDownload: boolean;
}

// Token link TTL rules:
// Guest users:   7 days
// Free account:  30 days
// Pro account:   Permanent
// Business:      Permanent + custom domain
```

---

### 3.5.4 Email Delivery System

#### Email Report Flow

```
USER CLICKS "📧 Email"
      │
      ▼
┌──────────────────────────────────────┐
│  📧 EMAIL RESULTS                     │
│                                      │
│  Send to:                            │
│  [your@email.com            ]        │
│                                      │
│  Add another recipient:              │
│  [advisor@email.com         ]        │
│  (e.g., your mortgage broker)        │
│                                      │
│  Subject line:                       │
│  [My Mortgage Calculation - Jan 2025]│
│                                      │
│  Personal message (optional):        │
│  [______________________________]    │
│  [______________________________]    │
│                                      │
│  Attach as:                          │
│  ☑ PDF Report    ☑ Link to results  │
│  ☐ Excel File    ☐ CSV Data         │
│                                      │
│  [CANCEL]     [📧 SEND EMAIL]        │
└──────────────────────────────────────┘
```

#### Email Template (HTML)

```html
Subject: Your Mortgage Calculation Results - CalcWise [CalcWise Logo]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ YOUR MORTGAGE CALCULATION RESULTS
Calculated on January 15, 2025 ┌──────────────────────────────────┐ │ Monthly
Payment $2,487/mo │ │ Total Interest $284,491 │ │ Total Cost $664,491 │ │ Payoff
Date June 2055 │ └──────────────────────────────────┘ CALCULATION INPUTS:
───────────────────────────────────── Home Price: $475,000 Down Payment: $95,000
(20%) Interest Rate: 6.75% Fixed Loan Term: 30 Years [VIEW FULL RESULTS ONLINE
→] [Button: calcwise.com/share/Xk7mP2nQr5] [PIE CHART IMAGE EMBEDDED] Full
amortization schedule and detailed breakdown attached as PDF.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ This is for informational purposes only.
Consult a licensed financial professional. Unsubscribe | Privacy Policy
CalcWise.com
```

---

### 3.5.5 Social Sharing System

#### Platform-Specific Configurations

```typescript
interface SocialShareConfig {
	platform: string;
	url: string;
	text: string;
	hashtags?: string[];
	imageUrl?: string;
}

const socialShareConfigs = {
	twitter: {
		text: `Just calculated my mortgage with @CalcWise 🏠
Monthly Payment: $2,487/mo
Total Interest: $284,491
30-year fixed at 6.75%
Calculate yours FREE 👇`,
		hashtags: ["mortgage", "homebuying", "personalfinance"],
		url: "calcwise.com/share/Xk7mP2nQr5",
		characterLimit: 280,
	},

	linkedin: {
		text: `Planning a home purchase and used CalcWise to run the numbers:
    
🏠 Home Price: $475,000
📊 Monthly Payment: $2,487/mo  
💰 Total Interest Over 30 Years: $284,491
📅 Payoff Date: June 2055

The amortization breakdown was eye-opening. 
Try the free calculator: calcwise.com`,
		type: "professional",
	},

	whatsapp: {
		text: `Hey! Check out this mortgage calculation I did:
🏠 Home: $475,000
💵 Monthly: $2,487
📊 Interest: $284,491 over 30 years
View full breakdown: calcwise.com/share/Xk7mP2nQr5`,
		isPersonal: true,
	},

	facebook: {
		url: "calcwise.com/share/Xk7mP2nQr5",
		// Uses OG meta image auto-generated per calculation
	},

	reddit: {
		title: "Used CalcWise to calculate my mortgage - sharing results",
		text: "Full breakdown including amortization schedule...",
		suggestedSubreddits: [
			"personalfinance",
			"FirstTimeHomeBuyer",
			"REBubble",
		],
	},

	telegram: {
		text: "My mortgage calculation from CalcWise 🏠",
		url: "calcwise.com/share/Xk7mP2nQr5",
	},
};
```

#### Social Share Modal UI

```
┌─────────────────────────────────────────────────────┐
│  📤 SHARE YOUR RESULTS                              │
│                                                     │
│  Your shareable link:                               │
│  ┌─────────────────────────────────────────────┐   │
│  │ calcwise.com/share/Xk7mP2nQr5        [Copy]│   │
│  └─────────────────────────────────────────────┘   │
│  ✓ Link copied!    Expires in 30 days              │
│                                                     │
│  SHARE ON SOCIAL MEDIA:                             │
│  ┌──────────────────────────────────────────────┐  │
│  │ [🐦 Twitter/X] [💼 LinkedIn] [📘 Facebook]  │  │
│  │ [💬 WhatsApp]  [✈️ Telegram] [📌 Reddit]    │  │
│  │ [📧 Email]     [💌 iMessage]                 │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  SHARE VIA QR CODE:                                 │
│  ┌───────────────────────────────────────────────┐ │
│  │  [████████████]  Scan to open on mobile       │ │
│  │  [██  ████  ██]  or share with your agent     │ │
│  │  [████████████]  [Download QR Code]           │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  EMBED THIS RESULT: (for website/forum)             │
│  ┌───────────────────────────────────────────────┐ │
│  │ <iframe src="calcwise.com/embed/share/        │ │
│  │  Xk7mP2nQr5" width="600" height="400">       │ │
│  │ </iframe>                              [Copy] │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  [⚙️ Link Settings]  [🔒 Add Password (Pro)]       │
└─────────────────────────────────────────────────────┘
```

---

### 3.5.6 QR Code System

```typescript
interface QRCodeOptions {
	url: string;
	size: number; // 200x200 to 1000x1000
	errorCorrection: "L" | "M" | "Q" | "H";
	format: "PNG" | "SVG";
	includeLabel: boolean;
	labelText: string; // "Scan to view mortgage calculation"
	style: "standard" | "branded"; // branded = with CalcWise logo in center
	foregroundColor: string;
	backgroundColor: string;
}

// QR Code Use Cases:
// 1. Share results with mortgage broker at meeting
// 2. Printed on PDF for quick digital access
// 3. Real estate agent sends to client
// 4. Workshop/seminar presenters
```

**QR Code Download Options:**

```
Size:   [Small 200px] [Medium 400px ●] [Large 800px]
Format: [PNG ●] [SVG]
Style:  [Standard ●] [With Logo (Pro)]
Color:  [Black/White ●] [Custom (Pro)]
[Download QR Code]
[Print QR Code]
```

---

### 3.5.7 Collaborative Sharing (Premium Feature)

```
FEATURE: "Share & Edit Together"

User A calculates → Shares with User B (spouse/partner/advisor)
User B can:
  ✓ View all results
  ✓ Modify inputs (create own version)
  ✓ Add comments/annotations
  ✓ Compare User A vs User B scenarios side-by-side
  ✓ Both get notified of changes

Use cases:
  - Couples deciding on home purchase
  - Client sharing with mortgage broker
  - Financial advisor reviewing with client

Technical: WebSocket or polling for real-time sync
           Operational Transform for concurrent edits
```

---

### 3.5.8 Output Versioning & History

```typescript
interface CalculationHistory {
	id: string;
	userId: string;
	calculationType: string;
	inputs: object;
	outputs: object;
	label: string; // User-set: "Option A - Riverside Drive"
	tags: string[]; // ["primary home", "30yr", "high rate"]
	createdAt: Date;
	updatedAt: Date;
	shareToken?: string;
	downloadHistory: DownloadEvent[];
	shareHistory: ShareEvent[];
	isArchived: boolean;
}

// Dashboard shows timeline of all calculations
// User can label each: "House on Oak Street" vs "Condo Downtown"
// Compare any two saved calculations
// Track how rates changed your calculations over time
```

---

### 3.5.9 Output Action Toolbar Component (Full Spec)

```tsx
// Component: <OutputActionToolbar />
// Appears: Sticky at bottom of results panel on mobile
//          Horizontal bar above amortization table on desktop

interface OutputAction {
	id: string;
	label: string;
	icon: string;
	tier: "free" | "pro"; // Pro actions show lock icon
	action: () => void;
	shortcut?: string; // Keyboard shortcut
}

const outputActions: OutputAction[] = [
	// DOWNLOAD GROUP
	{ id: "pdf-quick", label: "Quick PDF", icon: "📄", tier: "free" },
	{ id: "pdf-full", label: "Full Report", icon: "📑", tier: "free" },
	{ id: "excel", label: "Excel", icon: "📊", tier: "free" },
	{ id: "csv", label: "CSV Data", icon: "📋", tier: "free" },
	{ id: "png-card", label: "Image Card", icon: "🖼", tier: "free" },
	{
		id: "print",
		label: "Print",
		icon: "🖨",
		tier: "free",
		shortcut: "Ctrl+P",
	},

	// SHARE GROUP
	{ id: "share-link", label: "Copy Link", icon: "🔗", tier: "free" },
	{ id: "qr-code", label: "QR Code", icon: "📱", tier: "free" },
	{ id: "email", label: "Email", icon: "📧", tier: "free" },
	{ id: "embed", label: "Embed Code", icon: "⟨/⟩", tier: "free" },

	// SOCIAL GROUP
	{ id: "twitter", label: "Twitter/X", icon: "🐦", tier: "free" },
	{ id: "linkedin", label: "LinkedIn", icon: "💼", tier: "free" },
	{ id: "whatsapp", label: "WhatsApp", icon: "💬", tier: "free" },
	{ id: "facebook", label: "Facebook", icon: "📘", tier: "free" },
	{ id: "telegram", label: "Telegram", icon: "✈️", tier: "free" },
	{ id: "reddit", label: "Reddit", icon: "🟠", tier: "free" },

	// PREMIUM GROUP
	{ id: "save", label: "Save to Account", icon: "💾", tier: "free" },
	{ id: "collaborate", label: "Share & Edit", icon: "👥", tier: "pro" },
	{ id: "password", label: "Password Protect", icon: "🔒", tier: "pro" },
	{ id: "custom-brand", label: "Custom Logo PDF", icon: "🏷", tier: "pro" },
	{ id: "permanent", label: "Permanent Link", icon: "♾️", tier: "pro" },
	{ id: "bulk-export", label: "Bulk Export", icon: "📦", tier: "pro" },
];
```

---

### 3.5.10 Output Viewing Experience

#### Results View Modes

```
Three ways to VIEW results (before downloading):

1. STANDARD VIEW (Default)
   ─────────────────────────────
   Summary cards → Charts → Amortization table
   All on one scrollable page
   Action toolbar sticky on desktop

2. PRESENTATION MODE
   ─────────────────────────────
   Full-screen, distraction-free
   Keyboard arrow navigation between sections:
   → Summary → Charts → Yearly → Monthly
   Great for meetings with advisors
   URL: /calculators/mortgage/basic/#presentation
   Toggle: [▣ Presentation Mode] button

3. PRINT PREVIEW MODE
   ─────────────────────────────
   Shows exact what will be printed/PDF'd
   Page break indicators visible
   Edit options still available
   [Exit Preview] [Print Now] [Save as PDF]
```

#### Interactive Chart Features in Output

```
All charts in output panel:
✓ Hover tooltips with exact values
✓ Click to highlight/isolate data series
✓ Zoom in on specific year range
✓ Toggle between monthly/yearly view
✓ Download individual chart as PNG
✓ Accessible data table toggle
   (for screen readers and data export)
✓ Responsive (redraw on panel resize)

Chart Types:
1. Donut: Monthly payment breakdown (P&I, Tax, Insurance, HOA, PMI)
2. Stacked Bar: Monthly P&I split over loan life
3. Line: Remaining balance decay curve
4. Area: Cumulative interest vs principal paid
5. Milestone markers: 25%, 50%, 75% equity points
```

---

## 3.6 Country-Specific Calculator Variations

### 🇺🇸 United States

```
Loan Types: Conventional, FHA, VA, USDA, Jumbo
Special Inputs:
  - Credit score (FICO)
  - Down payment % (triggers PMI < 20%)
  - Property type (primary/investment/vacation)
  - State property tax rates (auto-populated)
  - State income tax (for tax deduction calc)
  - Mortgage interest deduction calculator
  - FHA MIP (upfront 1.75% + annual 0.55-1.05%)
  - VA funding fee (1.4-3.6%)
  - USDA guarantee fee
```

### 🇬🇧 United Kingdom

```
Loan Types: Repayment, Interest-Only, Tracker, Fixed, Help-to-Buy
Special Inputs:
  - Stamp Duty Land Tax (SDLT) calculator built-in
  - First-time buyer status (SDLT relief)
  - Help-to-Buy Equity Loan %
  - Shared Ownership calculator
  - Stress test rate (+3% BOE stress test)
  - Arrangement fees
  - ERC (Early Repayment Charge) calculator
  - APRC display
```

### 🇨🇦 Canada

```
Special Inputs:
  - CMHC Insurance premium
  - Provincial Land Transfer Tax
  - Stress test qualifying rate
  - First Home Savings Account (FHSA)
  - First-Time Home Buyer Incentive
```

### 🇦🇺 Australia

```
Special Inputs:
  - Stamp Duty by state
  - First Home Owner Grant by state
  - LMI (Lenders Mortgage Insurance)
  - APRA buffer rate (+3%)
  - Negative gearing calculation
  - Comparison Rate display (mandatory)
  - Offset account impact
```

### 🇩🇪 Germany

```
Special Inputs:
  - Grunderwerbsteuer (3.5-6.5%)
  - Notarkosten (~1.5%)
  - KfW subsidy programs
  - Tilgungssatz
  - Sondertilgung option
```

### 🇮🇳 India

```
Special Inputs:
  - EMI calculation
  - Section 80C deduction (max ₹1.5L)
  - Section 24(b) deduction (max ₹2L)
  - PMAY subsidy
  - CIBIL credit score
  - Pre-EMI vs full EMI option
```

### 🇦🇪 UAE

```
Special Inputs:
  - Expatriate vs UAE national LTV
  - Central Bank DBR calculator
  - DLD fee (4%)
  - Islamic finance options
```

### 🕌 Islamic Finance (Global)

```
Products:
  - Murabaha (cost-plus-profit)
  - Diminishing Musharakah
  - Ijara (lease-to-own)
  - Istisna (construction)
No compound interest calculations
True ownership transfer tracking
```

---

## 3.7 Additional Calculator Specifications

### 3.7.1 Affordability Calculator

```
Inputs: Annual income, monthly debts, down payment, credit score
Outputs:
  - Recommended home price range
  - Maximum home price
  - DTI ratio gauge
  - Stress test result
All output/download/share features apply
```

### 3.7.2 Refinance Calculator

```
Inputs: Current balance, current rate, current payment,
        remaining term, new rate, new term, closing costs
Outputs:
  - New monthly payment
  - Monthly savings
  - Break-even timeline chart
  - Lifetime savings
  - Side-by-side comparison table
All output/download/share features apply
```

### 3.7.3 Loan Comparison Tool

```
Compare up to 3 loan scenarios simultaneously
All three exportable in single PDF/Excel
Side-by-side social share card
"Best Pick" AI recommendation included in export
```

---

## 3.8 UI/UX Requirements

### 3.8.1 Design System

```
Colors:
  Primary:   #2563EB (Trust Blue)
  Secondary: #10B981 (Financial Green)
  Warning:   #F59E0B (Caution Amber)
  Danger:    #EF4444 (Alert Red)
  Neutral:   #F8FAFC → #0F172A

Typography:
  Headings:  Inter (700, 600)
  Body:      Inter (400, 500)
  Numbers:   JetBrains Mono (financial figures)

Spacing: 4px grid system
Border radius: 8px (cards), 4px (inputs)
```

### 3.8.2 Layout Principles

```
Desktop (>1024px):
  [Input Panel Left 40%] | [Results Panel Right 60%]
  Real-time calculation updates
  Sticky Output Action Toolbar in results panel

Tablet (768-1024px):
  Full-width stacked
  Floating Share/Download FAB button

Mobile (<768px):
  Input → Calculate → Results
  Bottom Sheet: Download/Share options
  Swipeable chart carousel
  "Share" as primary CTA (prominent)
```

### 3.8.3 Output-Specific UX Patterns

```
✓ "Results Ready" toast notification after calculation
✓ Smooth scroll to results section
✓ Highlight key numbers with subtle animation
✓ One-click copy for individual values
✓ Long-press on mobile for quick share
✓ Keyboard shortcut: Ctrl+D = Download PDF
✓ Keyboard shortcut: Ctrl+S = Save to account
✓ Keyboard shortcut: Ctrl+E = Email results
✓ Keyboard shortcut: Ctrl+P = Print
✓ Results persist on page refresh (localStorage)
✓ "Last calculated: X minutes ago" indicator
✓ Warning banner if inputs changed since last download
```

---

## 3.9 SEO Architecture

### 3.9.1 On-Page SEO Requirements

```
Per Calculator Page:
✓ Unique H1 with primary keyword
✓ 800-1200 word supporting content
✓ FAQ section (5-10 questions with schema markup)
✓ "How to use" guide
✓ Related calculators internal links
✓ Canonical URLs
✓ Open Graph tags (dynamic OG image per calculation)
✓ Twitter Card tags
✓ Schema: SoftwareApplication, FAQPage, BreadcrumbList
```

### 3.9.2 Dynamic OG Images (SEO + Sharing Superpower)

```
UNIQUE FEATURE: Auto-generated Open Graph images
per shareable link, showing actual numbers

When user shares calcwise.com/share/Xk7mP2nQr5:
  → Facebook/LinkedIn/Slack unfurl shows:
    ┌───────────────────────────────┐
    │ 🏠 MORTGAGE CALCULATION       │
    │ Monthly: $2,487/mo            │
    │ Total Interest: $284,491      │
    │ 30yr Fixed at 6.75%           │
    │ [CalcWise Logo]               │
    └───────────────────────────────┘
  → 10x more clicks than plain URL share
  → Implemented via @vercel/og
```

### 3.9.3 Programmatic SEO Pages

```
Pattern: /mortgage-calculator/[country]/[state-city]/
Target: 10,000+ indexed pages within 12 months
Each page: Localized data + 500 words unique content
```

---

## 3.10 Monetization Requirements

### 3.10.1 Google AdSense Placements

```
Calculator Pages:
  - Below inputs (300x250) — never blocks results
  - Between charts and amortization table (728x90)
  - Right rail desktop (300x600)
  - Below action toolbar (300x250)
  - After full amortization table (336x280)

Download/Share Flow:
  - Pre-download interstitial (3-second countdown)
    "Your PDF is generating... [Ad]"
    (Monetizes download action without blocking)
  - Post-share confirmation page (728x90)

⚠️ Critical Rules:
  - NEVER cover input fields
  - NEVER cover output results
  - NEVER cover download/share buttons
  - No ads in print view or PDF
  - No ads during active presentation mode
```

### 3.10.2 Affiliate Revenue

```
Contextual CTAs after output:
  "Today's Best Rates from Our Partners"
  → After mortgage calc: Lenders (Rocket, Better, LendingTree)
  → After affordability: Pre-approval CTAs
  → After all calcs: Insurance quotes
  → All calcs: Credit score check CTA

Revenue model:
  Per lead: $10-50
  Per funded loan: $500-2,000
```

### 3.10.3 Premium Subscription

```
Free:
  ✓ All calculators
  ✓ PDF & Excel download (with CalcWise branding)
  ✓ Basic shareable links (7-day expiry)
  ✓ QR code generation
  ✓ Social sharing
  ✓ Email results (to self only)
  ✓ 3 saved calculations
  ✓ Standard print view

Pro ($9/month):
  ✓ All Free features
  ✓ Permanent shareable links
  ✓ Password-protected links
  ✓ Custom name/logo on PDF (white-label)
  ✓ Email to multiple recipients
  ✓ Unlimited saved calculations
  ✓ Collaborative share & edit
  ✓ Rate alerts (email + SMS)
  ✓ Bulk download (all calculations at once)
  ✓ Advanced Excel (embedded charts)
  ✓ Branded social share cards
  ✓ Priority support

Business ($29/month):
  ✓ All Pro features
  ✓ White-label embeds (your domain)
  ✓ API access
  ✓ Client management dashboard
  ✓ Bulk client report generation
  ✓ Custom branding on all outputs
  ✓ Team member accounts (up to 5)
  ✓ Webhook notifications
  ✓ CRM integration (Zapier/HubSpot)
```

---

## 3.11 Performance Requirements

| Metric                 | Target  | Priority |
| ---------------------- | ------- | -------- |
| Core Web Vitals LCP    | < 2.5s  | Critical |
| Core Web Vitals CLS    | < 0.1   | Critical |
| Core Web Vitals FID    | < 100ms | Critical |
| Calculator Response    | < 100ms | Critical |
| PDF Generation (Quick) | < 2s    | High     |
| PDF Generation (Full)  | < 8s    | High     |
| Excel Generation       | < 3s    | High     |
| Share Link Creation    | < 500ms | High     |
| Image Generation       | < 2s    | High     |
| QR Code Generation     | < 200ms | High     |
| Email Delivery         | < 30s   | Medium   |
| Page Load (3G)         | < 2s    | High     |
| Lighthouse Score       | > 90    | High     |
| Uptime SLA             | 99.9%   | Critical |

---

## 3.12 Analytics & Tracking

```javascript
events: {
  // Calculator core
  'calculation_performed': { calc_type, loan_amount, country },

  // Download events
  'download_initiated': { format, calc_type, mode },
  'download_completed': { format, file_size_kb, duration_ms },
  'download_failed': { format, error_reason },
  'pdf_options_opened': { calc_type },
  'print_triggered': { calc_type },

  // Share events
  'share_link_created': { calc_type, user_type },
  'share_link_copied': { calc_type },
  'share_link_opened': { token, is_owner },
  'qr_code_generated': { calc_type, size },
  'qr_code_downloaded': { format },
  'email_sent': { recipient_count, attachments },
  'email_failed': { reason },

  // Social share events
  'social_share_clicked': { platform, calc_type },
  'social_share_completed': { platform },
  'embed_code_copied': { calc_type },

  // Collaboration
  'collaborative_share_created': {},
  'collaborative_edit_made': { editor_type },

  // Premium conversion funnel
  'pro_feature_blocked': { feature, calc_type },
  'upgrade_modal_shown': { trigger_feature },
  'upgrade_clicked': { plan },
  'upgrade_completed': { plan, revenue }
}
```

---

## 3.13 Security & Compliance

```
Share Links:
✓ Tokens are cryptographically random (not sequential)
✓ Rate limiting: 10 share links per hour per IP (guest)
✓ No PII stored in share link data
✓ Password-protected links: bcrypt hashed
✓ Expired links return 410 Gone (not 404)
✓ Abuse reporting on share pages

Downloads:
✓ No server-side file storage for guest users
  (generated client-side, never touches server)
✓ Authenticated users: S3 with signed URLs (15min expiry)
✓ Virus scan on any server-side generated files
✓ Rate limiting: 20 downloads per hour per IP

Email:
✓ SPF, DKIM, DMARC configured
✓ Rate limiting: 5 emails per hour per IP
✓ Unsubscribe mechanism in every email
✓ GDPR: explicit consent before email capture
✓ Email verification before delivery
✓ No email address stored without consent

General:
✓ HTTPS everywhere (HSTS)
✓ CSP headers
✓ Input sanitization
✓ GDPR + CCPA compliant
✓ Cookie consent management
✓ MFA support for accounts
```

---

## 3.14 Accessibility (Output & Share Features)

```
Downloads:
✓ PDF tagged for screen readers (PDF/UA standard)
✓ Excel includes accessible table structure
✓ Color-blind friendly chart palettes
✓ Data tables available as alternative to charts

Sharing:
✓ Share modal keyboard navigable
✓ Copy link button has ARIA label
✓ QR code has text alternative
✓ Social buttons announce platform name
✓ Focus returns to trigger button on modal close

Charts:
✓ All charts have data table toggle
✓ ARIA roles on chart containers
✓ Color + pattern differentiation (not color alone)
```

---

## 3.15 Internationalization (i18n)

```
Phase 1 (Launch): English only, multi-country logic
Phase 2 (Month 6): Spanish, French, German, Hindi, Arabic
Phase 3 (Month 12): Portuguese, Japanese, Chinese, Dutch

Download localization:
✓ PDF in user's language
✓ Currency formatting per locale
✓ Date formatting per locale
✓ Number formatting per locale
✓ Decimal separator (. vs ,)
✓ RTL PDF support for Arabic (Phase 2)
```

---

# PART 4: DEVELOPMENT PHASES & TIMELINE

## Phase 1: MVP (Months 1-3)

```
✅ Core mortgage calculator (US focus)
✅ Affordability + Refinance calculators
✅ Auto + Personal loan calculators
✅ Basic UK, Canada, Australia variations
✅ OUTPUT SYSTEM:
   ✅ Quick PDF download
   ✅ CSV download
   ✅ Basic shareable links (7-day)
   ✅ Email to self
   ✅ Twitter + WhatsApp share
   ✅ Print view
   ✅ PNG image download
✅ Google AdSense integration
✅ SEO fundamentals (20 landing pages)
✅ Mobile responsive
✅ GA4 + basic analytics events
Budget: $15,000-25,000 dev | 3-4 months solo
```

## Phase 2: Growth (Months 4-6)

```
✅ All country-specific calculators (8 countries)
✅ Loan comparison tool
✅ Rate data integration
✅ User accounts + saved calculations
✅ Rate alert system
✅ Embeddable widget system
✅ OUTPUT SYSTEM (Phase 2):
   ✅ Full server-rendered PDF (Puppeteer)
   ✅ Excel with charts
   ✅ QR code generation + download
   ✅ All social platforms (LinkedIn, Facebook, Reddit)
   ✅ Email to multiple recipients with attachments
   ✅ Dynamic OG images for share links
   ✅ Presentation mode
   ✅ Permanent links (Pro users)
   ✅ Password-protected links (Pro)
✅ Programmatic SEO (5,000 pages)
✅ Affiliate integration
✅ Islamic finance calculators
✅ Blog/content platform
Budget: $10,000-15,000 additional
```

## Phase 3: Moat (Months 7-12)

```
✅ AI Scenario Engine
✅ Financial Health Score
✅ Premium subscription full launch
✅ OUTPUT SYSTEM (Phase 3):
   ✅ Collaborative share & edit
   ✅ White-label PDF (Business tier)
   ✅ Bulk export
   ✅ API for report generation
   ✅ CRM integrations (Zapier, HubSpot)
   ✅ Calculation history dashboard
   ✅ Version comparison (how has rate changed?)
✅ API for developers
✅ Multi-language (ES, FR, HI, AR)
✅ Mobile app (React Native)
✅ Programmatic SEO (10,000+ pages)
Budget: $20,000-30,000 additional
```

---

# PART 5: SUCCESS METRICS

## Traffic KPIs (12-Month Targets)

```
Month 3:  10,000 monthly organic visitors
Month 6:  50,000 monthly organic visitors
Month 9:  150,000 monthly organic visitors
Month 12: 400,000 monthly organic visitors
```

## Output & Sharing KPIs

```
Downloads per visitor:         > 15%
Share link creation rate:      > 8%
Social share rate:             > 5%
Email delivery rate:           > 3%
Shared link click-through:     > 40%
PDF completion rate:           > 90%
Download-to-registration:      > 12%
(Users who download then sign up)
```

## Revenue KPIs

```
Month 3:  $200-500/month (AdSense only)
Month 6:  $2,000-5,000/month (AdSense + Affiliate)
Month 9:  $8,000-15,000/month (All channels)
Month 12: $20,000-40,000/month (All + Premium)
```

## Engagement KPIs

```
Bounce Rate:              < 45%
Avg. Session Duration:    > 3.5 minutes
Pages Per Session:        > 2.5
Calculation-to-Visit:     > 65%
Return Visitor Rate:      > 30%
Share-driven Return:      > 20% of traffic from shared links
```

---

# PART 6: LAUNCH CHECKLIST

```
Pre-Launch:
□ All calculators tested with edge cases
□ PDF output tested across all calculator types
□ Excel output tested in Excel 2016+ and Google Sheets
□ CSV import tested in Excel, Google Sheets, Numbers
□ PNG export resolution verified (retina displays)
□ Print view tested in Chrome, Firefox, Safari
□ Share links tested (create, open, expire)
□ QR codes tested (scan with iOS + Android)
□ Email delivery tested (Gmail, Outlook, Apple Mail)
□ Social share previews verified (OG images)
□ All social share text pre-tested for character limits
□ Download rate limiting tested
□ Share link security (expiry, password protection)
□ Cross-browser: Chrome, Firefox, Safari, Edge
□ Mobile: iOS Safari, Android Chrome
□ Google Search Console configured
□ Sitemap.xml submitted
□ AdSense account approved
□ Ad placements don't cover calculator or outputs
□ Privacy Policy covers share + email data
□ Cookie consent implemented
□ SSL certificate active
□ Page speed > 90 on mobile
□ Core Web Vitals all green
□ GDPR compliance for EU email capture
□ Unsubscribe link in all emails

Post-Launch (Week 1):
□ Monitor download success rates
□ Monitor share link creation
□ Check email delivery rates
□ Monitor PDF generation errors
□ Verify social share click-through rates
□ Check GA4 download/share events firing
□ Monitor AdSense policy compliance
□ Submit to Product Hunt
□ Outreach to financial blogs for widget adoption
□ Begin link-building campaign
```

---

_PRD Version 2.0 — Living Document_
_Next review: After Phase 1 launch_
_Owner: Product Team_
_Last Updated: 2025_
