import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommandedProducts,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", protectRoute, getFeaturedProducts);
router.get("/recommandations", getRecommandedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.get("/category/:category", protectRoute, getProductsByCategory);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);

export default router;
