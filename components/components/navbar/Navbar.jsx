import React, { useState, useEffect } from "react";
// import { withRouter, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import {
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { paperBackGroundColor } from "../../utils/globalStyles";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginLeft: "1rem",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginRight: "2rem",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: paperBackGroundColor,
    padding: "1rem",
    marginLeft: "4rem",
  },
  listItem: {
    marginBottom: "1rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  listItemProjectSettings: {
    marginBottom: "1rem",
    "&:hover": {
      cursor: "not-allowed",
    },
  },

  "@media (max-width:768px)": {
    root: {
      display: "none",
    },
  },
}));

const routes = [
  { route: "/", title: "Kanban Board" },
  { route: "/project/settings", title: "Project Settings" },
];

const Navbar = (props) => {
  const classes = useStyles();
  // const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const routeHandler = (el, index) => {
    setSelectedIndex(index);
    router.push(el.route);
  };
  useEffect(() => {
    const index = routes.findIndex((el) => el.route === router.pathname);
    setSelectedIndex(index);
  }, [router.pathname]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
      >
        <List>
          {routes.map((el, index) => (
            <ListItem
              button
              key={index}
              selected={selectedIndex === index}
              onClick={() => routeHandler(el, index)}
              className={classes.listItem}
            >
              <ListItemText primary={el.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

// export default withRouter(Navbar);
export default Navbar;
