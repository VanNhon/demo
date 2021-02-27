import stylesCommon from "./../../../../configs/styles";
const styles = theme =>
Object.assign({}, stylesCommon(theme), {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    gridBtnDelete: {
      zIndex: 0,
      marginTop: -39
    }
  });

export default styles;
