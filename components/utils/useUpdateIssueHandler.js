import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { issueStatus } from "./utils";
import { backlog, completed, inprogress, selected } from "../actions/issues";
export const useUpdateIssueHandler = ({
  selectedIssueStatus,
  modifiedIssues,
}) => {
  console.log("modifiedIssues###", modifiedIssues, selectedIssueStatus);
  const dispatch = useDispatch();

  return () => {
    if (selectedIssueStatus === issueStatus.backlog) {
      dispatch(backlog(modifiedIssues));
    } else if (selectedIssueStatus === issueStatus.done) {
      dispatch(completed(modifiedIssues));
    } else if (selectedIssueStatus === issueStatus.inprogress) {
      dispatch(inprogress(modifiedIssues));
    } else {
      dispatch(selected(modifiedIssues));
    }
  };
};
