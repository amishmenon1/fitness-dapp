import cardioGif from "@/assets/cardio.gif";
import weightliftingGif from "@/assets/weightlifting.gif";
import Card from "@/components/card";
import { useVotingContract } from "@/hooks/useVotingContract";
import { useAccount, useWriteContract } from "wagmi";
import { VOTING_ABI as abi } from "@/abi/VotingData";
import { sepolia } from "viem/chains";

const VotingSection = () => {
  const { isConnected } = useAccount();

  const { isPending, refetch } = useVotingContract();
  const {
    data: hash,
    writeContract,
    error: writeError,
    isError,
  } = useWriteContract();

  if (writeError) {
    console.error("write error: ", writeError);
    console.error("is error: ", isError);
  }
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

  return (
    <section id="voting-card-container" className=" flex flex-col gap-8">
      <div className=" flex sm:justify-between justify-center gap-4 xs:gap-10">
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
