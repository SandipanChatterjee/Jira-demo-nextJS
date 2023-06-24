import React, { useState } from "react";
import FeedbackIcon from "@material-ui/icons/Feedback";
import GitHubIcon from "@material-ui/icons/GitHub";
import { setShowFeedbackModal } from "../../../../actions/issueModal/feedback";
import { useStyles, getModalStyle } from "./feedbackStyle";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

const Feedback = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const showFeedbackModal = useSelector(
    (state) => state.feedbackReducer.showFeedbackModal
  );
  const [modalStyle] = React.useState(getModalStyle);

  const showFeedbackModalHandler = () => {
    dispatch(setShowFeedbackModal(true));
  };
  const closeFeedbackModalHandler = () => {
    dispatch(setShowFeedbackModal(false));
  };
  const gotoGithubRepo = () => {
    window.open("https://github.com/SandipanChatterjee/Jira-demo");
  };
  return (
    <div>
      <Button size="small" onClick={showFeedbackModalHandler}>
        <FeedbackIcon color="disabled" fontSize="medium" />
        <span style={{ fontSize: "12px" }}>Give feedback</span>
      </Button>
      <Modal
        open={showFeedbackModal}
        onClose={closeFeedbackModalHandler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <p style={{ textAlign: "justify" }}>
            This simplified Jira clone is built with React on the front-end and
            Node/TypeScript on the back-end.
          </p>{" "}
          <br />
          <Button
            size="small"
            color="primary"
            variant="contained"
            style={{ float: "right" }}
            onClick={gotoGithubRepo}
          >
            <GitHubIcon
              fontSize="medium"
              style={{ color: "#fff", marginRight: ".2rem" }}
            />
            Github Repo
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Feedback;
