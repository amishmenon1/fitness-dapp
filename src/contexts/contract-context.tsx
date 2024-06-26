import React, { createContext, useEffect, useState } from "react";
import { useWriteContract } from "wagmi";

type ContractType = {
  hash?: `0x${string}` | undefined;
  writeErrorMsg: any;
  writeStatus: string; //"idle" | "pending" | "error" | "success" | "started";
};

type ContractContextProps = {
  setContractState: React.Dispatch<React.SetStateAction<ContractType>>;
  contractState: ContractType;
  hash?: `0x${string}` | undefined;
  writeContract: (args: any, options: any) => void;
  writeErrorMsg?: any;
};

type ContractContextProviderProps = {
  children: React.ReactNode;
};

const INITIAL_STATE = {
  contractState: {
    writeStatus: "idle",
    writeErrorMsg: null,
  },
  setContractState: () => {},
  writeContract: () => {},
};

export const ContractContext =
  createContext<ContractContextProps>(INITIAL_STATE);

const ContractProvider = ({ children }: ContractContextProviderProps) => {
  const [contractState, setContractState] = useState<ContractType>(
    INITIAL_STATE.contractState
  );

  const {
    data: hash,
    writeContract,
    status: writeStatus, // 'idle' | 'pending' | 'error' | 'success'
    error: writeErrorMsg,
  } = useWriteContract();

  useEffect(() => {
    console.log("context - writeStatus: ", writeStatus);
    setContractState({
      writeStatus,
      writeErrorMsg,
    });
  }, [writeStatus, writeErrorMsg]);

  return (
    <ContractContext.Provider
      value={{
        hash,
        contractState,
        setContractState,
        writeContract,
        writeErrorMsg,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
