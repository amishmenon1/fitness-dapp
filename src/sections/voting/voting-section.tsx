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
  //@ts-ignore
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
            console.log("Successfully voted. Hash: ", response);
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
          titleHref="/#"
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
            <div className="bg-gray-100 h-full shadow-lg rounded-lg overflow-hidden">
              <h2 className="text-4xl text-gray-300 text-center bg-gradient-to-r from-black to-gray-400 font-bold py-4">
                Score
              </h2>
              <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <div className="bg-white w-full py-4 rounded-md text-center shadow-md">
                  <h5 className="text-2xl text-gray-800 font-light">
                    Cardio: {cardioVotes?.result?.toString()}
                  </h5>
                </div>
                <div className="bg-white w-full py-4 rounded-md text-center shadow-md">
                  <h5 className="text-2xl text-gray-800 font-light">
                    Weightlifting: {weightliftingVotes?.result?.toString()}
                  </h5>
                </div>
              </div>
            </div>
          )}
        </div>
        <Card
          image={weightliftingGif}
          CardTitle="Weightlifting"
          titleHref="/#"
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
