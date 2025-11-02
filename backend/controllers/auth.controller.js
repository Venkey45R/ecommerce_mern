import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import redis from "../lib/redis.js";
import bcrypt from "bcryptjs";
const generateTokens = (userId) => {
  const access_token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refresh_token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { access_token, refresh_token };
};

const store_refresh_token = async (userId, refresh_token) => {
  await redis.set(
    `refresh_token:${userId}`,
    refresh_token,
    "EX",
    7 * 24 * 60 * 60
  );
};

const setCookies = (res, access_token, refresh_token) => {
  res.cookie("access_token", access_token, {
    httpOnly: true, // prevent XSS attacks
    secure: process.env.NODE_ENV === "production", // set to true in production
    sameSite: "Strict", // CSRF protection
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true, // prevent XSS attacks
    secure: process.env.NODE_ENV === "production", // set to true in production
    sameSite: "Strict", // CSRF protection
    maxAge: 7 * 24 * 60 * 1000, // 7 days
  });
};

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, name });
    //authenticate user
    const { access_token, refresh_token } = generateTokens(user._id);
    await store_refresh_token(user._id, refresh_token);
    setCookies(res, access_token, refresh_token);
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { access_token, refresh_token } = generateTokens(user._id);
    await store_refresh_token(user._id, refresh_token);
    setCookies(res, access_token, refresh_token);
    res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in signin controller:", error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    if (refresh_token) {
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      return res.status(200).json({ message: "Logged out successfully" });
    }
  } catch (error) {
    console.log("Error in logout controller:", error);
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    const stored_token = await redis.get(`refresh_token:${decoded.userId}`);
    if (stored_token !== refresh_token) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const access_token = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: "Access token refreshed" });
  } catch (error) {
    console.log("Error in refresh token controller:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
