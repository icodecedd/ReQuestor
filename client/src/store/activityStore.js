import api from "@/api/index"; // Adjust the import path as necessary
import { create } from "zustand";

export const useActivityStore = create((set, get) => ({
  logs: [],
  loading: false,
  error: null,

  fetchLogs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/activities");
      set({ logs: res.data.data, loading: false });
      console.log("Fetched activity logs:", res.data.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
      set({ error: error.message, loading: false });
    }
  },
}));
