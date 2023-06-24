import { getIssue } from "../services/getCurrentIssue";
import { issueStatus } from "../utils/utils";

export const actionTypes = {
  backlog: "backlog",
  selected: "selected",
  inprogress: "inprogress",
  done: "done",
  current_issue: "current_issue",
  current_issue_loading: "current_issue_loading",
};

export const backlog = (data) => {
  console.log("data##", data);
  const arr = JSON.parse(JSON.stringify(data));
  arr.forEach((el) => {
    el.status = issueStatus.backlog;
  });
  return {
    type: actionTypes.backlog,
    backlogIssue: arr,
  };
};

export const selected = (data) => {
  console.log("selected#data#", data);
  const arr = JSON.parse(JSON.stringify(data));
  arr.forEach((el) => {
    el.status = issueStatus.selected;
  });
  return {
    type: actionTypes.selected,
    selectedIssue: arr,
  };
};

export const inprogress = (data) => {
  const arr = JSON.parse(JSON.stringify(data));
  arr.forEach((el) => {
    el.status = issueStatus.inprogress;
  });
  return {
    type: actionTypes.inprogress,
    inprogressIssue: arr,
  };
};

export const completed = (data) => {
  console.log("completed#data#", data);
  const arr = JSON.parse(JSON.stringify(data));
  arr.forEach((el) => {
    el.status = issueStatus.done;
  });
  return {
    type: actionTypes.done,
    completedIssue: arr,
  };
};

export const setIssueTypes = (issues) => {
  return (dispatch) => {
    console.log("setIssueTypes#issues", issues);
    const backlogIssue = issues.filter(
      (issue) => issue.status === issueStatus.backlog
    );
    console.log("backlogIssue", backlogIssue);
    dispatch(backlog(backlogIssue));
    const selectedIssue = issues.filter(
      (issue) => issue.status === issueStatus.selected
    );
    dispatch(selected(selectedIssue));
    const inprogressIssue = issues.filter(
      (issue) => issue.status === issueStatus.inprogress
    );
    dispatch(inprogress(inprogressIssue));

    const completedIssue = issues.filter(
      (issue) => issue.status === issueStatus.done
    );
    dispatch(completed(completedIssue));
  };
};

export const currentIssueFunction = (data) => {
  return {
    type: actionTypes.current_issue,
    currentIssue: data,
  };
};

export const currentIssueLoading = (flag) => {
  return {
    type: actionTypes.current_issue_loading,
    currentIssueLoading: flag,
  };
};
let cache = {};

export const getCurrentIssue = (id) => {
  return async (dispatch) => {
    dispatch(currentIssueLoading(true));
    try {
      let response = await getIssue(id);
      const data = await response;
      dispatch(currentIssueFunction(data.issue));
      dispatch(currentIssueLoading(false));
    } catch (e) {
      // dispatch(fail(e));
      dispatch(currentIssueLoading(false));
    }
  };
};
