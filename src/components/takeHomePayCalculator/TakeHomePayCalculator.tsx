"use client";

import { useMemo, useState } from "react";
import { Banknote, CalendarDays, DollarSign, Info, Percent, RotateCcw } from "lucide-react";

const federalAllowance = 14600;
const socialSecurityWageBase = 168600;

const payPeriods = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

const stateTaxRates = {
  none: 0,
  low: 0.03,
  medium: 0.05,
  high: 0.08,
};

type PayPeriod = keyof typeof payPeriods;
type StateTax = keyof typeof stateTaxRates;

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

export default function TakeHomePayCalculator() {
  const [grossPay, setGrossPay] = useState(5000);
  const [payPeriod, setPayPeriod] = useState<PayPeriod>("biweekly");
  const [preTaxDeductions, setPreTaxDeductions] = useState(250);
  const [postTaxDeductions, setPostTaxDeductions] = useState(75);
  const [stateTax, setStateTax] = useState<StateTax>("medium");

  const results = useMemo(() => {
    const periods = payPeriods[payPeriod];
    const grossPerPaycheck = Math.max(0, grossPay);
    const annualGross = grossPerPaycheck * periods;
    const annualPreTaxDeductions = Math.max(0, preTaxDeductions) * periods;
    const annualPostTaxDeductions = Math.max(0, postTaxDeductions) * periods;
    const taxableIncome = Math.max(0, annualGross - annualPreTaxDeductions - federalAllowance);
    const stateAGI = Math.max(0, annualGross - annualPreTaxDeductions);
    const federalTax = estimateFederalTax(taxableIncome);
    const medicareTax = annualGross * 0.0145 + Math.max(0, annualGross - 200000) * 0.009;
    const ficaTax = Math.min(annualGross, socialSecurityWageBase) * 0.062 + medicareTax;
    const stateTaxAmount = stateAGI * stateTaxRates[stateTax];
    const totalAnnualTaxes = federalTax + ficaTax + stateTaxAmount;
    const annualTakeHome = Math.max(0, annualGross - annualPreTaxDeductions - totalAnnualTaxes - annualPostTaxDeductions);
    const paycheckTakeHome = annualTakeHome / periods;

    return {
      annualGross,
      annualPreTaxDeductions,
      annualPostTaxDeductions,
      annualTakeHome,
      paycheckTakeHome,
      monthlyTakeHome: annualTakeHome / 12,
      annualTaxes: totalAnnualTaxes,
      paycheckTaxes: totalAnnualTaxes / periods,
      federalTax: federalTax / periods,
      ficaTax: ficaTax / periods,
      stateTaxAmount: stateTaxAmount / periods,
      effectiveTaxRate: annualGross > 0 ? totalAnnualTaxes / annualGross : 0,
    };
  }, [grossPay, payPeriod, postTaxDeductions, preTaxDeductions, stateTax]);

  const resetDefaults = () => {
    setGrossPay(5000);
    setPayPeriod("biweekly");
    setPreTaxDeductions(250);
    setPostTaxDeductions(75);
    setStateTax("medium");
  };

  return (
    <main className="min-h-screen bg-[#fff7f2] text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#ff4c00]/5 to-transparent rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-[#ff4c00]/5 to-transparent rounded-full translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ff4c00]/10 border border-[#ff4c00]/20 px-4 py-2 text-sm font-semibold text-[#ff4c00]">
              <Banknote size={16} aria-hidden="true" />
              Take Home Pay Calculator
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
              See what actually lands in your bank account each paycheck.
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
              Enter your gross paycheck, pay schedule, deductions, and estimated state tax to calculate take-home pay.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900">Paycheck details</h2>
                <button
                  type="button"
                  onClick={resetDefaults}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-[#fff7f2] text-slate-500 transition hover:border-[#ff4c00] hover:text-[#ff4c00]"
                  aria-label="Reset take home pay calculator"
                  title="Reset calculator"
                >
                  <RotateCcw size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="grid gap-5">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Gross pay per paycheck</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#fff7f2] px-4 transition focus-within:border-[#ff4c00]">
                    <DollarSign size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={grossPay}
                      onChange={(event) => setGrossPay(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-2 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Pay frequency</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#fff7f2] px-4 transition focus-within:border-[#ff4c00]">
                    <CalendarDays size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <select
                      value={payPeriod}
                      onChange={(event) => setPayPeriod(event.target.value as PayPeriod)}
                      className="min-h-12 w-full bg-transparent px-2 text-base font-semibold text-slate-900 outline-none"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Biweekly</option>
                      <option value="semimonthly">Semi-monthly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Pre-tax deductions per paycheck</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#fff7f2] px-4 transition focus-within:border-[#ff4c00]">
                    <DollarSign size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={preTaxDeductions}
                      onChange={(event) => setPreTaxDeductions(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-2 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Post-tax deductions per paycheck</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#fff7f2] px-4 transition focus-within:border-[#ff4c00]">
                    <DollarSign size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <input
                      type="number"
                      min="0"
                      value={postTaxDeductions}
                      onChange={(event) => setPostTaxDeductions(Number(event.target.value))}
                      className="min-h-12 w-full bg-transparent px-2 text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">State tax estimate</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#fff7f2] px-4 transition focus-within:border-[#ff4c00]">
                    <Percent size={18} className="text-[#ff4c00]" aria-hidden="true" />
                    <select
                      value={stateTax}
                      onChange={(event) => setStateTax(event.target.value as StateTax)}
                      className="min-h-12 w-full bg-transparent px-2 text-base font-semibold text-slate-900 outline-none"
                    >
                      <option value="none">No state income tax</option>
                      <option value="low">Low state tax, about 3%</option>
                      <option value="medium">Medium state tax, about 5%</option>
                      <option value="high">High state tax, about 8%</option>
                    </select>
                  </div>
                </label>
              </div>
            </section>

            <section className="grid gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b2c] p-6 md:p-8 text-white shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/80">Estimated take-home per paycheck</p>
                <div className="mt-3 text-4xl md:text-5xl font-bold leading-none">
                  {formatCurrency(results.paycheckTakeHome)}
                </div>
                <p className="mt-3 text-base font-medium text-white/90">
                  {formatCurrency(results.monthlyTakeHome)} monthly take-home estimate.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                {[
                  ["Gross annual pay", results.annualGross],
                  ["Annual take-home", results.annualTakeHome],
                  ["Taxes per paycheck", results.paycheckTaxes],
                  ["Pre-tax deductions", preTaxDeductions],
                  ["Post-tax deductions", postTaxDeductions],
                  ["Effective tax rate", formatPercent(results.effectiveTaxRate)],
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
                <h2 className="text-xl font-bold text-slate-900">Per-paycheck tax estimate</h2>
                <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
                  <div className="flex justify-between gap-4">
                    <span>Federal income tax</span>
                    <span>{formatCurrency(results.federalTax)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Social Security and Medicare</span>
                    <span>{formatCurrency(results.ficaTax)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>State income tax</span>
                    <span>{formatCurrency(results.stateTaxAmount)}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-slate-100 pt-3 font-bold text-slate-900">
                    <span>Total estimated taxes</span>
                    <span>{formatCurrency(results.paycheckTaxes)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-[#ff4c00]/15 bg-white p-4 text-sm leading-6 text-slate-600">
                <Info size={18} className="mt-0.5 shrink-0 text-[#ff4c00]" aria-hidden="true" />
                <p>
                  This tool provides a planning estimate only. Real take-home pay can vary by filing status, benefits, local taxes, retirement contributions, and payroll rules.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
