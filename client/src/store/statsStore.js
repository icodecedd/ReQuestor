import { create } from "zustand";
import axios from "axios";

const initialStats = {
  totalRequests: 0,
  availableEquipment: 0,
  approvedRequests: 0,
  pendingApprovals: 0,
  barGraph: [],
  pieGraph: [],
};

export const useStatsStore = create((set, get) => ({
  stats: initialStats,
  loading: false,
  error: null,

  // Fetch from backend (initial load or full refresh)
  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/stats");
      if (res.data?.success) {
        const {
          totalRequests,
          availableEquipment,
          approvedRequests,
          pendingApprovals,
          barGraph,
          pieGraph,
        } = res.data;

        set({
          stats: {
            totalRequests,
            availableEquipment,
            approvedRequests,
            pendingApprovals,
            barGraph,
            pieGraph,
          },
          loading: false,
        });
      } else {
        set({ error: "Invalid response", loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
