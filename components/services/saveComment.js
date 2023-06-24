import axios from "../eaxios";
export const saveComment = async (payload) => {
  return await axios.post("comments", payload);
};

export const saveEditedComment = async (id, payload) => {
  return await axios.put(`comments/${id}`, payload);
};
