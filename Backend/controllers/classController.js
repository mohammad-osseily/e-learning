import Class from "../models/Class.js";
import User from "../models/User.js";

export const createClass = async (req, res) => {
  const { title, description, instructor } = req.body;

  try {
    const instructorExists = await User.findById(instructor);
    if (!instructorExists) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    const newClass = new Class({
      title,
      description,
      instructor,
    });

    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("instructor", "name email");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClassesByInstructor = async (req, res) => {
  try {
    const classes = await Class.find({ instructor: req.user._id }).populate(
      "instructor",
      "name email"
    );
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClassById = async (req, res) => {
  const { id } = req.params;

  try {
    const classItem = await Class.findById(id).populate(
      "instructor",
      "name email"
    );
    if (!classItem) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.status(200).json(classItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { title, description, instructor } = req.body;

  try {
    const classItem = await Class.findById(id);
    if (!classItem) {
      return res.status(404).json({ error: "Class not found" });
    }

    if (instructor) {
      const instructorExists = await User.findById(instructor);
      if (!instructorExists) {
        return res.status(404).json({ error: "Instructor not found" });
      }
      classItem.instructor = instructor;
    }

    if (title) classItem.title = title;
    if (description) classItem.description = description;

    await classItem.save();
    res.status(200).json(classItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const classItem = await Class.findById(id);
    if (!classItem) {
      return res.status(404).json({ error: "Class not found" });
    }

    if (classItem.instructor.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this class" });
    }

    await Class.deleteOne({ _id: id });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
