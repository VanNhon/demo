import stylesCommon from "./../../configs/styles";
const styles = theme =>
  Object.assign({}, stylesCommon(theme), {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },

    marginTopBreakPoint1: {
      [theme.breakpoints.down("642")]: {
        marginTop: 20
      }
    },
    marginTopBreakPoint2: {
      [theme.breakpoints.down("482")]: {
        marginTop: 20
      }
    },
    widthTextField: {
      width: 150
    }
  });

export default styles;
