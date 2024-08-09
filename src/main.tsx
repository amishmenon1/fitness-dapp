import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Web3ModalProvider from "./contexts/web3modal-provider.tsx";
import { serviceWorker } from "./msw/browser.ts";

const root = ReactDOM.createRoot(
  document.getElementById("root")! as HTMLElement
);

async function enableMocking() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const enableMocking = import.meta.env.VITE_ENABLE_MSW === "true";

  // eslint-disable-next-line no-extra-boolean-cast
  if (!enableMocking) {
    console.log("Mocking disabled");
    return;
  } else {
    // // @ts-ignore
    // const { serviceWorker } = await import("./msw/worker.ts");

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    // @ts-ignore
    return serviceWorker.start();
  }
}

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <Web3ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Web3ModalProvider>
    </React.StrictMode>
  );
});
