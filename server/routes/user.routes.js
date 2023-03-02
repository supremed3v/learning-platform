import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import singleFile from "../middlewares/singleFile.js";

const router = express.Router();

router.route("/register").post(singleFile, registerUser);
router.route("/login").post(loginUser);

export default router;
