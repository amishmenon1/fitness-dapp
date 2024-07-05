import { ContractContext } from "@/contexts/contract-context";
import { FITNESS_OPTIONS } from "@/data/cards";
import { useVotingContract } from "@/hooks/useVotingContract";
import { useContext, useEffect, useState } from "react";
import { BaseError, useWaitForTransactionReceipt } from "wagmi";
import ExerciseOption from "./exercise-option";
import { CONTRACT_STATUSES } from "@/data/statuses";

const ScoreboardSection = () => {
  const { data, error, isPending, refetch } = useVotingContract();
  const { hash } = useContext(ContractContext);
  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash,
  });

  const [scoresUpdated, setScoresUpdated] = useState(false);
  const [cardioVotes, weightliftingVotes] = data || [];

  useEffect(() => {
    async function refetchVotes() {
      try {
        await refetch();
        setScoresUpdated(true);
      } catch (e) {
        console.error(e);
      }
    }

    if (transactionStatus === CONTRACT_STATUSES.TRANSACTION_SUCCESS.name) {
      refetchVotes();
    }
  }, [transactionStatus, refetch, setScoresUpdated]);

  function resetActiveState() {
    setScoresUpdated(false);
  }

  if (error)
    return (
      <div>Error: {(error as BaseError).shortMessage || error.message}</div>
    );

  return (
    <div
      id="score-container"
      className=" bg-gray-600 shadow-lg duration-300 hover:shadow-3 xs:mx-0 mx-6 rounded-md"
    >
      {isPending ? (
        <div className="rounded-md">
          <h2 className="xs:text-xl sm:text-3xl text-4xl text-white text-center p-8">
            Loading Score...
          </h2>
        </div>
      ) : (
        <div className="bg-gray-100 shadow-lg rounded-md">
          <h2 className="rounded-t-md sm:text-3xl text-2xl text-gray-300 text-center bg-gradient-to-r from-black to-gray-400 font-bold py-4">
            Score
          </h2>
          {isPending ? (
            <div className="text-black xs:text-xl  text-lg flex flex-col items-center justify-center p-8 space-y-4">
              Updating Votes...
            </div>
          ) : (
            <div className="rounded-b-md xs:text-xl sm:text-2xl flex flex-col items-center justify-center pb-8 pl-8 pr-8 space-y-4">
              <ExerciseOption
                text={FITNESS_OPTIONS.cardio.value}
                numVotes={cardioVotes?.result?.toString()}
                scoresUpdated={scoresUpdated}
                resetCallback={resetActiveState}
              />
              <ExerciseOption
                text={FITNESS_OPTIONS.weightlifting.value}
                scoresUpdated={scoresUpdated}
                numVotes={weightliftingVotes?.result?.toString()}
                resetCallback={resetActiveState}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreboardSection;
