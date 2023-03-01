import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "instructor"],
    default: "user",
  },
  subscription: {
    id: {
      type: String,
      default: "free",
    },
    status: {
      type: String,
      default: "active",
    },
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  playList: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

export const User = mongoose.model("User", schema);
