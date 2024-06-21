import { voteTransactionReducer } from "@/reducers/vote-transaction-reducer";
import { createContext, useReducer } from "react";

type TransactionContextProps = {
  dispatch?: React.Dispatch<any>;
  transactionState?: any;
  hash?: `0x${string}`;
  isConfirming?: boolean;
  isConfirmed?: boolean;
};

export const TransactionContext = createContext<TransactionContextProps>({});

type TransactionContextProviderProps = {
  children: React.ReactNode;
};

const TransactionContextProvider = ({
  children,
}: TransactionContextProviderProps) => {
  const [transactionState, dispatch] = useReducer(voteTransactionReducer, {
    isConfirming: false,
    isConfirmed: false,
    hash: null,
  });
  return (
    <TransactionContext.Provider value={{ transactionState, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
