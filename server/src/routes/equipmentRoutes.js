import express from "express";
import {
  getAllEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipmentController.js";

const router = express.Router();

router.get("/", getAllEquipment);
router.post("/", createEquipment);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);

export default router;
