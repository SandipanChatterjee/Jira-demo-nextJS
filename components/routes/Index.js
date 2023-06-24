import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import ProjectSettings from "../components/settings/ProjectSettings";
import { DashboardRoutes } from "./DashboardRoutes";
import { ProjectSettingsRoutes } from "./ProjectSettingsRoutes";

export const RootRoutes = () => {
  return (
    <Switch>
      <Route path="/project/board" component={Dashboard}>
        {DashboardRoutes}
      </Route>
      <Route path="/project/settings" component={ProjectSettings}>
        {ProjectSettingsRoutes}
      </Route>
      <Redirect to="/project/board" from="/" />
    </Switch>
  );
};
