import { create } from "zustand";
import api from "@/api/index";
import { toTitleCase } from "@/utils/toTitleCase";
import { useRecentActivitiesStore } from "./recentStore";

export const useEquipmentStore = create((set, get) => ({
  equipment: [],
  loading: false,
  error: null,
  userId: null,
  setUserId: (userId) => set({ userId }),

  fetchEquipment: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/equipment");
      set({ equipment: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  stats: () => {
    const eq = get().equipment; // Your array of equipment objects

    const totalEquipment = eq.length;
    const totalAvailable = eq.filter((e) => e.status === "Available").length;
    const totalUnavailable = eq.filter(
      (e) => e.status === "Unavailable"
    ).length;

    const utilizationPercentage = totalEquipment
      ? ((totalUnavailable / totalEquipment) * 100).toFixed(1)
      : 0;

    return {
      totalEquipment,
      totalAvailable,
      totalUnavailable,
      utilizationPercentage, // This now represents % unavailable
    };
  },

  addEquipment: async (newEquipment) => {
    const name = newEquipment.name?.trim() || "";
    const type = newEquipment.type?.trim() || "";
    const status = toTitleCase(newEquipment.status);
    const location = toTitleCase(newEquipment.location?.trim()) || "";
    const serial_number = newEquipment.serial_number?.trim() || "";
    const condition = toTitleCase(newEquipment.condition);
    const description = newEquipment.description?.trim() || "";

    if (!name || !type || !location || !condition || !serial_number) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    try {
      const payload = {
        name,
        type,
        status,
        location,
        serial_number,
        condition,
        description,
        user_id: get().userId,
      };

      const res = await api.post("/equipment", payload);
      set((state) => ({
        equipment: [res.data.data, ...state.equipment], // prepend new equipment
      }));
      useRecentActivitiesStore.getState().addActivityLog(res.data.activity);
      return {
        success: true,
        message: "New equipment added successfully.",
      };
    } catch (error) {
      console.error(
        "Add equipment error:",
        error.response?.data || error.message
      );

      const err = error.response?.data;
      if (err.errorCode === "SERIAL_DUPLICATE") {
        return {
          success: false,
          message: err.message,
        };
      } else {
        return {
          success: false,
          message: "Failed to add equipment. Please try again.",
        };
      }
    }
  },

  updateEquipment: async (id, updatedEquipment) => {
    const name = updatedEquipment.name?.trim() || "";
    const type = updatedEquipment.type?.trim() || "";
    const status = toTitleCase(updatedEquipment.status);
    const location = toTitleCase(updatedEquipment.location?.trim()) || "";
    const serial_number = updatedEquipment.serial_number?.trim() || "";
    const condition = toTitleCase(updatedEquipment.condition);
    const description = updatedEquipment.description?.trim() || "";

    if (!name || !type || !location || !condition || !serial_number) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    try {
      const updatedPayload = {
        name,
        type,
        status,
        location,
        serial_number,
        condition,
        description,
        user_id: get().userId,
      };

      const res = await api.put(`/equipment/${id}`, updatedPayload);
      set((state) => ({
        equipment: state.equipment.map((eq) =>
          eq.id === id ? res.data.data : eq
        ),
      }));
      return {
        success: true,
        message: "Equipment updated successfully.",
      };
    } catch (error) {
      console.error(
        "Update equipment error:",
        error.response?.data || error.message
      );

      const err = error.response?.data;
      if (err.errorCode === "SERIAL_DUPLICATE") {
        return {
          success: false,
          message: err.message,
        };
      } else {
        return {
          success: false,
          message: "Failed to update equipment. Please try again.",
        };
      }
    }
  },

  deleteEquipment: async (id) => {
    try {
      await api.delete(`/equipment/${id}`, {
        data: { user_id: get().userId },
      });

      set((state) => ({
        equipment: state.equipment.filter((eq) => eq.id !== id),
      }));

      return {
        success: true,
        message: "Equipment deleted successfully.",
      };
    } catch (error) {
      console.error(
        "Delete equipment error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to delete equipment. Please try again.",
      };
    }
  },
}));
