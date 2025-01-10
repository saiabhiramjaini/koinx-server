"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviationSchema = exports.statsSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const COIN_ERROR_MESSAGE = "Invalid coin selection. Must be one of: bitcoin, matic-network, or ethereum";
const validCoins = ["bitcoin", "matic-network", "ethereum"];
exports.statsSchema = zod_1.default.object({
    coin: zod_1.default.enum(validCoins, {
        errorMap: () => ({
            message: COIN_ERROR_MESSAGE
        }),
        description: "Cryptocurrency identifier for stats analysis"
    }),
});
exports.deviationSchema = zod_1.default.object({
    coin: zod_1.default.enum(validCoins, {
        errorMap: () => ({
            message: COIN_ERROR_MESSAGE
        }),
        description: "Cryptocurrency identifier for deviation analysis"
    }),
});
