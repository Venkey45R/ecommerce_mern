import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

function CreateProductForm() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.log("error creating product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="max-w-2xl w-full mx-auto mt-16 p-10 bg-blue-900/40 text-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="mb-8 text-3xl font-extrabold text-center text-white">
        Create <span className="text-white">New Product</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-semibold text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Enter product name"
            className="block w-full px-4 py-2 text-indigo-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-semibold text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Enter product description"
            className="block w-full px-4 py-2 text-indigo-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-semibold text-white"
          >
            Price (₹)
          </label>
          <input
            type="number"
            id="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Enter price"
            className="block w-full px-4 py-2 text-indigo-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-semibold text-white"
          >
            Category
          </label>
          <select
            id="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="block w-full px-4 py-2 text-indigo-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="sr-only"
            accept="image/*"
          />
          <label
            htmlFor="image"
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <Upload className="inline-block mr-2 size-5" />
            Upload Product Image
          </label>
          {newProduct.image && (
            <p className="mt-2 text-sm font-medium text-center text-green-600">
              ✅ Image Uploaded
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 mt-4 font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </motion.div>
  );
}

export default CreateProductForm;
