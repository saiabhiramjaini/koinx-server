"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cryptoSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const Crypto = mongoose_1.default.model('Crypto', cryptoSchema);
exports.default = Crypto;
