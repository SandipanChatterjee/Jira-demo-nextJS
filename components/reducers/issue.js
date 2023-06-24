import { actionTypes } from "../actions/issues";
const initState = {
  backlogIssues: [],
  inprogressIssues: [],
  completedIssues: [],
  selectedIssue: [],
  currentIssueLoading: false,
  currentIssue: {},
};

const key = "id";

const updateInprogressIssue = (state, action) => {
  const combinedIssue = [...state.inprogressIssues, ...action.inprogressIssue];
  const inprogressIssueSet = [
    ...new Map(combinedIssue.map((item) => [item[key], item])).values(),
  ];
  return inprogressIssueSet;
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.backlog:
      return {
        ...state,
        backlogIssues: action.backlogIssue,
      };
    case actionTypes.inprogress:
      return {
        ...state,
        inprogressIssues: action.inprogressIssue,
      };
    case actionTypes.done:
      return {
        ...state,
        completedIssues: action.completedIssue,
      };
    case actionTypes.selected:
      return {
        ...state,
        selectedIssue: action.selectedIssue,
      };
    case actionTypes.current_issue_loading:
      return {
        ...state,
        currentIssueLoading: action.currentIssueLoading,
      };
    case actionTypes.current_issue:
      return {
        ...state,
        currentIssue: { ...action.currentIssue },
      };
    default:
      return state;
  }
};

export default reducer;
