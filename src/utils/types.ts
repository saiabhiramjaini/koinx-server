import z from "zod";

const COIN_ERROR_MESSAGE = "Invalid coin selection. Must be one of: bitcoin, matic-network, or ethereum";

const validCoins = ["bitcoin", "matic-network", "ethereum"] as const;

export const statsSchema = z.object({
  coin: z.enum(validCoins, {
    errorMap: () => ({
      message: COIN_ERROR_MESSAGE
    }),
    description: "Cryptocurrency identifier for stats analysis"
  }),
});

export const deviationSchema = z.object({
  coin: z.enum(validCoins, {
    errorMap: () => ({
      message: COIN_ERROR_MESSAGE
    }),
    description: "Cryptocurrency identifier for deviation analysis"
  }),
});

export type StatsInput = z.infer<typeof statsSchema>;
export type DeviationInput = z.infer<typeof deviationSchema>;