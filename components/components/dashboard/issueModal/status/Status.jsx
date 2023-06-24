import React, { useEffect, useState, useRef } from "react";
import { Button, TextField } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { issueStatus } from "../../../../utils/utils";
import {
  setIssueStatusDropDown,
  setIssueStatus,
} from "../../../../actions/issueModal/issueStatus";
import { updateIssueListHandler } from "../../../../actions/updateIssueList";
import {
  backlog,
  completed,
  getCurrentIssue,
  inprogress,
  selected,
  currentIssueFunction,
} from "../../../../actions/issues";
import { useStyles } from "./statusStyle";
import { useSelector, useDispatch } from "react-redux";
import { useSelectorIssues } from "../../../../utils/useSelectorIssues";

let issueStatusList = Object.keys(issueStatus).map((el) => el);
let issueStatusFilteredList = [];
const filter = createFilterOptions();
let modifiedIssues = [];
let response;
const usePreviousStatus = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Status = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const issue = useSelector((state) => state.issueReducer.currentIssue);

  const showIssueStatusDropdown = useSelector(
    (state) => state.issueStatusReducer.showIssueStatusDropdown
  );
  const selectedIssueStatus = useSelector(
    (state) => state.issueStatusReducer.selectedIssueStatus
  );
  const updatedIssue = useSelector(
    (state) => state.updateIssueListReducer.updatedIssue
  );

  const selectorIssue = useSelectorIssues();

  const issueTypes = {
    backlog: selectorIssue.backlogIssues,
    selected: selectorIssue.selectedIssues,
    inprogress: selectorIssue.inprogressIssues,
    done: selectorIssue.completedIssues,
  };

  const showDropDownHandler = () => {
    dispatch(setIssueStatusDropDown(true));
  };

  const changeIssueStatusHandler = (event, currentIssueStatus) => {
    console.log("changeIssueStatusHandler###", issueStatus, currentIssueStatus);
    console.log("issueStatus#Prev#Status", selectedIssueStatus);
    let filteredIssueArr = JSON.parse(
      JSON.stringify(issueTypes[selectedIssueStatus])
    );
    console.log("f1#", JSON.stringify(filteredIssueArr));
    const filteredIssue = filteredIssueArr.find((el) => el.id === issue.id);
    filteredIssue.status = currentIssueStatus;
    filteredIssueArr.splice(filteredIssueArr.indexOf(filteredIssue), 1);
    console.log("f2#", filteredIssueArr);
    // delete from list
    if (issue.status === issueStatus.backlog) {
      dispatch(backlog(filteredIssueArr));
    } else if (issue.status === issueStatus.selected) {
      dispatch(selected(filteredIssueArr));
    } else if (issue.status === issueStatus.inprogress) {
      console.log("del##inprogress##");
      dispatch(inprogress(filteredIssueArr));
    } else {
      console.log("del##done##");
      dispatch(completed(filteredIssueArr));
    }
    console.log("filteredIssue##", filteredIssue);
    dispatch(currentIssueFunction(filteredIssue));
    // add to list
    if (currentIssueStatus === issueStatus.backlog) {
      const newIssueArr = JSON.parse(
        JSON.stringify(selectorIssue.backlogIssues)
      );
      newIssueArr.push(filteredIssue);
      dispatch(backlog(newIssueArr));
    } else if (currentIssueStatus === issueStatus.selected) {
      const newIssueArr = JSON.parse(
        JSON.stringify(selectorIssue.selectedIssues)
      );
      newIssueArr.push(filteredIssue);
      dispatch(selected(newIssueArr));
    } else if (currentIssueStatus === issueStatus.inprogress) {
      console.log("add##inprogress##");
      const newIssueArr = JSON.parse(
        JSON.stringify(selectorIssue.inprogressIssues)
      );
      newIssueArr.push(filteredIssue);
      dispatch(inprogress(newIssueArr));
    } else {
      console.log("add##done##");
      const newIssueArr = JSON.parse(
        JSON.stringify(selectorIssue.completedIssues)
      );
      newIssueArr.push(filteredIssue);
      dispatch(completed(newIssueArr));
    }
    dispatch(setIssueStatus(currentIssueStatus));
    dispatch(setIssueStatusDropDown(false));
    dispatch(updateIssueListHandler({ status: currentIssueStatus }, issue.id));
    issueStatusFilteredList = issueStatusList.filter(
      (issueStatusEl) => issueStatusEl !== currentIssueStatus
    );
  };

  const closeIssueStatusHandler = () => {
    dispatch(setIssueStatusDropDown(false));
  };

  useEffect(() => {
    dispatch(setIssueStatus(issue.status));
    issueStatusFilteredList = issueStatusList.filter(
      (issueStatus) => issueStatus !== issue.status
    );
    return () => {
      dispatch(setIssueStatusDropDown(false));
    };
  }, []);

  return (
    <div className={classes.root}>
      <p>STATUS</p>
      <Button
        color="primary"
        variant="contained"
        onClick={showDropDownHandler}
        className={classes.button}
      >
        <span>{selectedIssueStatus}</span>{" "}
        <span className={classes.btnIcon}>
          <ArrowDropDown />
        </span>
      </Button>
      <br />

      {showIssueStatusDropdown ? (
        <div onBlur={closeIssueStatusHandler}>
          <Autocomplete
            freeSolo
            onChange={(event, newValue) =>
              changeIssueStatusHandler(event, newValue)
            }
            clearOnBlur={true}
            clearOnEscape={true}
            id="issue-status"
            options={issueStatusFilteredList}
            getOptionLabel={(option) => {
              return option === issueStatus.backlog
                ? "BACKLOG"
                : option === issueStatus.selected
                ? "SELECTED FOR DEVELOPMENT"
                : option === issueStatus.inprogress
                ? "IN PROGRESS"
                : "DONE";
            }}
            renderOption={(option) =>
              option === issueStatus.backlog
                ? "BACKLOG"
                : option === issueStatus.selected
                ? "SELECTED FOR DEVELOPMENT"
                : option === issueStatus.inprogress
                ? "IN PROGRESS"
                : "DONE"
            }
            renderInput={(params) => {
              console.log("params##", params);
              return (
                <TextField
                  {...params}
                  margin="normal"
                  variant="outlined"
                  autoFocus
                  size="small"
                />
              );
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Status;
