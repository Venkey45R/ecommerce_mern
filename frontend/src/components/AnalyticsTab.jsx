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
        console.log(res.data);
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white text-xl font-semibold">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-3xl from-blue-950 via-blue-900 to-indigo-950 px-6 py-12 text-white relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/30 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full -z-10"></div>

      {/* Header */}
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-blue-200 text-sm font-medium">
          Real-time insights into your platform performance 🚀
        </p>
      </div>

      {/* Analytics cards container */}
      <div className="flex flex-wrap justify-center gap-8">
        <AnalyticsCard
          title="Total Users"
          value={(analyticsData?.users ?? 0).toLocaleString()}
          icon={Users}
          gradient="from-blue-500 via-blue-600 to-blue-700"
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
      <motion.div
        className="bg-blue-800/60 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke="#D1D5DB"
              tickFormatter={(tick) => tick.slice(5)} // shows only MM-DD
            />
            <YAxis yAxisId="left" stroke="#D1D5DB" />
            <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Sales Count"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue (₹)"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, gradient, shadow }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 0.5 }}
    whileTap={{ scale: 0.98 }}
    className={`relative w-full sm:w-[300px] lg:w-[260px] xl:w-[280px] 
                p-6 rounded-2xl bg-gradient-to-br ${gradient} ${shadow}
                text-white overflow-hidden border border-white/10 
                backdrop-blur-md transition-all duration-300`}
  >
    {/* Inner glow */}
    <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-10 transition duration-300 rounded-2xl"></div>

    {/* Card content */}
    <div className="flex justify-between items-center mb-2">
      <p className="text-sm uppercase tracking-wider text-blue-100 font-semibold">
        {title}
      </p>
      <Icon className="size-6 opacity-70" />
    </div>

    <h3 className="text-4xl font-extrabold mb-3">{value}</h3>

    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-white/60 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>

    {/* Floating background icon */}
    <motion.div
      className="absolute -bottom-8 -right-6 opacity-10"
      animate={{ rotate: [0, 15, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      <Icon className="size-32" />
    </motion.div>
  </motion.div>
);
