import React, { useState, useEffect } from "react";
import { PriceService } from "../services/priceService";

const PriceChart = ({ coinId = "ethereum", days = 7, className = "" }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await PriceService.getHistoricalData(coinId, days);
        setChartData(data);
      } catch (err) {
        setError("Failed to fetch chart data");
        console.error("Chart data error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [coinId, days]);

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center h-32`}>
        <div className="animate-pulse text-gray-400">Loading chart...</div>
      </div>
    );
  }

  if (error || chartData.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center h-32`}>
        <div className="text-red-400 text-sm">Chart unavailable</div>
      </div>
    );
  }

  // Calculate min and max values for scaling
  const prices = chartData.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;

  // Generate SVG path for the price line
  const generatePath = () => {
    const width = 300;
    const height = 100;
    const padding = 10;

    return chartData.map((point, index) => {
      const x = (index / (chartData.length - 1)) * (width - 2 * padding) + padding;
      const y = height - padding - ((point.price - minPrice) / priceRange) * (height - 2 * padding);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  };

  const priceChange = chartData.length > 1
    ? ((chartData[chartData.length - 1].price - chartData[0].price) / chartData[0].price) * 100 : 0;

  const isPositive = priceChange >= 0;

  return (
    <div className={`${className} bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-white font-semibold text-sm">
            {PriceService.getCoinName(coinId)} ({days}d)
          </h4>
          <div className={`text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? "+" : ""}{priceChange.toFixed(2)}%
          </div>
        </div>
        <div className="text-right">
          <div className="text-white font-semibold text-sm">
            ${chartData[chartData.length - 1]?.price.toFixed(2)}
          </div>
          <div className="text-gray-400 text-xs">
            Current Price
          </div>
        </div>
      </div>

      <div className="relative h-24">
        <svg
          viewBox="0 0 300 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="30" height="20" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Price line */}
          <path
            d={generatePath()}
            fill="none"
            stroke={isPositive ? "#10B981" : "#EF4444"}
            strokeWidth="2"
            className="drop-shadow-sm"
          />

          {/* Gradient fill under the line */}
          <defs>
            <linearGradient id={`gradient-${coinId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${generatePath()} L 290 90 L 10 90 Z`}
            fill={`url(#gradient-${coinId})`}
          />
        </svg>
      </div>
    </div>
  );
};

export default PriceChart;
