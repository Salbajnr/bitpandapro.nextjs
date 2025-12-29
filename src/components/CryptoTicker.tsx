"use client";

import { useState, useEffect } from "react";

interface CryptoPrice {
  id: string;
  symbol: string;
  price: number;
  change24h: number;
}

export default function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([0, 1, 2, 3, 4]);

  useEffect(() => {
    // Mock data for initial display with 15 cryptocurrencies
    const mockData: CryptoPrice[] = [
      { id: "bitcoin", symbol: "BTC", price: 43250.32, change24h: 2.34 },
      { id: "ethereum", symbol: "ETH", price: 2560.78, change24h: -1.23 },
      { id: "solana", symbol: "SOL", price: 98.45, change24h: 5.67 },
      { id: "cardano", symbol: "ADA", price: 0.45, change24h: 0.89 },
      { id: "ripple", symbol: "XRP", price: 0.52, change24h: -0.45 },
      { id: "dogecoin", symbol: "DOGE", price: 0.08, change24h: 3.21 },
      { id: "polkadot", symbol: "DOT", price: 7.23, change24h: -2.12 },
      { id: "chainlink", symbol: "LINK", price: 14.67, change24h: 1.78 },
      { id: "litecoin", symbol: "LTC", price: 68.91, change24h: 0.56 },
      { id: "bitcoin-cash", symbol: "BCH", price: 340.21, change24h: -1.34 },
      { id: "stellar", symbol: "XLM", price: 0.12, change24h: 2.45 },
      { id: "uniswap", symbol: "UNI", price: 6.78, change24h: 4.12 },
      { id: "polygon", symbol: "MATIC", price: 0.89, change24h: -0.78 },
      { id: "tron", symbol: "TRX", price: 0.16, change24h: 1.23 },
      { id: "avalanche", symbol: "AVAX", price: 29.45, change24h: 3.67 },
    ];
    
    setPrices(mockData);
    setLoading(false);
    
    // Set up interval to cycle through prices
    const interval = setInterval(() => {
      setVisibleIndices(prevIndices => {
        // Shift indices to show next set of prices
        const newIndices = prevIndices.map(index => (index + 1) % mockData.length);
        return newIndices;
      });
    }, 5000); // Change prices every 5 seconds for smoother experience
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 py-1 overflow-hidden h-[30px]">
        <div className="flex animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center mx-2">
              <div className="h-3 w-16 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (prices.length === 0) return null;

  return (
    <div className="bg-gray-800 py-1 overflow-hidden h-[30px]">
      <div className="flex justify-center items-center h-full animate-fadeIn">
        {visibleIndices.map((index) => {
          const crypto = prices[index];
          return (
            <div key={`${crypto.id}-${index}`} className="flex items-center mx-3 animate-slideIn">
              <span className="text-white text-xs font-medium">{crypto.symbol}</span>
              <span className="text-white text-xs mx-1">=</span>
              <span className="text-white text-xs">${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className={`text-xs mx-2 ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ({crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}