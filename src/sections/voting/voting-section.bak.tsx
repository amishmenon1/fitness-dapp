// type Props = {};

import cardioGif from "@/assets/cardio.gif";
import weightliftingGif from "@/assets/weightlifting.gif";
import Card from "@/components/card";
import { useVotingContract } from "@/hooks/useVotingContract";
import { BaseError, useAccount, useWriteContract } from "wagmi";
import { VOTING_ABI as abi } from "@/abi/VotingData";
import { sepolia } from "viem/chains";

const VotingSection = () => {
  const { isConnected } = useAccount();

  const { data, error, isPending, refetch } = useVotingContract();
  const { data: hash, writeContract } = useWriteContract();
  const [cardioVotes, weightliftingVotes] = data || [];

  /**
   * Places a vote.
   * @param event The button click event.
   */
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const isWeightlifting = event.currentTarget.value === "Weightlifting";
    const functionName = isWeightlifting ? "voteWeightlifting" : "voteCardio";
    try {
      writeContract(
        {
          abi,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          address: import.meta.env.VITE_VOTING_CONTRACT_SEPOLIA,
          functionName: functionName, //"transferFrom",
          chainId: sepolia.id,
        },
        {
          onSuccess: async (response) => {
            console.log("Successfully voted. Response: ", response);
            console.log("Hash: ", hash);
            console.log("Refetching votes...");
            await refetch();
          },
          onSettled: (response) => {
            console.log("Settled. Response: ", response);
          },
          onError: (error) => {
            console.error("Error voting: ", error);
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  if (error)
    return (
      <div>Error: {(error as BaseError).shortMessage || error.message}</div>
    );

  return (
    <section
      id="voting-card-container"
      className=" h-full flex flex-col items-center justify-center"
    >
      <div className=" h-50 flex w-full justify-between px-20 gap-10 ">
        <Card
          image={cardioGif}
          CardTitle="Cardio"
          onBtnClick={handleClick}
          // CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
          btnText="Vote!"
          btnValue="Cardio"
          disabled={isPending || !isConnected}
        />
        <div className=" w-96 h-full overflow-hidden rounded-lg bg-gray-600 shadow-lg duration-300 hover:shadow-3">
          {isPending ? (
            <div>
              <h2 className="text-4xl text-white text-center p-8">
                Loading Score...
              </h2>
            </div>
          ) : (
            <div>
              <h2 className="text-4xl text-white text-center p-8">Score</h2>
              <div className="flex flex-col items-center justify-center p-8">
                <h5 className="text-2xl text-white">
                  Cardio: {cardioVotes?.result?.toString()}
                </h5>
                <h5 className="text-2xl text-white">
                  Weightlifting:{weightliftingVotes?.result?.toString()}
                </h5>
              </div>
            </div>
          )}
        </div>
        <Card
          image={weightliftingGif}
          CardTitle="Weightlifting"
          onBtnClick={handleClick}
          // CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
          btnText="Vote!"
          btnValue="Weightlifting"
          disabled={isPending || !isConnected}
        />
      </div>
    </section>
  );
};

export default VotingSection;
