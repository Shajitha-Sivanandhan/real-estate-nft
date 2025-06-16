import React, { useState } from "react";
import { getContract } from "../utils/contract";

const TransferForm = () => {
  const [tokenId, setTokenId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState("");

  const handleTransfer = async () => {
    setStatus("⏳ Transferring NFT...");

    try {
      const contract = getContract();
      const sender = await contract.signer.getAddress();

      console.log("🔑 From:", sender);
      console.log("📦 Token ID:", tokenId);
      console.log("📥 To:", recipient);

      const tx = await contract.transferProperty(sender, recipient, tokenId);
      await tx.wait();

      setStatus(`✅ NFT with ID ${tokenId} transferred to ${recipient}`);
    } catch (err) {
      console.error("❌ Transfer failed:", err);
      setStatus("❌ Transfer failed. Check console & try again.");
    }
  };

  return (
    <div style={{
      marginTop: "2rem",
      padding: "1.5rem",
      backgroundColor: "#fafafa",
      borderRadius: "12px",
      border: "1px solid #e0e0e0",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
    }}>
      <h2>🔁 Transfer NFT</h2>

      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleTransfer} style={buttonStyle}>
        Transfer NFT
      </button>

      <p style={{ color: status.startsWith("❌") ? "red" : "green", marginTop: "1rem" }}>
        {status}
      </p>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem"
};

const buttonStyle = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default TransferForm;
