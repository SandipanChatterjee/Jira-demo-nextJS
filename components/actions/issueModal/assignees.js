export const actionTypes = {
  show_users_list: "show_users_list",
  assigned_users_id: "assigned_users_id",
  assigned_users: "assigned_users",
  delete_users: "delete_users",
  reset_users: "reset_users",
};

export const setShowUsersList = (flag) => {
  return {
    type: actionTypes.show_users_list,
    showUsersList: flag,
  };
};

/*export const setAssignedUsersId = (ids) => {
  return {
    type: actionTypes.assigned_users_id,
    
  };
};*/

export const setAssignedUsers = (data) => {
  return {
    type: actionTypes.assigned_users,
    assignedUsers: data,
    assignedUsersId: data.id,
  };
};

export const setDeleteUsers = (data) => {
  return {
    type: actionTypes.delete_users,
    deletedUserId: data,
  };
};

export const resetUsers = () => {
  return {
    type: actionTypes.reset_users,
    resetUser: [],
  };
};
