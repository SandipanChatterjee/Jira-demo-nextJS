import { makeStyles } from "@material-ui/core/styles";
import {
  cardBackGroundColor,
  paperBackGroundColor,
} from "../../../../../utils/globalStyles";

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
  commentsContainer: {
    display: "flex",
    width: "600px",
  },
  newComment: {
    display: "flex",
    width: "600px",
  },
  avatar: {
    marginRight: "20px",
  },
  inputContainer: {
    maxWidth: "600px",
  },
  input: {
    width: "600px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  commentsModalContainer: {
    position: "absolute",
    width: "auto",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  commentBody: {
    width: "600px",
    wordWrap: "break-word",
  },
  modalStyle: {
    position: "absolute",
    top: "10%",
    left: "10%",
    overflow: "scroll",
    width: "100%",
    height: "100%",
    display: "block",
  },
  titleText: {},
  titleContainer: {
    width: "600px",
    wordWrap: "break-word",
    "&:hover ": {
      cursor: "pointer",
      backgroundColor: paperBackGroundColor,
    },
  },

  "@media (max-width:768px)": {
    newComment: {
      display: "flex",
      width: "200px",
      maxWidth: "300px",
    },
    inputContainer: {
      width: "200px",
    },
    input: {
      width: "200px",
      maxWidth: "350px",
    },
    commentsContainer: {
      width: "300px",
    },
    commentBody: {
      width: "300px",
      maxWidth: "200px",
      wordWrap: "break-word",
    },

    commentsModalContainer: {
      position: "absolute",
      width: "300px",
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
  },
}));
