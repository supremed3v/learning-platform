import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import singleFile from "../middlewares/singleFile.js";
import { authCheck } from "../middlewares/auth.js";
import { removeCourse, userCourse } from "../controllers/courseController.js";

const router = express.Router();

router.route("/register").post(singleFile, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("/me").get(authCheck, getUser);

// Yet to be tested
router.route("/me/update").put(authCheck, singleFile, updateUser);
router.route("/me/my-courses").get(authCheck, userCourse);
router.route("/me/my-courses/:id").delete(authCheck, removeCourse);

export default router;
