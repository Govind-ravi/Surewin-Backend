import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin")
      return res.status(403).json({ message: "Access denied: Admins only" });

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default adminMiddleware;