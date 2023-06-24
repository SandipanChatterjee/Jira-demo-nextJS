import React, { useEffect, Fragment } from "react";
import {
  type,
  typeIconObj,
  formats,
  modules,
  priorityIcon,
  priorityObj,
  issueStatus,
} from "../../utils/utils";
import { primaryButtonColor } from "../../utils/globalStyles";
import {
  setShowIssueTypeList,
  setIssueType,
} from "../../actions/issueModal/type";
import {
  setSelectedReporter,
  setShowReporterList,
} from "../../actions/issueModal/reporter";
import {
  resetUsers,
  setAssignedUsers,
  setDeleteUsers,
  setShowUsersList,
} from "../../actions/issueModal/assignees";
import {
  closeCreateIssue,
  setSummary,
  setNewProjectDescription,
  setCreateNewIssue,
  closeErrorModal,
  resetCreateIssue,
} from "../../actions/createIssue";
import {
  setPriority,
  setShowPriorityList,
} from "../../actions/issueModal/priority";
import { useStyles } from "./CreateIssueStyle";
import { useDispatch, useSelector } from "react-redux";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

const CreateIssue = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.projectReducer.loading);
  const projectId = useSelector((state) => state.projectReducer.project.id);
  //issueType
  const issueType = useSelector((state) => state.typeReducer.type);
  const showIssueTypeList = useSelector(
    (state) => state.typeReducer.showIssueTypeList
  );
  //issueSummary-New
  const issueSummary = useSelector(
    (state) => state.createIssueReducer.issueSummary
  );
  //projectDescription - New
  const newProjectDescription = useSelector(
    (state) => state.createIssueReducer.newProjectDescription
  );
  //reporter
  const users =
    useSelector((state) => state.projectReducer.project.users) || [];
  const reporterId = useSelector((state) => state.reporterReducer.reporterId);
  const reporterData = useSelector(
    (state) => state.reporterReducer.reporterData
  );
  const showReporterList = useSelector(
    (state) => state.reporterReducer.showReporterList
  );
  //assignees
  const showUsersList = useSelector(
    (state) => state.assigneesReducer.showUsersList
  );
  const assignedUsersId = useSelector(
    (state) => state.assigneesReducer.assignedUsersId
  );
  const assignedUsers =
    useSelector((state) => state.assigneesReducer.assignedUsers) || [];
  //priorty
  const priority = useSelector((state) => state.priortyReducer.priority);
  const showPriorityList = useSelector(
    (state) => state.priortyReducer.showPriorityList
  );
  //createNewIssue
  const newIssueLoading = useSelector(
    (state) => state.createIssueReducer.newIssueLoading
  );
  const newIssueError = useSelector(
    (state) => state.createIssueReducer.newIssueError
  );
  const showErrorModal = useSelector(
    (state) => state.createIssueReducer.showErrorModal
  );
  const newIssue = useSelector((state) => state.createIssueReducer.newIssue);

  const typeValuesArr = Object.values(type);
  const issueTypesOption = typeValuesArr.filter((el) => el !== issueType);
  const usersOptionReporter = users.filter((el) => el.id !== reporterId);
  const userOptionsAssignees = users.filter(
    (el) => !assignedUsersId.includes(el.id)
  );
  const priorityOptions = Object.keys(priorityObj).filter(
    (el) => el !== priority
  );

  const changeIssueTypeHandler = (event, newType) => {
    dispatch(setIssueType(newType));
    dispatch(setShowIssueTypeList(false));
  };

  const showIssueTypeListHandler = () => {
    dispatch(setShowIssueTypeList(true));
  };
  const closeIssueTypeListHandler = () => {
    dispatch(setShowIssueTypeList(false));
  };
  const changeSummaryHandler = (e) => {
    dispatch(setSummary(e.target.value));
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
  const changeNewProjectDescription = (value) => {
    // const newProjectDescriptionText = value.replace(/(<([^>]+)>)/gi, "");
    dispatch(setNewProjectDescription(value));
  };
  const changeNewProjectDescriptionDebounceHandler = debounceHandler(
    changeNewProjectDescription
  );

  const showReporterListHandler = () => {
    dispatch(setShowReporterList(true));
  };

  const closeReporterListHandler = () => {
    dispatch(setShowReporterList(false));
  };

  const changeReporterHandler = (event, newValue) => {
    dispatch(setSelectedReporter(newValue.id, users));
    dispatch(setShowReporterList(false));
  };

  const deleteUserHandler = (userId) => {
    dispatch(setDeleteUsers(userId));
    dispatch(setShowUsersList(true));
  };

  const showUsersListHandler = () => {
    dispatch(setShowUsersList(true));
  };

  const closeUsersListHandler = () => {
    dispatch(setShowUsersList(false));
  };

  const changeUsersHandler = (e, val) => {
    if (assignedUsersId.includes(val.id)) {
      dispatch(setShowUsersList(false));
      return;
    }
    dispatch(setAssignedUsers(val));
    dispatch(setShowUsersList(false));
  };

  const showPriorityListHandler = () => {
    dispatch(setShowPriorityList(true));
  };
  const closePriorityListHandler = () => {
    dispatch(setShowPriorityList(false));
  };
  const changePriorityHandler = (event, newValue) => {
    dispatch(setPriority(newValue));
    dispatch(setShowPriorityList(false));
  };
  const errorModalCloseHandler = () => {
    dispatch(closeErrorModal());
  };
  const cancelHandler = () => {
    dispatch(closeCreateIssue());
  };
  const createIssueHandler = () => {
    const payload = {
      description: newProjectDescription,
      priority: priority,
      projectId: projectId,
      reporterId: reporterId,
      status: issueStatus.backlog,
      title: issueSummary,
      type: issueType,
      usersIds: [...assignedUsersId],
      users: assignedUsers.map((el) => {
        const newObj = {};
        newObj["id"] = el.id;
        return newObj;
      }),
    };
    dispatch(setCreateNewIssue(payload));
  };
  useEffect(() => {
    if (!loader) {
      dispatch(setIssueType("story"));
      dispatch(setSelectedReporter(users[0].id, users));
      dispatch(setPriority("3"));
    }
    return () => {
      dispatch(setIssueType(""));
      dispatch(setShowIssueTypeList(false));
      dispatch(setSummary(""));
      dispatch(setNewProjectDescription(""));
      dispatch(setSelectedReporter(null, []));
      dispatch(setShowReporterList(false));
      dispatch(resetUsers());
      dispatch(setPriority(""));
      dispatch(setShowPriorityList(false));
      dispatch(resetCreateIssue());
    };
  }, [loader]);

  if (loader) {
    return <p>Loading...</p>;
  }
  return (
    <div className={classes.root}>
      <h2>Create Issue</h2>
      <br />
      <br />
      <p>Issue Type</p>
      <Button
        onClick={showIssueTypeListHandler}
        className={classes.btn}
        variant="outlined"
      >
        <div className={classes.btnContent}>
          <span className={classes.icon}>
            {typeIconObj[typeValuesArr.indexOf(issueType)]}
          </span>
          <span className={classes.btnText}>{issueType}</span>
        </div>
        <div className={classes.btnContent}>
          <span className={classes.btnIcon}>
            <ArrowDropDownIcon />
          </span>
        </div>
      </Button>
      <span style={{ fontSize: "12px" }}>
        Start typing to get a list of possible matches.
      </span>
      {showIssueTypeList ? (
        <div onBlur={closeIssueTypeListHandler}>
          <Autocomplete
            freeSolo
            className={classes.autoCompleteContainer}
            onChange={(event, newValue) =>
              changeIssueTypeHandler(event, newValue)
            }
            options={issueTypesOption}
            renderOption={(option) => {
              console.log("option##", option);
              return (
                <Fragment>
                  {typeIconObj[typeValuesArr.indexOf(option)]}
                  <span style={{ marginLeft: "5px" }}>
                    {type[typeValuesArr.indexOf(option)]}
                  </span>
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
      <hr />
      <p>Short Summary</p>
      <div className={classes.inputElements}>
        <TextField
          required
          id="summary"
          error={issueSummary === ""}
          value={issueSummary}
          onChange={changeSummaryHandler}
          variant="outlined"
          size="small"
          className={classes.textField}
        />
        <span style={{ fontSize: "12px" }}>
          Concisely summarize the issue in one or two sentences.
        </span>
        <br />
        {issueSummary === "" ? (
          <span className={classes.errorText}>This field is required</span>
        ) : null}
      </div>
      <br />
      <p>Description</p>
      <div>
        {
          // <ReactQuill
          //   formats={formats}
          //   modules={modules}
          //   style={{ height: "150px" }}
          //   theme="snow"
          //   onChange={changeNewProjectDescriptionDebounceHandler}
          //   value={newProjectDescription}
          // />
        }
      </div>
      <br />
      <br />
      <div>
        <span className={classes.descriptionText}>
          Describe the issue in as much detail as you'd like.
        </span>
      </div>
      <br />
      <p className={classes.reporterHeading}>Reporter</p>
      <Button
        variant="outlined"
        onClick={showReporterListHandler}
        className={classes.btn}
      >
        <div className={classes.btnContent}>
          <Avatar src={reporterData.avatarUrl} className={classes.avatarSize} />
          <span className={classes.btnText}>{reporterData.name}</span>
        </div>
        <div className={classes.btnContent}>
          <span className={classes.btnIcon}>
            <ArrowDropDownIcon />
          </span>
        </div>
      </Button>
      {showReporterList ? (
        <div onBlur={closeReporterListHandler}>
          <Autocomplete
            freeSolo
            onChange={(event, newValue) =>
              changeReporterHandler(event, newValue)
            }
            options={usersOptionReporter}
            getOptionLabel={(option) => option.name}
            renderOption={(option) => {
              return (
                <Fragment>
                  <Avatar
                    src={option.avatarUrl}
                    className={classes.avatarSize}
                  />
                  <span className={classes.text}>{option.name}</span>
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
      <br />
      <p>Assignees</p>
      <Button
        variant="outlined"
        onClick={showUsersListHandler}
        className={classes.btn}
      >
        <div className={classes.btnContent}>
          {assignedUsers.map((user, index) => {
            return (
              <Button
                size="small"
                style={index !== 0 ? { marginLeft: "10px" } : null}
                variant="contained"
                onClick={() => deleteUserHandler(user.id)}
              >
                <Avatar src={user.avatarUrl} className={classes.avatarSize} />
                <span className={classes.btnText}>{user.name.toString()}</span>
                <ClearIcon fontSize="small" />
              </Button>
            );
          })}
          <Button color="primary" onClick={showUsersListHandler} size="small">
            <div className={classes.btnContent}>
              <AddIcon fontSize="small" className={classes.avatarSize} />
              <span className={classes.btnText}>Add more</span>
            </div>
          </Button>
        </div>
        <div className={classes.btnContent}>
          <span className={classes.btnIcon}>
            <ArrowDropDownIcon />
          </span>
        </div>
      </Button>
      {showUsersList ? (
        <div onBlur={closeUsersListHandler}>
          <Autocomplete
            className="autocomplete"
            freeSolo
            onChange={(event, newValue) => changeUsersHandler(event, newValue)}
            options={userOptionsAssignees}
            getOptionLabel={(option) => option.name}
            renderOption={(option) => {
              return (
                <Fragment>
                  <Avatar
                    src={option.avatarUrl}
                    className={classes.avatarSize}
                  />
                  <span className={classes.text}>{option.name}</span>
                </Fragment>
              );
            }}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                margin="normal"
                variant="outlined"
                autoFocus
              />
            )}
          />
        </div>
      ) : null}
      <br />
      <p>Priority</p>
      <Button
        variant="outlined"
        onClick={showPriorityListHandler}
        className={classes.btn}
      >
        <div className={classes.btnContent}>
          <span className={classes.avatarSize}>{priorityIcon[priority]}</span>
          <span className={classes.btnText}>{priorityObj[priority]}</span>
        </div>
        <div className={classes.btnContent}>
          <span className={classes.btnIcon}>
            <ArrowDropDownIcon />
          </span>
        </div>
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
                  <span>{priorityObj && priorityObj[option].toString()}</span>
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
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="small"
          variant="contained"
          style={{
            backgroundColor: issueSummary !== "" ? primaryButtonColor : null,
            color: "#fff",
            marginRight: "10px",
          }}
          disabled={issueSummary === ""}
          onClick={createIssueHandler}
        >
          {newIssueLoading ? (
            <CircularProgress
              size={15}
              thickness={4}
              style={{ color: "#fff", marginRight: "5px" }}
            />
          ) : null}

          <span>Create Issue</span>
        </Button>
        <Button size="small" variant="contained" onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
      <Dialog open={showErrorModal} onClose={errorModalCloseHandler}>
        <DialogContent>
          <Alert severity="error" onClose={errorModalCloseHandler}>
            <strong>{newIssueError}</strong>
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateIssue;
