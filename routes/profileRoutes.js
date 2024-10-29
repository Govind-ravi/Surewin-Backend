// routes/userRoutes.js
import express from "express";
import {
  fetchUserProfile,
  editUserProfile,
  deleteUserProfile,
  fetchAllUsers,
  deleteUserById,
  changeUserRole,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import superAdminMiddleware from "../middlewares/superAdminMiddleware.js";

const router = express.Router();

// Route to fetch user Profile
router.get("/profile", authMiddleware, fetchUserProfile);

// Route to edit user Details
router.put("/profile", authMiddleware, editUserProfile);

// Route to Delete User
router.delete("/profile", authMiddleware, deleteUserProfile);

// Route for admin to fetch all users
router.get("/users", authMiddleware, adminMiddleware, fetchAllUsers);

// Route for deleting a user (Super Admin only)
router.delete("/users/:id", authMiddleware, superAdminMiddleware, deleteUserById);

// Route to change user role (accessible only by super admin)
router.put("/users/:id/role", authMiddleware, superAdminMiddleware, changeUserRole);

export default router;
