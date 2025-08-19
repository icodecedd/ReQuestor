import { api } from "@/api/index"; // Adjust the import path as necessary
import { create } from "zustand";

export const useActivityStore = create((set, get) => ({
  logs: [],
  loading: false,
  error: null,

  fetchLogs: async () => {
    try {
      const res = await api.get("/api/activities");
      set({ logs: res.data.data, loading: false });
    } catch (error) {
      console.error("Error fetching logs:", error);
      set({ error: error.message, loading: false });
    }
  },
}));
