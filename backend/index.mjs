console.log("🔥 Server booting up");

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

// 🔥 Test route
app.get("/", (req, res) => {
  res.send("🔥 Hello from baby-backend!");
});

// 📦 Upload metadata using Pinata REST API
app.post("/uploadMetadata", async (req, res) => {
  const metadata = req.body;
  console.log("🧾 Incoming metadata:", metadata);

  if (!metadata.name || !metadata.image) {
    return res.status(400).json({ error: "Metadata must include 'name' and 'image'" });
  }

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY
        }
      }
    );

    console.log("📦 Metadata pinned:", response.data.IpfsHash);
    res.json({
      cid: response.data.IpfsHash,
      uri: `ipfs://${response.data.IpfsHash}`
    });
  } catch (err) {
    console.error("❌ Pinata Upload Failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to upload metadata to Pinata" });
  }
});

const PORT = process.env.PORT || 5055;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

setInterval(() => {}, 1 << 30);
