require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/_S3MWqu_DSlcBmxgPzVZVdpPUNvLQH-E',
      accounts: ['0509c43e55c56806b4eacec05b7a2572a3b4052991a840a6c221260abe4056ef'],
    },
  },
};