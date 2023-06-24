import React, { useEffect, useRef } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import { search, searchedDataHandler } from "../../../actions/search";
import { setIssueTypes } from "../../../actions/issues";
import { useStyles } from "./style";
import { convertToArrayOfObjects } from "../../../utils/utils";
import { useSelectorIssues } from "../../../utils/useSelectorIssues";
import { useSelector, useDispatch } from "react-redux";
import ErrorBoundary from "../../../utils/ErrorBoundary";
const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const selector = useSelectorIssues();
  const classes = useStyles();
  const ref = useRef(true);

  const issueTypes = [
    selector.backlogIssues,
    selector.selectedIssues,
    selector.inprogressIssues,
    selector.completedIssues,
  ];

  const arr = [
    selector.backlogIssues,
    selector.selectedIssues,
    selector.inprogressIssues,
    selector.completedIssues,
  ].flat(Infinity);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      dispatch(setIssueTypes(arr));
      dispatch(searchedDataHandler([]));
    } else {
      let issues = arr.filter((el) => {
        let title = el.title.toUpperCase();
        let value = val.toUpperCase();
        return title.includes(value);
      });
      if (issues.length > 0) {
        let searchedDataArr = convertToArrayOfObjects(issues);
        dispatch(searchedDataHandler(searchedDataArr));
      } else {
        dispatch(searchedDataHandler([]));
      }
    }
    dispatch(search(val));
  };

  const handleChangeDebounce = (fn) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, 500);
    };
  };

  const handleChangeDebounceHandler = handleChangeDebounce(handleChange);

  useEffect(() => {
    return () => {
      dispatch(search(""));
      dispatch(searchedDataHandler([]));
    };
  }, []);

  return (
    <div className={classes.root}>
      <ErrorBoundary>
        <TextField
          id="search"
          size="small"
          variant="outlined"
          InputProps={{
            className: classes.input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
          onChange={handleChangeDebounceHandler}
        />
      </ErrorBoundary>
    </div>
  );
};

export default Search;
