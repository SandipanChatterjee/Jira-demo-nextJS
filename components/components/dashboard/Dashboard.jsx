import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIssueTypes } from "../../actions/issues";
import { getCurrentUserData } from "../../actions/users";
import { useSelectorIssues } from "../../utils/useSelectorIssues";
import Header from "../shared/Header";
import { Loader } from "../shared/loader/Loader";
import MasterIssue from "./issue/MasterIssue";
import Search from "./search/Search";
import { useStyles } from "./style";
import Users from "./users/Users";

const Dashboard = ({ project, currentUserData }) => {
  const dispatch = useDispatch();
  // const project = useSelector((state) => state.projectReducer.project);
  // const loader = useSelector((state) => state.projectReducer.loading);
  // const error = useSelector((state) => state.projectReducer.error);
  // const currentUser = useSelector((state) => state.usersReducer.currentUser);

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
    // if (Object.keys(currentUserData).length === 0) {
    //   dispatch(getCurrentUserData(currentUserData));
    // }
  }, []);

  // if (loader) {
  //   return (
  //     <div className={classes.loaderContainer}>
  //       <Loader />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <span>{error}</span>;
  // }

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
