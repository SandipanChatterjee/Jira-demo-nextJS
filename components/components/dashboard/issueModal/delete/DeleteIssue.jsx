import React, { useRef, useEffect } from "react";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import {
  setShowDeleteModal,
  setDeleteIssueHandler,
  resetDeleteIssue,
} from "../../../../actions/issueModal/delete";
import { getProjectData } from "../../../../actions/project";
import { setIssueTypes } from "../../../../actions/issues";
import { setShowMasterIssue } from "../../../../actions/masterIssue";
import { useStyles, getModalStyle } from "./deleteStyle";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../../shared/loader/Loader";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

const DeleteIssue = ({ issue }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const showDeleteModal = useSelector(
    (state) => state.deleteModalReducer.showDeleteModal
  );
  const deletedIssueData = useSelector(
    (state) => state.deleteModalReducer.deletedIssueData
  );

  const project = useSelector((state) => state.projectReducer.project);
  const loader = useSelector((state) => state.projectReducer.loading);
  const ref = useRef(true);

  const [modalStyle] = React.useState(getModalStyle);
  const showDeleteModalHandler = () => {
    dispatch(setShowDeleteModal(true));
  };
  const closeDeleteModalHandler = () => {
    dispatch(setShowDeleteModal(false));
  };

  const deleteIssueHandler = () => {
    dispatch(setDeleteIssueHandler(issue.id));
    dispatch(setShowDeleteModal(false));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    if (Object.keys(project).length > 0) {
      dispatch(setIssueTypes(project.issues));
      dispatch(setShowMasterIssue(false));
      history.goBack();
    }
  }, [project]);

  useEffect(() => {
    if (Object.keys(deletedIssueData).length > 0) {
      console.log("deletedIssueData#", deletedIssueData);
      dispatch(getProjectData());
    }
  }, [deletedIssueData]);

  useEffect(() => {
    return () => {
      dispatch(resetDeleteIssue());
    };
  }, []);

  if (loader) {
    return (
      <div className={classes.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Button size="small" onClick={showDeleteModalHandler}>
        <DeleteForeverRoundedIcon color="disabled" fontSize="medium" />
      </Button>
      <Modal
        open={showDeleteModal}
        onClose={closeDeleteModalHandler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Are you sure you want to delete this issue?</h2>
          <br />
          <p>Once you delete, it's gone for good.</p>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={deleteIssueHandler}
          >
            Delete issue
          </Button>{" "}
          <Button
            variant="contained"
            size="small"
            onClick={closeDeleteModalHandler}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteIssue;
