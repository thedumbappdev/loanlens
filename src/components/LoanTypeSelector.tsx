"use client";

import { loanTypes } from "@/utils/countries";
import { cn } from "@/lib/utils";

interface LoanTypeSelectorProps {
  value: string;
  onChange: (type: string) => void;
}

export function LoanTypeSelector({ value, onChange }: LoanTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] sm:text-xs md:text-sm font-medium text-slate-300">Loan Type</label>

      {/* Horizontal scroll across all viewports */}
      <div className="flex overflow-x-auto pb-2 -mx-1 px-1 gap-2 sm:gap-3 snap-x snap-mandatory">
        {loanTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={cn(
              "flex-shrink-0 p-2.5 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center snap-start",
              "w-[100px] sm:w-[120px] md:w-[140px] hover:scale-[1.03] active:scale-95",
              value === type.id
                ? "border-emerald-500 bg-emerald-500/20 text-white"
                : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
            )}
          >
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{type.icon}</div>
            <div className="text-[10px] sm:text-xs font-medium leading-tight whitespace-nowrap truncate">
              {type.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
