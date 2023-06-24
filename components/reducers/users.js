import { actionTypes } from "../actions/users";

const initData = {
  users: [],
  currentUser: {},
  currentUserActive: false,
};

const reducer = (state = initData, action) => {
  switch (action.type) {
    case actionTypes.users:
      return { ...state, users: action.users };
    case actionTypes.current_user:
      return { ...state, currentUser: { ...action.currentUser } };
    case actionTypes.current_user_active:
      return { ...state, currentUserActive: action.currentUserActiveFlag };
    default:
      return state;
  }
};

export default reducer;
