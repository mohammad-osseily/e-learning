import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Please provide a valid email",
      },
    },
    phone_number: {
      type: String,
      required: true,
      match: [
        /^(01|03|70|71|76|78|79|81)\d{6}$/,
        "Please enter a valid Lebanese phone number",
      ],
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
