import express from "express";
import singleFile from "../middlewares/singleFile.js";
import { authCheck, adminCheck } from "../middlewares/auth.js";
import {
  addLecture,
  createCourse,
  getCourses,
} from "../controllers/courseController.js";

const router = express.Router();

router
  .route("/course")
  .post(authCheck, adminCheck("admin", "instructor"), singleFile, createCourse)
  .get(getCourses);

router
  .route("/course/:id/lecture")
  .put(authCheck, adminCheck("admin", "instructor"), singleFile, addLecture);

export default router;
