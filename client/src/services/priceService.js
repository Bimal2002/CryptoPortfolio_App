// Price tracking service using CoinGecko API
const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

// Fallback data for when API is unavailable
const FALLBACK_PRICES = {
  ethereum: { price: 2500, change24h: 2.5 },
  bitcoin: { price: 45000, change24h: 1.8 },
  binancecoin: { price: 320, change24h: -0.5 }
};

export class PriceService {
  static async getCurrentPrice(coinId = "ethereum") {
    try {
      const response = await fetch(
        `${COINGECKO_API_BASE}/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        price: data[coinId]?.usd || FALLBACK_PRICES[coinId]?.price || 0,
        change24h: data[coinId]?.usd_24h_change || FALLBACK_PRICES[coinId]?.change24h || 0,
        lastUpdated: data[coinId]?.last_updated_at || Date.now() / 1000
      };
    } catch (error) {
      console.warn("Using fallback price data due to API error:", error.message);
      return {
        price: FALLBACK_PRICES[coinId]?.price || 0,
        change24h: FALLBACK_PRICES[coinId]?.change24h || 0,
        lastUpdated: Date.now() / 1000
      };
    }
  }

  static async getMultiplePrices(coinIds = ["ethereum", "bitcoin", "binancecoin"]) {
    try {
      const idsString = coinIds.join(",");
      const response = await fetch(
        `${COINGECKO_API_BASE}/simple/price?ids=${idsString}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return Object.entries(data).map(([coinId, priceData]) => ({
        id: coinId,
        name: this.getCoinName(coinId),
        symbol: this.getCoinSymbol(coinId),
        price: priceData.usd || FALLBACK_PRICES[coinId]?.price || 0,
        change24h: priceData.usd_24h_change || FALLBACK_PRICES[coinId]?.change24h || 0,
        marketCap: priceData.usd_market_cap || 0
      }));
    } catch (error) {
      console.warn("Using fallback price data due to API error:", error.message);
      return coinIds.map((coinId) => ({
        id: coinId,
        name: this.getCoinName(coinId),
        symbol: this.getCoinSymbol(coinId),
        price: FALLBACK_PRICES[coinId]?.price || 0,
        change24h: FALLBACK_PRICES[coinId]?.change24h || 0,
        marketCap: 0
      }));
    }
  }

  static async getHistoricalData(coinId = "ethereum", days = 7) {
    try {
      const response = await fetch(
        `${COINGECKO_API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${days <= 1 ? "hourly" : "daily"}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.prices?.map(([timestamp, price]) => ({
        timestamp,
        price,
        date: new Date(timestamp).toISOString()
      })) || this.generateFallbackChartData(coinId, days);
    } catch (error) {
      console.warn("Using fallback chart data due to API error:", error.message);
      return this.generateFallbackChartData(coinId, days);
    }
  }

  static generateFallbackChartData(coinId, days) {
    const basePrice = FALLBACK_PRICES[coinId]?.price || 1000;
    const data = [];
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    
    for (let i = days; i >= 0; i -= 1) {
      const timestamp = now - (i * dayMs);
      const randomVariation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const price = basePrice * (1 + randomVariation);
      
      data.push({
        timestamp,
        price,
        date: new Date(timestamp).toISOString()
      });
    }
    
    return data;
  }

  static getCoinName(coinId) {
    const coinNames = {
      ethereum: "Ethereum",
      bitcoin: "Bitcoin",
      binancecoin: "Binance Coin",
      cardano: "Cardano",
      solana: "Solana",
      polkadot: "Polkadot"
    };
    return coinNames[coinId] || coinId.charAt(0).toUpperCase() + coinId.slice(1);
  }

  static getCoinSymbol(coinId) {
    const coinSymbols = {
      ethereum: "ETH",
      bitcoin: "BTC",
      binancecoin: "BNB",
      cardano: "ADA",
      solana: "SOL",
      polkadot: "DOT"
    };
    return coinSymbols[coinId] || coinId.toUpperCase();
  }

  static formatPrice(price) {
    if (price >= 1000) {
      return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  }

  static formatChange(change) {
    const formatted = Math.abs(change).toFixed(2);
    return change >= 0 ? `+${formatted}%` : `-${formatted}%`;
  }

  static getChangeColor(change) {
    return change >= 0 ? "text-green-400" : "text-red-400";
  }
}

export default PriceService;
