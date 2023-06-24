import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  active: {
    border: "2px solid blue",
  },
  inactive: {
    border: "none",
  },
  text: {
    textTransform: "capitalize",
  },
  button: {},
  "@media (max-width:768px)": {
    root: {
      display: "block",
      padding: "0",
    },
    avatarGroup: {
      margin: "0",
    },
    btn: {
      margin: "0",
      textAlign: "left",
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingLeft: "3px",
    },
  },
}));
