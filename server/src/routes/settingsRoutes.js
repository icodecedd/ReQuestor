import express from "express";
import {
  checkMaintenanceMode,
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", getSettings);
router.get("/maintenance", checkMaintenanceMode);
router.put("/update", updateSettings);

export default router;
