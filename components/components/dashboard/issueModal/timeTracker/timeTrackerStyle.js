import { makeStyles } from "@material-ui/core/styles";
import { paperBackGroundColor } from "../../../../utils/globalStyles";

export const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

export const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};
export const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  timerContianer: {
    display: "flex",
    justifyContent: "space-between",
    padding: ".8rem 0",
    width: "auto",
    "&:hover ": {
      cursor: "pointer",
      backgroundColor: paperBackGroundColor,
    },
  },
  timerContianerModal: {
    display: "flex",
    justifyContent: "space-between",
    padding: ".8rem 0",
  },
  linearProgressContainer: {
    width: "100%",
    marginTop: ".3rem",
  },
  logContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  timeTrackerModalHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  closeIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  timeCalulatorContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  time: {
    width: "48%",
  },
  "@media (max-width:278px)": {
    timerContianer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100px",
      maxWidth: "200px",
      padding: ".8rem 0",
      "&:hover ": {
        cursor: "pointer",
        backgroundColor: paperBackGroundColor,
      },
    },
  },
}));
