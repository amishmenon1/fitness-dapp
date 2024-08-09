import { useState } from "react";
import Redux from "./redux/redux";
import MemoExample from "./useMemo/use-memo";
import CallbackExample from "./useCallback/use-callback";
import InputExample from "./inputs/input-example";
import KittenCards from "./interview-challenges/kitten-cards";
import KanbanBoard from "./kanban/kanban-board";
import FormExample from "./form/form-example";

export const Playground = () => {
  return (
    <>
      {/* <Redux /> */}
      {/* <MemoExample /> */}
      {/* <CallbackExample /> */}
      {/* <InputExample /> */}
      {/* <KittenCards /> */}
      <KanbanBoard />
      {/* <FormExample /> */}
    </>
  );
};
