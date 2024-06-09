// type Props = {};

import cardioGif from "@/assets/cardio.gif";
import weightliftingGif from "@/assets/weightlifting.gif";
import Card from "@/components/card/card";

export const VotingSection = () => {
  /**
   * Places a vote.
   * @param event The button click event.
   */
  async function placeVote(event: React.MouseEvent<HTMLButtonElement>) {
    console.log("vote placed: ", event.currentTarget.value);
  }

  return (
    <section
      id="voting-card-container"
      className=" h-full flex flex-col items-center justify-center"
    >
      <div className=" h-50 flex w-full justify-between px-20 ">
        <Card
          image={cardioGif}
          CardTitle="Cardio"
          titleHref="/#"
          onBtnClick={placeVote}
          CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
          Button="Vote!"
        />
        <Card
          image={weightliftingGif}
          CardTitle="Weightlifting"
          titleHref="/#"
          onBtnClick={placeVote}
          CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
          Button="Vote!"
        />
      </div>
    </section>
  );
};
