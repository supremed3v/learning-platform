import express from "express";
import singleFile from "../middlewares/singleFile.js";
import { authCheck, adminCheck } from "../middlewares/auth.js";
import { createCourse } from "../controllers/courseController.js";

const router = express.Router();

router
  .route("/course")
  .post(authCheck, adminCheck("admin", "instructor"), singleFile, createCourse);

export default router;
