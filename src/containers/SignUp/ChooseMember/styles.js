import stylesCommon from "./../../../configs/styles";
const styles = theme =>
Object.assign({}, stylesCommon(theme), {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    button: {
      textTransform: "none"
    }
  });

export default styles;
