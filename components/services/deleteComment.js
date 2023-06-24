import axios from "../eaxios";
export const deleteCommentApi = async (id) => {
  return await axios.delete(`comments/${id}`);
};
