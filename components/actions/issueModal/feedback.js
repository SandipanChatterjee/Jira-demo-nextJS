export const actionTypes = {
  show_feedback_modal: "show_feedback_modal",
};

export const setShowFeedbackModal = (flag) => {
  return {
    type: actionTypes.show_feedback_modal,
    showFeedbackModal: flag,
  };
};
