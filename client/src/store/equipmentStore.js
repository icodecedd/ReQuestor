import { create } from "zustand";
import axios from "axios";

export const useEquipmentStore = create((set, get) => ({
  equipment: [],
  loading: false,
  error: null,

  fetchEquipment: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get("/api/equipment");
      set({ equipment: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  stats: () => {
    const eq = get().equipment; // Your array of equipment objects

    const totalEquipment = eq.length;
    const totalAvailable = eq.filter((e) => e.status === "Available").length;
    const totalInUse = eq.filter((e) => e.status === "In Use").length;

    const utilizationPercentage = totalEquipment
      ? ((totalInUse / totalEquipment) * 100).toFixed(1)
      : 0;
    return {
      totalEquipment,
      totalAvailable,
      totalInUse,
      utilizationPercentage,
    };
  },
}));
