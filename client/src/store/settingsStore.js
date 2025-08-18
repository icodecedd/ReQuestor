import { create } from "zustand";
import axios from "axios";
import _ from "lodash";

export const useSettingsStore = create((set, get) => ({
  settings: [],
  compareSettings: [],
  loading: false,
  error: null,
  userId: null,
  setUserId: (id) => set({ userId: id }),
  fetchSettings: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/settings");
      const { id, updated_at, ...settings } = res.data.data;
      set({
        settings: res.data.data,
        compareSettings: settings,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  updateSettings: async (updatedSettings) => {
    // 1. Deep comparison (safer than JSON.stringify)
    const areSettingsEqual = _.isEqual(updatedSettings, get().compareSettings);
    if (areSettingsEqual) {
      return {
        success: true,
        message: "No changes detected. Settings are already up to date.",
        type: "info",
      };
    }

    try {
      // 2. Prepare payload (immutable update)
      const updatedPayload = {
        ...updatedSettings,
        user_id: get().userId,
      };

      // 3. API call
      const res = await axios.put("/api/settings/update", updatedPayload);

      // 4. Update Zustand state (atomic update)
      set({
        settings: res.data.data, // Sync with backend response
        compareSettings: res.data.data, // Store last applied settings
        loading: false,
      });

      return {
        success: true,
        message: "Settings updated successfully.",
      };
    } catch (error) {
      // 5. Graceful error handling
      const errorMessage = error.response?.data?.message || error.message;
      set({
        error: errorMessage,
        loading: false,
      });

      return {
        success: false,
        message: errorMessage || "Failed to update settings. Please try again.",
      };
    }
  },
}));
