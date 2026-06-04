"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp, Calendar, PiggyBank, Target } from "lucide-react";
import { CalculationResult } from "@/types";
import { getCountryConfig } from "@/utils/countries";

interface ResultsDisplayProps {
  result: CalculationResult;
  country: string;
}

export function ResultsDisplay({ result, country }: ResultsDisplayProps) {
  const config = getCountryConfig(country);

  const pieData = [
    { name: "Principal", value: result.breakdown.principal, color: "#3b82f6" },
    { name: "Interest", value: result.breakdown.interest, color: "#ef4444" },
    { name: "Property Tax", value: result.breakdown.taxes, color: "#f59e0b" },
    { name: "Insurance", value: result.breakdown.insurance, color: "#8b5cf6" },
  ];

  const statCards = [
    {
      label: "Monthly Payment",
      value: `${config.currencySymbol}${result.monthlyPayment.toLocaleString()}`,
      subtext: `+ ${config.currencySymbol}${(
        result.breakdown.taxes / (result.loanTermYears * 12 || 1)
      ).toLocaleString()} taxes & insurance`,
      icon: Calendar,
      color: "emerald",
    },
    {
      label: "Total Interest",
      value: `${config.currencySymbol}${result.totalInterest.toLocaleString()}`,
      subtext: `${result.interestToPrincipalRatio}% of principal`,
      icon: TrendingUp,
      color: "amber",
    },
    {
      label: "Total Cost",
      value: `${config.currencySymbol}${result.totalCost.toLocaleString()}`,
      subtext: "Over loan lifetime",
      icon: Target,
      color: "rose",
    },
    {
      label: "Interest Saved",
      value: `${config.currencySymbol}${(result.interestSaved || 0).toLocaleString()}`,
      subtext: `${result.monthsSaved || 0} months early`,
      icon: PiggyBank,
      color: "green",
    },
  ];

  const colors: Record<string, string> = {
    emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    rose: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    green: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat, index) => {
          const colorClasses = colors[stat.color].split(" ");
          return (
            <div key={index} className="bg-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-800">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 sm:mb-3 ${colorClasses[0]}`}>
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colorClasses[1]}`} />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mb-1">{stat.label}</div>
              <div className="text-lg sm:text-xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.subtext}</div>
            </div>
          );
        })}
      </div>

      {/* Chart + Breakdown */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-800">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Payment Breakdown</h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number) => `${config.currencySymbol}${value.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-800">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Monthly Cost Details</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm sm:text-base text-slate-300">Principal & Interest</span>
              </div>
              <span className="text-sm sm:text-base font-semibold text-white">
                {config.currencySymbol}
                {result.monthlyPayment.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm sm:text-base text-slate-300">Property Tax</span>
              </div>
              <span className="text-sm sm:text-base font-semibold text-white">
                {config.currencySymbol}
                {(result.breakdown.taxes / (result.loanTermYears * 12)).toLocaleString()}/mo
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm sm:text-base text-slate-300">Insurance</span>
              </div>
              <span className="text-sm sm:text-base font-semibold text-white">
                {config.currencySymbol}
                {(result.breakdown.insurance / (result.loanTermYears * 12)).toLocaleString()}/mo
              </span>
            </div>
            <div className="border-t border-slate-700 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-medium text-slate-300">Total Monthly</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-400">
                  {config.currencySymbol}
                  {result.breakdown.totalMonthly.toLocaleString()}/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {result.interestSaved > 0 && (
        <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-2xl p-4 sm:p-6 border border-emerald-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-emerald-300">Extra Payment Impact</h3>
              <p className="text-sm text-emerald-200/80 mt-1">
                By paying extra each month, you&apos;ll save{" "}
                <span className="font-bold">
                  {config.currencySymbol}
                  {result.interestSaved.toLocaleString()}
                </span>{" "}
                in interest and pay off your loan{" "}
                <span className="font-bold">{result.monthsSaved} months</span> early!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
