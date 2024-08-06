import Withdrawal from "../models/Withdrawal.js";
import User from "../models/User.js";
import Class from "../models/Class.js";

export const createWithdrawal = async (req, res) => {
  const { class: classId, reason } = req.body;
  const student = req.user._id;

  try {
    const studentExists = await User.findById(student);
    if (!studentExists) {
      return res.status(404).json({ error: "Student not found" });
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ error: "Class not found" });
    }

    const newWithdrawal = new Withdrawal({
      student,
      class: classId,
      reason,
    });

    await newWithdrawal.save();
    res.status(201).json(newWithdrawal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
      .populate("student", "name email")
      .populate("class", "title");
    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWithdrawalsByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const withdrawals = await Withdrawal.find({ student: studentId })
      .populate("student", "name email")
      .populate("class", "title");
    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateWithdrawalStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const withdrawal = await Withdrawal.findById(id);
    if (!withdrawal) {
      return res.status(404).json({ error: "Withdrawal request not found" });
    }

    withdrawal.status = status;
    await withdrawal.save();
    res.status(200).json(withdrawal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWithdrawal = async (req, res) => {
  const { id } = req.params;

  try {
    const withdrawal = await Withdrawal.findById(id);
    if (!withdrawal) {
      return res.status(404).json({ error: "Withdrawal request not found" });
    }

    await Withdrawal.deleteOne({ _id: id });
    res
      .status(200)
      .json({ message: "Withdrawal request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
