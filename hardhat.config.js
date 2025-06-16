require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 50_000_000_000, // 50 gwei
      maxFeePerGas: 100_000_000_000, // 100 gwei
      maxPriorityFeePerGas: 50_000_000_000, // 50 gwei
    },
  },
};


