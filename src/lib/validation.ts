import { z } from "zod";

export const createPortfolioSchema = z.object({
  name: z.string().min(1).max(100),
});

export const updatePortfolioSchema = z.object({
  name: z.string().min(1).max(100).optional(),
});

export const upsertHoldingSchema = z.object({
  portfolioId: z.string().uuid(),
  symbol: z.string().min(1).max(20),
  quantity: z.union([z.string(), z.number()]),
  averageCost: z.union([z.string(), z.number()]),
});

export const updateHoldingSchema = z.object({
  quantity: z.union([z.string(), z.number()]).optional(),
  averageCost: z.union([z.string(), z.number()]).optional(),
});

export const createTradeSchema = z.object({
  portfolioId: z.string().uuid(),
  symbol: z.string().min(1).max(20),
  side: z.enum(["BUY", "SELL"]),
  quantity: z.union([z.string(), z.number()]),
  price: z.union([z.string(), z.number()]),
  executedAt: z.string().datetime().optional(),
});

export const updateTradeSchema = z.object({
  symbol: z.string().min(1).max(20).optional(),
  side: z.enum(["BUY", "SELL"]).optional(),
  quantity: z.union([z.string(), z.number()]).optional(),
  price: z.union([z.string(), z.number()]).optional(),
  executedAt: z.string().datetime().optional(),
});
