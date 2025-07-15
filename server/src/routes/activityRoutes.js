import express from "express";
import {
  getAllActivities,
  getRecentActivities,
} from "../controllers/activityController.js";

const router = express.Router();

router.get("/", getAllActivities);
router.get("/recent", getRecentActivities);

export default router;
