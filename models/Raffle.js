import mongoose from "mongoose";

const raffleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    pricePerRaffle: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 3;
        },
        message: "There must be exactly three images!",
      },
    },
    ticketsSold: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    userPurchased: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        ticketCount: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

raffleSchema.index({ "usersPurchased.userId": 1 });

const Raffle = mongoose.model("Raffel", raffleSchema);
export default Raffle;
