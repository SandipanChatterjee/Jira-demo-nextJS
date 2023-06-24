import React, { Fragment, useEffect } from "react";
import { Button, InputLabel, TextField, Snackbar } from "@material-ui/core";
import { Autocomplete, Alert } from "@material-ui/lab";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjectCategory,
  setProjectDescription,
  setProjectName,
  setProjectUrl,
  setUpdateProjectHandler,
} from "../../actions/settings";
import { formats, modules, projectCategory } from "../../utils/utils";
import { Loader } from "../shared/loader/Loader";
import { useStyles } from "./style";
const ProjectSettings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projectReducer.project);
  const loader = useSelector((state) => state.projectReducer.loading);
  const projectName = useSelector((state) => state.settingsReducer.projectName);
  const projectUrl = useSelector((state) => state.settingsReducer.projectUrl);
  const projectDescription = useSelector(
    (state) => state.settingsReducer.projectDescription
  );
  const selectedCategory = useSelector(
    (state) => state.settingsReducer.selectedCategory
  );
  const changeNameHandler = (e) => {
    dispatch(setProjectName(e.target.value));
  };
  const changeUrlHandler = (e) => {
    dispatch(setProjectUrl(e.target.value));
  };

  const changeProjectDescription = (value) => {
    dispatch(setProjectDescription(value));
  };

  const changeCategoryHandler = (event, newValue) => {
    dispatch(setProjectCategory(newValue));
  };

  const updateProjectHandler = () => {
    console.log("updateProjectHandler");
    const payload = {
      category: selectedCategory,
      description: projectDescription,
      name: projectName,
      url: projectUrl,
    };
    dispatch(setUpdateProjectHandler(payload));
  };

  useEffect(() => {
    if (Object.keys(project).length > 0) {
      dispatch(setProjectName(project.name));
      dispatch(setProjectUrl(project.url));
      dispatch(setProjectDescription(project.description));
      dispatch(setProjectCategory(project.category));
    }
  }, [project]);

  if (loader) {
    return (
      <div className={classes.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <p>Projects / {project.name} / Project Details</p>
      <h3>Project Details</h3>
      <br />
      <div className={classes.inputElements}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <TextField
          required
          error={projectName === ""}
          id="name"
          value={projectName}
          onChange={changeNameHandler}
          variant="outlined"
          size="small"
          className={classes.textField}
        />
        {projectName === "" ? (
          <span className={classes.errorText}>This field is required</span>
        ) : null}
      </div>
      <div className={classes.inputElements}>
        <InputLabel htmlFor="url">URL</InputLabel>
        <TextField
          required
          id="url"
          value={projectUrl}
          onChange={changeUrlHandler}
          variant="outlined"
          size="small"
          className={classes.textField}
        />
      </div>
      <div className={classes.inputElements}>
        <InputLabel htmlFor="description">Description</InputLabel>
        {
          // <ReactQuill
          //   id="description"
          //   formats={formats}
          //   modules={modules}
          //   theme="snow"
          //   onChange={changeProjectDescription}
          //   value={projectDescription}
          // />
        }

        <span className={classes.descTxt}>
          Describe the project in as much detail as you like.
        </span>
      </div>
      <div className={classes.inputElements}>
        <InputLabel htmlFor="description">Project Category</InputLabel>
        <Autocomplete
          value={selectedCategory}
          onChange={(event, newValue) => changeCategoryHandler(event, newValue)}
          options={projectCategory}
          renderOption={(option) => {
            return (
              <Fragment>
                <span>{option}</span>
              </Fragment>
            );
          }}
          disableClearable={true}
          renderInput={(params) => (
            <TextField
              required={true}
              {...params}
              margin="normal"
              variant="outlined"
              autoFocus
              size="small"
            />
          )}
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={projectName === ""}
          onClick={updateProjectHandler}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default ProjectSettings;
