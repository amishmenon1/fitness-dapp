import Toast from "@/components/toast";
import { ContractContext } from "@/contexts/contract-context";
import { CONTRACT_STATUSES } from "@/data/statuses";
import { useContractStatuses } from "@/hooks/useContractStatuses";
import { Spinner } from "@material-tailwind/react";
import classNames from "classnames";
import { useContext, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

const StatusSection = () => {
  // console.log("status section rendered");
  const {
    contractState: { writeErrorMsg, writeStatus },
    hash,
  } = useContext(ContractContext);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const { WRITE_IDLE, TRANSACTION_PENDING, WRITE_SUCCESS } = CONTRACT_STATUSES;
  const {
    isRefetching: transactionRefetching,
    error: transactionErrorMsg,
    status: transactionStatus,
  } = useWaitForTransactionReceipt({
    hash,
  });
  const {
    contractStatusMessage,
    transactionStatusMessage,
    writeErrorMessage,
    transactionErrorMessage,
  } = useContractStatuses(
    writeStatus,
    transactionStatus,
    writeErrorMsg,
    transactionErrorMsg,
    transactionRefetching,
    setOpenStatusModal
  );

  const transactionPending = () =>
    ![WRITE_IDLE.name].includes(writeStatus) &&
    transactionStatus === TRANSACTION_PENDING.name;

  const showTransactionSpinner = () =>
    transactionStatusMessage && transactionPending();

  function showToast() {
    if (writeStatus !== WRITE_IDLE.name) {
      return (
        <>
          {contractStatusMessage && writeStatus !== WRITE_SUCCESS.name && (
            <Toast type={"info"} message={contractStatusMessage} />
          )}
          {contractStatusMessage && writeStatus === WRITE_SUCCESS.name && (
            <Toast type={"success"} message={contractStatusMessage} />
          )}
          {writeErrorMessage && (
            <Toast type="error" message={writeErrorMessage} />
          )}
          {transactionErrorMessage && (
            <Toast type="error" message={transactionErrorMessage} />
          )}
        </>
      );
    } else return <></>;
  }
  return (
    <>
      {showToast()}
      <div
        className={classNames(
          openStatusModal
            ? "absolute top-56 w-full left-0 h-52 bg-black bg-opacity-90 rounded-lg"
            : "hidden",
          "text-sm w-full z-50 py-2 flex flex-col items-center justify-center md:absolute md:top-36 md:left-0"
        )}
      >
        <div className="  md:h-80  rounded-lg ">
          <h3 className="text-white pb-4">System Status</h3>

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
          <div className="flex flex-col justify-center items-center gap-4">
            <button
              onClick={() => setOpenStatusModal(false)}
              className={
                "text-xs xs:text-sm font-bold bg-gradient-to-l from-blue-gray-800 to-gray-400 px-4 xs:w-1/2 min-w-[20vw] rounded-full text-body-color transition hover:border-primary hover:text-white"
              }
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusSection;
