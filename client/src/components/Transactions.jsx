import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsArrowUpRight, BsArrowDownLeft } from "react-icons/bs";
import { FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import PriceDisplay from "./PriceDisplay";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
}) => {
  const { currentAccount } = useContext(TransactionContext);
  const isOutgoing =
    currentAccount &&
    addressFrom.toLowerCase() === currentAccount.toLowerCase();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div
      className="glass-card m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-6 rounded-xl card-hover animate-fadeInUp"
    >
      <div className="flex flex-col items-center w-full">
        {/* Transaction Type Indicator */}
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
            isOutgoing ? "bg-red-500" : "bg-green-500"
          } bg-opacity-20`}
        >
          {isOutgoing ? (
            <BsArrowUpRight className="text-red-400 text-xl" />
          ) : (
            <BsArrowDownLeft className="text-green-400 text-xl" />
          )}
        </div>

        {/* Transaction Details */}
        <div className="w-full mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">From:</span>
            <div className="flex items-center space-x-2">
              <a
                href={`https://sepolia.etherscan.io/address/${addressFrom}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                {shortenAddress(addressFrom)}
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(addressFrom)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaCopy className="text-xs" />
              </button>
              <a
                href={`https://sepolia.etherscan.io/address/${addressFrom}`}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">To:</span>
            <div className="flex items-center space-x-2">
              <a
                href={`https://sepolia.etherscan.io/address/${addressTo}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                {shortenAddress(addressTo)}
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(addressTo)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaCopy className="text-xs" />
              </button>
              <a
                href={`https://sepolia.etherscan.io/address/${addressTo}`}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Amount:</span>
            <div className="flex items-center space-x-2">
              <SiEthereum className="text-blue-400 text-sm" />
              <span className="text-white font-semibold">{amount} ETH</span>
            </div>
          </div>

          {message && (
            <div className="bg-white bg-opacity-5 rounded-lg p-3 mt-3">
              <span className="text-gray-400 text-sm block mb-1">Message:</span>
              <p className="text-white text-sm break-words">{message}</p>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 px-6 w-max rounded-full shadow-lg">
          <p className="text-white font-medium text-sm">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {currentAccount ? (
            <>
              <h3 className="text-white text-4xl font-bold mb-4 text-shadow">
                Transaction History
              </h3>
              <p className="text-gray-300 text-lg">
                Track all your Ethereum transactions in one place
              </p>
              <div className="mt-6">
                <PriceDisplay coinId="ethereum" className="inline-block" />
              </div>
            </>
          ) : (
            <>
              <h3 className="text-white text-4xl font-bold mb-4 text-shadow">
                Connect Your Wallet
              </h3>
              <p className="text-gray-300 text-lg">
                Connect your wallet to view your transaction history and
                portfolio
              </p>
            </>
          )}
        </div>

        {currentAccount && transactions.length === 0 && (
          <div className="text-center py-12">
            <div className="glass-card p-8 rounded-xl max-w-md mx-auto">
              <SiEthereum className="mx-auto text-4xl text-gray-400 mb-4" />
              <h4 className="text-white text-xl font-semibold mb-2">
                No Transactions Yet
              </h4>
              <p className="text-gray-300">
                Start by sending your first transaction!
              </p>
            </div>
          </div>
        )}

        {transactions.length > 0 && (
          <div className="mb-8">
            <div className="glass-card p-6 rounded-xl text-center">
              <h4 className="text-white text-lg font-semibold mb-2">
                Total Transactions: {transactions.length}
              </h4>
              <p className="text-gray-300 text-sm">
                All transactions are recorded on the Ethereum blockchain
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center">
          {[...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
