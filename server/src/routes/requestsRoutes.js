import express from "express";
import {
  addRequest,
  cancelRequest,
  getAllRequests,
  getRecentRequests,
  updateRequestStatus,
} from "../controllers/requestsController.js";

const router = express.Router();

router.get("/", getAllRequests);
router.get("/recent", getRecentRequests);
router.post("/", addRequest);
router.patch("/:id/cancel", cancelRequest);
router.patch("/:id/set-status", updateRequestStatus)

export default router;
