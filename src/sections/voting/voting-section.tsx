import Card from "@/components/card";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { VOTING_ABI as abi } from "@/abi/VotingData";
import { sepolia } from "viem/chains";
import { useContext, useEffect, useState } from "react";
import { ACTIONS } from "@/actions/voting-actions";
import { TransactionContext } from "@/contexts/vote-transaction-context";
import { FitnessCard, cards } from "@/data/cards";

const VotingSection = () => {
  const { isConnected } = useAccount();
  const { dispatch } = useContext(TransactionContext);
  const [_, setStatusMessage] = useState<string>();
  const {
    data: hash,
    writeContract,
    error: writeError,
    isError,
    status, // 'idle' | 'pending' | 'error' | 'success'
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (!dispatch) throw new Error("No dispatch function found.");
    if (!status) return;
    if (!isConfirmed && !isConfirming) return;
    if (isConfirming) setStatusMessage("Confirming transaction...");
    if (isConfirmed) setStatusMessage("Transaction confirmed!");

    console.log("isConfirming: ", isConfirming);
    console.log("isConfirmed: ", isConfirmed);
    console.log("hash: ", hash);
    console.log("status: ", status);

    dispatch({
      type: ACTIONS.UPDATE_VOTING_STATUS,
      payload: { isConfirming, isConfirmed, hash },
    });
  }, [isConfirming, isConfirmed, hash, status, dispatch]);

  useEffect(() => {
    if (!dispatch) throw new Error("No dispatch function found.");
    console.log("writeError: ", writeError);
    console.log("isError: ", isError);

    dispatch({
      type: ACTIONS.UPDATE_ERROR_STATUS,
      payload: { isConfirming, isConfirmed, hash },
    });
  }, [writeError, isError, dispatch]);

  /**
   * Places a vote.
   * @param event The button click event.
   */
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    // dispatch({
    //   type: ACTIONS.UPDATE_VOTING_STATUS,
    //   payload: { isConfirming, isConfirmed, hash },
    // });

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
          onSuccess: async (_response) => {
            console.log("Successfully voted! Write contract status: ", status);
            setStatusMessage("Successfully voted! Confirming transaction...");
          },
          onSettled: (response) => {
            console.log("Settled. Response: ", response);
            console.log("Settled. Write contract status: ", status);
          },
          onError: (error) => {
            console.error("Error voting: ", error);
            console.log("Error. Write contract status: ", status);
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  // const voteButtonText = () => {
  //   let text = "";
  //   if (!isConnected) return "Connect Wallet to Vote!";
  //   if (isConfirming || status === "pending") text = "Voting...";
  //   if (isConfirmed || status === "idle") text = "Vote!";
  //   return "Vote!";
  // };

  return (
    <section id="voting-card-container" className=" flex flex-col gap-8">
      <div className="flex flex-col">
        {/* <div className="bg-black bg-opacity-50">
          <p className="flex justify-center text-white text-lg">
            {statusMessage}
          </p>
        </div> */}
        <div className="flex-col xs:flex-row flex justify-between overflow-y-scroll">
          {cards.map((card: FitnessCard) => (
            <Card
              key={card.cardTitle}
              image={card.image}
              CardTitle={card.cardTitle}
              titleHref={card.titleHref}
              onBtnClick={handleClick}
              btnText={isConfirming ? "Voting..." : "Vote!"}
              // btnText={voteButtonText()}
              btnValue={card.btnValue}
              disabled={isConfirming || status === "pending" || !isConnected}
              gradiantDirection={card.gradiantDirection}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VotingSection;
