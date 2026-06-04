"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { AmortizationEntry } from "@/types";

interface AmortizationChartProps {
  data: AmortizationEntry[];
  currencySymbol: string;
}

export function AmortizationChart({ data, currencySymbol }: AmortizationChartProps) {
  const chartData = data.filter((_, i) => i % 12 === 0 || i === data.length - 1);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" tickFormatter={(v) => `Yr ${Math.floor(v / 12)}`} />
          <YAxis stroke="#94a3b8" tickFormatter={(v) => `${currencySymbol}${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value: number) => [`${currencySymbol}${value.toLocaleString()}`, ""]}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.3}
            name="Remaining Balance"
          />
          <Area
            type="monotone"
            dataKey="principal"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            name="Principal Paid"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
