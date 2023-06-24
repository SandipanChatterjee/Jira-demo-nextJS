import { saveComment, saveEditedComment } from "../../services/saveComment";
import { deleteCommentApi } from "../../services/deleteComment";
export const actionTypes = {
  comments_list: "comment_list",
  active_new_comment: "active_new_comment",
  new_comment_text: "new_comment",
  save_new_comment_loading: "save_new_comment_loading",
  save_new_comment: "save_new_comment",
  save_fail_new_comment: "save_fail_new_comment",
  active_edit_comment: "active_edit_comment",
  edit_comment_text: "edit_comment_text",
  save_edit_comment_loading: "save_edit_comment_loading",
  save_edit_comment: "save_edit_comment",
  save_fail_edit_comment: "save_fail_edit_comment",
  show_delete_modal: "show_delete_modal",
  delete_comment_loading: "delete_comment_loading",
  delete_comment_fail: "delete_comment_fail",
  delete_comment_success: "delete_comment_success",
};

export const setCommentList = (data) => {
  return {
    type: actionTypes.comments_list,
    commentsList: data,
  };
};

export const setActive = (flag) => {
  return {
    type: actionTypes.active_new_comment,
    activeNewComment: flag,
  };
};

export const newCommentTextHandler = (data) => {
  return {
    type: actionTypes.new_comment_text,
    newCommentText: data,
  };
};

export const saveNewCommentSuccess = (data) => {
  return {
    type: actionTypes.save_new_comment,
    newCommentData: data,
  };
};

export const saveNewCommentFail = (data) => {
  return {
    type: actionTypes.save_fail_new_comment,
    newCommentFailed: data,
  };
};

export const saveNewCommentLoading = (flag) => {
  console.log("flag##", flag);
  return {
    type: actionTypes.save_new_comment_loading,
    newCommentLoading: flag,
  };
};

export const saveNewCommentHandler = (payload, currentUser) => {
  return async (dispatch) => {
    dispatch(saveNewCommentLoading(true));
    try {
      let response = await saveComment(payload);
      const data = await response;
      dispatch(saveNewCommentLoading(false));
      const comment = { ...data.comment, user: currentUser };
      console.log("comment##", comment, currentUser);
      dispatch(saveNewCommentSuccess(comment));
    } catch (e) {
      dispatch(saveNewCommentLoading(false));
      dispatch(saveNewCommentFail(e));
    }
  };
};

export const setEditActive = (flag) => {
  return {
    type: actionTypes.active_edit_comment,
    activeEditComment: flag,
  };
};

export const editCommentTextHandler = (data) => {
  return {
    type: actionTypes.edit_comment_text,
    editCommentText: data,
  };
};

export const saveEditCommentSuccess = (data) => {
  return {
    type: actionTypes.save_edit_comment,
    editCommentData: data,
  };
};

export const saveEditCommentFail = (data) => {
  return {
    type: actionTypes.save_fail_edit_comment,
    editCommentFailedData: data,
  };
};

export const saveEditCommentLoading = (flag) => {
  return {
    type: actionTypes.save_edit_comment_loading,
    editCommentLoading: flag,
  };
};

export const saveEditCommentHandler = (id, payload, currentUser) => {
  return async (dispatch) => {
    dispatch(saveEditCommentLoading(true));
    try {
      let response = await saveEditedComment(id, payload);
      const data = await response;
      const comment = { ...data.comment, user: currentUser };
      dispatch(saveEditCommentSuccess(comment));
      dispatch(saveEditCommentLoading(false));
    } catch (e) {
      dispatch(saveEditCommentFail(e));
      dispatch(saveEditCommentLoading(false));
    }
  };
};

export const deleteCommentModal = (flag) => {
  return {
    type: actionTypes.show_delete_modal,
    showDeleteCommentModal: flag,
  };
};

export const deleteCommentSuccess = (data) => {
  return {
    type: actionTypes.delete_comment_success,
    deleteCommentData: data,
  };
};

export const deleteCommentFail = (data) => {
  return {
    type: actionTypes.delete_comment_fail,
    deleteCommentFailedData: data,
  };
};

export const deleteCommentLoading = (flag) => {
  return {
    type: actionTypes.delete_comment_loading,
    deleteCommentLoading: flag,
  };
};

export const deleteCommentHandler = (id, currentUser) => {
  return async (dispatch) => {
    dispatch(deleteCommentLoading(true));
    try {
      let response = await deleteCommentApi(id);
      const data = await response;
      const comment = { id: id, ...data.comment, user: currentUser };
      dispatch(deleteCommentSuccess(comment));
      dispatch(deleteCommentLoading(false));
    } catch (e) {
      dispatch(deleteCommentFail(e));
      dispatch(deleteCommentLoading(false));
    }
  };
};
