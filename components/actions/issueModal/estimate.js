import { updateIssueList } from "../../services/updateIssueList";

export const actionTypes = {
  set_estismate: "set_estismate",
};

export const setEstimationHandler = (data) => {
  return {
    type: actionTypes.set_estismate,
    estimate: data,
  };
};
