import React from "react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import { Star, Trash } from "lucide-react";

function ProductsList() {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] bg-gradient-to-br from-blue-950 via-indigo-900 to-indigo-950 text-white rounded-3xl">
        <motion.div
          className="mb-6 border-4 border-blue-500 rounded-full w-14 h-14 border-t-transparent animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
        <p className="text-lg font-medium text-blue-200">No products found.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-4 py-4 overflow-hidden text-white sm:px-8 rounded-3xl">
      {/* Glow Background Effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/30 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full -z-10"></div>

      {/* Header */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          Product Management
        </h1>
        <p className="text-sm font-medium text-blue-200">
          Manage, feature, and analyze your store products ✨
        </p>
      </motion.div>

      {/* Table Container */}
      <motion.div
        className="max-w-6xl mx-auto overflow-hidden border shadow-lg bg-blue-900/40 backdrop-blur-xl rounded-2xl border-blue-800/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <table className="min-w-full divide-y divide-blue-800">
          <thead className="bg-blue-900/60">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-blue-200 uppercase">
                Product
              </th>
              <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-blue-200 uppercase">
                Price
              </th>
              <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-blue-200 uppercase">
                Category
              </th>
              <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-blue-200 uppercase">
                Featured
              </th>
              <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-blue-200 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-800/40">
            {products.map((product, index) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="transition duration-200 hover:bg-blue-800/40"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover border size-12 rounded-xl border-blue-700/40"
                    />
                    <div>
                      <div className="text-base font-semibold text-white">
                        {product.name}
                      </div>
                      <div className="text-sm text-blue-200/80">
                        {product.description?.slice(0, 40) || ""}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-blue-100 whitespace-nowrap">
                  ₹{product.price.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-blue-100 whitespace-nowrap">
                  {product.category}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-2 rounded-full transition-colors duration-300 shadow-md ${
                      product.isFeatured
                        ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                        : "bg-blue-700 text-blue-100 hover:bg-yellow-400 hover:text-gray-900"
                    }`}
                  >
                    <Star className="size-5" />
                  </button>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="p-2 text-white transition duration-300 rounded-full shadow-md bg-red-500/70 hover:bg-red-500"
                  >
                    <Trash className="size-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export default ProductsList;
