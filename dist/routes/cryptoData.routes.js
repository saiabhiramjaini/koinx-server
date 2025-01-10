"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cryptoData_controller_1 = require("../controllers/cryptoData.controller");
const cryptoDataRouter = (0, express_1.Router)();
cryptoDataRouter.get("/stats", cryptoData_controller_1.getStats);
cryptoDataRouter.get("/deviation", cryptoData_controller_1.getDeviation);
exports.default = cryptoDataRouter;
