import { wagmiConfig } from "@/wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi";
import React from "react";
import { WagmiProvider } from "wagmi";

interface Web3ModalProviderProps {
  children: React.ReactNode;
}
const Web3ModalProvider = ({ children }: Web3ModalProviderProps) => {
  const queryClient = new QueryClient();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

  // 3. Create modal
  createWeb3Modal({
    wagmiConfig, //: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
    themeMode: "light",
    themeVariables: {
      "--w3m-font-family": "Arial, sans-serif",
      "--w3m-accent": "green",
    },
  });

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3ModalProvider;
