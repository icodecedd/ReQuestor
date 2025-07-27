import { create } from "zustand";
import axios from "axios";

export const useRequestsStore = create((set, get) => ({
  requests: [],
  loading: false,
  error: null,

  fetchRequests: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get("/api/requests");
      set({ requests: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  stats: () => {
    const req = get().requests;

    const totalRequests = req.length;
    const totalPending = req.filter((e) => e.status === "Pending").length;
    const totalApproved = req.filter((e) => e.status === "Approved").length;
    const totalRejected = req.filter((e) => e.status === "Rejected").length;

    return {
      totalRequests,
      totalPending,
      totalApproved,
      totalRejected,
    };
  },
}));
