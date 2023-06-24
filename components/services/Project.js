import axios from "../eaxios";
export const getProject = async () => {
  return await axios.get("project");
};

export const updateProject = async (payload) => {
  return await axios.put("project", payload);
};
