import express from "express";
import { getStatistics } from "../controllers/statsController.js";

const router = express.Router();

router.get("/", getStatistics);

export default router;
