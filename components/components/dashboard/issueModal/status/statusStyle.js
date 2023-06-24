import { makeStyles } from "@material-ui/core/styles";
import {
  primaryButtonColor,
  primaryButtonWidth,
} from "../../../../utils/globalStyles";
export const useStyles = makeStyles((theme) => ({
  button: {
    padding: ".2rem .5rem",
    marginBottom: ".5rem",
    width: "auto",
    justifyContent: "flex-start",
  },
  "@media (max-width:768px)": {
    root: {
      "& br": {
        display: "none",
      },
    },
    button: {
      marginBottom: ".5rem",
      width: "auto",
      maxWidth: "200px",
      justifyContent: "flex-start",
    },
    btnText: {
      fontSize: ".6rem",
    },
  },
}));
