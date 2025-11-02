import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

function FeaturedProducts({ featuredProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(4);
  useEffect(() => {
    console.log("Effect mounted");

    const handleResize = () => {
      console.log("Width changed:", window.innerWidth, itemPerPage);
      if (window.innerWidth < 640) setItemPerPage(1);
      else if (window.innerWidth < 1024) setItemPerPage(2);
      else if (window.innerWidth < 1280) setItemPerPage(3);
      else setItemPerPage(4);
    };

    handleResize(); // initial run
    window.addEventListener("resize", handleResize);
    return () => {
      console.log("Effect unmounted");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { addToCart } = useCartStore();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemPerPage;
  return (
    <div className="py-12">
      <div className="container px-4 mx-auto">
        <h2 className="mb-4 text-5xl font-bold text-center text-white sm:text-6xl">
          Featured
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out "
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemPerPage)
                }%)`,
              }}
            >
              {featuredProducts?.map((product) => (
                <div
                  key={product._id}
                  className="flex-shrink-0 w-full px-2 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                >
                  <div className="h-full overflow-hidden transition-all duration-300 bg-white/10">
                    <div className="overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-coevr"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-semibold text-white">
                        {product.name}
                      </h3>
                      <p className="mb-4 font-medium text-emerald-300">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center w-full px-4 py-2 text-white bg-emerald-500 text-semibold"
                      >
                        <ShoppingCart size={5} className="mr-2" /> Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
