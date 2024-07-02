import cardioGif from "@/assets/cardio.gif";
import weightliftingGif from "@/assets/weightlifting.gif";

export const FITNESS_OPTIONS = {
  weightlifting: {
    image: weightliftingGif,
    title: "Weightlifting",
    titleHref: "/#",
    value: "Weightlifting",
    gradiantDirection: "l",
    voteFn: "voteWeightlifting",
  },
  cardio: {
    image: cardioGif,
    title: "Cardio",
    titleHref: "/#",
    value: "Cardio",
    gradiantDirection: "r",
    voteFn: "voteCardio",
  },
};

export type FitnessCard = {
  image: string;
  title: string;
  titleHref: string;
  value: string;
  gradiantDirection?: string;
};

export const cards: FitnessCard[] = [
  FITNESS_OPTIONS.weightlifting,
  FITNESS_OPTIONS.cardio,
];
