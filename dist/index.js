"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cryptoData_routes_1 = __importDefault(require("./routes/cryptoData.routes"));
const connect_1 = __importDefault(require("./db/connect"));
const cronjob_1 = __importDefault(require("./utils/cronjob"));
require("dotenv").config();
const app = (0, express_1.default)();
(0, connect_1.default)();
(0, cronjob_1.default)();
app.use("/api/v1", cryptoData_routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
    console.log('Cron job scheduled to run every 2 Hours');
});
