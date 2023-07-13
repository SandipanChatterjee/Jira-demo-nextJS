import axios from "../eaxios";
export const saveComment = async (payload) => {
  try {
    return await axios.post("comments", payload);
  } catch (e) {
    console.log(e);
  }
};

export const saveEditedComment = async (id, payload) => {
  return await axios.put(`comments/${id}`, payload);
};
