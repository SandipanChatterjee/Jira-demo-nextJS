import { makeStyles } from "@material-ui/core/styles";
import {
  primaryButtonColor,
  primaryButtonWidth,
  avatarSize,
  avatarSizeMobile,
} from "../../../../utils/globalStyles";
export const useStyles = makeStyles((theme) => ({
  parentContainer: {
    padding: ".2rem .5rem",
    marginBottom: ".5rem",
    marginRight: ".5rem",
    width: "auto",
    justifyContent: "flex-start",
  },
  container: {
    display: "flex",
    "&:hover ": {
      cursor: "pointer",
    },
  },
  text: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  avatarSize: {
    width: avatarSize.width,
    height: avatarSize.height,
  },

  addMoreButton: {
    marginLeft: "10px",
    "&:hover ": {
      textDecoration: "underline",
    },
  },
  icon: {
    marginTop: "auto",
    marginBottom: "auto",
  },

  "@media (max-width:768px)": {
    root: {
      "& br": {
        display: "none",
      },
    },
    btnText: {
      fontSize: ".6rem",
    },
    avatarSize: {
      width: avatarSizeMobile.width,
      height: avatarSizeMobile.height,
    },
  },
}));
