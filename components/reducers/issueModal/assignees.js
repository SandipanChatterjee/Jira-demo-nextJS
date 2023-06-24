import { actionTypes } from "../../actions/issueModal/assignees";
const initState = {
  showUsersList: false,
  assignedUsersId: [],
  assignedUsers: [],
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.show_users_list:
      return {
        ...state,
        showUsersList: action.showUsersList,
      };
    case actionTypes.assigned_users:
      return {
        ...state,
        assignedUsersId: [...state.assignedUsersId, action.assignedUsersId],
        assignedUsers: [...state.assignedUsers, { ...action.assignedUsers }],
      };
    case actionTypes.delete_users:
      return {
        ...state,
        assignedUsers: state.assignedUsers.filter(
          (user) => user.id !== action.deletedUserId
        ),
        assignedUsersId: state.assignedUsersId.filter(
          (id) => id !== action.deletedUserId
        ),
      };
    case actionTypes.reset_users: {
      return {
        ...state,
        assignedUsers: action.resetUser,
        assignedUsersId: action.resetUser,
        showUsersList: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
