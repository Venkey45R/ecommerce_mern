// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useCartStore } from "../stores/useCartStore";

// function GiftCouponCart() {
//   const [code, setCode] = useState("");
//   const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } =
//     useCartStore();

//   useEffect(() => {
//     getMyCoupon();
//   }, [getMyCoupon]);

//   useEffect(() => {
//     if (coupon) {
//       setCode(coupon.code);
//     }
//   }, [coupon]);
//   const handleApplyCoupon = () => {
//     if (!code) {
//       return;
//     }
//     applyCoupon(code);
//   };
//   const handleRemoveCoupon = async () => {
//     await removeCoupon();
//     setCode("");
//   };
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="p-4 space-y-4 bg-white border border-gray-700 rounded-lg shadow-sm sm:p-6"
//     >
//       <div className="space-y-4">
//         <div>
//           <label
//             htmlFor="voucher"
//             className="block mb-2 text-sm font-medium text-gray-700"
//           >
//             Enter your Gift Card:{" "}
//           </label>
//           <input
//             type="text"
//             id="voucher"
//             className="block w-full rounded-lg border border-gray-600 bg-white p-2.5 text=sm text-gray-700 placeholder:text-gray-300"
//             placeholder="Enter code:"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             required
//           />
//         </div>
//         <motion.button
//           type="button"
//           className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ hover: 0.95 }}
//           onClick={handleApplyCoupon}
//         >
//           Apply Coupon
//         </motion.button>
//       </div>
//       {isCouponApplied && coupon && (
//         <div className="mt-4">
//           <h3 className="text-lg font-medium text-gray-300">Applied Coupon</h3>
//           <p className="mt-2 text-sm text-gray-400">
//             {coupon.code} - {coupon.discountPercentage} % off
//           </p>
//           <motion.button
//             type="button"
//             className="flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ hover: 0.95 }}
//             onClick={handleRemoveCoupon}
//           >
//             Remove Coupon
//           </motion.button>
//         </div>
//       )}
//       {coupon && (
//         <div className="flex gap-2 mt-4 justofy-between">
//           <h3 className="text-lg font-medium text-gray-600">
//             Available Coupon:
//           </h3>
//           <p className="mt-1 text-sm font-bold text-red-600 ">
//             {coupon.code} - {coupon.discountPercentage} % off
//           </p>
//         </div>
//       )}
//     </motion.div>
//   );
// }

// export default GiftCouponCart;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";

function GiftCouponCart() {
  const [code, setCode] = useState("");
  const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } =
    useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (!code) return;
    applyCoupon(code);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCode("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-5 space-y-4 border border-gray-200 shadow-sm bg-gray-50 rounded-xl"
    >
      <div>
        <label
          htmlFor="voucher"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Apply Gift Coupon
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="voucher"
            className="flex-1 rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <motion.button
            type="button"
            className="px-4 py-2.5 text-sm font-medium text-white rounded-lg bg-emerald-600 hover:bg-emerald-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleApplyCoupon}
          >
            Apply
          </motion.button>
        </div>
      </div>

      {isCouponApplied && coupon && (
        <div className="p-3 text-sm border border-green-200 rounded-lg bg-green-50">
          <p className="font-semibold text-green-700">
            Coupon "{coupon.code}" applied – {coupon.discountPercentage}% off
          </p>
          <motion.button
            type="button"
            className="w-full px-5 py-2 mt-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}

      {coupon && !isCouponApplied && (
        <div className="flex items-center justify-between p-3 text-sm border border-yellow-200 rounded-lg bg-yellow-50">
          <span className="font-medium text-gray-700">Available Coupon:</span>
          <span className="font-bold text-emerald-600">
            {coupon.code} ({coupon.discountPercentage}%)
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default GiftCouponCart;
