import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import raffelRoutes from "./routes/raffelRoutes.js";
import purchaseRaffleRoutes from "./routes/purchaseRoutes.js"
import authMiddlleware from "./middlewares/authMiddleware.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connection to DataBase
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/api/auth/protected-route", authMiddlleware, (req, res) => {
  res.json({ message: "You have access" });
});

app.use("/api", profileRoutes);
app.use("/api/raffles", raffelRoutes);
app.use("/api/purchase", purchaseRaffleRoutes)

app.get("/", (req, res) => {
  res.send("SureWin Backend is up and running!");
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
