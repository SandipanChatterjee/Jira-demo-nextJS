import React, { useEffect, useState, useRef } from "react";
import { getCurrentIssue } from "../../../actions/issues";
import { Loader } from "../../shared/loader/Loader";
import { getModalStyle, useStyles } from "./style";
import { setShowMasterIssue } from "../../../actions/masterIssue";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IssueModalContent from "../issueModal/IssueModalContent";

const MasterIssueModal = () => {
  // const [modalActive, setModalActive] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const showMasterIssueModal = useSelector(
    (state) => state.masterIssueReducer.showMasterIssueModal
  );
  const currentIssueLoading = useSelector(
    (state) => state.issueReducer.currentIssueLoading
  );
  const currentIssue = useSelector((state) => state.issueReducer.currentIssue);
  const newCommentData = useSelector(
    (state) => state.commentsReducer.newCommentData
  );
  const editCommentData = useSelector(
    (state) => state.commentsReducer.editCommentData
  );
  const deleteCommentData = useSelector(
    (state) => state.commentsReducer.deleteCommentData
  );

  const loaderProject = useSelector((state) => state.projectReducer.loading);

  const history = useHistory();

  const [modalStyle] = React.useState(getModalStyle);

  const modalRef = useRef();

  const mouseDownTarget = React.useRef();

  const modalCloseHandler = () => {
    dispatch(setShowMasterIssue(false));
    history.goBack();
  };

  useEffect(() => {
    console.log("ref##", modalRef.current);
    dispatch(setShowMasterIssue(true));
  }, []);

  if (!currentIssueLoading) {
    if (Object.keys(currentIssue).length == 0) {
      history.goBack();
    }
  }

  return (
    <div>
      <Dialog
        open={showMasterIssueModal}
        onClose={modalCloseHandler}
        fullWidth="true"
        maxWidth="lg"
        scroll="body"
      >
        <DialogContent>
          {currentIssueLoading ? (
            <div className={classes.loaderContainer}>
              <Loader />
            </div>
          ) : (
            <div style={loaderProject ? { pointerEvents: "none" } : null}>
              <IssueModalContent modalCloseHandler={modalCloseHandler} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterIssueModal;
