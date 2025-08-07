import express from "express";
import {
  addRequest,
  cancelRequest,
  checkAvailability,
  getAllRequests,
  getRecentRequests,
  updateRequestStatus,
} from "../controllers/requestsController.js";

const router = express.Router();

router.get("/", getAllRequests);
router.get("/recent", getRecentRequests);
router.post("/check-availability", checkAvailability);
router.post("/", addRequest);
router.patch("/:id/cancel", cancelRequest);
router.patch("/:id/set-status", updateRequestStatus);

export default router;
