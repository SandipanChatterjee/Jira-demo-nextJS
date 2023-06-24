import { actionTypes } from "../../actions/issueModal/delete";

const initState = {
  showDeleteModal: false,
  deletedIssueData: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.show_delete_modal:
      return {
        ...state,
        showDeleteModal: action.showDeleteModal,
      };
    case actionTypes.delete_issue_success:
      return {
        ...state,
        deletedIssueData: {
          ...state.deleteIssue,
          deletedIssueData: action.deletedIssueData,
        },
      };
    case actionTypes.reset_delete_issue:
      return {
        ...state,
        deletedIssueData: action.deletedIssueData,
        showDeleteModal: false,
      };
    default:
      return state;
  }
};

export default reducer;
