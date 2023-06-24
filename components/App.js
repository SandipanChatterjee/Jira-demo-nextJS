import React, { useEffect, useState, useRef } from "react";
import "./App.module.css";
import Navbar from "./components/navbar/Navbar";
import { RootRoutes } from "./routes/Index";
import { authenticate } from "./actions/guestAccount";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "./components/shared/loader/Loader";
import { getProjectData } from "./actions/project";
import { setIssueTypes } from "./actions/issues";
import SwipableDrawer from "./components/navbar/SwipableDrawer";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authenticateReducer.token);
  const project = useSelector((state) => state.projectReducer.project);
  const [previouslyStoredToken, setPreviouslyStoredToken] = useState("");
  const ref = useRef(true);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    if (Object.keys(project).length > 0) {
      console.log("APP", project);
      dispatch(setIssueTypes(project.issues));
    }
  }, [project]);

  useEffect(() => {
    setPreviouslyStoredToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (previouslyStoredToken) {
      dispatch(getProjectData());
    }
  }, [previouslyStoredToken]);

  useEffect(() => {
    if (process.env.NODE_ENV == "production") {
      console.log = function () {};
      console.warn = function () {};
      console.error = function () {};
    }
    if (!previouslyStoredToken) {
      dispatch(authenticate());
    }
  }, []);

  const renderRootRoutes = () => {
    return (
      <div className="container">
        {!previouslyStoredToken ? (
          !token ? (
            <div className="loaderContainer">
              <Loader />
            </div>
          ) : (
            <Dashboard />
          )
        ) : (
          <Dashboard />
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <aside className="swipable-drawer">
        <SwipableDrawer />
      </aside>
      <div className="navbar">
        <Navbar />
      </div>
      {renderRootRoutes()}
    </div>
  );
}

export default App;
