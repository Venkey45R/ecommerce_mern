import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import GiftCouponCart from "../components/GiftCouponCart";
import Footer from "../components/Footer";

function CartPage() {
  const { cart } = useCartStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.h1
          className="mb-12 text-3xl font-extrabold text-center text-emerald-700 sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Your Shopping Cart
        </motion.h1>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-10">
            {/* Cart Items - Responsive Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cart
                .filter((item) => item && item._id)
                .map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="gap-6 p-6 bg-white border border-gray-200 shadow-lg lg:flex rounded-2xl"
            >
              <div className="w-full lg:w-1/2">
                <OrderSummary />
              </div>
              <div className="block mt-4 lg:mt-16 lg:w-1/2">
                <GiftCouponCart />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;

const EmptyCart = () => (
  <motion.div
    className="flex flex-col items-center justify-center py-20 space-y-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="w-24 h-24 text-gray-400" />
    <h3 className="text-2xl font-semibold text-gray-700">Your cart is empty</h3>
    <p className="text-gray-500">Add your first product to get started</p>
    <Link
      to="/"
      className="px-6 py-3 mt-4 text-white transition-all rounded-lg shadow-md bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg"
    >
      Start Shopping
    </Link>
  </motion.div>
);
