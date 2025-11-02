// import User from "../models/user.model.js";
// import Product from "../models/product.mosel.js";
// import Order from "../models/order.model.js";
// import { get } from "mongoose";

// export const getAnalytics = async (req, res) => {
//   try {
//     const analyticsData = await getAnalyticsData();
//     const startDate = new Date();
//     const endDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
//     const dailySalesData = await getDailySalesData(startDate, endDate);
//     res.json({ analyticsData, dailySalesData });
//   } catch (error) {
//     console.log("Error in getAnalytics controller:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const getAnalyticsData = async () => {
//   const totalUsers = await User.countDocuments();
//   const totalProducts = await Product.countDocuments();
//   const totalSales = await Order.countDocuments();
//   const revenueData = await Order.aggregate([
//     {
//       $group: {
//         _id: null,
//         totalRevenue: { $sum: "$totalAmount" },
//       },
//     },
//   ]);

//   const totalRevenue = revenueData[0]?.totalRevenue || 0;
//   return {
//     users: totalUsers,
//     products: totalProducts,
//     totalSales,
//     totalRevenue,
//   };
// };

// export const getDailySalesData = async (startDate, endDate) => {
//   try {
//     const dailySalesData = await Order.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: startDate, $lte: endDate },
//         },
//       },
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//           sales: { $sum: 1 },
//           revenue: { $sum: "$totalAmount" },
//         },
//       },
//       {
//         $sort: { _id: 1 },
//       },
//     ]);

//     const dateArray = getDatesInRange(startDate, endDate);
//     return dateArray.map((date) => {
//       const foundData = dailySalesData.find((item) => item._id === date);
//       console.log("Date:", date, "Found Data:", foundData);
//       return {
//         date,
//         sales: foundData ? foundData.sales : 0,
//         revenue: foundData ? foundData.revenue : 0,
//       };
//     });
//   } catch (error) {
//     console.log("Error in getDailySalesData:", error);
//     throw error;
//   }
// };

// function getDatesInRange(startDate, endDate) {
//   const dates = [];
//   let currentDate = new Date(startDate);
//   while (currentDate <= endDate) {
//     dates.push(new Date(currentDate.toISOString().split("T")[0]));
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   return dates;
// }

import User from "../models/user.model.js";
import Product from "../models/product.mosel.js";
import Order from "../models/order.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    // ✅ Corrected: last 7 days
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);
    res.json({ analyticsData, dailySalesData });
  } catch (error) {
    console.error("Error in getAnalytics controller:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalSales = await Order.countDocuments();

  const revenueData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const totalRevenue = revenueData[0]?.totalRevenue || 0;
  return {
    users: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
};

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    return dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);
      console.log("Date:", date, "Found Data:", foundData);
      return {
        date,
        sales: foundData ? foundData.sales : 0,
        revenue: foundData ? foundData.revenue : 0,
      };
    });
  } catch (error) {
    console.error("Error in getDailySalesData:", error);
    throw error;
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]); // ✅ string format
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
