import { updateIssueList } from "../../services/updateIssueList";

export const actionTypes = {
  show_issueType_list: "show_issueType_list",
  set_issueType: "set_issueType",
};

export const setIssueType = (data) => {
  return {
    type: actionTypes.set_issueType,
    issueType: data,
  };
};

export const setShowIssueTypeList = (flag) => {
  return {
    type: actionTypes.show_issueType_list,
    showIssueTypeList: flag,
  };
};
