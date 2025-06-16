const pinataSDK = require('@pinata/sdk');
const { ethers } = require('ethers');

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

// 📦 Upload metadata to IPFS with validation
exports.uploadMetadata = async (req, res) => {
  const metadata = req.body;
  console.log("🧾 Incoming metadata:", metadata); //newly added

  // ✅ Input validation
  if (!metadata.name || !metadata.image) {
    return res.status(400).json({ error: "Metadata must include 'name' and 'image' fields." });
  }

  try {
    const result = await pinata.pinJSONToIPFS(metadata);
    res.status(200).json({ cid: result.IpfsHash, uri: `ipfs://${result.IpfsHash}` });
  } catch (err) {
    console.error("❌ IPFS upload failed:", err.message);
    res.status(500).json({ error: "Failed to upload metadata to IPFS." });
  }
};

// 🏡 Mint NFT with input validation and error logging
exports.mintNFT = async (req, res) => {
  const { to, tokenURI } = req.body;

  // ✅ Input validation
  if (!to || !tokenURI) {
    return res.status(400).json({ error: "Missing required fields: 'to' address and 'tokenURI'." });
  }

  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const abi = [
      "function mintPropertyNFT(address to, string memory tokenURI) public"
    ];

    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

    const tx = await contract.mintPropertyNFT(to, tokenURI);
    await tx.wait();

    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("❌ Minting failed:", err.message);
    res.status(500).json({ error: "Failed to mint NFT on blockchain." });
  }
};
