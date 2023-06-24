import { deleteIssue } from "../../services/deleteIssue";

export const actionTypes = {
  show_delete_modal: "show_delete_modal",
  delete_issue_success: "delete_issue_success",
  reset_delete_issue: "reset_delete_issue",
};

export const setShowDeleteModal = (flag) => {
  return {
    type: actionTypes.show_delete_modal,
    showDeleteModal: flag,
  };
};

export const deleteIssueSuccess = (data) => {
  return {
    type: actionTypes.delete_issue_success,
    deletedIssueData: data,
  };
};

export const resetDeleteIssue = () => {
  return {
    type: actionTypes.reset_delete_issue,
    deletedIssueData: {},
  };
};

export const setDeleteIssueHandler = (id) => {
  return async (dispatch) => {
    try {
      let response = await deleteIssue(id);
      const data = await response;
      dispatch(deleteIssueSuccess(data.issue));
    } catch (e) {
      console.log(e);
    }
  };
};
