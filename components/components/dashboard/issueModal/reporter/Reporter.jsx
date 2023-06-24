import React, { useEffect, Fragment } from "react";
import {
  setSelectedReporter,
  setShowReporterList,
} from "../../../../actions/issueModal/reporter";
import { updateIssueListHandler } from "../../../../actions/updateIssueList";
import { createFilterOptions } from "@material-ui/lab";
import { useStyles } from "./reporterStyle";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Reporter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const issue = useSelector((state) => state.issueReducer.currentIssue);

  const users = useSelector((state) => state.projectReducer.project.users);
  const reportedId = useSelector((state) => state.reporterReducer.reporterId);
  const reporterData = useSelector(
    (state) => state.reporterReducer.reporterData
  );

  const showReporterList = useSelector(
    (state) => state.reporterReducer.showReporterList
  );

  const showReporterListHandler = () => {
    dispatch(setShowReporterList(true));
  };

  const closeReporterListHandler = () => {
    dispatch(setShowReporterList(false));
  };

  const changeReporterHandler = (event, newValue) => {
    dispatch(setSelectedReporter(newValue.id, users));
    dispatch(updateIssueListHandler({ reporterId: newValue.id }, issue.id));
    dispatch(setShowReporterList(false));
  };

  useEffect(() => {
    if (users.length > 0) {
      dispatch(setSelectedReporter(issue.reporterId, users));
    }
  }, []);

  const usersOption = users.filter((el) => el.id !== reportedId);

  return (
    <div>
      <p>REPORTER</p>
      <Button
        variant="contained"
        onClick={showReporterListHandler}
        className={classes.parentContainer}
      >
        <Avatar src={reporterData.avatarUrl} className={classes.avatarSize} />
        <span className={classes.text}>{reporterData.name}</span>
      </Button>
      {showReporterList ? (
        <div onBlur={closeReporterListHandler}>
          <Autocomplete
            freeSolo
            onChange={(event, newValue) =>
              changeReporterHandler(event, newValue)
            }
            options={usersOption}
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
    </div>
  );
};

export default Reporter;
