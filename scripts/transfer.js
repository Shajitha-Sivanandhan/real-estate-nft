const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x5244922178e8755A7b65594366818Acd1B721b9E"; // ✅ your latest deployed contract
  const tokenId = 0; // ✅ update this if you’re transferring a different NFT ID

  const [sender] = await ethers.getSigners(); // only get the sender from .env or default
  const recipientAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // ✅ update with recipient (can be same wallet for demo)

  console.log("🔑 Sender:", sender.address);
  console.log("📥 Recipient:", recipientAddress);

  const abi = [
    "function transferFrom(address from, address to, uint256 tokenId) public"
  ];

  const contract = new ethers.Contract(contractAddress, abi, sender);

  const tx = await contract.transferFrom(sender.address, recipientAddress, tokenId);
  await tx.wait();

  console.log(`✅ NFT with tokenId ${tokenId} transferred to ${recipientAddress}`);
}

main().catch((error) => {
  console.error("❌ Transfer failed:", error);
  process.exitCode = 1;
});
