import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionsProvider = ({ children }) => {
  

  return (
    <TransactionContext.Provider value="test">
      {children}
    </TransactionContext.Provider>
  );
};
