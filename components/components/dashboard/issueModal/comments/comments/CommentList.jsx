import React, { Fragment, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  CircularProgress,
  Modal,
} from "@material-ui/core";
import { useStyles, getModalStyle } from "./commentStyle";
import {
  setCommentList,
  setEditActive,
  setCurrentCommentIndex,
  editCommentTextHandler,
  saveEditCommentHandler,
  deleteCommentModal,
  deleteCommentHandler,
} from "../../../../../actions/issueModal/comments";
import {
  CommentUserNameContent,
  CommentBodyContent,
} from "../CommentListErrorBoundary";
import { useSelector, useDispatch } from "react-redux";
import ErrorBoundary from "../../../../../utils/ErrorBoundary";

let currentDeleteElementId = 0;
let currentCommentIndex = null;

const CommentList = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const dispatch = useDispatch();

  const issue = useSelector((state) => state.issueReducer.currentIssue);
  let currentUser = useSelector((state) => state.usersReducer.currentUser);
  const commentsList = useSelector(
    (state) => state.commentsReducer.commentsList
  );
  const acitveEditComment = useSelector(
    (state) => state.commentsReducer.acitveEditComment
  );
  const editCommentText = useSelector(
    (state) => state.commentsReducer.editCommentText
  );
  const editCommentLoading = useSelector(
    (state) => state.commentsReducer.editCommentLoading
  );
  const editCommentData = useSelector(
    (state) => state.commentsReducer.editCommentData
  );
  const showDeleteCommentModal = useSelector(
    (state) => state.commentsReducer.showDeleteCommentModal
  );
  const deleteCommentData = useSelector(
    (state) => state.commentsReducer.deleteCommentData
  );
  const deleteCommentLoading = useSelector(
    (state) => state.commentsReducer.deleteCommentLoading
  );

  const editCommentActiveHandler = (index, commentText) => {
    console.log("commentText#", commentText);
    dispatch(setEditActive(true));
    currentCommentIndex = index;
    dispatch(editCommentTextHandler(commentText));
    // dispatch(setCurrentCommentIndex(index));
  };

  const editCommentInActiveHandler = () => {
    dispatch(setEditActive(false));
    dispatch(editCommentTextHandler(""));
    currentCommentIndex = null;
    // dispatch(setCurrentCommentIndex(null));
  };

  const changeCommentHandler = (e) => {
    const val = e.target.value;
    dispatch(editCommentTextHandler(val));
  };
  const editHandler = (e, id) => {
    e.preventDefault();
    const payload = {
      body: editCommentText,
    };

    dispatch(saveEditCommentHandler(id, payload, currentUser));
  };

  const deleteCommentModalHandler = (id) => {
    console.log("deleteModalHandler#", id);
    currentDeleteElementId = id;
    // deleteCommentHandler
    dispatch(deleteCommentModal(true));
  };
  const deleteCommentModalCloseHandler = () => {
    dispatch(deleteCommentModal(false));
  };

  useEffect(() => {
    if (Object.keys(editCommentData).length > 0 && !editCommentLoading) {
      editCommentInActiveHandler();
    }
    if (Object.keys(deleteCommentData).length > 0 && !deleteCommentLoading) {
      deleteCommentModalCloseHandler();
    }
  }, [editCommentData, deleteCommentData]);

  const renderModal = (id) => {
    console.log("id##", id);
    return (
      <Modal
        open={showDeleteCommentModal}
        onClose={deleteCommentModalCloseHandler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.commentsModalContainer}>
          <h2>Are you sure you want to delete this comment?</h2>
          <span>Once you delete, it's gone for good.</span>
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            size="small"
            style={{ marginRight: "15px" }}
            onClick={() => dispatch(deleteCommentHandler(id, currentUser))}
          >
            Delete Comment
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => deleteCommentModalCloseHandler()}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    );
  };
  useEffect(() => {
    commentsList.map((comment, index) => {
      if (currentCommentIndex == index) {
        dispatch(editCommentTextHandler(comment.body));
      }
    });
  }, [acitveEditComment]);

  useEffect(() => {
    dispatch(setCommentList(issue.comments));
    return () => {
      currentDeleteElementId = 0;
    };
  }, []);

  if (commentsList.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <div>
        {commentsList.map((comment, index) => {
          console.log("issue#comments");
          return (
            <div className={classes.commentsContainer} key={index}>
              <div className={classes.avatar}>
                <Avatar src={comment.user.avatarUrl} />
              </div>
              <div>
                <ErrorBoundary error={"User name not found"}>
                  <CommentUserNameContent name={comment.user.name} />
                </ErrorBoundary>
                <br />

                {acitveEditComment && currentCommentIndex == index ? (
                  <div>
                    <br />
                    <TextField
                      className={classes.input}
                      id="standard-search"
                      label="Search field"
                      type="search"
                      variant="outlined"
                      multiline
                      rows={4}
                      onChange={changeCommentHandler}
                      value={editCommentText}
                    />
                    <br />
                    <br />
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => editHandler(e, comment.id)}
                        disabled={editCommentText === "" ? true : false}
                        size="small"
                      >
                        {" "}
                        <div className={classes.buttonContainer}>
                          {editCommentLoading ? (
                            <CircularProgress
                              size={15}
                              thickness={4}
                              style={{ color: "#fff", marginRight: "5px" }}
                            />
                          ) : null}

                          <span>Save</span>
                        </div>
                      </Button>
                      {"   "}
                      <Button onClick={editCommentInActiveHandler} size="small">
                        Cancel
                      </Button>
                    </div>
                    <br />
                  </div>
                ) : (
                  <div className={classes.commentBody}>
                    <ErrorBoundary error={"Comment body not found"}>
                      <CommentBodyContent commentBody={comment.body} />
                    </ErrorBoundary>
                    <Link
                      component="button"
                      onClick={() =>
                        editCommentActiveHandler(index, comment.body)
                      }
                    >
                      Edit
                    </Link>{" "}
                    <Link
                      component="button"
                      onClick={() => deleteCommentModalHandler(comment.id)}
                    >
                      Delete
                    </Link>
                  </div>
                )}
              </div>
              <div>
                {showDeleteCommentModal && currentDeleteElementId === comment.id
                  ? renderModal(comment.id)
                  : null}
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default CommentList;
