import { useDispatch } from "react-redux";
import { setIssueTypes } from "../../actions/issues";
import { useSelectorIssues } from "../../utils/useSelectorIssues";
import { useStyles } from "./style";
import Header from "../shared/Header";
import MasterIssue from "./issue/MasterIssue";
import React, { useEffect } from "react";
import Search from "./search/Search";

import Users from "./users/Users";

const Dashboard = ({ project, currentUserData }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const selector = useSelectorIssues();
  const arr = [
    selector.backlogIssues,
    selector.selectedIssues,
    selector.inprogressIssues,
    selector.completedIssues,
  ].flat(Infinity);

  useEffect(() => {
    if (Object.keys(project).length !== 0) {
      dispatch(setIssueTypes(arr));
    }
  }, []);

  return (
    <div>
      <Header
        name={"Kanban board"}
        title={`Projects / ${project.name} / Kanban Board`}
      />
      <br />
      <div className={classes.container}>
        <Search />
        <Users project={project} currentUser={currentUserData} />
      </div>
      <br />
      <MasterIssue project={project} />
    </div>
  );
};

export default Dashboard;
