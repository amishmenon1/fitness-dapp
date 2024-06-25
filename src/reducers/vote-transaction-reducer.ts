import { ACTIONS } from "@/actions/voting-actions";

export function voteTransactionReducer(state: any, action: any) {
  // debugger;
  switch (action.type) {
    case ACTIONS.UPDATE_VOTING_STATUS:
    // debugger;
  }
  return {
    ...state,
    ...action.payload,
  };
}
