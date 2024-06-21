import cardioGif from "@/assets/cardio.gif";
import weightliftingGif from "@/assets/weightlifting.gif";

export type FitnessCard = {
  image: string;
  cardTitle: string;
  titleHref: string;
  btnValue: string;
  gradiantDirection?: string;
};

export const cards: FitnessCard[] = [
  {
    image: weightliftingGif,
    cardTitle: "Weightlifting",
    titleHref: "/#",
    btnValue: "Weightlifting",
    gradiantDirection: "l",
  },
  {
    image: cardioGif,
    cardTitle: "Cardio",
    titleHref: "/#",
    btnValue: "Cardio",
  },
];
