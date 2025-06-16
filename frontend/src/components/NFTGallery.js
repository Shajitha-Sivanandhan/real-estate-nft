/*import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import axios from "axios";

const NFTGallery = ({ userAddress }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const contract = getContract();
        const maxSupply = await contract.nextTokenId(); // total NFTs ever minted
        const owned = [];

        for (let i = 0; i < maxSupply; i++) {
          const owner = await contract.ownerOf(i);
          if (owner.toLowerCase() === userAddress.toLowerCase()) {
            const tokenURI = await contract.tokenURI(i);

            const ipfsURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            const metadata = await axios.get(ipfsURL);

            owned.push({
              tokenId: i,
              name: metadata.data.name,
              image: metadata.data.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
              description: metadata.data.description,
            });
          }
        }

        setNfts(owned);
      } catch (err) {
        console.error("❌ Failed to fetch NFTs:", err);
      }
    };

    if (userAddress) {
      fetchNFTs();
    }
  }, [userAddress]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>🏞️ My Property NFTs</h2>
      {nfts.length === 0 ? (
        <p>No NFTs found for this wallet.</p>
      ) : (
        <div style={gridStyle}>
          {nfts.map((nft) => (
            <div key={nft.tokenId} style={cardStyle}>
              <img src={nft.image} alt={nft.name} style={{ width: "100%", borderRadius: "10px" }} />
              <h3>🏷️ {nft.name}</h3>
              <p>🆔 Token ID: <strong>{nft.tokenId}</strong></p>
              <p>{nft.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "1.5rem",
  marginTop: "1rem",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "1rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

export default NFTGallery;
*/