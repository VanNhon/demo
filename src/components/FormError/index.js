import React from "react";
import { Typography } from "@material-ui/core";

const FormError = props => {
  if (props.errorMessage === "") {
    return null;
  }
  return <Typography variant="caption"  color="secondary">{props.errorMessage}</Typography>;
};

export default FormError;
