import { ACTIONS } from "@/actions/voting-actions";
import Toast from "@/components/toast";
import { ContractContext } from "@/contexts/contract-context";
import { CONTRACT_STATUSES } from "@/data/statuses";
import { Spinner } from "@material-tailwind/react";
import { useContext, useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

type StatusModalProps = {
  showModal: boolean;
  onClose: () => void;
  showSpinner?: boolean;
  statusMessage?: string;
  writeErrorMessage?: string;
  transactionErrorMessage?: string;
};
const StatusModal = ({
  showModal,
  // modalClosed,
  onClose,
  showSpinner = false,
  statusMessage,
  writeErrorMessage,
  transactionErrorMessage,
}: StatusModalProps) => {
  function onModalClose() {
    onClose();
  }
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
                    onClick={onModalClose}
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
  console.log("status section rendered");
  const {
    contractState: {
      hash,
      writeStatus,
      writeStatusMsg: contractStatusMessage,
      writeErrorMsg: writeErrorMessage,
      transactionStatusMsg: transactionStatusMessage,
      transactionErrorMsg: transactionErrorMessage,
      // transactionStatus,
      openStatusModal,
      // reset,
    },
    dispatch,
  } = useContext(ContractContext);
  // const [userClosedModal, setUserClosedModal] = useState(false);
  const { WRITE_IDLE, TRANSACTION_PENDING, WRITE_SUCCESS } = CONTRACT_STATUSES;
  const transaction = useWaitForTransactionReceipt({
    hash,
  });
  const { status: transactionStatus } = transaction;

  useEffect(() => {
    // if (!transactionStatus) return;
    dispatch({
      type: ACTIONS.TRANSACTION_STATUS_CHANGE,
      payload: { transaction },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionStatus]);

  const transactionPending = () =>
    ![WRITE_IDLE.name].includes(writeStatus) &&
    transactionStatus === TRANSACTION_PENDING.name;

  const showTransactionSpinner = () =>
    !!transactionStatusMessage && transactionPending();

  function resetStatus() {
    dispatch({
      type: "RESET_STATUS",
    });
  }

  function showToast() {
    console.log("contractStatusMessage: ", contractStatusMessage);
    console.log("writeStatus: ", writeStatus);
    debugger;
    if (openStatusModal) {
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
        onClose={resetStatus}
        showSpinner={showTransactionSpinner()}
        statusMessage={transactionStatusMessage || ""}
        writeErrorMessage={writeErrorMessage}
        transactionErrorMessage={transactionErrorMessage}
      />
    </>
  );
};

export default StatusSection;
