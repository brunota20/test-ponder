import { createConfig } from "ponder";
import { http } from "viem";
import { contractAbi } from "./abis/contractAbi";

export default createConfig({
  networks: {
    holesky: {
      chainId: 17000,
      transport: http(process.env.PONDER_RPC_URL_1 || ""),
    },
  },
  contracts: {
    DeliveryTracker: {
      network: "holesky",
      abi: contractAbi,
      address: "0x044d30874894c8ce2BC1D04A38bDaeF1eC1bFf71",
    },
  },
});
