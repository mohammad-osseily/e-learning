import User from "../models/User.js"; // Ensure the path is correct
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/authentication.js";
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, password, email, phone_number } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      phone_number,
    });
    await newUser.save();
    const token = generateToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      res.status(400).json({
        error: `${duplicateField} already exists. Please use a different ${duplicateField}.`,
      });
    } else if (err.name === "ValidationError") {
      let messages = Object.values(err.errors).map((val) => val.message);
      res.status(400).json({ error: messages.join(", ") });
    } else {
      res.status(500).json({ error: "Server error: " + err.message });
    }
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ success: "user login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
};
