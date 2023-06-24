import { actionTypes } from "../../actions/issueModal/estimate";
const initState = {
  estimate: 0,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.set_estismate:
      return {
        ...state,
        estimate: action.estimate,
      };
    default:
      return state;
  }
};

export default reducer;
