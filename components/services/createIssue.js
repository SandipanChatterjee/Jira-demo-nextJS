import axios from "../eaxios";
export const createIssue = async (payload) => {
  return await axios.post("issues", payload);
};
