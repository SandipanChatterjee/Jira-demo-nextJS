import React, { useRef, Fragment, useEffect } from "react";
import { Avatar, Button, TextField, CircularProgress } from "@material-ui/core";
import {
  setActive,
  newCommentTextHandler,
  saveNewCommentHandler,
  saveNewCommentLoading,
} from "../../../../../actions/issueModal/comments";
import { useStyles } from "./commentStyle";
import { useSelector, useDispatch } from "react-redux";

const NewComment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const issue = useSelector((state) => state.issueReducer.currentIssue);

  const currentUser = useSelector((state) => state.usersReducer.currentUser);

  const newCommentText = useSelector(
    (state) => state.commentsReducer.newCommentText
  );
  const activeNewComment = useSelector(
    (state) => state.commentsReducer.activeNewComment
  );
  const newCommentLoading = useSelector(
    (state) => state.commentsReducer.newCommentLoading
  );
  const newCommentData = useSelector(
    (state) => state.commentsReducer.newCommentData
  );

  const inputRef = useRef(null);

  const activeHandler = () => {
    dispatch(setActive(true));
  };

  const inActiveHandler = () => {
    dispatch(setActive(false));
    dispatch(newCommentTextHandler(""));
  };

  window.addEventListener("keypress", (e) => {
    if (e.key === "m") {
      activeHandler();
    }
  });
  const changeCommentHandler = (e) => {
    const val = e.target.value;
    dispatch(newCommentTextHandler(val));
  };
  const saveHandler = () => {
    const payload = {
      body: newCommentText,
      issueId: issue.id,
      userId: currentUser.id,
    };
    dispatch(saveNewCommentHandler(payload, currentUser));
  };

  useEffect(() => {
    if (Object.keys(newCommentData).length > 0 && !newCommentLoading) {
      inActiveHandler();
    }
  }, [newCommentData]);

  return (
    <div>
      <div className={classes.newComment}>
        <div className={classes.avatar}>
          <Avatar src={currentUser.avatarUrl} />
        </div>
        <div>
          <div className={classes.inputContainer}>
            <TextField
              ref={inputRef}
              className={classes.input}
              id="standard-search"
              type="search"
              variant="outlined"
              placeholder="Add a comment.."
              multiline
              rows={activeNewComment ? 4 : 1}
              onClick={activeHandler}
              onChange={changeCommentHandler}
              value={newCommentText}
            />
          </div>
          <br />
          {activeNewComment ? null : (
            <div>
              <span>
                <b>Pro tip</b>: Press m to comment
              </span>
              <br />
            </div>
          )}
          <br />
          {activeNewComment ? (
            <Fragment>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveHandler}
                  size="small"
                >
                  <span>
                    {newCommentLoading ? (
                      <CircularProgress
                        size={15}
                        thickness={4}
                        style={{ color: "#fff", marginRight: "5px" }}
                      />
                    ) : null}{" "}
                    Save
                  </span>
                </Button>{" "}
                <Button onClick={inActiveHandler} size="small">
                  Cancel
                </Button>
              </div>
              <br />
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewComment;
