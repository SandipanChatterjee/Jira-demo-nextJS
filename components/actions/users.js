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

export const getCurrentUserData = () => {
  return async (dispatch) => {
    try {
      let response = await getCurrentUser();
      const data = await response;
      dispatch(setCurrentUser(data.currentUser));
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
