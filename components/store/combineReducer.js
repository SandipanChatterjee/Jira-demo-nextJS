import authenticateReducer from "../reducers/guestAccount";
import projectReducer from "../reducers/project";
import issueReducer from "../reducers/issue";
import searchReducer from "../reducers/search";
import usersReducer from "../reducers/users";
import masterIssueReducer from "../reducers/masterIssue";
import commentsReducer from "../reducers/issueModal/comments";
import editorReducer from "../reducers/issueModal/editor";
import issueStatusReducer from "../reducers/issueModal/issueStatus";
import assigneesReducer from "../reducers/issueModal/assignees";
import reporterReducer from "../reducers/issueModal/reporter";
import priortyReducer from "../reducers/issueModal/priority";
import estimateReducer from "../reducers/issueModal/estimate";
import timeTrackerReducer from "../reducers/issueModal/timeTracker";
import updateIssueListReducer from "../reducers/updateIssueList";
import feedbackReducer from "../reducers/issueModal/feedback";
import deleteModalReducer from "../reducers/issueModal/delete";
import typeReducer from "../reducers/issueModal/type";
import settingsReducer from "../reducers/settings";
import createIssueReducer from "../reducers/createIssue";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  authenticateReducer,
  projectReducer,
  masterIssueReducer,
  issueReducer,
  searchReducer,
  usersReducer,
  commentsReducer,
  editorReducer,
  issueStatusReducer,
  assigneesReducer,
  reporterReducer,
  priortyReducer,
  estimateReducer,
  timeTrackerReducer,
  updateIssueListReducer,
  feedbackReducer,
  deleteModalReducer,
  typeReducer,
  settingsReducer,
  createIssueReducer,
});
