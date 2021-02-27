import stylesCommon from "./../../../configs/styles";
const styles = theme =>
Object.assign({}, stylesCommon(theme), {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    btnLogin: {
      marginRight: 90
    }
  });

export default styles;
