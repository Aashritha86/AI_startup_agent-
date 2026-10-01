'use client';

import React, { useState, useMemo } from 'react';
import { CostEstimation } from '@/types/startup';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  Sliders,
  Target,
  ArrowUpRight,
  CreditCard,
  PieChart
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface Props {
  costEstimation?: CostEstimation;
  startupTitle?: string;
}

export const FinancialCalculator: React.FC<Props> = ({ costEstimation, startupTitle = 'Performance Analytics' }) => {
  const baseBurn = costEstimation?.monthlyBurnRate || 980;
  const initialDefaults = costEstimation?.financialDefaults;

  // Sliders & Filter State
  const [marketingBudget, setMarketingBudget] = useState<number>(initialDefaults?.defaultMarketingBudget || 3000);
  const [arpu, setArpu] = useState<number>(initialDefaults?.defaultArpu || 79);
  const [churnRate, setChurnRate] = useState<number>(initialDefaults?.defaultChurnRate || 4.0);
  const [timeframe, setTimeframe] = useState<'3M' | '6M' | '1Y'>('1Y');

  // Dynamic Financial Modeling Calculations
  const metrics = useMemo(() => {
    const estimatedCac = Math.max(35, Math.round(arpu * 1.8));
    const monthlyNewCustomers = Math.max(5, Math.round(marketingBudget / estimatedCac));
    const lifetimeMonths = churnRate > 0 ? 1 / (churnRate / 100) : 24;
    const ltv = Math.round(arpu * lifetimeMonths);
    const ltvCacRatio = (ltv / estimatedCac).toFixed(1);

    let currentCustomers = 0;
    let cumulativeCash = 0;
    let breakEvenMonth: number | null = null;
    const allMonthlyData = [];

    const monthCount = timeframe === '3M' ? 3 : timeframe === '6M' ? 6 : 12;

    for (let month = 1; month <= monthCount; month++) {
      const churned = Math.round(currentCustomers * (churnRate / 100));
      currentCustomers = Math.max(0, currentCustomers - churned + monthlyNewCustomers);

      const monthlyRevenue = currentCustomers * arpu;
      const totalExpenses = baseBurn + marketingBudget;
      const netProfit = monthlyRevenue - totalExpenses;
      cumulativeCash += netProfit;

      if (netProfit >= 0 && breakEvenMonth === null) {
        breakEvenMonth = month;
      }

      allMonthlyData.push({
        month: `M${month}`,
        customers: currentCustomers,
        revenue: Math.round(monthlyRevenue),
        expenses: totalExpenses,
        netCashFlow: Math.round(netProfit),
        cumulativeCash: Math.round(cumulativeCash),
      });
    }

    return {
      estimatedCac,
      monthlyNewCustomers,
      ltv,
      ltvCacRatio,
      breakEvenMonth,
      monthlyData: allMonthlyData,
      year1Revenue: allMonthlyData.reduce((sum, d) => sum + d.revenue, 0),
      month12Mrr: allMonthlyData[allMonthlyData.length - 1]?.revenue || 0,
      month12Customers: allMonthlyData[allMonthlyData.length - 1]?.customers || 0,
    };
  }, [baseBurn, marketingBudget, arpu, churnRate, timeframe]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EEFAF7] flex items-center justify-center text-[#268574] shrink-0">
            <TrendingUp className="w-5 h-5 text-[#268574]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <span>{startupTitle}</span>
              <Badge variant="aqua">Live Engine</Badge>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Interactive unit economics model & projection coupled to base infra costs (${baseBurn}/mo).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#EEFAF7] px-4 py-2.5 rounded-xl border border-[#4DC6AB]/30">
          <div>
            <span className="text-[10px] text-[#64748B] font-bold uppercase block">Break-Even Status</span>
            <span className={`text-xs font-bold font-mono ${metrics.breakEvenMonth ? 'text-[#268574]' : 'text-[#EE3E4C]'}`}>
              {metrics.breakEvenMonth ? `Month ${metrics.breakEvenMonth} Break-Even` : 'Post-Year 1 Break-Even'}
            </span>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Holdings / Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Holdings Run-Rate</span>
            <div className="w-8 h-8 rounded-full bg-[#EEFAF7] flex items-center justify-center text-[#268574]">
              <PieChart className="w-4 h-4 text-[#268574]" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A] font-mono">
            ${metrics.month12Mrr.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#64748B]">
            <span>{metrics.month12Customers} Subscribers</span>
            <button className="text-[#64748B] hover:text-[#EE3E4C] flex items-center gap-0.5 transition-colors font-medium">
              Opt-out of fund <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 2: Payout Schedule / CAC */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Payout Schedule (CAC)</span>
            <div className="w-8 h-8 rounded-full bg-[#EEFAF7] flex items-center justify-center text-[#268574]">
              <CreditCard className="w-4 h-4 text-[#268574]" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A] font-mono">
            ${metrics.estimatedCac}
          </div>
          <div className="text-[11px] text-[#64748B]">
            Est. customer conversion cost
          </div>
        </div>

        {/* Metric 3: LTV */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Lifetime Value (LTV)</span>
            <div className="w-8 h-8 rounded-full bg-[#EEFAF7] flex items-center justify-center text-[#268574]">
              <DollarSign className="w-4 h-4 text-[#268574]" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#268574] font-mono">
            ${metrics.ltv.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#64748B]">
            LTV / CAC: <strong className="text-[#268574] font-bold">{metrics.ltvCacRatio}x</strong>
          </div>
        </div>

        {/* Metric 4: Primary Action Fund */}
        <div className="p-5 rounded-2xl bg-[#EEFAF7] border border-[#4DC6AB]/40 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#268574] block uppercase tracking-wider mb-1">Fund Management</span>
            <div className="text-xs text-[#64748B]">Instant liquidity & reinvestment</div>
          </div>
          <div className="flex items-center gap-2 pt-3">
            <button className="flex-1 px-3 py-2 rounded-xl bg-[#EE3E4C] hover:bg-[#A61221] text-white text-xs font-bold transition-colors shadow-md cursor-pointer text-center">
              Buy fund
            </button>
            <button className="flex-1 px-3 py-2 rounded-xl border border-[#268574] text-[#268574] hover:bg-[#268574] hover:text-white text-xs font-bold transition-colors cursor-pointer text-center">
              Sell
            </button>
          </div>
        </div>
      </div>

      {/* Sliders Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Slider 1: Marketing Budget */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#EE3E4C]" />
              Monthly Marketing Budget
            </span>
            <span className="text-xs font-mono font-extrabold text-[#EE3E4C]">
              ${marketingBudget.toLocaleString()}/mo
            </span>
          </div>
          <input
            type="range"
            min={500}
            max={25000}
            step={250}
            value={marketingBudget}
            onChange={(e) => setMarketingBudget(Number(e.target.value))}
            className="w-full accent-[#EE3E4C] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
            <span>$500/mo</span>
            <span>$25,000/mo</span>
          </div>
        </div>

        {/* Slider 2: Average Pricing Tier (ARPU) */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#268574]" />
              Average Pricing Tier (ARPU)
            </span>
            <span className="text-xs font-mono font-extrabold text-[#268574]">
              ${arpu}/mo
            </span>
          </div>
          <input
            type="range"
            min={19}
            max={499}
            step={10}
            value={arpu}
            onChange={(e) => setArpu(Number(e.target.value))}
            className="w-full accent-[#4DC6AB] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
            <span>$19/mo</span>
            <span>$499/mo</span>
          </div>
        </div>

        {/* Slider 3: Customer Churn Rate */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#F25C38]" />
              Monthly Churn Rate (%)
            </span>
            <span className="text-xs font-mono font-extrabold text-[#F25C38]">
              {churnRate}%
            </span>
          </div>
          <input
            type="range"
            min={1.0}
            max={12.0}
            step={0.5}
            value={churnRate}
            onChange={(e) => setChurnRate(Number(e.target.value))}
            className="w-full accent-[#F25C38] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
            <span>1.0% (Sticky B2B)</span>
            <span>12.0% (High Churn)</span>
          </div>
        </div>
      </div>

      {/* Performance Analytics Chart Component */}
      <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EEFAF7] flex items-center justify-center text-[#268574]">
              <TrendingUp className="w-4.5 h-4.5 text-[#268574]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0F172A]">
                Revenue & Profit Performance Trajectory
              </h3>
              <p className="text-xs text-[#64748B]">
                Interactive multi-variable financial projection (Revenue, Net Profit, and Expenses)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Legend Badges */}
            <div className="flex items-center gap-3 font-semibold text-xs">
              <span className="flex items-center gap-1.5 text-[#10B981]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] inline-block"></span>
                Revenue
              </span>
              <span className="flex items-center gap-1.5 text-[#3B82F6]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] inline-block"></span>
                Net Profit
              </span>
              <span className="flex items-center gap-1.5 text-[#EF4444]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] inline-block"></span>
                Expenses
              </span>
            </div>

            {/* Active Timeframe Pill Filter Buttons (3M / 6M / 1Y) */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              {(['3M', '6M', '1Y'] as const).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={`py-1 px-2.5 rounded-lg text-xs transition-all cursor-pointer font-bold ${
                    timeframe === tf
                      ? 'bg-[#10B981] text-white shadow-sm'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recharts AreaChart Canvas */}
        <div className="w-full h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="expensesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                stroke="#94A3B8"
                tick={{ fill: '#64748B', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xl space-y-2 text-xs font-sans">
                        <div className="font-extrabold text-[#0F172A] pb-1 border-b border-slate-100 flex items-center justify-between gap-6">
                          <span>Month: {label}</span>
                          <span className="text-[11px] font-mono font-bold text-[#10B981]">
                            {data.customers} subscribers
                          </span>
                        </div>
                        <div className="space-y-1.5 pt-0.5">
                          <div className="flex items-center justify-between gap-6 text-[#10B981]">
                            <span className="flex items-center gap-1.5 font-bold">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                              Monthly Revenue:
                            </span>
                            <span className="font-mono font-extrabold">${data.revenue.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between gap-6 text-[#3B82F6]">
                            <span className="flex items-center gap-1.5 font-bold">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
                              Net Profit:
                            </span>
                            <span className={`font-mono font-extrabold ${data.netCashFlow >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                              ${data.netCashFlow.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-6 text-[#EF4444]">
                            <span className="flex items-center gap-1.5 font-bold">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                              Total Expenses:
                            </span>
                            <span className="font-mono font-extrabold">${data.expenses.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#revenueGrad)"
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="netCashFlow"
                stroke="#3B82F6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#profitGrad)"
                name="Net Profit"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#expensesGrad)"
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
