"use client";

import { useMemo, useState } from "react";
import { Calculator, Clock, DollarSign, Info, RotateCcw, TrendingUp } from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

export default function GrossPayCalculator() {
  const [hourlyRate, setHourlyRate] = useState(32);
  const [regularHours, setRegularHours] = useState(40);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [bonus, setBonus] = useState(0);

  const results = useMemo(() => {
    const regularWeeklyPay = Math.max(0, hourlyRate) * Math.max(0, regularHours);
    const overtimeWeeklyPay = Math.max(0, hourlyRate) * 1.5 * Math.max(0, overtimeHours);
    const weeklyGross = regularWeeklyPay + overtimeWeeklyPay;
    const annualBonus = Math.max(0, bonus);
    const annualGross = weeklyGross * 52 + annualBonus;

    return {
      weeklyGross,
      biweeklyGross: annualGross / 26,
      monthlyGross: annualGross / 12,
      annualGross,
      regularWeeklyPay,
      overtimeWeeklyPay,
      annualBonus,
    };
  }, [bonus, hourlyRate, overtimeHours, regularHours]);

  const resetDefaults = () => {
    setHourlyRate(32);
    setRegularHours(40);
    setOvertimeHours(0);
    setBonus(0);
  };

  return (
    <main className="bg-white text-slate-900 min-h-screen">
      {/* Hero */}
      <section className="bg-[#fff3ec] py-14 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#ff4c00]/20 text-[#ff4c00] text-sm font-semibold shadow-sm">
            <Calculator className="w-4 h-4" aria-hidden="true" />
            Gross Pay Calculator
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 mb-4">
            Calculate gross pay before taxes and deductions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Estimate weekly, biweekly, monthly, and annual gross pay from hourly rate, regular hours, overtime, and bonus.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Inputs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 h-fit">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Pay inputs</h2>
                <button
                  type="button"
                  onClick={resetDefaults}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-[#fff7f2] text-slate-600 transition hover:border-[#ff4c00]/40 hover:text-[#ff4c00]"
                  aria-label="Reset gross pay calculator"
                  title="Reset calculator"
                >
                  <RotateCcw size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="grid gap-5">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Hourly rate</span>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-[#fff7f2] px-4 focus-within:border-[#ff4c00]/50 focus-within:ring-2 focus-within:ring-[#ff4c00]/10">
                    <DollarSign size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={hourlyRate}
                      onChange={(event) => setHourlyRate(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-3 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Regular hours per week</span>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-[#fff7f2] px-4 focus-within:border-[#ff4c00]/50 focus-within:ring-2 focus-within:ring-[#ff4c00]/10">
                    <Clock size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={regularHours}
                      onChange={(event) => setRegularHours(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-3 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Overtime hours per week</span>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-[#fff7f2] px-4 focus-within:border-[#ff4c00]/50 focus-within:ring-2 focus-within:ring-[#ff4c00]/10">
                    <Clock size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={overtimeHours}
                      onChange={(event) => setOvertimeHours(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-3 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Annual bonus</span>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-[#fff7f2] px-4 focus-within:border-[#ff4c00]/50 focus-within:ring-2 focus-within:ring-[#ff4c00]/10">
                    <DollarSign size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={bonus}
                      onChange={(event) => setBonus(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-3 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Results */}
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] p-6 sm:p-7 text-white shadow-lg">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/80">
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  Estimated annual gross pay
                </div>
                <div className="relative mt-3 text-4xl sm:text-5xl font-extrabold leading-none">
                  {formatCurrency(results.annualGross)}
                </div>
                <p className="relative mt-3 text-sm sm:text-base font-medium text-white/90">
                  {formatCurrency(results.weeklyGross)} weekly gross pay before taxes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-[480px]:grid-cols-1">
                {[
                  ["Weekly gross", results.weeklyGross],
                  ["Biweekly gross", results.biweeklyGross],
                  ["Monthly gross", results.monthlyGross],
                  ["Regular weekly pay", results.regularWeeklyPay],
                  ["Overtime weekly pay", results.overtimeWeeklyPay],
                  ["Annual bonus", results.annualBonus],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-[#fff7f2] p-4 sm:p-5">
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">{label}</p>
                    <p className="mt-1.5 text-xl sm:text-2xl font-bold text-slate-900">{formatCurrency(value as number)}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 rounded-xl border border-[#ff4c00]/20 bg-[#fff7f2] p-4 text-sm font-medium leading-6 text-slate-600">
                <Info size={18} className="mt-0.5 shrink-0 text-[#ff4c00]" aria-hidden="true" />
                <p>
                  Gross pay is income before tax, benefits, retirement contributions, and other deductions. Use the after-tax tools for net income estimates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
