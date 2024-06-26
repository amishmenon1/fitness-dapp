import { ContractContext } from "@/contexts/contract-context";
import { Spinner } from "@material-tailwind/react";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

const StatusSection = () => {
  const [contractStatusMessage, setContractStatusMessage] = useState<string>();
  const [transactionStatusMessage, setTransactionStatusMessage] =
    useState<string>();
  const [writeErrorMessage, setWriteErrorMessage] = useState<string>();
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>();
  const { contractState, hash } = useContext(ContractContext);
  const {
    writeErrorMsg,
    writeStatus, // 'idle' | 'pending' | 'error' | 'success'
  } = contractState;

  const {
    isRefetching: transactionRefetching,
    error: transactionErrorMsg,
    status: transactionStatus,
  } = useWaitForTransactionReceipt({
    hash,
  });

  // const writeInProgress = () => !["success", "idle"].includes(writeStatus);

  const transactionPending = () =>
    !["idle"].includes(writeStatus) && transactionStatus === "pending";

  // const showContractSpinner = () => writeInProgress();
  const showTransactionSpinner = () => transactionPending();
  const showStatusModal = () => writeStatus !== "idle";

  useEffect(() => {
    let writeStatusmessage = "";
    let transactionStatusMessage = "";

    if (writeStatus === "idle") {
      writeStatusmessage = "System idle.";
      transactionStatusMessage = "System idle.";
    }

    if (writeStatus === "started") {
      writeStatusmessage = "Contract write initiated.";
      transactionStatusMessage = "Beginning write transaction...";
    }

    if (writeStatus === "pending")
      writeStatusmessage = "Writing to contract...";

    if (writeStatus === "success")
      writeStatusmessage = "Contract write success.";

    if (transactionStatus === "pending") {
      if (!["pending", "idle"].includes(writeStatus))
        transactionStatusMessage = "Confirming transaction...";
      else transactionStatusMessage = "";
    }

    if (transactionStatus === "success")
      transactionStatusMessage = "Transaction complete.";

    if (transactionRefetching) transactionStatusMessage = "Refetching data...";

    if (writeStatus === "error") {
      setWriteErrorMessage(writeErrorMsg ? writeErrorMsg.message : "");
      setTransactionErrorMessage(
        transactionErrorMsg ? transactionErrorMsg.message : ""
      );

      setContractStatusMessage("Error");
      setTransactionErrorMessage("");
      return;
    }

    console.log("status-section - writeStatus: ", writeStatus);
    setContractStatusMessage(writeStatusmessage);
    setTransactionStatusMessage(transactionStatusMessage);
  }, [
    writeStatus,
    transactionStatus,
    writeErrorMsg,
    transactionErrorMsg,
    transactionRefetching,
  ]);

  return (
    <div
      className={classNames(
        showStatusModal()
          ? "absolute top-56 w-full left-0 h-52 bg-black bg-opacity-80 rounded-lg"
          : "hidden",
        "text-sm w-full z-50 py-2 flex flex-col items-center justify-center md:absolute md:top-36 md:left-0"
      )}
    >
      <div className="  md:h-80  rounded-lg ">
        <h3 className="text-white pb-4">System Status</h3>
        <span className="flex justify-center items-center gap-4">
          <p className="text-blue-300">{contractStatusMessage}</p>
          {/* {showContractSpinner() ? (
            <Spinner
              color="light-blue"
              className=" w-4 h-4"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          ) : (
            <></>
          )} */}
        </span>

        <span className="flex justify-center items-center gap-4">
          <p className="text-green-400">{transactionStatusMessage}</p>

          {showTransactionSpinner() ? (
            // @ts-ignore
            <Spinner color="light-green" className=" w-4 h-4" />
          ) : (
            <></>
          )}
        </span>
        <div className="flex flex-col justify-center items-center gap-4">
          <p className=" text-red-500">{writeErrorMessage}</p>
          <p className=" text-red-500">{transactionErrorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusSection;
