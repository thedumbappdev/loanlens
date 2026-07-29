import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Calculator - Multi Country",
  description: "Multi-country multi-discipline loan calculator with amortization, historical rates, and repayment strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
