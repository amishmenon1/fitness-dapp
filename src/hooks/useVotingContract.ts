import { useReadContracts } from "wagmi";
import { sepolia } from "wagmi/chains";
import { VOTING_ABI as abi } from "@/abi/VotingData";

export const useVotingContract = () => {
  const votingContract = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    address: import.meta.env.VITE_VOTING_CONTRACT_SEPOLIA,
    abi,
  } as const;

  const result = useReadContracts({
    contracts: [
      {
        ...votingContract,
        functionName: "cardioVotes",
        chainId: sepolia.id,
      },
      {
        ...votingContract,
        functionName: "weightliftingVotes",
        chainId: sepolia.id,
      },
      // {
      //   ...votingContract,
      //   functionName: "voteWeightlifting",
      // },
      // {
      //   ...votingContract,
      //   functionName: "voteCardio",
      // },
    ],
  });

  return result;
};
