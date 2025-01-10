import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: true,
      enum: ["bitcoin", "matic-network", "ethereum"],
    },
    price: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: Number,
      required: true,
    },
    "24hChange": {
      type: Number,
      required: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const Crypto = mongoose.model('Crypto', cryptoSchema);
export default Crypto;