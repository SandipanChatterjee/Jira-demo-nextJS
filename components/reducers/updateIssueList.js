import { actionTypes } from "../actions/updateIssueList";

const initState = {
  success: "",
  errorMsg: "",
  updatedIssue: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.success_update_issue_list:
      return {
        ...state,
        success: action.success,
        updatedIssue: action.updatedIssue,
      };
    case actionTypes.fail_update_issue_list:
      return {
        ...state,
        errorMsg: action.errorMsg,
      };
    default:
      return state;
  }
};

export default reducer;
