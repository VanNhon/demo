import classNames from "classnames";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Grid, withStyles, Typography, Button } from "@material-ui/core";
import styles from "./styles";
import { logoff } from "./reducer";
import Space from "./../../components/Space";

let PerkO = require("../../assets/images/O.PNG");

class dashboard extends Component {
  handleLogoffClick = () => {
    this.props.logoff();
  };



  render() {
    const { classes, firstName } = this.props;
    return (
      <Grid container spacing={8} justify="center" className={classes.root}>
        <Grid>
          <Space />
          <Space />
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <img src={PerkO} alt="aaaa" />
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.marginTop30}>
          <Grid item>
            <Typography variant="h4">Welcome back, {firstName} !</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          className={classNames(classes.marginTop30, classes.widthMain)}
        >
          <Grid item className={classes.paddingLeft_Right_10}>
            <Button
              variant="outlined"
              className={classNames(classes.buttonMain, classes.button)}
            >
              <Typography>Update Profile</Typography>
            </Button>
            <Space />
            <Button
              variant="outlined"
              className={classNames(classes.buttonMain, classes.button)}
            >
              <Typography>Update Payment Info</Typography>
            </Button>
          </Grid>
          <Grid item className={classes.paddingLeft_Right_10}>
            <Button
              variant="outlined"
              className={classNames(classes.buttonMain, classes.button)}
            >
              <Typography>P My Perks</Typography>
            </Button>
            <Space />
            <Button
              variant="outlined"
              className={classNames(classes.buttonMain, classes.button)}
            >
              <Typography>Concierge</Typography>
            </Button>
          </Grid>
          <Grid item className={classes.paddingLeft_Right_10}>
            <Button
              variant="outlined"
              className={classNames(classes.buttonMain, classes.button)}
            >
              <Typography> Urgent Care</Typography>
            </Button>
            <Space />
            <Button
              variant="outlined"
              className={classNames(classes.buttonMain, classes.button)}
            >
              <Typography>TeleHealth</Typography>
            </Button>
          </Grid>
          <Grid item className={classes.paddingLeft_Right_10}>
            <Button
              variant="outlined"
              className={classNames(classes.buttonMain, classes.button)}
            >
              <Typography>Wellness Rewards</Typography>
            </Button>
            <Space />
            <Button
              variant="outlined"
              className={classNames(classes.buttonMain, classes.button)}
            >
              <Typography>TeleTherapy</Typography>
            </Button>
            <Space />
            <Grid container justify="flex-end">
              <Grid item>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={this.handleLogoffClick}
                >
                  <Typography>Log Off</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
//const mapStateToProps = createSelector(["dashboard"]);
// const mapStateToProps = createSelector(
//   ["dashboard", "auth"],
//   (login, auth) => Object.assign(login, auth)
// );
const mapStateToProps = state => {
  return Object.assign({}, state.dashboard, state.auth);
};

//const mapDispatchToProps = { validateUserInfo, loginUser };
const mapDispatchToProps = dispatch => {
  return {
    logoff: () => dispatch(logoff())
  };
};
const MainContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(dashboard)
);
export default withStyles(styles)(MainContainer);
