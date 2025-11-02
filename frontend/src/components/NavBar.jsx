import React, { useState } from "react";
import { Lock, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const NavBar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .desktop-nav {
          display: none;
        }
        .mobile-menu-btn {
          display: block;
        }
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }
          .mobile-menu-btn {
            display: none;
          }
        }
      `}</style>

      <header className="fixed top-0 left-0 z-50 w-full transition-all duration-300 border-b shadow-md border-indigo-300/30 backdrop-blur-md bg-indigo-800/90">
        <div className="container flex items-center justify-between px-4 py-3 mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-white"
          >
            STORA
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center gap-4 desktop-nav">
            {user && (
              <Link
                to="/cart"
                className="relative flex items-center px-3 py-1 text-sm font-medium text-indigo-900 bg-white rounded-md shadow-sm group hover:bg-indigo-100"
              >
                <ShoppingCart
                  className="mr-1 transition-colors duration-300"
                  size={20}
                />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 text-white -right-2 rounded-full bg-red-700 px-1.5 py-0.5 text-xs font-semibold">
                    {cart?.length || 0}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin-dashboard"
                className="flex items-center px-3 py-1 text-sm font-semibold text-indigo-900 bg-white rounded-md shadow-sm hover:bg-indigo-100"
              >
                <Lock className="mr-1" size={18} />
                Dashboard
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="px-3 py-1 text-sm font-semibold text-indigo-900 bg-white rounded-md shadow-sm hover:bg-indigo-100"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-indigo-900 bg-white rounded-md shadow-sm hover:bg-indigo-100"
                >
                  SignUp
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
                >
                  LogIn
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 text-white transition-colors rounded-md mobile-menu-btn hover:bg-indigo-700"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="border-t md:hidden border-indigo-300/30 bg-indigo-800/95 backdrop-blur-md">
            <nav className="container flex flex-col gap-3 px-4 py-4 mx-auto">
              {user && (
                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="relative flex items-center px-4 py-2 text-sm font-medium text-indigo-900 bg-white rounded-md shadow-sm hover:bg-indigo-100"
                >
                  <ShoppingCart className="mr-2" size={20} />
                  <span>Cart</span>
                  <span className="ml-auto rounded-full bg-red-700 px-2 py-0.5 text-xs font-semibold text-white">
                    {cart.length}
                  </span>
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/admin-dashboard"
                  onClick={closeMenu}
                  className="flex items-center px-4 py-2 text-sm font-semibold text-indigo-900 bg-white rounded-md shadow-sm hover:bg-indigo-100"
                >
                  <Lock className="mr-2" size={18} />
                  Dashboard
                </Link>
              )}

              {user ? (
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="px-4 py-2 text-sm font-semibold text-left text-indigo-900 bg-white rounded-md shadow-sm hover:bg-indigo-100"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="px-4 py-2 text-sm font-semibold text-center text-indigo-900 bg-white rounded-md shadow-sm hover:bg-indigo-100"
                  >
                    SignUp
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="px-4 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
                  >
                    LogIn
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default NavBar;
