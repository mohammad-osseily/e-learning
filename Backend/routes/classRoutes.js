import express from "express";
import {
  createClass,
  getClasses,
  getClassById,
  getClassesByInstructor,
  updateClass,
  deleteClass,
} from "../controllers/classController.js";
import { protect, adminProtect } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/", protect, adminProtect, createClass);

router.get("/", protect, getClasses);

router.get("/instructor/classes", protect, getClassesByInstructor);

router.get("/:id", protect, getClassById);

router.patch("/:id", protect, adminProtect, updateClass);

router.delete("/:id", protect, adminProtect, deleteClass);

export default router;
