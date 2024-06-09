// type Props = {};

import cardioGif from "@/assets/cardio.gif";
import weightliftingGif from "@/assets/weightlifting.gif";
import Card from "@/components/card";
import { useVotingContract } from "@/hooks/useVotingContract";
import { BaseError } from "wagmi";

const VotingSection = () => {
  //@ts-ignore
  const { data, error, isPending } = useVotingContract();
  const [cardioVotes, weightliftingVotes] = data || [];

  /**
   * Places a vote.
   * @param event The button click event.
   */
  async function placeVote(event: React.MouseEvent<HTMLButtonElement>) {
    console.log("vote placed: ", event.currentTarget.value);
  }

  // async function getVotes() {
  //   console.log("weightlifting votes: ");
  //   console.log("cardioVotes votes: ");
  // }

  // if (isPending) return <div>Loading...</div>;

  if (error)
    return (
      <div>Error: {(error as BaseError).shortMessage || error.message}</div>
    );

  return (
    <section
      id="voting-card-container"
      className=" h-full flex flex-col items-center justify-center"
    >
      <div className=" h-50 flex w-full justify-between px-20 gap-10 ">
        <Card
          image={cardioGif}
          CardTitle="Cardio"
          titleHref="/#"
          onBtnClick={placeVote}
          CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
          Button="Vote!"
        />
        <div className=" w-96 h-full overflow-hidden rounded-lg bg-gray-600 shadow-1 duration-300 hover:shadow-3">
          {isPending ? (
            <div>
              <h2 className="text-4xl text-white text-center p-8">
                Loading Score...
              </h2>
            </div>
          ) : (
            <div>
              <h2 className="text-4xl text-white text-center p-8">Score</h2>
              <div className="flex flex-col items-center justify-center p-8">
                <h5 className="text-2xl text-white">
                  Cardio: {cardioVotes?.result?.toString()}
                </h5>
                <h5 className="text-2xl text-white">
                  Weightlifting:{weightliftingVotes?.result?.toString()}
                </h5>
              </div>
            </div>
          )}
        </div>
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

export default VotingSection;
