import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from './routes/profileRoutes.js';
import authMiddlleware from "./middlewares/authMiddleware.js";

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

app.use('/api', profileRoutes)

app.get("/", (req, res) => {
  res.send("SureWin Backend is up and running!");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
