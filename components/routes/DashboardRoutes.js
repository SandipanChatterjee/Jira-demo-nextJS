import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Loader } from "../components/shared/loader/Loader";

const fallbackComponent = () => {
  return (
    <span>
      <Loader />
    </span>
  );
};

const Dashboard = lazy(() => import("../components/dashboard/Dashboard"));
const CreateIssue = lazy(() => import("../components/createIssue/CreateIssue"));
const MasterIssueModal = lazy(() =>
  import("../components/dashboard/issueModal/MasterIssueModal")
);
export const DashboardRoutes = () => {
  return (
    <Suspense fallback={fallbackComponent}>
      <Switch>
        <Route exact path="/project/board" component={Dashboard} />
        <Route
          exact
          path="/project/board/createissue"
          component={CreateIssue}
        />
        <Route
          exact
          path="/project/board/:issueId"
          component={MasterIssueModal}
        />
        <Redirect to="/project/board" from="/" />
      </Switch>
    </Suspense>
  );
};
