import Card from "@/components/card";
import { useAccount } from "wagmi";
import { VOTING_ABI as abi } from "@/abi/VotingData";
import { sepolia } from "viem/chains";
import { useContext } from "react";
import { FitnessCard, cards } from "@/data/cards";
import { ContractContext } from "@/contexts/contract-context";
import { CONTRACT_STATUSES } from "@/data/statuses";

const VotingSection = () => {
  const { isConnected } = useAccount();
  const { contractState, setContractState, writeContract } =
    useContext(ContractContext);
  const {
    writeStatus, // 'idle' | 'pending' | 'error' | 'success'
  } = contractState;
  const { WRITE_STARTED } = CONTRACT_STATUSES;

  /**
   * Places a vote.
   * @param event The button click event.
   */
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setContractState({
      ...contractState,
      writeStatus: WRITE_STARTED.message,
      writeErrorMsg: "",
    });

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
          onSuccess: (_response: any) => {
            setContractState({ ...contractState, writeStatus });
          },
          onSettled: async (_response: any) => {
            setContractState({ ...contractState, writeStatus });
          },
          onError: (error: any) => {
            console.error("Error writing contract: ", error);
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
              cardTitle={card.cardTitle}
              titleHref={card.titleHref}
              onBtnClick={handleClick}
              btnText={
                ["pending", "started"].includes(writeStatus)
                  ? "Voting..."
                  : "Vote!"
              }
              // btnText={voteButtonText()}
              btnValue={card.value}
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
