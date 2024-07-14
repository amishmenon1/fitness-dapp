import { ACTIONS } from "@/actions/voting-actions";
import { CONTRACT_STATUSES } from "@/data/statuses";
import { ActionType, ContractState } from "./write-status-reducer";

export function writeStatusReducer(state: ContractState, action: ActionType) {
  // debugger;
  const { type, payload } = action;
  console.log("Reducer state: ", state);
  console.log("Reducer action: ", action);

  switch (type) {
    case ACTIONS.CONTRACT_LOADED: {
      console.log("contract loaded payload: ", payload);
      return {
        ...state,
        writeStatus: CONTRACT_STATUSES.WRITE_IDLE.name,
        writeStatusMsg: CONTRACT_STATUSES.WRITE_IDLE.message,
        transactionStatusMsg: CONTRACT_STATUSES.TRANSACTION_IDLE.message,
      } as ContractState;
    }

    case ACTIONS.WRITE_INITIATED: {
      console.log("write intiated payload: ", payload);
      if (!payload) throw new Error("Payload empty.");
      const { lastVote } = payload;
      return {
        ...state,
        openStatusModal: true,
        writeStatus: CONTRACT_STATUSES.WRITE_STARTED.message,
        writeStatusMsg: CONTRACT_STATUSES.WRITE_STARTED.message,
        transactionStatusMsg: CONTRACT_STATUSES.TRANSACTION_STARTED.message,
        lastVote,
      } as ContractState;
    }

    default:
      return {
        ...state,
        ...action.payload,
      } as ContractState;
  }
}
