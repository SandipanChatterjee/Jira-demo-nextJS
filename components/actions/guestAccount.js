import { createGuestAccount } from "../services/GuestAccount";
export const actionTypes = {
  START: "START_TOKEN_FETCH",
  SUCCESS: "SUCCESS_TOKEN_FETCH",
  FAIL: "FAIL_TOKEN_FETCH",
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
    token: data,
  };
};
export const fail = (data) => {
  return {
    type: actionTypes.FAIL,
    error: data,
  };
};

export const authenticate = () => {
  return async (dispatch) => {
    dispatch(start());
    try {
      let response = await createGuestAccount();
      const authToken = await response;
      console.log("authToken#", authToken);
      localStorage.setItem("token", authToken.data.authToken);
      dispatch(success(authToken.data.authToken));
    } catch (e) {
      dispatch(fail(e));
    }
  };
};
