import { createIssue as createIssueService } from "../services/createIssue";
import { getProjectData } from "./project";
export const actionTypes = {
  OPEN_CREATE_ISSUE: "OPEN_CREATE_ISSUE",
  CLOSE_CREATE_ISSUE: "CLOSE_CREATE_ISSUE",
  SET_SUMMARY: "SET_SUMMARY",
  NEW_PROJECT_DESCRIPTION: "NEW_PROJECT_DESCRIPTION",
  CREATE_NEW_ISSUE_LOADING: "CREATE_NEW_ISSUE_LOADING",
  CREATE_NEW_ISSUE: "CREATE_NEW_ISSUE",
  CREATE_NEW_ISSUE_ERROR: "CREATE_NEW_ISSUE_ERROR",
  CLOSE_ERROR_MODAL: "CLOSE_ERROR_MODAL",
  RESET_CREATE_ISSUE: "RESET_CREATE_ISSUE",
};

export const openCreateIssue = () => {
  return {
    type: actionTypes.OPEN_CREATE_ISSUE,
  };
};

export const closeCreateIssue = () => {
  return {
    type: actionTypes.CLOSE_CREATE_ISSUE,
  };
};

export const setSummary = (text) => {
  return {
    type: actionTypes.SET_SUMMARY,
    issueSummary: text,
  };
};

export const setNewProjectDescription = (text) => {
  return {
    type: actionTypes.NEW_PROJECT_DESCRIPTION,
    newProjectDescription: text,
  };
};
export const createIssueLoadingHandler = (payload) => {
  return {
    type: actionTypes.CREATE_NEW_ISSUE_LOADING,
    loading: payload,
  };
};
export const createNewIssueHandler = (payload) => {
  return {
    type: actionTypes.CREATE_NEW_ISSUE,
    newIssue: payload,
  };
};
export const createNewIssueErrorHandler = (payload) => {
  return {
    type: actionTypes.CREATE_NEW_ISSUE_ERROR,
    error: payload,
    showErrorModal: true,
  };
};
export const closeErrorModal = () => {
  return {
    type: actionTypes.CLOSE_ERROR_MODAL,
    error: null,
    showErrorModal: false,
  };
};
export const setCreateNewIssue = (payload) => {
  return async (dispatch) => {
    dispatch(createIssueLoadingHandler(true));
    try {
      const res = await createIssueService(payload);
      const data = await res;
      dispatch(createNewIssueHandler(data));
      dispatch(createIssueLoadingHandler(false));
      dispatch(closeCreateIssue());
      dispatch(getProjectData());
    } catch (e) {
      console.log("error#", e);
      dispatch(createIssueLoadingHandler(false));
      dispatch(createNewIssueErrorHandler(e));
    }
  };
};

export const resetCreateIssue = () => {
  return {
    type: actionTypes.RESET_CREATE_ISSUE,
  };
};
