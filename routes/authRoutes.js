import express from "express";
import {
  registerUser,
  loginUser,
  resetPassword,
  requestPasswordReset,
} from "../controllers/authController.js";

const router = express.Router();

// User Registration Route
router.post("/register", registerUser);

// User Login Route
router.post("/login", loginUser);

// Password reset request route
router.post("/reset-password-request", requestPasswordReset);

// Reset Password Route
router.post("/reset-password/:token", resetPassword);

export default router;
