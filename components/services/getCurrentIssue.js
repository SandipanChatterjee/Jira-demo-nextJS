import axios from "../eaxios";
export const getIssue = async (id) => {
  try {
    return await axios.get(`/issues/${id}`);
  } catch (e) {
    console.log(e);
  }
};
