import AnimatedDiv from "@/components/playground";
import { ContractContext } from "@/contexts/contract-context";
import { FITNESS_OPTIONS } from "@/data/cards";
import { useVotingContract } from "@/hooks/useVotingContract";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { BaseError, useWaitForTransactionReceipt } from "wagmi";

const ScoreboardSection = () => {
  console.log("scoreboard rendered");
  const { data, error, isPending, refetch } = useVotingContract();
  const { hash, contractState, setContractState } = useContext(ContractContext);
  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash,
  });

  const { lastVote } = contractState;
  const [showWeightlifting, setShowWeightlifting] = useState(true);
  const [showCardio, setShowCardio] = useState(true);
  const [cardioVotes, weightliftingVotes] = data || [];
  const [cardioActive, setCardioActive] = useState(false);
  const [weightliftingActive, setWeightliftingActive] = useState(false);

  // const [option, setOption] = useState({
  //   value: lastVote,
  //   isActive: false,
  //   show: true,
  // });

  // function animate(){

  // }

  function showAnimateCardio() {
    setShowCardio(false);
    setTimeout(() => {
      setCardioActive(true);
      setShowCardio(true);
      setTimeout(() => {
        setCardioActive(false);
      }, 3000);
    }, 500);
  }

  function showAnimateWeightlifting() {
    setShowWeightlifting(false);
    setTimeout(() => {
      setWeightliftingActive(true);
      setShowWeightlifting(true);
      setTimeout(() => {
        setWeightliftingActive(false);
      }, 3000);
    }, 500);
  }

  useEffect(() => {
    async function refetchVotes() {
      try {
        await refetch();
        if (lastVote === FITNESS_OPTIONS.cardio.value) {
          showAnimateCardio();
        }
        if (lastVote === FITNESS_OPTIONS.weightlifting.value) {
          showAnimateWeightlifting();
        }
        setContractState((prevState) => {
          return {
            ...prevState,
            lastVote: undefined,
          };
        });
      } catch (e) {
        console.error(e);
      }
    }

    if (transactionStatus === "success") {
      refetchVotes();
    }
  }, [transactionStatus, lastVote, refetch, setContractState]);

  function renderExerciseOption(isActive: boolean, text: string) {
    return (
      <div className="bg-white w-full p-2 rounded-md text-center shadow-md">
        <h5
          className={classNames(
            isActive ? "font-extrabold" : "font-light",
            " text-gray-800 "
          )}
        >
          {text}
          {isActive ? <span className=" text-3xl"> 🎉</span> : <></>}
        </h5>
      </div>
    );
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
              <AnimatedDiv show={showCardio} className="w-full">
                {/* <ExerciseOption
                  isActive={cardioActive}
                  text={`Cardio: ${cardioVotes?.result?.toString()}`}
                /> */}
                {renderExerciseOption(
                  cardioActive,
                  `Cardio: ${cardioVotes?.result?.toString()}`
                )}
              </AnimatedDiv>

              <AnimatedDiv show={showWeightlifting} className="w-full ">
                {/* <ExerciseOption
                  isActive={weightliftingActive}
                  text={`Weightlifting: ${weightliftingVotes?.result?.toString()}`}
                /> */}
                {renderExerciseOption(
                  weightliftingActive,
                  `Weightlifting: ${weightliftingVotes?.result?.toString()}`
                )}
              </AnimatedDiv>
              {/* <button
                onClick={() => {
                  // setIsShowing(false);
                  // setTimeout(() => setIsShowing(true), 500);
                  showAnimateWeightlifting();
                }}
                className=" bg-gray-500 flex justify-center items-center w-52 h-10 text-white  gap-2 rounded-full  py-1 px-3 text-sm/6 font-semibold transition data-[hover]:scale-105 data-[hover]:bg-white/15"
              >
                Animate
              </button> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreboardSection;
