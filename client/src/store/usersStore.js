import { create } from "zustand";
import axios from "axios";
import { toTitleCase } from "@/utils/toTitleCase";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/users");
      set({ users: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addUser: async (newUser) => {
    const username = newUser.username?.trim() || "";
    const email = newUser.email?.trim() || "";
    const role = toTitleCase(newUser.role?.trim() || "");
    const password = newUser.password || "";
    const confirmPassword = newUser.confirmPassword || "";
    const status = toTitleCase(newUser.status || "");

    if (!username || !email || !password || !confirmPassword || !role) {
      return {
        success: false,
        message:
          "Username, email, and password, confirm password, role are required.",
      };
    }

    try {
      const res = await axios.get("/api/users/check-username", {
        params: { username },
      });

      if (!res.data.available) {
        return {
          success: false,
          message: "Username already exist.",
        };
      }
    } catch (error) {
      return { success: false, message: "Error checking username." };
    }

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
      };
    }

    try {
      const payload = {
        username,
        email,
        password_hash: password,
        role,
        status,
      };

      const res = await axios.post("/api/users", payload);
      set((state) => ({
        users: [...state.users, res.data.data], // Append new user
      }));
      return {
        success: true,
        message: "New account added successfully.",
      };
    } catch (error) {
      console.error("Add user error:", error.response?.data || error.message);
      return {
        success: false,
        message: "Failed to add user. Please try again.",
      };
    }
  },
}));

export default useUserStore;
