import React, { Component } from "react";
import { Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import history from "./history.js";
import PrivateRoute from "./privateRoute";
import Login from "./../../containers/Login";
import Dashboard from "./../../containers/Dashboard";
import SignUpU from "./../../containers/SignUp/PerkU";
import SignUpPrime from "./../../containers/SignUp/PerkPrime";
import SignUpFamily from "./../../containers/SignUp/PerkFamily";
import SingUpAddPayment from "./../../containers/SignUp/AddPayment";
import SignUpChooseMember from "./../../containers/SignUp/ChooseMember";
import SingUpConfirmations from "./../../containers/SignUp/Confirmation";
import SingUpLoginCredentials from "./../../containers/SignUp/LoginCredentials";
import SingUpFamilyDependents from "./../../containers/SignUp/PerkFamily/Dependents";

class Routers extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route
            path="/signup_choosemembership"
            component={SignUpChooseMember}
          />
          <Route path="/signup_perku" component={SignUpU} />
          <Route path="/signup_perkprime" component={SignUpPrime} />
          <Route
            path="/signup_perkfamily_subscriber"
            component={SignUpFamily}
          />
          <Route
            path="/signup_perkfamily_dependents"
            component={SingUpFamilyDependents}
          />
          <Route path="/signup_addpayment" component={SingUpAddPayment} />
          <Route
            path="/signup_logincredentials"
            component={SingUpLoginCredentials}
          />
          <Route
            path="/signup_confirmationscreen"
            component={SingUpConfirmations}
          />
        </Switch>
      </Router>
    );
  }
}

export default Routers;
