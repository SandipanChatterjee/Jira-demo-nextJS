import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProjectSettings from "../components/settings/ProjectSettings";

export const ProjectSettingsRoutes = () => {
  return (
    <Switch>
      <Route path="/project/settings" component={ProjectSettings} />
      <Redirect to="/project/settings" from="/" />
    </Switch>
  );
};
