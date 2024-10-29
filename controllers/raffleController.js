import Raffle from "../models/Raffle.js";

// Create Raffle
export const createRaffle = async (req, res, next) => {
  const { name, description, cover, pricePerRaffle, images } = req.body;

  try {
    const newRaffle = new Raffle({
      name,
      description,
      cover,
      pricePerRaffle,
      images,
      ticketsSold: 0,
      usersPurchased: [],
    });

    const savedRaffle = await newRaffle.save();

    res.status(201).json({
      message: "Raffle Created Successfully",
      raffle: savedRaffle,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch All Raffles
export const fetchAllRaffles = async (req, res, next) => {
  try {
    const raffles = await Raffle.find();
    res.status(200).json(raffles);
  } catch (error) {
    next(error);
  }
};

// Fetch Raffle by Id
export const fetchRaffleById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const raffle = await Raffle.findById(id);
    if (!raffle) return next({ status: 404, message: "Raffle not found" });

    res.status(200).json(raffle);
  } catch (error) {
    next(error);
  }
};

// Update Raffle by Id
export const updateRaffleById = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, cover, pricePerRaffle, images } = req.body;

  try {
    const updatedRaffle = await Raffle.findByIdAndUpdate(
      id,
      { name, description, cover, pricePerRaffle, images },
      { new: true, runValidators: true }
    );

    if (!updatedRaffle) {
      return res.status(404).json({ message: "Raffle not found" });
    }

    res
      .status(200)
      .json({ message: "Raffle updated successfully", raffle: updatedRaffle });
  } catch (error) {
    next(error);
  }
};

// Delete a Raffle by Id
export const deleteRaffleById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRaffle = await Raffle.findByIdAndDelete(id);
    if (!deletedRaffle) {
      return res.status(404).json({ message: "Raffle not found" });
    }

    res.status(200).json({ message: "Raffle deleted successfully" });
  } catch (error) {
    next(error);
  }
};
