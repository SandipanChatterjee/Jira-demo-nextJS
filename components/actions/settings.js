import { updateProject, getProject } from "../services/Project";
import { success, getProjectData } from "./project";

export const actionTypes = {
  project_name: "project_name",
  project_url: "project_url",
  project_description: "project_description",
  project_category: "project_category",
};
export const setProjectName = (name) => {
  return {
    type: actionTypes.project_name,
    projectName: name,
  };
};

export const setProjectUrl = (url) => {
  return {
    type: actionTypes.project_url,
    projectUrl: url,
  };
};

export const setProjectDescription = (description) => {
  return {
    type: actionTypes.project_description,
    projectDescription: description,
  };
};

export const setProjectCategory = (category) => {
  return {
    type: actionTypes.project_category,
    selectedCategory: category,
  };
};

export const setUpdateProjectHandler = (payload) => {
  return async (dispatch) => {
    try {
      const response = await updateProject(payload);
      const data = await response;
      dispatch(getProjectData());
    } catch (e) {
      console.log(e);
    }
  };
};
