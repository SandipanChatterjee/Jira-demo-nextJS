import { actionTypes } from "../../actions/issueModal/feedback";

const initState = {
  showFeedbackModal: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.show_feedback_modal:
      return {
        ...state,
        showFeedbackModal: action.showFeedbackModal,
      };
    default:
      return state;
  }
};

export default reducer;
