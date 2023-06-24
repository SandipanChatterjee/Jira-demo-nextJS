import { makeStyles } from "@material-ui/core/styles";
import { paperBackGroundColor } from "../../../../utils/globalStyles";

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
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 4, 4),
  },
  loaderContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  "@media (max-width:768px)": {
    paper: {
      position: "absolute",
      maxWidth: "300px",
      height: "auto",
      backgroundColor: "#ffffff",
      padding: theme.spacing(4, 4, 4),
      zIndex: 2,
    },
  },
}));
