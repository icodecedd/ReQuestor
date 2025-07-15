import express from "express";
import { getDashbordStatistics } from "../controllers/statsController.js";

const router = express.Router();

router.get("/", getDashbordStatistics);

export default router;
