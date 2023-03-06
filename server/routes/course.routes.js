import express from "express";
import singleFile from "../middlewares/singleFile.js";
import { authCheck, adminCheck } from "../middlewares/auth.js";
import {
  addLecture,
  buyCourse,
  createCourse,
  deleteLecture,
  getCourses,
  updateLecture,
} from "../controllers/courseController.js";

const router = express.Router();

router
  .route("/course")
  .post(authCheck, adminCheck("admin", "instructor"), singleFile, createCourse)
  .get(getCourses);

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

router.route("/course/buy/:id").post(authCheck, adminCheck("user"), buyCourse);

export default router;
