import Card from "@/components/card";
import { useAccount } from "wagmi";
import { VOTING_ABI as abi } from "@/abi/VotingData";
import { sepolia } from "viem/chains";
import { useContext } from "react";
import { FITNESS_OPTIONS, FitnessCard, cards } from "@/data/cards";
import { ContractContext } from "@/contexts/contract-context";
import { CONTRACT_STATUSES, ERROR_STATUSES } from "@/data/statuses";

const VotingSection = () => {
  // console.log("voting rendered");
  const { isConnected } = useAccount();
  const { contractState, setContractState, writeContract } =
    useContext(ContractContext);
  const {
    writeStatus, // 'idle' | 'pending' | 'error' | 'success'
  } = contractState;

  const { WRITE_STARTED } = CONTRACT_STATUSES;
  const { WRITE_ERROR } = ERROR_STATUSES;

  /**
   * Places a vote.
   * @param event The button click event.
   */
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const votedWeightlifting =
      event.currentTarget.value === FITNESS_OPTIONS.weightlifting.value;

    const lastVote = votedWeightlifting
      ? FITNESS_OPTIONS.weightlifting.value
      : FITNESS_OPTIONS.cardio.value;

    setContractState((prevState) => {
      return {
        ...prevState,
        writeStatus: WRITE_STARTED.message,
        writeErrorMsg: "",
        lastVote,
      };
    });

    const functionName = votedWeightlifting
      ? FITNESS_OPTIONS.weightlifting.voteFn
      : FITNESS_OPTIONS.cardio.voteFn; // "voteWeightlifting" : "voteCardio";

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
          onSuccess: async (_response: any) => {
            setContractState((prevState) => {
              return {
                ...prevState,
                writeStatus,
              };
            });
          },
          onSettled: async (_response: any) => {
            setContractState((prevState) => {
              return {
                ...prevState,
                writeStatus,
              };
            });
          },
          onError: (error: any) => {
            setContractState((prevState) => {
              return {
                ...prevState,
                writeStatus: WRITE_ERROR.name,
                writeErrorMsg: error?.message,
              };
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
              key={card.title}
              image={card.image}
              cardTitle={card.title}
              titleHref={card.titleHref}
              onBtnClick={handleClick}
              btnText={
                [
                  CONTRACT_STATUSES.WRITE_PENDING.name,
                  CONTRACT_STATUSES.WRITE_STARTED.name,
                ].includes(writeStatus)
                  ? "Voting..."
                  : "Vote!"
              }
              // btnText={voteButtonText()}
              btnValue={card.value}
              disabled={
                [
                  CONTRACT_STATUSES.WRITE_PENDING.name,
                  CONTRACT_STATUSES.WRITE_STARTED.name,
                ].includes(writeStatus) || !isConnected
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
