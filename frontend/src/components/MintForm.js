import React, { useState } from "react";
import axios from "axios";
import { getContract } from "../utils/contract";

const MintForm = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    if (!name || !desc || !cid) {
      setStatus("❌ All fields are required.");
      return;
    }

    setLoading(true);
    setStatus("⏳ Minting in progress...");

    try {
      const metadata = {
        name,
        description: desc,
        image: `ipfs://${cid}`,
        attributes: [],
      };

      const res = await axios.post("http://localhost:5055/uploadMetadata", metadata);
      const tokenURI = res?.data?.uri;
      if (!tokenURI) throw new Error("tokenURI not received from server");

      const contract = await getContract();
      window.debugContract = contract; // ✅ DEBUG HELPER

      const signerAddress = await contract.signer.getAddress();
      console.log("👀 Minting to:", signerAddress);
      console.log("📦 tokenURI:", tokenURI);

      const tx = await contract.mintPropertyNFT(signerAddress, tokenURI);
      console.log("📤 Transaction sent. Waiting for confirmation...");
      const receipt = await tx.wait();

      const tokenId = receipt?.events?.[0]?.args?.tokenId?.toString();
      if (!tokenId) throw new Error("tokenId not found in transaction receipt");

      console.log("🔥 Minted Token ID:", tokenId);
      setStatus(`✅ NFT Minted! Token ID: ${tokenId} | TxHash: ${tx.hash}`);
    } catch (err) {
      console.error("❌ Minting error:", err);
      setStatus(`❌ Minting failed: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>🧾 Mint Property NFT</h2>
      <input
        type="text"
        placeholder="Property Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Property Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{ ...inputStyle, height: "100px" }}
      />
      <input
        type="text"
        placeholder="IPFS CID (image only)"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleMint} style={buttonStyle} disabled={loading}>
        {loading ? "Minting..." : "Mint NFT"}
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
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default MintForm;
