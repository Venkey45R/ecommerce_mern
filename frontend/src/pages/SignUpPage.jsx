import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="flex flex-col justify-center px-4 py-6 sm:px-6 lg:px-8">
      {/* Title */}
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-3 text-3xl font-bold text-center text-indigo-600">
          Create Your Account
        </h2>
      </motion.div>

      {/* Form Container */}
      <motion.div
        className="mt-0 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="px-6 py-8 border border-indigo-100 shadow-xl bg-white/70 backdrop-blur-lg rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              id="name"
              label="Full Name"
              icon={<User className="text-gray-400 size-5" />}
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="John Doe"
            />

            <FormField
              id="email"
              label="Email"
              icon={<Mail className="text-gray-400 size-5" />}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@example.com"
            />

            <FormField
              id="password"
              label="Password"
              icon={<Lock className="text-gray-400 size-5" />}
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="••••••••"
            />

            <FormField
              id="confirmPassword"
              label="Confirm Password"
              icon={<Lock className="text-gray-400 size-5" />}
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="••••••••"
            />

            <button
              type="submit"
              className="w-full py-3 font-semibold text-white transition duration-300 bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Signing up...
                </div>
              ) : (
                "Sign up"
              )}
            </button>
            <h4 className="font-semibold text-center text-md">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-indigo-600">
                Login
              </Link>
            </h4>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;

// ✅ Reusable Input Component
const FormField = ({ id, label, icon, type, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative mt-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-200 rounded-md shadow-sm bg-white/50 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  </div>
);
