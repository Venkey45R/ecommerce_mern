import React from "react";
import { Link } from "react-router-dom";
import Hero from "../images/hero.jpg";

const HeroSection = () => {
  return (
    <div className="w-full min-h-screen p-2 lg:p-8 bg-gradient-to-b from-indigo-100 via-indigo-200 to-indigo-300">
      <div className="px-8 lg:px-16 lg:flex lg:justify-between">
        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-4/5">
          <div>
            <h1 className="text-4xl font-extrabold leading-snug tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Redefine Your <span className="text-indigo-700">Style</span>.
              <br />
              Elevate Your <span className="text-indigo-700">Confidence</span>.
            </h1>
            <p className="max-w-2xl my-6 text-lg leading-relaxed text-gray-700 md:my-6 lg:my-8">
              Discover premium collections made for confident individuals. From
              timeless classics to bold trends — shop the looks that define you.
            </p>
            <div className="block my-6 lg:my-0 lg:flex">
              <Link
                to="/products"
                className="px-8 py-3 font-semibold text-white transition-transform duration-200 bg-indigo-600 rounded-full shadow-xl hover:scale-105 hover:bg-indigo-700"
              >
                Shop the Collection →
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full px-4 lg:w-1/5 lg:px-0">
          <img
            src={Hero}
            alt="Hero"
            className="object-contain w-[600px] md:w-[450px] rounded-3xl my-6 lg:my-20 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
