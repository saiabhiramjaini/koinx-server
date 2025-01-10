import axios from "axios";
import Crypto from "../models/cryptoData.model";
require("dotenv").config();
const apiKey = process.env.CG_API_KEY;

export const fetchCryptoData = async () => {
  try {
    const coinIds = "bitcoin,matic-network,ethereum";

    const pingResponse = await axios.get(
      "https://api.coingecko.com/api/v3/ping",
      {
        headers: { "x-cg-demo-api-key": apiKey },
      }
    );

    if (pingResponse.status !== 200) {
      console.error("API authentication failed!");
    }

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: coinIds,
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
        },
        headers: { "x-cg-demo-api-key": apiKey },
      }
    );

    const data = response.data;

    for (const coinId of Object.keys(data)) {
      const coinData = data[coinId];
      const newEntry = await Crypto.create({
        coinId,
        price: coinData.usd,
        marketCap: coinData.usd_market_cap,
        "24hChange": coinData.usd_24h_change,
      });
    }

    console.log("Data fetched and stored successfully!");
  } catch (error: any) {
    console.error("Error fetching crypto data:", error.message);
  }
};
