import { getCurrentUser } from "../services/currentUser";

export const actionTypes = {
  users: "users",
  current_user: "current_user",
  current_user_active: "current_user_active",
  current_user_inactive: "current_user_inactive",
};

export const setUsers = (data) => {
  return {
    type: actionTypes.users,
    users: data,
  };
};

export const setCurrentUser = (data) => {
  return {
    type: actionTypes.current_user,
    currentUser: data,
  };
};

export const getCurrentUserData = (currentUserData) => {
  return async (dispatch) => {
    try {
      dispatch(setCurrentUser(currentUserData));
    } catch (e) {
      console.log(e);
    }
  };
};

export const setCurrentUserActive = (flag) => {
  return {
    type: actionTypes.current_user_active,
    currentUserActiveFlag: flag,
  };
};

export const setCurrentUserInActive = (flag) => {
  return {
    type: actionTypes.current_user_inactive,
    currentUserInActiveFlag: flag,
  };
};
