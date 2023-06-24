import { actionTypes } from "../../actions/issueModal/issueStatus";

const initState = {
  showIssueStatusDropdown: false,
  selectedIssueStatus: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.show_issue_status_dropdown:
      return {
        ...state,
        showIssueStatusDropdown: action.showIssueStatusDropdown,
      };
    case actionTypes.set_issue_status:
      return {
        ...state,
        selectedIssueStatus: action.selectedIssueStatus,
      };
    default:
      return state;
  }
};

export default reducer;
