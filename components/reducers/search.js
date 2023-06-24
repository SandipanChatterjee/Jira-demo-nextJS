import { actionTypes } from "../actions/search";
const initState = {
  searchValue: "",
  searchedData: [],
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH:
      return {
        ...state,
        searchValue: action.searchValue,
      };
    case actionTypes.SEARCH_DATA:
      return {
        ...state,
        searchedData: action.searchedData,
      };
    default:
      return state;
  }
};

export default reducer;
