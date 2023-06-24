import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  btn: {
    paddingLeft: "0",
  },
  icon: {
    marginTop: "auto",
    marginBottom: "auto",
    marginTop: "4px",
  },
  btnText: {
    marginLeft: "5px",
    fontSize: "12px",
    marginTop: "auto",
    marginBottom: "auto",
  },
  autoCompleteContainer: {
    width: "50%",
  },
  "@media (max-width:768px)": {
    autoCompleteContainer: {
      width: "auto",
    },
  },
}));
