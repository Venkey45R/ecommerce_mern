import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { use } from "react";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      set({ loading: false });
      return;
    }
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user, loading: false });
      toast.success("Signup successful");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Signup failed");
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });
      toast.success("Login successful");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Login failed");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile", { withCredentials: true });
      set({ user: res.data.user, checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      toast.success("Logged out successfully");
      set({ user: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;
    set({ checkingAuth: true });
    try {
      const res = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return res.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

let refresh_promise = null;

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (refresh_promise) {
          await refresh_promise;
          return axios(originalRequest);
        }
      } catch (error) {
        useUserStore.getState().logout();
        return Promise.reject(RefreshError);
      }
    }
    return Promise.reject(error);
  }
);
