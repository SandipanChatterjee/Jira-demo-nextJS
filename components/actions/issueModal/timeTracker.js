export const actionTypes = {
  show_time_tracker_modal: "show_time_tracker_modal",
  time_spent: "time_spent",
  time_remaining: "time_remaining",
};

export const setShowTimeTrackerModal = (flag) => {
  return {
    type: actionTypes.show_time_tracker_modal,
    showTimeTrackerModal: flag,
  };
};

export const setTimeSpent = (hours) => {
  return {
    type: actionTypes.time_spent,
    timeSpent: hours,
  };
};

export const setTimeRemaining = (hours) => {
  return {
    type: actionTypes.time_remaining,
    timeRemaining: hours,
  };
};
