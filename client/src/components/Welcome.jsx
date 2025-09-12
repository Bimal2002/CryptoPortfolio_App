import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";
import PortfolioOverview from "./PortfolioOverview";
import PriceDisplay from "./PriceDisplay";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-lg p-4 outline-none bg-white bg-opacity-10 backdrop-blur-md text-white border border-white border-opacity-20 text-sm placeholder-gray-300 focus:bg-opacity-20 focus:border-opacity-40 transition-all duration-300"
  />
);

const Welcome = () => {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex mf:flex-row flex-col items-center justify-between mb-12">
          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10 animate-fadeInUp">
            <h1 className="text-4xl sm:text-6xl text-white font-bold py-1 leading-tight text-shadow">
              Discover the Future of Finance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                With Cryptocurrencies
              </span>
            </h1>
            <p className="text-left mt-5 text-gray-200 font-light md:w-9/12 w-11/12 text-lg animate-slideInLeft">
              Unlock the potential of digital assets. Trade, invest, and manage your crypto portfolio with ease and security.
            </p>
            {!currentAccount && (
              <button
                type="button"
                onClick={connectWallet}
                className="flex flex-row justify-center items-center my-8 bg-gradient-to-r 
                  from-purple-500 to-blue-500 p-4 rounded-full cursor-pointer 
                  hover:from-purple-600 hover:to-blue-600 transition-all duration-300 
                  btn-hover-scale animate-pulse-glow"
              >
                <AiFillPlayCircle className="text-white mr-2 text-xl" />
                <p className="text-white text-lg font-semibold">
                  Connect Wallet
                </p>
              </button>
            )}
          </div>

          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 animate-fadeInUp">
            {/* Enhanced Ethereum Card */}
            <div className="glass-card p-4 flex justify-end items-start flex-col rounded-xl h-48 sm:w-80 w-full my-5 text-white card-hover">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500">
                    <SiEthereum fontSize={24} color="#fff" />
                  </div>
                  <div className="flex flex-col items-end">
                    <BsInfoCircle fontSize={17} color="#fff" className="mb-2" />
                    <PriceDisplay coinId="ethereum" className="text-right text-sm" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-200 font-light text-sm">
                    {currentAccount ? shortenAddress(currentAccount) : "Not Connected"}
                  </p>
                  <p className="text-white font-semibold text-xl mt-1 text-glow">
                    Ethereum
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Transaction Form */}
            <div className="glass-card p-6 sm:w-96 w-full flex flex-col justify-start items-center rounded-xl shadow-2xl">
              <h3 className="text-white text-xl font-semibold mb-4 text-center">Send Transaction</h3>
              <Input
                placeholder="Recipient Address"
                name="addressTo"
                type="text"
                handleChange={handleChange}
                value={formData.addressTo}
              />
              <Input
                placeholder="Amount (ETH)"
                name="amount"
                type="number"
                handleChange={handleChange}
                value={formData.amount}
              />
              <Input
                placeholder="Enter Message"
                name="message"
                type="text"
                handleChange={handleChange}
                value={formData.message}
              />

              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent my-4 opacity-30" />

              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 p-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-full cursor-pointer transition-all duration-300 font-semibold btn-hover-scale btn-hover-glow"
                >
                  Send Transaction
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Overview Section */}
        {currentAccount && (
          <div className="mt-16 animate-fadeInUp">
            <h2 className="text-3xl font-bold text-white text-center mb-8 text-shadow">
              Portfolio Overview
            </h2>
            <PortfolioOverview />
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
