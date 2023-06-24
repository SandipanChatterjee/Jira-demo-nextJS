import { actionTypes } from "../../actions/issueModal/timeTracker";

const initState = {
  showTimeTrackerModal: false,
  timeSpent: null,
  timeRemaning: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.show_time_tracker_modal:
      return {
        ...state,
        showTimeTrackerModal: action.showTimeTrackerModal,
      };
    case actionTypes.time_spent:
      return {
        ...state,
        timeSpent: action.timeSpent,
      };
    case actionTypes.time_remaining:
      return {
        ...state,
        timeRemaining: action.timeRemaining,
      };
    default:
      return state;
  }
};

export default reducer;
