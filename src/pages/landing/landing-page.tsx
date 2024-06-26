// type Props = {}

import ContractProvider from "@/contexts/contract-context";
import ScoreboardSection from "@/sections/scoreboard/scoreboard-section";
import StatusSection from "@/sections/status/status-section";
import VotingSection from "@/sections/voting/voting-section";

export const LandingPage = () => {
  return (
    <div
      id="landing-page"
      className="justify-center bg-opacity-100 flex flex-col gap-4 px-4 overflow-hidden"
    >
      <ContractProvider>
        <VotingSection />
        <ScoreboardSection />
        <StatusSection />
      </ContractProvider>
    </div>
  );
};
