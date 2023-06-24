import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    margin: "0 auto",
    width: "50%",
  },
  inputElements: {
    marginBottom: "12px",
  },
  loaderContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  textField: {
    width: "100%",
  },
  errorText: {
    color: "#E53C3C",
    fontSize: "12px",
    lineHeight: "0",
    margin: "0",
    padding: "0",
  },
  descTxt: {
    fontSize: "12px",
  },
  "@media (max-width:768px)": {
    root: {
      display: "block",
      margin: "0",
      width: "100%",
      height: "0vh",
    },
  },
}));
