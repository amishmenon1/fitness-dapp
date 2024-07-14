import { CONTRACT_STATUSES } from "@/data/statuses";
import {
  ActionType,
  ContractState,
  writeStatusReducer,
} from "@/reducers/write-status-reducer";
import React, {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from "react";

type ContractContextProviderProps = {
  children: React.ReactNode;
};

const INITIAL_STATE: ContractState = {
  writeStatus: CONTRACT_STATUSES.WRITE_IDLE.name,
  writeStatusMsg: CONTRACT_STATUSES.WRITE_IDLE.message,
  transactionStatus: CONTRACT_STATUSES.TRANSACTION_IDLE.name,
  transactionStatusMsg: CONTRACT_STATUSES.TRANSACTION_IDLE.message,
  writeErrorMsg: null,
  transactionErrorMsg: null,
  transactionRefetching: false,
  openStatusModal: false,
};

export type ContractState = {
  writeStatus: string;
  transactionStatus?: string | null;
  writeStatusMsg?: string | null;
  transactionStatusMsg?: string | null;
  writeErrorMsg?: any | null;
  transactionErrorMsg?: any | null;
  transactionRefetching?: boolean;
  hash?: `0x${string}` | undefined;
  lastVote?: string;
  openStatusModal: boolean;
  reset?: boolean;
};

export const ContractContext = createContext<{
  contractState: ContractState;
  dispatch: Dispatch<ActionType>;
}>({
  contractState: INITIAL_STATE,
  dispatch: () => null,
});

const ContractProvider = ({ children }: ContractContextProviderProps) => {
  // console.log("context rendered");
  const [contractState, dispatch] = useReducer(
    writeStatusReducer,
    INITIAL_STATE
  );

  return (
    <ContractContext.Provider
      value={{
        contractState,
        dispatch,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
