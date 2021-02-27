import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
class Space extends Component {
  render() {
    const { classes } = this.props;
    return <div className={classes.div} />;
  }
}

export default withStyles(styles)(Space);
