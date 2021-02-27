import "date-fns";
import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Grid, withStyles } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import styles from "./../../configs/styles";
import FormError from "./../FormError";

class Calendar extends Component {
  handleDateChange = date => {
    const dayOfBirth = JSON.stringify(date);
    this.props.handleUpdateDate(dayOfBirth);
  };


  render() {
    const { classes, disabled, day, errorMessage,onMouseDown } = this.props;
    const valuesDay = day ? JSON.parse(day) : null;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
          <DatePicker
            onMouseDown={onMouseDown}
            className={classes.borderInput}
            format="MM/dd/yyyy"
            keyboard
            clearable
            autoOk
            placeholder="D.O.B  MM/DD/YYYY*"
            value={valuesDay}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
            maxDate={new Date()}
            minDate={new Date("01/01/1920")}
            disabled={disabled}
            style={{ width: 210 }}
          />
        </Grid>
        <FormError errorMessage={errorMessage} />
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(Calendar);
