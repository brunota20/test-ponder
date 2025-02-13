import { createConfig } from "ponder";
import { http } from "viem";
import { contractAbi } from "./abis/contractAbi";

export default createConfig({
  networks: {
    sepolia: {
      chainId: 11155111,
      transport: http(process.env.PONDER_RPC_URL_1 || ""),
    },
  },
  contracts: {
    DeliveryTracker: {
      network: "sepolia",
      abi: contractAbi,
      address: "0x441A32f04FC43E1AEf137DcBE3AFEd92D45A5E7b",
    },
  },
});
