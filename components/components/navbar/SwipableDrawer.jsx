import React from "react";
import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import template from "../../assests/icon.png";
import { openCreateIssue } from "../../actions/createIssue";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useStyles } from "./SwipableDrawerStyle";
import { primaryButtonColor } from "../../utils/globalStyles";
import { closeCreateIssue } from "../../actions/createIssue";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CreateIssue from "../createIssue/CreateIssue";

const routes = [
  // { id: 0, title: "Search Issue", icon: <SearchIcon /> },
  {
    id: 1,
    title: "Create Issue",
    icon: <AddIcon />,
  },
];

const SwipableDrawer = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const openCreateIssueModal = useSelector(
    (state) => state.createIssueReducer.openCreateIssue
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleCreateIssue = () => {
    dispatch(openCreateIssue());
  };
  const modalCloseHandler = () => {
    dispatch(closeCreateIssue());
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        onMouseOver={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        variant="permanent"
        anchor="left"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {" "}
        <List>
          <img
            src={template}
            width="40px"
            height="40px"
            style={{
              margin: "1rem",
              color: primaryButtonColor,
              backgroundColor: primaryButtonColor,
            }}
          />
          {routes.map((el, index) => (
            <ListItem
              button
              key={index}
              onClick={el.id ? handleCreateIssue : null}
            >
              <ListItemIcon style={{ color: "#fff" }}>{el.icon}</ListItemIcon>
              <ListItemText primary={el.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Dialog
        open={openCreateIssueModal}
        onClose={modalCloseHandler}
        fullWidth="true"
        maxWidth="md"
        scroll="body"
      >
        <DialogContent>
          <CreateIssue />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SwipableDrawer;
