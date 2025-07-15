import express from "express";
import {
  getAllRequests,
  getRecentRequests,
} from "../controllers/requestsController.js";

const router = express.Router();

router.get("/", getAllRequests);
router.get("/recent", getRecentRequests)

export default router