import { ACTIONS } from "@/actions/voting-actions";

export function voteTransactionReducer(state: any, action: any) {
  // debugger;
  console.log("Reducer state: ", state);
  console.log("Reducer action: ", action);
  switch (action.type) {
    case ACTIONS.WRITE_INITIATED:
      // debugger;
      break;
    default:
      break;
  }
  return {
    ...state,
    ...action.payload,
  };
}
