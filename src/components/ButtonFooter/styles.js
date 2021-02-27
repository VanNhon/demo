import stylesCommon from "./../../configs/styles";
const styles = theme =>
  Object.assign({}, stylesCommon(theme), {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop: 20
    },
    btnGoBack: {
      textTransform: "none"
    },
    BreakPoint: {
      [theme.breakpoints.up("570")]: {
        marginLeft: 20
      },
      [theme.breakpoints.down("546")]: {
        marginTop: 10,
        textAlign: "right"
      }
    },
    BreakPointFooter: {
      [theme.breakpoints.down("546")]: {
        textAlign: "right"
      }
    }
  });

export default styles;
