import { useAccount } from "wagmi";
import { ConnectButton } from "./connect-button";
import { Account } from "./account";

export const ConnectWallet = () => {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <ConnectButton />;
};
