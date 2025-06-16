require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

async function uploadJSON() {
  const metadata = fs.readFileSync(path.join(__dirname, "../metadata/property1.json"));

  const result = await pinata.pinJSONToIPFS(JSON.parse(metadata));
  console.log("📦 Metadata pinned successfully!");
  console.log("🆔 CID:", result.IpfsHash);
  console.log("🔗 URI:", `ipfs://${result.IpfsHash}`);
}

uploadJSON().catch(console.error);


