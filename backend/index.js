import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.routes.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import { connectDB } from "./lib/db.js";
import path from "path";

dotenv.config();
const app = express();

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception =>", err);
});

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();
console.log("🔍 Registering routes...");

app.use("/api/auth", authRoutes);
console.log("✅ Auth route loaded");

app.use("/api/products", productRoutes);
console.log("✅ Product route loaded");

app.use("/api/cart", cartRoutes);
console.log("✅ Cart route loaded");

app.use("/api/coupons", couponRoutes);
console.log("✅ Coupon route loaded");

app.use("/api/payments", paymentRoutes);
console.log("✅ Payment route loaded");

app.use("/api/analytics", analyticsRoutes);
console.log("✅ Analytics route loaded");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
