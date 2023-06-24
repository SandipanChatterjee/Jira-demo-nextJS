import { actionTypes } from "../actions/guestAccount";

const initState = {
  token: null,
  start: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START:
      return {
        ...state,
        start: true,
      };
    case actionTypes.SUCCESS:
      return {
        ...state,
        start: false,
        token: action.token,
      };
    case actionTypes.FAIL:
      return {
        ...state,
        start: false,
        token: null,
        error: "authentication error",
      };
    default:
      return state;
  }
};

export default reducer;
