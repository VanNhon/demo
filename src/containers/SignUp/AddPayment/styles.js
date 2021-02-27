import stylesCommon from "./../../../configs/styles";
const styles = theme =>
Object.assign({}, stylesCommon(theme), {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    width440: {
      width: 440
    },
    marginTopBreakPoint: {
      [theme.breakpoints.down("419")]: {
        marginTop: 20
      }
    }
  });

export default styles;
