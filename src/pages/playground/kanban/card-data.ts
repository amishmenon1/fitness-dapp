export type CardType = {
  title: string;
  id: string;
  column: string;
  handleDragStart?: (
    e: React.DragEvent<HTMLDivElement>,
    card: { title: string; column: string; id: string }
  ) => void;
};

export const initialCards: CardType[] = [
  {
    title: "Task 1",
    id: "1",
    column: "todo",
  },
  {
    title: "Task 2",
    id: "2",
    column: "todo",
  },
  {
    title: "Task 3",
    id: "3",
    column: "todo",
  },
  {
    title: "Task 4",
    id: "4",
    column: "inProgress",
  },
  {
    title: "Task 5",
    id: "5",
    column: "inProgress",
  },
  {
    title: "Task 6",
    id: "6",
    column: "inProgress",
  },
  {
    title: "Task 7",
    id: "7",
    column: "inProgress",
  },
  {
    title: "Task 8",
    id: "8",
    column: "done",
  },
  {
    title: "Task 9",
    id: "9",
    column: "done",
  },
  {
    title: "Task 10",
    id: "10",
    column: "done",
  },
];
