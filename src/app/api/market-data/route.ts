import { NextResponse } from "next/server";

// Mock market data - in a real application, this would come from a market data provider
const mockMarketData = [
  { symbol: "BTC", name: "Bitcoin", price: 45234.56, change: 2.34, volume: "28.5B" },
  { symbol: "ETH", name: "Ethereum", price: 2876.43, change: -1.23, volume: "12.8B" },
  { symbol: "BNB", name: "BNB", price: 298.76, change: 3.45, volume: "2.1B" },
  { symbol: "ADA", name: "Cardano", price: 0.4521, change: 1.87, volume: "890M" },
  { symbol: "SOL", name: "Solana", price: 98.32, change: 4.12, volume: "1.2B" },
  { symbol: "XRP", name: "XRP", price: 0.6234, change: -0.45, volume: "1.8B" },
  { symbol: "DOT", name: "Polkadot", price: 6.78, change: 0.92, volume: "420M" },
  { symbol: "DOGE", name: "Dogecoin", price: 0.0821, change: -2.15, volume: "1.1B" },
];

export async function GET() {
  // In a real application, you would fetch live market data from an API
  // For now, we'll return mock data with a slight random variation
  const marketData = mockMarketData.map(asset => ({
    ...asset,
    price: asset.price * (1 + (Math.random() - 0.5) / 100), // ±0.5% random variation
    change: asset.change * (1 + (Math.random() - 0.5) / 10), // ±5% random variation
  }));
  
  return NextResponse.json({ tickers: marketData });
}