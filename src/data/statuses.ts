export const CONTRACT_STATUSES = {
  WRITE_IDLE: { name: "idle", message: "System idle." },
  WRITE_STARTED: { name: "started", message: "Contract write initiated." },
  WRITE_PENDING: { name: "pending", message: "Writing to contract..." },
  WRITE_SUCCESS: { name: "success", message: "Contract write success." },
  WRITE_SETTLED: { name: "settled", message: "Contract write settled." },

  TRANSACTION_IDLE: { name: null, message: "" },
  TRANSACTION_STARTED: {
    name: null,
    message: "Beginning write transaction...",
  },
  TRANSACTION_SUCCESS: { name: "success", message: "Transaction complete." },
  TRANSACTION_PENDING: {
    name: "pending",
    message: "Confirming transaction...",
  },
  TRANSACTION_REFETCHING: { name: null, message: "Refetching data..." },
};

export const ERROR_STATUSES = {
  TRANSACTION_ERROR: { name: "error", message: "" },
  WRITE_ERROR: { name: "error", message: "" },
};
