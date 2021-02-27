import { Provider } from "react-redux";
import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./configs/theme";
import Routers from "./configs/routes";
import {configureAppStore} from './configs/redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={configureAppStore()}>
        <MuiThemeProvider theme={theme}>
          <Routers />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
