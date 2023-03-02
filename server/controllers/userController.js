import User from "../models/user.js";
import cloudinary from "cloudinary";
import { sendJwt } from "../middlewares/sendJwt.js";
import parseData from "../utils/dataParser.js";

// @desc    Register a user

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.body;

  const data = parseData(file);

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const result = await cloudinary.v2.uploader.upload(data.content, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

    sendJwt(user, 200, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  next();
};

// @desc    Login user

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    const checkUser = await User.findOne({ email }).select("+password");

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await checkUser.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    sendJwt(checkUser, 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
