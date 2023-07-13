import { AppContext } from "../../../ContextData";
import { getCurrentIssue } from "../../../actions/issues";
import { Loader } from "../../shared/loader/Loader";
import { getModalStyle, useStyles } from "./style";
import { setShowMasterIssue } from "../../../actions/masterIssue";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useRouter, withRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IssueModalContent from "../issueModal/IssueModalContent";
import React, { useEffect, useState, useRef, useContext } from "react";

const MasterIssueModal = ({ currentIssue }) => {
  const { projectData } = useContext(AppContext);
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const showMasterIssueModal = useSelector(
    (state) => state.masterIssueReducer.showMasterIssueModal
  );
  const currentIssueLoading = useSelector(
    (state) => state.issueReducer.currentIssueLoading
  );

  const loaderProject = useSelector((state) => state.projectReducer.loading);

  const modalCloseHandler = () => {
    dispatch(setShowMasterIssue(false));
    router.back();
  };

  useEffect(() => {
    dispatch(setShowMasterIssue(true));
  }, []);

  if (!currentIssueLoading) {
    if (Object.keys(currentIssue).length == 0) {
      router.back();
    }
  }

  /**
   * Not redirecting???
   */
  useEffect(() => {
    if (!projectData) {
      router.push("/");
    }
  }, [!projectData]);

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
              <IssueModalContent
                modalCloseHandler={modalCloseHandler}
                issue={currentIssue}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterIssueModal;
