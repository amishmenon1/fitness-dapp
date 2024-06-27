import cardioGif from "@/assets/cardio.gif";
import weightliftingGif from "@/assets/weightlifting.gif";

export type FitnessCard = {
  image: string;
  cardTitle: string;
  titleHref: string;
  value: string;
  gradiantDirection?: string;
};

export const cards: FitnessCard[] = [
  {
    image: weightliftingGif,
    cardTitle: "Weightlifting",
    titleHref: "/#",
    value: "Weightlifting",
    gradiantDirection: "l",
  },
  {
    image: cardioGif,
    cardTitle: "Cardio",
    titleHref: "/#",
    value: "Cardio",
    gradiantDirection: "r",
  },
];
