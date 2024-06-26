import Card from "@/components/card";
import { useAccount } from "wagmi";
import { VOTING_ABI as abi } from "@/abi/VotingData";
import { sepolia } from "viem/chains";
import { useContext } from "react";
import { FitnessCard, cards } from "@/data/cards";
import { ContractContext } from "@/contexts/contract-context";

const VotingSection = () => {
  const { isConnected } = useAccount();
  const { contractState, setContractState, writeContract } =
    useContext(ContractContext);
  const {
    writeStatus, // 'idle' | 'pending' | 'error' | 'success'
  } = contractState;

  /**
   * Places a vote.
   * @param event The button click event.
   */
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setContractState({ ...contractState, writeStatus: "started" });

    const isWeightlifting = event.currentTarget.value === "Weightlifting";
    const functionName = isWeightlifting ? "voteWeightlifting" : "voteCardio";
    try {
      writeContract(
        {
          abi,
          // @ts-expect-error
          address: import.meta.env.VITE_VOTING_CONTRACT_SEPOLIA,
          functionName: functionName, //"transferFrom",
          chainId: sepolia.id,
        },
        {
          onSuccess: (response: any) => {
            console.log("Write success: ", response);
            setContractState({ ...contractState, writeStatus });
          },
          onSettled: async (response: any) => {
            console.log("Settled. Response: ", response);
            console.log("Refetching transaction...");

            setContractState({ ...contractState, writeStatus });
          },
          onError: (error: any) => {
            console.log("Error writing contract: ", error);
            setContractState({
              ...contractState,
              writeStatus: "error",
              writeErrorMsg: error?.message,
            });
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section id="voting-card-container" className=" flex flex-col gap-8">
      <div className="flex flex-col">
        <div className="relative flex-col xs:flex-row flex justify-between overflow-y-scroll gap-4 px-4 xs:px-0">
          {cards.map((card: FitnessCard) => (
            <Card
              key={card.cardTitle}
              image={card.image}
              CardTitle={card.cardTitle}
              titleHref={card.titleHref}
              onBtnClick={handleClick}
              btnText={
                ["pending", "started"].includes(writeStatus)
                  ? "Voting..."
                  : "Vote!"
              }
              // btnText={voteButtonText()}
              btnValue={card.btnValue}
              disabled={
                ["pending", "started"].includes(writeStatus) || !isConnected
              }
              gradiantDirection={card.gradiantDirection}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VotingSection;
