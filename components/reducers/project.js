import { actionTypes } from "../actions/project";

const initState = {
  project: {},
  error: null,
  loading: true,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START:
      return { ...state, loading: true };
    case actionTypes.SUCCESS:
      return {
        ...state,
        project: { ...action.project },
        loading: false,
      };

    case actionTypes.FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        project: {},
      };
    default:
      return state;
  }
};

export default reducer;
