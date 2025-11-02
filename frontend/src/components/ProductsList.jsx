import React from "react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import { Star, Trash } from "lucide-react";

function ProductsList() {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div
      className="max-w-4xl mx-auto overflow-hidden bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-gray-700 ">
        <thead className="bg-grau-700">
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
          >
            Product
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
          >
            Price
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
          >
            Category
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
          >
            Featured
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
          >
            Actions
          </th>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 size-10">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover rounded-full size-10"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  $ {product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  $ {product.category}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-600 text-gray-300"
                  } hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className="size-5" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured
                      ? "bg-red-400 text-gray-900"
                      : "bg-gray-600 text-gray-300"
                  } hover:bg-red-500 transition-colors duration-200`}
                >
                  <Trash className="size-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export default ProductsList;
