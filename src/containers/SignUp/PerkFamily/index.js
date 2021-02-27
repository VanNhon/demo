import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { createSelector } from "redux-starter-kit";
import { Grid, withStyles, Typography } from "@material-ui/core";
import UserInfoCard from "./../../../components/UserInfoCard";
import ButtonFooter from "./../../../components/ButtonFooter";
import Space from "./../../../components/Space";
import styles from "./styles";
import {
  addDependent,
  updateUserInfo,
  updateButtonGender,
  updateCalender,
  updateId
} from "./reducer";
let PerkFamilyImg = require("./../../../assets/images/Family.PNG");

class PerkFamily extends Component {
  backPressHandler = () => {
    this.props.addDependent(this.props.userInfoState);
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
          <img src={PerkFamilyImg} alt="Perk family" />
        </Grid>
        <Grid container>
          <Space />
        </Grid>
        <Grid item>
          <Typography variant="h5" align="right">
            Subscriber Information
          </Typography>
          <Typography align="right">*denotes required field</Typography>
        </Grid>
        <Grid>
          <UserInfoCard
            className={classes.widthUserInfoCard}
            userInfo={userInfoState}
            handleUserInfoCard={this.handleUserInfoCard}
            handleUpdateGender={this.handleUpdateGender}
            handleUpdateDate={this.handleUpdateDate}
            handleUpdateUserId={this.handleUpdateUserId}
          />
          <ButtonFooter
            className={classes.widthUserInfoCard}
            backPress={this.backPressHandler}
            isFamily={true}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = createSelector(["subscriber"]);
const mapDispatchToProps = dispatch => {
  return {
    addDependent: payload => dispatch(addDependent(payload)),
    updateUserInfo: payload => dispatch(updateUserInfo(payload)),
    updateButtonGender: payload => dispatch(updateButtonGender(payload)),
    updateCalender: payload => dispatch(updateCalender(payload)),
    updateId: payload => dispatch(updateId(payload))
  };
};
const SubscriberContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PerkFamily)
);
export default withStyles(styles)(SubscriberContainer);
