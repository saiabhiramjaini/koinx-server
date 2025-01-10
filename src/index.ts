import express from 'express';
import cryptoDataRouter from './routes/cryptoData.routes';
import connectDB from './db/connect';
import setupCronJob from './utils/cronjob';
require("dotenv").config();

const app = express();
connectDB();
setupCronJob();

app.use("/api/v1", cryptoDataRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
    console.log('Cron job scheduled to run every 2 Hours');
});