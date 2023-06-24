import { createGuestAccount } from "../services/GuestAccount";
import { getProject } from "../services/Project";
export const actionTypes = {
  START: "START",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};

export const start = () => {
  return {
    type: actionTypes.START,
    loading: true,
  };
};

export const success = (data) => {
  return {
    type: actionTypes.SUCCESS,
    project: data,
  };
};
export const fail = (data) => {
  return {
    type: actionTypes.FAIL,
    error: data,
  };
};

export const getProjectData = () => {
  return async (dispatch) => {
    dispatch(start());
    try {
      let response = await getProject();
      const data = await response;
      dispatch(success(data.project));
    } catch (e) {
      dispatch(fail(e));
    }
  };
};
