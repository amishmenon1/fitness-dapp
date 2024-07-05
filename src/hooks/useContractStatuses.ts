import { useEffect, useState } from "react";
import { CONTRACT_STATUSES, ERROR_STATUSES } from "@/data/statuses";

const {
  WRITE_IDLE,
  WRITE_STARTED,
  WRITE_PENDING,
  WRITE_SUCCESS,
  TRANSACTION_PENDING,
  TRANSACTION_REFETCHING,
  TRANSACTION_SUCCESS,
  TRANSACTION_STARTED,
  TRANSACTION_IDLE,
} = CONTRACT_STATUSES;

const { WRITE_ERROR } = ERROR_STATUSES;

export const useContractStatuses = (
  writeStatus: string,
  transactionStatus: string,
  writeErrorMsg: any,
  transactionErrorMsg: any,
  transactionRefetching: boolean,
  setOpenStatusModal: (value: boolean) => void
) => {
  // console.log("useContractStatuses rendered");
  const [contractStatusMessage, setContractStatusMessage] = useState<string>();
  const [transactionStatusMessage, setTransactionStatusMessage] =
    useState<string>();
  const [writeErrorMessage, setWriteErrorMessage] = useState<string>();
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>();

  useEffect(() => {
    let writeStatusMsg = "";
    let transactionStatusMsg = "";
    setWriteErrorMessage("");
    setTransactionErrorMessage("");

    if (writeStatus === WRITE_IDLE.name) {
      writeStatusMsg = WRITE_IDLE.message;
      transactionStatusMsg = TRANSACTION_IDLE.message;
    } else {
      setOpenStatusModal(true);

      if (writeStatus === WRITE_STARTED.name) {
        writeStatusMsg = WRITE_STARTED.message;
        transactionStatusMsg = TRANSACTION_STARTED.message;
      }

      if (writeStatus === WRITE_PENDING.name) {
        writeStatusMsg = WRITE_PENDING.message;
      }

      if (writeStatus === WRITE_SUCCESS.name)
        writeStatusMsg = WRITE_SUCCESS.message;

      if (transactionStatus === TRANSACTION_PENDING.name) {
        const contractIsIdle = [WRITE_IDLE.name].includes(writeStatus);
        if (!contractIsIdle) transactionStatusMsg = TRANSACTION_PENDING.message;
        else transactionStatusMsg = "";
      }

      if (transactionStatus === TRANSACTION_SUCCESS.name)
        transactionStatusMsg = TRANSACTION_SUCCESS.message;

      if (transactionRefetching)
        transactionStatusMsg = TRANSACTION_REFETCHING.message;

      setContractStatusMessage(writeStatusMsg);
      setTransactionStatusMessage(transactionStatusMsg);

      if (writeStatus === WRITE_ERROR.name) {
        if (writeErrorMsg) {
          if (
            writeErrorMsg.cause
              ?.toString()
              .indexOf("UserRejectedRequestError") > -1
          ) {
            setWriteErrorMessage("User rejected request");
          } else if (
            writeErrorMsg.cause?.toString().indexOf("ChainMismatchError") > -1
          ) {
            setWriteErrorMessage(
              "Chain mismatch error. The voting contract is deployed to the Sepolia network. Please make sure you're connected to the correct chain."
            );
          }
          if (transactionErrorMsg)
            setTransactionErrorMessage(
              transactionErrorMsg ? transactionErrorMsg.message : ""
            );

          setContractStatusMessage("");
          setTransactionStatusMessage("");
        }
      }
    }
  }, [
    writeStatus,
    transactionStatus,
    writeErrorMsg,
    transactionErrorMsg,
    transactionRefetching,
    setOpenStatusModal,
  ]);

  return {
    contractStatusMessage,
    transactionStatusMessage,
    writeErrorMessage,
    transactionErrorMessage,
  };
};
