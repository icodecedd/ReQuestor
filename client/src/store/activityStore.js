import axios from "axios";
import { create } from "zustand";

export const useActivityStore = create((set, get) => ({
  logs: [],
  loading: false,
  error: null,

  fetchLogs: async () => {
    console.log("Fetching logs...");
    try {
      const res = await axios.get("/api/activities");
      set({ logs: res.data.data, loading: false });
    } catch (error) {
      console.error("Error fetching logs:", error);
      set({ error: error.message, loading: false });
    }
  },
}));
