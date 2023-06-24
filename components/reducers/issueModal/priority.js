import { actionTypes } from "../../actions/issueModal/priority";
const initState = {
  showPriorityList: false,
  priority: "",
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.set_priority:
      return {
        ...state,
        priority: action.priority,
      };
    case actionTypes.show_priority_list:
      return {
        ...state,
        showPriorityList: action.showPriorityList,
      };
    default:
      return state;
  }
};

export default reducer;
