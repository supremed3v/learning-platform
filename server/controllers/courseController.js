import { Course } from "../models/course.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import parseData from "../utils/dataParser.js";

export const createCourse = async (req, res) => {
  const { title, description, category } = req.body;

  const instructor = req.user._id;

  try {
    if (!title || !description || !category || !instructor) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    const file = req.file;
    const data = parseData(file);

    if (!data) {
      return res.status(400).json({
        error: "Please upload a valid image",
      });
    }

    const result = await cloudinary.v2.uploader.upload(data.content, {
      folder: "courses",
      width: 150,
      crop: "scale",
    });

    await Course.create({
      title,
      description,
      category,
      instructor,
      poster: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
