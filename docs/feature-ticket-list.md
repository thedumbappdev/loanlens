# Feature Ticket List - Mortgage & Loan Calculator Web App

**Stack:** Next.js, Tailwind CSS, Recharts, jsPDF + html2canvas, Vercel
**Build Order:** Tickets are sequenced so foundational work unblocks dependent features. Each ticket is written to be used directly as a prompt for an AI coding tool.

---

## PHASE 1 - FOUNDATION

---

### TICKET-001 | Project Scaffold & Technical Foundation

**Priority:** Must-Have for Launch
**Feature ID:** F-081

**Description:**
Bootstrap the Next.js application with all foundational tooling configured and ready for development. This is the base layer every other ticket depends on. Nothing else can be built until this is done.

**What to build:**
Set up a new Next.js 14 app (App Router) with TypeScript. Install and configure Tailwind CSS. Set up the folder structure as follows: `/app` for routes, `/components` for shared UI components, `/lib` for pure calculation logic and utility functions, `/data` for the country JSON data file, `/hooks` for custom React hooks, and `/public` for static assets. Configure absolute imports with path aliases. Set up ESLint and Prettier with a consistent code style config. Create a base layout component that includes a `<head>` with viewport meta tags set for mobile-first rendering. Ensure `inputmode="decimal"` is available as a pattern. Configure the system font stack in Tailwind - no Google Fonts. Create a `README.md` with setup instructions. Configure Vercel deployment with a `vercel.json` if needed for edge function support.

**Acceptance Criteria:**
- [ ] `npm run dev` starts the app with no errors
- [ ] Tailwind CSS is working and a test utility class renders correctly
- [ ] TypeScript compiles with no errors on a sample typed component
- [ ] Folder structure matches specification above
- [ ] App is deployable to Vercel and accessible via preview URL
- [ ] No Google Fonts are loaded - system font stack is used
- [ ] Lighthouse mobile score baseline is captured (even on empty app)
- [ ] ESLint passes with zero warnings on initial scaffold

**Dependencies:** None - this is the starting point.

---

### TICKET-002 | Country Data JSON Architecture

**Priority:** Must-Have for Launch
**Feature ID:** F-001, F-002, F-003

**Description:**
Build the single source of truth for all locale-specific behavior. This JSON file drives currency formatting, benchmark interest rates, loan term defaults, regional property tax rates, mortgage insurance labels, and terminology across the entire app. Every calculator, every landing page, and every tooltip will read from this file.

**What to build:**
Create `/data/countries.json` following the exact schema defined in PRD section 11.1. The file must include all 15 V1 countries: USA, UK, Canada, Australia, New Zealand, UAE, India, Singapore, Ireland, Germany, France, South Africa, Philippines, Malaysia, and Mexico. For each country include: `code`, `name`, `currency` object (with `code`, `symbol`, `locale` for `Intl.NumberFormat`), `benchmarkRate` (number), `benchmarkRateLabel` (string), `benchmarkRateUpdated` (ISO date string), `defaultLoanTerm` (number in years), `loanTermOptions` (array of numbers), `mortgageInsuranceLabel` (e.g., "PMI" for US, "LMI" for AU), `mortgageInsuranceThreshold` (default 0.80), and a `terminology` object with keys: `downPayment`, `propertyTax`, `homeownersInsurance`, `mortgageInsurance`. For regions: include all 50 US states each with `code`, `name`, `propertyTaxRate` (decimal). Include all Australian states, Canadian provinces, and UK nations (England, Scotland, Wales, Northern Ireland) with relevant `propertyTaxRate` and `stampDutyEnabled` boolean. Use the rate reference table in the PRD Appendix as starting defaults. Create a TypeScript types file at `/lib/types/country.ts` that fully types the entire JSON structure. Create a `/lib/data/getCountryData.ts` utility that exports functions: `getAllCountries()`, `getCountryByCode(code: string)`, `getRegionsByCountry(countryCode: string)`, `getRegionByCode(countryCode: string, regionCode: string)`.

**Acceptance Criteria:**
- [ ] All 15 countries are present with complete data matching PRD Appendix rates
- [ ] All 50 US states have a `propertyTaxRate` value (Texas = 0.018, Hawaii = 0.0028 as spot checks)
- [ ] All Australian states, Canadian provinces, and UK nations are present
- [ ] TypeScript types cover the full JSON structure with no `any` types
- [ ] `getCountryByCode("US")` returns the correct US object
- [ ] `getRegionsByCountry("AU")` returns all Australian states
- [ ] JSON is valid and parses without errors
- [ ] Currency locale strings work with `Intl.NumberFormat` for all 15 countries

**Dependencies:** TICKET-001

---

### TICKET-003 | Core Mortgage Calculation Engine

**Priority:** Must-Have for Launch
**Feature ID:** F-010

**Description:**
Build the pure calculation functions that power the mortgage calculator. These are pure TypeScript functions with zero UI dependencies - they take inputs and return outputs. They must be unit-tested. Every result panel, chart, and amortization table in the app depends on these functions being accurate.

**What to build:**
Create `/lib/calculators/mortgage.ts`. Build and export the following functions:

`calculateMonthlyPayment(principal: number, annualRate: number, termYears: number): number` - standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1] where r = monthly rate, n = total payments.

`calculatePMI(propertyPrice: number, loanAmount: number, annualPMIRate?: number): number` - returns monthly PMI cost. Auto-calculates if LTV > 80%. Default PMI rate is 0.85% annually if not provided.

`calculateLTV(loanAmount: number, propertyPrice: number): number` - returns LTV as a decimal.

`calculateTotalMonthlyPayment(inputs: MortgageInputs): MonthlyPaymentBreakdown` - returns an object with: `principal`, `interest`, `propertyTax`, `insurance`, `pmi`, `hoa`, `total`.

`generateAmortizationSchedule(inputs: MortgageInputs): AmortizationRow[]` - generates full monthly schedule. Each row: `month`, `year`, `paymentDate`, `payment`, `principal`, `interest`, `balance`, `cumulativeInterest`, `cumulativePrincipal`, `pmiActive` (boolean).

`calculatePayoffDate(startDate: string, termYears: number, extraMonthlyPayment: number, schedule: AmortizationRow[]): Date` - returns actual payoff date accounting for extra payments.

`calculateTotals(schedule: AmortizationRow[]): LoanTotals` - returns `totalInterest`, `totalCost`, `totalPayments`.

`calculateEarlyPayoffSavings(baseSchedule: AmortizationRow[], extraPayment: number, inputs: MortgageInputs): EarlyPayoffResult` - returns months saved and interest saved by making extra payments.

Define all input/output TypeScript interfaces in `/lib/types/calculator.ts`. Write unit tests using Jest or Vitest for each function covering: standard 30yr fixed, 15yr fixed, high LTV (PMI triggered), PMI cutoff at 80% LTV, extra payment acceleration, and zero down payment edge case.

**Acceptance Criteria:**
- [ ] `calculateMonthlyPayment(400000, 6.85, 30)` returns approximately $2,630 (within $1)
- [ ] `calculateMonthlyPayment(400000, 6.85, 15)` returns approximately $3,561 (within $1)
- [ ] Amortization schedule for 30yr loan has exactly 360 rows (no extra payment)
- [ ] Month 1 interest equals `loanAmount * (annualRate/12/100)` exactly
- [ ] Final row balance is $0 (or within $0.01 of rounding)
- [ ] PMI is active when LTV > 80%, drops off when balance crosses 80% LTV threshold
- [ ] Extra payment scenario reduces term and total interest
- [ ] All functions have TypeScript return types - no `any`
- [ ] All unit tests pass

**Dependencies:** TICKET-001, TICKET-002 (for types)

---

### TICKET-004 | IP Geolocation & Country Detection

**Priority:** Must-Have for Launch
**Feature ID:** F-001

**Description:**
Auto-detect the user's country on first page load using IP geolocation at the edge, then fall back gracefully if detection fails. This drives the initial defaults loaded into the calculator without the user having to do anything. It is a core part of the product's "just works globally" promise.

**What to build:**
Create a Vercel Edge Middleware at `/middleware.ts` that reads the `x-vercel-ip-country` header (available automatically on Vercel's edge network) and sets a cookie named `detected_country` with the 2-letter ISO country code. If the header is absent or the country is not in the supported 15-country list, default to "US". Create a Next.js API route at `/app/api/geo/route.ts` that returns the detected country code as JSON: `{ country: "AU" }`. This API reads from the cookie set by middleware. Create a custom React hook at `/hooks/useCountryDetection.ts` that: calls the geo API on mount, returns `{ detectedCountry, isLoading, error }`, checks localStorage for a previously saved user country preference (`user_country_preference`), and if a saved preference exists uses that instead of the detected country. The hook should not re-call the API on every render - cache in state. Create a utility function `isSupportedCountry(code: string): boolean` that checks against the 15 V1 country codes.

**Acceptance Criteria:**
- [ ] When accessed from an Australian IP, `detectedCountry` returns "AU"
- [ ] When accessed from a US IP, `detectedCountry` returns "US"
- [ ] When country is not in supported list, falls back to "US"
- [ ] If user has a saved preference in localStorage, that overrides IP detection
- [ ] The geo API call does not cause a flash of wrong currency on load
- [ ] `isLoading` is true while the API call is in flight
- [ ] Works in local development with a mock fallback (defaults to "US" when header is absent)
- [ ] No error is thrown if the middleware header is absent

**Dependencies:** TICKET-001, TICKET-002

---

### TICKET-005 | Country & Region Selector UI Component

**Priority:** Must-Have for Launch
**Feature ID:** F-001, F-002

**Description:**
Build the searchable country selector and cascading region/state selector UI components. These are used in the persistent navigation and at the top of every calculator. When a user changes their country, all calculator defaults update instantly. This is the entry point to the geo-adaptation moat.

**What to build:**
Create `/components/selectors/CountrySelector.tsx` - a searchable dropdown (combobox pattern) that shows a flag emoji and country name for each of the 15 supported countries. On mobile, it should open a bottom sheet modal with a search input. On desktop, it renders as an inline dropdown. Use the country data from TICKET-002. When a country is selected: save the selection to localStorage under key `user_country_preference`, call an `onCountryChange(countryCode: string)` callback prop, and show a brief confirmation toast: "Defaults loaded for [Country Name] [Flag]".

Create `/components/selectors/RegionSelector.tsx` - a standard dropdown that appears only after a country is selected. Populated from `getRegionsByCountry(countryCode)`. Required for US, AU, CA, UK. Optional/hidden for other countries. Calls `onRegionChange(regionCode: string)` callback on selection. Label changes based on country: "State" for US/AU, "Province" for CA, "Nation" for UK.

Create `/components/selectors/LocationBar.tsx` - a compact component that combines both selectors for placement in the top navigation and above each calculator. Shows currently selected country flag + name + region name when set. Tapping opens the country selector.

**Acceptance Criteria:**
- [ ] Selecting "Australia" loads AUD currency and populates Australian states in region selector
- [ ] Selecting "United States" shows all 50 states in the region dropdown
- [ ] Region selector label says "State" for US, "Province" for Canada, "Nation" for UK
- [ ] Country preference persists in localStorage and is restored on next visit
- [ ] Search input in country selector filters results in real time
- [ ] Toast confirmation appears after country selection
- [ ] Region selector is hidden for countries that don't have region data (Germany, France, etc.)
- [ ] On mobile, country selector opens as a bottom sheet
- [ ] Touch targets are minimum 44px height on mobile

**Dependencies:** TICKET-001, TICKET-002, TICKET-004

---

## PHASE 2 - CORE CALCULATOR

---

### TICKET-006 | Mortgage Calculator Input UI

**Priority:** Must-Have for Launch
**Feature ID:** F-010

**Description:**
Build the complete input panel for the primary mortgage calculator. This is the most important screen in the app - it must be fast, thumb-friendly, and feel effortless on mobile. All inputs must update results in real time with no submit button required.

**What to build:**
Create `/components/calculators/mortgage/MortgageInputs.tsx`. Build the following input fields:

**Home Price:** A combined slider + text input. The slider range should be $50,000–$5,000,000 (adjustable per country median). The text input accepts formatted numbers. They stay in sync bidirectionally. Pre-fill with the country's median home price (store in country data JSON). Use `inputmode="decimal"` on the text input.

**Down Payment:** Dual-mode input. Toggle between dollar amount and percentage. When dollar amount changes, percentage updates and vice versa. Pre-fill at 20%. Show LTV ratio beneath: "Loan-to-Value: 80%".

**Loan Term:** Dropdown showing the `loanTermOptions` array from country data. Default to `defaultLoanTerm` from country data. Include "Custom" option that reveals a number input.

**Interest Rate:** Number input with two decimal places. Below the input show a small button: "Use [Country] average ([rate]%)" that pre-fills the benchmark rate from country data, along with the `benchmarkRateUpdated` date.

**Loan Type:** Segmented control / radio button group: "Fixed Rate", "Variable/ARM", "Interest-Only". Default to "Fixed Rate".

**Start Date:** Month and year picker. Default to current month + 1.

**Advanced Options Section:** A collapsible section triggered by a "Show advanced options" toggle button. Inside: Property Tax Rate (pre-filled from region data, editable), Annual Homeowners Insurance (pre-filled at 0.5% of home value estimate, editable), PMI/LMI toggle (auto-on when LTV > 80%, label changes by country), HOA/Body Corporate monthly fee (default $0), Extra Monthly Payment (default $0), Credit Score Range (dropdown: Excellent 760+, Good 700-759, Fair 640-699, Poor <640 - for informational context only, not used in calculation).

All inputs must call a shared `onInputChange` callback with the full updated input state on every change. Debounce the callback by 150ms to avoid excessive re-renders.

**Acceptance Criteria:**
- [ ] Slider and text input for home price stay in sync - changing one updates the other instantly
- [ ] Down payment dollar and percentage toggle work bidirectionally
- [ ] LTV ratio displays and updates in real time
- [ ] Loan term dropdown shows country-specific options (30yr default for US, 25yr for UK)
- [ ] "Use current average rate" button pre-fills from country JSON with visible last-updated date
- [ ] PMI toggle auto-enables when LTV > 80% and auto-disables when LTV ≤ 80%
- [ ] Advanced section collapses and expands smoothly
- [ ] Property Tax and Insurance pre-fill from selected region data
- [ ] All number inputs trigger decimal keyboard on iOS and Android
- [ ] No horizontal scrolling at any viewport width
- [ ] All inputs are accessible via keyboard with visible focus states
- [ ] All inputs have ARIA labels

**Dependencies:** TICKET-001, TICKET-002, TICKET-003, TICKET-005

---

### TICKET-007 | Real-Time Results Panel & Sticky Summary

**Priority:** Must-Have for Launch
**Feature ID:** F-010

**Description:**
Build the results display system. On mobile, a sticky bottom bar shows the headline monthly payment at all times while the user scrolls through inputs. The full results panel expands below the inputs and shows the complete breakdown. Results must recalculate and re-render within 100ms of any input change.

**What to build:**
Create `/components/calculators/mortgage/MortgageResults.tsx` as the full results panel. It receives the calculation output from TICKET-003 functions and renders:

**Summary Card:** Large monthly payment total (styled prominently, formatted in local currency), then a sub-row showing the breakdown: "Principal & Interest: $X | Tax: $X | Insurance: $X | PMI: $X | HOA: $X". Each item in the breakdown should be tappable to reveal a short explanation tooltip.

**Totals Card:** Three stat blocks - Total Interest Paid, Total Cost of Loan, Payoff Date. Each formatted clearly. Payoff Date shown as "Month YYYY" (e.g., "October 2054").

**LTV Indicator:** A horizontal progress bar showing current LTV %. Color-coded: green below 80%, yellow 80-90%, red above 90%. Label: "Loan-to-Value: X% - PMI required above 80%".

**Donut Chart:** A donut/pie chart showing the proportion of the total monthly payment split across Principal & Interest, Tax, Insurance, PMI, HOA. Use Recharts. On mobile, tapping a segment highlights it and shows the dollar amount.

Create `/components/calculators/mortgage/StickyResultBar.tsx` - a fixed-bottom bar (mobile only, hidden on desktop ≥ 768px). Shows: "Monthly Payment: $X,XXX" in large text + a small breakdown line. A "View Full Results" button scrolls the page down to the full results panel. This bar must not overlap the bottom navigation on mobile - account for bottom nav height.

Wire everything together: inputs from TICKET-006 feed the calculation engine from TICKET-003, outputs render in both components. Use a React context or a custom hook `useMortgageCalculator` to share state between input and result components.

**Acceptance Criteria:**
- [ ] Monthly payment updates within 100ms of any input change
- [ ] All currency values are formatted correctly in the selected country's locale (e.g., "A$" for Australia, "£" for UK)
- [ ] Donut chart renders and is touch-interactive on mobile
- [ ] Sticky bar is visible at all times while scrolling inputs on mobile
- [ ] "View Full Results" button scrolls to results smoothly
- [ ] Payoff date is accurate (verify: $400k, 6.85%, 30yr, start Jan 2025 = approximately Dec 2054)
- [ ] PMI line disappears from breakdown when LTV ≤ 80%
- [ ] LTV progress bar color changes correctly at 80% and 90% thresholds
- [ ] Sticky bar does not overlap bottom navigation
- [ ] All result values have ARIA labels

**Dependencies:** TICKET-003, TICKET-006

---

### TICKET-008 | Amortization Schedule Table

**Priority:** Must-Have for Launch
**Feature ID:** F-011

**Description:**
Build the amortization schedule table component. Rendering 360 rows simultaneously on mobile will kill performance, so this must be virtualized or paginated. The table must be togglable between monthly and annual views.

**What to build:**
Create `/components/calculators/mortgage/AmortizationTable.tsx`. Receive the full `AmortizationRow[]` array from TICKET-003 as a prop.

**View Toggle:** A segmented control at the top: "Monthly" | "Annual". Monthly shows every row. Annual aggregates rows into yearly summaries (sum principal paid, sum interest paid, year-end balance, year-end cumulative interest).

**Table Columns - Monthly view:** Month | Date | Payment | Principal | Interest | Balance | Cumulative Interest. **Annual view:** Year | Total Paid | Principal | Interest | Year-End Balance | Cumulative Interest.

**PMI Indicator:** In monthly view, rows where `pmiActive = true` show a small "PMI" badge in the Payment column. The first row where PMI drops off shows a highlighted row with the label "PMI ends here".

**"You Are Here" Row:** If the start date is the current month or in the past, highlight the current month's row with a distinct background color and a small "← Today" label.

**Pagination:** Monthly view is paginated - show 24 rows per page with Previous/Next buttons and a "Jump to year" dropdown. Do not render all 360 rows in the DOM at once. Annual view shows all years at once (maximum 35 rows).

**Expand/Collapse:** The entire table is collapsed by default behind a "View Amortization Schedule" button. Clicking expands it. This avoids overwhelming users who don't need the detail.

**Acceptance Criteria:**
- [ ] Monthly and Annual toggle works correctly
- [ ] Annual view correctly aggregates monthly data (spot check: Year 1 total interest = sum of 12 monthly interest values)
- [ ] PMI badge shows on rows where PMI is active
- [ ] PMI drop-off row is highlighted
- [ ] "You are here" row appears correctly when start date is current month
- [ ] Monthly view is paginated - only 24 rows in DOM at any time
- [ ] "Jump to year" dropdown navigates to the correct page
- [ ] Table scrolls horizontally on mobile if needed (within a scroll container, not the whole page)
- [ ] Final row balance is $0 (or within rounding tolerance)
- [ ] Table is collapsed by default and expands on button click

**Dependencies:** TICKET-003, TICKET-007

---

### TICKET-009 | Amortization Chart

**Priority:** Must-Have for Launch
**Feature ID:** F-012

**Description:**
Build the interactive amortization chart that visualizes the loan balance, principal paid, and interest paid over time. This visual makes the cost of a loan emotionally real for users in a way a table cannot.

**What to build:**
Create `/components/calculators/mortgage/AmortizationChart.tsx`. Use Recharts. Lazy-load this component - it must not be part of the initial JavaScript bundle. Use Next.js `dynamic()` with `{ ssr: false }`.

**Chart Type:** Area chart with three data series plotted over time (X axis = years, Y axis = dollars in local currency): (1) Remaining Loan Balance - descending area, (2) Cumulative Principal Paid - ascending line, (3) Cumulative Interest Paid - ascending line.

**Equity Milestones:** Draw vertical reference lines (dashed) at the points where the user reaches 25%, 50%, 75%, and 100% equity. Label each line: "25% equity - Year X".

**Touch Interaction (Mobile):** On tap/touch, show a tooltip at that X position with: Remaining Balance, Cumulative Principal, Cumulative Interest, and Current Month/Year. Use Recharts' `<Tooltip>` with a custom renderer.

**Responsive:** Chart width is 100% of its container. Height is fixed at 280px on mobile, 360px on desktop. X axis labels show years only (not months) to avoid crowding. Y axis labels formatted in compact currency (e.g., "$400K", "£250K").

**Data Source:** Use the annual aggregated view of the amortization schedule from TICKET-003 (one data point per year, 30 points max) rather than 360 monthly points - this keeps the chart lightweight and readable.

**Acceptance Criteria:**
- [ ] Chart renders with three distinct data series
- [ ] Equity milestone reference lines appear at correct years
- [ ] Touching/clicking a point shows accurate tooltip data
- [ ] Chart is not in the initial bundle (confirm with bundle analyzer)
- [ ] Chart renders correctly at 320px wide (iPhone SE) and 390px (iPhone 15)
- [ ] Y axis values are formatted in local currency with compact notation
- [ ] Chart re-renders when calculator inputs change
- [ ] No horizontal overflow on mobile

**Dependencies:** TICKET-003, TICKET-007

---

### TICKET-010 | Smart Callouts / Contextual Alerts

**Priority:** Must-Have for Launch
**Feature ID:** F-091

**Description:**
Build the smart callout system that provides contextual financial advice based on the user's inputs. These are inline alerts - not popups - that appear beneath the results and update as inputs change. They turn the calculator into a financial coaching experience.

**What to build:**
Create `/components/calculators/mortgage/SmartCallouts.tsx`. This component receives the full calculator state and outputs an array of contextual alert cards. Each card has: an icon (warning ⚠️, tip 💡, info ℹ️), a short headline, and a 1-2 sentence explanation.

**Implement the following callout rules:**

1. **PMI Warning:** When LTV > 80% → "Your down payment is below 20% - you're paying [PMI label]. Increase your down payment by $[X] to eliminate this cost." Calculate the exact dollar amount needed to reach 80% LTV.

2. **High DTI Warning:** If the user's total housing cost exceeds 28% of income (if income was entered in affordability tool and is available in state) → "Your housing cost ratio is X% - most lenders prefer below 28%."

3. **Extra Payment Tip:** Always shown when extra monthly payment is $0 → "Adding $[suggested amount] per month to your payment would save you $[interest saved] in interest and pay off your loan [X years] earlier." Pre-calculate with a $200 extra payment as the suggestion.

4. **High Rate Warning:** If entered rate is more than 2% above the country benchmark → "Your rate of X% is above the current average of Y% for [Country]. Consider shopping lenders."

5. **Long Term Cost Insight:** When total interest paid exceeds 50% of the loan principal → "Over the life of this loan, you'll pay $[total interest] in interest - [X]% of the original loan amount."

6. **PMI Drop-Off Info:** When PMI is active → "You'll stop paying PMI in [Month Year] when your balance reaches 80% of the home value - that's [X] months from now."

Callouts are displayed as a vertically stacked list below the summary totals card. Each callout is dismissible (stored in sessionStorage so it reappears on next visit). No more than 3 callouts should appear simultaneously - prioritize by severity.

**Acceptance Criteria:**
- [ ] PMI warning appears when LTV > 80% and shows the correct dollar amount to eliminate PMI
- [ ] Extra payment tip shows accurate savings (verify against TICKET-003 calculations)
- [ ] PMI drop-off callout shows the correct month and year
- [ ] High rate warning fires when input rate is 2%+ above benchmark
- [ ] Callouts update in real time as inputs change
- [ ] Maximum 3 callouts shown at once - lower priority ones are hidden
- [ ] Each callout is dismissible
- [ ] No callout appears as a popup - all are inline below results
- [ ] Callout content uses correct country-specific terminology (PMI vs LMI)

**Dependencies:** TICKET-003, TICKET-007

---

### TICKET-011 | Inline Tooltips & Field Explainers

**Priority:** Must-Have for Launch
**Feature ID:** F-090

**Description:**
Every input field and every result metric must have a plain-English explanation available on tap/click. These are not generic definitions - they adapt based on the user's country and explain concepts in the context of the user's actual numbers.

**What to build:**
Create a `/components/ui/Tooltip.tsx` component. On mobile, tapping the info icon opens a bottom sheet modal with the explanation text. On desktop, hovering shows a popover tooltip. Both must be dismissible. Use a portal so tooltips render above all other content.

Create `/data/tooltips.ts` - a map of tooltip content keyed by field name and optionally by country code. Each tooltip entry has: `title` (string), `body` (string, can include `{dynamic_value}` placeholders), and optionally `countryOverrides` (object keyed by country code with alternate `title` and `body`).

**Required tooltips to write content for:**

*Input fields:* Home Price, Down Payment, Loan Term, Interest Rate, Loan Type, Property Tax Rate, Homeowners Insurance, PMI/LMI, HOA Fees, Extra Monthly Payment, Credit Score Range.

*Result metrics:* Monthly Payment, Principal & Interest, Total Interest Paid, Total Cost of Loan, Payoff Date, LTV Ratio, Equity.

*Country-specific overrides:* The PMI/LMI tooltip must say "Lenders Mortgage Insurance (LMI)" for Australia and "Private Mortgage Insurance (PMI)" for US. The Property Tax tooltip for US states must reference the specific state's rate. The Stamp Duty tooltip must appear for UK and AU users.

**Dynamic value injection:** The LMI/PMI tooltip should dynamically say: "At your current LTV of [X]%, you are paying [PMI Label]. This will drop off in [Month Year] when your balance reaches 80% of the home value." Inject actual values from calculator state.

**Acceptance Criteria:**
- [ ] Every input field has an info icon visible (not hidden until hover)
- [ ] Tapping info icon on mobile opens bottom sheet with explanation
- [ ] Bottom sheet is dismissible by tapping outside or swiping down
- [ ] Tooltip content for PMI says "LMI" when country is Australia
- [ ] Dynamic PMI tooltip correctly shows the user's actual LTV and drop-off date
- [ ] All result metrics in the results panel have tooltips
- [ ] Tooltips are accessible - info icon has `aria-label`, content has `role="dialog"` in modal
- [ ] Desktop hover tooltip appears within 300ms and disappears when mouse leaves
- [ ] No tooltip causes layout shift when it opens

**Dependencies:** TICKET-006, TICKET-007

---

## PHASE 3 - ADDITIONAL CALCULATORS

---

### TICKET-012 | Personal Loan Calculator

**Priority:** Must-Have for Launch
**Feature ID:** F-020

**Description:**
Build the personal/consumer loan calculator as a standalone calculator type. It shares the country/region context from the global selector but has a simpler, focused input set.

**What to build:**
Create `/lib/calculators/personalLoan.ts` with pure calculation functions: `calculatePersonalLoanPayment(amount, annualRate, termMonths)` returning monthly payment, `calculatePersonalLoanTotals(amount, annualRate, termMonths)` returning total repayment and total interest, and `generatePersonalLoanSchedule(amount, annualRate, termMonths)` returning an amortization array. Create `/app/personal-loan/page.tsx` as the route. Create `/components/calculators/personal-loan/PersonalLoanInputs.tsx` with fields: Loan Amount (number input with currency formatting), Annual Interest Rate (APR), Loan Term in months (also show year equivalent beneath), and Repayment Frequency (Monthly only in V1 - show "Fortnightly coming soon" for AU/NZ users). Create `/components/calculators/personal-loan/PersonalLoanResults.tsx` showing: Payment per period (large headline), Total Repayment, Total Interest, Effective APR (same as entered rate in V1), and a payment breakdown donut chart. Include the amortization table component from TICKET-008 (pass personal loan schedule data). Include smart callouts specific to personal loans: "At this rate, you're paying [X]% of the loan amount in interest" and "Consider a shorter term - a 24-month term saves you $X in interest vs 36 months."

**Acceptance Criteria:**
- [ ] `calculatePersonalLoanPayment(10000, 12, 36)` returns approximately $332/month
- [ ] Currency formatting matches selected country
- [ ] Term input shows month count and year equivalent (e.g., "36 months (3 years)")
- [ ] Amortization table reuses TICKET-008 component with personal loan data
- [ ] Repayment frequency dropdown shows Monthly (AU/NZ users see note about fortnightly)
- [ ] Results update in real time
- [ ] Route `/personal-loan` renders correctly
- [ ] Calculator has its own page `<title>` and meta description

**Dependencies:** TICKET-001, TICKET-002, TICKET-003, TICKET-007, TICKET-008

---

### TICKET-013 | Auto / Car Loan Calculator

**Priority:** Must-Have for Launch
**Feature ID:** F-030

**Description:**
Build the auto/car loan calculator. It includes car-specific inputs like trade-in value and sales tax that don't exist in the mortgage calculator.

**What to build:**
Create `/lib/calculators/carLoan.ts` with: `calculateCarLoanAmount(vehiclePrice, downPayment, tradeInValue, salesTaxRate, fees)` returning the net financed amount, and `calculateCarLoanPayment(financedAmount, annualRate, termMonths)` returning monthly payment, total cost, total interest, and "true cost of vehicle" (financed amount + total interest + fees). Create `/app/car-loan/page.tsx`. Create input component with: Vehicle Price, Down Payment, Trade-In Value (default $0), Sales Tax Rate (auto-populated from region data - add `salesTaxRate` field to region data in TICKET-002's JSON; US states vary widely), Loan Term (24, 36, 48, 60, 72, 84 months), Interest Rate, Optional Fees (dealer doc fee, registration - collapsible). Show a "Net Amount Financed" figure that updates as these inputs change: `vehiclePrice - downPayment - tradeInValue + (vehiclePrice * salesTaxRate) + fees`. Results: Monthly Payment (headline), Out-of-pocket total (down + trade-in difference), Total Interest Paid, True Total Cost of Vehicle, Amortization table (reuse TICKET-008).

**Acceptance Criteria:**
- [ ] Net financed amount calculates correctly accounting for down payment, trade-in, and tax
- [ ] Sales tax rate pre-populates from region (e.g., Texas = 6.25%, California = 7.25%)
- [ ] Term options are 24–84 months
- [ ] True cost of vehicle equals vehicle price + all fees + total interest
- [ ] Route `/car-loan` renders correctly
- [ ] Currency formatting matches selected country
- [ ] Amortization table reuses TICKET-008 component
- [ ] Inputs without region data (non-US countries) hide the sales tax field or show a manual entry

**Dependencies:** TICKET-001, TICKET-002, TICKET-003, TICKET-008

---

### TICKET-014 | Affordability / How Much Can I Borrow Calculator

**Priority:** Must-Have for Launch
**Feature ID:** F-040

**Description:**
Build the affordability calculator that answers "how much can I borrow?" This is a top-of-funnel calculator that first-time buyers use before they've found a specific property.

**What to build:**
Create `/lib/calculators/affordability.ts` with: `calculateMaxLoanAmount(grossAnnualIncome, monthlyDebts, downPayment, annualRate, termYears, dtiLimit)` returning three affordability tiers. The three tiers use different DTI limits: Conservative (28% housing / 36% total), Moderate (31% housing / 43% total), Aggressive (36% housing / 50% total). For each tier calculate maximum monthly housing payment, then back-calculate maximum loan amount from that payment using the inverse of the amortization formula, then add the down payment to get maximum home price. Create `/app/affordability/page.tsx`. Input component: Annual Gross Income (with toggle to monthly), Monthly Debt Obligations (credit card minimums + other loan payments), Down Payment Available, Expected Interest Rate (pre-filled from country benchmark), Loan Term. Results: Three-tier table showing Conservative / Moderate / Aggressive with their Maximum Loan Amount, Maximum Home Price, and Resulting Monthly Payment. DTI ratio displayed for each tier with a color-coded indicator: green (below 36%), yellow (36-43%), red (above 43%). Below results: "Most lenders in [Country] require a DTI below [X]%" - use country data to source the appropriate DTI limit. Include a "What's this?" tooltip on DTI.

**Acceptance Criteria:**
- [ ] Three tiers calculate independently and show different max loan amounts
- [ ] DTI percentage displayed for each tier is accurate
- [ ] Country-specific DTI guidance text changes based on selected country
- [ ] Income toggle between annual and monthly works bidirectionally
- [ ] Results update in real time as income or debt obligations change
- [ ] Route `/affordability` renders correctly
- [ ] Maximum home price = max loan + down payment
- [ ] Edge case: if monthly debts exceed income, show an error state

**Dependencies:** TICKET-001, TICKET-002, TICKET-003

---

### TICKET-015 | Refinance Break-Even Calculator

**Priority:** Must-Have for Launch
**Feature ID:** F-050

**Description:**
Build the refinance calculator that helps existing homeowners decide if refinancing makes financial sense. The key output is the break-even point - how many months until the monthly savings exceed the closing costs.

**What to build:**
Create `/lib/calculators/refinance.ts` with: `calculateRefinance(currentBalance, currentRate, currentRemainingTermMonths, newRate, newTermMonths, closingCosts)` returning: `currentMonthlyPayment`, `newMonthlyPayment`, `monthlySavings`, `breakEvenMonths`, `totalInterestCurrentLoan`, `totalInterestNewLoan`, `netInterestSavings` (after subtracting closing costs), `recommendation` (string: "Refinancing makes sense if you stay more than X months"). Create `/app/refinance/page.tsx`. Input component: Current Loan Balance, Current Interest Rate, Remaining Term (years + months), New Interest Rate, New Loan Term, Closing Costs / Refinance Fees (pre-filled estimate of 2-3% of balance, editable). Results panel: Old vs New monthly payment in a side-by-side comparison card, Monthly Savings (highlighted), Break-Even Point (e.g., "You break even in Month 28 - February 2027"), Total Interest Saved over the full new loan term, a plain-language recommendation card. Include a break-even timeline visualization: a simple line chart showing cumulative closing costs as a horizontal line and cumulative monthly savings as an ascending line - where they intersect is the break-even point.

**Acceptance Criteria:**
- [ ] Break-even calculation: $300k balance, 7% current rate, 6% new rate, $6k closing costs → approximately 24-26 month break-even
- [ ] Recommendation text dynamically generates with the correct month count
- [ ] Break-even chart shows intersection point clearly
- [ ] Negative scenario (refinancing costs more than it saves over remaining term) shows a warning: "Based on your remaining term, this refinance does not save money overall"
- [ ] Route `/refinance` renders correctly
- [ ] Remaining term inputs (years and months) work together correctly
- [ ] Currency formatting matches selected country

**Dependencies:** TICKET-001, TICKET-002, TICKET-003

---

### TICKET-016 | Loan Comparison Calculator

**Priority:** Must-Have for Launch
**Feature ID:** F-060

**Description:**
Build the side-by-side loan comparison tool that lets users evaluate two different loan scenarios simultaneously. This is heavily used by refinancers and investors who want to stress-test different terms and rates.

**What to build:**
Create `/components/calculators/comparison/LoanComparison.tsx`. The component renders two complete mortgage input panels side by side on desktop (≥ 768px) and in a tabbed/toggle view on mobile. Each panel is a simplified version of the mortgage input from TICKET-006 with all core fields: Loan Amount, Down Payment, Loan Term, Interest Rate, Loan Type. Advanced fields are simplified - just Property Tax, Insurance, PMI toggle. Label the panels "Loan A" and "Loan B" with editable names. Results display below (desktop: two-column layout; mobile: a comparison table with Loan A and Loan B as columns). Comparison rows: Monthly Payment, Total Interest, Total Cost, Payoff Date, Monthly Savings (Loan B vs Loan A). Add winner badges on each row - a small "✓ Better" label on the winning value in each metric. "Copy Loan A to Loan B" button pre-fills Loan B with Loan A's values (useful for changing only one variable). Create `/app/loan-comparison/page.tsx` as the route.

**Acceptance Criteria:**
- [ ] Both loan panels calculate independently and simultaneously
- [ ] Winner badge appears on the lower payment, lower total interest, and earlier payoff date
- [ ] "Copy Loan A to Loan B" correctly clones all input values
- [ ] On mobile, tabs toggle between Loan A inputs and Loan B inputs; results show both
- [ ] On desktop (≥ 768px), panels are side by side
- [ ] Route `/loan-comparison` renders correctly
- [ ] Monthly Savings row shows the difference between the two monthly payments (absolute and %)
- [ ] Both scenarios use the same country/currency context

**Dependencies:** TICKET-003, TICKET-006, TICKET-007

---

## PHASE 4 - SHARING, SAVING & EXPORT

---

### TICKET-017 | Shareable URL Generation

**Priority:** Must-Have for Launch
**Feature ID:** F-070

**Description:**
Implement the shareable URL system. Every time a user changes a calculator input, the URL updates silently to encode the full calculator state. Anyone opening that URL gets the exact same pre-filled calculator. This is a core moat feature - zero acquisition cost referral traffic.

**What to build:**
Create `/lib/url/urlState.ts` with two functions: `encodeCalculatorState(state: MortgageInputs): string` that serializes the calculator state into URL query parameters using the schema from PRD section 11.2, and `decodeCalculatorState(searchParams: URLSearchParams): Partial<MortgageInputs>` that deserializes URL parameters back into calculator state. Handle missing or invalid params gracefully - fall back to country defaults. Use `nuqs` library (or Next.js built-in `useSearchParams` + `useRouter`) to keep URL in sync with state without full page navigation. The URL should update using `router.push` with `{ scroll: false }` so the page does not jump. Create `/components/sharing/ShareButton.tsx` - a button that opens a share sheet when clicked. On mobile, prefer the native Web Share API (`navigator.share`) if available. Fallback options: Copy Link (clipboard), WhatsApp (deep link: `https://wa.me/?text=[url]`), Email (`mailto:?subject=Mortgage Scenario&body=[url]`), SMS (`sms:?body=[url]`). After copying link, show a brief toast: "Link copied!". Ensure the shared URL is under 2000 characters for all calculator types. If it exceeds this, strip non-essential parameters.

**Acceptance Criteria:**
- [ ] URL updates within 200ms of any input change (debounced)
- [ ] Pasting the URL into a new browser tab pre-fills all calculator fields exactly
- [ ] Country and region are encoded in the URL and restored on load
- [ ] Web Share API is used on supported mobile browsers
- [ ] Copy Link fallback works on all browsers including iOS Safari
- [ ] WhatsApp deep link opens WhatsApp with the URL pre-filled in the message
- [ ] URL length stays under 2000 characters for all standard scenarios
- [ ] Invalid or missing URL params fall back to country defaults without crashing
- [ ] Shared URL works for all 6 calculator types (each has its own param schema)

**Dependencies:** TICKET-001, TICKET-003, TICKET-006

---

### TICKET-018 | Save Scenario to localStorage

**Priority:** Must-Have for Launch
**Feature ID:** F-071

**Description:**
Allow users to save up to 5 calculator scenarios in their browser without creating an account. Scenarios persist across browser sessions and are accessible from a "My Scenarios" panel. This drives return visits.

**What to build:**
Create `/hooks/useScenarios.ts` - a custom React hook that wraps localStorage read/write operations. The hook exposes: `scenarios` (array of saved scenario objects), `saveScenario(name: string, state: CalculatorState)`, `deleteScenario(id: string)`, `renameScenario(id: string, newName: string)`, `loadScenario(id: string): CalculatorState`. Each saved scenario object has: `id` (UUID), `name` (string, user-editable), `calculatorType` (string: "mortgage", "personal-loan", etc.), `state` (full calculator input state), `createdAt` (ISO timestamp), `country`, `region`. localStorage key: `loanapp_scenarios`. Enforce maximum 5 scenarios - when the user tries to save a 6th, show a prompt: "You've reached the limit of 5 saved scenarios. Delete one to save this?" with a list of existing scenarios to choose from.

Create `/components/saving/SaveButton.tsx` - a button that: (1) opens a small inline form asking for a scenario name (default: "Scenario [N]"), (2) on confirm calls `saveScenario`, (3) shows a toast: "Saved! View your scenarios →" with a link to the scenarios panel.

Create `/components/saving/ScenariosPanel.tsx` - a slide-in side drawer (mobile) or dropdown (desktop) accessible from the navigation. Shows a list of saved scenarios with: name, calculator type, monthly payment summary, timestamp. Each scenario has: Load button (populates calculator with saved state), Rename button (inline edit), Delete button (with confirmation). Include "Compare" button that loads two selected scenarios into the Loan Comparison calculator from TICKET-016.

**Acceptance Criteria:**
- [ ] Saving a scenario stores it in localStorage and it survives page refresh
- [ ] Maximum 5 scenarios enforced with clear user messaging
- [ ] Loading a scenario pre-fills all calculator inputs with the saved state
- [ ] Scenario name is editable inline in the scenarios panel
- [ ] Delete removes the scenario from localStorage immediately
- [ ] Scenarios panel shows correct calculator type label and monthly payment summary
- [ ] "Compare" action with two selected scenarios loads both into the comparison calculator
- [ ] On return visit, a "Welcome back! You have X saved scenarios" banner appears if scenarios exist
- [ ] localStorage key is `loanapp_scenarios`
- [ ] Hook handles corrupted localStorage data gracefully (try/catch, clear invalid data)

**Dependencies:** TICKET-006, TICKET-007, TICKET-016, TICKET-017

---

### TICKET-019 | PDF Export

**Priority:** Must-Have for Launch
**Feature ID:** F-072

**Description:**
Generate a professional, clean, single-page PDF of the current calculator scenario. This must work entirely client-side with no server involvement. The PDF should be good enough to share with a mortgage broker or print for personal records.

**What to build:**
Install `jsPDF` and `html2canvas`. Create `/lib/pdf/generateMortgagePDF.ts`. The PDF generation works by: (1) rendering a hidden `<div>` with the full report layout using React, (2) using `html2canvas` to capture it as an image, (3) embedding that image in a jsPDF document, and (4) triggering a download.

Create `/components/pdf/PDFReportTemplate.tsx` - a hidden component (rendered off-screen or in a portal) styled for A4/Letter paper dimensions. It renders: Page header with app name, URL, and generation date. Scenario Summary Card: country, region, all input values in a clean two-column layout. Monthly Payment Breakdown: donut chart image (use an SVG snapshot) and the breakdown table (P&I, Tax, Insurance, PMI, HOA, Total). Key Totals: Total Interest, Total Cost, Payoff Date, LTV. Annual Amortization Table: all years in a compact table (Year, Payment, Principal, Interest, Balance). Footer: "Generated by [App Name] on [Date]. For informational purposes only. Not financial advice."

Create `/components/sharing/PDFExportButton.tsx` - a button that: shows "Generating PDF..." loading state for 1-2 seconds while html2canvas captures the template, then triggers the download as `loan-calculator-[YYYY-MM-DD].pdf`. Handle iOS Safari specifically - test that the download triggers correctly (may need to open in a new tab).

**Acceptance Criteria:**
- [ ] PDF generates without a server request
- [ ] PDF includes all input values, monthly breakdown, key totals, and annual amortization table
- [ ] PDF downloads successfully on Chrome desktop, Firefox desktop, Safari desktop, Chrome Android, Safari iOS
- [ ] Loading indicator shows during generation
- [ ] File is named `loan-calculator-YYYY-MM-DD.pdf`
- [ ] Currency values in PDF match the selected country format
- [ ] PDF is readable at 100% zoom - no text is too small
- [ ] Footer includes the disclaimer text
- [ ] PDF generation does not block the UI (async)
- [ ] If generation fails, show an error toast (not a crash)

**Dependencies:** TICKET-007, TICKET-008, TICKET-009

---

## PHASE 5 - SEO & INFRASTRUCTURE

---

### TICKET-020 | SEO Landing Page System

**Priority:** Must-Have for Launch
**Feature ID:** MOAT 6, Section 11.3

**Description:**
Build the dynamic routing system and static page generation infrastructure that creates thousands of indexable, pre-populated calculator landing pages. This is the SEO content moat. Each combination of country + region + calculator type gets its own unique, fully-rendered page.

**What to build:**
Create the dynamic route `/app/[country]/[region]/[calculator]/page.tsx`. Use Next.js `generateStaticParams()` to statically generate all valid route combinations at build time. Generate routes for: US × 50 states × 4 calculator types (mortgage, personal-loan, car-loan, affordability) = 200 pages. AU × 8 states × 4 calculator types = 32 pages. CA × 13 provinces × 4 calculator types = 52 pages. UK × 4 nations × 4 calculator types = 16 pages. Other 11 countries × country-level only (no region) × 4 calculator types = 44 pages. Total V1: approximately 350+ pages.

Each landing page `page.tsx` must: (1) server-side read the country + region from `params`, (2) fetch the correct data from the country JSON, (3) render the appropriate calculator component pre-populated with region defaults (the calculator hydrates on the client), (4) render the educational content block below the calculator, (5) set correct `<title>`, `<meta description>`, canonical URL, and Open Graph tags.

Create `/components/seo/LandingPageContent.tsx` - renders below the calculator. Structure: H2 "How to use this calculator", H2 "Current [calculator type] rates in [region]" (pulls from country data), H2 "Local [calculator type] information for [region]" (pulls from region-specific notes in country JSON), FAQ section (5 questions and answers, region-specific). Add a `localNotes` field to the country/region data in TICKET-002's JSON for this content.

Create `/lib/seo/generateMetadata.ts` - a function that generates Next.js `Metadata` objects for each route: `title: "Mortgage Calculator [State] [Year] - Free, Accurate, No Signup"`, `description: "Calculate your [State] mortgage payment instantly. Includes [state] property tax rates, PMI, HOA, and amortization schedule."`. Add structured data (JSON-LD): `FAQPage` schema for the FAQ section, `BreadcrumbList` for navigation path, `HowTo` schema for calculator instructions.

**Acceptance Criteria:**
- [ ] `npx next build` generates all ~350 pages without errors
- [ ] `/us/texas/mortgage-calculator` loads with Texas property tax (1.8%) pre-populated
- [ ] `/australia/victoria/mortgage-calculator` loads with AUD, VIC stamp duty note, RBA rate
- [ ] `/uk/england/mortgage-calculator` loads with GBP, BoE rate, correct stamp duty note
- [ ] Each page has a unique, accurate `<title>` and `<meta description>`
- [ ] JSON-LD FAQPage schema is valid (test with Google's Rich Results Test)
- [ ] BreadcrumbList schema renders correctly
- [ ] Internal links to sibling pages (other states, other calculators) are present
- [ ] Canonical URLs are set correctly on every page
- [ ] Calculator is interactive above the fold on mobile on every landing page

**Dependencies:** TICKET-001, TICKET-002, TICKET-006, TICKET-007

---

### TICKET-021 | Navigation Architecture & App Shell

**Priority:** Must-Have for Launch
**Feature ID:** Section 7.3

**Description:**
Build the full navigation system including top nav, mobile bottom nav, and the overall app shell layout. Navigation must be mobile-first, accessible, and never obstruct calculator content.

**What to build:**
Create `/components/layout/AppShell.tsx` - the root layout wrapper. It renders: TopNav, the page content, and BottomNav (mobile only). Ensure the bottom nav height is accounted for in the page's padding-bottom so content is never hidden beneath it.

Create `/components/layout/TopNav.tsx` - on mobile: logo left, hamburger menu right (opens a full-screen slide-in menu). On desktop (≥ 768px): horizontal nav with logo left and nav links right. Nav links: "Calculators" dropdown (Mortgage, Personal Loan, Car Loan, Affordability, Refinance, Loan Comparison), "My Scenarios" (with a badge showing saved count from TICKET-018's hook), Country Selector (persistent, from TICKET-005).

Create `/components/layout/MobileMenu.tsx` - full-screen overlay slide-in from right. Contains all nav links as large tappable rows. Shows currently selected country at the top.

Create `/components/layout/BottomNav.tsx` - fixed bottom bar on mobile only (hidden on ≥ 768px). Four tabs: Home (house icon), Calculators (calculator icon), Saved (save icon with badge), Share (share icon - shares current URL). Active tab highlighted. The Share tab calls the share logic from TICKET-017.

Create `/components/layout/CalcTypeNav.tsx` - a horizontal scrollable tab bar that appears on calculator pages to switch between the 6 calculator types without going back to home. Preserves country/region selection when switching types.

**Acceptance Criteria:**
- [ ] Bottom nav is fixed to bottom on mobile and hidden on desktop
- [ ] Bottom nav does not cover the sticky result bar from TICKET-007
- [ ] "Saved" badge in top nav and bottom nav shows correct count from localStorage
- [ ] Hamburger menu opens and closes with smooth animation
- [ ] All navigation links are keyboard accessible and have visible focus rings
- [ ] Calculator type tab bar scrolls horizontally and does not cause page horizontal scroll
- [ ] Active route is highlighted in both top nav and bottom nav
- [ ] Country selector in top nav is always accessible
- [ ] Switching calculator types via the tab bar preserves country/region selection

**Dependencies:** TICKET-001, TICKET-005, TICKET-017, TICKET-018

---

### TICKET-022 | Performance Optimization & Lighthouse Targets

**Priority:** Must-Have for Launch
**Feature ID:** F-081

**Description:**
Systematically optimize the app to hit the Lighthouse mobile score of 90+ and the Core Web Vital targets from the PRD. This is not just a performance task - speed is a trust signal and a ranking factor for SEO.

**What to build:**
Audit and implement the following performance optimizations:

**Code splitting:** Use Next.js `dynamic()` to lazy-load each calculator component - only the active calculator's code is loaded. The chart component (TICKET-009) must be dynamically imported. The PDF template (TICKET-019) must be dynamically imported.

**Bundle analysis:** Run `@next/bundle-analyzer`. Total JavaScript (gzipped) must be under 200KB. If it exceeds this, identify and eliminate the largest contributors. Consider replacing Recharts with a lighter alternative if it pushes the budget.

**Image optimization:** Ensure no non-SVG images are used in the calculator UI (PRD specifies pure CSS/SVG). If any images exist, run them through Next.js `<Image>` component.

**Font optimization:** Confirm no external font requests - system font stack only. Remove any Google Fonts imports.

**Critical CSS:** Ensure Tailwind's CSS purging is configured correctly - no unused CSS classes in production build.

**Service Worker / PWA:** Configure `next-pwa` or a custom service worker to cache static assets. Add `manifest.json` with app name, icons (generate simple SVG-based icons), theme color, and `display: standalone`. This enables "Add to Home Screen" on mobile.

**Preloading:** Ensure the country data JSON is preloaded on app init so there is no delay when the country selector first opens.

**No external scripts:** Confirm zero third-party scripts (ads, trackers) are loaded in production. Analytics (Plausible or PostHog) should load async and non-blocking.

Run Lighthouse mobile audit after each optimization and document scores.

**Acceptance Criteria:**
- [ ] Lighthouse Mobile Performance score ≥ 90
- [ ] First Contentful Paint (mobile, 4G) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Interaction to Next Paint (INP) < 200ms
- [ ] Total JavaScript bundle < 200KB gzipped (verified with bundle analyzer)
- [ ] No render-blocking resources
- [ ] Service Worker registers and caches static assets
- [ ] PWA manifest is valid (test with Lighthouse PWA audit)
- [ ] Zero third-party ad scripts in the network tab

**Dependencies:** All previous tickets (run after full app is built)

---

### TICKET-023 | Accessibility Audit & WCAG 2.1 AA Compliance

**Priority:** Must-Have for Launch
**Feature ID:** F-082

**Description:**
Ensure the entire application meets WCAG 2.1 AA standards. This covers keyboard navigation, screen reader compatibility, color contrast, and ARIA attributes. Accessibility is both an ethical requirement and an SEO signal.

**What to build:**
Conduct a systematic accessibility pass across all components. Implement the following:

**Keyboard navigation:** Every interactive element (inputs, buttons, sliders, tooltips, dropdowns, tabs) must be reachable via Tab key in logical order. Modal dialogs must trap focus while open and return focus to the trigger element on close. Sliders must respond to arrow keys (increase/decrease by step amount).

**ARIA labels:** Every input must have an associated `<label>` or `aria-label`. Every icon-only button must have `aria-label`. Result values that update dynamically must have `aria-live="polite"` so screen readers announce changes. The sticky result bar must have `role="status"` and `aria-live="polite"`.

**Color contrast:** All text must meet 4.5:1 contrast ratio against its background. All interactive elements must have a visible focus indicator with sufficient contrast. Do not use color alone to convey information - PMI active/inactive must also use an icon or text label, not just a color change.

**Semantic HTML:** Use correct heading hierarchy (H1 → H2 → H3) on every page. Use `<nav>` for navigation, `<main>` for main content, `<section>` for logical groupings. Use `<table>` with proper `<thead>`, `<tbody>`, `<th scope>` for the amortization table.

**Form accessibility:** All form fields in the calculator must be within a `<form>` element or use appropriate ARIA roles. Error states must use `aria-describedby` to link the field to its error message.

Run automated testing with `axe-core` (via the `@axe-core/react` dev package) and fix all violations. Manually test with VoiceOver (iOS Safari) and NVDA (Windows Chrome).

**Acceptance Criteria:**
- [ ] Zero `axe-core` accessibility violations in automated scan
- [ ] All inputs are reachable and operable via keyboard alone
- [ ] Sliders respond to arrow keys
- [ ] Modal/bottom sheet traps focus and returns focus on close
- [ ] Screen reader announces updated monthly payment when inputs change
- [ ] All text meets 4.5:1 color contrast ratio (verified with browser DevTools)
- [ ] No information is conveyed by color alone
- [ ] Amortization table uses correct `<th scope>` attributes
- [ ] Heading hierarchy is logical on all pages
- [ ] VoiceOver on iPhone can navigate through inputs and hear result announcements

**Dependencies:** All UI tickets (run after full app is built)

---

### TICKET-024 | Analytics Integration & Event Tracking

**Priority:** Must-Have for Launch
**Feature ID:** Section 9.5

**Description:**
Set up privacy-first analytics with custom event tracking for the key product metrics defined in the PRD. The analytics tool must not require a cookie consent banner in most regions (Plausible.io or PostHog in EU-hosted mode).

**What to build:**
Install Plausible Analytics (or PostHog). Configure it to load async after the main content is interactive - do not let it block the initial render. Add the Plausible script to the Next.js `<Script>` component with `strategy="afterInteractive"`.

Create `/lib/analytics/events.ts` - a typed event tracking module that wraps `plausible()` calls. Define and fire the following custom events:

`calculator_complete` - fires when results are first displayed after all required inputs are filled. Props: `calculator_type`, `country`, `region`.

`share_click` - fires when the Share button is clicked. Props: `share_method` (copy_link, whatsapp, email, sms), `calculator_type`.

`scenario_saved` - fires when a scenario is saved. Props: `calculator_type`, `country`.

`pdf_download` - fires when a PDF is generated and downloaded. Props: `calculator_type`.

`advanced_options_opened` - fires when the advanced options section is expanded.

`country_changed` - fires when user changes country. Props: `from_country`, `to_country`.

`smart_callout_viewed` - fires when a smart callout is visible in viewport (use IntersectionObserver). Props: `callout_type`.

`return_visitor` - fires on page load when saved scenarios are detected in localStorage.

Ensure all events are fired in the right places without adding prop-drilling - use a singleton analytics utility that any component can import.

**Acceptance Criteria:**
- [ ] Plausible (or chosen tool) script loads async and does not block FCP
- [ ] `calculator_complete` fires the first time results are shown (not on every keystroke)
- [ ] `share_click` fires correctly for each share method
- [ ] `pdf_download` fires when PDF download is triggered
- [ ] `country_changed` fires with correct `from` and `to` values
- [ ] Events visible in the analytics dashboard within 30 seconds of being fired
- [ ] Analytics script does not appear in the network tab until after page is interactive
- [ ] No cookie consent banner appears (confirm Plausible does not set cookies)
- [ ] `return_visitor` fires when localStorage contains saved scenarios

**Dependencies:** TICKET-017, TICKET-018, TICKET-019, TICKET-021

---

### TICKET-025 | SEO Technical Foundation (Sitemap, Robots, Schema)

**Priority:** Must-Have for Launch
**Feature ID:** Section 11.3, Section 12

**Description:**
Implement all technical SEO infrastructure required for the app to be properly indexed and ranked. This includes sitemap generation, robots.txt, structured data, and meta tag optimization.

**What to build:**
Create `/app/sitemap.ts` - a Next.js dynamic sitemap generator that outputs all URLs for the app. Include: root homepage, all 6 calculator type pages, all ~350 SEO landing pages from TICKET-020. Each URL must include `lastModified` date and `priority` (landing pages = 0.8, calculator pages = 0.9, homepage = 1.0). The sitemap must be auto-generated at build time.

Create `/app/robots.ts` - outputs a `robots.txt` that allows all crawlers and references the sitemap URL.

Create `/lib/seo/structuredData.ts` - generate JSON-LD for three schema types:

`FAQPage` - 5 questions and answers per calculator landing page. Questions are templated: "How do I calculate my mortgage payment in [State]?", "What is the property tax rate in [State]?", "What is the average [calculator type] rate in [Country]?", "How much do I need for a down payment in [State]?", "What is PMI and how much does it cost?"

`HowTo` - for each calculator page explaining how to use the calculator (steps correspond to the input fields).

`BreadcrumbList` - reflects the URL path: Home > Calculators > [Calculator Type] > [Country] > [Region].

Open Graph and Twitter Card meta tags must be generated for every page: `og:title`, `og:description`, `og:url`, `og:type: website`, `og:image` (create a generic OG image using Next.js OG image generation or a static fallback image).

Verify structured data validity using Google's Rich Results Test on at least 3 representative pages.

**Acceptance Criteria:**
- [ ] `sitemap.xml` accessible at `/sitemap.xml` and contains all landing page URLs
- [ ] `robots.txt` accessible at `/robots.txt` and references sitemap URL
- [ ] FAQPage JSON-LD renders in the `<head>` of every landing page
- [ ] BreadcrumbList JSON-LD renders correctly on all pages
- [ ] HowTo schema is present on main calculator pages
- [ ] Google Rich Results Test reports no errors on `/us/texas/mortgage-calculator`
- [ ] OG tags are unique and accurate on every page
- [ ] Canonical URLs are set on all pages (no duplicate content signals)
- [ ] Sitemap is submitted to Google Search Console after launch

**Dependencies:** TICKET-020, TICKET-021

---

## PHASE 6 - V2 FEATURES (Nice-to-Have, Post-Launch)

---

### TICKET-026 | User Accounts & Cloud Sync

**Priority:** Nice-to-Have (V2)
**Feature ID:** Section 6.2

**Description:**
Add optional user accounts that allow scenarios to sync across devices and provide more than 5 saved scenarios. This is deferred because localStorage covers the V1 use case and accounts add significant backend complexity.

**What to build:**
Implement authentication using a provider like Clerk, Supabase Auth, or NextAuth. Email/password and Google OAuth as sign-in options. On sign-in, migrate existing localStorage scenarios to the user's cloud account. Implement a Supabase (or similar) database table for scenarios. Scenarios sync in real time across devices. Increase max stored scenarios to unlimited for authenticated users. Add a "Sign in to sync across devices" prompt when the user saves their 4th or 5th scenario.

**Acceptance Criteria:**
- [ ] User can create an account with email or Google
- [ ] Saved scenarios sync across two different browsers when logged in
- [ ] localStorage scenarios are migrated to cloud on first sign-in
- [ ] Unauthenticated users retain full functionality with the 5-scenario localStorage limit
- [ ] Sign-in prompt appears naturally (not intrusively) when approaching the local limit

**Dependencies:** TICKET-018

---

### TICKET-027 | Rent vs. Buy Calculator

**Priority:** Nice-to-Have (V2)
**Feature ID:** Section 4.3 (V2 Calculator #8)

**Description:**
Build a calculator that compares the long-term financial outcome of renting vs. buying a home. This is high complexity because it requires rental market context data and assumptions about home appreciation and investment returns.

**What to build:**
Create `/lib/calculators/rentVsBuy.ts` with a simulation function that runs two parallel financial models over a user-defined time horizon (5, 10, 20, 30 years): the "Buy" model includes mortgage payments, down payment opportunity cost, home appreciation, equity build-up, maintenance costs, and tax benefits. The "Rent" model includes rent payments, annual rent increases, and investment returns on the down payment amount. Inputs: Home Price, Down Payment, Mortgage Rate, Expected Home Appreciation Rate (%), Current Monthly Rent, Expected Annual Rent Increase (%), Investment Return Rate (assumed if buying down payment was instead invested), Time Horizon. Outputs: A crossover chart showing net worth under each scenario over time, the "break-even year" where buying outperforms renting, and a summary recommendation.

**Acceptance Criteria:**
- [ ] Buy vs Rent NPV calculates correctly over the selected time horizon
- [ ] Break-even year is identified on the chart
- [ ] All appreciation and growth rates are user-editable with sensible defaults
- [ ] Route `/rent-vs-buy` renders correctly
- [ ] Results clearly state all assumptions used

**Dependencies:** TICKET-003, TICKET-009

---

### TICKET-028 | Dark Mode

**Priority:** Nice-to-Have (V2)
**Feature ID:** Section 6.2

**Description:**
Add a dark mode theme to the application with a toggle in the navigation. The selected preference persists in localStorage.

**What to build:**
Configure Tailwind CSS dark mode using `class` strategy. Add a `ThemeProvider` component at the root layout that reads from localStorage (`theme_preference`) and applies the `dark` class to the `<html>` element. Create a theme toggle button component (sun/moon icon) for the top navigation. Ensure all components, charts, and the PDF template have dark mode variants. Use Tailwind's `dark:` prefix throughout. Respect the system preference (`prefers-color-scheme`) as the default if no localStorage preference is set.

**Acceptance Criteria:**
- [ ] Dark mode toggle switches all components to dark theme
- [ ] Preference persists in localStorage across sessions
- [ ] System preference is respected on first visit
- [ ] Charts render correctly in dark mode
- [ ] Color contrast meets WCAG 2.1 AA in dark mode as well as light mode
- [ ] No flash of wrong theme on page load (server-side theme application)

**Dependencies:** TICKET-001, TICKET-021

---

### TICKET-029 | CSV Export of Amortization Schedule

**Priority:** Nice-to-Have (V2)
**Feature ID:** Section 6.2

**Description:**
Allow users to download the full amortization schedule as a CSV file that can be opened in Excel or Google Sheets. V1 covers this with PDF; V2 adds CSV for power users and financial planners.

**What to build:**
Create `/lib/export/generateCSV.ts` - a utility that converts the `AmortizationRow[]` array from TICKET-003 into a CSV string. Columns: Month, Date, Payment, Principal, Interest, Balance, Cumulative Interest, Cumulative Principal, PMI Active. Include a header row with the scenario summary (loan amount, rate, term, country). Add a "Download CSV" button to the amortization table component from TICKET-008. Use a Blob and object URL to trigger a client-side download. File name: `amortization-schedule-[date].csv`.

**Acceptance Criteria:**
- [ ] CSV file opens correctly in Excel and Google Sheets
- [ ] All 360 rows (for 30yr loan) are present
- [ ] Currency values are unformatted numbers (not "$2,345" - just "2345") for spreadsheet compatibility
- [ ] Header rows include scenario summary
- [ ] Download works on Chrome, Firefox, Safari, and Chrome Android

**Dependencies:** TICKET-003, TICKET-008

---

*Total tickets: 29 (24 must-have + 5 nice-to-have)*

**Build sequence summary:**
TICKET-001 → 002 → 003 → 004 → 005 (foundation) → 006 → 007 → 008 → 009 → 010 → 011 (core calculator) → 012 → 013 → 014 → 015 → 016 (additional calculators) → 017 → 018 → 019 (sharing/saving) → 020 → 021 → 022 → 023 → 024 → 025 (infrastructure) → 026 → 027 → 028 → 029 (V2)