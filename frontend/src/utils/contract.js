import { ethers } from "ethers";
import contractJson from "./abi.json";
const abi = contractJson.abi;


const CONTRACT_ADDRESS = "0x5244922178e8755A7b65594366818Acd1B721b9E";

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
};
