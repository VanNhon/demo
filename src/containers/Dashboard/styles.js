import stylesCommon from "./../../configs/styles";
const styles = theme =>
  Object.assign({}, stylesCommon(theme), {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },

    buttonMain: {
      width: 200,
      padding: 20
    },
    widthMain:{
      [theme.breakpoints.down('sm')]: {
        width:440
      },
      [theme.breakpoints.up('md')]: {
       width:880
      }
    }
  });

export default styles;
