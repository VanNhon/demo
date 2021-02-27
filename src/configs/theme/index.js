import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#448aff",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#ef5350",
      dark: "#ba000d",
      contrastText: "#000"
    }
  },
  typography: {
    useNextVariants: true
  }
});
export default theme;
