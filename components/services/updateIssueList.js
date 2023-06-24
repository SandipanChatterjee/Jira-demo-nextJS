import axios from "../eaxios";
export const updateIssueList = async (payload, id) => {
  try {
    return await axios.put(`/issues/${id}`, payload);
  } catch (e) {
    console.log(e);
  }
};
