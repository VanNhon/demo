import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { createSelector } from "redux-starter-kit";
import { Grid, withStyles, Typography, Button } from "@material-ui/core";
import styles from "./styles";
import { goBack, getData } from "./reducer";
import Space from "../../../components/Space";
import PriceCard from "./../../../components/PriceCard";
import {cardValues} from "../../../configs/common/cardValues";
let PerkO = require("../../../assets/images/O.PNG");

class ChooseMember extends Component {
  handleGoBackClick = () => {
    this.props.goBack();
  };

  componentWillMount() {
    this.props.getData();
   
  }

  render() {
    const NUM_COLUMN = 4;
    const { classes, values} = this.props;
    return (
      <Grid container spacing={8} justify="center" className={classes.root}>
        <Grid container justify="center">
          <Grid container>
            <Space />
          </Grid>
          <Grid item>
            <img src={PerkO} alt="aaaa" />
          </Grid>
        </Grid>
        <Grid item className={classes.marginTop_Bot_30}>
          <Typography variant="h4" align="center">
            Choose a membership level
          </Typography>
        </Grid>
        <Grid container justify="center" alignItems="stretch">
          <Grid
            item
            style={{
              width: cardValues.length < NUM_COLUMN ? 300 * cardValues.length : 300 * NUM_COLUMN
            }}
          >
            <PriceCard />
            <Grid container>
              <Space />
            </Grid>
            <Grid item>
              <Button
                onClick={this.handleGoBackClick}
                className={classes.button}
              >
                <i className="fas fa-angle-left" />
                <Typography className={classes.marginLeft5}>Go Back</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = createSelector(["signup"]);
const mapDispatchToProps = dispatch => {
  return {
    goBack: () => dispatch(goBack()),
    getData: () => dispatch(getData())
  };
};
const SignUpContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChooseMember)
);
export default withStyles(styles)(SignUpContainer);
