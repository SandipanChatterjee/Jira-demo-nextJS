import { actionTypes } from "../../actions/issueModal/editor";

const initState = {
  showTitleEditor: false,
  titleText: "",
  showDescriptionEditor: false,
  descriptionText: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.show_title_editor:
      return {
        ...state,
        showTitleEditor: action.showTitleEditor,
      };
    case actionTypes.set_title_text:
      return {
        ...state,
        titleText: action.titleText,
      };
    case actionTypes.show_description_editor:
      return {
        ...state,
        showDescriptionEditor: action.showDescriptionEditor,
      };
    case actionTypes.set_description_text:
      return {
        ...state,
        descriptionText: action.descriptionText,
      };
    default:
      return state;
  }
};

export default reducer;
