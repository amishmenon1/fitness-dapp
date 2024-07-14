import { ACTIONS } from "@/actions/voting-actions";
import {
  CONTRACT_STATUSES,
  ERROR_CODES,
  ERROR_STATUSES,
} from "@/data/statuses";

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

export type ActionType = {
  type: any;
  payload?: any;
};

function getWriteErrorMessage(error: any) {
  let errorMsg = error.message;
  if (error.cause?.toString().indexOf(ERROR_CODES.USER_REJECTED.name) > -1) {
    errorMsg = ERROR_CODES.USER_REJECTED.message;
  }
  if (error.cause?.toString().indexOf(ERROR_CODES.CHAIN_MISMATCH.name) > -1) {
    errorMsg = ERROR_CODES.CHAIN_MISMATCH.message;
  }
  return errorMsg;
}

const updatedTransactionState = (state: ContractState, transaction: any) => {
  const { status, isRefetching, error } = transaction;
  const {
    WRITE_IDLE,
    TRANSACTION_PENDING,
    TRANSACTION_REFETCHING,
    TRANSACTION_SUCCESS,
    TRANSACTION_IDLE,
  } = CONTRACT_STATUSES;

  if (error?.message || state.writeStatus === ERROR_STATUSES.WRITE_ERROR.name) {
    return {
      transactionErrorMsg: ERROR_STATUSES.TRANSACTION_ERROR.message,
      transactionStatus: ERROR_STATUSES.TRANSACTION_ERROR.name,
      transactionStatusMsg: null,
    } as ContractState;
  }

  const transactionStatus = isRefetching ? TRANSACTION_REFETCHING.name : status;

  switch (transactionStatus) {
    case TRANSACTION_PENDING.name: {
      return {
        transactionStatus:
          state.writeStatus !== WRITE_IDLE.name
            ? TRANSACTION_PENDING.name
            : null,
        transactionStatusMsg:
          state.writeStatus !== WRITE_IDLE.name
            ? TRANSACTION_PENDING.message
            : null,
      } as ContractState;
    }
    case TRANSACTION_REFETCHING.name: {
      return {
        transactionStatus: TRANSACTION_REFETCHING.name,
        transactionStatusMsg: TRANSACTION_REFETCHING.message,
      } as ContractState;
    }
    case TRANSACTION_SUCCESS.name: {
      return {
        transactionStatus: TRANSACTION_SUCCESS.name,
        transactionStatusMsg: TRANSACTION_SUCCESS.message,
      } as ContractState;
    }
    default: {
      return {
        transactionStatus: TRANSACTION_IDLE.name,
        transactionStatusMsg: TRANSACTION_IDLE.message,
      } as ContractState;
    }
  }
};

export function writeStatusReducer(
  state: ContractState,
  action: ActionType
): ContractState {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.SYSTEM_IDLE: {
      return {
        ...state,
        writeStatus: CONTRACT_STATUSES.WRITE_IDLE.name,
        writeStatusMsg: CONTRACT_STATUSES.WRITE_IDLE.message,
        transactionStatusMsg: CONTRACT_STATUSES.TRANSACTION_IDLE.message,
        writeErrorMsg: null,
        transactionErrorMsg: null,
        openStatusModal: false,
        lastVote: undefined,
        reset: false,
      } as ContractState;
    }
    case ACTIONS.WRITE_INITIATED: {
      if (!payload) throw new Error("Payload empty.");
      const { lastVote } = payload;
      return {
        ...state,
        openStatusModal: true,
        writeStatus: CONTRACT_STATUSES.WRITE_STARTED.message,
        writeStatusMsg: CONTRACT_STATUSES.WRITE_STARTED.message,
        transactionStatusMsg: CONTRACT_STATUSES.TRANSACTION_PENDING.message,
        lastVote,
      } as ContractState;
    }

    case ACTIONS.WRITE_COMPLETE: {
      return {
        ...state,
        writeStatus: CONTRACT_STATUSES.WRITE_SUCCESS.name,
        writeStatusMsg: CONTRACT_STATUSES.WRITE_SUCCESS.message,
      } as ContractState;
    }

    case ACTIONS.WRITE_SETTLED: {
      if (!payload) throw new Error("Payload empty.");
      const { hash } = payload;

      return {
        ...state,
        hash,
        writeStatus: CONTRACT_STATUSES.WRITE_SUCCESS.name,
        writeStatusMsg: CONTRACT_STATUSES.WRITE_SUCCESS.message,
      } as ContractState;
    }

    case ACTIONS.WRITE_ERROR: {
      if (!payload) throw new Error("Payload empty.");
      const { error } = payload;
      // if (!error) return;
      const errorMsg = getWriteErrorMessage(error);
      return {
        ...state,
        writeStatus: ERROR_STATUSES.WRITE_ERROR.name,
        writeStatusMsg: null,
        writeErrorMsg: errorMsg,
        transactionErrorMsg: ERROR_STATUSES.TRANSACTION_ERROR.message,
        transactionStatus: ERROR_STATUSES.TRANSACTION_ERROR.name,
        transactionStatusMsg: null,
      } as ContractState;
      // break;
    }

    case ACTIONS.RESET_STATUS: {
      return {
        ...state,
        writeStatus: CONTRACT_STATUSES.WRITE_IDLE.name,
        writeStatusMsg: CONTRACT_STATUSES.WRITE_IDLE.message,
        transactionStatusMsg: CONTRACT_STATUSES.TRANSACTION_IDLE.message,
        writeErrorMsg: null,
        transactionErrorMsg: null,
        openStatusModal: false,
        lastVote: undefined,
      } as ContractState;
    }

    case ACTIONS.TRANSACTION_STATUS_CHANGE: {
      const { transaction } = payload;
      const transactionState = updatedTransactionState(state, transaction);
      return {
        ...state,
        ...transactionState,
      } as ContractState;
    }

    default:
      return {
        ...state,
        ...action.payload,
      } as ContractState;
  }
}
