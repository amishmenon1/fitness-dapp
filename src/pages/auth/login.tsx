// type Props = {};

import Card from "@/components/card";
import AuthButton from "@/components/connect-wallet";

export const Login = () => {
  return (
    <div
      id="login-page"
      className="justify-center h-full items-center text-white bg-opacity-100 flex flex-col gap-4 px-4 overflow-hidden"
    >
      <Card
        // image={card.image}
        cardTitle={"Welcome! Please login to enter the voting platform."}
        btnComponent={<AuthButton />}
        // titleHref={card.titleHref}
        // onBtnClick={handleClick}
        // btnText={
        //   ["pending", "started"].includes(writeStatus) ? "Voting..." : "Vote!"
        // }
        // btnText={voteButtonText()}
        // btnValue={card.value}
        // disabled={["pending", "started"].includes(writeStatus) || !isConnected}
        // gradiantDirection={card.gradiantDirection}
      />
    </div>
  );
};
