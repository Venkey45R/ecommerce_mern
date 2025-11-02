// import React from "react";
// import { motion } from "framer-motion";
// import { useCartStore } from "../stores/useCartStore";
// import { Link } from "react-router-dom";
// import { MoveRight } from "lucide-react";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "../lib/axios";

// const stripePromise = loadStripe(
//   "pk_test_51S7vscRsD1B0ePlPELa5bT7MoJ1z3XTttpKShBJCO5dUsL5dQdTIIsavlsfBaAtuQdMrIFgheY3oGeMbLDiABGvy00yA7OIVHc"
// );

// function OrderSummary() {
//   const { total, subTotal, coupon, isCouponApplied, cart } = useCartStore();
//   const savings = total - subTotal;

//   const format_sub = subTotal.toFixed(2);
//   const format_tot = total.toFixed(2);
//   const format_sav = savings.toFixed(2);

//   const handlePayment = async () => {
//     const stripe = await stripePromise;
//     const res = await axios.post("/payments/create-checkout-session", {
//       products: cart,
//       couponCode: coupon ? coupon.code : null,
//     });
//     const session = res.data;
//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });
//     if (result.error) {
//       console.error(result.error);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>

//       <div className="p-4 space-y-4 bg-white border border-gray-200 shadow rounded-xl">
//         <div className="space-y-2">
//           <dl className="flex justify-between">
//             <dt className="text-gray-500">Original Price</dt>
//             <dd className="font-medium text-gray-800">${format_sub}</dd>
//           </dl>

//           {savings > 0 && (
//             <dl className="flex justify-between">
//               <dt className="text-gray-500">Savings</dt>
//               <dd className="font-medium text-red-500">-${format_sav}</dd>
//             </dl>
//           )}

//           {coupon && isCouponApplied && (
//             <dl className="flex justify-between">
//               <dt className="text-gray-500">Coupon ({coupon.code})</dt>
//               <dd className="font-medium text-green-600">
//                 -{coupon.discountPercentage}%
//               </dd>
//             </dl>
//           )}

//           <dl className="flex justify-between pt-2 border-t border-gray-200">
//             <dt className="font-semibold text-gray-700">Total</dt>
//             <dd className="font-bold text-gray-900">${format_tot}</dd>
//           </dl>
//         </div>

//         <motion.button
//           className="w-full py-3 font-semibold text-white transition rounded-lg shadow bg-emerald-600 hover:bg-emerald-700"
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           onClick={handlePayment}
//         >
//           Proceed To Checkout
//         </motion.button>

//         <div className="text-center">
//           <span className="text-sm text-gray-400">or</span>
//           <Link
//             to="/"
//             className="inline-flex items-center gap-1 ml-2 text-sm font-medium underline text-emerald-600 hover:text-emerald-500"
//           >
//             Continue Shopping <MoveRight size={16} />
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default OrderSummary;

import React from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51S7vscRsD1B0ePlPELa5bT7MoJ1z3XTttpKShBJCO5dUsL5dQdTIIsavlsfBaAtuQdMrIFgheY3oGeMbLDiABGvy00yA7OIVHc"
);

function OrderSummary() {
  const { total, subTotal, coupon, isCouponApplied, cart } = useCartStore();
  const savings = total - subTotal;

  const format_sub = subTotal.toFixed(2);
  const format_tot = total.toFixed(2);
  const format_sav = savings.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });
    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>

      <div className="p-5 space-y-4 border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
        <div className="space-y-2">
          <dl className="flex justify-between text-gray-600">
            <dt>Subtotal</dt>
            <dd className="font-medium text-gray-800">${format_sub}</dd>
          </dl>

          {savings > 0 && (
            <dl className="flex justify-between">
              <dt className="text-gray-600">Savings</dt>
              <dd className="font-medium text-red-500">-${format_sav}</dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex justify-between">
              <dt className="text-gray-600">Coupon ({coupon.code})</dt>
              <dd className="font-medium text-green-600">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}

          <dl className="flex justify-between pt-3 border-t border-gray-200">
            <dt className="font-semibold text-gray-700">Total</dt>
            <dd className="text-lg font-bold text-gray-900">${format_tot}</dd>
          </dl>
        </div>

        <motion.button
          className="w-full py-3 font-semibold text-white transition-all rounded-lg shadow-md bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handlePayment}
        >
          Proceed To Checkout
        </motion.button>

        <div className="text-center">
          <span className="text-sm text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-1 ml-2 text-sm font-medium text-emerald-600 hover:text-emerald-500"
          >
            Continue Shopping <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderSummary;
