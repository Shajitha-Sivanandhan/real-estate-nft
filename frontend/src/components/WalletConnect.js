import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ onConnect }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        onConnect(accounts[0]);
      } catch (err) {
        console.error("🛑 Wallet connection error:", err);
      }
    } else {
      alert("Please install MetaMask to use this dApp");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        onConnect(accounts[0]);
      });
    }
  }, []);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={connectWallet}>
        {account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "🦊 Connect MetaMask"}
      </button>
    </div>
  );
};

export default WalletConnect;
