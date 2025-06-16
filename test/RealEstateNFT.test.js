const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RealEstateNFT", function () {
  let RealEstateNFT, realEstateNFT, owner, user1, user2;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    RealEstateNFT = await ethers.getContractFactory("RealEstateNFT");
    realEstateNFT = await RealEstateNFT.deploy();
    await realEstateNFT.waitForDeployment();
  });

  it("Should allow admin to mint NFT", async () => {
    await realEstateNFT.mintPropertyNFT(owner.address, "ipfs://property1.json");

    expect(await realEstateNFT.ownerOf(0)).to.equal(owner.address);
    expect(await realEstateNFT.tokenURI(0)).to.equal("ipfs://property1.json");
  });

  it("Should NOT allow non-owner to mint", async () => {
    await expect(
        realEstateNFT.connect(user1).mintPropertyNFT(user1.address, "ipfs://property2.json")
      ).to.be.revertedWithCustomError(realEstateNFT, "OwnableUnauthorizedAccount");      
  });

  it("Should allow owner to transfer NFT", async () => {
    await realEstateNFT.mintPropertyNFT(owner.address, "ipfs://property3.json");
    await realEstateNFT.transferProperty(owner.address, user1.address, 0);

    expect(await realEstateNFT.ownerOf(0)).to.equal(user1.address);
  });

  it("Should NOT allow non-owner to transfer NFT", async () => {
    await realEstateNFT.mintPropertyNFT(owner.address, "ipfs://property4.json");

    await expect(
      realEstateNFT.connect(user1).transferProperty(owner.address, user2.address, 0)
    ).to.be.revertedWith("Not approved or owner");
  });
});
