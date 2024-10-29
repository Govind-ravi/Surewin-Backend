import express from "express";
import { purchaseRaffleTicket } from "../controllers/purchaseRaffelController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to handle raffle purchase
router.post("/:id", authMiddleware, purchaseRaffleTicket);

export default router;
