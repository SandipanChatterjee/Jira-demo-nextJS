import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "./ContextData";
import { setIssueTypes } from "./actions/issues";
import { getProjectData } from "./actions/project";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import SwipableDrawer from "./components/navbar/SwipableDrawer";
import ProjectSettings from "./components/settings/ProjectSettings";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

function App(props = {}) {
  const dispatch = useDispatch();
  const { setProjectData } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV == "production") {
      console.log = function () {};
      console.warn = function () {};
      console.error = function () {};
    }
    if (props?.project) {
      dispatch(getProjectData(props.project));
      dispatch(setIssueTypes(props.project.issues));
      setProjectData(props.project);
    }
  }, []);

  const renderRootRoutes = () => {
    if (router.pathname === "/") {
      return (
        <div className={styles.container}>
          <Dashboard project={props.project} />
        </div>
      );
    }
    if (router.pathname === "/project/settings") {
      return (
        <div className={styles.container}>
          <ProjectSettings />
        </div>
      );
    }
  };

  return (
    <div className={styles.App}>
      <aside className={styles.swipableDrawer}>
        <SwipableDrawer />
      </aside>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      {renderRootRoutes()}
    </div>
  );
}

export default App;
