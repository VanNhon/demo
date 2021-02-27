import React, { Component } from "react";
import { Grid, withStyles, Button } from "@material-ui/core";
import styles from "./styles";
class ButtonGroup extends Component {
  handleChange = gender => {
    this.props.handleUpdateGender(gender);
  };

  render() {
    const { classes, values, disabled, gender } = this.props;
    const ListItem = values.map((item, index) => {
      return (
        <Grid item key={index}>
          <Button
            variant="outlined"
            onClick={() => this.handleChange(index)}
            className={gender === index ? classes.buttonActive : classes.button}
            key={index}
            disabled={disabled}
          >
            {item.name}
          </Button>
        </Grid>
      );
    });
    return (
      <Grid container justify="flex-end">
        {ListItem}
      </Grid>
    );
  }
}

export default withStyles(styles)(ButtonGroup);
