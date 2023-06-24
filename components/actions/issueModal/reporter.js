import { updateIssueList } from "../../services/updateIssueList";

export const actionTypes = {
  show_reporter_list: "show_reporter_list",
  reporter_id: "reporter_id",
};

export const setShowReporterList = (flag) => {
  return {
    type: actionTypes.show_reporter_list,
    showReporterList: flag,
  };
};

export const setSelectedReporter = (id, users) => {
  const reporterData = users.find((el) => el.id == id);
  return {
    type: actionTypes.reporter_id,
    reporterId: id,
    reporterData: reporterData,
  };
};
