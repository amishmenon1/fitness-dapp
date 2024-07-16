import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi";
import { wagmiConfig } from "./wagmi.config.ts";
import { WagmiProvider } from "wagmi";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/pages/playground/redux/state/store";

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
    "--w3m-accent": "green", //"linear-gradient(to left, #000, #FFF)", //"#ff6347", // Tomato color
    // '--w3m-color-mix': '#ff6347',
    // '--w3m-color-mix-strength': '50%',
    // '--w3m-font-size-master': '16px',
    // '--w3m-border-radius-master': '10px',
    // '--w3m-z-index': '1000'
  },
});

interface Web3ModalProviderProps {
  children: React.ReactNode;
}
export function Web3ModalProvider({ children }: Web3ModalProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Web3ModalProvider>
    </Provider>
  </React.StrictMode>
);
