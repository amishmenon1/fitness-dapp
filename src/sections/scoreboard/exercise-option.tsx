import AnimatedDiv from "@/components/animation";
import { ContractContext } from "@/contexts/contract-context";
import { CONTRACT_STATUSES } from "@/data/statuses";
import classNames from "classnames";
import { useState, useContext, useEffect, useCallback } from "react";

type Props = {
  text: string;
  scoresUpdated: boolean;
  resetCallback: () => void;
  numVotes: string | undefined;
};

const ExerciseOption = ({
  text,
  numVotes,
  scoresUpdated,
  resetCallback,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(true);
  const {
    contractState: { lastVote },
    setContractState,
  } = useContext(ContractContext);

  const animate = useCallback(() => {
    if (!lastVote) return;
    if (lastVote === text) {
      setShow(false);
      setTimeout(() => {
        setIsActive(true);
        setShow(true);
        setTimeout(() => {
          setIsActive(false);
          setContractState((prevState) => {
            return {
              ...prevState,
              lastVote: undefined,
              writeStatus: CONTRACT_STATUSES.WRITE_IDLE.name,
            };
          });
          resetCallback();
        }, 3000);
      }, 500);
    }
  }, [lastVote, text, resetCallback, setContractState]);

  useEffect(() => {
    if (scoresUpdated) {
      animate();
    }
  }, [scoresUpdated, animate]);

  return (
    <AnimatedDiv show={show} className="w-full">
      <div className="bg-white w-full p-2 rounded-md text-center shadow-md">
        <h5
          className={classNames(
            isActive ? "font-extrabold" : "font-light",
            " text-gray-800 "
          )}
        >
          {text}: {numVotes}
          {isActive ? <span className=" text-3xl"> 🎉</span> : <></>}
        </h5>
      </div>
    </AnimatedDiv>
  );
};

export default ExerciseOption;
