import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Web3ModalProvider from "./contexts/web3modal-provider.tsx";
import {
  render,
  screen,
  // userEvent
} from "./test/test-utils.ts";

/**
 Alternate solution - Instead of having a setup.ts file in src/test that imports @testing-library/jest-dom, 
 we can import the matchers from jest-dom directly and extend the "expect" object with the matchers

 import matchers from "@testing-library/jest-dom";
 expect.extend(matchers);
 
 **/

it("Should show Connect Wallet button", () => {
  render(
    <Web3ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3ModalProvider>
  );
  const connectButton = screen.getByTestId("connect-wallet");
  expect(connectButton).toBeVisible();
});

// it("Should show Disconnect button after login", async () => {
//   render(
//     <Web3ModalProvider>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Web3ModalProvider>
//   );
//   const connectButton = screen.getByTestId("connect-wallet");
//   expect(connectButton).toBeVisible();
//   userEvent.click(connectButton);
//   expect(await screen.findByTestId("connect-wallet")).not.toBeVisible();
// });
