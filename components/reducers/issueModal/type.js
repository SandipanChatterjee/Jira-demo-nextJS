import { actionTypes } from "../../actions/issueModal/type";

const initState = {
  showIssueTypeList: false,
  type: "",
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.set_issueType:
      return {
        ...state,
        type: action.issueType,
      };
    case actionTypes.show_issueType_list:
      return {
        ...state,
        showIssueTypeList: action.showIssueTypeList,
      };
    default:
      return state;
  }
};

export default reducer;
