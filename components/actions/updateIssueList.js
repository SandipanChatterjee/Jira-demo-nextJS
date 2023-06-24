import { updateIssueList } from "../services/updateIssueList";
export const actionTypes = {
  success_update_issue_list: "success_update_issue_list",
  fail_update_issue_list: "fail_update_issue_list",
};
export const updateIssueListSuccess = (data) => {
  return {
    type: actionTypes.success_update_issue_list,
    success: true,
    updatedIssue: data,
  };
};
export const updateIssueListFail = (msg) => {
  return {
    type: actionTypes.fail_update_issue_list,
    errorMsg: msg,
  };
};

export const updateIssueListHandler = (payload, id) => {
  return async (dispatch) => {
    try {
      const response = await updateIssueList(payload, id);
      const data = await response;
      console.log("data#Issue#", data.issue);
      dispatch(updateIssueListSuccess(data.issue));
    } catch (e) {
      console.log(e);
      dispatch(updateIssueListFail());
    }
  };
};
