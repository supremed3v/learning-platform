import express from "express";
import singleFile from "../middlewares/singleFile.js";
import { authCheck, adminCheck } from "../middlewares/auth.js";
import {
  addLecture,
  buyCourse,
  createCourse,
  deleteLecture,
  getAllCourses,
  getCourses,
  updateLecture,
} from "../controllers/courseController.js";

const router = express.Router();

// Tested and working

router
  .route("/course")
  .post(authCheck, singleFile, createCourse)
  .get(getCourses);

router.route("/courses").get(authCheck, adminCheck("admin"), getAllCourses);

router
  .route("/course/:id/lecture")
  .put(authCheck, adminCheck("admin", "instructor"), singleFile, addLecture);
router
  .route("/course/:id/lecture/:lectureId")
  .delete(
    authCheck,
    adminCheck("admin", "instructor"),
    singleFile,
    deleteLecture
  )
  .put(authCheck, adminCheck("admin", "instructor"), singleFile, updateLecture);

// Yet to be tested

router.route("/course/buy/:id").post(authCheck, adminCheck("user"), buyCourse);

export default router;
