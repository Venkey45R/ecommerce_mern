import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subTotal: 0,
  isCouponApplied: false,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error("Could not load cart items.");
      console.error("Failed to fetch cart items:", error);
    }
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      set((prev) => {
        const existingItem = prev.cart.find((item) => item._id === product._id);
        const newCart = existingItem
          ? prev.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prev.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error("Could not add item to cart.");
      console.error("Failed to add to cart:", error);
    }
  },

  fetchCart: async () => {
    try {
      const res = await axios.get("/cart"); // backend endpoint to get cart products
      set({ cart: res.data });
    } catch (err) {
      console.error(err);
    }
  },

  calculateTotals: () => {
    const { cart = [], coupon } = get();

    const subTotal = cart.reduce((sum, item) => {
      // Skip item if undefined or missing price/quantity
      if (
        !item ||
        typeof item.price !== "number" ||
        typeof item.quantity !== "number"
      ) {
        return sum;
      }
      return sum + item.price * item.quantity;
    }, 0);

    let total = subTotal;

    if (coupon && typeof coupon.discountPercentage === "number") {
      const discount = (coupon.discountPercentage / 100) * subTotal;
      total = subTotal - discount;
    }

    set({ subTotal, total });
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart`, { data: { productId } });
      set((prev) => ({
        cart: prev.cart.filter((item) => item._id !== productId),
      }));
      get().calculateTotals();
    } catch (error) {
      console.log("Error removing item from server cart:", error);
    }
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }
    await axios.put(`/cart/${productId}`, { quantity });
    set((prev) => ({
      cart: prev.cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotals();
  },

  clearCart: async () => {
    await axios.delete("/cart");
    set({
      cart: [],
      coupon: null,
      total: 0,
      subTotal: 0,
      isCouponApplied: false,
    });
  },

  getMyCoupon: async () => {
    try {
      const res = await axios.get("/coupons");
      set({ coupon: res.data });
    } catch (error) {
      console.log("Error fetching coupon:", error);
    }
  },

  applyCoupon: async (code) => {
    try {
      const res = await axios.post("/coupons/validate", { code });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon.");
      console.log("Error applying coupon:", error);
    }
  },

  removeCoupon: async () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },
}));
