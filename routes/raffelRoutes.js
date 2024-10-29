import express from "express";
import {
  createRaffle,
  deleteRaffleById,
  fetchAllRaffles,
  fetchRaffleById,
  updateRaffleById,
} from "../controllers/raffleController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Raffle Route
router.post("/create", authMiddleware, createRaffle);

// Fetch Raffle by Id
router.get("/:id", fetchRaffleById);

// Update Raffle by Id
router.put("/:id", authMiddleware, updateRaffleById);

// Delete Raffle by Id
router.delete('/:id', authMiddleware, deleteRaffleById)

// Fetch all Raffles
router.get('/', fetchAllRaffles)
export default router;
