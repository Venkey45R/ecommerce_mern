import React from "react";
import { Plus, Minus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="flex flex-col w-full overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-md md:flex-row rounded-2xl hover:shadow-xl">
      {/* Image */}
      <div className="flex items-center justify-center w-full p-4 md:w-1/3 bg-gray-50">
        <img
          src={item.image}
          alt={item.name}
          className="object-contain w-40 h-40 transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600">
            {item.descrption || "No description available."}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              className="p-1.5 bg-gray-100 border rounded-md hover:bg-gray-200"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="text-gray-700" size={16} />
            </button>
            <span className="px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-md">
              {item.quantity}
            </span>
            <button
              className="p-1.5 bg-gray-100 border rounded-md hover:bg-gray-200"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="text-gray-700" size={16} />
            </button>
          </div>

          {/* Price */}
          <p className="text-lg font-semibold text-emerald-600">
            ${item.price}
          </p>

          {/* Remove */}
          <button
            className="p-2 text-red-500 transition-colors rounded-md hover:text-red-600 hover:bg-red-50"
            onClick={() => removeFromCart(item._id)}
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
