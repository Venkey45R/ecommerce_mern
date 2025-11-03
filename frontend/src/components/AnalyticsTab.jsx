import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function AnalyticsTab() {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/analytics");
        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(res.data.dailySalesData);
      } catch (error) {
        console.log("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-br from-blue-950 via-indigo-900 to-indigo-950">
        <motion.div
          className="w-16 h-16 mb-6 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        ></motion.div>
        <p className="text-lg font-medium">Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-6 py-16 overflow-hidden text-white">
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/30 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full -z-10"></div>

      {/* Header */}
      <div className="mb-12 text-center">
        <motion.h1
          className="mb-2 text-4xl font-extrabold tracking-tight md:text-5xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Analytics Overview
        </motion.h1>
        <p className="font-medium text-blue-200">
          Visualize your performance metrics in real-time ⚡
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Total Users"
          value={(analyticsData?.users ?? 0).toLocaleString()}
          icon={Users}
          gradient="from-blue-500 via-blue-600 to-indigo-700"
          shadow="shadow-blue-900/40"
        />
        <AnalyticsCard
          title="Total Products"
          value={(analyticsData?.products ?? 0).toLocaleString()}
          icon={Package}
          gradient="from-cyan-500 via-blue-500 to-indigo-600"
          shadow="shadow-cyan-900/40"
        />
        <AnalyticsCard
          title="Total Sales"
          value={(analyticsData?.totalSales ?? 0).toLocaleString()}
          icon={ShoppingCart}
          gradient="from-sky-500 via-blue-600 to-indigo-700"
          shadow="shadow-sky-900/40"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`₹${(analyticsData?.totalRevenue ?? 0).toLocaleString()}`}
          icon={DollarSign}
          gradient="from-indigo-500 via-blue-600 to-sky-700"
          shadow="shadow-indigo-900/40"
        />
      </div>

      {/* Chart Section */}
      <motion.div
        className="p-0 border shadow-xl lg:p-6 bg-gradient-to-br from-slate-800 to-blue-900 rounded-2xl border-blue-700/40"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="mb-4 text-2xl font-semibold text-center text-white">
          Daily Sales & Revenue Trends
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailySalesData}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255,255,255,0.15)"
            />
            <XAxis
              dataKey="date"
              stroke="#CBD5E1"
              tickFormatter={(tick) => tick.slice(5)} // MM-DD format
              tick={{ fill: "#E2E8F0" }}
            />
            <YAxis yAxisId="left" stroke="#CBD5E1" tick={{ fill: "#E2E8F0" }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#CBD5E1"
              tick={{ fill: "#E2E8F0" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#F1F5F9",
              }}
              labelStyle={{ color: "#E2E8F0" }}
            />
            <Legend wrapperStyle={{ color: "#E2E8F0", fontWeight: 500 }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#FACC15" // bright yellow for contrast
              strokeWidth={3}
              dot={{ r: 5, fill: "#FACC15", strokeWidth: 0 }}
              activeDot={{ r: 8, stroke: "#FACC15", fill: "#FFF" }}
              name="Sales Count"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#38BDF8" // light cyan-blue
              strokeWidth={3}
              dot={{ r: 5, fill: "#38BDF8", strokeWidth: 0 }}
              activeDot={{ r: 8, stroke: "#38BDF8", fill: "#FFF" }}
              name="Revenue (₹)"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

export default AnalyticsTab;

// -------------------
// Reusable Card
// -------------------
const AnalyticsCard = ({ title, value, icon: Icon, gradient, shadow }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 0.5 }}
    whileTap={{ scale: 0.98 }}
    className={`relative p-6 rounded-2xl bg-gradient-to-br ${gradient} ${shadow} text-white overflow-hidden border border-white/10 backdrop-blur-md transition-all duration-300`}
  >
    {/* Card Header */}
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-semibold tracking-wider text-blue-100 uppercase">
        {title}
      </p>
      <Icon className="size-6 opacity-70" />
    </div>

    {/* Card Value */}
    <h3 className="mb-3 text-4xl font-extrabold">{value}</h3>

    {/* Subtle Progress Line */}
    <div className="w-full h-1 overflow-hidden rounded-full bg-white/20">
      <motion.div
        className="h-full rounded-full bg-white/60"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>

    {/* Floating Background Icon */}
    <motion.div
      className="absolute -bottom-8 -right-6 opacity-10"
      animate={{ rotate: [0, 15, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      <Icon className="size-32" />
    </motion.div>
  </motion.div>
);
