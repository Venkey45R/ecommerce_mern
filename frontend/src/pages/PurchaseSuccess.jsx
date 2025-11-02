import { ArrowRight, CheckCircle, HandHeart, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axiosInstance from "../lib/axios";
import Confetti from "react-confetti";

function PurchaseSuccess() {
  const today = new Date();
  const estimate = new Date(today);
  estimate.setDate(today.getDate() + 4);
  const format = estimate.toISOString().split("T")[0];
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState("");
  useEffect(() => {
    const handleCheckout = async (sessionId) => {
      try {
        await axiosInstance.post("/payments/checkout-success", {
          sessionId,
        });
        clearCart();
      } catch (error) {
        console.log("error in purchase success page: ", error);
      } finally {
        setIsProcessing(false);
      }
    };
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      handleCheckout(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session id found");
    }
  }, [clearCart]);

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-700">
        <Loader2 className="w-8 h-8 mb-3 text-blue-500 animate-spin" />
        <p className="text-lg font-medium">Processing your payment...</p>
      </div>
    );
  }

  if (error) {
    return `Error: ${error}`;
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-emerald-100 via-blue-100 to-white">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.7}
        style={{ zIndex: 99 }}
        numberOfPieces={500}
        recycle={false}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md border border-gray-100 shadow-2xl rounded-2xl bg-white/90 backdrop-blur-md"
      >
        <div className="p-8 sm:p-10">
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="p-3 rounded-full bg-emerald-100"
            >
              <CheckCircle className="text-emerald-600 size-14" />
            </motion.div>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-center text-gray-800">
            Purchase Successful 🎉
          </h1>
          <p className="mt-2 text-center text-gray-500">
            Thank you for your order! Your payment has been received.
          </p>
          <p className="text-sm text-center text-gray-400">
            Check your email for tracking details and confirmation.
          </p>

          <div className="p-5 mt-6 border bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Order Number</span>
              <span className="text-sm font-semibold text-emerald-700">
                #122345
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Estimated Delivery</span>
              <span className="text-sm font-semibold text-emerald-700">
                {format}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button className="flex items-center justify-center w-full px-4 py-3 font-semibold text-white transition-all duration-200 shadow-sm rounded-xl bg-emerald-600 hover:bg-emerald-700">
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to="/"
              className="flex items-center justify-center w-full px-4 py-3 font-semibold transition-all duration-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl"
            >
              Continue Shopping <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PurchaseSuccess;
