// import { createWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnect } from "wagmi/connectors";
import { createConfig, http } from "wagmi";
import { bsc, bscTestnet, mainnet, sepolia } from "wagmi/chains";

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
// 1. Get projectId at https://cloud.walletconnect.com
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("Missing projectId");
}
// 2. Create wagmiConfig
export const wagmiConfig = createConfig({
  chains: [bsc, bscTestnet, sepolia, mainnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: projectId, //'f18c88f1b8f4a066d3b705c6b13b71a8',
    }),
  ],
});
