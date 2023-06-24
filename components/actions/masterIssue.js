export const actionTypes = {
  show_master_issue_modal: "show_master_issue_modal",
};

export const setShowMasterIssue = (flag) => {
  return {
    type: actionTypes.show_master_issue_modal,
    showMasterIssueModal: flag,
  };
};
