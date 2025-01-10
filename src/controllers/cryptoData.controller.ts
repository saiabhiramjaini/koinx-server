import { Request, Response } from "express";
import Crypto from "../models/cryptoData.model";
import { deviationSchema, statsSchema } from "../utils/types";

export const getStats = async (req: Request, res: Response) => {
  try {
    const validated = statsSchema.safeParse(req.query);

    if (!validated.success) {
      return res.status(400).json({
        error: validated.error.issues.map((issue) => issue.message).join(", "),
      });
    }

    const { coin } = validated.data;
    const latestData = await Crypto.findOne({ coinId: coin }).sort({ createdAt: -1 });
    if (!latestData) {
      return res.status(404).json({ error: "Data not found." });
    }

    res.status(200).json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData["24hChange"],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export const getDeviation = async (req: Request, res: Response) => {
  try {
    const validated = deviationSchema.safeParse(req.query);

    if (!validated.success) {
      return res.status(400).json({
        error: validated.error.issues.map((issue) => issue.message).join(", "),
      });
    }

    const { coin } = validated.data;
    
    const validCoins = ["bitcoin", "matic-network", "ethereum"];
    if (!validCoins.includes(coin)) {
      return res.status(400).json({
        error: `Invalid coin selection. Must be one of: ${validCoins.join(", ")}.`,
      });
    }

    const records = await Crypto.find({ coinId: coin }).sort({ createdAt: -1 }).limit(100);

    if (!records.length) {
      return res.status(404).json({ error: "Not enough data." });
    }

    const prices = records.map((record) => record.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);

    if (records.length < 100) {
      return res.status(200).json({
        deviation: parseFloat(stdDev.toFixed(2)),
        message: `${records.length} records used for standard deviation calculation. Only a partial set of data was available.`,
      });
    }

    res.status(200).json({ deviation: parseFloat(stdDev.toFixed(2)) });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};
