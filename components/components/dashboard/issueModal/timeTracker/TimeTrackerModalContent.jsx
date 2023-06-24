import React from "react";
import { useStyles } from "./timeTrackerStyle";
import {
  setTimeSpent,
  setTimeRemaining,
} from "../../../../actions/issueModal/timeTracker";
import { updateIssueListHandler } from "../../../../actions/updateIssueList";
import { useSelector, useDispatch } from "react-redux";

import Close from "@material-ui/icons/Close";
import Timer from "@material-ui/icons/Timer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";
import ErrorBoundary from "../../../../utils/ErrorBoundary";

const TimeTrackerModalContent = ({ issue, closeTimeTrackerModalHandler }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const estimate =
    useSelector((state) => state.estimateReducer.estimate) || issue.estimate;

  const timeSpent =
    useSelector((state) => state.timeTrackerReducer.timeSpent) ||
    issue.timeSpent;

  const timeRemaining =
    useSelector((state) => state.timeTrackerReducer.timeRemaining) ||
    issue.timeRemaining;

  const timeSpentHandler = (e) => {
    const payload = { timeSpent: e.target.value };
    dispatch(setTimeSpent(e.target.value));
    dispatch(updateIssueListHandler(payload, issue.id));
  };
  const timeRemaningHandler = (e) => {
    const payload = { timeRemaining: e.target.value };
    dispatch(setTimeRemaining(e.target.value));
    dispatch(updateIssueListHandler(payload, issue.id));
  };

  const progress =
    timeRemaining === null
      ? 100 - Math.abs(timeSpent - estimate) * 10
      : 100 - Math.abs(timeRemaining - timeSpent) * 10;
  return (
    <div>
      <div className={classes.timeTrackerModalHeader}>
        <span>
          <strong>Time tracking</strong>
        </span>
        <span
          className={classes.closeIcon}
          onClick={() => closeTimeTrackerModalHandler()}
        >
          <Close color="disabled" />{" "}
        </span>
      </div>
      <div className={classes.timerContianerModal}>
        <Timer color="disabled" fontSize="medium" />
        <div className={classes.linearProgressContainer}>
          <LinearProgress variant="determinate" value={progress} />
          <div className={classes.logContainer}>
            <span>{timeSpent}h logged</span>
            {timeRemaining === null ? (
              <span>{estimate}h estimated</span>
            ) : (
              <span>{timeRemaining}h remaining</span>
            )}
          </div>
        </div>
      </div>
      <div className={classes.timeCalulatorContainer}>
        <div className={classes.time}>
          <p>Time spent(hours)</p>
          <TextField
            type="number"
            size="small"
            variant="outlined"
            onMouseUp={(e) => timeSpentHandler(e)}
            onKeyUp={(e) => timeSpentHandler(e)}
            defaultValue={timeSpent}
          />
        </div>
        <div className={classes.time}>
          <p>Time remaining (hours)</p>
          <TextField
            type="number"
            size="small"
            variant="outlined"
            onMouseUp={(e) => timeRemaningHandler(e)}
            onKeyUp={(e) => timeRemaningHandler(e)}
            defaultValue={timeRemaining}
          />
        </div>
      </div>
      <br />
      <div style={{ float: "right" }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => closeTimeTrackerModalHandler()}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

TimeTrackerModalContent.propTypes = {
  issue: PropTypes.object,
  closeTimeTrackerModalHandler: PropTypes.func,
};

export default TimeTrackerModalContent;
