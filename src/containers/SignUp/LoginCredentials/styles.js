import stylesCommon from "./../../../configs/styles";
const styles = theme =>
Object.assign({}, stylesCommon(theme), {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    btnSignUp: {
      margin: "15px 0 30px"
    },
    marginTop_Bot: {
      margin: "15px 0"
    },
    shadow: {
      boxShadow: "2.5px 2.5px #b0bec5"
    }
  });

export default styles;
