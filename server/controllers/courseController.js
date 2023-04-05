import { Course } from "../models/course.js";
import { User } from "../models/user.js";
import cloudinary from "cloudinary";
import parseData from "../utils/dataParser.js";

export const createCourse = async (req, res) => {
  const { title, description, category, amount } = req.body;

  const instructor = req.user._id;

  try {
    if (!title || !description || !category || !instructor || !amount) {
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

    const course = await Course.create({
      title,
      description,
      category,
      instructor,
      poster: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      amount,
    });

    const user = await User.findById(instructor);

    user.paid_courses.push({
      course: course._id,
      amount: course.amount,
    })

    await user.save();

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

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name");

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

    if (result) {
      course.lectures.pull(lecture._id);

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

export const buyCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if (user.playList.includes(course._id)) {
      return res.status(400).json({
        error: "Course already purchased",
      });
    }

    user.playList.push({
      course: course._id,
      poster: course.poster.url,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Course purchased successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const removeCourse = async (req, res) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.params.id);

  if (!user.playList.includes(course._id)) {
    return res.status(400).json({
      error: "Course not found",
    });
  }

  user.playList.pull(course._id);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Course removed successfully",
  });
};

export const userCourse = async (req, res) => {
  try {
    const courses = await User.findById(req.user._id).populate(
      "playList.course",
      "title numOfVideos"
    );

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

export const addToPlaylist = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { courseId } = req.body;

  if (user.playList.includes(courseId)) {
    return res.status(400).json({
      error: "Course already purchased",
    });
  } else {
    user.playList.push({
      course: courseId,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "Course purchased successfully",
    });
  }
};

export const getSingleCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id)
      .populate("instructor", "name email")
      .select("-lectures"); // slice the first lecture only to show in the course card on the home page

    if (!course) {
      return res.status(400).json({
        error: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

export const getInstructorCourses = async (req, res) => {
  const instructor = await User.findById(req.user._id);

  try {
    const courses = await Course.find({ instructor: instructor._id })

    res.status(200).json({
      success: true,
      courses,
    });

    if(!courses){
      return res.status(400).json({
        error: "No courses found",
      });
    }

  } catch(error){
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }

}