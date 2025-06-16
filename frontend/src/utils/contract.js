import { ethers } from "ethers";
import contractJson from "./abi.json";
const abi = contractJson.abi;

const CONTRACT_ADDRESS = "0x5244922178e8755A7b65594366818Acd1B721b9E";

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
};
