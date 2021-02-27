import stylesCommon from "./../../configs/styles";

const styles = theme => Object.assign({}, stylesCommon(theme), {
    border: {
        border: "solid 2px black"
    },
    borderBot: {
        borderBottom: "solid 2px black",
        background: "#cfd8dc",
        padding: 4
    },
    button$: {
        textTransform: "none",
        marginTop: 20,
        padding: "10px 0"
    },
    widthItem: {
        width: 300
    },
    widthButton: {
        width: 160
    },

    includeBold: {
        fontWeight: "bold"
    },
    heightTitle: {
        height: 65
    }
});

export default styles;
