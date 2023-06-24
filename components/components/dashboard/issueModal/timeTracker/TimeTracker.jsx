import React, { Fragment, useState } from "react";
import { useStyles, getModalStyle } from "./timeTrackerStyle";
import { setShowTimeTrackerModal } from "../../../../actions/issueModal/timeTracker";
import { useSelector, useDispatch } from "react-redux";

import Timer from "@material-ui/icons/Timer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Modal from "@material-ui/core/Modal";
import TimeTrackerModalContent from "./TimeTrackerModalContent";
import ErrorBoundary from "../../../../utils/ErrorBoundary";

const TimeTracker = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const issue = useSelector((state) => state.issueReducer.currentIssue);
  const estimate =
    useSelector((state) => state.estimateReducer.estimate) || issue.estimate;

  const showTimeTrackerModal = useSelector(
    (state) => state.timeTrackerReducer.showTimeTrackerModal
  );
  const timeRemaining =
    useSelector((state) => state.timeTrackerReducer.timeRemaining) ||
    issue.timeRemaining;

  const timeSpent =
    useSelector((state) => state.timeTrackerReducer.timeSpent) ||
    issue.timeSpent;

  const [modalStyle] = React.useState(getModalStyle);

  const showTimeTrackerModalHandler = () => {
    console.log("showTimeTrackerModalHandler#");
    dispatch(setShowTimeTrackerModal(true));
  };

  const closeTimeTrackerModalHandler = () => {
    dispatch(setShowTimeTrackerModal(false));
  };
  const progress =
    timeRemaining === null
      ? 100 - Math.abs(timeSpent - estimate) * 10
      : 100 - Math.abs(timeSpent - timeRemaining) * 10;

  return (
    <Fragment>
      <div>
        <p>TIME TRACKING</p>
        <div
          className={classes.timerContianer}
          onClick={showTimeTrackerModalHandler}
        >
          <Timer color="disabled" fontSize="medium" />
          <div className={classes.linearProgressContainer}>
            <LinearProgress variant="determinate" value={progress} />
            <div className={classes.logContainer}>
              <span>{timeSpent}h logged</span>{" "}
              {timeRemaining === null ? (
                <span>{estimate}h estimated</span>
              ) : (
                <span>{timeRemaining}h remaining</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={showTimeTrackerModal}
        onClose={closeTimeTrackerModalHandler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <TimeTrackerModalContent
            issue={issue}
            closeTimeTrackerModalHandler={closeTimeTrackerModalHandler}
          />
        </div>
      </Modal>
    </Fragment>
  );
};

export default TimeTracker;
