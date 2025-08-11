import express from "express";
import {
  addRequest,
  approveRequest,
  cancelRequest,
  checkAvailability,
  getAllRequests,
  getRecentRequests,
  markCompleteRequest,
  rejectRequest,
} from "../controllers/requestsController.js";

const router = express.Router();

router.get("/", getAllRequests);
router.get("/recent", getRecentRequests);
router.post("/check-availability", checkAvailability);
router.post("/", addRequest);
router.patch("/:id/approve", approveRequest);
router.patch("/:id/reject", rejectRequest);
router.patch("/:id/complete", markCompleteRequest);
router.patch("/:id/cancel", cancelRequest);

export default router;
