import { actionTypes } from "../actions/settings";
const initState = {
  projectName: "",
  projectUrl: "",
  projectDescription: "",
  selectedCategory: "",
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.project_name:
      return {
        ...state,
        projectName: action.projectName,
      };
    case actionTypes.project_url:
      return {
        ...state,
        projectUrl: action.projectUrl,
      };
    case actionTypes.project_description:
      return {
        ...state,
        projectDescription: action.projectDescription,
      };
    case actionTypes.project_category:
      return {
        ...state,
        selectedCategory: action.selectedCategory,
      };
    default:
      return state;
  }
};

export default reducer;
