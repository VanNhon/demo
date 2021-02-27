import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { createSelector } from "redux-starter-kit";
import { Grid, withStyles, Typography } from "@material-ui/core";
import styles from "./styles";
import {
  addMoreDependent,
  deleteMoreDependent,
  paymentInfoFamily,
  updateUserInfo,
  updateCheckSameAddress,
  updateButtonGender,
  updateCalender,
  updateParentId
} from "./reducer";
import Space from "../../../../components/Space";
import UserInfoCard from "../../../../components/UserInfoCard";
import ButtonFooter from "./../../../../components/ButtonFooter";
let PerkFamilyImg = require("../../../../assets/images/Family.PNG");

class PerkFamilyDependent extends Component {
  
  handleUserInfoCard = userInfo => {
    console.log("user info: ", userInfo);
    this.props.updateUserInfo(userInfo);
  };

  handleAdd = () => {
    this.props.addMoreDependent();
  };

  handleUpdateParentId = (parentId, index) => {
    this.props.updateParentId({
      parentId: parentId,
      index: index
    });
  };

  handleDelete = index => {
    this.props.deleteMoreDependent(index);
  };

  handelPaymentInfoFamily = () => {
    this.props.paymentInfoFamily(this.props.member);
  };

  handleUpdateSameAddress = index => {
    this.props.updateCheckSameAddress(index);
  };

  handleUpdateGender = (gender, index) => {
    this.props.updateButtonGender({
      idGender: gender,
      selectIndex: index
    });
  };

  handleUpdateDate = (day, index) => {
    this.props.updateCalender({
      dayOfBirth: day,
      selectIndex: index
    });
  };

  render() {
    const { classes, arrayObjects, member } = this.props;
    console.log("userInfo", arrayObjects[0]);
    const listOject = arrayObjects.map((item, index) => {
      return (
        <Grid item key={index}>
          <UserInfoCard
            deletePress={this.handleDelete}
            index={index}
            isFamilyDepend={true}
            className={classes.widthUserInfoCard}
            userInfo={item}
            member={member}
            handleUpdateParentId={this.handleUpdateParentId}
            handleUserInfoCard={this.handleUserInfoCard}
            handleUpdateSameAddress={this.handleUpdateSameAddress}
            handleUpdateGender={this.handleUpdateGender}
            handleUpdateDate={this.handleUpdateDate}
            lengthArray={arrayObjects.length}
          />
        </Grid>
      );
    });
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
            Dependent Information
          </Typography>
          <Typography align="right">*denotes required field</Typography>
        </Grid>
        <Grid container justify="space-between" item xs={9}>
          {listOject}
          <ButtonFooter
            isFamilyDepend={true}
            Add={this.handleAdd}
            paymentFamilyPress={this.handelPaymentInfoFamily}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = createSelector(["dependent"]);
const mapDispatchToProps = dispatch => {
  return {
    paymentInfoFamily: payload => dispatch(paymentInfoFamily(payload)),
    addMoreDependent: () => dispatch(addMoreDependent()),
    deleteMoreDependent: payload => dispatch(deleteMoreDependent(payload)),
    updateUserInfo: payload => dispatch(updateUserInfo(payload)),
    updateCheckSameAddress: payload =>
      dispatch(updateCheckSameAddress(payload)),
    updateButtonGender: payload => dispatch(updateButtonGender(payload)),
    updateCalender: payload => dispatch(updateCalender(payload)), //
    updateParentId: payload => dispatch(updateParentId(payload))
  };
};
const DependentContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PerkFamilyDependent)
);
export default withStyles(styles)(DependentContainer);
