import { actionTypes } from "../../actions/issueModal/comments";
const initState = {
  commentsList: [],
  activeNewComment: false,
  newCommentText: "",
  newCommentLoading: false,
  newCommentData: {},
  newCommentFailedData: null,
  acitveEditComment: false,
  editCommentText: "",
  editCommentData: {},
  editCommentLoading: false,
  editCommentFaliedData: null,
  showDeleteCommentModal: false,
  deleteCommentData: {},
  deleteCommentLoading: false,
  deleteCommentFaliedData: null,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.comments_list:
      return {
        ...state,
        commentsList: [...action.commentsList],
      };
    case actionTypes.active_new_comment:
      return {
        ...state,
        activeNewComment: action.activeNewComment,
      };
    case actionTypes.new_comment_text:
      return {
        ...state,
        newCommentText: action.newCommentText,
      };
    case actionTypes.save_new_comment_loading:
      return {
        ...state,
        newCommentLoading: true,
      };
    case actionTypes.save_new_comment:
      return {
        ...state,
        newCommentData: action.newCommentData,
        commentsList: [...state.commentsList, action.newCommentData],
        newCommentLoading: false,
      };
    case actionTypes.save_fail_new_comment:
      return {
        ...state,
        newCommentFailedData: action.newCommentFailed,
        newCommentLoading: false,
      };
    case actionTypes.active_edit_comment:
      return {
        ...state,
        acitveEditComment: action.activeEditComment,
      };

    case actionTypes.edit_comment_text:
      return {
        ...state,
        editCommentText: action.editCommentText,
      };
    case actionTypes.save_edit_comment_loading:
      return {
        ...state,
        editCommentLoading: action.editCommentLoading,
      };
    case actionTypes.save_edit_comment:
      return {
        ...state,
        editCommentData: action.editCommentData,
        commentsList: [
          ...state.commentsList.filter(
            (el) => el.id !== action.editCommentData.id
          ),
          action.editCommentData,
        ],
        editCommentLoading: false,
      };
    case actionTypes.save_fail_edit_comment:
      return {
        ...state,
        editCommentFaliedData: action.editCommentFaliedData,
        editCommentLoading: false,
      };
    case actionTypes.show_delete_modal:
      return {
        ...state,
        showDeleteCommentModal: action.showDeleteCommentModal,
      };
    case actionTypes.delete_comment_loading:
      return {
        ...state,
        deleteCommentLoading: action.deleteCommentLoading,
      };
    case actionTypes.delete_comment_success:
      return {
        ...state,
        deleteCommentData: action.deleteCommentData,
        commentsList: state.commentsList.filter(
          (el) => el.id !== action.deleteCommentData.id
        ),

        deleteCommentLoading: false,
      };
    case actionTypes.delete_comment_fail:
      return {
        ...state,
        deleteCommentFailedData: action.deleteCommentFailedData,
        deleteCommentLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
