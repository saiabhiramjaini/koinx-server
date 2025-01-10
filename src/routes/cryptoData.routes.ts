import { Router } from "express";
import { getStats, getDeviation } from "../controllers/cryptoData.controller";

const cryptoDataRouter = Router();

cryptoDataRouter.get("/stats", getStats as any);
cryptoDataRouter.get("/deviation", getDeviation as any);

export default cryptoDataRouter;