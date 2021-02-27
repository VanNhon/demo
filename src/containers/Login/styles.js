import stylesCommon from "./../../configs/styles";
const styles = theme =>
  Object.assign({}, stylesCommon(theme), {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    gridbuttonLogin: {
      margin: "15px 0 30px"
    },

    btnLogin: {
      padding: "0 20px"
    }
  });

export default styles;
