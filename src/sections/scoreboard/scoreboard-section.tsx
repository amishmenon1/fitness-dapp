import { ContractContext } from "@/contexts/contract-context";
import { useVotingContract } from "@/hooks/useVotingContract";
import { useContext, useEffect } from "react";
import { BaseError, useWaitForTransactionReceipt } from "wagmi";

const ScoreboardSection = () => {
  const { data, error, isPending, refetch } = useVotingContract();
  const { hash } = useContext(ContractContext);
  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash,
  });

  const [cardioVotes, weightliftingVotes] = data || [];

  useEffect(() => {
    async function refetchVotes() {
      console.log("refetching votes...");
      try {
        await refetch();
      } catch (e) {
        console.error(e);
      }
    }
    console.log(
      "scoreboard useeffect - transaction status: ",
      transactionStatus
    );
    if (transactionStatus === "success") {
      refetchVotes();
    }
  }, [transactionStatus, refetch]);

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
            <div className="rounded-b-md xs:text-xl sm:text-2xl flex flex-col items-center justify-center p-8 space-y-4">
              <div className="bg-white w-full p-2 rounded-md text-center shadow-md">
                <h5 className=" text-gray-800 font-light">
                  Cardio: {cardioVotes?.result?.toString()}
                </h5>
              </div>
              <div className="bg-white w-full p-2 rounded-md text-center shadow-md">
                <h5 className=" text-gray-800 font-light">
                  Weightlifting: {weightliftingVotes?.result?.toString()}
                </h5>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreboardSection;
