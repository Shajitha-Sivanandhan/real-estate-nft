const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const contractAddress = "0x5244922178e8755A7b65594366818Acd1B721b9E"; // ✅ NEW Amoy Contract

  const realEstateNFT = await hre.ethers.getContractAt("RealEstateNFT", contractAddress);

  const tokenURI = "ipfs://QmTk4vNRBtN23FFagB4pbhczobQc9uCRTARoQud2hz9cDt"; // 👈 sample CID or any string for now

  const tx = await realEstateNFT.mintPropertyNFT(deployer.address, tokenURI);
  await tx.wait();

  console.log(`🏡 NFT Minted to: ${deployer.address}`);
  console.log(`📎 Token URI: ${tokenURI}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
