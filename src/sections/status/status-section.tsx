import Toast from "@/components/toast";
import { ContractContext } from "@/contexts/contract-context";
import { CONTRACT_STATUSES } from "@/data/statuses";
import { useContractStatuses } from "@/hooks/useContractStatuses";
import { Spinner } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

type StatusModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  showSpinner?: boolean;
  statusMessage?: string;
  writeErrorMessage?: string;
  transactionErrorMessage?: string;
};
const StatusModal = ({
  showModal,
  setShowModal,
  showSpinner = false,
  statusMessage,
  writeErrorMessage,
  transactionErrorMessage,
}: StatusModalProps) => {
  return (
    <>
      {showModal ? (
        <>
          <div
            id="modal-parent-container"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              id="modal-container"
              className=" w-full px-2 xs:px-10 sm:px-0 sm:w-2/3 "
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-xl shadow-gray-300 flex flex-col w-full bg-gray-900 bg-opacity-95 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">System Status</h3>
                </div>
                {/*body*/}

                {/* <div className="relative p-6 flex-auto"> */}
                {statusMessage ? (
                  <span className="flex flex-col xs:flex-row p-20 justify-center items-center gap-4">
                    <p className="text-blueGray-500 text-lg leading-relaxed">
                      {statusMessage}
                    </p>

                    {showSpinner ? (
                      // @ts-ignore
                      <Spinner color="light-green" className=" w-7 h-7" />
                    ) : (
                      <></>
                    )}
                  </span>
                ) : null}
                {/* </div> */}

                {!!writeErrorMessage || !!transactionErrorMessage ? (
                  <div className="flex flex-col p-20 justify-center items-center gap-4">
                    {writeErrorMessage ? (
                      <p className=" text-red-500">{writeErrorMessage}</p>
                    ) : null}
                    {transactionErrorMessage ? (
                      <p className=" text-red-500">{transactionErrorMessage}</p>
                    ) : null}
                  </div>
                ) : (
                  <></>
                )}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
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
    !!transactionStatusMessage && transactionPending();

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
      <StatusModal
        showModal={openStatusModal}
        setShowModal={setOpenStatusModal}
        showSpinner={showTransactionSpinner()}
        statusMessage={transactionStatusMessage}
        writeErrorMessage={writeErrorMessage}
        transactionErrorMessage={transactionErrorMessage}
      />
      {/* <div
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
      </div> */}
    </>
  );
};

export default StatusSection;
