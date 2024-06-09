import {
  // useAccount,
  useDisconnect,
  // useEnsAvatar, useEnsName
} from "wagmi";

export const Account = () => {
  // const { address } = useAccount();
  const { disconnect } = useDisconnect();
  // const { data: ensName } = useEnsName({ address });
  // const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {/* {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>} */}
      <button
        className=" px-[16px] py-2 bg-[#5673FE] rounded-[28px]"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
};
