import jwt from "jsonwebtoken";

const superAdminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req.user.role !== "superAdmin") {
      return res
        .status(403)
        .json({ message: "Access denied: SuperAdmins only" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};

export default superAdminMiddleware;
