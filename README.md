# CryptoPortfolio DApp 🚀

A modern, full-stack decentralized application for cryptocurrency portfolio management built with React, Ethereum, and Web3 technologies.

## ✨ Features

- **🔐 MetaMask Integration**: Secure wallet connection and transaction management
- **💰 Real-time Price Tracking**: Live cryptocurrency prices from CoinGecko API
- **📊 Portfolio Analytics**: Calculate total portfolio value and track performance
- **📈 Price Charts**: Interactive price trend visualization
- **💸 Transaction Management**: Send ETH and track transaction history
- **🎨 Modern UI/UX**: Glassmorphism design with animations and responsive layout
- **⚡ Smart Contracts**: Ethereum-based transaction recording with Solidity

## 🔗 Live Demo

**Deployed Application**: [crypto-portfolio-app-ysll.vercel.app](https://crypto-portfolio-app-ysll.vercel.app/)

## 🛠️ Tech Stack

### Frontend
- **React 17** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Ethers.js** - Ethereum library for Web3 interactions

### Backend
- **Solidity** - Smart contract development
- **Hardhat** - Ethereum development environment
- **MetaMask** - Wallet integration

### APIs
- **CoinGecko API** - Real-time cryptocurrency prices
- **Ethereum Blockchain** - Transaction data and smart contracts

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bimal2002/CryptoPortfolio_App.git
   cd CryptoPortfolio_App
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install smart contract dependencies**
   ```bash
   cd ../smart_contract
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `smart_contract` directory:
   ```env
   PRIVATE_KEY=your_wallet_private_key
   ALCHEMY_API_URL=your_alchemy_api_url
   ```

### Development

1. **Start the smart contract local blockchain**
   ```bash
   cd smart_contract
   npx hardhat node
   ```

2. **Deploy smart contracts**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. **Update contract address and ABI**
   
   Copy the deployed contract address and update:
   - `client/src/utils/constants.js`

4. **Start the frontend development server**
   ```bash
   cd ../client
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

### Production Deployment

#### Frontend (Vercel)

1. **Build the project**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

#### Smart Contracts (Ethereum Testnet)

1. **Deploy to Sepolia testnet**
   ```bash
   cd smart_contract
   npx hardhat run scripts/deploy.js --network sepolia
   ```

## 📱 Usage

### Getting Started

1. **Install MetaMask** and create/import a wallet
2. **Get test ETH** from Sepolia faucet (for testing)
3. **Connect your wallet** using the "Connect Wallet" button
4. **Start sending transactions** and track your portfolio

### Key Features

- **Portfolio Overview**: View total portfolio value, ETH balance, and transaction count
- **Price Tracking**: Monitor real-time prices for major cryptocurrencies
- **Send Transactions**: Transfer ETH to other addresses with custom messages
- **Transaction History**: View all your past transactions with detailed information
- **Price Charts**: Analyze price trends with interactive charts

## 🏗️ Project Structure

```
CryptoPortfolio_App/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── ...
│   ├── public/
│   └── ...
├── smart_contract/         # Solidity backend
│   ├── contracts/         # Smart contracts
│   ├── scripts/           # Deployment scripts
│   ├── test/              # Contract tests
│   └── ...
└── README.md
```

## 🔧 Smart Contract

The application uses a custom Ethereum smart contract for:
- Recording transactions on the blockchain
- Storing transaction metadata (sender, receiver, amount, message)
- Maintaining transaction count and history

### Contract Functions

- `addToBlockchain()` - Add a new transaction
- `getAllTransactions()` - Retrieve all transactions
- `getTransactionCount()` - Get total transaction count

## 🎨 Design Features

- **Glassmorphism Effects**: Modern glass-like UI elements
- **Gradient Backgrounds**: Dynamic color gradients
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton loaders and spinners
- **Hover Animations**: Interactive element transitions
- **Card-based Layout**: Clean, organized information display

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading for optimal performance
- **API Caching**: Efficient data fetching and storage
- **Optimized Images**: Compressed and optimized assets
- **Bundle Optimization**: Minimized bundle size

## 🔒 Security Features

- **MetaMask Integration**: Secure wallet connection
- **Input Validation**: Form validation and error handling
- **Smart Contract Security**: Secure transaction handling
- **Environment Variables**: Sensitive data protection

## 🌟 Future Enhancements

- [ ] Multi-token support (ERC-20 tokens)
- [ ] Advanced portfolio analytics
- [ ] Price alerts and notifications
- [ ] Social features and portfolio sharing
- [ ] DeFi integration (swaps, lending)
- [ ] Mobile app development
- [ ] Advanced charting with TradingView
- [ ] Portfolio performance tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Bimal Kumar**
- GitHub: [@Bimal2002](https://github.com/Bimal2002)
- LinkedIn: [Bimal Kumar](https://linkedin.com/in/bimal-kumar)

## 🙏 Acknowledgments

- [CoinGecko](https://coingecko.com) for cryptocurrency price data
- [Ethereum](https://ethereum.org) for blockchain infrastructure
- [MetaMask](https://metamask.io) for wallet integration
- [Tailwind CSS](https://tailwindcss.com) for styling framework
- [React](https://reactjs.org) for the frontend framework

---

⭐ **Star this repository** if you found it helpful!

📧 **Questions?** Feel free to reach out or open an issue.

## Overview

The Crypto Portfolio App is a decentralized finance application that enables users to manage their cryptocurrency portfolio, view transaction history, and perform transactions on the Ethereum blockchain. Built with React and integrated with Ethereum, this app provides a comprehensive platform for cryptocurrency enthusiasts.

## Live Demo: https://crypto-portfolio-app-ysll.vercel.app/

## Features

- **Connect Wallet**: Connect your Ethereum wallet using MetaMask.
- **Manage Portfolio**: View and manage your cryptocurrency holdings.
- **Send Transactions**: Send Ethereum to any address with an optional message.
- **Transaction History**: View a list of recent transactions.
- **Responsive Design**: Fully responsive design for desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Blockchain**: Ethereum
- **Local Blockchain Development**: Hardhat (Node.js 18.12.1)

## Prerequisites

Make sure you have the following installed:

- **Node.js**: Version 18.12.1
- **npm**: Version 8.19.2
- **MetaMask**: Browser extension for Ethereum wallet management

## Installation

### Setup Node.js and npm

1. **Install Node.js**:

   Download and install Node.js version 18.12.1 from the [Node.js official website](https://nodejs.org/en/download/releases/).

2. **Install npm**:

   Ensure you have npm version 8.19.2 installed. If not, install it using:

   ```bash
   npm install -g npm@8.19.2




## git clone

git clone https://github.com/Bimal2002/CryptoPortfolio_App.git
cd CryptoPortfolio_App

## For Client
npm install

## For Local blockchain
npm install --save-dev hardhat
