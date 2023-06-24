import React, { Fragment, useEffect, useRef } from "react";
import { Add, Clear } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUsers,
  setAssignedUsers,
  setDeleteUsers,
  setShowUsersList,
} from "../../../../actions/issueModal/assignees";
import {
  backlog,
  completed,
  inprogress,
  selected,
} from "../../../../actions/issues";
import { updateIssueListHandler } from "../../../../actions/updateIssueList";
import { useSelectorIssues } from "../../../../utils/useSelectorIssues";
import { issueStatus } from "../../../../utils/utils";
import { useStyles } from "./assigneesStyle";
import { Avatar, TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ErrorBoundary from "../../../../utils/ErrorBoundary";

const Assignees = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const issue = useSelector((state) => state.issueReducer.currentIssue);
  const users = useSelector((state) => state.projectReducer.project.users);
  const showUsersList = useSelector(
    (state) => state.assigneesReducer.showUsersList
  );
  const assignedUsersId = useSelector(
    (state) => state.assigneesReducer.assignedUsersId
  );
  const assignedUsers = useSelector(
    (state) => state.assigneesReducer.assignedUsers
  );
  const updatedIssue = useSelector(
    (state) => state.updateIssueListReducer.updatedIssue
  );
  const selector = useSelectorIssues();
  const usersRef = useRef(true);

  const issueTypes = {
    backlog: selector.backlogIssues,
    selected: selector.selectedIssues,
    inprogress: selector.inprogressIssues,
    done: selector.completedIssues,
  };

  const showUsersListHandler = () => {
    dispatch(setShowUsersList(true));
  };
  const changeUsersHandler = (e, val) => {
    if (assignedUsersId.includes(val.id)) {
      dispatch(setShowUsersList(false));
      return;
    }
    console.log("changeUsersHandler##");
    dispatch(setAssignedUsers(val));
    dispatch(setShowUsersList(false));
    const payload = {
      userIds: [...assignedUsersId, val.id],
      users: [...assignedUsers, { ...val }],
    };
    dispatch(updateIssueListHandler(payload, issue.id));
  };
  const deleteUserHandler = (userId) => {
    const payload = {
      userIds: assignedUsersId.filter((id) => id !== userId),
      users: assignedUsers.filter((user) => user.id !== userId),
    };
    dispatch(updateIssueListHandler(payload, issue.id));
    dispatch(setDeleteUsers(userId));
    dispatch(setShowUsersList(true));
  };

  const closeUsersListHandler = () => {
    dispatch(setShowUsersList(false));
  };

  useEffect(() => {
    if (usersRef.current) {
      usersRef.current = false;
      return;
    }

    const filteredIssueArr = JSON.parse(
      JSON.stringify(issueTypes[issue.status])
    );
    const filteredIssue = filteredIssueArr.find((el) => el.id === issue.id);
    console.log("filteredIssue#", filteredIssue);
    if (!filteredIssue) return;
    filteredIssue.userIds = [...assignedUsersId];
    filteredIssueArr.splice(
      filteredIssueArr.indexOf(filteredIssue),
      1,
      filteredIssue
    );
    if (issue.status === issueStatus.backlog) {
      dispatch(backlog(filteredIssueArr));
    } else if (issue.status === issueStatus.selected) {
      dispatch(selected(filteredIssueArr));
    } else if (issue.status === issueStatus.inprogress) {
      dispatch(inprogress(filteredIssueArr));
    } else {
      dispatch(completed(filteredIssueArr));
    }
  }, [assignedUsersId]);

  // useEffect(() => {}, [updatedIssue.userIds]);

  useEffect(() => {
    if (issue.userIds.length > 0) {
      issue.users.map((user) => dispatch(setAssignedUsers(user)));
    }
    return () => {
      dispatch(resetUsers());
    };
  }, []);
  const usersOption = users.filter((el) => !assignedUsersId.includes(el.id));

  const AssignedUserBtnContent = ({ user }) => {
    return (
      <Button
        className={classes.parentContainer}
        variant="contained"
        onClick={() => deleteUserHandler(user.id)}
      >
        <Avatar src={user.avatarUrl} className={classes.avatarSize} />
        <span className={classes.text}>{user.name.toString()}</span>
        <Clear fontSize="small" />
      </Button>
    );
  };
  return (
    // issue.userIds.length == 0 && !showUsersList
    <div className={classes.root}>
      <p>ASSIGNEES</p>
      {assignedUsers.length == 0 ? (
        <Button
          variant="contained"
          onClick={showUsersListHandler}
          className={classes.button}
        >
          <p>Unassigned</p>
        </Button>
      ) : (
        <div>
          {assignedUsers.map((user, index) => {
            return (
              <ErrorBoundary error={"Not Found"}>
                <AssignedUserBtnContent user={user} />
              </ErrorBoundary>
            );
          })}
          <Button
            color="primary"
            className={classes.addMoreButton}
            onClick={showUsersListHandler}
          >
            <div className={classes.container}>
              <Add fontSize="small" className={classes.text} />
              <span>Add more</span>
            </div>
          </Button>
        </div>
      )}
      {showUsersList ? (
        <div onBlur={closeUsersListHandler}>
          <Autocomplete
            className="autocomplete"
            freeSolo
            onChange={(event, newValue) => changeUsersHandler(event, newValue)}
            options={usersOption}
            getOptionLabel={(option) => option.name}
            renderOption={(option) => {
              return (
                <Fragment>
                  <Avatar
                    src={option.avatarUrl}
                    className={classes.avatarSize}
                  />
                  <span className={classes.text}>{option.name}</span>
                </Fragment>
              );
            }}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                margin="normal"
                variant="outlined"
                autoFocus
              />
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Assignees;
