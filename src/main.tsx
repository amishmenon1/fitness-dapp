import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi";
import { wagmiConfig } from "./wagmi.config.ts";
import { WagmiProvider } from "wagmi";
import { BrowserRouter } from "react-router-dom";
import Web3ModalProvider from "./contexts/web3modal-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3ModalProvider>
  </React.StrictMode>
);
