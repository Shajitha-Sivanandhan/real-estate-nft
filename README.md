#  RealEstateNFT - Decentralized Property Ownership System

A decentralized dApp for minting, viewing, and transferring real estate ownership as NFTs — built using Solidity, React, IPFS, and Polygon Amoy Testnet.

---

##  Tech Stack

- **Frontend**: React.js, Ethers.js, MetaMask
- **Backend**: Node.js, Express.js
- **Smart Contracts**: Solidity (ERC-721), Hardhat
- **Storage**: IPFS via Pinata
- **Blockchain**: Polygon Amoy Testnet

---

##  Features

- Mint property NFTs with metadata (name, description, IPFS image)  
- Transfer property NFTs securely to another wallet  
- MetaMask integration  
- Smart Contract + IPFS + REST API + Frontend synced seamlessly

---

##  Project Screenshots


###  Wallet connect
<img width="1434" alt="Screenshot 2025-06-16 at 9 37 44 PM" src="https://github.com/user-attachments/assets/e59345af-f5c8-4093-8dd3-cb5519f2b3c0" />
<img width="1440" alt="Screenshot 2025-06-16 at 9 37 51 PM" src="https://github.com/user-attachments/assets/802b91bb-16cf-4751-bc09-2da63b279961" />


###  Minting Screen
<img width="1434" alt="Screenshot 2025-06-16 at 9 38 02 PM" src="https://github.com/user-attachments/assets/b4ccb96c-20ae-4459-8fc5-885c04c534d7" />
<img width="1434" alt="Screenshot 2025-06-16 at 9 37 11 PM" src="https://github.com/user-attachments/assets/a9e8ce94-c63c-44a4-8e76-a81966c92087" />


###  Tranfer done
<img width="1434" alt="Screenshot 2025-06-16 at 9 37 24 PM" src="https://github.com/user-attachments/assets/435464c1-54be-4628-a0af-13c5b6e7090b" />


###  Transaction live on PolygonScan
<img width="1434" alt="Screenshot 2025-06-16 at 9 38 48 PM" src="https://github.com/user-attachments/assets/1d9ee56c-4305-4ba3-a1e3-8096db6913ed" />



---

##  Smart Contract

```solidity
Contract Address: `0x5244922178e8755A7b65594366818Acd1B721b9E`  
Deployed on: Polygon Amoy Testnet  
```



---

##  Project Structure

```
real-estate-nft/
│
├── backend/
│   ├── index.mjs                 # Express server with Pinata upload route
│   ├── .env                      # Environment variables
│   ├── package.json              # Backend dependencies
│
├── contracts/
│   └── RealEstateNFT.sol         # ERC-721 Smart Contract
│
├── scripts/
│   ├── deploy.js                 # Script to deploy contract
│   ├── mint.js                   # Script to mint NFTs manually
│   └── transfer.js               # Script to transfer NFTs manually
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletConnect.js  # MetaMask connect button
│   │   │   ├── MintForm.js       # Form to mint property NFTs
│   │   │   ├── TransferForm.js   # Form to transfer NFTs
│   │   │   └── NFTGallery.js     # Gallery to view owned NFTs
│   │   ├── utils/
│   │   │   └── contract.js       # Contract connection utility
│   │   ├── App.js                # Main UI container
│   │   └── index.js              # Entry point
│   ├── package.json              # Frontend dependencies
│
└── README.md                     # Project documentation
```


---
