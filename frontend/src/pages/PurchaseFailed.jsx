import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

function PurchaseFailed() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md overflow-hidden shadow-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 rounded-2xl"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-red-400 via-blue-300 to-transparent" />
        <div className="relative p-8 sm:p-10">
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <XCircle className="mb-4 text-red-400 size-20 drop-shadow-lg" />
            </motion.div>
          </div>

          <h1 className="mb-3 text-3xl font-bold text-center text-white sm:text-4xl">
            Payment Failed
          </h1>
          <p className="mb-6 text-center text-blue-100">
            Your transaction was cancelled. No charges were made.
          </p>

          <div className="p-5 mb-8 border border-blue-700 bg-blue-800/40 rounded-xl backdrop-blur-sm">
            <p className="text-sm text-center text-blue-200">
              Need help?{" "}
              <span className="font-medium text-white underline cursor-pointer hover:text-emerald-300">
                Contact Support
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center justify-center w-full px-5 py-3 text-lg font-semibold text-emerald-400 bg-emerald-900/20 border border-emerald-700 rounded-xl hover:bg-emerald-700/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <ArrowLeft className="mr-2" size={18} /> Return to Shop
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PurchaseFailed;
