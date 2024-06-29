import { useDisconnect } from "wagmi";

export const Account = () => {
  // const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <button
        className=" px-4 py-1.5 bg-gradient-to-l from-blue-gray-800 to-gray-600 rounded-xl hover:text-white hover:bg-gray-800 transition ease-out duration-300"
        // onClick={logout}
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
};
