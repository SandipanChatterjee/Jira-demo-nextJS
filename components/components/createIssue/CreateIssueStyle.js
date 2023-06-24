import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  btn: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  btnContent: {
    display: "flex",
  },
  btnText: {
    marginLeft: "5px",
    fontSize: "12px",
    marginTop: "auto",
    marginBottom: "auto",
  },
  icon: {
    marginTop: "auto",
    marginBottom: "auto",
    marginTop: "4px",
  },
  textField: {
    width: "100%",
  },
  descriptionText: {
    fontSize: "12px",
  },
  avatarSize: {
    width: "30px",
    height: "30px",
  },
  errorText: {
    color: "#E53C3C",
    fontSize: "12px",
    lineHeight: "0",
    margin: "0",
    padding: "0",
  },
  "@media (max-width:768px)": {
    root: {
      position: "relative",
    },
    btn: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    btnText: {
      marginLeft: "5px",
      fontSize: "12px",
      marginTop: "auto",
      marginBottom: "auto",
    },
    descriptionText: {
      display: "none",
    },
    reporterHeading: {
      marginTop: "5rem",
    },
  },
}));
