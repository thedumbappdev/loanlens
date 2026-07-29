# Frontend Specification Document
## Mortgage & Loan Calculator - Mobile-First Web App

**Document Version:** 1.0
**Status:** Draft
**Prepared by:** Senior UI/UX Designer & Frontend Architect
**Audience:** Frontend Developers, Designers, QA Engineers

---

# PART ONE: DESIGN SYSTEM

---

## 1. Design Philosophy

This design system is built around three principles drawn directly from the product's moat strategy:

- **Trust through Clarity** - Every visual decision must reduce anxiety, not add to it. Financial tools lose users the moment they feel confusing or untrustworthy.
- **Speed as UX** - The design must never feel heavy. Lightweight components, minimal decoration, instant feedback loops.
- **Mobile-First, Desktop-Worthy** - Designed at 375px width first, then expanded. No component should feel like a shrunken desktop experience.

---

## 2. Color Palette

### 2.1 Primary Brand Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-primary-600` | `#1D4ED8` | 29, 78, 216 | Primary CTA buttons, active states, links |
| `--color-primary-500` | `#3B82F6` | 59, 130, 246 | Hover states, interactive highlights |
| `--color-primary-100` | `#DBEAFE` | 219, 234, 254 | Button backgrounds (ghost), info backgrounds |
| `--color-primary-50` | `#EFF6FF` | 239, 246, 255 | Subtle highlight backgrounds |

**Rationale:** Blue conveys financial trust. This specific shade of blue (`#1D4ED8`) is sufficiently dark to meet WCAG AA contrast against white at a 7.2:1 ratio, and avoids the "bank blue" cliché while remaining professional.

### 2.2 Neutral / Gray Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-gray-950` | `#0A0F1E` | Page background (dark sections), deepest text |
| `--color-gray-900` | `#111827` | Primary body text |
| `--color-gray-700` | `#374151` | Secondary body text, labels |
| `--color-gray-500` | `#6B7280` | Placeholder text, disabled states, captions |
| `--color-gray-300` | `#D1D5DB` | Borders, dividers, input strokes |
| `--color-gray-200` | `#E5E7EB` | Table row alternation, subtle separators |
| `--color-gray-100` | `#F3F4F6` | Input backgrounds, card backgrounds |
| `--color-gray-50` | `#F9FAFB` | Page background, section fills |
| `--color-white` | `#FFFFFF` | Card surfaces, modal backgrounds |

### 2.3 Semantic / Functional Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success-600` | `#16A34A` | Positive indicators, savings callouts, PMI-free badge |
| `--color-success-100` | `#DCFCE7` | Success alert backgrounds |
| `--color-success-50` | `#F0FDF4` | Success state fills |
| `--color-warning-600` | `#D97706` | Warning callouts (e.g., LTV above 80%, high DTI) |
| `--color-warning-100` | `#FEF3C7` | Warning alert backgrounds |
| `--color-warning-50` | `#FFFBEB` | Warning state fills |
| `--color-danger-600` | `#DC2626` | Error states, validation failures |
| `--color-danger-100` | `#FEE2E2` | Error alert backgrounds |
| `--color-danger-50` | `#FFF5F5` | Error state fills |
| `--color-info-600` | `#0891B2` | Informational tooltips, contextual education |
| `--color-info-100` | `#CFFAFE` | Info backgrounds |

### 2.4 Chart Colors

Used exclusively for data visualization. Chosen to be distinguishable by users with common color vision deficiencies.

| Token | Hex | Chart Usage |
|-------|-----|-------------|
| `--color-chart-principal` | `#1D4ED8` | Principal paid (blue) |
| `--color-chart-interest` | `#F59E0B` | Interest paid (amber) |
| `--color-chart-tax` | `#8B5CF6` | Property tax (violet) |
| `--color-chart-insurance` | `#10B981` | Insurance (emerald) |
| `--color-chart-pmi` | `#F43F5E` | PMI/LMI (rose) |
| `--color-chart-hoa` | `#64748B` | HOA fees (slate) |
| `--color-chart-balance` | `#0EA5E9` | Remaining balance (sky) |
| `--color-chart-equity` | `#22C55E` | Equity built (green) |

### 2.5 Color Application Rules

```
Background hierarchy:
  Page background: --color-gray-50
  Card surface: --color-white
  Input background: --color-gray-100
  Active/selected input: --color-white with --color-primary-600 border

Text hierarchy:
  H1–H3 headings: --color-gray-900
  Body / labels: --color-gray-700
  Help text / captions: --color-gray-500
  Placeholder text: --color-gray-400 (not --color-gray-500, to differentiate from typed text)
  Links: --color-primary-600
  Links (hover): --color-primary-500

Borders:
  Default input: 1.5px solid --color-gray-300
  Input focus: 2px solid --color-primary-600
  Card border: 1px solid --color-gray-200
  Dividers: 1px solid --color-gray-200
```

---

## 3. Typography

### 3.1 Font Stack

**Primary Font: Inter (Variable)**
- Source: Bundled via `@fontsource/inter` (self-hosted, no Google Fonts HTTP request - critical for Lighthouse score)
- Weights used: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- Subset: Latin + Latin-Extended only in V1

```css
font-family: 'Inter var', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', Arial, 
             'Noto Sans', sans-serif;
```

**Monospace Font (for numbers in results):** System monospace stack
```css
font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 
             Consolas, 'Courier New', monospace;
```

**Rationale for Inter:** Inter was designed specifically for screen readability at small sizes. Its large x-height and open letter-forms are particularly useful for numeric data on mobile screens. It's also what the world's most trusted fintech products (Stripe, Linear, Vercel) use, providing an implicit trust signal.

### 3.2 Type Scale

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|-------|------|-------------|--------|----------------|-------|
| `--text-xs` | 11px / 0.6875rem | 1.5 | 400 | +0.02em | Legal disclaimers, fine print |
| `--text-sm` | 13px / 0.8125rem | 1.5 | 400 | +0.01em | Captions, help text, tooltips |
| `--text-base` | 15px / 0.9375rem | 1.6 | 400 | 0 | Body copy, input labels |
| `--text-md` | 16px / 1rem | 1.5 | 500 | 0 | Input text, button text |
| `--text-lg` | 18px / 1.125rem | 1.4 | 600 | -0.01em | Card section headers |
| `--text-xl` | 20px / 1.25rem | 1.3 | 600 | -0.01em | H3 headings |
| `--text-2xl` | 24px / 1.5rem | 1.25 | 700 | -0.02em | H2 headings, result figures |
| `--text-3xl` | 30px / 1.875rem | 1.2 | 700 | -0.02em | H1 headings |
| `--text-4xl` | 36px / 2.25rem | 1.1 | 700 | -0.03em | Hero monthly payment display |
| `--text-5xl` | 48px / 3rem | 1.0 | 700 | -0.04em | Large hero result (desktop only) |

### 3.3 Numeric Display Typography

All monetary values, percentages, and key result figures use a specialized treatment:

```css
.result-figure {
  font-family: var(--font-mono);
  font-size: var(--text-4xl);      /* 36px on mobile */
  font-weight: 700;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;  /* prevents layout shift as numbers update */
  color: var(--color-gray-900);
}

.result-figure-currency-symbol {
  font-size: var(--text-xl);       /* smaller currency symbol */
  font-weight: 600;
  vertical-align: top;
  margin-top: 6px;
  color: var(--color-gray-500);
}
```

### 3.4 SEO Content Typography

For the educational content blocks below the calculator on landing pages:

| Element | Size | Weight | Color | Notes |
|---------|------|--------|-------|-------|
| H1 | 30px | 700 | gray-900 | One per page, includes location keyword |
| H2 | 24px | 700 | gray-900 | Section headers |
| H3 | 20px | 600 | gray-800 | Subsection headers |
| H4 | 16px | 600 | gray-800 | FAQ questions |
| Body | 16px | 400 | gray-700 | Increased to 16px for readability in long-form |
| Caption | 13px | 400 | gray-500 | Source attributions, last-updated dates |

### 3.5 Typography Rules

```
Maximum line length (measure): 65–75 characters (≈ 680px container)
Paragraph spacing: 1em (equal to font size)
Heading bottom margin: 0.5em
List item spacing: 0.25em between items
Never use font-size below 11px
Never use font-weight below 400 on screen
Use tabular-nums for all numeric values that update dynamically
```

---

## 4. Spacing & Layout System

### 4.1 Spacing Scale

Uses a base-4 scale. All spacing values are multiples of 4px.

| Token | Value | Common Usage |
|-------|-------|-------------|
| `--space-0.5` | 2px | Micro adjustments |
| `--space-1` | 4px | Icon gaps, tight internal padding |
| `--space-2` | 8px | Input internal padding (vertical), tag padding |
| `--space-3` | 12px | Small component padding |
| `--space-4` | 16px | Standard component padding, input padding |
| `--space-5` | 20px | Card padding (mobile) |
| `--space-6` | 24px | Card padding (desktop), section gaps |
| `--space-8` | 32px | Between major sections |
| `--space-10` | 40px | Large section padding |
| `--space-12` | 48px | Hero sections |
| `--space-16` | 64px | Between page-level sections |
| `--space-20` | 80px | Desktop hero padding |
| `--space-24` | 96px | Page-level margin top/bottom |

### 4.2 Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Tags, badges, small pills |
| `--radius-md` | 8px | Input fields, buttons |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-xl` | 16px | Modals, bottom sheets |
| `--radius-2xl` | 24px | Large cards, result panels |
| `--radius-full` | 9999px | Toggle switches, fully rounded pills |

### 4.3 Breakpoints

| Name | Min Width | Target Devices |
|------|-----------|---------------|
| `xs` | 0px | Small phones (iPhone SE, older Androids) |
| `sm` | 375px | Standard phones (iPhone 12/13/14, most Androids) |
| `md` | 640px | Large phones (iPhone Pro Max), small tablets |
| `lg` | 768px | iPad portrait, large tablets |
| `xl` | 1024px | iPad landscape, small laptops |
| `2xl` | 1280px | Desktop |
| `3xl` | 1536px | Large desktop |

### 4.4 Layout Grid

```
Mobile (xs–md):
  Columns: 4
  Gutter: 16px
  Margin: 16px
  Max content width: 100%

Tablet (lg):
  Columns: 8
  Gutter: 24px
  Margin: 32px
  Max content width: 100%

Desktop (xl+):
  Columns: 12
  Gutter: 24px
  Margin: auto
  Max content width: 1200px
  Container padding: 48px
```

### 4.5 Calculator Layout Structure

```
Mobile Layout (375px):
┌─────────────────────────────┐  ← 375px
│  [Top Nav - 56px]           │
├─────────────────────────────┤
│  [Calculator Type Tabs]     │  ← 48px
├─────────────────────────────┤
│  [Country/Region Selector]  │  ← 64px
├─────────────────────────────┤
│                             │
│  [Input Fields Scroll Area] │  ← flexible height, scrollable
│                             │
├─────────────────────────────┤
│  [Sticky Results Bottom     │  ← 84px, fixed position
│   Panel]                    │
├─────────────────────────────┤
│  [Bottom Nav - 56px]        │
└─────────────────────────────┘

Desktop Layout (1280px):
┌─────────────────────────────────────────────────────┐
│  [Top Nav - 64px]                                   │
├────────────────────┬────────────────────────────────┤
│                    │                                │
│  [Input Panel]     │  [Results Panel]               │
│  ~480px            │  ~640px                        │
│  sticky            │  scrollable                    │
│                    │                                │
└────────────────────┴────────────────────────────────┘
```

### 4.6 Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | 0 | Default elements |
| `--z-raised` | 10 | Cards, elevated content |
| `--z-sticky` | 20 | Sticky result panel, sticky nav |
| `--z-dropdown` | 30 | Country selector dropdown, select menus |
| `--z-overlay` | 40 | Sheet overlays, backdrop |
| `--z-modal` | 50 | Modals, bottom sheets |
| `--z-tooltip` | 60 | Tooltips (must appear above modals) |
| `--z-toast` | 70 | Toast notifications (highest) |

---

## 5. Shadows & Elevation

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Input fields, subtle card lift |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)` | Cards, panels |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.03)` | Bottom sheets |
| `--shadow-sticky` | `0 -4px 16px rgba(0,0,0,0.08)` | Sticky bottom result panel (upward shadow) |
| `--shadow-focus` | `0 0 0 3px rgba(29,78,216,0.25)` | Focus ring for interactive elements |

---

## 6. Component Specifications

### 6.1 Buttons

#### Primary Button
Used for: Calculate, Save, Export PDF, Share

```css
.btn-primary {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  
  /* Sizing */
  height: 48px;                    /* 48px - exceeds 44px min touch target */
  padding: 0 var(--space-6);
  min-width: 120px;
  
  /* Typography */
  font-size: var(--text-md);       /* 16px */
  font-weight: 600;
  letter-spacing: 0;
  
  /* Appearance */
  background: var(--color-primary-600);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  
  /* Behavior */
  cursor: pointer;
  transition: background 150ms ease, transform 100ms ease, box-shadow 150ms ease;
  -webkit-tap-highlight-color: transparent;
}

.btn-primary:hover {
  background: #1A44C2;             /* 10% darker than primary-600 */
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  background: #1639A8;
  transform: translateY(1px);
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.btn-primary:disabled {
  background: var(--color-gray-300);
  color: var(--color-gray-500);
  cursor: not-allowed;
  transform: none;
}

/* Loading state */
.btn-primary.loading {
  pointer-events: none;
  opacity: 0.8;
}
.btn-primary.loading::after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
```

**Full-width variant (mobile CTAs):**
```css
.btn-primary-full {
  width: 100%;
  height: 52px;                    /* Slightly taller for full-width mobile */
  font-size: 17px;
}
```

#### Secondary Button
Used for: "Show Advanced Options", comparison toggles

```css
.btn-secondary {
  height: 48px;
  padding: 0 var(--space-6);
  font-size: var(--text-md);
  font-weight: 600;
  background: var(--color-white);
  color: var(--color-primary-600);
  border: 1.5px solid var(--color-primary-600);
  border-radius: var(--radius-md);
  transition: background 150ms ease, border-color 150ms ease;
}

.btn-secondary:hover {
  background: var(--color-primary-50);
  border-color: var(--color-primary-500);
}

.btn-secondary:active {
  background: var(--color-primary-100);
}

.btn-secondary:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}
```

#### Ghost Button
Used for: "Copy Link", share options, less prominent actions

```css
.btn-ghost {
  height: 44px;
  padding: 0 var(--space-4);
  font-size: var(--text-base);
  font-weight: 500;
  background: transparent;
  color: var(--color-gray-700);
  border: none;
  border-radius: var(--radius-md);
  transition: background 150ms ease, color 150ms ease;
}

.btn-ghost:hover {
  background: var(--color-gray-100);
  color: var(--color-gray-900);
}
```

#### Icon Button
Used for: Info/tooltip trigger, close modal, share icons

```css
.btn-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-gray-500);
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
}

.btn-icon:hover {
  background: var(--color-gray-100);
  color: var(--color-gray-700);
}

.btn-icon.active {
  background: var(--color-primary-100);
  color: var(--color-primary-600);
}
```

#### Button Size Variants

| Variant | Height | Padding H | Font Size | Usage |
|---------|--------|-----------|-----------|-------|
| `btn-sm` | 36px | 16px | 14px | Inline actions, table actions |
| `btn-md` | 44px | 20px | 15px | Default mobile buttons |
| `btn-lg` | 52px | 28px | 16px | Primary mobile CTAs |
| `btn-xl` | 56px | 32px | 17px | Hero-level CTAs |

---

### 6.2 Input Fields

The calculator's quality lives and dies in its inputs. These must feel native on mobile.

#### Text / Number Input

```css
.input-field {
  /* Layout */
  width: 100%;
  height: 52px;                    /* 52px for comfortable mobile touch */
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  
  /* Typography */
  font-size: var(--text-md);       /* 16px - prevents iOS Safari zoom on focus */
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--color-gray-900);
  
  /* Appearance */
  background: var(--color-gray-100);
  border: 1.5px solid transparent; /* transparent default - border shows on focus/error */
  border-radius: var(--radius-md);
  outline: none;
  
  /* Transition */
  transition: background 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
}

.input-field::placeholder {
  color: var(--color-gray-400);
  font-weight: 400;
}

.input-field:hover {
  background: var(--color-gray-200);
}

.input-field:focus {
  background: var(--color-white);
  border-color: var(--color-primary-600);
  box-shadow: var(--shadow-focus);
}

.input-field.error {
  background: var(--color-danger-50);
  border-color: var(--color-danger-600);
}

.input-field:disabled {
  background: var(--color-gray-100);
  color: var(--color-gray-400);
  cursor: not-allowed;
}
```

#### Input Group (Currency / Percentage Input)

Used for monetary values and percentage fields with prefix/suffix indicators.

```
Structure:
┌────────────────────────────────────────┐
│ [$]  [  450,000              ] [ⓘ]    │
└────────────────────────────────────────┘
   ↑           ↑                    ↑
 prefix     input field           info icon
```

```css
.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group-prefix,
.input-group-suffix {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--color-gray-500);
  pointer-events: none;
  user-select: none;
}

.input-group-prefix {
  left: 0;
}

.input-group-suffix {
  right: 0;
}

.input-group .input-field {
  padding-left: 40px;             /* space for currency symbol */
}

.input-group .input-field.has-suffix {
  padding-right: 40px;
}
```

#### Slider + Input Sync Component

This is the most critical input pattern in the app. Used for Home Price, Down Payment.

```
Mobile view:
┌────────────────────────────────────────┐
│ Home Price                        [ⓘ] │
│ [$] [     450,000               ]     │
│ ●━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━ ─── │
│ $50K                            $2M   │
└────────────────────────────────────────┘
```

```css
.slider-track {
  width: 100%;
  height: 6px;
  background: var(--color-gray-200);
  border-radius: var(--radius-full);
  position: relative;
  margin: var(--space-3) 0;
}

.slider-fill {
  height: 100%;
  background: var(--color-primary-600);
  border-radius: var(--radius-full);
}

.slider-thumb {
  width: 24px;                     /* Large touch target */
  height: 24px;
  background: var(--color-white);
  border: 3px solid var(--color-primary-600);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
  cursor: grab;
  
  /* Invisible hit area expansion */
  -webkit-tap-highlight-color: transparent;
}

/* Expand touch target without visual change */
.slider-thumb::after {
  content: '';
  position: absolute;
  inset: -10px;
}

.slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.15);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  color: var(--color-gray-500);
  margin-top: var(--space-1);
}
```

#### Toggle / Switch

Used for: PMI toggle, "Use average rate" toggle, monthly/annual view toggle

```css
.toggle-switch {
  width: 48px;
  height: 28px;
  background: var(--color-gray-300);
  border-radius: var(--radius-full);
  cursor: pointer;
  position: relative;
  transition: background 200ms ease;
  flex-shrink: 0;
}

.toggle-switch.checked {
  background: var(--color-primary-600);
}

.toggle-switch-thumb {
  width: 22px;
  height: 22px;
  background: var(--color-white);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 200ms ease;
}

.toggle-switch.checked .toggle-switch-thumb {
  transform: translateX(20px);
}
```

#### Dropdown / Select

Used for: Loan Term, Country, State, Loan Type

```css
.select-field {
  height: 52px;
  width: 100%;
  padding: 0 var(--space-10) 0 var(--space-4);  /* Right padding for arrow icon */
  font-size: var(--text-md);
  font-weight: 500;
  color: var(--color-gray-900);
  background: var(--color-gray-100);
  border: 1.5px solid transparent;
  border-radius: var(--radius-md);
  
  /* Custom arrow */
  appearance: none;
  background-image: url("chevron-down.svg");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 18px;
  
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease;
}

.select-field:focus {
  background-color: var(--color-white);
  border-color: var(--color-primary-600);
  box-shadow: var(--shadow-focus);
}
```

#### Country Selector (Searchable Dropdown)

Built as a custom component, not a native `<select>`, to support flag emojis and search functionality.

```
┌─────────────────────────────────────────┐
│ 🇺🇸 United States                    ▼ │
└─────────────────────────────────────────┘
            ↓ (when open)
┌─────────────────────────────────────────┐
│ 🔍 Search countries...                  │
├─────────────────────────────────────────┤
│ 🇺🇸 United States                ✓    │
│ 🇬🇧 United Kingdom                    │
│ 🇦🇺 Australia                         │
│ 🇨🇦 Canada                            │
│ ...                                     │
└─────────────────────────────────────────┘
```

```css
.country-selector-trigger {
  height: 52px;
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--color-white);
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--text-md);
  font-weight: 500;
}

.country-selector-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  max-height: 320px;
  overflow: hidden;
  z-index: var(--z-dropdown);
}

.country-selector-search {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-gray-200);
}

.country-selector-list {
  overflow-y: auto;
  max-height: 260px;
  -webkit-overflow-scrolling: touch;
}

.country-selector-option {
  height: 48px;
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-base);
  cursor: pointer;
  transition: background 100ms ease;
}

.country-selector-option:hover,
.country-selector-option:focus {
  background: var(--color-primary-50);
}

.country-selector-option.selected {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  font-weight: 500;
}
```

#### Input Labels & Help Text

```css
.input-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-gray-700);
  margin-bottom: var(--space-2);
}

.input-help-text {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
  margin-top: var(--space-1);
}

.input-error-text {
  font-size: var(--text-sm);
  color: var(--color-danger-600);
  margin-top: var(--space-1);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}
```

---

### 6.3 Cards

#### Standard Card

```css
.card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-5);          /* 20px on mobile */
  box-shadow: var(--shadow-md);
}

/* Desktop */
@media (min-width: 1024px) {
  .card {
    padding: var(--space-6);        /* 24px on desktop */
    border-radius: var(--radius-2xl);
  }
}
```

#### Result Summary Card

The most prominent card in the UI - the monthly payment display.

```
┌────────────────────────────────────────┐
│ Monthly Payment                        │
│ $2,847 /mo                        [ⓘ] │
│                                        │
│ ──────────────────────────────────     │
│ Principal & Interest   $2,149          │
│ Property Tax             $298          │
│ Insurance                $200          │
│ PMI                      $200          │
└────────────────────────────────────────┘
```

```css
.card-result-primary {
  background: linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  color: var(--color-white);
  position: relative;
  overflow: hidden;
}

/* Decorative background pattern */
.card-result-primary::before {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 200px;
  height: 200px;
  background: rgba(255,255,255,0.05);
  border-radius: 50%;
}

.card-result-primary .label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: rgba(255,255,255,0.75);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: var(--space-1);
}

.card-result-primary .amount {
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.card-result-primary .period {
  font-size: var(--text-lg);
  font-weight: 400;
  color: rgba(255,255,255,0.75);
  margin-left: 4px;
}
```

#### Breakdown Row Card

```css
.breakdown-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-gray-100);
}

.breakdown-row:last-child {
  border-bottom: none;
}

.breakdown-row-indicator {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
  margin-right: var(--space-3);
}

.breakdown-row-label {
  flex: 1;
  font-size: var(--text-base);
  color: var(--color-gray-700);
}

.breakdown-row-amount {
  font-size: var(--text-base);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--color-gray-900);
}
```

#### Totals Summary Card

```css
.card-totals {
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
}

.totals-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: var(--space-3) 0;
}

.totals-row-label {
  font-size: var(--text-base);
  color: var(--color-gray-600);
}

.totals-row-value {
  font-size: var(--text-lg);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--color-gray-900);
}

.totals-row.highlight .totals-row-value {
  color: var(--color-primary-600);
}
```

#### Smart Callout Card

```css
.callout {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
}

.callout.warning {
  background: var(--color-warning-50);
  border-color: var(--color-warning-100);
}

.callout.info {
  background: var(--color-info-100);
  border-color: rgba(8,145,178,0.2);
}

.callout.success {
  background: var(--color-success-50);
  border-color: var(--color-success-100);
}

.callout-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 1px;
}

.callout-text {
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-gray-800);
}

.callout-text strong {
  font-weight: 600;
}
```

---

### 6.4 Modals

The app uses modals sparingly. Tooltips, bottom sheets, and inline expandable sections are preferred over full modals on mobile.

#### Bottom Sheet (Mobile Modal)

Used for: Advanced options, share sheet, saved scenarios list, tooltip detail

```css
.bottom-sheet-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: var(--z-overlay);
  backdrop-filter: blur(2px);
  
  /* Animation */
  animation: fade-in 200ms ease forwards;
}

.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-white);
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  z-index: var(--z-modal);
  max-height: 92vh;
  overflow: hidden;
  
  /* Animation */
  animation: slide-up 300ms cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.bottom-sheet-handle {
  width: 36px;
  height: 4px;
  background: var(--color-gray-300);
  border-radius: var(--radius-full);
  margin: var(--space-3) auto var(--space-5);
}

.bottom-sheet-header {
  padding: 0 var(--space-5) var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-gray-100);
}

.bottom-sheet-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-gray-900);
}

.bottom-sheet-body {
  padding: var(--space-5);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  max-height: calc(92vh - 100px);
}
```

#### Standard Modal (Desktop / Tablet)

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: var(--z-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  
  animation: fade-in 200ms ease;
}

.modal {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  animation: scale-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-header {
  padding: var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-gray-200);
}

.modal-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-gray-900);
}

.modal-body {
  padding: var(--space-6);
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: var(--space-4) var(--space-6);
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
  border-top: 1px solid var(--color-gray-200);
  background: var(--color-gray-50);
}
```

---

### 6.5 Tooltips

```css
.tooltip-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--color-gray-400);
  cursor: help;
  transition: color 150ms ease;
  /* Touch-friendly invisible expansion */
  -webkit-tap-highlight-color: transparent;
}

.tooltip-trigger:hover,
.tooltip-trigger:focus {
  color: var(--color-primary-600);
}

/* Touch expands to full info panel rather than floating tooltip */
@media (hover: none) {
  .tooltip-content {
    display: none; /* Hidden on touch; tapping triggers bottom sheet instead */
  }
}

/* Floating tooltip for pointer devices */
@media (hover: hover) {
  .tooltip-content {
    position: absolute;
    z-index: var(--z-tooltip);
    background: var(--color-gray-900);
    color: var(--color-white);
    font-size: var(--text-sm);
    line-height: 1.5;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    max-width: 280px;
    box-shadow: var(--shadow-lg);
    
    animation: fade-in 150ms ease;
  }
  
  .tooltip-arrow {
    width: 8px;
    height: 8px;
    background: var(--color-gray-900);
    transform: rotate(45deg);
  }
}
```

---

### 6.6 Amortization Table

```css
.amortization-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);       /* 13px for data-dense table */
}

.amortization-table thead {
  position: sticky;
  top: 0;
  background: var(--color-gray-50);
  z-index: var(--z-sticky);
}

.amortization-table th {
  padding: var(--space-3) var(--space-4);
  text-align: right;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 2px solid var(--color-gray-200);
  white-space: nowrap;
}

.amortization-table th:first-child {
  text-align: left;
}

.amortization-table td {
  padding: var(--space-3) var(--space-4);
  text-align: right;
  border-bottom: 1px solid var(--color-gray-100);
  font-variant-numeric: tabular-nums;
  color: var(--color-gray-700);
}

.amortization-table td:first-child {
  text-align: left;
  font-weight: 500;
  color: var(--color-gray-900);
}

/* Alternating rows */
.amortization-table tbody tr:nth-child(even) {
  background: var(--color-gray-50);
}

/* PMI drop-off highlight */
.amortization-table tr.pmi-dropoff {
  background: var(--color-success-50);
  border: 1px solid var(--color-success-100);
}

/* "You are here" row */
.amortization-table tr.current-month {
  background: var(--color-primary-50);
}

.amortization-table tr.current-month td {
  color: var(--color-primary-600);
  font-weight: 600;
}
```

---

### 6.7 Navigation Components

#### Top Navigation Bar

```css
.top-nav {
  height: 56px;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
  gap: var(--space-3);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

/* Desktop */
@media (min-width: 1024px) {
  .top-nav {
    height: 64px;
    padding: 0 var(--space-8);
  }
}

.top-nav-logo {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-primary-600);
  text-decoration: none;
  flex-shrink: 0;
}

.top-nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}
```

#### Bottom Navigation Bar (Mobile)

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: var(--color-white);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  z-index: var(--z-sticky);
  padding-bottom: env(safe-area-inset-bottom); /* iPhone home indicator */
}

.bottom-nav-item {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: var(--color-gray-500);
  font-size: 10px;
  font-weight: 500;
  text-decoration: none;
  transition: color 150ms ease;
  cursor: pointer;
}

.bottom-nav-item.active {
  color: var(--color-primary-600);
}

.bottom-nav-icon {
  width: 24px;
  height: 24px;
}

/* Saved scenarios badge */
.bottom-nav-badge {
  position: absolute;
  top: 6px;
  right: calc(50% - 22px);
  background: var(--color-primary-600);
  color: white;
  font-size: 9px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
```

#### Calculator Type Tabs

```css
.calc-tabs {
  display: flex;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
}

.calc-tabs::-webkit-scrollbar {
  display: none;
}

.calc-tab {
  flex-shrink: 0;
  height: 36px;
  padding: 0 var(--space-4);
  font-size: var(--text-sm);
  font-weight: 500;
  white-space: nowrap;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
  color: var(--color-gray-600);
  background: var(--color-gray-100);
  border: none;
}

.calc-tab.active {
  background: var(--color-primary-600);
  color: var(--color-white);
  font-weight: 600;
}

.calc-tab:hover:not(.active) {
  background: var(--color-gray-200);
  color: var(--color-gray-900);
}
```

---

### 6.8 Toast Notifications

```css
.toast-container {
  position: fixed;
  bottom: calc(56px + 16px + env(safe-area-inset-bottom)); /* Above bottom nav */
  left: var(--space-4);
  right: var(--space-4);
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  pointer-events: none;
}

/* Desktop: top-right */
@media (min-width: 1024px) {
  .toast-container {
    top: var(--space-6);
    bottom: auto;
    right: var(--space-6);
    left: auto;
    width: 380px;
  }
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: var(--color-gray-900);
  color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  font-size: var(--text-base);
  font-weight: 500;
  pointer-events: all;
  
  animation: slide-up-fade 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.toast.success {
  background: var(--color-success-600);
}

.toast.warning {
  background: var(--color-warning-600);
}

.toast-dismiss {
  margin-left: auto;
  opacity: 0.7;
  cursor: pointer;
  flex-shrink: 0;
}
```

---

### 6.9 Sticky Bottom Result Panel (Mobile)

This is the always-visible mobile UX innovation - the result panel that stays at the bottom while scrolling inputs.

```css
.sticky-results-panel {
  position: fixed;
  bottom: 56px; /* Above bottom nav */
  left: 0;
  right: 0;
  background: var(--color-white);
  border-top: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow-sticky);
  padding: var(--space-3) var(--space-4);
  padding-bottom: calc(var(--space-3) + env(safe-area-inset-bottom));
  z-index: var(--z-sticky);
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.sticky-results-main {
  display: flex;
  flex-direction: column;
}

.sticky-results-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.sticky-results-amount {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--color-gray-900);
  line-height: 1.1;
}

.sticky-results-sub {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
  margin-top: 1px;
}

.sticky-results-action {
  flex-shrink: 0;
}
```

---

### 6.10 Loading States & Animations

```css
/* Skeleton loader for deferred content */
.skeleton {
  background: linear-gradient(90deg, 
    var(--color-gray-200) 25%, 
    var(--color-gray-100) 50%, 
    var(--color-gray-200) 75%
  );
  background-size: 200% 100%;
  border-radius: var(--radius-md);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

/* Number update animation */
.number-update {
  animation: number-pop 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes number-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Standard transitions */
--transition-fast: 100ms ease;
--transition-base: 150ms ease;
--transition-slow: 300ms ease;
--transition-spring: 300ms cubic-bezier(0.16, 1, 0.3, 1);

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 6.11 Accessibility Specifications

```css
/* Minimum touch target: 44×44px on all interactive elements */
/* Applied via invisible padding on small elements */
.touch-target {
  position: relative;
}
.touch-target::after {
  content: '';
  position: absolute;
  min-width: 44px;
  min-height: 44px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Focus ring - visible on keyboard, hidden on mouse */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-primary-600);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Skip to main content link */
.skip-to-main {
  position: absolute;
  top: -40px;
  left: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--color-primary-600);
  color: white;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  font-weight: 600;
  z-index: 9999;
  transition: top 150ms ease;
}

.skip-to-main:focus {
  top: 0;
}
```

**ARIA Implementation Patterns:**

```html
<!-- Currency Input with ARIA -->
<div role="group" aria-labelledby="home-price-label">
  <label id="home-price-label">
    Home Price
    <button aria-label="Learn about home price" aria-expanded="false">ⓘ</button>
  </label>
  <input 
    type="text" 
    inputmode="decimal"
    aria-label="Home price amount"
    aria-describedby="home-price-help"
    aria-required="true"
    autocomplete="off"
  />
  <p id="home-price-help" class="input-help-text">
    Enter the full purchase price of the property
  </p>
</div>

<!-- Live result region -->
<div 
  role="region" 
  aria-label="Calculation results" 
  aria-live="polite" 
  aria-atomic="false"
>
  <p>Monthly payment: <strong aria-label="2847 dollars per month">$2,847/mo</strong></p>
</div>

<!-- Slider ARIA -->
<input 
  type="range"
  role="slider"
  aria-label="Home price slider"
  aria-valuemin="50000"
  aria-valuemax="2000000"
  aria-valuenow="450000"
  aria-valuetext="$450,000"
/>
```

---

## 7. Iconography

**Icon System:** Heroicons v2 (outline style) - MIT licensed, consistent with Tailwind ecosystem

**Icon Sizes:**
| Context | Size | Token |
|---------|------|-------|
| Button icons | 18px | `--icon-sm` |
| Default icons | 20px | `--icon-md` |
| Feature icons | 24px | `--icon-lg` |
| Empty states | 48px | `--icon-xl` |

**Key Icons Used:**

| Usage | Icon Name |
|-------|-----------|
| Info / Tooltip trigger | `information-circle` |
| Save scenario | `bookmark` |
| Share | `share` |
| PDF Export | `document-arrow-down` |
| Copy link | `clipboard-document` |
| WhatsApp | Custom SVG |
| Email | `envelope` |
| Close modal | `x-mark` |
| Country / Globe | `globe-alt` |
| Calculator | `calculator` |
| Settings / Advanced | `adjustments-horizontal` |
| Warning | `exclamation-triangle` |
| Success | `check-circle` |
| Error | `x-circle` |
| Chart | `chart-bar` |
| Table | `table-cells` |
| Chevron down | `chevron-down` |
| Arrow right | `arrow-right` |

---

## 8. Illustrations & Data Visualization

### 8.1 Chart Specifications

**Library:** Recharts (React-native, responsive, touch-interactive, lightweight)

**Donut Chart (Monthly Payment Breakdown)**

```javascript
// Configuration
{
  width: "100%",
  height: 200,           // 200px on mobile, 240px on desktop
  innerRadius: "60%",
  outerRadius: "80%",
  
  // Center label shows total
  centerContent: {
    primaryText: "$2,847",  // total monthly payment
    secondaryText: "/month"
  },
  
  // Segment colors mapped to chart tokens
  colors: {
    principal: "#1D4ED8",
    interest:  "#F59E0B",
    tax:       "#8B5CF6",
    insurance: "#10B981",
    pmi:       "#F43F5E",
    hoa:       "#64748B"
  },
  
  // Mobile touch: tap segment to see detail
  activeShape: { outerRadius: "87%" },
  tooltip: { formatter: (value) => formatCurrency(value) }
}
```

**Area Chart (Amortization Over Time)**

```javascript
{
  width: "100%",
  height: 220,           // mobile
  
  axes: {
    x: { 
      label: "Year",
      tickCount: 6,
      fontSize: 11
    },
    y: { 
      label: "Amount",
      tickFormatter: (v) => `$${abbreviateLargeNumber(v)}`,
      fontSize: 11
    }
  },
  
  series: [
    {
      dataKey: "remainingBalance",
      label: "Remaining Balance",
      color: "#0EA5E9",
      fill: "rgba(14,165,233,0.1)",
      strokeWidth: 2
    },
    {
      dataKey: "cumulativePrincipal",
      label: "Principal Paid",
      color: "#1D4ED8",
      fill: "rgba(29,78,216,0.08)",
      strokeWidth: 2
    },
    {
      dataKey: "cumulativeInterest",
      label: "Interest Paid",
      color: "#F59E0B",
      fill: "rgba(245,158,11,0.08)",
      strokeWidth: 2
    }
  ],
  
  // Equity milestones as reference lines
  referenceLines: [
    { y: 0.25, label: "25% Equity", stroke: "#22C55E", strokeDasharray: "4 4" },
    { y: 0.50, label: "50% Equity", stroke: "#22C55E", strokeDasharray: "4 4" },
  ],
  
  // Touch tooltip
  tooltip: {
    content: CustomTooltipComponent  // shows all 3 values at tapped point
  }
}
```

---

# PART TWO: API & INTEGRATION SPECIFICATION

---

## 9. Third-Party Integration Overview

The app's architecture deliberately minimizes third-party API dependencies to maximize reliability and Lighthouse scores. The PRD specifies client-side calculations with no runtime API calls for the core calculator. Third-party services are used only for: geolocation, analytics, PDF generation (client-side), and future-proofing.

| Service | Category | Runtime API Call? | V1/V2 |
|---------|----------|-------------------|-------|
| Vercel Edge Network | Hosting + Geo | Yes (edge, <5ms) | V1 |
| Plausible Analytics | Analytics | Yes (async, non-blocking) | V1 |
| jsPDF + html2canvas | PDF Generation | No (client-side library) | V1 |
| nuqs | URL State | No (client-side) | V1 |
| IP Geolocation (Vercel) | Geo Detection | Yes (edge header) | V1 |
| PostHog | Product Analytics | Yes (async) | V1 |
| WhatsApp Share API | Sharing | No (URL scheme) | V1 |
| Web Share API | Native Sharing | No (browser API) | V1 |

---

## 10. Integration 1: IP Geolocation - Vercel Edge

### 10.1 What It Does

Automatically detects the user's country on first visit to pre-load the correct currency, benchmark interest rate, local terminology, and region defaults. This is a core P0 feature and the foundation of MOAT 1.

### 10.2 Implementation

Vercel automatically appends geolocation headers to every request when deployed on Vercel infrastructure. No external API call is required - this runs at the CDN edge with effectively zero latency.

**How it's accessed (Next.js):**

```typescript
// app/layout.tsx or middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const countryCode = request.geo?.country ?? 'US'
  const regionCode = request.geo?.region ?? ''
  const city = request.geo?.city ?? ''
  
  // Pass to app via header or cookie
  const response = NextResponse.next()
  response.headers.set('x-detected-country', countryCode)
  response.headers.set('x-detected-region', regionCode)
  
  return response
}
```

### 10.3 Data Sent

Nothing is sent to an external service. Vercel reads the incoming request's IP address at the edge network level and appends headers. No user data leaves the application.

### 10.4 Response / Headers Received

| Header | Type | Example | Description |
|--------|------|---------|-------------|
| `x-vercel-ip-country` | `string` | `"AU"` | ISO 3166-1 alpha-2 country code |
| `x-vercel-ip-country-region` | `string` | `"VIC"` | ISO 3166-2 region code |
| `x-vercel-ip-city` | `string` | `"Melbourne"` | City name (best effort) |
| `x-vercel-ip-latitude` | `string` | `"-37.8136"` | Latitude (not used in V1) |
| `x-vercel-ip-longitude` | `string` | `"144.9631"` | Longitude (not used in V1) |

### 10.5 Fallback Behavior

```typescript
const GEO_FALLBACK = {
  country: 'US',
  region: null,
  city: null
}

function resolveGeoDefaults(
  countryCode: string | null,
  regionCode: string | null
): CountryConfig {
  // 1. Try exact country + region match
  // 2. Try country match with no region
  // 3. Fall back to US defaults
  // User can always override via the Country Selector
  
  const country = COUNTRY_DATA.find(c => c.code === countryCode) 
                  ?? COUNTRY_DATA.find(c => c.code === 'US')!
  
  const region = country.regions?.find(r => r.code === regionCode) ?? null
  
  return { country, region }
}
```

### 10.6 Privacy Compliance

- No IP address is stored in application logs
- The geolocation is only used to set a default that users can immediately override
- GDPR compliant: IP-based country detection does not constitute personal data collection under GDPR when no storage occurs
- No cookie is set for geolocation data; it is stored in React state only for the session

---

## 11. Integration 2: Plausible Analytics

### 11.1 What It Does

Privacy-first, GDPR-compliant web analytics. Tracks page views, key events (calculation completions, share clicks, saves, PDF exports), traffic sources, and geographic distribution of visitors. No cookies, no personal data.

**Chosen over Google Analytics because:**
- No cookie consent banner required in EU (no personal data collection)
- Script size: ~1KB vs GA4's ~75KB
- No data sharing with advertising networks
- Self-hostable in V2 if needed

### 11.2 Script Loading

```html
<!-- In <head>, using Next.js Script component with strategy="afterInteractive" -->
<Script
  defer
  data-domain="your-domain.com"
  src="https://plausible.io/js/script.tagged-events.js"
  strategy="afterInteractive"
/>
```

**Critical:** `strategy="afterInteractive"` ensures this never blocks the initial render or affects Lighthouse scores.

### 11.3 Pageview Tracking

Plausible automatically tracks pageviews on route changes in Next.js via its script. No additional code needed for standard pageviews.

For the SEO landing pages, Plausible captures:
- `/us/texas/mortgage-calculator` as a distinct page
- Full URL path including country and region segments
- Referrer (organic search, direct, shared link)

### 11.4 Custom Event Tracking

All custom events use Plausible's `plausible()` function. Events are batched and sent asynchronously - they never block the UI thread.

**TypeScript wrapper:**

```typescript
// lib/analytics.ts

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { 
      props?: Record<string, string | number | boolean>
      callback?: () => void
    }) => void
  }
}

export function trackEvent(
  eventName: PlausibleEvent,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props })
  }
}

export type PlausibleEvent = 
  | 'calculation_completed'
  | 'scenario_saved'
  | 'scenario_loaded'
  | 'scenario_compared'
  | 'pdf_exported'
  | 'link_shared'
  | 'whatsapp_shared'
  | 'email_shared'
  | 'country_changed'
  | 'calculator_type_changed'
  | 'advanced_options_opened'
  | 'tooltip_opened'
  | 'amortization_table_viewed'
  | 'rate_suggestion_used'
```

### 11.5 Events: Specification Table

| Event Name | Trigger | Properties Sent | Purpose |
|-----------|---------|-----------------|---------|
| `calculation_completed` | User has all required fields filled, results displayed | `calculator_type`, `country`, `region`, `loan_amount_range` (bucketed) | Core engagement metric |
| `scenario_saved` | User clicks "Save" and confirms | `calculator_type`, `scenario_count` | Moat validation |
| `scenario_loaded` | Return visitor loads saved scenario | `calculator_type`, `age_hours` (time since saved) | Retention metric |
| `scenario_compared` | Comparison mode entered | `calculator_type` | Feature adoption |
| `pdf_exported` | PDF download triggered | `calculator_type`, `country` | Moat validation |
| `link_shared` | "Copy Link" clicked | `calculator_type`, `country`, `method: 'copy'` | Viral loop metric |
| `whatsapp_shared` | WhatsApp button clicked | `calculator_type`, `country`, `method: 'whatsapp'` | Viral loop metric |
| `email_shared` | Email share clicked | `calculator_type`, `country`, `method: 'email'` | Viral loop metric |
| `country_changed` | User changes country | `from_country`, `to_country` | UX insight |
| `calculator_type_changed` | User switches calculator tab | `from_type`, `to_type` | Navigation insight |
| `advanced_options_opened` | "Advanced Options" expanded | `calculator_type` | Feature insight |
| `tooltip_opened` | Info icon tapped/clicked | `field_name`, `country` | Content insight |
| `amortization_table_viewed` | Table tab/button clicked | `calculator_type` | Feature adoption |
| `rate_suggestion_used` | "Use average rate" clicked | `country`, `benchmark_rate` | UX insight |

### 11.6 Example Event Calls

```typescript
// When user has valid calculation results displayed
trackEvent('calculation_completed', {
  calculator_type: 'mortgage',
  country: 'US',
  region: 'TX',
  loan_amount_range: '$400k-$500k'  // bucketed, never exact
})

// When PDF is exported
trackEvent('pdf_exported', {
  calculator_type: 'mortgage',
  country: 'AU'
})

// When share link is copied
trackEvent('link_shared', {
  calculator_type: 'mortgage',
  country: 'US',
  method: 'copy'
})
```

### 11.7 Data Received from Plausible

Plausible provides aggregated, anonymized data via its dashboard (no raw event API in the free tier). In V1, data is accessed via the Plausible dashboard at `analytics.plausible.io`.

For V2, the **Plausible Stats API** can be used to embed analytics:

```
GET https://plausible.io/api/v1/stats/aggregate

Headers:
  Authorization: Bearer {API_KEY}

Query Parameters:
  site_id=your-domain.com
  period=30d
  metrics=visitors,pageviews,bounce_rate,visit_duration
  filters=event:country==US

Response (200):
{
  "results": {
    "visitors": { "value": 12847 },
    "pageviews": { "value": 34291 },
    "bounce_rate": { "value": 38.2 },
    "visit_duration": { "value": 224 }
  }
}
```

---

## 12. Integration 3: PDF Generation - jsPDF + html2canvas

### 12.1 What It Does

Generates a professionally formatted PDF of the loan calculation summary entirely on the client side. No server, no API call, no cost per export, no user data transmitted to any third party.

**Libraries:**
- `jsPDF` v2.5+ - PDF document generation
- `html2canvas` v1.4+ - Renders a hidden HTML div to canvas (for chart capture)

### 12.2 Implementation Architecture

The PDF is generated by:
1. Rendering a hidden, print-optimized HTML component (`<PDFTemplate />`)
2. Capturing the chart using `html2canvas`
3. Using `jsPDF` to compose the final document programmatically

```typescript
// lib/pdf-generator.ts

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { CalculatorResult, CountryConfig } from '@/types'

interface PDFExportOptions {
  result: CalculatorResult
  country: CountryConfig
  scenarioName?: string
}

export async function exportToPDF(options: PDFExportOptions): Promise<void> {
  const { result, country, scenarioName } = options
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  })
  
  const PAGE_WIDTH = 210  // A4 mm
  const PAGE_HEIGHT = 297
  const MARGIN = 20
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
  
  // ── Page 1: Summary ──────────────────────────────────
  
  // Header bar
  doc.setFillColor(29, 78, 216)  // primary-600
  doc.rect(0, 0, PAGE_WIDTH, 28, 'F')
  
  // App name
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(255, 255, 255)
  doc.text('LoanCalc', MARGIN, 18)
  
  // Scenario name
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(scenarioName ?? 'Mortgage Calculation', PAGE_WIDTH - MARGIN, 18, { align: 'right' })
  
  // Generated date
  doc.setFontSize(8)
  doc.setTextColor(200, 200, 200)
  doc.text(`Generated ${new Date().toLocaleDateString()}`, PAGE_WIDTH - MARGIN, 24, { align: 'right' })
  
  // Monthly payment hero
  let y = 44
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text('ESTIMATED MONTHLY PAYMENT', MARGIN, y)
  
  y += 10
  doc.setFontSize(36)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(17, 24, 39)  // gray-900
  doc.text(
    formatCurrency(result.monthlyPaymentTotal, country.currency),
    MARGIN,
    y
  )
  
  // ... continue building the document
  
  // Capture chart from hidden DOM element
  const chartEl = document.getElementById('pdf-chart-hidden')
  if (chartEl) {
    const canvas = await html2canvas(chartEl, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false
    })
    const imgData = canvas.toDataURL('image/jpeg', 0.9)
    doc.addImage(imgData, 'JPEG', MARGIN, y, CONTENT_WIDTH, 60)
  }
  
  // ── Page 2: Amortization Schedule ───────────────────
  doc.addPage()
  buildAmortizationTable(doc, result.amortizationSchedule, country, MARGIN)
  
  // ── Footer on all pages ──────────────────────────────
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      'This is an estimate for illustrative purposes only. Consult a licensed mortgage professional.',
      MARGIN,
      PAGE_HEIGHT - 10
    )
    doc.text(
      `Page ${i} of ${pageCount}`,
      PAGE_WIDTH - MARGIN,
      PAGE_HEIGHT - 10,
      { align: 'right' }
    )
  }
  
  // Trigger download
  const fileName = `loan-calculation-${formatDateForFile(new Date())}.pdf`
  doc.save(fileName)
}
```

### 12.3 Data Sent

**Zero.** jsPDF and html2canvas run entirely in the browser. No data is transmitted to any server or third party. The PDF is generated in memory and downloaded directly to the user's device.

### 12.4 PDF Document Structure

**Page 1 - Summary:**
```
┌─────────────────────────────────┐
│ [BLUE HEADER] LoanCalc  [Date] │  ← 28mm
├─────────────────────────────────┤
│ ESTIMATED MONTHLY PAYMENT       │
│ $2,847/month                   │  ← Large display
├─────────────────────────────────┤
│ LOAN DETAILS        BREAKDOWN   │
│ Home Price $450K    P&I  $2,149 │
│ Down Payment 20%   Tax   $298  │
│ Loan Term 30yr     Ins   $200  │
│ Rate 6.85%         PMI   $200  │
├─────────────────────────────────┤
│ [Donut Chart]                   │  ← html2canvas
├─────────────────────────────────┤
│ TOTAL COST SUMMARY              │
│ Total Interest     $287,478     │
│ Total Paid         $687,478     │
│ Payoff Date        Oct 2054     │
│ LTV Ratio          80%          │
├─────────────────────────────────┤
│ [Disclaimer]                    │
└─────────────────────────────────┘

Page 2 - Annual Amortization Schedule Table
```

### 12.5 Error Handling

```typescript
export async function exportToPDFWithErrorHandling(
  options: PDFExportOptions
): Promise<{ success: boolean; error?: string }> {
  try {
    await exportToPDF(options)
    return { success: true }
  } catch (error) {
    console.error('PDF generation failed:', error)
    
    // Fallback: offer text copy
    offerTextFallback(options.result)
    
    return { 
      success: false, 
      error: 'PDF generation failed. A text summary has been copied to your clipboard.' 
    }
  }
}

function offerTextFallback(result: CalculatorResult): void {
  const text = buildTextSummary(result)
  navigator.clipboard.writeText(text).catch(() => {
    // Clipboard also failed - show modal with text to manually copy
    showTextSummaryModal(text)
  })
}
```

### 12.6 Performance Considerations

- jsPDF + html2canvas combined bundle size: ~150KB gzipped
- **These are loaded lazily** - only when the user clicks "Export PDF"
- Load is triggered via dynamic import:

```typescript
async function handlePDFExport() {
  setIsGenerating(true)
  
  // Lazy load only when needed - not in initial bundle
  const { exportToPDF } = await import('@/lib/pdf-generator')
  
  await exportToPDF({ result, country, scenarioName })
  setIsGenerating(false)
  trackEvent('pdf_exported', { calculator_type, country: country.code })
}
```

---

## 13. Integration 4: URL State Management - nuqs

### 13.1 What It Does

Encodes all calculator input values into the URL query string in real-time as users interact with the calculator. This enables the shareable URL feature (MOAT 2) - every state of the calculator is linkable.

**Library:** `nuqs` (Next.js URL query state) - 3.2KB gzipped, designed specifically for Next.js App Router.

### 13.2 What It Does NOT Do

- Does not make any network requests
- Does not communicate with any external service
- Does not set cookies
- Does not store any data on a server

### 13.3 URL Schema Implementation

```typescript
// hooks/useMortgageUrlState.ts
import { useQueryStates, parseAsFloat, parseAsString, 
         parseAsBoolean, parseAsInteger } from 'nuqs'

export function useMortgageUrlState() {
  return useQueryStates({
    // Location
    c:   parseAsString.withDefault('US'),      // country code
    r:   parseAsString.withDefault(''),         // region code
    
    // Core inputs
    p:   parseAsFloat.withDefault(450000),      // property price
    dp:  parseAsFloat.withDefault(90000),       // down payment amount
    dpp: parseAsFloat.withDefault(20),          // down payment percent
    t:   parseAsInteger.withDefault(30),        // loan term (years)
    ir:  parseAsFloat.withDefault(6.85),        // interest rate
    lt:  parseAsString.withDefault('fixed'),    // loan type
    sd:  parseAsString.withDefault(''),         // start date (YYYY-MM)
    
    // Advanced inputs
    pt:  parseAsFloat.withDefault(0),           // property tax rate
    ins: parseAsFloat.withDefault(0),           // annual insurance
    pmi: parseAsBoolean.withDefault(true),      // PMI enabled
    hoa: parseAsFloat.withDefault(0),           // HOA monthly
    em:  parseAsFloat.withDefault(0),           // extra monthly payment
    cs:  parseAsString.withDefault(''),         // credit score range
  }, {
    // Update URL without creating browser history entries
    // (prevents back button filling up history)
    history: 'replace',
    
    // Throttle URL updates to prevent performance issues on slider drag
    shallow: true
  })
}
```

### 13.4 Share URL Generation

```typescript
// lib/share.ts

export function generateShareableURL(params: MortgageParams): string {
  const url = new URL(window.location.href)
  
  // Params are already in the URL via nuqs
  // Just return the current URL
  return url.toString()
}

export interface ShareOptions {
  url: string
  title: string
  text: string
}

export async function shareCalculation(
  options: ShareOptions,
  method: 'native' | 'copy' | 'whatsapp' | 'email' | 'sms'
): Promise<void> {
  const { url, title, text } = options
  
  switch (method) {
    case 'native':
      // Web Share API - triggers native OS share sheet on mobile
      if (navigator.share) {
        await navigator.share({ title, text, url })
      }
      break
      
    case 'copy':
      await navigator.clipboard.writeText(url)
      // Show "Copied!" toast
      break
      
    case 'whatsapp':
      // WhatsApp URL scheme - opens WhatsApp with pre-filled message
      const waMessage = encodeURIComponent(`${text}\n${url}`)
      window.open(`https://wa.me/?text=${waMessage}`, '_blank', 'noopener')
      break
      
    case 'email':
      const emailBody = encodeURIComponent(`${text}\n\nView calculation: ${url}`)
      const emailSubject = encodeURIComponent(title)
      window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`
      break
      
    case 'sms':
      const smsBody = encodeURIComponent(`${text} ${url}`)
      window.location.href = `sms:?body=${smsBody}`
      break
  }
}
```

### 13.5 URL Validation on Load

When a shared URL is opened, the encoded parameters must be validated before use:

```typescript
// lib/url-validation.ts

export function validateAndSanitizeMortgageParams(
  raw: Partial<MortgageRawParams>
): MortgageParams {
  return {
    propertyPrice: clamp(
      parseFloat(String(raw.p ?? 450000)), 
      10000,          // min: $10K
      50_000_000      // max: $50M
    ),
    
    downPaymentAmount: clamp(
      parseFloat(String(raw.dp ?? 90000)),
      0,
      parseFloat(String(raw.p ?? 450000)) * 0.99  // can't exceed 99% of price
    ),
    
    loanTermYears: validateLoanTerm(
      parseInt(String(raw.t ?? 30)),
      getCountryConfig(String(raw.c ?? 'US'))
    ),
    
    interestRate: clamp(
      parseFloat(String(raw.ir ?? 6.85)),
      0.01,           // min: 0.01%
      30              // max: 30% - catches URL manipulation
    ),
    
    loanType: ['fixed', 'variable', 'interest-only'].includes(String(raw.lt))
      ? String(raw.lt) as LoanType
      : 'fixed',
      
    // ... etc
  }
}

function clamp(value: number, min: number, max: number): number {
  if (isNaN(value)) return min
  return Math.min(Math.max(value, min), max)
}
```

---

## 14. Integration 5: PostHog (Product Analytics)

### 14.1 What It Does

Complements Plausible (which provides aggregate traffic analytics) with product analytics: session recordings, funnel analysis, feature flags for A/B testing in V2, and heatmaps. Used to understand *how* users interact with the calculator, not just *how many*.

**Configuration for privacy compliance:**
- Session recordings masked by default (all input values hidden)
- No personal data captured
- EU data residency option enabled

### 14.2 Script Loading

```typescript
// app/providers.tsx (client component)
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.posthog.com',
    
    // Privacy settings
    autocapture: false,          // disable auto-click capture (GDPR safe)
    capture_pageview: false,     // manual pageview tracking via Next.js router
    capture_pageleave: true,
    
    // Session recording (masked inputs)
    session_recording: {
      maskAllInputs: true,        // masks all <input> values
      maskTextSelector: '.pii',   // additionally mask any .pii elements
    },
    
    // Performance: don't block initial render
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') ph.opt_out_capturing()
    },
    
    persistence: 'localStorage',  // no cookies
  })
}
```

### 14.3 Events Sent to PostHog

PostHog receives the same events as Plausible (mirrored for funnel analysis capability):

```typescript
// lib/analytics.ts (extended)

export function trackEventFull(
  eventName: string,
  props: Record<string, string | number | boolean>
): void {
  // Send to Plausible (aggregate)
  if (window.plausible) {
    window.plausible(eventName, { props })
  }
  
  // Send to PostHog (product analytics)
  posthog.capture(eventName, {
    ...props,
    // Additional context PostHog can use
    $current_url: window.location.href,
    calculator_version: '1.0',
  })
}
```

### 14.4 Data Sent to PostHog

```
Endpoint: POST https://eu.posthog.com/capture/
Content-Type: application/json

Request body (example - calculation_completed event):
{
  "api_key": "{POSTHOG_KEY}",
  "event": "calculation_completed",
  "properties": {
    "distinct_id": "{anonymous UUID - generated locally, no PII}",
    "$current_url": "https://domain.com/us/texas/mortgage-calculator",
    "calculator_type": "mortgage",
    "country": "US",
    "region": "TX",
    "loan_amount_range": "$400k-$500k",
    "loan_term": 30,
    "loan_type": "fixed",
    "calculator_version": "1.0"
  },
  "timestamp": "2025-03-15T14:23:11Z"
}
```

### 14.5 Response Expected

```json
{
  "status": 1
}
```

HTTP 200. PostHog event capture is fire-and-forget - errors are silently swallowed and never impact the user experience.

### 14.6 Feature Flags (V2 A/B Testing)

PostHog feature flags will be used in V2 to A/B test:
- Slider vs input-only for home price
- Position of the sticky results panel
- "Save Scenario" button text variants
- Country selector placement

```typescript
// V2 feature flag usage pattern (documented now for future implementation)
const showNewSliderDesign = posthog.isFeatureEnabled('new-slider-v2')
```

---

## 15. Integration 6: Web Share API & Native Sharing

### 15.1 What It Does

The browser's native Web Share API triggers the operating system's native share sheet on mobile (iOS and Android). This provides the most friction-free sharing experience - users see their native WhatsApp, Messages, AirDrop, etc.

### 15.2 Feature Detection

```typescript
export const canUseWebShareAPI = (): boolean => {
  return typeof navigator !== 'undefined' 
    && 'share' in navigator
    && typeof navigator.share === 'function'
}

export const canShareFiles = (): boolean => {
  return canUseWebShareAPI() && 'canShare' in navigator
}
```

### 15.3 Share Sheet Implementation

```typescript
// components/ShareSheet.tsx

interface ShareSheetProps {
  url: string
  calculatorType: string
  monthlyPayment: string
  country: string
}

export function ShareSheet({ url, calculatorType, monthlyPayment, country }: ShareSheetProps) {
  const shareTitle = `My ${calculatorType} calculation`
  const shareText = `Monthly payment: ${monthlyPayment} - calculated with LoanCalc`
  
  const handleNativeShare = async () => {
    if (!canUseWebShareAPI()) return
    
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: url
      })
      trackEvent('link_shared', { method: 'native', country })
    } catch (err) {
      // User cancelled - not an error
      if ((err as Error).name !== 'AbortError') {
        console.warn('Share failed:', err)
      }
    }
  }
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      showToast('Link copied to clipboard!')
      trackEvent('link_shared', { method: 'copy', country })
    } catch {
      // Fallback for clipboard API failure
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      showToast('Link copied!')
    }
  }
  
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`${shareText}\n${url}`)
    window.open(`https://wa.me/?text=${message}`, '_blank', 'noopener,noreferrer')
    trackEvent('whatsapp_shared', { country })
  }
  
  const handleEmail = () => {
    const subject = encodeURIComponent(shareTitle)
    const body = encodeURIComponent(`${shareText}\n\nView full calculation:\n${url}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
    trackEvent('email_shared', { country })
  }
  
  const handleSMS = () => {
    const body = encodeURIComponent(`${shareText} ${url}`)
    // iOS uses &body=, Android uses ?body=
    const separator = /iphone|ipad|ipod/i.test(navigator.userAgent) ? '&' : '?'
    window.location.href = `sms:${separator}body=${body}`
    trackEvent('sms_shared', { country })
  }
  
  return (/* render share options */)
}
```

### 15.4 Data Sent

- Web Share API: Passes `title`, `text`, and `url` to the OS. The app does not receive any information back about where the user shared.
- WhatsApp URL scheme: Opens `https://wa.me/?text=...` in a new tab. WhatsApp handles the sharing; no data is sent from our app to WhatsApp servers.
- Email: Opens the user's default mail client via `mailto:`. No server involved.
- SMS: Opens the user's SMS app via `sms:` URL scheme.

### 15.5 No Server Required

All sharing is handled via browser APIs and URL schemes. No share endpoint, no server-side URL shortening, no external API.

---

## 16. Integration 7: LocalStorage Scenario Persistence

### 16.1 What It Does

Saves up to 5 mortgage scenarios to the browser's localStorage. Scenarios persist across browser closes and sessions until the user manually deletes them or clears browser data.

### 16.2 Data Structure

```typescript
// types/scenario.ts

export interface SavedScenario {
  id: string                    // UUID generated at save time
  name: string                  // User-provided name
  calculatorType: CalculatorType
  createdAt: string             // ISO 8601 timestamp
  updatedAt: string
  params: MortgageParams | PersonalLoanParams | CarLoanParams  // etc
  snapshot: {
    // Cached result values for quick display in the saved list
    monthlyPayment: number
    totalInterest: number
    payoffDate: string
    currency: string
    country: string
    region: string | null
  }
}

export const STORAGE_KEY = 'loancalc_saved_scenarios_v1'
export const MAX_SCENARIOS = 5
```

### 16.3 Storage Interface

```typescript
// lib/scenario-storage.ts

export function getSavedScenarios(): SavedScenario[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    // Validate structure before returning
    return Array.isArray(parsed) ? parsed.filter(isValidScenario) : []
  } catch {
    // localStorage unavailable or data corrupt
    return []
  }
}

export function saveScenario(scenario: Omit<SavedScenario, 'id' | 'createdAt' | 'updatedAt'>): {
  success: boolean
  requiresDelete?: boolean
} {
  const existing = getSavedScenarios()
  
  if (existing.length >= MAX_SCENARIOS) {
    return { success: false, requiresDelete: true }
  }
  
  const newScenario: SavedScenario = {
    ...scenario,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  const updated = [...existing, newScenario]
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return { success: true }
  } catch (e) {
    // localStorage quota exceeded (rare - each scenario ~2KB)
    console.warn('localStorage save failed:', e)
    return { success: false }
  }
}

export function deleteScenario(id: string): boolean {
  const existing = getSavedScenarios()
  const updated = existing.filter(s => s.id !== id)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return true
  } catch {
    return false
  }
}

export function getScenarioStorageSize(): number {
  // Each scenario ≈ 2-3KB
  // 5 scenarios ≈ 10-15KB - well within 5MB localStorage limit
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? ''
    return new Blob([raw]).size
  } catch {
    return 0
  }
}
```

### 16.4 Privacy & Data Considerations

- All data lives entirely in the user's browser
- No scenario data is ever transmitted to any server
- GDPR compliant: localStorage is not a cookie and does not require consent
- Users are informed in the UI that data is local and will be lost on browser clear
- Warning toast when first saving: "Your scenario is saved locally on this device"

---

## 17. Integration 8: Country Rate Data - Static JSON

### 17.1 What It Does

Provides benchmark interest rates, regional property tax defaults, loan term conventions, currency formatting, and terminology overrides for all 15 V1 countries. This is the backbone of MOAT 1.

### 17.2 Why Static JSON Over a Live API

Per the PRD: "A quarterly-updated JSON achieves 90% of the value with 5% of the complexity." Live rate APIs (Bankrate API, Freddie Mac PMMS API, etc.) introduce:
- API costs per request
- Rate limits
- Latency (adds to page load)
- Failure modes
- API key management overhead

The static JSON is bundled with the application, served from CDN, and is available instantly with zero latency.

### 17.3 Data File Location

```
/public/data/country-rates.json   ← served as static asset
/data/country-rates.ts            ← TypeScript module (imported at build time for SSG)
```

### 17.4 Update Cadence

The JSON is updated quarterly (Jan, Apr, Jul, Oct) by the product team. The update process:
1. Product team researches current rates from official central bank sources
2. JSON is updated in the repository
3. Vercel automatically rebuilds and deploys
4. The `benchmarkRateUpdated` field in the JSON reflects the update date
5. The UI displays this date next to the pre-filled rate

### 17.5 Full Data Schema

```typescript
// types/country-data.ts

export interface CurrencyConfig {
  code: string           // "USD", "GBP", "AUD"
  symbol: string         // "$", "£", "A$"
  format: string         // Intl.NumberFormat locale string: "en-US", "en-AU"
  position: 'before' | 'after'  // "$450K" vs "450K kr"
  decimalSeparator: '.' | ','
  thousandsSeparator: ',' | '.' | ' '
}

export interface RegionData {
  code: string
  name: string
  propertyTaxRate: number | null    // annual rate as decimal (0.018 = 1.8%)
  propertyTaxLabel?: string         // "Property Tax" / "Council Rates" / "Land Tax"
  stampDutyEnabled: boolean
  stampDutyLabel?: string           // "Stamp Duty" / "Transfer Tax" / "Land Transfer Tax"
  stampDutyNotes?: string           // Brief description for tooltip
  firstHomeBuyerGrantAmount?: number
  firstHomeBuyerGrantThreshold?: number  // Property price limit for grant
  firstHomeBuyerGrantLabel?: string
  insuranceDefaultMonthly?: number  // Estimated monthly insurance for region
  localNotes?: string               // Any important local context
}

export interface CountryData {
  code: string              // ISO 3166-1 alpha-2
  name: string
  currency: CurrencyConfig
  
  benchmarkRate: number     // As percentage: 6.85 (not 0.0685)
  benchmarkRateLabel: string
  benchmarkRateSource: string   // "Freddie Mac PMMS", "Bank of England", etc.
  benchmarkRateUpdated: string  // ISO date: "2025-01-15"
  
  defaultLoanTermYears: number
  loanTermOptions: number[]
  
  mortgageInsuranceLabel: string  // "PMI" / "LMI" / "Mortgage Insurance"
  mortgageInsuranceThreshold: number  // 0.80 = required if LTV > 80%
  mortgageInsuranceEnabled: boolean
  
  terminology: {
    downPayment: string             // "Down Payment" / "Deposit"
    propertyTax: string             // "Property Tax" / "Council Rates"
    homeownersInsurance: string     // "Homeowners Insurance" / "Buildings Insurance"
    loanType: string                // "Loan Type" / "Mortgage Type"
    fixedRate: string               // "Fixed Rate" / "Fixed Rate Mortgage"
    variableRate: string            // "Variable Rate" / "Tracker Rate" / "ARM"
    principalAndInterest: string    // "Principal & Interest" / "Capital & Interest"
  }
  
  loanPurposeOptions: ('purchase' | 'refinance' | 'equity-release')[]
  
  commonLoanTypes: ('fixed' | 'variable' | 'interest-only' | 'arm')[]
  
  regions: RegionData[]
  
  disclaimerText: string  // Country-specific legal disclaimer
}

export interface CountryRatesFile {
  version: string           // "1.2.0"
  lastUpdated: string       // "2025-01-15"
  nextUpdateDue: string     // "2025-04-01"
  countries: CountryData[]
}
```

### 17.6 Data Access Pattern

```typescript
// lib/country-data.ts

import countryRates from '@/public/data/country-rates.json'
import type { CountryRatesFile, CountryData, RegionData } from '@/types'

const data = countryRates as CountryRatesFile

export function getCountryData(countryCode: string): CountryData | null {
  return data.countries.find(c => c.code === countryCode.toUpperCase()) ?? null
}

export function getRegionData(
  countryCode: string, 
  regionCode: string
): RegionData | null {
  const country = getCountryData(countryCode)
  if (!country) return null
  return country.regions.find(r => r.code === regionCode.toUpperCase()) ?? null
}

export function getAllCountries(): CountryData[] {
  return data.countries
}

export function getDataVersion(): string {
  return data.version
}

export function getDataLastUpdated(): string {
  return data.lastUpdated
}
```

---

## 18. Environment Variables

All environment variables required for integrations:

```bash
# .env.local (development)
# .env.production (production - set in Vercel dashboard)

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com

# Plausible (domain, not a secret)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com

# App config
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=LoanCalc

# Feature flags (simple on/off for V1)
NEXT_PUBLIC_ENABLE_PDF_EXPORT=true
NEXT_PUBLIC_ENABLE_SHARE=true
NEXT_PUBLIC_ENABLE_SCENARIOS=true
NEXT_PUBLIC_MAX_SAVED_SCENARIOS=5

# Analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Vercel (automatically available in Vercel deployments)
# VERCEL_ENV, VERCEL_URL - no configuration needed
```

---

## 19. Integration Error Handling Strategy

All third-party integrations follow this principle: **They must never break the core calculator.** The calculator is the product. Everything else is optional enhancement.

```typescript
// lib/safe-integration.ts

export function safeExecute<T>(
  fn: () => T | Promise<T>,
  fallback: T,
  context: string
): T | Promise<T> {
  try {
    const result = fn()
    if (result instanceof Promise) {
      return result.catch(error => {
        console.warn(`[${context}] Integration failed silently:`, error)
        return fallback
      })
    }
    return result
  } catch (error) {
    console.warn(`[${context}] Integration failed silently:`, error)
    return fallback
  }
}

// Usage examples:
const scenarios = safeExecute(
  () => getSavedScenarios(),
  [],                          // fallback: empty array
  'LocalStorage'
)

const countryData = safeExecute(
  () => getCountryData(geoCode),
  getCountryData('US')!,       // fallback: US defaults
  'GeoDetection'
)
```

**Integration Failure Modes:**

| Integration | Failure Mode | User Impact | Fallback |
|------------|--------------|-------------|---------|
| Vercel Geo | Header missing | Minor | Default to US |
| Plausible | Script blocked | None | Events silently dropped |
| PostHog | Network error | None | Events silently dropped |
| jsPDF | Library load fail | PDF button fails | Text copy fallback |
| Web Share API | Not supported | Share sheet unavailable | Show manual copy UI |
| localStorage | Quota exceeded | Can't save scenario | Error toast with explanation |
| URL state (nuqs) | Malformed params | Wrong defaults | Validation sanitizes to safe values |

---

## 20. Document Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-03 | Senior UI/UX Designer | Initial draft covering full design system and all V1 integrations |

---

*This Frontend Specification Document is a living document. It should be updated when design decisions change, new integrations are added, or component specifications evolve through user testing. All changes require sign-off from the Design Lead and Frontend Architect before implementation.*