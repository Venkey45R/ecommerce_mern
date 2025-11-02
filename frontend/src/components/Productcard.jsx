import React from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

function Productcard({ product }) {
  const { user } = useUserStore();
  const { addToCart, fetchCart } = useCartStore();
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add product to cart", { id: "login" });
      return;
    }
    await addToCart(product); // backend call
    fetchCart(); // fetch updated cart from DB
    toast.success("Added to cart");
  };

  return (
    <div className="relative flex flex-col w-full overflow-hidden text-black transition-shadow duration-300 bg-gray-100 border border-gray-700 shadow-lg max-w-72 rounded-xl hover:shadow-2xl">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 px-6 py-4">
        <h5 className="text-lg font-semibold tracking-wide">{product.name}</h5>
        <p className="mt-2 text-sm text-gray-700">
          {product.description || ""}
        </p>

        <div className="flex items-center justify-between mt-4 mb-4">
          <span className="text-2xl font-bold text-emerald-400">
            ${product.price}
          </span>
          <span className="text-sm text-gray-700">In Stock</span>
        </div>

        {/* Add to Cart Button */}
        <button
          className="flex items-center justify-center w-full gap-2 py-2 font-medium text-white transition-colors duration-200 rounded-lg bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300"
          onClick={() => handleAddToCart()}
        >
          <ShoppingCart size={20} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Productcard;
