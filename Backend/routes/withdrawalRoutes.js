import express from "express";
import {
  createWithdrawal,
  getWithdrawals,
  getWithdrawalsByStudent,
  updateWithdrawalStatus,
  deleteWithdrawal,
} from "../controllers/withdrawalController.js";
import { protect, adminProtect } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/", protect, createWithdrawal);

router.get("/", protect, adminProtect, getWithdrawals);

router.get("/student/:studentId", protect, getWithdrawalsByStudent);

router.patch("/:id", protect, adminProtect, updateWithdrawalStatus);

router.delete("/:id", protect, adminProtect, deleteWithdrawal);

export default router;
