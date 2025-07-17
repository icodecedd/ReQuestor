import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("http://localhost:5001/api/users");
      set({ users: res.data.data, loading: false });
    } catch (error) {
      console.error("Fetch users error:", error);
      set({ loading: false });
    }
  },

  addUser: async (userData) => {
    try {
      const res = await axios.post("http://localhost:5001/api/users", userData);
      set((state) => ({
        users: [...state.users, res.data.data], // Append new user
      }));
    } catch (error) {
      console.error("Add user error:", error);
    }
  },
}));

export default useUserStore;
