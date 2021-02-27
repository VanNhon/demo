import classNames from "classnames";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Grid, withStyles, Button, Typography } from "@material-ui/core";
import styles from "./styles";
import Space from "./../Space";

class ButtonFooter extends Component {
  handelAddClick = () => {
    this.props.Add();
  };

  render() {
    const {
      classes,
      isFamilyDepend,
      isFamily,
      backPress,
      paymentFamilyPress,
      paymentUPress,
      paymentPrimePress,
      isStudent
    } = this.props;
    return (
      <Grid
        container
        spacing={8}
        justify={"space-between"}
        className={classes.root}
      >
        <Grid item>
          <Button
            component={Link}
            to={
              isFamilyDepend === true
                ? "/signup_perkfamily_subscriber"
                : "/signup_choosemembership"
            }
            className={classes.btnGoBack}
          >
            <i className="fas fa-angle-left" />
            <Typography className={classes.marginLeft5}>Go Back</Typography>
          </Button>
        </Grid>
        {!isFamily && !isFamilyDepend && (
          <Grid item>
            <Button
              onClick={isStudent ? paymentUPress : paymentPrimePress}
              className={classNames(classes.button, classes.marginLeft20)}
              variant="outlined"
            >
              Continue to Payment Info
            </Button>
          </Grid>
        )}

        {isFamilyDepend && (
          <Grid item className={classes.BreakPointFooter}>
            <Button
              className={
                isFamilyDepend === true
                  ? classNames(classes.button)
                  : classNames(classes.button)
              }
              variant="outlined"
              onClick={this.handelAddClick}
            >
              Add More Dependents
            </Button>
            <Button
              onClick={paymentFamilyPress}
              className={classNames(classes.button, classes.BreakPoint)}
              variant="outlined"
            >
              Continue to Payment Info
            </Button>
          </Grid>
        )}
        {isFamily && (
          <Grid item>
            <Button
              onClick={backPress}
              className={classNames(classes.button)}
              variant="outlined"
            >
              Add Dependents
            </Button>
          </Grid>
        )}
        <Grid container>
          <Space />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ButtonFooter);
