import express from "express";
import {
  createEnrollment,
  getEnrollments,
  getEnrollmentsByStudent,
  deleteEnrollment,
} from "../controllers/enrollmentController.js";
import { protect, adminProtect } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/", protect, createEnrollment);

// Get all enrollments
router.get("/", protect, adminProtect, getEnrollments);

// Get enrollments by student ID
router.get("/student/:studentId", protect, getEnrollmentsByStudent);

// Delete an enrollment
router.delete("/:id", protect, adminProtect, deleteEnrollment);

export default router;
