import React, { useState, useEffect, useContext } from "react";
import { SiEthereum, SiBitcoin } from "react-icons/si";
import { FaChartLine, FaWallet, FaExchangeAlt } from "react-icons/fa";
import { TransactionContext } from "../context/TransactionContext";
import { PriceService } from "../services/priceService";
import PriceDisplay from "./PriceDisplay";
import PriceChart from "./PriceChart";

const StatCard = ({ icon: Icon, title, value, subtitle }) => (
  <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 transition-all duration-300 hover:bg-opacity-20 hover:scale-105">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
        <Icon className="text-white text-xl" />
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-300">{subtitle}</div>
      </div>
    </div>
    <div className="text-gray-300 text-sm font-medium">{title}</div>
  </div>
);

const MarketCard = ({ coin }) => (
  <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between hover:bg-opacity-20 transition-all duration-300">
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
        {coin.symbol === "ETH" && <SiEthereum className="text-white text-lg" />}
        {coin.symbol === "BTC" && <SiBitcoin className="text-white text-lg" />}
        {coin.symbol === "BNB" && <div className="text-white text-lg font-bold">B</div>}
      </div>
      <div>
        <div className="text-white font-semibold">{coin.symbol}</div>
        <div className="text-gray-300 text-sm">{coin.name}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-white font-semibold">{PriceService.formatPrice(coin.price)}</div>
      <div className={`text-sm ${PriceService.getChangeColor(coin.change24h)}`}>
        {PriceService.formatChange(coin.change24h)}
      </div>
    </div>
  </div>
);

const PortfolioOverview = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    ethBalance: 0,
    totalTransactions: 0,
    loading: true
  });
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const calculatePortfolio = async () => {
      if (!currentAccount || !transactions.length) {
        setPortfolioData((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        // Calculate ETH balance from transactions
        let ethBalance = 0;
        transactions.forEach((tx) => {
          if (tx.addressTo.toLowerCase() === currentAccount.toLowerCase()) {
            ethBalance += parseFloat(tx.amount);
          }
          if (tx.addressFrom.toLowerCase() === currentAccount.toLowerCase()) {
            ethBalance -= parseFloat(tx.amount);
          }
        });

        // Get current ETH price
        const ethPrice = await PriceService.getCurrentPrice("ethereum");
        const totalValue = ethBalance * ethPrice.price;

        setPortfolioData({
          totalValue,
          ethBalance,
          totalTransactions: transactions.length,
          loading: false
        });
      } catch (error) {
        console.error("Error calculating portfolio:", error);
        setPortfolioData((prev) => ({ ...prev, loading: false }));
      }
    };

    const fetchMarketData = async () => {
      try {
        const data = await PriceService.getMultiplePrices(["ethereum", "bitcoin", "binancecoin"]);
        setMarketData(data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    calculatePortfolio();
    fetchMarketData();
  }, [transactions, currentAccount]);

  if (!currentAccount) {
    return (
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 text-center">
        <FaWallet className="mx-auto text-4xl text-gray-400 mb-4" />
        <h3 className="text-white text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-gray-300">Connect your wallet to view your portfolio overview</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={FaWallet}
          title="Portfolio Value"
          value={portfolioData.loading ? "Loading..." : `$${portfolioData.totalValue.toFixed(2)}`}
          subtitle="USD"
        />
        <StatCard
          icon={SiEthereum}
          title="ETH Balance"
          value={portfolioData.loading ? "Loading..." : `${portfolioData.ethBalance.toFixed(4)}`}
          subtitle="Ethereum"
        />
        <StatCard
          icon={FaExchangeAlt}
          title="Total Transactions"
          value={portfolioData.totalTransactions}
          subtitle="All time"
        />
      </div>

      {/* Market Overview */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
        <div className="flex items-center mb-6">
          <FaChartLine className="text-white text-xl mr-3" />
          <h3 className="text-white text-xl font-semibold">Market Overview</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketData.map((coin) => (
            <MarketCard key={coin.id} coin={coin} />
          ))}
        </div>
      </div>

      {/* Price Charts */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
        <div className="flex items-center mb-6">
          <FaChartLine className="text-white text-xl mr-3" />
          <h3 className="text-white text-xl font-semibold">Price Trends</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <PriceChart coinId="ethereum" days={7} />
          <PriceChart coinId="bitcoin" days={7} />
          <PriceChart coinId="binancecoin" days={7} />
        </div>
      </div>

      {/* Current ETH Price Widget */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <SiEthereum className="text-white text-2xl mr-3" />
            <div>
              <h4 className="text-white text-lg font-semibold">Ethereum Price</h4>
              <p className="text-gray-300 text-sm">Live price updates</p>
            </div>
          </div>
          <PriceDisplay coinId="ethereum" className="text-right" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
