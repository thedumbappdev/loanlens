"use client";

import { useState } from "react";
import {
  TrendingUp,
  PiggyBank,
  Zap,
  Shield,
  AlertTriangle,
  ChevronRight,
  DollarSign,
  Target,
  Clock,
  BarChart3,
} from "lucide-react";
import { LoanInputs } from "@/types";
import { getCountryConfig } from "@/utils/countries";

interface LoanStrategiesProps {
  inputs: LoanInputs;
}

interface Strategy {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  riskLevel: "low" | "medium" | "high";
  potentialSavings: string;
  color: string;
}

export function LoanStrategies({ inputs }: LoanStrategiesProps) {
  const [activeTab, setActiveTab] = useState<"repay" | "reduce" | "invest">("repay");
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const countryConfig = getCountryConfig(inputs.country);

  const monthlyRate = inputs.interestRate / 100 / 12;
  const totalMonths = inputs.loanTermYears * 12;
  const monthlyPayment =
    monthlyRate === 0
      ? inputs.principal / totalMonths
      : (inputs.principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = monthlyPayment * inputs.loanTermYears * 12;
  const totalInterest = totalPayment - inputs.principal;

  const repayEarlyStrategies: Strategy[] = [
    {
      id: "biweekly",
      title: "Bi-Weekly Payments",
      description:
        "Make half of your monthly payment every two weeks instead of one full payment monthly. This results in 26 half-payments (13 full payments) per year instead of 12.",
      icon: <Clock className="w-5 h-5" />,
      benefits: [
        `Save ${(totalInterest * 0.1).toLocaleString()} ${countryConfig.currencySymbol} in interest`,
        "Reduce loan term by 2-3 years",
        "No extra money from your pocket",
        "Builds equity faster",
      ],
      riskLevel: "low",
      potentialSavings: `${(totalInterest * 0.1).toLocaleString()} ${countryConfig.currencySymbol}`,
      color: "#10b981",
    },
    {
      id: "extra-payments",
      title: "Extra Principal Payments",
      description:
        "Add any extra amount you can afford to your monthly payment, specifically designated as principal-only payments.",
      icon: <Zap className="w-5 h-5" />,
      benefits: [
        "Directly reduces principal balance",
        "Every extra dollar saves interest",
        "Flexible amount - pay what you can",
        "Can be one-time or recurring",
      ],
      riskLevel: "low",
      potentialSavings: `Up to ${(totalInterest * 0.25).toLocaleString()} ${countryConfig.currencySymbol}`,
      color: "#3b82f6",
    },
    {
      id: "lump-sum",
      title: "Annual Lump Sum Payments",
      description: "Use annual bonuses, tax refunds, or any windfall to make one-time principal payments each year.",
      icon: <DollarSign className="w-5 h-5" />,
      benefits: [
        "Significant principal reduction",
        "Tax refund optimization",
        "Bonus money goes to wealth building",
        "Dramatically shortens loan term",
      ],
      riskLevel: "low",
      potentialSavings: `${(totalInterest * 0.2).toLocaleString()} ${countryConfig.currencySymbol} over loan term`,
      color: "#8b5cf6",
    },
    {
      id: "refinance",
      title: "Refinance to Shorter Term",
      description: "Refinance your current loan into a shorter term (e.g., 30-year to 15-year) with a lower interest rate.",
      icon: <Target className="w-5 h-5" />,
      benefits: [
        "Lower interest rate potential",
        "Significantly less total interest",
        "Forced savings through higher payment",
        "Debt-free faster",
      ],
      riskLevel: "medium",
      potentialSavings: `${(totalInterest * 0.35).toLocaleString()} ${countryConfig.currencySymbol}`,
      color: "#f59e0b",
    },
  ];

  const reducePaymentStrategies: Strategy[] = [
    {
      id: "rate-negotiation",
      title: "Negotiate Interest Rate",
      description:
        "Contact your lender to negotiate a lower interest rate based on your payment history and current market rates.",
      icon: <BarChart3 className="w-5 h-5" />,
      benefits: [
        "Lower monthly payments",
        "No refinancing costs",
        "Quick and easy process",
        "Works especially well for good borrowers",
      ],
      riskLevel: "low",
      potentialSavings: `${(monthlyPayment * 0.1).toLocaleString()} ${countryConfig.currencySymbol}/month`,
      color: "#10b981",
    },
    {
      id: "balance-transfer",
      title: "Balance Transfer",
      description: "Transfer your loan balance to a lender offering lower interest rates or promotional rates.",
      icon: <ChevronRight className="w-5 h-5" />,
      benefits: [
        "Significant rate reduction",
        "0% introductory offers possible",
        "Consolidate multiple debts",
        "Faster payoff potential",
      ],
      riskLevel: "medium",
      potentialSavings: `${(totalInterest * 0.3).toLocaleString()} ${countryConfig.currencySymbol}`,
      color: "#3b82f6",
    },
    {
      id: "tax-deduction",
      title: "Maximize Tax Deductions",
      description:
        "Ensure you&apos;re claiming all eligible tax deductions for mortgage interest and related expenses.",
      icon: <Shield className="w-5 h-5" />,
      benefits: [
        `Up to ${(
          (inputs.principal * inputs.interestRate) / 100 *
          (countryConfig.taxDeductionRate / 100)
        ).toLocaleString()} ${countryConfig.currencySymbol} in tax savings`,
        "Reduces effective interest cost",
        "Legal tax optimization",
        "Compound benefits over years",
      ],
      riskLevel: "low",
      potentialSavings: `${(
        (inputs.principal * inputs.interestRate) / 100 *
        (countryConfig.taxDeductionRate / 100)
      ).toLocaleString()} ${countryConfig.currencySymbol}/year`,
      color: "#8b5cf6",
    },
    {
      id: "loan-modification",
      title: "Loan Modification",
      description: "Request lender-approved modifications to your loan terms for financial hardship or better rates.",
      icon: <PiggyBank className="w-5 h-5" />,
      benefits: [
        "Lower monthly payment",
        "Extended loan term possible",
        "Avoids foreclosure",
        "Can include rate reduction",
      ],
      riskLevel: "low",
      potentialSavings: `${(monthlyPayment * 0.2).toLocaleString()} ${countryConfig.currencySymbol}/month`,
      color: "#f59e0b",
    },
  ];

  const investmentStrategies: Strategy[] = [
    {
      id: "index-fund",
      title: "Index Fund Investment",
      description: `Invest the difference between your current payment and a 15-year mortgage payment into a low-cost index fund. Historical average returns: 7-10% annually.`,
      icon: <TrendingUp className="w-5 h-5" />,
      benefits: [
        `Potential to grow ${(monthlyPayment * 12 * 0.5).toLocaleString()} ${countryConfig.currencySymbol}/year`,
        "Historically outperforms mortgage rates",
        "Diversified market exposure",
        "Long-term wealth building",
      ],
      riskLevel: "medium",
      potentialSavings: `Net gain: ${(monthlyPayment * 12 * 0.1).toLocaleString()} ${countryConfig.currencySymbol}/year after loan interest`,
      color: "#10b981",
    },
    {
      id: "sip-strategy",
      title: "Systematic Investment Plan (SIP)",
      description: `Set up automatic monthly investments of ${(monthlyPayment * 0.2).toLocaleString()} ${countryConfig.currencySymbol} into diversified funds. At 8% annual return, this builds significant wealth while paying your loan.`,
      icon: <PiggyBank className="w-5 h-5" />,
      benefits: [
        `Projected value after ${inputs.loanTermYears} years: ${(monthlyPayment * 0.2 * 12 * inputs.loanTermYears * 1.5).toLocaleString()} ${countryConfig.currencySymbol}`,
        "Rupee cost averaging benefit",
        "Disciplined investing habit",
        "Emergency fund potential",
      ],
      riskLevel: "medium",
      potentialSavings: `Investment gains may exceed loan interest paid`,
      color: "#3b82f6",
    },
    {
      id: "debt-swapping",
      title: "Debt Swap Strategy",
      description: "Invest in higher-return assets while paying minimum on low-interest debt. Use investment returns to pay off loan at end of term.",
      icon: <Zap className="w-5 h-5" />,
      benefits: [
        "Leverage low-cost loan capital",
        "Tax-advantaged investment accounts",
        "Potential for higher net worth",
        "Liquidity maintained",
      ],
      riskLevel: "high",
      potentialSavings: `Market returns may exceed ${inputs.interestRate}% loan cost`,
      color: "#f59e0b",
    },
    {
      id: "retirement-first",
      title: "Retirement Account First",
      description: `Max out retirement contributions (401k/IRA) to get tax deductions, then use tax savings to accelerate loan payoff. Employer match = guaranteed ${inputs.interestRate * 2}% return.`,
      icon: <Shield className="w-5 h-5" />,
      benefits: [
        "Employer match = instant 50-100% return",
        "Tax deduction reduces loan cost",
        "Tax-deferred growth",
        "Forced savings for retirement",
      ],
      riskLevel: "low",
      potentialSavings: `Tax savings: ${(monthlyPayment * 12 * 0.22).toLocaleString()} ${countryConfig.currencySymbol}/year`,
      color: "#8b5cf6",
    },
  ];

  const getStrategies = () => {
    switch (activeTab) {
      case "repay":
        return repayEarlyStrategies;
      case "reduce":
        return reducePaymentStrategies;
      case "invest":
        return investmentStrategies;
      default:
        return [];
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "low":
        return <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Low Risk</span>;
      case "medium":
        return <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">Medium Risk</span>;
      case "high":
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">High Risk</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white">Loan Repayment Strategies</h3>
            <p className="text-sm text-slate-400">Smart ways to pay off faster &amp; build wealth</p>
          </div>
        </div>
      </div>

      {showDisclaimer && (
        <div className="mb-6 p-3 sm:p-4 bg-amber-900/30 border border-amber-600/50 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-amber-200 font-semibold mb-1">Important Disclaimer</h4>
              <p className="text-sm text-amber-100/80">
                The strategies below are for informational purposes only and do not constitute investment or financial
                advice. All investments carry risk, and past performance does not guarantee future results. Before making
                any investment decisions, please consult with a registered financial advisor or investment professional.
                Your individual circumstances may vary.
              </p>
            </div>
            <button onClick={() => setShowDisclaimer(false)} className="text-amber-400 hover:text-amber-300">
              <span className="text-xl">×</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory">
        <button
          onClick={() => setActiveTab("repay")}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium transition-all whitespace-nowrap snap-start flex-shrink-0 text-sm sm:text-base ${
            activeTab === "repay" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Pay Off Early</span>
        </button>
        <button
          onClick={() => setActiveTab("reduce")}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium transition-all whitespace-nowrap snap-start flex-shrink-0 text-sm sm:text-base ${
            activeTab === "reduce" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Reduce Payments</span>
        </button>
        <button
          onClick={() => setActiveTab("invest")}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium transition-all whitespace-nowrap snap-start flex-shrink-0 text-sm sm:text-base ${
            activeTab === "invest" ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Investment Plans</span>
        </button>
      </div>

      <div className="space-y-4">
        {getStrategies().map((strategy) => (
          <div
            key={strategy.id}
            className="p-3 sm:p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${strategy.color}20` }}
              >
                <div style={{ color: strategy.color }}>{strategy.icon}</div>
              </div>
              <div className="w-full min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-white font-semibold leading-snug break-words">{strategy.title}</h4>
                  {getRiskBadge(strategy.riskLevel)}
                </div>
                <p className="text-sm text-slate-400 mb-3">{strategy.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {strategy.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="max-w-full px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-lg break-words"
                      dangerouslySetInnerHTML={{ __html: benefit }}
                    />
                  ))}
                </div>
                <div
                  className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: `${strategy.color}20`, color: strategy.color }}
                >
                  <span>Potential Benefit:</span>
                  <span className="font-semibold">{strategy.potentialSavings}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl border border-slate-700">
        <h4 className="text-sm font-medium text-slate-300 mb-3">Your Loan Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-slate-500">Monthly Payment</div>
            <div className="text-lg font-bold text-white">
              {monthlyPayment.toLocaleString()} {countryConfig.currencySymbol}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Total Payment</div>
            <div className="text-lg font-bold text-white">
              {totalPayment.toLocaleString()} {countryConfig.currencySymbol}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Total Interest</div>
            <div className="text-lg font-bold text-amber-400">
              {totalInterest.toLocaleString()} {countryConfig.currencySymbol}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Loan Term</div>
            <div className="text-lg font-bold text-white">{inputs.loanTermYears} years</div>
          </div>
        </div>
      </div>
    </div>
  );
}
