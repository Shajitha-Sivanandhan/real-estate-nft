import React, { useState } from "react";
import { getContract } from "../utils/contract";

const TransferForm = () => {
  const [tokenId, setTokenId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!tokenId || !recipient) {
      setStatus("❌ Token ID and Recipient are required.");
      return;
    }

    setLoading(true);
    setStatus("⏳ Transferring NFT...");

    try {
      const contract = await getContract();
      const sender = await contract.signer.getAddress();

      const tx = await contract.transferFrom(sender, recipient, Number(tokenId));
      await tx.wait();

      setStatus(`✅ NFT with ID ${tokenId} transferred to ${recipient}`);
    } catch (err) {
      console.error("❌ Transfer failed:", err);
      setStatus("❌ Transfer failed. Check console & try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
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
      <button onClick={handleTransfer} style={buttonStyle} disabled={loading}>
        {loading ? "Transferring..." : "Transfer NFT"}
      </button>
      <p style={{ color: status.startsWith("❌") ? "red" : "green", marginTop: "1rem" }}>
        {status}
      </p>
    </div>
  );
};

const containerStyle = {
  marginTop: "2rem",
  padding: "1.5rem",
  backgroundColor: "#fafafa",
  borderRadius: "12px",
  border: "1px solid #e0e0e0",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
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
