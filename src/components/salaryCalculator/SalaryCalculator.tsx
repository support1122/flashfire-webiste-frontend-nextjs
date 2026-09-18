"use client";

import { useMemo, useState } from "react";
import { Calculator, DollarSign, Info, Percent, RotateCcw, TrendingUp } from "lucide-react";

const stateTaxRates = {
  none: 0,
  low: 0.03,
  medium: 0.05,
  high: 0.08,
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const formatPercent = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(Number.isFinite(value) ? value : 0);

function estimateFederalTax(taxableIncome: number) {
  const brackets = [
    { limit: 11600, rate: 0.1 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.37 },
  ];

  let remaining = Math.max(0, taxableIncome);
  let previousLimit = 0;
  let tax = 0;

  for (const bracket of brackets) {
    const taxableAtRate = Math.min(remaining, bracket.limit - previousLimit);
    if (taxableAtRate <= 0) break;

    tax += taxableAtRate * bracket.rate;
    remaining -= taxableAtRate;
    previousLimit = bracket.limit;
  }

  return tax;
}

export default function SalaryCalculator() {
  const [salary, setSalary] = useState(120000);
  const [bonus, setBonus] = useState(10000);
  const [preTaxPercent, setPreTaxPercent] = useState(5);
  const [stateTax, setStateTax] = useState<keyof typeof stateTaxRates>("medium");

  const results = useMemo(() => {
    const grossAnnual = Math.max(0, salary) + Math.max(0, bonus);
    const preTaxDeduction = grossAnnual * (Math.max(0, preTaxPercent) / 100);
    const taxableIncome = Math.max(0, grossAnnual - preTaxDeduction - 14600);
    const federalTax = estimateFederalTax(taxableIncome);
    const medicareTax = grossAnnual * 0.0145 + Math.max(0, grossAnnual - 200000) * 0.009;
    const ficaTax = Math.min(Math.max(0, grossAnnual), 168600) * 0.062 + medicareTax;
    const stateTaxAmount = taxableIncome * stateTaxRates[stateTax];
    const totalTax = federalTax + ficaTax + stateTaxAmount;
    const takeHomeAnnual = Math.max(0, grossAnnual - preTaxDeduction - totalTax);

    return {
      grossAnnual,
      preTaxDeduction,
      federalTax,
      ficaTax,
      stateTaxAmount,
      totalTax,
      takeHomeAnnual,
      monthly: takeHomeAnnual / 12,
      biweekly: takeHomeAnnual / 26,
      weekly: takeHomeAnnual / 52,
      hourly: takeHomeAnnual / 2080,
      effectiveTaxRate: grossAnnual > 0 ? totalTax / grossAnnual : 0,
    };
  }, [bonus, preTaxPercent, salary, stateTax]);

  const resetDefaults = () => {
    setSalary(120000);
    setBonus(10000);
    setPreTaxPercent(5);
    setStateTax("medium");
  };

  return (
    <main className="bg-white text-slate-900 min-h-screen">
      {/* Hero */}
      <section className="bg-[#fff3ec] py-14 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#ff4c00]/20 text-[#ff4c00] text-sm font-semibold shadow-sm">
            <Calculator className="w-4 h-4" aria-hidden="true" />
            Salary Calculator
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 mb-4">
            Estimate your take-home pay before you accept the offer
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Compare gross salary, bonus, deductions, estimated taxes, and monthly take-home pay in one quick view.
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
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Offer details</h2>
                <button
                  type="button"
                  onClick={resetDefaults}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-[#fff7f2] text-slate-600 transition hover:border-[#ff4c00]/40 hover:text-[#ff4c00]"
                  aria-label="Reset calculator"
                  title="Reset calculator"
                >
                  <RotateCcw size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="grid gap-5">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Annual base salary</span>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-[#fff7f2] px-4 focus-within:border-[#ff4c00]/50 focus-within:ring-2 focus-within:ring-[#ff4c00]/10">
                    <DollarSign size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={salary}
                      onChange={(event) => setSalary(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-3 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Annual bonus or equity value</span>
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

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Pre-tax deductions</span>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-[#fff7f2] px-4 focus-within:border-[#ff4c00]/50 focus-within:ring-2 focus-within:ring-[#ff4c00]/10">
                    <Percent size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={preTaxPercent}
                      onChange={(event) => setPreTaxPercent(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-3 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">State tax estimate</span>
                  <select
                    value={stateTax}
                    onChange={(event) => setStateTax(event.target.value as keyof typeof stateTaxRates)}
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-[#fff7f2] px-4 text-base font-semibold text-slate-900 outline-none focus:border-[#ff4c00]/50 focus:ring-2 focus:ring-[#ff4c00]/10"
                  >
                    <option value="none">No state income tax</option>
                    <option value="low">Low state tax, about 3%</option>
                    <option value="medium">Medium state tax, about 5%</option>
                    <option value="high">High state tax, about 8%</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Results */}
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] p-6 sm:p-7 text-white shadow-lg">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/80">
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  Estimated take-home
                </div>
                <div className="relative mt-3 text-4xl sm:text-5xl font-extrabold leading-none">
                  {formatCurrency(results.takeHomeAnnual)}
                </div>
                <p className="relative mt-3 text-sm sm:text-base font-medium text-white/90">
                  {formatCurrency(results.monthly)} per month after estimated deductions and taxes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-[480px]:grid-cols-1">
                {[
                  ["Gross annual", results.grossAnnual],
                  ["Monthly", results.monthly],
                  ["Biweekly", results.biweekly],
                  ["Weekly", results.weekly],
                  ["Hourly", results.hourly],
                  ["Pre-tax deductions", results.preTaxDeduction],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-[#fff7f2] p-4 sm:p-5">
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">{label}</p>
                    <p className="mt-1.5 text-xl sm:text-2xl font-bold text-slate-900">{formatCurrency(value as number)}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Estimated taxes</h2>
                <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
                  <div className="flex justify-between gap-4">
                    <span>Federal income tax</span>
                    <span className="text-slate-900">{formatCurrency(results.federalTax)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Social Security and Medicare</span>
                    <span className="text-slate-900">{formatCurrency(results.ficaTax)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>State income tax</span>
                    <span className="text-slate-900">{formatCurrency(results.stateTaxAmount)}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-slate-100 pt-3 text-[#ff4c00]">
                    <span>Effective tax rate</span>
                    <span>{formatPercent(results.effectiveTaxRate)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-[#ff4c00]/20 bg-[#fff7f2] p-4 text-sm font-medium leading-6 text-slate-600">
                <Info size={18} className="mt-0.5 shrink-0 text-[#ff4c00]" aria-hidden="true" />
                <p>
                  This calculator is for planning only. Actual payroll can change based on filing status, location, benefits, equity vesting, retirement contributions, and local taxes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
