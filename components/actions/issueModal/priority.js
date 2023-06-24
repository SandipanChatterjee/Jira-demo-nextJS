import { updateIssueList } from "../../services/updateIssueList";

export const actionTypes = {
  show_priority_list: "show_priority_list",
  set_priority: "set_priority",
};

export const setPriority = (data) => {
  return {
    type: actionTypes.set_priority,
    priority: data,
  };
};

export const setShowPriorityList = (flag) => {
  return {
    type: actionTypes.show_priority_list,
    showPriorityList: flag,
  };
};
