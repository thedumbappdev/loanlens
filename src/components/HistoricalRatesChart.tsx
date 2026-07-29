"use client";

import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { historicalRates, loanTypeColors, loanTypeLabels } from "@/utils/historicalRates";

interface HistoricalRatesChartProps {
  selectedLoanType: string;
}

export function HistoricalRatesChart({ selectedLoanType }: HistoricalRatesChartProps) {
  const [currentYearIndex, setCurrentYearIndex] = useState(56);

  const startYear = 1970;
  const endYear = 2026;
  const totalYears = endYear - startYear;
  const currentYear = startYear + currentYearIndex;
  const currentData = historicalRates.slice(0, currentYearIndex + 1);

  const selectedColor = loanTypeColors[selectedLoanType] || "#10b981";
  const selectedLabel = loanTypeLabels[selectedLoanType] || selectedLoanType;

  const currentRate =
    currentData.length > 0
      ? (currentData[currentData.length - 1][selectedLoanType as keyof (typeof currentData)[0]] as number)
      : 0;

  const stats = useMemo(() => {
    const rates = historicalRates.map((r) => r[selectedLoanType as keyof (typeof historicalRates)[0]] as number);
    const min = Math.min(...rates);
    const max = Math.max(...rates);
    const avg = rates.reduce((a, b) => a + b, 0) / rates.length;
    return { min, max, avg };
  }, [selectedLoanType]);

  const progress = ((currentYearIndex + 1) / totalYears) * 100;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${selectedColor}20` }}
          >
            <TrendingUp className="w-6 h-6" style={{ color: selectedColor }} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Historical {selectedLabel} Rates</h3>
            <p className="text-sm text-slate-400">1970 - 2026 • Historical Timeline</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative">
            <div
              className="text-4xl sm:text-5xl font-bold transition-all duration-300"
              style={{ color: selectedColor }}
            >
              {currentRate.toFixed(1)}%
            </div>
          </div>
          <div className="text-slate-400">
            <div className="text-sm">Current Rate</div>
            <div className="text-lg font-semibold text-white">{currentYear}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-4 text-sm">
          <div className="text-center px-2 sm:px-3 py-2 bg-slate-800 rounded-xl">
            <div className="text-slate-500 text-xs">Min</div>
            <div className="text-emerald-400 font-semibold text-sm sm:text-base">{stats.min}%</div>
          </div>
          <div className="text-center px-2 sm:px-3 py-2 bg-slate-800 rounded-xl">
            <div className="text-slate-500 text-xs">Avg</div>
            <div className="text-white font-semibold text-sm sm:text-base">{stats.avg.toFixed(1)}%</div>
          </div>
          <div className="text-center px-2 sm:px-3 py-2 bg-slate-800 rounded-xl">
            <div className="text-slate-500 text-xs">Max</div>
            <div className="text-red-400 font-semibold text-sm sm:text-base">{stats.max}%</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={totalYears - 1}
            value={currentYearIndex}
            onChange={(e) => setCurrentYearIndex(parseInt(e.target.value))}
            className="flex-1 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, ${selectedColor} ${progress}%, #334155 ${progress}%)` }}
          />

          <div className="px-3 sm:px-4 py-2 bg-slate-800 rounded-xl min-w-[80px] sm:min-w-[100px] text-center">
            <span className="text-lg sm:text-xl font-bold" style={{ color: selectedColor }}>
              {currentYear}
            </span>
          </div>
        </div>
      </div>

      <div className="h-80 mb-6 relative">
        <div
          className="absolute inset-0 rounded-xl opacity-20"
          style={{ background: `linear-gradient(180deg, ${selectedColor}10 0%, transparent 100%)` }}
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
            <defs>
              <linearGradient id={`gradient-${selectedLoanType}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={selectedColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={selectedColor} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="year"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={{ stroke: "#475569" }}
              interval={9}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={{ stroke: "#475569" }}
              domain={["auto", "auto"]}
              tickFormatter={(v) => `${v}%`}
              label={{ value: "Interest Rate (%)", angle: -90, position: "insideLeft", fill: "#94a3b8" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, selectedLabel]}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <ReferenceLine
              x={currentYear}
              stroke={selectedColor}
              strokeWidth={2}
              strokeDasharray="8 4"
              label={{ value: "Now", fill: selectedColor, fontSize: 12, fontWeight: "bold", position: "top" }}
            />
            <Area
              type="monotone"
              dataKey={selectedLoanType}
              stroke={selectedColor}
              strokeWidth={3}
              fill={`url(#gradient-${selectedLoanType})`}
              dot={false}
              activeDot={{ r: 8, strokeWidth: 3, fill: selectedColor, stroke: "#fff" }}
              animationDuration={150}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-xs text-slate-500 px-2">
        <span>1970</span>
        <span>1980</span>
        <span>1990</span>
        <span>2000</span>
        <span>2010</span>
        <span>2020</span>
        <span>2026</span>
      </div>

      <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
        <h4 className="text-sm font-medium text-slate-300 mb-3">Key Historical Events for {selectedLabel}</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {[
            { title: "1981 Peak", sub: "Highest rates recorded" },
            { title: "2008 Crisis", sub: "Financial crisis impact" },
            { title: "2020 Low", sub: "Historic lows reached" },
            { title: "2022-23 Rise", sub: "Rates increased sharply" },
          ].map((ev) => (
            <div key={ev.title} className="p-3 bg-slate-800 rounded-xl border-l-4" style={{ borderColor: selectedColor }}>
              <div className="text-white font-medium">{ev.title}</div>
              <div className="text-slate-400">{ev.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
