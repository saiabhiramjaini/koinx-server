"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviation = exports.getStats = void 0;
const cryptoData_model_1 = __importDefault(require("../models/cryptoData.model"));
const types_1 = require("../utils/types");
const getStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validated = types_1.statsSchema.safeParse(req.query);
        if (!validated.success) {
            return res.status(400).json({
                error: validated.error.issues.map((issue) => issue.message).join(", "),
            });
        }
        const { coin } = validated.data;
        const latestData = yield cryptoData_model_1.default.findOne({ coinId: coin }).sort({ createdAt: -1 });
        if (!latestData) {
            return res.status(404).json({ error: "Data not found." });
        }
        res.status(200).json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData["24hChange"],
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});
exports.getStats = getStats;
const getDeviation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validated = types_1.deviationSchema.safeParse(req.query);
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
        const records = yield cryptoData_model_1.default.find({ coinId: coin }).sort({ createdAt: -1 }).limit(100);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});
exports.getDeviation = getDeviation;
