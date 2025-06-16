const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying from:", deployer.address);


  const RealEstateNFT = await hre.ethers.getContractFactory("RealEstateNFT");
  const realEstateNFT = await RealEstateNFT.deploy();

  await realEstateNFT.waitForDeployment();

  console.log(`✅ Contract deployed to: ${realEstateNFT.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

