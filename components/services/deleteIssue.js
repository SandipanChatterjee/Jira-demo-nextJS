import axios from "../eaxios";
export const deleteIssue = async (id) => {
  return await axios.delete(`issues/${id}`);
};
