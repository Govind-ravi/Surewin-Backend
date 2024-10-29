import Raffle from "../models/Raffle.js";
import User from "../models/User.js";

// Purchase a Raffle Ticket
export const purchaseRaffleTicket = async (req, res, next) => {
  const { id } = req.params;
  const { ticketCount } = req.body;
  const userId = req.user.id;

  try {
    // Find Raffel By Id
    const raffle = await Raffle.findById(id);
    if (!raffle) return res.status(404).json({ message: "Raffle not found" });

    // Check available tickets
    if (raffle.ticketsSold + ticketCount > 100) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }

    // Find user to update
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check already purchased if so incerase count else update
    const existingPurchase = user.rafflesPurchased.find(
      (p) => p.raffleId.toString() === id
    );

    if (existingPurchase) {
      existingPurchase.ticketCount += ticketCount;
    } else {
      user.rafflesPurchased.push({
        raffleId: id,
        ticketCount,
      });
    }

    // Update raffle ticketsSold and userPurchased Array
    raffle.ticketsSold += ticketCount;

    const existingRafflePurchase = raffle.userPurchased.find(
      (purchase) => purchase.userId.toString() === userId
    );
    if (existingRafflePurchase) {
      existingRafflePurchase.ticketCount += ticketCount;
    } else {
      raffle.userPurchased.push({
        userId,
        ticketCount,
      });
    }

    // Save both the models
    await user.save();
    await raffle.save();

    res.status(200).json({
      message: "Tickets purchased successfully",
      raffle,
      user,
    });
  } catch (error) {
    next(error);
  }
};
