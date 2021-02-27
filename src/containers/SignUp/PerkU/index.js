import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { createSelector } from "redux-starter-kit";
import { Grid, withStyles, Typography } from "@material-ui/core";
import {
  paymentInfoU,
  updateUserInfo,
  updateButtonGender,
  updateCalender,
  updateId
} from "./reducer";
import styles from "./styles";
import Space from "./../../../components/Space";
import ButtonFooter from "./../../../components/ButtonFooter";
import UserInfoCard from "./../../../components/UserInfoCard";

let PerkUImg = require("../../../assets/images/U.PNG");

class PerkU extends Component {
  handelPaymentInfoU = () => {
    this.props.paymentInfoU(this.props.userInfoState);
  };
  handleUserInfoCard = userInfo => {
    this.props.updateUserInfo(userInfo);
  };

  handleUpdateGender = gender => {
    this.props.updateButtonGender({
      idGender: gender
    });
  };
  handleUpdateUserId = id => {
    this.props.updateId({
      id: id
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
          <img src={PerkUImg} alt="Perk u" />
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
            userInfo={userInfoState}
            handleUserInfoCard={this.handleUserInfoCard}
            isStudent={true}
            className={classes.widthUserInfoCard}
            handleUpdateGender={this.handleUpdateGender}
            handleUpdateUserId={this.handleUpdateUserId}
            handleUpdateDate={this.handleUpdateDate}
          />
          <ButtonFooter
            isStudent={true}
            className={classes.widthUserInfoCard}
            paymentUPress={this.handelPaymentInfoU}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = createSelector(["perkU"]);
const mapDispatchToProps = dispatch => {
  return {
    paymentInfoU: payload => dispatch(paymentInfoU(payload)),
    updateUserInfo: payload => dispatch(updateUserInfo(payload)),
    updateButtonGender: payload => dispatch(updateButtonGender(payload)),
    updateCalender: payload => dispatch(updateCalender(payload)),
    updateId: payload => dispatch(updateId(payload))
  };
};
const PerkUContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PerkU)
);
export default withStyles(styles)(PerkUContainer);
