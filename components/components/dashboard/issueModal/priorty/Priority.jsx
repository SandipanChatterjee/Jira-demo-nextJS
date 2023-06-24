import React, { useEffect, Fragment } from "react";
import {
  setPriority,
  setShowPriorityList,
} from "../../../../actions/issueModal/priority";
import { updateIssueListHandler } from "../../../../actions/updateIssueList";
import {
  priorityObj,
  priorityIcon,
  issueStatus,
} from "../../../../utils/utils";

import { useDispatch, useSelector } from "react-redux";
import "./priority.module.css";
import { useSelectorIssues } from "../../../../utils/useSelectorIssues";
import {
  backlog,
  selected,
  inprogress,
  completed,
} from "../../../../actions/issues";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ErrorBoundary from "../../../../utils/ErrorBoundary";

const Priority = () => {
  const dispatch = useDispatch();
  const issue = useSelector((state) => state.issueReducer.currentIssue);

  const priority = useSelector((state) => state.priortyReducer.priority);
  const showPriorityList = useSelector(
    (state) => state.priortyReducer.showPriorityList
  );
  const selector = useSelectorIssues();

  const issueTypes = {
    backlog: selector.backlogIssues,
    selected: selector.selectedIssues,
    inprogress: selector.inprogressIssues,
    done: selector.completedIssues,
  };

  const showPriorityListHandler = () => {
    dispatch(setShowPriorityList(true));
  };
  const closePriorityListHandler = () => {
    dispatch(setShowPriorityList(false));
  };
  const changePriorityHandler = (event, newValue) => {
    const filteredIssueArr = JSON.parse(
      JSON.stringify(issueTypes[issue.status])
    );
    const filteredIssue = filteredIssueArr.find((el) => el.id === issue.id);
    filteredIssue.priority = newValue;
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
    dispatch(setPriority(newValue));
    dispatch(updateIssueListHandler({ priority: newValue }, issue.id));
    dispatch(setShowPriorityList(false));
  };

  const priorityOptions = Object.keys(priorityObj).filter(
    (el) => el !== priority
  );
  useEffect(() => {
    dispatch(setPriority(issue.priority));
  }, []);
  const PriortyContent = ({ name }) => {
    console.log("name#", name);
    return <span>{name.toString()}</span>;
  };
  return (
    <div>
      <p>PRIORITY</p>
      <Button
        variant="text"
        onClick={showPriorityListHandler}
        style={{
          paddingTop: ".2rem",
          paddingBottom: ".2rem",
          paddingLeft: ".2rem",
          marginBottom: ".5rem",
          width: "auto",
          justifyContent: "flex-start",
        }}
      >
        <span style={{ textAlign: "left" }}>{priorityIcon[priority]}</span>
        <span>{priorityObj[priority]}</span>
      </Button>
      {showPriorityList ? (
        <div onBlur={closePriorityListHandler}>
          <Autocomplete
            freeSolo
            onChange={(event, newValue) =>
              changePriorityHandler(event, newValue)
            }
            options={priorityOptions}
            renderOption={(option) => {
              return (
                <Fragment>
                  <span>{priorityIcon[option]}</span>
                  <ErrorBoundary error={"Data not found"}>
                    <PriortyContent name={priorityObj && priorityObj[option]} />
                  </ErrorBoundary>
                </Fragment>
              );
            }}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                variant="outlined"
                autoFocus
                size="small"
              />
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Priority;
