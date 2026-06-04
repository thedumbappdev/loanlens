export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  defaultRate: number;
  taxDeductionRate: number;
  avgPropertyTax: number;
  avgInsurance: number;
  loanTermOptions: number[];
}

export interface LoanInputs {
  loanType: 'mortgage' | 'home_equity' | 'personal' | 'auto' | 'student' | 'business';
  country: string;
  principal: number;
  interestRate: number;
  loanTermYears: number;
  startDate: string;
  extraMonthlyPayment: number;
}

export interface AmortizationRow {
  month: number;
  date: string;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  extraPayment: number;
  remainingBalance: number;
}

export interface AmortizationEntry {
  month: number;
  balance: number;
  principal: number;
  interest: number;
}

export interface YearlySummary {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}

export interface LoanBreakdown {
  principal: number;
  interest: number;
  taxes: number;
  insurance: number;
  totalMonthly: number;
}

export interface CalculationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalCost: number;
  interestToPrincipalRatio: number;
  amortizationSchedule: AmortizationRow[];
  yearlySummary: YearlySummary[];
  payoffDate: string;
  interestSaved: number;
  monthsSaved: number;
  breakdown: LoanBreakdown;
  loanTermYears: number;
}
