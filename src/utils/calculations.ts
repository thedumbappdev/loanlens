import { LoanInputs, CalculationResult, AmortizationRow, YearlySummary, LoanBreakdown } from '@/types';
import { getCountryConfig } from './countries';
import { format, addMonths } from 'date-fns';

export function calculateLoan(inputs: LoanInputs): CalculationResult {
  const { principal, interestRate, loanTermYears, startDate, extraMonthlyPayment } = inputs;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? principal / totalMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const amortizationSchedule: AmortizationRow[] = [];
  let balance = principal;
  let totalInterest = 0;
  let totalPayment = 0;
  let month = 0;
  const start = new Date(startDate);

  while (balance > 0.01 && month < totalMonths * 2) {
    month++;
    const date = format(addMonths(start, month), 'MMM yyyy');
    const interestPaid = balance * monthlyRate;
    let principalPaid = monthlyPayment - interestPaid;
    let extraPayment = extraMonthlyPayment;

    if (principalPaid + extraPayment > balance) {
      principalPaid = balance;
      extraPayment = 0;
    }

    const payment = principalPaid + interestPaid + extraPayment;
    balance -= principalPaid + extraPayment;
    totalInterest += interestPaid;
    totalPayment += payment;

    amortizationSchedule.push({
      month,
      date,
      payment: Math.round(payment * 100) / 100,
      principalPaid: Math.round(principalPaid * 100) / 100,
      interestPaid: Math.round(interestPaid * 100) / 100,
      extraPayment,
      remainingBalance: Math.max(0, Math.round(balance * 100) / 100),
    });

    if (balance <= 0.01) break;
  }

  const payoffDate = format(addMonths(start, month), 'MMMM yyyy');

  const yearlySummary: YearlySummary[] = [];
  const years = Math.ceil(month / 12);

  for (let year = 1; year <= years; year++) {
    const yearStart = (year - 1) * 12;
    const yearEnd = Math.min(year * 12, month);
    let yearPrincipal = 0;
    let yearInterest = 0;
    let openingBalance = principal;
    let closingBalance = 0;

    for (let i = yearStart; i < yearEnd; i++) {
      if (amortizationSchedule[i]) {
        yearPrincipal += amortizationSchedule[i].principalPaid;
        yearInterest += amortizationSchedule[i].interestPaid;
      }
    }

    closingBalance = amortizationSchedule[yearEnd - 1]?.remainingBalance || 0;

    yearlySummary.push({
      year,
      openingBalance: Math.round(openingBalance * 100) / 100,
      principalPaid: Math.round(yearPrincipal * 100) / 100,
      interestPaid: Math.round(yearInterest * 100) / 100,
      closingBalance: Math.round(closingBalance * 100) / 100,
    });

    openingBalance = closingBalance;
  }

  const standardTotalInterest = monthlyPayment * totalMonths - principal;
  const interestSaved = Math.max(0, standardTotalInterest - totalInterest);
  const monthsSaved = totalMonths - month;

  const config = getCountryConfig(inputs.country);
  const monthlyTaxes = (principal * config.avgPropertyTax) / 100 / 12;
  const monthlyInsurance = (principal * config.avgInsurance) / 100 / 12;

  const breakdown: LoanBreakdown = {
    principal: principal,
    interest: Math.round(totalInterest * 100) / 100,
    taxes: Math.round((monthlyTaxes * month) * 100) / 100,
    insurance: Math.round((monthlyInsurance * month) * 100) / 100,
    totalMonthly: Math.round((monthlyPayment + monthlyTaxes + monthlyInsurance) * 100) / 100,
  };

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalCost: Math.round((totalPayment + breakdown.taxes + breakdown.insurance) * 100) / 100,
    interestToPrincipalRatio: Math.round((totalInterest / principal) * 100 * 100) / 100,
    amortizationSchedule,
    yearlySummary,
    payoffDate,
    interestSaved: Math.round(interestSaved * 100) / 100,
    monthsSaved,
    breakdown,
    loanTermYears,
  };
}

export function encodeToUrlParams(inputs: LoanInputs): string {
  const params = new URLSearchParams();
  Object.entries(inputs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  return params.toString();
}

export function decodeFromUrlParams(search: string): Partial<LoanInputs> | null {
  if (!search) return null;

  try {
    const params = new URLSearchParams(search);
    const result: Record<string, string | number> = {};

    params.forEach((value, key) => {
      if (
        key === 'principal' ||
        key === 'interestRate' ||
        key === 'loanTermYears' ||
        key === 'extraMonthlyPayment'
      ) {
        result[key] = parseFloat(value) || 0;
      } else {
        result[key] = value;
      }
    });

    return result as Partial<LoanInputs>;
  } catch {
    return null;
  }
}
