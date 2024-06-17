// type Props = {}

import ScoreboardSection from "@/sections/scoreboard/scoreboard-section";
import VotingSection from "@/sections/voting/voting-section";

export const LandingPage = () => {
  return (
    <div id="landing-page" className="flex flex-col gap-4 p-4">
      <VotingSection />
      <ScoreboardSection />
    </div>
  );
};
