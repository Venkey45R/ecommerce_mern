import React, { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import HeroSection from "../components/HeroSection";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import FeaturedProductSlide from "../components/FeaturedProductSlide";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <HeroSection />

      {/* Category Section */}
      <section className="relative w-full px-6 mb-20 mt-28 max-w-7xl sm:px-8">
        <h2 className="mb-12 text-3xl font-extrabold text-center text-indigo-900 md:text-4xl">
          Shop by <span className="text-indigo-600">Category</span>
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {categories.map((category, index) => (
            <CategoryItem key={index} category={category} />
          ))}
        </div>
        {!isLoading && products.length > 0 && (
          <FeaturedProductSlide featuredProducts={products} />
        )}
      </section>
    </div>
  );
};

export default HomePage;
