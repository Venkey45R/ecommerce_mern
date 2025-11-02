// FeaturedProductSlide.jsx
import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function FeaturedProductSlide({ featuredProducts = [] }) {
  const { addToCart } = useCartStore();

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 3, spacing: 16 },
    loop: true,
    breakpoints: {
      "(max-width: 640px)": { slides: { perView: 1 } },
      "(min-width: 641px) and (max-width: 1024px)": { slides: { perView: 2 } },
      "(min-width: 1025px)": { slides: { perView: 3 } },
    },
  });

  return (
    <div className="py-12">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-4xl font-bold text-center text-emerald-400">
          Featured Products
        </h2>

        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {featuredProducts.map((product, idx) => (
              <div key={product._id || idx} className="keen-slider__slide">
                <div className="flex flex-col items-center justify-between p-4 bg-white shadow-md rounded-2xl hover:shadow-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-48 rounded-xl"
                  />
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-gray-500">₹{product.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-2 px-4 py-2 mt-3 text-white rounded-lg bg-emerald-500 hover:bg-emerald-600"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-0 p-2 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-0 p-2 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2"
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProductSlide;
