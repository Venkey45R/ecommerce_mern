import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
  { id: "create", label: "Add New Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

function AdminPage() {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  const renderContent = () => {
    switch (activeTab) {
      case "create":
        return <CreateProductForm />;
      case "products":
        return <ProductsList />;
      case "analytics":
        return <AnalyticsTab />;
      default:
        return <CreateProductForm />;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-6 bg-indigo-600/95">
      <div className="w-full max-w-6xl py-6">
        <motion.h1
          className="mb-8 text-3xl font-extrabold text-center text-white md:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* --- Tab Navigation --- */}
        <div className="flex justify-center mb-8 border-b border-indigo-500/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-sm md:px-6 md:py-3 md:text-lg font-medium transition-colors duration-200 focus:outline-none ${
                activeTab === tab.id
                  ? "text-indigo-100 border-b-2 border-indigo-100"
                  : "text-indigo-100/80 hover:text-white border-b-2 border-transparent hover:border-indigo-200/40"
              }`}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- Tab Content --- */}
        <div className="">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
