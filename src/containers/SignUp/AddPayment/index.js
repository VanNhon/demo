import classNames from "classnames";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { createSelector } from "redux-starter-kit";
import {
  Grid,
  withStyles,
  Typography,
  Checkbox,
  Button,
  FormControlLabel,
  TextField
} from "@material-ui/core";
import styles from "./styles";
import Space from "./../../../components/Space";
import FormError from "../../../components/FormError";
import { submit, updateState, pushUser } from "./reducer";
import {
  allLetter,
  charIsNumber,
  validateMMYY
} from "../../../utils/CommonUtils";
import { message } from "../../../configs/common/message";

let PerkO = require("../../../assets/images/O.PNG");

class AddPayment extends Component {
  state = {
    isSameAddress: false,
    isAgree: false,

    cc_: {
      value: "",
      errorMessage: ""
    },
    exp: {
      value: "",
      errorMessage: ""
    },
    cvv: {
      value: "",
      errorMessage: ""
    },
    card: {
      value: "",
      errorMessage: ""
    },
    cityTown: {
      value: "",
      errorMessage: ""
    },
    streetAddress: {
      value: "",
      errorMessage: ""
    },
    state: {
      value: "",
      errorMessage: ""
    },
    zipCode: {
      value: "",
      errorMessage: ""
    }
  };
  validateInput = (name, check) => {
    if (name === "cc_") {
      if (allLetter(check)) {
        return { errorMessage: "" };
      } else {
        return {
          errorMessage: message.CC_INVALID
        };
      }
    } else if (name === "cvv") {
      if (charIsNumber(check)) {
        return { errorMessage: "" };
      } else {
        return {
          errorMessage: message.CVV_INVALID
        };
      }
    } else if (name === "card") {
      if (allLetter(check)) {
        return { errorMessage: "" };
      } else {
        return {
          errorMessage: message.CARDHOLDER_NAME_INVALID
        };
      }
    } else if (name === "exp") {
      if (validateMMYY(check)) {
        return { errorMessage: "" };
      } else {
        return {
          errorMessage: message.EXP_DATE_INVALID
        };
      }
    } else if (name === "cityTown") {
      if (allLetter(check)) {
        return { errorMessage: "" };
      } else {
        return {
          errorMessage: message.CITY_TOWN_INVALID
        };
      }
    } else if (name === "streetAddress") {
      if (charIsNumber(check) === false && check !== "") {
        return { errorMessage: "" };
      } else {
        return {
          errorMessage: message.STREET_ADDRESS_INVALID
        };
      }
    } else if (name === "state") {
      if (allLetter(check)) {
        return { errorMessage: "" };
      } else {
        return {
          errorMessage: message.STATE_INVALID
        };
      }
    } else if (name === "zipCode") {
      if (allLetter(check)) {
        return { errorMessage: "" };
      } else {
        return {
          errorMessage: message.ZIP_CODE_INVALID
        };
      }
    }
  };

  handleInput = event => {
    const { name, value } = event.target;
    const newState = { ...this.state[name] };
    newState.value = value;
    this.setState({ [name]: newState });
  };

  handleInputValidation = event => {
    const { name } = event.target;
    const { errorMessage } = this.validateInput(name, this.state[name].value);
    const newState = { ...this.state[name] }; /* dummy object */
    newState.errorMessage = errorMessage;
    this.setState({ [name]: newState });
  };

  handelCheck = () => {
    if (this.txtStreetAddress.value === "") {
      const newState = { ...this.state.streetAddress };
      newState.errorMessage = message.STREET_ADDRESS_INVALID;
      this.setState({ streetAddress: newState });
    }
    if (this.txtCityTown.value === "") {
      const newState = { ...this.state.cityTown };
      newState.errorMessage = message.CITY_TOWN_INVALID;
      this.setState({ cityTown: newState });
    }
    if (this.txtState.value === "") {
      const newState = { ...this.state.state };
      newState.errorMessage = message.STATE_INVALID;
      this.setState({ state: newState });
    }
    if (this.txtZipcode.value === "") {
      const newState = { ...this.state.zipCode };
      newState.errorMessage = message.ZIP_CODE_INVALID;
      this.setState({ zipCode: newState });
    }
  };

  handelSubmit = () => {
    this.handelCheck();
    const {
      cc_,
      exp,
      cvv,
      card,
      cityTown,
      streetAddress,
      state,
      zipCode
    } = this.state;
    if (
      cc_.errorMessage === "" &&
      exp.errorMessage === "" &&
      cvv.errorMessage === "" &&
      card.errorMessage === "" &&
      cityTown.errorMessage === "" &&
      streetAddress.errorMessage === "" &&
      state.errorMessage === "" &&
      zipCode.errorMessage === "" &&
      this.txtStreetAddress.value !== "" &&
      this.txtCityTown.value !== "" &&
      this.txtState.value !== "" &&
      this.txtZipcode.value !== ""
    ) {
      this.props.submit({
        cc: this.txtCc.value,
        expDate: this.txtExp.value,
        cvv: this.txtCvv.value,
        cardHolder: this.txtCardholder.value,
        streetAddress: this.txtStreetAddress.value,
        ciTyTown: this.txtCityTown.value,
        state: this.txtState.value,
        zipCode: this.txtZipcode.value,
        id: this.props.member.id.id
      });
      this.props.pushUser({
        member: this.props.member
      });
    }
  };

  handelChangeCheckSameAddress = () => {
    this.setState({
      isSameAddress: !this.state.isSameAddress
    });
    this.setValidateTrue();
  };
  setValidateTrue = () => {
    let newState = { ...this.state.streetAddress };
    newState.errorMessage = "";
    this.setState({ streetAddress: newState });

    newState = { ...this.state.cityTown };
    newState.errorMessage = "";
    this.setState({ cityTown: newState });

    newState = { ...this.state.state };
    newState.errorMessage = "";
    this.setState({ state: newState });

    newState = { ...this.state.zipCode };
    newState.errorMessage = "";
    this.setState({ zipCode: newState });
  };
  handelChangeCheckAgree = () => {
    this.setState({
      isAgree: !this.state.isAgree
    });

    const paymentInfo = [];
    paymentInfo.cc = this.txtCc.value;
    paymentInfo.expDate = this.txtExp.value;
    paymentInfo.cvv = this.txtCvv.value;
    paymentInfo.cardHolder = this.txtCardholder.value;
    paymentInfo.streetAddress = this.txtStreetAddress.value;
    paymentInfo.ciTyTown = this.txtCityTown.value;
    paymentInfo.state = this.txtState.value;
    paymentInfo.zipCode = this.txtZipcode.value;
    this.props.updateState(paymentInfo);
  };
  componentDidUpdate() {
    if (this.state.isSameAddress && this.props.member) {
      this.txtStreetAddress.value = this.props.member.streetAddress;
      this.txtCityTown.value = this.props.member.ciTyTown;
      this.txtState.value = this.props.member.state;
      this.txtZipcode.value = this.props.member.zipCode;
    }
  }

  componentDidMount() {
    this.txtStreetAddress.value = this.props.infoPayment.streetAddress;
    this.txtCityTown.value = this.props.infoPayment.ciTyTown;
    this.txtState.value = this.props.infoPayment.state;
    this.txtZipcode.value = this.props.infoPayment.zipCode;
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={8} justify="center" className={classes.root}>
        <Grid container>
          <Space />
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <img src={PerkO} alt="aaaa" />
          </Grid>
        </Grid>
        <Grid container>
          <Space />
        </Grid>
        <Grid item>
          <Typography variant="h5" align="right">
            Payment Information
          </Typography>
          <Typography align="right">denotes required field</Typography>
        </Grid>
        <Grid container>
          <Space />
        </Grid>
        <Grid container justify="center">
          <Grid item className={classes.width440}>
            <Grid item>
              <TextField
                name="cc_"
                placeholder="cc#:"
                fullWidth
                className={classes.borderInput}
                inputRef={node => (this.txtCc = node)}
                onChange={this.handleInput}
                onBlur={this.handleInputValidation}
                error={this.state.cc_.errorMessage === "" ? false : true}
              />
              <FormError errorMessage={this.state.cc_.errorMessage} />
            </Grid>
            <Space />
            <Grid container justify="space-between">
              <Grid item>
                <TextField
                  name="exp"
                  placeholder="exp date: MM/YY"
                  className={classes.borderInput}
                  inputRef={node => (this.txtExp = node)}
                  onChange={this.handleInput}
                  onBlur={this.handleInputValidation}
                  error={this.state.exp.errorMessage === "" ? false : true}
                />
                <FormError errorMessage={this.state.exp.errorMessage} />
              </Grid>
              <Grid item className={classes.marginTopBreakPoint}>
                <TextField
                  name="cvv"
                  placeholder="cvv:"
                  className={classes.borderInput}
                  inputRef={node => (this.txtCvv = node)}
                  onChange={this.handleInput}
                  onBlur={this.handleInputValidation}
                  error={this.state.cvv.errorMessage === "" ? false : true}
                />
                <FormError errorMessage={this.state.cvv.errorMessage} />
              </Grid>
            </Grid>
            <Space />
            <Grid item>
              <TextField
                name="card"
                placeholder="Cardholder Name:"
                fullWidth
                className={classes.borderInput}
                inputRef={node => (this.txtCardholder = node)}
                onChange={this.handleInput}
                onBlur={this.handleInputValidation}
                error={this.state.card.errorMessage === "" ? false : true}
              />
              <FormError errorMessage={this.state.card.errorMessage} />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.isSameAddress}
                    onChange={this.handelChangeCheckSameAddress}
                  />
                }
                label="same address as subscriber"
              />
            </Grid>
            <Grid item>
              <TextField
                name="streetAddress"
                placeholder="Street Address*"
                fullWidth
                className={classes.borderInput}
                inputRef={node => (this.txtStreetAddress = node)}
                onChange={this.handleInput}
                onBlur={this.handleInputValidation}
                error={
                  this.state.streetAddress.errorMessage === "" ? false : true
                }
              />
              <FormError errorMessage={this.state.streetAddress.errorMessage} />
            </Grid>
            <Space />
            <Grid item>
              <TextField
                name="cityTown"
                placeholder="City/Town*"
                fullWidth
                className={classes.borderInput}
                inputRef={node => (this.txtCityTown = node)}
                onChange={this.handleInput}
                onBlur={this.handleInputValidation}
                error={this.state.cityTown.errorMessage === "" ? false : true}
              />
              <FormError errorMessage={this.state.cityTown.errorMessage} />
            </Grid>
            <Space />
            <Grid container justify="space-between">
              <Grid item>
                <TextField
                  name="state"
                  placeholder="State*"
                  className={classNames(classes.borderInput)}
                  inputRef={node => (this.txtState = node)}
                  onChange={this.handleInput}
                  onBlur={this.handleInputValidation}
                  error={this.state.state.errorMessage === "" ? false : true}
                />
                <FormError errorMessage={this.state.state.errorMessage} />
              </Grid>

              <Grid item className={classes.marginTopBreakPoint}>
                <TextField
                  name="zipCode"
                  placeholder="Zip Code*"
                  className={classes.borderInput}
                  inputRef={node => (this.txtZipcode = node)}
                  onChange={this.handleInput}
                  onBlur={this.handleInputValidation}
                  error={this.state.zipCode.errorMessage === "" ? false : true}
                />
                <FormError errorMessage={this.state.zipCode.errorMessage} />
              </Grid>
            </Grid>
            <Space />
            <Grid
              container
              justify="space-between"
              className={classes.marginBot20}
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.isAgree}
                      onChange={this.handelChangeCheckAgree}
                    />
                  }
                  label="I agree to terms"
                />
              </Grid>

              <Grid item>
                <Button
                  onClick={this.handelSubmit}
                  className={classes.button}
                  variant="outlined"
                  disabled={!this.state.isAgree}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = createSelector(["payment"]);
const mapDispatchToProps = dispatch => {
  return {
    pushUser: payload => dispatch(pushUser(payload)),
    submit: payload => dispatch(submit(payload)),
    updateState: payload => dispatch(updateState(payload))
  };
};

const PaymentContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddPayment)
);
export default withStyles(styles)(PaymentContainer);
