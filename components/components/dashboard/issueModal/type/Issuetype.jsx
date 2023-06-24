import React, { Fragment, useEffect } from "react";
import { type, typeIconObj, issueStatus } from "../../../../utils/utils";
import {
  setShowIssueTypeList,
  setIssueType,
} from "../../../../actions/issueModal/type";
import { updateIssueListHandler } from "../../../../actions/updateIssueList";
import { useSelector, useDispatch } from "react-redux";
import { useSelectorIssues } from "../../../../utils/useSelectorIssues";
import {
  backlog,
  selected,
  inprogress,
  completed,
} from "../../../../actions/issues";
import { useStyles } from "./issueTypeStyle";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";

const Issuetype = ({ issue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const issueType = useSelector((state) => state.typeReducer.type);
  const showIssueTypeList = useSelector(
    (state) => state.typeReducer.showIssueTypeList
  );
  const selector = useSelectorIssues();

  const issueTypes = {
    backlog: selector.backlogIssues,
    selected: selector.selectedIssues,
    inprogress: selector.inprogressIssues,
    done: selector.completedIssues,
  };

  const showIssueTypeListHandler = () => {
    dispatch(setShowIssueTypeList(true));
  };
  const closeIssueTypeListHandler = () => {
    dispatch(setShowIssueTypeList(false));
  };
  const changeIssueTypeHandler = (event, newType) => {
    const filteredIssueArr = JSON.parse(
      JSON.stringify(issueTypes[issue.status])
    );
    const filteredIssue = filteredIssueArr.find((el) => el.id === issue.id);
    filteredIssue.type = newType;
    filteredIssueArr.splice(
      filteredIssueArr.indexOf(filteredIssue),
      1,
      filteredIssue
    );
    if (issue.status === issueStatus.backlog) {
      dispatch(backlog(filteredIssueArr));
    } else if (issue.status === issueStatus.selected) {
      dispatch(selected(filteredIssueArr));
    } else if (issue.status === issueStatus.inprogress) {
      dispatch(inprogress(filteredIssueArr));
    } else {
      dispatch(completed(filteredIssueArr));
    }
    dispatch(setIssueType(newType));
    const payload = { type: newType };
    dispatch(updateIssueListHandler(payload, issue.id));
    dispatch(setShowIssueTypeList(false));
  };

  const typeValuesArr = Object.values(type);
  const issueTypesOption = typeValuesArr.filter((el) => el !== issueType);

  useEffect(() => {
    dispatch(setIssueType(issue.type));
  }, []);

  return (
    <div>
      <Button onClick={showIssueTypeListHandler} className={classes.btn}>
        <span className={classes.icon}>
          {typeIconObj[typeValuesArr.indexOf(issueType)]}
        </span>
        <span className={classes.btnText}>{issueType + "-" + issue.id}</span>
      </Button>
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
    </div>
  );
};

Issuetype.ropTypes = {
  issue: PropTypes.object,
};

export default Issuetype;
