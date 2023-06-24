import { useSelector } from "react-redux";

export const useSelectorIssues = () => {
  const backlogIssues = useSelector(
    (state) => state.issueReducer.backlogIssues
  );
  const selectedIssues = useSelector(
    (state) => state.issueReducer.selectedIssue
  );
  const inprogressIssues = useSelector(
    (state) => state.issueReducer.inprogressIssues
  );
  const completedIssues = useSelector(
    (state) => state.issueReducer.completedIssues
  );
  return { backlogIssues, selectedIssues, inprogressIssues, completedIssues };
};
