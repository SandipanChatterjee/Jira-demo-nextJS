import React, { Fragment, useState, useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import { useStyles, getModalStyle } from "./style";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

import NewCommentSection from "./comments/comments/NewComment";
import CommentListSection from "./comments/comments/CommentList";

import { updateIssueList } from "../../../services/updateIssueList";
import {
  issueStatus as issueStatusObj,
  useOutsideAlerter,
} from "../../../utils/utils";
import {
  setTitleEditor,
  setTitleText,
  setDescriptionText,
  setDescriptionEditor,
} from "../../../actions/issueModal/editor";
import {
  backlog,
  selected,
  inprogress,
  completed,
} from "../../../actions/issues";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useSelectorIssues } from "../../../utils/useSelectorIssues";
import Status from "./status/Status";
import Assignees from "./assigness/Assignees";
import Reporter from "./reporter/Reporter";
import Priority from "./priorty/Priority";
import Estimate from "./estimate/Estimate";
import TimeTracker from "./timeTracker/TimeTracker";
import Feedback from "./feedback/Feedback";
import CopyLink from "./copyLink/CopyLink";
import DeleteIssue from "./delete/DeleteIssue";
import PropTypes from "prop-types";
import Issuetype from "./type/Issuetype";
import ErrorBoundary from "../../../utils/ErrorBoundary";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

let modifiedIssues = [];
let prevDescriptionValue = "";

const IssueModalContent = ({ modalCloseHandler }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectorIssue = useSelectorIssues();

  const showTitleEditor = useSelector(
    (state) => state.editorReducer.showTitleEditor
  );
  const titleText = useSelector((state) => state.editorReducer.titleText);
  const issue = useSelector((state) => state.issueReducer.currentIssue);

  const showDescriptionEditor = useSelector(
    (state) => state.editorReducer.showDescriptionEditor
  );
  const descriptionText = useSelector(
    (state) => state.editorReducer.descriptionText
  );

  const updatedIssue = useSelector(
    (state) => state.updateIssueListReducer.updatedIssue
  );

  const [modalStyle] = React.useState(getModalStyle);

  const titleRef = useRef();

  const safeIssueDescritpion = DOMPurify.sanitize(descriptionText);

  const issueStatus =
    Object.keys(updatedIssue).length == 0 ? issue.status : updatedIssue.status;

  const firstTimeRef = useRef(true);

  const modifyIssueHandler = (issueEl, titleText) => {
    console.log(
      "modifyIssueHandler#",
      issueEl,
      titleText,
      issue.id,
      issueStatus
    );

    const issuesCopy = JSON.parse(JSON.stringify(issueEl));
    const currentFilteredIssue = issuesCopy.find(
      (issuesEls) => issue.id === issuesEls.id
    );
    if (Object.keys(currentFilteredIssue).length > 0) {
      const index = issuesCopy.indexOf(currentFilteredIssue);
      issuesCopy.splice(index, 1);
      currentFilteredIssue.title = titleText;
      issuesCopy.splice(index, 0, { ...currentFilteredIssue });
      modifiedIssues = [...issuesCopy];
      console.log("modifiedIssues#", modifiedIssues);
    }
  };

  const handleTitleChange = (value) => {
    console.log("handleTitleChange####", value);
    const titleText = value.replace(/(<([^>]+)>)/gi, "");

    if (issueStatus === issueStatusObj.backlog) {
      modifyIssueHandler(selectorIssue.backlogIssues, titleText);
    } else if (issueStatus === issueStatusObj.done) {
      modifyIssueHandler(selectorIssue.completedIssues, titleText);
    } else if (issueStatus === issueStatusObj.inprogress) {
      modifyIssueHandler(selectorIssue.inprogressIssues, titleText);
    } else {
      modifyIssueHandler(selectorIssue.selectedIssues, titleText);
    }

    dispatch(setTitleText(titleText));
    updateIssueList({ title: titleText }, issue.id);
    if (modifiedIssues.length > 0) {
      if (issueStatus === issueStatusObj.backlog) {
        dispatch(backlog(modifiedIssues));
      } else if (issueStatus === issueStatusObj.done) {
        dispatch(completed(modifiedIssues));
      } else if (issueStatus === issueStatusObj.inprogress) {
        dispatch(inprogress(modifiedIssues));
      } else {
        dispatch(selected(modifiedIssues));
      }
    }
  };

  const handleDescriptionChange = (value) => {
    console.log("handleDescriptionChange####", value);
    dispatch(setDescriptionText(value));
  };

  const updateDescriptionHandler = () => {
    prevDescriptionValue = descriptionText;
    updateIssueList({ description: descriptionText }, issue.id);
    dispatch(setDescriptionEditor(false));
  };

  const cancelDescriptionHandler = () => {
    dispatch(setDescriptionText(prevDescriptionValue));
    dispatch(setDescriptionEditor(false));
  };

  const debounceHandler = (fn) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, 500);
    };
  };

  const handleTitleChangeDebounce = debounceHandler(handleTitleChange);
  const handleDescriptionChangeDebounce = debounceHandler(
    handleDescriptionChange
  );

  const closeTitleEditorHandler = () => {
    dispatch(setTitleEditor(false));
  };

  useEffect(() => {
    console.log("issuee##", issue);
    dispatch(setTitleText(issue.title));
    dispatch(setDescriptionText(issue.description));
    prevDescriptionValue = issue.description;
  }, [issue]);

  useEffect(() => {
    return () => {
      prevDescriptionValue = "";
      dispatch(setTitleText(""));
      dispatch(setDescriptionText(""));
      dispatch(setDescriptionEditor(false));
      dispatch(setTitleEditor(false));
      console.log("modifiedIssues#", modifiedIssues, issueStatus);
    };
  }, []);

  if (Object.keys(issue).length == 0) {
    return null;
  }
  const TitleTextContent = ({ titleText }) => {
    return <span>{titleText.toString()}</span>;
  };
  return (
    <div className={classes.paper}>
      <div style={{ flex: 2 }}>
        <div className={classes.modalHeader}>
          <Issuetype issue={issue} />
          <Button
            size="small"
            onClick={modalCloseHandler}
            className={classes.mobileCloseBtn}
          >
            <CloseIcon color="disabled" />
          </Button>
        </div>
        {showTitleEditor ? (
          <div
            onBlur={closeTitleEditorHandler}
            onLoad={() => titleRef.current.focus()}
          >
            {
              // <ReactQuill
              //   theme="snow"
              //   ref={titleRef}
              //   onChange={handleTitleChangeDebounce}
              //   value={titleText || ""}
              // />
            }
          </div>
        ) : (
          <h2
            className={(classes.titleText, classes.titleContainer)}
            onClick={() => dispatch(setTitleEditor(true))}
          >
            <ErrorBoundary error={"Title not found"}>
              <TitleTextContent titleText={titleText} />
            </ErrorBoundary>
          </h2>
        )}

        <br />
        <p>Description</p>
        {showDescriptionEditor ? (
          <Fragment>
            {
              // <ReactQuill
              //   formats={formats}
              //   modules={modules}
              //   theme="snow"
              //   onChange={handleDescriptionChangeDebounce}
              //   value={safeIssueDescritpion || ""}
              // />
            }
            <br />
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={updateDescriptionHandler}
            >
              Save
            </Button>{" "}
            <Button size="small" onClick={cancelDescriptionHandler}>
              Cancel
            </Button>
            <br />
          </Fragment>
        ) : (
          <div
            onClick={() => dispatch(setDescriptionEditor(true))}
            className={classes.descriptionContainer}
            dangerouslySetInnerHTML={{ __html: safeIssueDescritpion }}
          />
        )}

        <br />
        <p>Comments</p>
        <br />
        <NewCommentSection />
        <CommentListSection />
      </div>
      {
        <div style={{ flex: 1 }}>
          <div className={classes.left}>
            <Feedback />
            <CopyLink />
            <DeleteIssue issue={issue} />
            <Button size="small" onClick={modalCloseHandler}>
              <CloseIcon color="disabled" />
            </Button>
          </div>
          <br />
          <Status />
          <br />
          <Assignees />
          <br />
          <Reporter />
          <br />
          <Priority />
          <br />
          <Estimate />
          <br />
          <TimeTracker />
        </div>
      }
    </div>
  );
};

IssueModalContent.propTypes = {
  issue: PropTypes.object,
  modalCloseHandler: PropTypes.func,
};

export default IssueModalContent;
