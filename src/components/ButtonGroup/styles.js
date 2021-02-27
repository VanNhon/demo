import stylesCommon from "./../../configs/styles";
const styles = theme =>
Object.assign({}, stylesCommon(theme), {
    button: {
      fontSize: 14,
      padding: " 4px 20px",
      background: "#fff",

      textTransform: "none",
      borderRadius: 0
    },
    buttonActive: {
      fontSize: 14,
      padding: " 4px 20px",
      background: "#90caf9",
      textTransform: "none",
      borderRadius: 0,
      "&:hover": {
        background: "#90caf9"
      }
    }
  });

export default styles;
