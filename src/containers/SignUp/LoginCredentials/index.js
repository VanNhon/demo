import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { createSelector } from "redux-starter-kit";
import {
  Grid,
  withStyles,
  Button,
  TextField,
  Typography
} from "@material-ui/core";
import styles from "./styles";
import Space from "../../../components/Space";
import { completeSignUp, pushUser } from "./reducer";
import { message } from "../../../configs/common/message";

let PerkO = require("../../../assets/images/O.PNG");

class LoginCredentials extends Component {
  handelCompleteClick = () => {
    this.props.completeSignUp({
      username: this.txtUsername.value,
      password: this.txtPassword.value,
      rePassword: this.txtRePassword.value,
      userId: this.props.user.member.id.id
    });

    this.props.pushUser({
      username: this.txtUsername.value,
      password: this.txtPassword.value
    });
  };

  componentDidUpdate() {
    const { isFocus } = this.props;
    if (isFocus) {
      this.txtUsername.focus();
    }
  }


  componentDidMount() {
    // add keypress listener
    window.addEventListener("keypress", this.enter);
  }

  componentWillUnmount() {
    // remove keypress listener
    window.removeEventListener("keypress", this.enter);
  }

  // on enter
  enter = target => {
    if (target.charCode === 13 || target.keyCode === 13) {
      this.handelCompleteClick();
    }
  };
  render() {
    const { classes, isValid, isLoading, isShowMessage, isFocus } = this.props;
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
              <Grid item container justify="center">
                <Grid item>
                  <img src={PerkO} alt="perk-img" />
                </Grid>
              </Grid>
              <Space />
              <Grid item container justify="center">
                <Grid item>
                  <Typography variant="h5">Login Credentials</Typography>
                </Grid>
              </Grid>
              <Space />
              <Grid item>
                <TextField
                  placeholder="User Name"
                  autoComplete="foo"
                  autoFocus={isFocus}
                  fullWidth
                  inputRef={node => (this.txtUsername = node)}
                  error={isValid === 1 ? false : true}
                />
              </Grid>

              <Grid item>
                <TextField
                  placeholder="Password"
                  autoComplete="foo"
                  type="password"
                  fullWidth
                  inputRef={node => (this.txtPassword = node)}
                  error={isValid === 1 ? false : true}
                />
              </Grid>

              <Grid item>
                <TextField
                  placeholder="Re-enter password"
                  autoComplete="foo"
                  type="password"
                  fullWidth
                  inputRef={node => (this.txtRePassword = node)}
                  error={isValid === 1 ? false : true}
                />
              </Grid>
              {isLoading === 1 && !isShowMessage && (
                <Grid item className={classes.paddingTop5}>
                  <Typography variant="caption" type="title">{message.LOADING}</Typography>
                </Grid>
              )}
              {isValid === 0 && isShowMessage && (
                <Grid item className={classes.paddingTop5}>
                  <Typography variant="caption" color="secondary" type="title">
                    {message.SIGNUP_EXIST}
                  </Typography>
                </Grid>
              )}
              {isValid === 2 && isShowMessage && (
                <Grid item className={classes.paddingTop5}>
                  <Typography variant="caption" color="secondary" type="title">
                    {message.SIGNUP_INVALIDATE}
                  </Typography>
                </Grid>
              )}
              {isValid === 3 && isShowMessage && (
                <Grid item className={classes.paddingTop5}>
                  <Typography variant="caption" color="secondary" type="title">
                    {message.SIGNUP_ERROR}
                  </Typography>
                </Grid>
              )}
              <Space />
              <Grid item>
                <Button
                  onClick={this.handelCompleteClick}
                  variant="outlined"
                  fullWidth
                  className={classes.shadow}
                >
                  Complete Sign Up
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = createSelector(["loginCredentials"]);

const mapDispatchToProps = dispatch => {
  return {
    completeSignUp: payload => dispatch(completeSignUp(payload)),
    pushUser: payload => dispatch(pushUser(payload))
  };
};
const CompleteContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginCredentials)
);
export default withStyles(styles)(CompleteContainer);
