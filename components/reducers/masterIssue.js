import { actionTypes } from "../actions/masterIssue";

const initState = {
  showMasterIssueModal: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.show_master_issue_modal:
      return {
        ...state,
        showMasterIssueModal: action.showMasterIssueModal,
      };
    default:
      return state;
  }
};

export default reducer;
