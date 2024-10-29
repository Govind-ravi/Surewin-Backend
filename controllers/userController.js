import User from "../models/User.js";

// Fetch user Profile
export const fetchUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return next({ status: 404, message: "User not found" });

    res.json(user);
  } catch (error) {
    next({ status: 500, message: "Error fetching user profile", error });
  }
};

// Edit user Details
export const editUserProfile = async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    return next({ status: 400, message: "No fields to update" });

  const { name, email, phoneNumber, address, country } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phoneNumber, address, country },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return next({ status: 404, message: "User not found" });
    
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    next({ status: 500, message: "Error updating user profile", error });
  }
};

// Delete User
export const deleteUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return next({ status: 404, message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next({ status: 500, message: "Error deleting user", error });
  }
};

// Fetch all users (admin)
export const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next({ status: 500, message: "Error fetching users", error });
  }
};

// Delete a user (super admin)
export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next({ status: 404, message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next({ status: 500, message: "Error deleting user", error });
  }
};

// Change user role (super admin)
export const changeUserRole = async (req, res, next) => {
  const { role } = req.body;
  const { id } = req.params;

  try {
    if (!["user", "admin", "superAdmin"].includes(role))
      return next({ status: 400, message: "Invalid role" });

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) return next({ status: 404, message: "User not found" });

    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    next({ status: 500, message: "Error updating user role", error });
  }
};
