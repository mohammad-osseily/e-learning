import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";
import Class from "../models/Class.js";

export const createEnrollment = async (req, res) => {
  const { student, class: classId } = req.body;

  try {
    const studentExists = await User.findById(student);
    if (!studentExists) {
      return res.status(404).json({ error: "Student not found" });
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ error: "Class not found" });
    }

    const newEnrollment = new Enrollment({
      student,
      class: classId,
    });

    await newEnrollment.save();
    res.status(201).json(newEnrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "name email")
      .populate("class", "title");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrollmentsByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const enrollments = await Enrollment.find({ student: studentId })
      .populate("student", "name email")
      .populate("class", "title");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  const { id } = req.params;

  try {
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    await Enrollment.deleteOne({ _id: id });
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
