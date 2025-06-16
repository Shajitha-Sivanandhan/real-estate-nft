require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 50_000_000_000,
      maxFeePerGas: 100_000_000_000,
      maxPriorityFeePerGas: 50_000_000_000,
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: "Y9FKCX38P1RMKMRU1M9HVSD5D728UKUQQ8", // 💥 Replace with real one
    },
  },
};
