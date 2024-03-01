/* eslint-disable @typescript-eslint/no-var-requires */
require('@nomicfoundation/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: '0.8.24',
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [process.env.HARDHAT_PRIVATE_KEY],
    },
  },
  paths: {
    sources: './contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};
