import cron from "node-cron";
import { fetchCryptoData } from './seedData';

const setupCronJob = () => {
    const cronExpression = "0 */2 * * *";
    
    const job = cron.schedule(cronExpression, async () => {
        try {
            await fetchCryptoData();
        } catch (error) {
            console.error('Error in fetch job:', error);
        }
    }, {
        scheduled: true,
        timezone: "UTC"
    });
    fetchCryptoData();

    return job;
};

export default setupCronJob;