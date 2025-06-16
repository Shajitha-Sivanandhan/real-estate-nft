import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import MintForm from "./components/MintForm";
import TransferForm from "./components/TransferForm";
//import NFTGallery from "./components/NFTGallery";

function App() {
  const [userAddress, setUserAddress] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "2rem 3rem",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#2c3e50" }}>
          🏡 Real Estate NFT dApp
        </h1>

        <WalletConnect onConnect={setUserAddress} />

        {userAddress && (
          <>
            <p style={{ textAlign: "center", color: "#27ae60" }}>
              💼 Wallet Connected: {userAddress}
            </p>

            <MintForm userAddress={userAddress} />
            <TransferForm />
          
          </>
        )}
      </div>
    </div>
  );
}

export default App;
