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
        className=" px-4 py-2 bg-[#5673FE] rounded-xl hover:text-white hover:bg-gray-800 transition ease-out duration-300"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
};
