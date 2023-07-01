import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "./App.module.css";
import Navbar from "./components/navbar/Navbar";
import { RootRoutes } from "./routes/Index";
import { authenticate } from "./actions/guestAccount";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "./components/shared/loader/Loader";
import { getProjectData } from "./actions/project";
import { setIssueTypes } from "./actions/issues";
import SwipableDrawer from "./components/navbar/SwipableDrawer";
import Dashboard from "./components/dashboard/Dashboard";
import { AppContext } from "./ContextData";
import { useRouter } from "next/router";
import ProjectSettings from "./components/settings/ProjectSettings";

function App(props = {}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authenticateReducer.token);
  const project = useSelector((state) => state.projectReducer.project);
  const [previouslyStoredToken, setPreviouslyStoredToken] = useState("");
  const ref = useRef(true);
  const { setProjectData } = useContext(AppContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current = false;
  //     return;
  //   }
  //   if (Object.keys(project).length > 0) {
  //     console.log("APP", project);
  //     dispatch(setIssueTypes(project.issues));
  //   }
  // }, [project]);

  // useEffect(() => {
  //   // setPreviouslyStoredToken(localStorage.getItem("token"));
  //   setPreviouslyStoredToken(
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQzNTEyNCwiaWF0IjoxNjg3NTg4MTAxLCJleHAiOjE3MDMxNDAxMDF9.UScSviM45bdCI8SDGczmnZepqwmLPDZiXSZX082wl7c"
  //   );
  // }, []);

  // useEffect(() => {
  //   if (previouslyStoredToken) {
  //     dispatch(getProjectData(props.project));
  //   }
  // }, [previouslyStoredToken]);

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
    // if (!previouslyStoredToken) {
    //   dispatch(authenticate(props.authToken));
    // }
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

  // const renderRootRoutes = () => {
  //   return (
  //     <div className="container">
  //       {!previouslyStoredToken ? (
  //         !token ? (
  //           <div className="loaderContainer">
  //             <Loader />
  //           </div>
  //         ) : (
  //           <Dashboard project={props.project} />
  //         )
  //       ) : (
  //         <Dashboard project={props.project} />
  //       )}
  //     </div>
  //   );
  // };

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
