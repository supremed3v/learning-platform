import { Course } from "../models/course.js";
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

export const addLecture = async (req, res) => {
  const { title, description } = req.body;

  const course = await Course.findById(req.params.id);

  const file = req.file;

  const data = parseData(file);

  if (!data) {
    return res.status(400).json({
      error: "Please upload a valid video",
    });
  }

  try {
    if (!title || !description) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const result = await cloudinary.v2.uploader.upload(data.content, {
      resource_type: "video",
      folder: "courses",
      allowed_formats: ["mp4", "mov", "avi", "wmv"],
    });

    course.lectures.push({
      title,
      description,
      video: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    course.numOfVideos = course.lectures.length;

    await course.save();

    res.status(201).json({
      success: true,
      message: "Lecture added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name") // populate instructor field with name field from User model
      .select("-lectures");

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteLecture = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(400).json({
        error: "Course not found",
      });
    }

    const lecture = course.lectures.id(req.params.lectureId);

    if (!lecture) {
      return res.status(400).json({
        error: "Lecture not found",
      });
    }

    const result = await cloudinary.v2.uploader.destroy(
      lecture.video.public_id
    );

    if (result.result === "ok") {
      lecture.remove();

      course.numOfVideos = course.lectures.length;

      await course.save();

      res.status(200).json({
        success: true,
        message: "Lecture deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updateLecture = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(400).json({
        error: "Course not found",
      });
    }

    const lecture = course.lectures.id(req.params.lectureId);

    if (!lecture) {
      return res.status(400).json({
        error: "Lecture not found",
      });
    }

    const { title, description } = req.body;

    if (title) {
      lecture.title = title;
    } else if (description) {
      lecture.description = description;
    } else if (req.file) {
      const file = req.file;

      const data = parseData(file);

      if (!data) {
        return res.status(400).json({
          error: "Please upload a valid video",
        });
      }

      const result = await cloudinary.v2.uploader.upload(data.content, {
        resource_type: "video",
        folder: "courses",
        allowed_formats: ["mp4", "mov", "avi", "wmv"],
      });

      lecture.video = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
