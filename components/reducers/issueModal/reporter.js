import { actionTypes } from "../../actions/issueModal/reporter";
const initState = {
  showReporterList: false,
  reporterId: null,
  reporterData: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.reporter_id:
      return {
        ...state,
        reporterId: action.reporterId,
        reporterData: { ...action.reporterData },
      };
    case actionTypes.show_reporter_list:
      return {
        ...state,
        showReporterList: action.showReporterList,
      };
    default:
      return state;
  }
};

export default reducer;
