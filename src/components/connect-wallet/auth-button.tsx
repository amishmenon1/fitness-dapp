import { useAccount } from "wagmi";
import { ConnectButton } from "./connect-button";
import { Account } from "./account";

export const AuthButton = () => {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <ConnectButton />;
};
