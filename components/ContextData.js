import { createContext, useMemo, useState } from "react";

const AppContext = createContext();

const AppProvider = (props) => {
  const [projectData, setProjectData] = useState();

  const value = useMemo(() => {
    return { projectData, setProjectData };
  }, [projectData]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
