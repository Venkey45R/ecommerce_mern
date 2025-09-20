import jwt from "jsonwebtoken";
import user from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;
    if (!access_token) {
      return res
        .status(401)
        .json({ message: "Unauthorized No token provided" });
    }
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
    const User = await user.finsdById(decoded.userId).select("-password");
    if (!User) {
      return res.status(401).json({ message: "Unauthorized user not found" });
    }
    req.User = User;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error);
    return res.status(401).json({ message: "Unauthorized Invalid token" });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.User.role !== "admin") {
    return res.status(403).json({ message: "Access Denied Admins only" });
  }
  next();
};
