"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { Calculator, Info, Menu, X } from "lucide-react";
import { LoanInputs, CalculationResult } from "@/types";
import { CountrySelector } from "@/components/CountrySelector";
import { LoanTypeSelector } from "@/components/LoanTypeSelector";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { DownloadShare } from "@/components/DownloadShare";
import { HistoricalRatesChart } from "@/components/HistoricalRatesChart";
import { LoanStrategies } from "@/components/LoanStrategies";
import { calculateLoan, decodeFromUrlParams, encodeToUrlParams } from "@/utils/calculations";
import { getCountryConfig, loanTypes } from "@/utils/countries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AdPlaceholder({ type }: { type: "banner" | "rectangle" | "sidebar" }) {
  const dimensions = {
    banner: "h-14 sm:h-16 md:h-20 w-full",
    rectangle: "h-40 sm:h-48 md:h-64 w-full",
    sidebar: "h-48 w-full",
  };

  return (
    <div
      className={`bg-slate-800/50 border border-dashed border-slate-600 rounded-xl flex items-center justify-center ${dimensions[type]}`}
    >
      <div className="text-center px-4">
        <div className="text-slate-500 text-xs sm:text-sm font-medium">Advertisement</div>
        <div className="text-slate-600 text-xs mt-1 hidden sm:block">
          {type === "banner" && "728 x 90"}
          {type === "rectangle" && "300 x 250"}
          {type === "sidebar" && "160 x 600"}
        </div>
      </div>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="animate-pulse space-y-4 sm:space-y-6">
      <div className="h-6 sm:h-8 bg-slate-800 rounded-lg w-1/3"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 sm:h-24 bg-slate-800 rounded-xl"></div>
        ))}
      </div>
      <div className="h-48 sm:h-64 bg-slate-800 rounded-xl"></div>
    </div>
  );
}

function LoanLensPage() {
  const [inputs, setInputs] = useState<LoanInputs>({
    loanType: "mortgage",
    country: "US",
    principal: 350000,
    interestRate: 6.5,
    loanTermYears: 30,
    startDate: new Date().toISOString().split("T")[0],
    extraMonthlyPayment: 0,
  });

  const [showInfo, setShowInfo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  // Hydrate from URL on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = decodeFromUrlParams(window.location.search.slice(1));
    if (saved) setInputs((prev) => ({ ...prev, ...saved }));
  }, []);

  const result: CalculationResult | null = useMemo(() => calculateLoan(inputs), [inputs]);

  // Sync URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const newUrl = `${window.location.pathname}?${encodeToUrlParams(inputs)}`;
    window.history.replaceState({}, "", newUrl);
  }, [inputs]);

  const countryConfig = getCountryConfig(inputs.country);
  const selectedLoanType = loanTypes.find((t) => t.id === inputs.loanType);

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap truncate">
                  Loan Calculator
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 hidden md:block">Multi-country • Multi-discipline</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              {result && <DownloadShare inputs={inputs} result={result} />}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 bg-slate-800 rounded-lg text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
              {result && <DownloadShare inputs={inputs} result={result} />}
            </div>
          )}
        </div>
      </header>

      <main className="px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="mb-4 sm:mb-6">
          <div className="sm:hidden">
            <AdPlaceholder type="rectangle" />
          </div>
          <div className="hidden sm:block">
            <AdPlaceholder type="banner" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="lg:hidden">
              {result && (
                <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-800">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-slate-800 rounded-lg sm:rounded-xl p-2 sm:p-3">
                      <div className="text-[10px] sm:text-xs text-slate-500">Monthly</div>
                      <div className="text-base sm:text-lg font-bold text-white">
                        {countryConfig.currencySymbol}
                        {result.monthlyPayment.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-lg sm:rounded-xl p-2 sm:p-3">
                      <div className="text-[10px] sm:text-xs text-slate-500">Total Interest</div>
                      <div className="text-base sm:text-lg font-bold text-amber-400">
                        {countryConfig.currencySymbol}
                        {result.totalInterest.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 border border-slate-800 lg:sticky lg:top-20">
              <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white">Loan Details</h2>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                </button>
              </div>

              {showInfo && (
                <div className="mb-3 sm:mb-4 md:mb-6 p-2.5 sm:p-3 md:p-4 bg-emerald-900/30 border border-emerald-700 rounded-lg sm:rounded-xl">
                  <p className="text-[10px] sm:text-xs md:text-sm text-emerald-200">
                    💡 All calculations include country-specific tax deductions and insurance estimates.
                  </p>
                </div>
              )}

              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <LoanTypeSelector
                  value={inputs.loanType}
                  onChange={(type) => setInputs({ ...inputs, loanType: type as LoanInputs["loanType"] })}
                />

                <CountrySelector
                  value={inputs.country}
                  onChange={(code) => {
                    const config = getCountryConfig(code);
                    setInputs({
                      ...inputs,
                      country: code,
                      interestRate: config.defaultRate,
                      loanTermYears: config.loanTermOptions[config.loanTermOptions.length - 1],
                    });
                  }}
                />

                <div className="space-y-2">
                  <Label>Loan Amount ({countryConfig.currencySymbol})</Label>
                  <Input
                    type="number"
                    value={inputs.principal}
                    onChange={(e) => setInputs({ ...inputs, principal: parseFloat(e.target.value) || 0 })}
                  />
                  <input
                    type="range"
                    min={10000}
                    max={2000000}
                    step={1000}
                    value={inputs.principal}
                    onChange={(e) => setInputs({ ...inputs, principal: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-500 h-1.5 sm:h-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Interest Rate (%)</Label>
                  <Input
                    type="number"
                    step={0.1}
                    value={inputs.interestRate}
                    onChange={(e) => setInputs({ ...inputs, interestRate: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Loan Term (Years)</Label>
                  <select
                    value={inputs.loanTermYears}
                    onChange={(e) => setInputs({ ...inputs, loanTermYears: parseInt(e.target.value) })}
                    className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {countryConfig.loanTermOptions.map((term) => (
                      <option key={term} value={term}>
                        {term} years
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={inputs.startDate}
                    onChange={(e) => setInputs({ ...inputs, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Extra Monthly Payment ({countryConfig.currencySymbol})</Label>
                  <Input
                    type="number"
                    value={inputs.extraMonthlyPayment}
                    onChange={(e) =>
                      setInputs({ ...inputs, extraMonthlyPayment: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 border border-slate-800">
              <h3 className="text-[10px] sm:text-xs md:text-sm font-medium text-slate-400 mb-2 sm:mb-3">
                Country Specifics
              </h3>
              <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs md:text-sm">
                {(
                  [
                    ["Currency", `${countryConfig.currency} (${countryConfig.currencySymbol})`],
                    ["Default Rate", `${countryConfig.defaultRate}%`],
                    ["Tax Deduction", `${countryConfig.taxDeductionRate}%`],
                    ["Property Tax", `${countryConfig.avgPropertyTax}%/yr`],
                    ["Insurance", `${countryConfig.avgInsurance}%/yr`],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-slate-500">{k}</span>
                    <span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden xl:block">
              <AdPlaceholder type="sidebar" />
            </div>
          </div>

          <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-4 space-y-4 sm:space-y-6">
            {result ? (
              <>
                {selectedLoanType && (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl md:text-3xl">{selectedLoanType.icon}</span>
                    <div>
                      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white">
                        {selectedLoanType.name}
                      </h2>
                      <p className="text-[10px] sm:text-xs md:text-sm text-slate-400">{selectedLoanType.description}</p>
                    </div>
                  </div>
                )}
                <ResultsDisplay result={result} country={inputs.country} />
              </>
            ) : (
              <ResultsSkeleton />
            )}

            <AdPlaceholder type="rectangle" />

            <div className="w-full">
              <HistoricalRatesChart selectedLoanType={inputs.loanType} />
            </div>

            <div className="w-full">
              <LoanStrategies inputs={inputs} />
            </div>

            <AdPlaceholder type="banner" />
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 mt-6 sm:mt-8 md:mt-12">
        <div className="px-3 sm:px-4 py-5 sm:py-6 md:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-slate-400 text-xs sm:text-sm">&copy; {currentYear} Loan Calculator. All rights reserved.</div>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<ResultsSkeleton />}>
      <LoanLensPage />
    </Suspense>
  );
}
