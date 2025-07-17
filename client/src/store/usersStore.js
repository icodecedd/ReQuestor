import { create } from "zustand";
import axios from "axios";

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

  addUser: async (userData) => {
    if (
      !userData.username ||
      !userData.email ||
      !userData.password_hash ||
      !userData.role
    ) {
      return {
        success: false,
        message: "Username, email, and password, role are required",
      };
    }
    try {
      const res = await axios.post("/api/users", userData);
      set((state) => ({
        users: [...state.users, res.data.data], // Append new user
      }));
      return {
        success: true,
        message: "Account added successfully.",
      };
    } catch (error) {
      console.error("Add user error:", error);
    }
  },
}));

export default useUserStore;
