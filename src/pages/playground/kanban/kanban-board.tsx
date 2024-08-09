import React, { useState } from "react";
import { FireIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CardType, initialCards } from "./card-data";
import { motion } from "framer-motion";

type KanbanProps = object;

type ColumnProps = {
  title: string;
  headingColor: string;
  column: string;
  cards: CardType[];
  setCards: (cards: CardType[]) => void;
};

type DropIndicatorProps = {
  beforeId: string;
  column: string;
};

type BurnBarrel = {
  setCards: (cards: CardType[]) => void;
};

type AddCardProps = {
  column: string;
  setCards: (cards: CardType[]) => void;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-purple-500 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards }: BurnBarrel) => {
  const [active, setActive] = useState<boolean>(false);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = () => {
    setActive(false);
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    // console.log("cardId:", cardId);
    //@ts-ignore
    setCards((prev) => prev.filter((card) => card.id !== cardId));
    setActive(false);
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`mt-16 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-gray-700 bg-gray-700/20 text-gray-400"
      }`}
    >
      {active ? (
        <FireIcon className="animate-bounce w-12" />
      ) : (
        <TrashIcon className=" w-12" />
      )}
    </div>
  );
};
const Card = ({ title, id, column, handleDragStart = () => {} }: CardType) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable={true}
        onDragStart={(event, info) =>
          handleDragStart(event as unknown as React.DragEvent<HTMLDivElement>, {
            title,
            id,
            column,
          })
        }
        className=" cursor-grab rounded border border-gray-500 bg-gray-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-gray-400">{title}</p>
      </motion.div>
    </>
  );
};

const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState<string>("");
  const [adding, setAdding] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim().length) return;
    const newCard = {
      title: text.trim(),
      id: Math.random().toString(),
      column,
    };
    //@ts-ignore
    setCards((prev) => [...prev, newCard]);
    setAdding(false);
  };
  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="mt-1.5 rounded w-full border-purple-300 bg-purple-300/30 p-3 placeholder-purple-200 focus:outline-0"
          />
          <div className=" mt-1.5 flex justify-end items-center gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className=" transition-colors cursor-pointer text-sm px-3"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center px-3 py-1.5 text-xs text-black font-semibold transition-colors gap-1.5 rounded bg-gray-500 hover:bg-gray-400"
            >
              <span>Add</span>
              <PlusIcon className=" w-4" />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full transition-colors items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-200"
        >
          <span>Add Card</span>
          <PlusIcon className="w-4" />
        </motion.button>
      )}
    </>
  );
};
const Column = ({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState<boolean>(false);
  const filteredCards = cards.filter((card) => card.column === column);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: { title: string; column: string; id: string }
  ) => {
    // console.log("card:", card);
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setActive(true);
  };
  const handleDragLeave = () => {
    setActive(false);
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
    const cardId = e.dataTransfer.getData("cardId");
    const copy = [...cards];
  };
  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 justify-between items-center">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-gray-500">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors rounded ${
          active ? "bg-gray-700" : "bg-gray-900"
        }`}
      >
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} handleDragStart={handleDragStart} />
        ))}
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const KanbanBoard = (props: KanbanProps) => {
  const [cards, setCards] = useState<CardType[]>(initialCards);

  return (
    <div className="flex justify-center w-full gap-3 mt-10">
      <Column
        title="To Do"
        headingColor="text-red-500"
        column="todo"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In Progress"
        headingColor="text-yellow-500"
        column="inProgress"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Done"
        headingColor="text-green-500"
        column="done"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

export default KanbanBoard;
