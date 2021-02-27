import classNames from "classnames";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { createSelector } from "redux-starter-kit";
import { Grid, withStyles, Typography, Button } from "@material-ui/core";
import styles from "./styles";
import { logIn } from "./reducer";
import Space from "./../../../components/Space";

let PerkO = require("../../../assets/images/O.PNG");

class Confirmation extends Component {
  handelLogInClick = () => {
    this.props.logIn({
      username: this.props.user.username,
      password: this.props.user.password
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Grid container spacing={8} justify="center" className={classes.root}>
          <Grid container item xs={12} sm={5} justify="center">
            <form>
              <Grid>
                <Space />
                <Space />
                <Space />
                <Space />
              </Grid>
              <Grid item>
                <img src={PerkO} alt="aaaa" />
              </Grid>
              <Space />
              <Grid item>
                <Typography align="center">
                  Thank you for signing up for Perk!
                </Typography>
              </Grid>
              <Space />
              <Grid item>
                <Typography align="center">
                  Please check your email for membership
                </Typography>
              </Grid>
              <Space />
              <Grid item>
                <Typography align="center">confirmation.</Typography>
              </Grid>
              <Space />
              <Grid item>
                <Typography align="center">
                  Welcome to Wellness Reimagined
                </Typography>
              </Grid>
              <Space />
              <Grid item>
                <Button
                  onClick={this.handelLogInClick}
                  variant="outlined"
                  fullWidth
                  className={classNames(classes.btnLogin, classes.button)}
                >
                  Log In
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = createSelector(["confirmation"]);

const mapDispatchToProps = dispatch => {
  return {
    logIn: payload => dispatch(logIn(payload))
  };
};
const CompleteContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Confirmation)
);
export default withStyles(styles)(CompleteContainer);
