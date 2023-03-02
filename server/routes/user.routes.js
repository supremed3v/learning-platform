import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/userController.js";
import singleFile from "../middlewares/singleFile.js";
import { authCheck } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(singleFile, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("/me").get(authCheck, getUser);

export default router;
