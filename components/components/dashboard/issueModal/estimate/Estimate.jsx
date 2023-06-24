import React, { useEffect } from "react";
import { setEstimationHandler } from "../../../../actions/issueModal/estimate";
import { updateIssueListHandler } from "../../../../actions/updateIssueList";
import { useSelector, useDispatch } from "react-redux";

import TextField from "@material-ui/core/TextField";

import "./estimate.module.css";
const Estimate = () => {
  const dispatch = useDispatch();

  const issue = useSelector((state) => state.issueReducer.currentIssue);
  const estimate =
    useSelector((state) => state.estimateReducer.estimate) || issue.estimate;

  const estimateChangeHandler = (e) => {
    e.preventDefault();
    const val = parseInt(e.target.value);
    dispatch(setEstimationHandler(val));
  };
  const updateEstimate = (e) => {
    estimateChangeHandler(e);
    dispatch(
      updateIssueListHandler({ estimate: parseInt(e.target.value) }, issue.id)
    );
  };

  const debounce = (fn) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, 1000);
    };
  };

  const estimateCallHandler = debounce(updateEstimate);
  return (
    <div>
      <p>ORIGINAL ESTIMATE (HOURS)</p>
      <TextField
        className="textfield"
        id="input-container"
        size="small"
        type="number"
        margin="normal"
        variant="outlined"
        onMouseUp={(e) => estimateCallHandler(e)}
        onKeyUp={(e) => estimateCallHandler(e)}
        defaultValue={estimate}
        inputProps={{ min: 0 }}
      />
    </div>
  );
};

export default Estimate;
