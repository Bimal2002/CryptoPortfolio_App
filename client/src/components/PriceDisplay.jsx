import React, { useState, useEffect } from "react";
import { PriceService } from "../services/priceService";

const PriceDisplay = ({ coinId = "ethereum", className = "" }) => {
  const [priceData, setPriceData] = useState({
    price: 0,
    change24h: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setPriceData((prev) => ({ ...prev, loading: true, error: null }));
        const data = await PriceService.getCurrentPrice(coinId);
        setPriceData({
          price: data.price,
          change24h: data.change24h,
          loading: false,
          error: null
        });
      } catch (error) {
        setPriceData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch price"
        }));
      }
    };

    fetchPrice();
    
    // Update price every 30 seconds
    const interval = setInterval(fetchPrice, 30000);
    
    return () => clearInterval(interval);
  }, [coinId]);

  if (priceData.loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 bg-gray-300 rounded w-24 mb-1" />
        <div className="h-4 bg-gray-300 rounded w-16" />
      </div>
    );
  }

  if (priceData.error) {
    return (
      <div className={`text-red-400 ${className}`}>
        <div className="text-sm">Price unavailable</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-white font-semibold text-lg">
        {PriceService.formatPrice(priceData.price)}
      </div>
      <div className={`text-sm ${PriceService.getChangeColor(priceData.change24h)}`}>
        {PriceService.formatChange(priceData.change24h)} 24h
      </div>
    </div>
  );
};

export default PriceDisplay;
