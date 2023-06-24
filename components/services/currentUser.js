import axios from "../eaxios";
export const getCurrentUser = async () => {
  return await axios.get("currentUser");
};
