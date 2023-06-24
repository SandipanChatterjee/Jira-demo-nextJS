import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  loaderContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  "@media (max-width:768px)": {
    container: {
      display: "block",
      left: "0",
    },
  },
}));
