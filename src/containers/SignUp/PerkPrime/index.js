import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { createSelector } from "redux-starter-kit";
import { Grid, withStyles, Typography } from "@material-ui/core";
import {
  paymentInfoPrime,
  updateUserInfo,
  updateButtonGender,
  updateCalender,
  updateId
} from "./reducer";
import styles from "./styles";
import Space from "./../../../components/Space";
import UserInfoCard from "./../../../components/UserInfoCard";
import ButtonFooter from "./../../../components/ButtonFooter";

let PerkPrimeImg = require("../../../assets/images/Prime.PNG");

class PerkPrime extends Component {
  handelPaymentInfoPrime = () => {
    this.props.paymentInfoPrime(this.props.userInfoState);
  };

  handleUpdateUserId = id => {
    this.props.updateId({
      id: id
    });
  };
  handleUserInfoCard = userInfo => {
    this.props.updateUserInfo(userInfo);
  };
  handleUpdateGender = gender => {
    this.props.updateButtonGender({
      idGender: gender
    });
  };

  handleUpdateDate = day => {
    this.props.updateCalender({
      dayOfBirth: day
    });
  };

  render() {
    const { classes, userInfoState } = this.props;
    return (
      <Grid
        container
        spacing={8}
        alignItems="center"
        direction="column"
        className={classes.root}
      >
        <Grid container>
          <Space />
        </Grid>
        <Grid item>
          <img src={PerkPrimeImg} alt="Perk prime" />
        </Grid>
        <Grid container>
          <Space />
        </Grid>
        <Grid item>
          <Typography variant="h5" align="right">
            Member Information
          </Typography>
          <Typography align="right">*denotes required field</Typography>
        </Grid>
        <Grid>
          <UserInfoCard
            className={classes.widthUserInfoCard}
            userInfo={userInfoState}
            handleUserInfoCard={this.handleUserInfoCard}
            isPrime={true}
            handleUpdateGender={this.handleUpdateGender}
            handleUpdateUserId={this.handleUpdateUserId}
            handleUpdateDate={this.handleUpdateDate}
          />
          <ButtonFooter
            className={classes.widthUserInfoCard}
            paymentPrimePress={this.handelPaymentInfoPrime}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = createSelector(["perkPrime"]);
const mapDispatchToProps = dispatch => {
  return {
    paymentInfoPrime: payload => dispatch(paymentInfoPrime(payload)),
    updateUserInfo: payload => dispatch(updateUserInfo(payload)),
    updateButtonGender: payload => dispatch(updateButtonGender(payload)),
    updateCalender: payload => dispatch(updateCalender(payload)),
    updateId: payload => dispatch(updateId(payload))
  };
};
const PerkPrimeContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PerkPrime)
);
export default withStyles(styles)(PerkPrimeContainer);
