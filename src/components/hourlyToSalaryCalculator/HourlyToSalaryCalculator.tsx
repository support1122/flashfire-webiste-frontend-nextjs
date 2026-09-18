"use client";

import { useMemo, useState } from "react";
import { Clock, DollarSign, Info, RotateCcw, Timer } from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(Number.isFinite(value) ? value : 0);

export default function HourlyToSalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState(45);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [overtimeHours, setOvertimeHours] = useState(0);

  const results = useMemo(() => {
    const rate = Math.max(0, hourlyRate);
    const regularHours = Math.max(0, hoursPerWeek);
    const overtime = Math.max(0, overtimeHours);
    const weeks = Math.max(0, weeksPerYear);
    const weeklyRegularPay = rate * regularHours;
    const weeklyOvertimePay = rate * 1.5 * overtime;
    const weeklyPay = weeklyRegularPay + weeklyOvertimePay;
    const annualSalary = weeklyPay * weeks;

    return {
      annualSalary,
      monthlyPay: annualSalary / 12,
      biweeklyPay: annualSalary / 26,
      weeklyPay,
      dailyPay: weeklyPay / 5,
      regularAnnualHours: regularHours * weeks,
      overtimeAnnualHours: overtime * weeks,
      totalAnnualHours: (regularHours + overtime) * weeks,
      overtimeAnnualPay: weeklyOvertimePay * weeks,
    };
  }, [hourlyRate, hoursPerWeek, overtimeHours, weeksPerYear]);

  const resetDefaults = () => {
    setHourlyRate(45);
    setHoursPerWeek(40);
    setWeeksPerYear(52);
    setOvertimeHours(0);
  };

  return (
    <main className="min-h-screen bg-[#fff7f2] text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#ff4c00]/5 to-transparent rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-[#ff4c00]/5 to-transparent rounded-full translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ff4c00]/10 border border-[#ff4c00]/20 px-4 py-2 text-sm font-semibold text-[#ff4c00]">
              <Clock size={16} aria-hidden="true" />
              Hourly to Salary Calculator
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
              Convert hourly pay into annual salary in seconds.
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
              Enter your hourly rate, weekly hours, work weeks, and overtime to estimate annual, monthly, biweekly, and weekly pay.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900">Hourly details</h2>
                <button
                  type="button"
                  onClick={resetDefaults}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-[#fff7f2] text-slate-500 transition hover:border-[#ff4c00] hover:text-[#ff4c00]"
                  aria-label="Reset hourly to salary calculator"
                  title="Reset calculator"
                >
                  <RotateCcw size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="grid gap-5">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Hourly rate</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#fff7f2] px-4 transition focus-within:border-[#ff4c00]">
                    <DollarSign size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={hourlyRate}
                      onChange={(event) => setHourlyRate(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-2 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Regular hours per week</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#fff7f2] px-4 transition focus-within:border-[#ff4c00]">
                    <Timer size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={hoursPerWeek}
                      onChange={(event) => setHoursPerWeek(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-2 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Paid work weeks per year</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#fff7f2] px-4 transition focus-within:border-[#ff4c00]">
                    <Clock size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      max="52"
                      value={weeksPerYear}
                      onChange={(event) => setWeeksPerYear(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-2 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Overtime hours per week</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#fff7f2] px-4 transition focus-within:border-[#ff4c00]">
                    <Timer size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={overtimeHours}
                      onChange={(event) => setOvertimeHours(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-2 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>
              </div>
            </section>

            <section className="grid gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b2c] p-6 md:p-8 text-white shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/80">Estimated annual salary</p>
                <div className="mt-3 text-4xl md:text-5xl font-bold leading-none">
                  {formatCurrency(results.annualSalary)}
                </div>
                <p className="mt-3 text-base font-medium text-white/90">
                  Based on {formatNumber(results.totalAnnualHours)} total paid hours per year.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                {[
                  ["Monthly pay", results.monthlyPay],
                  ["Biweekly pay", results.biweeklyPay],
                  ["Weekly pay", results.weeklyPay],
                  ["Daily pay", results.dailyPay],
                  ["Regular annual hours", `${formatNumber(results.regularAnnualHours)} hrs`],
                  ["Overtime annual pay", results.overtimeAnnualPay],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md">
                    <p className="text-sm font-semibold text-slate-500">{label}</p>
                    <p className="mt-2 text-xl md:text-2xl font-bold text-slate-900">
                      {typeof value === "number" ? formatCurrency(value) : value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">Quick comparisons</h2>
                <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
                  <div className="flex justify-between gap-4">
                    <span>Equivalent at 40 hours, 52 weeks</span>
                    <span>{formatCurrency(Math.max(0, hourlyRate) * 40 * 52)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Overtime hours per year</span>
                    <span>{formatNumber(results.overtimeAnnualHours)} hrs</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-slate-100 pt-3 font-bold text-slate-900">
                    <span>Total annual hours</span>
                    <span>{formatNumber(results.totalAnnualHours)} hrs</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-[#ff4c00]/15 bg-white p-4 text-sm leading-6 text-slate-600">
                <Info size={18} className="mt-0.5 shrink-0 text-[#ff4c00]" aria-hidden="true" />
                <p>
                  This calculator estimates gross pay before taxes and deductions. Use the take-home pay calculator if you want an after-tax paycheck estimate.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
