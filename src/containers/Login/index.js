import classNames from "classnames";
import {connect} from "react-redux";
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {createSelector} from "redux-starter-kit";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Grid, withStyles, Button, TextField, Typography} from "@material-ui/core";
import styles from "./styles";
import Space from "../../components/Space";
import {loginUser, signup} from "./reducer";
import {message} from "../../configs/common/message";

let PerkO = require("../../assets/images/O.PNG");

class Login extends Component {
    handleLoginClick = () => {
        this
            .props
            .loginUser({username: this.txtUsername.value, password: this.txtPassword.value});
    };

    handleSignUpClick = () => {
        this
            .props
            .signup();
    };

    componentDidUpdate() {
        const {isFocus} = this.props;
        if (isFocus) {
            this
                .txtUsername
                .focus();
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
            this.handleLoginClick();
        }
    };

    render() {
        const {classes, isValid, isLoading, isShowMessage, isFocus} = this.props;

        return (
            <Grid>
                <Grid container spacing={8} justify="center" className={classes.root}>
                    <Grid container item xs={12} sm={5} justify="center">
                        <form>
                            <Space/>
                            <Space/>
                            <Space/>
                            <Grid item>
                                <img src={PerkO} alt="Perk"/>
                            </Grid>
                            <Space/>
                            <Grid item>
                                <TextField
                                    placeholder="User Name"
                                    fullWidth
                                    autoComplete="foo"
                                    autoFocus={isFocus}
                                    inputRef={node => (this.txtUsername = node)}
                                    error={isValid === 1
                                    ? false
                                    : true}/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    placeholder="Password"
                                    autoComplete="foo"
                                    fullWidth
                                    type="password"
                                    inputRef={node => (this.txtPassword = node)}
                                    error={isValid === 1
                                    ? false
                                    : true}/>
                            </Grid>
                            {isLoading && !isShowMessage && (
                                <Grid item className={classes.paddingTop5}>
                                    <Typography variant="caption" type="title">{message.LOADING}</Typography>
                                </Grid>
                            )}
                            {isValid === 0 && isShowMessage && (
                                <Grid item className={classes.paddingTop5}>
                                    <Typography variant="caption" color="secondary" type="title">
                                        {message.SIGNIN_ERROR}
                                    </Typography>
                                </Grid>
                            )}
                            {isValid === -1 && isShowMessage && (
                                <Grid item className={classes.paddingTop5}>
                                    <Typography variant="caption" color="secondary" type="title">
                                        {message.SIGNIN_INVALIDATE}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid container justify="flex-end" className={classes.gridbuttonLogin}>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        className={classNames(classes.btnLogin, classes.button)}
                                        disabled={isLoading}
                                        onClick={this.handleLoginClick}>
                                        {isLoading && <CircularProgress size="13px"/>}
                                        <Typography color="inherit" className={classes.paddingLeft5}>
                                            Login
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={this.handleSignUpClick}
                                    variant="outlined"
                                    fullWidth
                                    className={classes.button}>
                                    Sign Up
                                </Button>
                            </Grid>
                            <Grid item className={classes.marginTop_Bot}>
                                <Button variant="outlined" fullWidth className={classes.button}>
                                    Back to PerkWellness.com
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = createSelector(["login"]);
// const mapStateToProps = createSelector(   ["login", getAuth],   (login, auth)
// => Object.assign(login, auth) ); const mapStateToProps = state => {
// console.log("mapStateToProps", state.login, state.auth);   return
// Object.assign(state.login, state.auth); };

const mapDispatchToProps = dispatch => {
    return {
        loginUser: payload => dispatch(loginUser(payload)),
        signup: () => dispatch(signup())
    };
};
const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
export default withStyles(styles)(LoginContainer);
