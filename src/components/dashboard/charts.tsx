"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

const monthlyData = [
  { month: "Jan", sales: 12000, revenue: 9800 },
  { month: "Feb", sales: 14200, revenue: 11300 },
  { month: "Mar", sales: 15800, revenue: 12400 },
  { month: "Apr", sales: 16100, revenue: 12700 },
];

export function MonthlySalesChart() {
  return <ResponsiveContainer width="100%" height={220}><LineChart data={monthlyData}><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="sales" stroke="#4f7cff" /></LineChart></ResponsiveContainer>;
}

export function OrdersRevenueChart() {
  return <ResponsiveContainer width="100%" height={220}><BarChart data={monthlyData}><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="revenue" fill="#22d3ee" /></BarChart></ResponsiveContainer>;
}
