// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RealEstateNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    event PropertyMinted(address to, uint256 tokenId, string tokenURI);
    event PropertyTransferred(address from, address to, uint256 tokenId);

    constructor() ERC721("Real Estate NFT", "REALE") Ownable(msg.sender) {}

    function mintPropertyNFT(address to, string memory tokenURI_) public {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        emit PropertyMinted(to, tokenId, tokenURI_);
        nextTokenId++;
    }

    function transferProperty(address from, address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved or owner");
        _transfer(from, to, tokenId);
        emit PropertyTransferred(from, to, tokenId);
    }

    function getOwner(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = ownerOf(tokenId);
        return (
            spender == owner ||
            getApproved(tokenId) == spender ||
            isApprovedForAll(owner, spender)
        );
    }

    // ✅ Only this override is needed now
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
