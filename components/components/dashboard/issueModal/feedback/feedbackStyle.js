import { makeStyles } from "@material-ui/core/styles";
import { paperBackGroundColor } from "../../../../utils/globalStyles";

export const getModalStyle = () => {
  const top = 10;
  const left = 15;

  return {
    top: `${top}%`,
    right: `${left}%`,
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
}));
