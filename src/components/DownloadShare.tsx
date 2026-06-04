"use client";

import { useState } from "react";
import { Download, Share2, FileSpreadsheet, FileText, FileJson, X } from "lucide-react";
import { LoanInputs, CalculationResult } from "@/types";
import { getCountryConfig, loanTypes } from "@/utils/countries";

interface DownloadShareProps {
  inputs: LoanInputs;
  result: CalculationResult;
}

export function DownloadShare({ inputs, result }: DownloadShareProps) {
  const [showModal, setShowModal] = useState(false);
  const [shareFormat, setShareFormat] = useState<"xlsx" | "csv" | "pdf">("xlsx");
  const [isGenerating, setIsGenerating] = useState(false);

  const countryConfig = getCountryConfig(inputs.country);
  const selectedLoanType = loanTypes.find((t) => t.id === inputs.loanType);

  const generateXLSXBlob = async () => {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();

    const summaryData: (string | number)[][] = [
      ["Loan Calculator Report"],
      [""],
      ["Loan Details"],
      ["Loan Type", selectedLoanType?.name || ""],
      ["Country", countryConfig.name],
      ["Currency", `${countryConfig.currency} (${countryConfig.currencySymbol})`],
      ["Principal", inputs.principal],
      ["Interest Rate", `${inputs.interestRate}%`],
      ["Loan Term", `${inputs.loanTermYears} years`],
      ["Start Date", inputs.startDate],
      ["Extra Monthly Payment", inputs.extraMonthlyPayment],
      [""],
      ["Calculation Results"],
      ["Monthly Payment", result.monthlyPayment],
      ["Total Payment", result.totalPayment],
      ["Total Interest", result.totalInterest],
      ["Total Cost", result.totalCost],
      ["Interest to Principal Ratio", `${result.interestToPrincipalRatio}%`],
      ["Payoff Date", result.payoffDate],
    ];

    if (inputs.extraMonthlyPayment > 0) {
      summaryData.push([""], ["Extra Payment Benefits"], ["Interest Saved", result.interestSaved], [
        "Months Saved",
        result.monthsSaved,
      ]);
    }

    const summaryWS = XLSX.utils.aoa_to_sheet(summaryData);
    summaryWS["!cols"] = [{ wch: 30 }, { wch: 25 }];
    XLSX.utils.book_append_sheet(wb, summaryWS, "Summary");

    const amortHeader = ["Month", "Date", "Payment", "Principal", "Interest", "Extra Payment", "Balance"];
    const amortData = result.amortizationSchedule.map((row) => [
      row.month,
      row.date,
      row.payment,
      row.principalPaid,
      row.interestPaid,
      row.extraPayment,
      row.remainingBalance,
    ]);
    const amortWS = XLSX.utils.aoa_to_sheet([amortHeader, ...amortData]);
    amortWS["!cols"] = [{ wch: 8 }, { wch: 12 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 18 }];
    XLSX.utils.book_append_sheet(wb, amortWS, "Amortization");

    const yearlyHeader = ["Year", "Opening Balance", "Principal Paid", "Interest Paid", "Closing Balance"];
    const yearlyData = result.yearlySummary.map((row) => [
      row.year,
      row.openingBalance,
      row.principalPaid,
      row.interestPaid,
      row.closingBalance,
    ]);
    const yearlyWS = XLSX.utils.aoa_to_sheet([yearlyHeader, ...yearlyData]);
    yearlyWS["!cols"] = [{ wch: 8 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }];
    XLSX.utils.book_append_sheet(wb, yearlyWS, "Yearly Summary");

    const xlsxBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    return new Blob([xlsxBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  };

  const generateCSVBlob = () => {
    const rows: (string | number)[][] = [
      ["Loan Calculator Report"],
      [""],
      ["Loan Details"],
      ["Loan Type", selectedLoanType?.name || ""],
      ["Country", countryConfig.name],
      ["Principal", inputs.principal],
      ["Interest Rate", `${inputs.interestRate}%`],
      ["Loan Term", `${inputs.loanTermYears} years`],
      ["Start Date", inputs.startDate],
      ["Extra Monthly Payment", inputs.extraMonthlyPayment],
      [""],
      ["Calculation Results"],
      ["Monthly Payment", result.monthlyPayment],
      ["Total Payment", result.totalPayment],
      ["Total Interest", result.totalInterest],
      ["Total Cost", result.totalCost],
      [""],
      ["Amortization Schedule"],
      ["Month", "Date", "Payment", "Principal", "Interest", "Extra Payment", "Balance"],
      ...result.amortizationSchedule.map((row) => [
        row.month,
        row.date,
        row.payment,
        row.principalPaid,
        row.interestPaid,
        row.extraPayment,
        row.remainingBalance,
      ]),
    ];

    const csvContent = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  };

  const generatePDFBlob = () => {
    const content = `
LOAN CALCULATION REPORT
========================

LOAN DETAILS
------------
Loan Type: ${selectedLoanType?.name}
Country: ${countryConfig.name}
Principal: ${countryConfig.currencySymbol}${inputs.principal.toLocaleString()}
Interest Rate: ${inputs.interestRate}%
Loan Term: ${inputs.loanTermYears} years
Start Date: ${inputs.startDate}
Extra Monthly Payment: ${countryConfig.currencySymbol}${inputs.extraMonthlyPayment}

CALCULATION RESULTS
--------------------
Monthly Payment: ${countryConfig.currencySymbol}${result.monthlyPayment.toLocaleString()}
Total Payment: ${countryConfig.currencySymbol}${result.totalPayment.toLocaleString()}
Total Interest: ${countryConfig.currencySymbol}${result.totalInterest.toLocaleString()}
Total Cost: ${countryConfig.currencySymbol}${result.totalCost.toLocaleString()}
Interest to Principal Ratio: ${result.interestToPrincipalRatio}%
Payoff Date: ${result.payoffDate}

${inputs.extraMonthlyPayment > 0 ? `SAVINGS WITH EXTRA PAYMENTS
-----------------------------
Interest Saved: ${countryConfig.currencySymbol}${result.interestSaved.toLocaleString()}
Months Saved: ${result.monthsSaved}` : ""}

AMORTIZATION SCHEDULE (First 12 months)
---------------------------------------
${result.amortizationSchedule
  .slice(0, 12)
  .map(
    (row) =>
      `Month ${row.month} (${row.date}): Payment ${countryConfig.currencySymbol}${row.payment.toLocaleString()} | Principal ${countryConfig.currencySymbol}${row.principalPaid.toLocaleString()} | Interest ${countryConfig.currencySymbol}${row.interestPaid.toLocaleString()} | Balance ${countryConfig.currencySymbol}${row.remainingBalance.toLocaleString()}`
  )
  .join("\n")}

---
Generated by Loan Calculator | ${new Date().toLocaleDateString()}
    `.trim();

    return new Blob([content], { type: "text/plain" });
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDownload = async (format: "xlsx" | "csv" | "pdf") => {
    setIsGenerating(true);
    const dateStr = new Date().toISOString().split("T")[0];

    try {
      switch (format) {
        case "xlsx": {
          const xlsxBlob = await generateXLSXBlob();
          downloadFile(xlsxBlob, `loan_calculation_${dateStr}.xlsx`);
          break;
        }
        case "csv":
          downloadFile(generateCSVBlob(), `loan_calculation_${dateStr}.csv`);
          break;
        case "pdf":
          downloadFile(generatePDFBlob(), `loan_calculation_${dateStr}.txt`);
          break;
      }
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsGenerating(false);
      setShowModal(false);
    }
  };

  const handleShare = async (format?: "xlsx" | "csv" | "pdf") => {
    const fmt = format || shareFormat;
    setShareFormat(fmt);
    const dateStr = new Date().toISOString().split("T")[0];
    let blob: Blob;
    let filename: string;
    let mimeType: string;

    switch (fmt) {
      case "xlsx":
        blob = await generateXLSXBlob();
        filename = `loan_calculation_${dateStr}.xlsx`;
        mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      case "csv":
        blob = generateCSVBlob();
        filename = `loan_calculation_${dateStr}.csv`;
        mimeType = "text/csv";
        break;
      case "pdf":
        blob = generatePDFBlob();
        filename = `loan_calculation_${dateStr}.txt`;
        mimeType = "text/plain";
        break;
    }

    const file = new File([blob], filename, { type: mimeType });

    if (typeof navigator !== "undefined" && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: "Loan Calculation Results",
          text: `Loan calculation for ${selectedLoanType?.name} - ${countryConfig.currencySymbol}${inputs.principal.toLocaleString()}`,
          files: [file],
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") downloadFile(blob, filename);
      }
    } else {
      downloadFile(blob, filename);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg sm:rounded-xl font-medium transition-all text-sm sm:text-base w-full sm:w-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>

        <div className="relative group w-full sm:w-auto">
          <button
            onClick={() => handleShare()}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg sm:rounded-xl font-medium transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <div className="absolute right-0 sm:left-0 sm:right-auto top-full mt-2 w-44 sm:w-40 bg-slate-800 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 p-2">
            <div className="text-xs text-slate-500 px-2 sm:px-3 py-1.5">Share as:</div>
            {(
              [
                { id: "xlsx", icon: FileSpreadsheet, label: "Excel (.xlsx)" },
                { id: "csv", icon: FileJson, label: "CSV (.csv)" },
                { id: "pdf", icon: FileText, label: "Text (.txt)" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(opt.id);
                }}
                className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg text-sm hover:bg-slate-700 transition-colors flex items-center gap-2 ${
                  shareFormat === opt.id ? "text-emerald-400 bg-emerald-900/30" : "text-slate-300"
                }`}
              >
                <opt.icon className="w-4 h-4" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 w-full sm:max-w-md border-t sm:border border-slate-700">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-white">Download Results</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {(
                [
                  { id: "xlsx", label: "Excel Spreadsheet", sub: ".xlsx format with multiple sheets", color: "emerald" },
                  { id: "csv", label: "CSV File", sub: "Comma-separated values", color: "green" },
                  { id: "pdf", label: "Text Document", sub: "Print-ready format", color: "red" },
                ] as const
              ).map((opt) => {
                const colorMap: Record<string, { card: string; icon: string }> = {
                  emerald: {
                    card: "bg-emerald-900/30 border-emerald-700/50 hover:border-emerald-500",
                    icon: "bg-emerald-600",
                  },
                  green: {
                    card: "bg-green-900/30 border-green-700/50 hover:border-green-500",
                    icon: "bg-green-600",
                  },
                  red: {
                    card: "bg-red-900/30 border-red-700/50 hover:border-red-500",
                    icon: "bg-red-600",
                  },
                };
                const { card, icon } = colorMap[opt.color];
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleDownload(opt.id)}
                    disabled={isGenerating}
                    className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 ${card} border rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${icon} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      {opt.id === "xlsx" && <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                      {opt.id === "csv" && <FileJson className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                      {opt.id === "pdf" && <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white font-medium text-sm sm:text-base">{opt.label}</div>
                      <div className="text-xs sm:text-sm text-slate-400">{opt.sub}</div>
                    </div>
                    {isGenerating && opt.id === "xlsx" && (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
