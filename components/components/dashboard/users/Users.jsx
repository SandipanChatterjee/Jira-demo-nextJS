import React, { useEffect, useRef } from "react";
import { Avatar, Button } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { useStyles } from "./style";
import { useSelectorIssues } from "../../../utils/useSelectorIssues";
import { convertToArrayOfObjects } from "../../../utils/utils";
import { searchedDataHandler } from "../../../actions/search";
import { setUsers, setCurrentUserActive } from "../../../actions/users";
import { useSelector, useDispatch } from "react-redux";
import ErrorBoundary from "../../../utils/ErrorBoundary";

const Users = () => {
  const project = useSelector((state) => state.projectReducer.project);
  const selector = useSelectorIssues();
  const currentUsers = useSelector((state) => state.usersReducer.users);
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const currentUserActive = useSelector(
    (state) => state.usersReducer.currentUserActive
  );
  const dispatch = useDispatch();

  const ref = useRef(true);
  const classes = useStyles();

  const issueList = [
    selector.backlogIssues,
    selector.selectedIssues,
    selector.inprogressIssues,
    selector.completedIssues,
  ].flat(Infinity);

  console.log("arr##", issueList);

  const handleRemoveForCurrentUser = (userId) => {
    let users = [currentUser, ...currentUsers].filter(
      (user) => user.id !== userId
    );
    console.log("users##", users);
    const filterData = issueList.filter((issue) =>
      users.find((user) => issue.userIds.includes(user.id))
    );
    const data = filterData.length > 0 ? filterData : issueList;
    const convertedData = convertToArrayOfObjects(data);
    dispatch(setCurrentUserActive(false));
    dispatch(searchedDataHandler(convertedData));
  };

  const handleAddForCurrentUser = (userId) => {
    let users = [currentUser, ...currentUsers];
    console.log("users##", users);
    const filterData = issueList.filter((issue) =>
      users.find((user) => issue.userIds.includes(user.id))
    );
    const data = filterData.length > 0 ? filterData : issueList;
    const convertedData = convertToArrayOfObjects(data);
    dispatch(setCurrentUserActive(true));
    dispatch(searchedDataHandler(convertedData));
  };

  const handleRemove = (userId) => {
    console.log("handleRemove");
    const users = currentUsers.filter((user) => user.id !== userId);
    dispatch(setUsers(users));
  };

  const handleAdd = (userId) => {
    console.log("handleAdd");
    const currentUser = project.users.filter((user) => user.id === userId);
    const users = [...currentUsers, ...currentUser];
    dispatch(setUsers(users));
  };

  const clearAllHandler = () => {
    dispatch(setUsers([]));
    dispatch(setCurrentUserActive(false));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    console.log(currentUsers, issueList);
    let users = currentUserActive
      ? [currentUser, ...currentUsers]
      : [...currentUsers];
    console.log("users##", users, currentUser, currentUserActive);
    const filterData = issueList.filter((issue) =>
      users.find((user) => issue.userIds.includes(user.id))
    );
    const data = filterData.length > 0 ? filterData : issueList;
    const convertedData = convertToArrayOfObjects(data);
    dispatch(searchedDataHandler(convertedData));
  }, [currentUsers]);

  useEffect(() => {
    return () => {
      dispatch(setUsers([]));
      dispatch(setCurrentUserActive(false));
    };
  }, []);

  return (
    <div className={classes.root}>
      <AvatarGroup className={classes.avatarGroup} spacing="medium" max={3}>
        {project.users.map((user, index) => {
          let userFound = currentUsers.find((currentUser) => {
            if (currentUser.id === user.id) {
              return currentUser;
            }
          });
          console.log(userFound, currentUsers);
          return (
            <Avatar
              key={index}
              alt={user.name}
              src={user.avatarUrl}
              className={userFound ? classes.active : classes.inactive}
              onClick={() =>
                userFound ? handleRemove(user.id) : handleAdd(user.id)
              }
            />
          );
        })}
      </AvatarGroup>
      <br />
      <Button
        variant={currentUserActive ? "contained" : null}
        className={classes.btn}
        onClick={
          currentUserActive
            ? () => handleRemoveForCurrentUser(currentUser.id)
            : () => handleAddForCurrentUser(currentUser.id)
        }
      >
        <span className={classes.text}>Only My Issues</span>
      </Button>

      {currentUsers.length > 0 || currentUserActive ? (
        <Button onClick={clearAllHandler}>
          <span className={classes.text}>Clear All</span>
        </Button>
      ) : null}
    </div>
  );
};

export default Users;
