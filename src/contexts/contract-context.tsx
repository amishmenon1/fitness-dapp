import { CONTRACT_STATUSES } from "@/data/statuses";
import {
  ActionType,
  ContractState,
  writeStatusReducer,
} from "@/reducers/write-status-reducer";
import React, { createContext, Dispatch, useReducer } from "react";

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

type ContractContextType = {
  contractState: ContractState;
  dispatch: Dispatch<ActionType>;
};

export const ContractContext = createContext<ContractContextType | undefined>({
  contractState: INITIAL_STATE,
  dispatch: () => null,
});

const ContractProvider = ({ children }: ContractContextProviderProps) => {
  console.log("context rendered");
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
