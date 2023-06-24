import { updateIssueList } from "../../services/updateIssueList";
export const actionTypes = {
  show_issue_status_dropdown: "show_issue_status_dropdown",
  set_issue_status: "set_issue_status",
  update_issue: "update_issue",
};

export const setIssueStatusDropDown = (flag) => {
  return {
    type: actionTypes.show_issue_status_dropdown,
    showIssueStatusDropdown: flag,
  };
};

export const setIssueStatus = (data) => {
  return {
    type: actionTypes.set_issue_status,
    selectedIssueStatus: data,
  };
};

export const updatedIssue = (data) => {
  console.log("updatedIssue##data##", data);
  return {
    type: actionTypes.update_issue,
    updatedIssue: data,
  };
};

export const updateIssueStatus = (payload, id) => {
  return async (dispatch) => {
    try {
      const res = await updateIssueList(payload, id);
      const data = await res;
      console.log("updateIssueStatus##data##", data);
      dispatch(updatedIssue(data.issue));
    } catch (e) {
      console.log(e);
    }
  };
};
