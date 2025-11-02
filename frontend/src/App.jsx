import HomePage from "./pages/HomePage";
import { Navigate, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import NavBarSample from "./components/NavBarSample";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseFailed from "./pages/PurchaseFailed";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user, getCartItems]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen font-sans text-indigo-900 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <NavBar />
      <div className="relative z-10 pt-14">
        <main className="pt-0 mx-auto ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signup"
              element={!user ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/admin-dashboard"
              element={
                user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />
              }
            />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/purchase-success"
              element={user ? <PurchaseSuccess /> : <Navigate to="/login" />}
            />
            <Route
              path="/purchase-cancel"
              element={user ? <PurchaseFailed /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
