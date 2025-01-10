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
exports.fetchCryptoData = void 0;
const axios_1 = __importDefault(require("axios"));
const cryptoData_model_1 = __importDefault(require("../models/cryptoData.model"));
require("dotenv").config();
const apiKey = process.env.CG_API_KEY;
const fetchCryptoData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coinIds = "bitcoin,matic-network,ethereum";
        const pingResponse = yield axios_1.default.get("https://api.coingecko.com/api/v3/ping", {
            headers: { "x-cg-demo-api-key": apiKey },
        });
        if (pingResponse.status !== 200) {
            console.error("API authentication failed!");
        }
        const response = yield axios_1.default.get("https://api.coingecko.com/api/v3/simple/price", {
            params: {
                ids: coinIds,
                vs_currencies: "usd",
                include_market_cap: true,
                include_24hr_change: true,
            },
            headers: { "x-cg-demo-api-key": apiKey },
        });
        const data = response.data;
        for (const coinId of Object.keys(data)) {
            const coinData = data[coinId];
            const newEntry = yield cryptoData_model_1.default.create({
                coinId,
                price: coinData.usd,
                marketCap: coinData.usd_market_cap,
                "24hChange": coinData.usd_24h_change,
            });
        }
        console.log("Data fetched and stored successfully!");
    }
    catch (error) {
        console.error("Error fetching crypto data:", error.message);
    }
});
exports.fetchCryptoData = fetchCryptoData;
