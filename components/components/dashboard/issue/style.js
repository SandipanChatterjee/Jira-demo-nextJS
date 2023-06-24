import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import {
  cardBackGroundColor,
  paperBackGroundColor,
} from "../../../utils/globalStyles";

export const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "green",
    color: "green",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}))(Badge);

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: paperBackGroundColor,
    height: "auto",
    width: "200px",
    padding: "5px",
    minHeight: "300px",
    minWidth: "300px",
    marginRight: "1rem",
  },
  control: {
    padding: theme.spacing(2),
  },
  girdDisplay: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap",
  },
  girdDisplaySubElements: {},
  cardDisplay: {
    position: "relative",
    width: "auto",
    backgroundColor: cardBackGroundColor,
    margin: ".2rem 0",
    padding: "1rem",
    "&:hover": {
      backgroundColor: paperBackGroundColor,
      cursor: "pointer",
    },
    height: "auto",
  },
  cardIconContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardIcon: {
    position: "absolute",
    bottom: 5,
  },
  cardIconAvatar: {
    position: "absolute",
    bottom: 5,
    right: 10,
  },
  paperBackGroundColor: {
    backgroundColor: paperBackGroundColor,
  },
  titleText: {
    wordWrap: "break-word",
    marginBottom: "1rem",
  },

  "@media (max-width:768px)": {
    girdDisplay: {
      display: "block",
    },
    grid: {
      margin: "1rem 0",
    },
    paper: {
      backgroundColor: paperBackGroundColor,
      height: "auto",
      width: "1500px",
      padding: "5px",
      minWidth: "200px",
      marginRight: "1rem",
    },
    cardDisplay: {
      width: "auto",
    },
  },
}));
