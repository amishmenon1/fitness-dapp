// type Props = {}

import TransactionContextProvider from "@/contexts/vote-transaction-context";
import ScoreboardSection from "@/sections/scoreboard/scoreboard-section";
import VotingSection from "@/sections/voting/voting-section";

export const LandingPage = () => {
  return (
    <div
      id="landing-page"
      className="justify-center bg-opacity-100 flex flex-col gap-4 p-4"
    >
      <TransactionContextProvider>
        <VotingSection />
        {/* <StatusSection /> */}
        <ScoreboardSection />
      </TransactionContextProvider>
    </div>
  );
};
