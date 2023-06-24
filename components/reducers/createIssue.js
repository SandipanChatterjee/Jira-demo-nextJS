import { actionTypes } from "../actions/createIssue";
const initState = {
  openCreateIssue: false,
  issueSummary: "",
  newProjectDescription: "",
  newIssue: {},
  newIssueLoading: false,
  newIssueError: null,
  showErrorModal: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CREATE_ISSUE:
      return {
        ...state,
        openCreateIssue: true,
      };
    case actionTypes.CLOSE_CREATE_ISSUE:
      return {
        ...state,
        openCreateIssue: false,
      };
    case actionTypes.SET_SUMMARY:
      return {
        ...state,
        issueSummary: action.issueSummary,
      };
    case actionTypes.NEW_PROJECT_DESCRIPTION:
      return {
        ...state,
        newProjectDescription: action.newProjectDescription,
      };
    case actionTypes.CREATE_NEW_ISSUE: {
      return {
        ...state,
        newIssue: { ...action.newIssue },
      };
    }
    case actionTypes.CREATE_NEW_ISSUE_LOADING: {
      return {
        ...state,
        newIssueLoading: action.loading,
      };
    }
    case actionTypes.CREATE_NEW_ISSUE_ERROR: {
      return {
        ...state,
        newIssueError: action.error,
        showErrorModal: true,
      };
    }
    case actionTypes.CLOSE_ERROR_MODAL: {
      return {
        ...state,
        newIssueError: action.newIssueError,
        showErrorModal: action.showErrorModal,
      };
    }
    case actionTypes.RESET_CREATE_ISSUE: {
      return {
        ...state,
        openCreateIssue: false,
        issueSummary: "",
        newProjectDescription: "",
        newIssue: {},
        newIssueLoading: false,
        newIssueError: null,
        showErrorModal: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
