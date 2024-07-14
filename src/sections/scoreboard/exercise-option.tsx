import { ACTIONS } from "@/actions/voting-actions";
import AnimatedDiv from "@/components/animation";
import { ContractContext } from "@/contexts/contract-context";
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
    dispatch,
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
          dispatch({
            type: ACTIONS.SYSTEM_IDLE,
          });
          resetCallback();
        }, 3000);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastVote, text]);

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
